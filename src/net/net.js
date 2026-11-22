// Сетевой клиент. Адрес сервера:
//  • в разработке — тот же origin (Vite проксирует /api и /ws на wrangler dev :8787);
//  • в продакшене — VITE_SERVER_URL из .env.production (https://hunter-father.<you>.workers.dev).
const BASE = (import.meta.env.VITE_SERVER_URL || location.origin).replace(/\/$/, '');

export async function api(path, opts) {
  const r = await fetch(BASE + path, opts);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
export const createRoom = () => api('/api/rooms', { method: 'POST' });
export const roomInfo = (code) => api(`/api/rooms/${encodeURIComponent(code)}`);
export const leaderboard = () => api('/api/leaderboard');

const CLOSE_REASONS = { 4001: 'Комната заполнена (максимум 8 охотников)', 4004: 'Комната не найдена', 4008: 'Соединение потеряно (тайм-аут)' };

export class Net {
  constructor() {
    this.ws = null;
    this.id = 0;
    this.handlers = {};
    this.rtt = 120;
    this.connected = false;
  }

  on(type, fn) { this.handlers[type] = fn; return this; }

  connect(code, nick) {
    this.code = code;
    return new Promise((resolve, reject) => {
      const url = BASE.replace(/^http/, 'ws') + '/ws/' + encodeURIComponent(code);
      const ws = (this.ws = new WebSocket(url));
      let welcomed = false;
      ws.onopen = () => ws.send(JSON.stringify({ t: 'hello', nick }));
      ws.onmessage = (e) => {
        let m;
        try { m = JSON.parse(e.data); } catch { return; }
        if (m.t === 'welcome') {
          welcomed = true; this.connected = true; this.id = m.id; this.code = m.code;
          this._pinger = setInterval(() => this.send({ t: 'ping', c: performance.now() }), 2000);
          resolve(m);
        }
        if (m.t === 'pong') this.rtt = this.rtt * 0.7 + (performance.now() - m.c) * 0.3;
        this.handlers[m.t]?.(m);
      };
      ws.onclose = (e) => {
        clearInterval(this._pinger);
        this.connected = false;
        const reason = CLOSE_REASONS[e.code] || e.reason || 'Нет связи с сервером';
        if (!welcomed) reject(new Error(reason));
        else this.handlers.close?.(reason);
      };
      ws.onerror = () => {
        if (welcomed) return;
        const local = /^(localhost|127\.|192\.168\.|10\.)/.test(location.hostname) && !import.meta.env.VITE_SERVER_URL;
        reject(new Error(local
          ? 'Это локальная тестовая версия — она ищет игровой сервер на этом компьютере, а он не запущен. Играть онлайн с друзьями: nekrasovl101-ship-it.github.io/hunter-father'
          : 'Нет связи с игровым сервером. Проверьте интернет и попробуйте ещё раз.'));
      };
    });
  }

  send(msg) {
    if (this.ws?.readyState === 1) this.ws.send(JSON.stringify(msg));
  }

  close() { try { this.ws?.close(); } catch {} }
}
