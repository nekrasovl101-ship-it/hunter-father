import { HALF, PLAY_LIMIT, heightAt, forestAt, riverDist, roadDist, RIVER_HALF, ROAD_HALF, SITES, SITE_SIZE } from '../../shared/terrain.js';
import { SPECIES } from '../../shared/animals.js';

const $ = (s) => document.querySelector(s);

// ---------- Бинокль: ×8, дальномер, подпись зверя в центре ----------
export class Binoculars {
  constructor() {
    this.on = false;
    this.t = 0;          // 0..1 — анимация поднятия к глазам
    this.el = $('#binoc');
    this.range = $('#binoc-range');
    this._acc = 0;
  }
  toggle(v = !this.on) { this.on = v; }
  // ray(dir) → {dist, label}; вызывается не чаще 8 раз/с
  update(dt, probe) {
    this.t += ((this.on ? 1 : 0) - this.t) * Math.min(1, dt * 9);
    this.el.classList.toggle('on', this.t > 0.85);
    if (this.t > 0.85 && (this._acc += dt) > 0.12) {
      this._acc = 0;
      const r = probe();
      this.range.innerHTML = (r.label ? `<b>${r.label}</b> · ` : '') + (r.dist < 1000 ? `${Math.round(r.dist)} м` : '— м');
    }
  }
}

// ---------- Телефон охотника: карта (GPS), часы, трекер зверей ----------
const MAP_PX = 256;
const W2M = MAP_PX / (PLAY_LIMIT * 2);
const toMap = (x, z) => [(x + PLAY_LIMIT) * W2M, (z + PLAY_LIMIT) * W2M];

