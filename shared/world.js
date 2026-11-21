// Расстановка деревьев/камней (детерминированно) + пространственная сетка
// для коллизий и проверки линии выстрела. Используется клиентом и сервером.
import { houseLayout } from './houses.js';
import { HALF, PLAY_LIMIT, heightAt, slopeAt, forestAt, riverDist, RIVER_HALF, fbm, SITES, SITE_SIZE, roadDist, siteDist, ROAD_HALF } from './terrain.js';

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CELL = 16;
const GRID_N = Math.ceil((HALF * 2) / CELL);

export class World {
  constructor(seed = 4242) {
    this.trees = [];   // {x,z,y,s,rot,type,r}  type: 0 = ель, 1 = лиственное
    this.rocks = [];   // {x,z,y,s,rot,r}
    this.grid = new Array(GRID_N * GRID_N);
    this.buildings = [];
    const rnd = mulberry32(seed);

    // постройки: стены с проёмами + мебель — ориентированные коробки (OBB) для коллизий и пуль.
    // В дома можно заходить через дверь.
    for (const site of SITES) {
      const L = houseLayout(site.type);
      const c = Math.cos(site.rot), s = Math.sin(site.rot);
      const r = Math.hypot(L.w, L.d) / 2;
      // локальная точка → мир (поворот как у Matrix4.makeRotationY)
      const at = (lx, lz) => [site.x + lx * c + lz * s, site.z - lx * s + lz * c];
      const boxes = [];
      for (const q of L.walls) {
        const [x, z] = at(q.lx, q.lz);
        boxes.push({ x, z, y0: site.h + q.y0 - (q.y0 === 0 ? 0.5 : 0), y1: site.h + q.y1, hw: q.hw, hd: q.hd, rot: site.rot, c, s });
      }
      for (const f of L.furniture) {
        const [x, z] = at(f.lx, f.lz);
        boxes.push({ x, z, y0: site.h, y1: site.h + f.h, hw: f.hw, hd: f.hd, rot: site.rot, c, s, low: f.h < 0.9 });
      }
      // крыша — только для пуль (над головой)
      boxes.push({ x: site.x, z: site.z, y0: site.h + L.H, y1: site.h + L.H + 2.2, hw: L.w / 2, hd: L.d / 2, rot: site.rot, c, s, roof: true });
      const bld = { x: site.x, z: site.z, r, type: site.type, rot: site.rot, h: site.h, layout: L, boxes };
      this.buildings.push(bld);
      for (const b of boxes) {
        b.r = Math.hypot(b.hw, b.hd);
        for (let ox = -r; ox <= r; ox += CELL / 2) for (let oz = -r; oz <= r; oz += CELL / 2) {
          const i = this._cellIndex(site.x + ox, site.z + oz);
          if (i >= 0 && !(this.grid[i] ||= []).some((e) => e.o === b)) this.grid[i].push({ o: b, kind: 'box' });
        }
      }
    }

    const step = 6.5;
    for (let gz = -HALF + 20; gz < HALF - 20; gz += step) {
      for (let gx = -HALF + 20; gx < HALF - 20; gx += step) {
        const x = gx + (rnd() - 0.5) * step * 0.9;
        const z = gz + (rnd() - 0.5) * step * 0.9;
        const roll = rnd();
        const f = forestAt(x, z);
        const p = f * 0.8 + 0.02;
        if (roll > p) continue;
        if (riverDist(x, z) < RIVER_HALF + 7) continue;
        if (Math.hypot(x, z) < 12) continue; // точка спавна свободна
        if (siteDist(x, z) < 8 || roadDist(x, z) < ROAD_HALF + 2.5) continue;
        const sl = slopeAt(x, z);
        if (sl > 0.75) continue;
        const pineBias = fbm(x * 0.01, z * 0.01, 2, 21);
        const type = rnd() < pineBias * 1.4 ? 0 : 1;
        const s = 0.75 + rnd() * 0.6;
        const t = { x, z, y: heightAt(x, z) - 0.2, s, rot: rnd() * Math.PI * 2, type, r: (type === 0 ? 0.32 : 0.38) * s };
        this.trees.push(t);
        this._add(t, 'tree');
      }
    }

    for (let i = 0; i < 520; i++) {
      const x = (rnd() * 2 - 1) * (HALF - 25);
      const z = (rnd() * 2 - 1) * (HALF - 25);
      if (Math.hypot(x, z) < 10) continue;
      if (siteDist(x, z) < 6 || roadDist(x, z) < ROAD_HALF + 1.5) continue;
      const sl = slopeAt(x, z);
      const nearRiver = riverDist(x, z) < RIVER_HALF + 14;
      if (!(sl > 0.35 || nearRiver || rnd() < 0.35)) continue;
      const s = nearRiver ? 0.4 + rnd() * 0.8 : 0.5 + Math.pow(rnd(), 2) * 2.4;
      const r = { x, z, y: heightAt(x, z) - 0.25 * s, s, rot: rnd() * Math.PI * 2, r: 0.85 * s };
      this.rocks.push(r);
      this._add(r, 'rock');
    }
  }

