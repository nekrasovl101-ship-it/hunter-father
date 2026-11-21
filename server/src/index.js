// Hunter Father — сервер на Cloudflare Workers + Durable Objects (SQLite, WebSocket Hibernation API).
//   POST /api/rooms          → создать комнату, вернуть код
//   GET  /api/rooms/:code    → существует ли комната и сколько в ней игроков
//   GET  /api/leaderboard    → общий топ охотников
//   GET  /ws/:code           → WebSocket в комнату (первое сообщение: {t:'hello', nick})
import { DurableObject } from 'cloudflare:workers';
import { World } from '../../shared/world.js';
import { AnimalSim, SPECIES } from '../../shared/animals.js';
import {
  MAX_PLAYERS, TICK_MS, SPECIES_IDS, ANIMS, CODE_CHARS, CODE_LEN, ROOM_VEHICLES, r1, r2, cleanNick,
} from '../../shared/protocol.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...CORS } });

function randomCode() {
  const b = new Uint8Array(CODE_LEN);
  crypto.getRandomValues(b);
  return [...b].map((x) => CODE_CHARS[x % CODE_CHARS.length]).join('');
}
const validCode = (c) => typeof c === 'string' && c.length === CODE_LEN && [...c].every((ch) => CODE_CHARS.includes(ch));

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const parts = url.pathname.split('/').filter(Boolean);

    if (parts[0] === 'api' && parts[1] === 'rooms' && req.method === 'POST') {
      for (let i = 0; i < 5; i++) {
        const code = randomCode();
        const stub = env.ROOMS.get(env.ROOMS.idFromName(code));
        const r = await stub.fetch(`https://room/init?code=${code}`, { method: 'POST' });
        if (r.ok) return json({ code });
      }
      return json({ error: 'Не удалось создать комнату' }, 500);
    }
    if (parts[0] === 'api' && parts[1] === 'rooms' && parts[2]) {
      const code = parts[2].toUpperCase();
      if (!validCode(code)) return json({ exists: false });
      const stub = env.ROOMS.get(env.ROOMS.idFromName(code));
      return json(await (await stub.fetch('https://room/info')).json());
    }
    if (parts[0] === 'api' && parts[1] === 'leaderboard') {
      const stub = env.LEADERBOARD.get(env.LEADERBOARD.idFromName('global'));
      return json(await (await stub.fetch('https://lb/top')).json());
    }
    if (parts[0] === 'ws' && parts[1]) {
      const code = parts[1].toUpperCase();
      if (!validCode(code)) return new Response('bad code', { status: 400 });
      if (req.headers.get('Upgrade') !== 'websocket') return new Response('expected websocket', { status: 426 });
      const stub = env.ROOMS.get(env.ROOMS.idFromName(code));
      return stub.fetch(req);
    }
    if (url.pathname === '/' || url.pathname === '/health') return json({ ok: true, name: 'hunter-father' });
    return new Response('not found', { status: 404, headers: CORS });
  },
};