function bakeMap() {
  const c = document.createElement('canvas');
  c.width = c.height = MAP_PX;
  const g = c.getContext('2d');
  const img = g.createImageData(MAP_PX, MAP_PX);
  for (let py = 0; py < MAP_PX; py++) for (let px = 0; px < MAP_PX; px++) {
    const x = px / W2M - PLAY_LIMIT, z = py / W2M - PLAY_LIMIT;
    const h = heightAt(x, z);
    const hx = heightAt(x + 3, z);
    const shade = Math.max(0.55, Math.min(1.25, 1 + (h - hx) * 0.12)); // отмывка рельефа
    const f = forestAt(x, z);
    let r = 120 - f * 70, gg = 140 - f * 45, b = 80 - f * 40;
    if (h > 45) { const k = Math.min(1, (h - 45) / 40); r += (150 - r) * k; gg += (145 - gg) * k; b += (135 - b) * k; }
    if (roadDist(x, z) < ROAD_HALF + 0.8) { r = 170; gg = 140; b = 95; }
    if (riverDist(x, z) < RIVER_HALF + 1) { r = 60; gg = 120; b = 170; }
    const i = (py * MAP_PX + px) * 4;
    img.data[i] = r * shade; img.data[i + 1] = gg * shade; img.data[i + 2] = b * shade; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  // горизонтали через 10 м
  g.fillStyle = 'rgba(40,30,10,0.18)';
  for (let py = 0; py < MAP_PX; py += 1) for (let px = 0; px < MAP_PX; px += 1) {
    const x = px / W2M - PLAY_LIMIT, z = py / W2M - PLAY_LIMIT;
    const a = Math.floor(heightAt(x, z) / 10), b = Math.floor(heightAt(x + 1 / W2M, z) / 10), d = Math.floor(heightAt(x, z + 1 / W2M) / 10);
    if (a !== b || a !== d) g.fillRect(px, py, 1, 1);
  }
  // постройки
  g.fillStyle = '#5a3a22';
  for (const s of SITES) {
    const [w, d] = SITE_SIZE[s.type];
    const [mx, my] = toMap(s.x, s.z);
    g.save(); g.translate(mx, my); g.rotate(-s.rot);
    g.fillRect((-w / 2) * W2M - 1, (-d / 2) * W2M - 1, w * W2M + 2, d * W2M + 2);
    g.restore();
  }
  return c;
}

export class Phone {
  constructor() {
    this.on = false;
    this.el = $('#phone');
    this.canvas = $('#phone-map');
    this.ctx = this.canvas.getContext('2d');
    this.base = null;
    this.zoom = 1;  // 1 — вся карта, 2.5 — окрестности
    this.el.querySelector('#phone-zoom').addEventListener('click', (e) => { e.stopPropagation(); this.zoom = this.zoom === 1 ? 2.5 : 1; });
    this.el.querySelector('#phone-close').addEventListener('click', (e) => { e.stopPropagation(); this.toggle(false); });
    this._acc = 1;
  }
  toggle(v = !this.on) {
    this.on = v;
    if (v && !this.base) this.base = bakeMap();
    this.el.classList.toggle('on', v);
  }
  // st: {x, z, yaw, hunters[{x,z,nick}], vehicles[{x,z}], towers[{x,z}], animals[{x,z,type,dead}], kills, score}
  update(dt, st) {
    if (!this.on) return;
    if ((this._acc += dt) < 0.1) return;
    this._acc = 0;
    const g = this.ctx, S = this.canvas.width;
    const k = (S / MAP_PX) * this.zoom;
    const [px, py] = toMap(st.x, st.z);
    // центрирование: на крупном масштабе — по игроку
    let ox = 0, oy = 0;
    if (this.zoom > 1) {
      ox = Math.max(0, Math.min(MAP_PX - S / k, px - S / k / 2));
      oy = Math.max(0, Math.min(MAP_PX - S / k, py - S / k / 2));
    }
    const P = (x, z) => { const [mx, my] = toMap(x, z); return [(mx - ox) * k, (my - oy) * k]; };
    g.imageSmoothingEnabled = true;
    g.drawImage(this.base, ox, oy, S / k, S / k, 0, 0, S, S);
    const dot = (x, z, r, fill, stroke) => {
      const [a, b] = P(x, z);
      g.beginPath(); g.arc(a, b, r, 0, Math.PI * 2); g.fillStyle = fill; g.fill();
      if (stroke) { g.strokeStyle = stroke; g.lineWidth = 1.5; g.stroke(); }
    };
    for (const t of st.towers) { const [a, b] = P(t.x, t.z); g.fillStyle = '#2b1d10'; g.fillRect(a - 3, b - 3, 6, 6); }
    for (const v of st.vehicles) dot(v.x, v.z, 4, '#e0b040', '#222');
    // трекер: свежие следы зверей в радиусе 120 м
    const COL = { deer: '#c98b4a', stag: '#a0602a', boar: '#5a4030', hare: '#d8d0c0', fox: '#e06a20', wolf: '#9aa0a8' };
    for (const an of st.animals) {
      if (an.dead || Math.hypot(an.x - st.x, an.z - st.z) > 120) continue;
      dot(an.x, an.z, an.type === 'wolf' ? 3.5 : 2.6, COL[an.type] || '#fff', an.type === 'wolf' ? '#c00' : null);
    }
    g.font = 'bold 11px -apple-system, sans-serif';
    for (const h of st.hunters) {
      dot(h.x, h.z, 4, '#3aa0ff', '#fff');
      const [a, b] = P(h.x, h.z); g.fillStyle = '#fff'; g.fillText(h.nick, a + 6, b - 4);
    }
    // игрок — стрелка
    const [a, b] = P(st.x, st.z);
    g.save(); g.translate(a, b); g.rotate(-st.yaw);
    g.beginPath(); g.moveTo(0, -9); g.lineTo(6, 6); g.lineTo(0, 3); g.lineTo(-6, 6); g.closePath();
    g.fillStyle = '#ff4030'; g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.stroke();
    g.restore();
    // строка состояния
    const d = new Date();
    this.el.querySelector('#phone-time').textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    this.el.querySelector('#phone-info').innerHTML =
      `Добыча: <b>${st.kills}</b> · Очки: <b>${st.score}</b><br><small>Звери рядом: ${st.animals.filter((q) => !q.dead && Math.hypot(q.x - st.x, q.z - st.z) < 120).map((q) => SPECIES[q.type]?.name).filter((v, i, arr) => arr.indexOf(v) === i).join(', ') || 'нет'}</small>`;
  }
}

export { HALF };