  _cellIndex(x, z) {
    const cx = Math.floor((x + HALF) / CELL), cz = Math.floor((z + HALF) / CELL);
    if (cx < 0 || cz < 0 || cx >= GRID_N || cz >= GRID_N) return -1;
    return cz * GRID_N + cx;
  }
  _add(o, kind) {
    const i = this._cellIndex(o.x, o.z);
    if (i < 0) return;
    (this.grid[i] ||= []).push({ o, kind });
  }

  // Все препятствия вокруг точки
  near(x, z, out = []) {
    out.length = 0;
    const cx = Math.floor((x + HALF) / CELL), cz = Math.floor((z + HALF) / CELL);
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const ix = cx + dx, iz = cz + dz;
      if (ix < 0 || iz < 0 || ix >= GRID_N || iz >= GRID_N) continue;
      const c = this.grid[iz * GRID_N + ix];
      if (c) for (const e of c) out.push(e);
    }
    return out;
  }

  // Выталкивание круга (игрок/животное) из стволов и камней
  collide(pos, radius) {
    const list = this.near(pos.x, pos.z, this._tmp || (this._tmp = []));
    for (const { o, kind } of list) {
      if (kind === 'box') {
        // балки над дверью, окна сверху, крыша — не мешают ходить
        if (pos.y !== undefined && (o.y0 > pos.y + 1.9 || o.y1 < pos.y + 0.35)) continue;
        if (pos.y === undefined && (o.roof || o.y0 > o.y1 - 1)) continue;
        collideBox(pos, radius, o);
        continue;
      }
      const dx = pos.x - o.x, dz = pos.z - o.z;
      const min = o.r + radius;
      const d2 = dx * dx + dz * dz;
      if (d2 < min * min && d2 > 1e-6) {
        const d = Math.sqrt(d2);
        pos.x = o.x + (dx / d) * min;
        pos.z = o.z + (dz / d) * min;
      }
    }
    pos.x = Math.max(-PLAY_LIMIT, Math.min(PLAY_LIMIT, pos.x));
    pos.z = Math.max(-PLAY_LIMIT, Math.min(PLAY_LIMIT, pos.z));
  }

  // Дистанция до первого препятствия (рельеф/ствол/камень) вдоль луча или Infinity
  raycastStatic(ox, oy, oz, dx, dy, dz, maxDist) {
    let best = Infinity;
    // рельеф: марш с шагом 0.75 м
    let prevAbove = true;
    for (let t = 0.5; t < maxDist; t += 0.75) {
      const x = ox + dx * t, y = oy + dy * t, z = oz + dz * t;
      // допуск 0.3 м: отображаемый рельеф чуть грубее точного — пуля не «застревает» в невидимых буграх
      const above = y > heightAt(x, z) - 0.3;
      if (!above && prevAbove) { best = t; break; }
      prevAbove = above;
    }
    // стволы/камни: проверяем клетки вдоль луча
    const seen = new Set();
    const lim = Math.min(best, maxDist);
    for (let t = 0; t < lim + CELL; t += CELL * 0.5) {
      const x = ox + dx * t, z = oz + dz * t;
      for (const e of this.near(x, z)) {
        if (seen.has(e.o)) continue;
        seen.add(e.o);
        const hit = e.kind === 'box' ? rayBox(ox, oy, oz, dx, dy, dz, e.o) : e.kind === 'tree'
          ? rayCylinder(ox, oy, oz, dx, dy, dz, e.o.x, e.o.z, e.o.r * 1.1, e.o.y, e.o.y + 9 * e.o.s)
          : raySphere(ox, oy, oz, dx, dy, dz, e.o.x, e.o.y + 0.5 * e.o.s, e.o.z, e.o.r);
        if (hit < best) best = hit;
      }
    }
    return best;
  }
}