// ---------------------------------------------------------------------------
// Комната. Пока в ней есть игроки — крутится цикл 10 Гц (животные, рассылка).
// Когда все вышли — цикл останавливается и объект может выгрузиться из памяти.
export class Room extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.env = env;
    this.sql = ctx.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT)');
    this.sql.exec('CREATE TABLE IF NOT EXISTS best (nick TEXT PRIMARY KEY, score INTEGER, kills INTEGER, at INTEGER)');
    this.players = new Map(); // id -> состояние
    this.vehicles = ROOM_VEHICLES.map((v) => ({ ...v, y: 0, pitch: 0, roll: 0, speed: 0, steer: 0, driver: 0 }));
    this.history = [];
    this.timer = null;
    this.sim = null;
    // восстановление после «гибернации»: игроки берутся из вложений сокетов
    for (const ws of ctx.getWebSockets()) {
      const a = ws.deserializeAttachment();
      if (a) this.players.set(a.id, this._newPlayer(a.id, a.nick, ws, a.score, a.kills));
    }
    this.nextId = Math.max(0, ...this.players.keys()) + 1;
    if (this.players.size) this._startLoop();
  }

  _meta(k) { return this.sql.exec('SELECT v FROM meta WHERE k = ?', k).toArray()[0]?.v; }

  _newPlayer(id, nick, ws, score = 0, kills = 0) {
    return { id, nick, ws, score, kills, x: 0, y: 0, z: 0, yaw: 0, pitch: 0, speed: 0, veh: 0, alive: 1, aim: 0, seen: Date.now() };
  }

  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/init') {
      if (this._meta('created')) return new Response('exists', { status: 409 });
      this.sql.exec("INSERT OR REPLACE INTO meta (k, v) VALUES ('created', ?), ('code', ?)", String(Date.now()), url.searchParams.get('code'));
      return new Response('ok');
    }
    if (url.pathname === '/info') {
      return Response.json({ exists: !!this._meta('created'), players: this.players.size, max: MAX_PLAYERS });
    }
    // WebSocket
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    if (!this._meta('created')) { server.close(4004, 'Комната не найдена'); return new Response(null, { status: 101, webSocket: client }); }
    if (this.players.size >= MAX_PLAYERS) { server.close(4001, 'Комната заполнена'); return new Response(null, { status: 101, webSocket: client }); }

    // ник приходит первым сообщением {t:'hello'}; до него игрок «безымянный»
    const id = this.nextId++;
    const p = this._newPlayer(id, 'Охотник', server);
    this.players.set(id, p);
    server.serializeAttachment({ id, nick: p.nick, score: 0, kills: 0 });
    this._startLoop();
    return new Response(null, { status: 101, webSocket: client });
  }

  _ensureSim() {
    if (this.sim) return;
    this.world = new World();
    this.sim = new AnimalSim(this.world, (Math.random() * 1e9) | 0);
    this.sim.spawnGroup('deer', 0, -70);
    this.sim.populate([{ x: 0, z: 0 }]);
  }

  _startLoop() {
    if (this.timer) return;
    this._ensureSim();
    this.lastTick = Date.now();
    this.timer = setInterval(() => this._tick(), TICK_MS);
  }

  _stopLoop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  _tick() {
    const now = Date.now();
    const dt = Math.min(0.25, (now - this.lastTick) / 1000);
    this.lastTick = now;
    // отключаем «зависших» (нет сообщений 20 с)
    for (const p of this.players.values()) if (now - p.seen > 20000) { try { p.ws.close(4008, 'timeout'); } catch {} this._leave(p.id); }
    if (!this.players.size) { this._stopLoop(); return; }

    const pl = [...this.players.values()].filter((p) => p.ready).map((p) => ({ id: p.id, x: p.x, y: p.y, z: p.z, speed: p.speed, inVehicle: !!p.veh || p.y > p.ground + 3, alive: !!p.alive }));
    this.sim.update(dt, pl);
    // шум двигателя распугивает зверей
    for (const p of this.players.values()) if (p.veh && p.speed > 3 && Math.random() < dt * 2) this.sim.noise(p.x, p.z, 0.35);
    for (const e of this.sim.events) {
      if (e.type === 'attack') { const p = this.players.get(e.target); if (p) this._send(p.ws, { t: 'dmg', dmg: e.dmg, species: e.species }); }
    }
    this.sim.events.length = 0;

    // история позиций для компенсации задержки при выстреле
    this.history.push({ t: now, pos: new Map(this.sim.animals.map((a) => [a.id, [a.x, a.z, a.heading, a.y]])) });
    if (this.history.length > 12) this.history.shift();

    const snap = {
      t: 'snap', ts: now,
      a: this.sim.animals.map((a) => [a.id, SPECIES_IDS.indexOf(a.type), r1(a.x), r1(a.z), r2(a.heading), ANIMS.indexOf(a.anim), r1(a.speed)]),
      p: [...this.players.values()].filter((p) => p.ready).map((p) => [p.id, r2(p.x), r2(p.y), r2(p.z), r2(p.yaw), r2(p.pitch), r1(p.speed), p.veh, p.alive, p.aim]),
      v: this.vehicles.map((v) => [v.id, r2(v.x), r2(v.y), r2(v.z), r2(v.heading), r2(v.pitch), r2(v.roll), r1(v.speed), r2(v.steer), v.driver]),
    };
    this._broadcast(snap);
  }

  _send(ws, msg) { try { ws.send(JSON.stringify(msg)); } catch {} }
  _broadcast(msg, except = 0) {
    const s = JSON.stringify(msg);
    for (const p of this.players.values()) if (p.id !== except) { try { p.ws.send(s); } catch {} }
  }

  _sendScores() {
    const list = [...this.players.values()].map((p) => ({ id: p.id, nick: p.nick, score: p.score, kills: p.kills })).sort((a, b) => b.score - a.score);
    const best = this.sql.exec('SELECT nick, score, kills FROM best ORDER BY score DESC LIMIT 10').toArray();
    this._broadcast({ t: 'scores', list, best });
  }

  async webSocketMessage(ws, raw) {
    let m;
    try { m = JSON.parse(raw); } catch { return; }
    const a = ws.deserializeAttachment();
    const p = a && this.players.get(a.id);
    if (!p) return;
    p.seen = Date.now();
    switch (m.t) {
      case 'hello': {
        p.nick = cleanNick(m.nick);
        ws.serializeAttachment({ id: p.id, nick: p.nick, score: p.score, kills: p.kills });
        this._send(ws, {
          t: 'welcome', id: p.id, code: this._meta('code'),
          players: [...this.players.values()].map((q) => ({ id: q.id, nick: q.nick })),
          vehicles: this.vehicles.map((v) => ({ id: v.id, key: v.key, driver: v.driver })),
        });
        this._broadcast({ t: 'join', id: p.id, nick: p.nick }, p.id);
        this._sendScores();
        break;
      }
      case 'st': {
        const [x, y, z] = m.p || [];
        if ([x, y, z].every(Number.isFinite)) { p.x = x; p.y = y; p.z = z; p.ready = true; }
        p.yaw = +m.yaw || 0; p.pitch = +m.pitch || 0; p.speed = Math.min(40, Math.abs(+m.sp || 0));
        p.alive = m.a ? 1 : 0; p.aim = m.ai ? 1 : 0; p.ground = +m.g || p.y;
        // состояние машины присылает её водитель
        if (p.veh && Array.isArray(m.vs)) {
          const v = this.vehicles.find((q) => q.id === p.veh);
          if (v && v.driver === p.id) [v.x, v.y, v.z, v.heading, v.pitch, v.roll, v.speed, v.steer] = m.vs.map((n) => +n || 0);
        }
        break;
      }
      case 'shot': this._shot(p, m); break;
      case 'enter': {
        const v = this.vehicles.find((q) => q.id === m.id);
        if (v && !v.driver && !p.veh) { v.driver = p.id; p.veh = v.id; this._broadcast({ t: 'enter', id: v.id, by: p.id }); }
        else this._send(ws, { t: 'deny', id: m.id });
        break;
      }
      case 'exit': this._exitVehicle(p); break;
      case 'ping': this._send(ws, { t: 'pong', c: m.c, s: Date.now() }); break;
    }
  }

  _exitVehicle(p) {
    const v = this.vehicles.find((q) => q.id === p.veh);
    if (v) { v.driver = 0; v.speed = 0; this._broadcast({ t: 'exit', id: v.id, by: p.id }); }
    p.veh = 0;
  }

  _shot(p, m) {
    const o = m.o, d = m.d;
    if (!Array.isArray(o) || !Array.isArray(d) || ![...o, ...d].every(Number.isFinite)) return;
    // античит-минимум: выстрел только из точки рядом с игроком
    if (Math.hypot(o[0] - p.x, o[2] - p.z) > 6) return;
    const len = Math.hypot(d[0], d[1], d[2]) || 1;
    const dir = [d[0] / len, d[1] / len, d[2] / len];
    this._broadcast({ t: 'shot', id: p.id, o, d: dir }, p.id);

    // компенсация задержки: откатываем животных в момент, который видел стрелок
    const rewind = Math.max(0, Math.min(500, +m.lag || 0));
    const target = Date.now() - rewind;
    let frame = null;
    for (const h of this.history) if (h.t <= target) frame = h;
    const saved = [];
    if (frame) for (const an of this.sim.animals) {
      const old = frame.pos.get(an.id);
      if (!old || an.state === 'dead') continue;
      saved.push([an, an.x, an.z, an.heading, an.y]);
      [an.x, an.z, an.heading, an.y] = old;
    }
    const res = this.sim.shoot(o[0], o[1], o[2], dir[0], dir[1], dir[2], 450, p.id);
    for (const [an, x, z, h, y] of saved) if (an.state !== 'dead') { an.x = x; an.z = z; an.heading = h; an.y = y; }
    else { an.x = x; an.z = z; an.y = y; } // убитое остаётся там, где упало сейчас
    this.sim.noise(o[0], o[2], 1);

    const out = { t: 'hit', wall: Number.isFinite(res.wallDist) ? r2(res.wallDist) : -1 };
    if (res.animal) {
      Object.assign(out, { aid: res.animal.id, species: res.animal.type, part: res.part, dist: r1(res.dist), killed: !!res.killed, score: res.score || 0 });
      if (res.killed) {
        p.score += res.score; p.kills++;
        p.ws.serializeAttachment({ id: p.id, nick: p.nick, score: p.score, kills: p.kills });
        this._broadcast({ t: 'kill', by: p.id, nick: p.nick, species: res.animal.type, score: res.score, part: res.part });
        this._saveBest(p);
        this._sendScores();
      }
    }
    this._send(p.ws, out);
    this.sim.events.length = 0;
  }

  _saveBest(p) {
    const row = this.sql.exec('SELECT score FROM best WHERE nick = ?', p.nick).toArray()[0];
    if (!row || row.score < p.score) {
      this.sql.exec('INSERT OR REPLACE INTO best (nick, score, kills, at) VALUES (?, ?, ?, ?)', p.nick, p.score, p.kills, Date.now());
    }
  }

  _leave(id) {
    const p = this.players.get(id);
    if (!p) return;
    this._exitVehicle(p);
    this.players.delete(id);
    this._broadcast({ t: 'leave', id });
    this._sendScores();
    // результат — в общий рейтинг
    if (p.score > 0) {
      const lb = this.env.LEADERBOARD.get(this.env.LEADERBOARD.idFromName('global'));
      this.ctx.waitUntil(lb.fetch('https://lb/submit', { method: 'POST', body: JSON.stringify({ nick: p.nick, score: p.score, kills: p.kills }) }).catch(() => {}));
    }
    if (!this.players.size) this._stopLoop();
  }

  async webSocketClose(ws) {
    const a = ws.deserializeAttachment();
    if (a) this._leave(a.id);
  }
  async webSocketError(ws) {
    const a = ws.deserializeAttachment();
    if (a) this._leave(a.id);
  }
}

// ---------------------------------------------------------------------------
// Общий рейтинг (один объект на весь сервер)
export class Leaderboard extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS top (nick TEXT PRIMARY KEY, score INTEGER, kills INTEGER, at INTEGER)');
  }
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/submit' && req.method === 'POST') {
      const { nick, score, kills } = await req.json();
      const n = cleanNick(nick);
      const s = Math.max(0, Math.min(1e7, score | 0));
      const row = this.sql.exec('SELECT score FROM top WHERE nick = ?', n).toArray()[0];
      if (!row || row.score < s) this.sql.exec('INSERT OR REPLACE INTO top (nick, score, kills, at) VALUES (?, ?, ?, ?)', n, s, kills | 0, Date.now());
      return new Response('ok');
    }
    return Response.json({ top: this.sql.exec('SELECT nick, score, kills FROM top ORDER BY score DESC LIMIT 20').toArray() });
  }
}