// Выталкивание круга из ориентированной коробки
export function collideBox(pos, radius, b) {
  const rx = pos.x - b.x, rz = pos.z - b.z;
  // в локальные координаты коробки
  const lx = rx * b.c - rz * b.s, lz = rx * b.s + rz * b.c;
  const cx = Math.max(-b.hw, Math.min(b.hw, lx)), cz = Math.max(-b.hd, Math.min(b.hd, lz));
  let dx = lx - cx, dz = lz - cz;
  const d2 = dx * dx + dz * dz;
  if (d2 >= radius * radius) return false;
  let nlx, nlz;
  if (d2 > 1e-8) { const d = Math.sqrt(d2); nlx = cx + (dx / d) * radius; nlz = cz + (dz / d) * radius; }
  else { // центр внутри — выталкиваем по ближайшей стороне
    const px = b.hw - Math.abs(lx), pz = b.hd - Math.abs(lz);
    if (px < pz) { nlx = Math.sign(lx || 1) * (b.hw + radius); nlz = lz; } else { nlx = lx; nlz = Math.sign(lz || 1) * (b.hd + radius); }
  }
  pos.x = b.x + nlx * b.c + nlz * b.s;
  pos.z = b.z - nlx * b.s + nlz * b.c;
  return true;
}

export function rayBox(ox, oy, oz, dx, dy, dz, b) {
  const rx = ox - b.x, rz = oz - b.z;
  const lox = rx * b.c - rz * b.s, loz = rx * b.s + rz * b.c;
  const ldx = dx * b.c - dz * b.s, ldz = dx * b.s + dz * b.c;
  let t0 = 0, t1 = Infinity;
  for (const [o, d, mn, mx] of [[lox, ldx, -b.hw, b.hw], [oy, dy, b.y0, b.y1], [loz, ldz, -b.hd, b.hd]]) {
    if (Math.abs(d) < 1e-9) { if (o < mn || o > mx) return Infinity; continue; }
    let a = (mn - o) / d, c = (mx - o) / d;
    if (a > c) [a, c] = [c, a];
    t0 = Math.max(t0, a); t1 = Math.min(t1, c);
    if (t0 > t1) return Infinity;
  }
  return t0 > 0 ? t0 : Infinity;
}

export function raySphere(ox, oy, oz, dx, dy, dz, cx, cy, cz, r) {
  const lx = ox - cx, ly = oy - cy, lz = oz - cz;
  const b = lx * dx + ly * dy + lz * dz;
  const c = lx * lx + ly * ly + lz * lz - r * r;
  const disc = b * b - c;
  if (disc < 0) return Infinity;
  const t = -b - Math.sqrt(disc);
  return t > 0 ? t : Infinity;
}

function rayCylinder(ox, oy, oz, dx, dy, dz, cx, cz, r, y0, y1) {
  const lx = ox - cx, lz = oz - cz;
  const a = dx * dx + dz * dz;
  if (a < 1e-8) return Infinity;
  const b = lx * dx + lz * dz;
  const c = lx * lx + lz * lz - r * r;
  const disc = b * b - a * c;
  if (disc < 0) return Infinity;
  const t = (-b - Math.sqrt(disc)) / a;
  if (t <= 0) return Infinity;
  const y = oy + dy * t;
  return y >= y0 && y <= y1 ? t : Infinity;
}
