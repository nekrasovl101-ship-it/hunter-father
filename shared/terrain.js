// Детерминированный генератор мира. Чистый JS без three.js —
// один и тот же код работает в браузере и на сервере (Cloudflare Worker).

export const WORLD_SIZE = 800;           // метров по стороне
export const HALF = WORLD_SIZE / 2;
export const PLAY_LIMIT = HALF - 45;     // граница, дальше которой нельзя уйти
export const WATER_LEVEL = 0;
export const RIVER_HALF = 6;             // полуширина русла
const RIVER_BED = -1.3;
const SEED = 1337;

function hash(ix, iz, s) {
  let h = (Math.imul(ix, 374761393) + Math.imul(iz, 668265263) + Math.imul(s, 0x9e3779b1)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

function vnoise(x, z, s) {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx), uz = fz * fz * (3 - 2 * fz);
  const a = hash(ix, iz, s), b = hash(ix + 1, iz, s), c = hash(ix, iz + 1, s), d = hash(ix + 1, iz + 1, s);
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}

export function fbm(x, z, oct, s = SEED) {
  let sum = 0, amp = 0.5, f = 1, norm = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * vnoise(x * f, z * f, s + i * 17);
    norm += amp; f *= 2.03; amp *= 0.5;
  }
  return sum / norm; // 0..1
}

export function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
const mix = (a, b, t) => a + (b - a) * t;

// Речка течёт с юга на север, извиваясь по X
export function riverX(z) {
  return 70 + 55 * Math.sin(z * 0.0062) + 28 * Math.sin(z * 0.0171 + 1.3);
}
function riverSlope(z) {
  return 55 * 0.0062 * Math.cos(z * 0.0062) + 28 * 0.0171 * Math.cos(z * 0.0171 + 1.3);
}
export function riverDist(x, z) {
  const k = riverSlope(z);
  return Math.abs(x - riverX(z)) / Math.sqrt(1 + k * k);
}

// Лесистость 0..1 (пятна леса и поляны)
export function forestAt(x, z) {
  const n = fbm(x * 0.0055 + 50, z * 0.0055 - 30, 4, 99);
  return smoothstep(0.47, 0.58, n);
}

function landHeight(x, z) {
  const hills = fbm(x * 0.0042, z * 0.0042, 5);
  const big = fbm(x * 0.0016 + 100, z * 0.0016, 3, 7);
  let h = 3 + hills * 26 + big * big * 38;
  // горы по краям карты
  const e = Math.max(Math.abs(x), Math.abs(z));
  if (e > HALF - 70) { const t = Math.min(1.5, (e - (HALF - 70)) / 70); h += t * t * 50; }
  return h;
}

function naturalHeight(x, z) {
  const d = riverDist(x, z);
  const land = landHeight(x, z);
  const valley = smoothstep(RIVER_HALF, RIVER_HALF + 130, d);
  const near = mix(2.4, land, valley);
  return mix(RIVER_BED, near, smoothstep(RIVER_HALF - 1, RIVER_HALF + 9, d));
}

// ---------- постройки и дороги (детерминированно, общие для клиента и сервера) ----------
// type: lodge — база охотников у точки старта, cabin — избушка, shed — сарай
const SITE_CANDIDATES = [
  { x: -14, z: 30, rot: Math.PI + 0.15, type: 'lodge' },
  { x: 8, z: 38, rot: Math.PI - 0.1, type: 'shed' },
  { x: -170, z: -120, rot: 0.8, type: 'cabin' },
  { x: 215, z: 150, rot: -2.2, type: 'cabin' },
  { x: -240, z: 210, rot: 2.6, type: 'cabin' },
  { x: 165, z: -235, rot: -0.6, type: 'cabin' },
  { x: -60, z: -285, rot: 0.3, type: 'cabin' },
  { x: 265, z: -55, rot: 1.6, type: 'shed' },
  { x: -285, z: -10, rot: -1.2, type: 'cabin' },
  // хутора поближе к базе
  { x: 95, z: 70, rot: -1.0, type: 'cabin' },
  { x: 104, z: 82, rot: -1.0, type: 'shed' },
  { x: -115, z: 90, rot: 2.0, type: 'lodge' },
  { x: 70, z: -125, rot: 0.4, type: 'cabin' },
  { x: -130, z: -40, rot: -1.9, type: 'cabin' },
  { x: 30, z: 235, rot: 3.0, type: 'cabin' },
  { x: -215, z: -235, rot: 0.9, type: 'cabin' },
  { x: 240, z: 40, rot: 1.9, type: 'lodge' },
];
export const SITE_SIZE = { lodge: [11, 8], cabin: [7, 6], shed: [4, 3.5] };

export const SITES = SITE_CANDIDATES.map((c) => {
  let { x, z } = c;
  // отодвигаем от реки, если слишком близко
  for (let i = 0; i < 20 && riverDist(x, z) < 40; i++) x += x > riverX(z) ? 6 : -6;
  const [w, d] = SITE_SIZE[c.type];
  const r = Math.hypot(w, d) / 2 + 3;
  // высота площадки — среднее по углам
  let h = 0;
  for (const [ox, oz] of [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r]]) h += naturalHeight(x + ox, z + oz);
  return { ...c, x, z, h: h / 5, r };
});
// постройки рядом с базой стоят на одной площадке
for (const s of SITES) if (s !== SITES[0] && Math.hypot(s.x - SITES[0].x, s.z - SITES[0].z) < 40) s.h = SITES[0].h;

// Дороги: от базы к каждой избушке, с плавными изгибами
function buildRoads() {
  const base = SITES[0];
  const roads = [];
  for (const s of SITES.slice(1)) {
    if (s.type === 'shed' && Math.hypot(s.x - base.x, s.z - base.z) < 30) continue;
    const pts = [];
    const N = 10;
    const dx = s.x - base.x, dz = s.z - base.z;
    const len = Math.hypot(dx, dz);
    const nx = -dz / len, nz = dx / len;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const bend = Math.sin(t * Math.PI) * (vnoise(s.x * 0.01, s.z * 0.01, 41) - 0.5) * len * 0.35
        + Math.sin(t * Math.PI * 3) * (vnoise(s.z * 0.02, s.x * 0.02, 43) - 0.5) * 30 * Math.sin(t * Math.PI);
      pts.push([base.x + dx * t + nx * bend, base.z + dz * t + nz * bend]);
    }
    roads.push(pts);
  }
  return roads;
}
export const ROADS = buildRoads();
export const ROAD_HALF = 2.2;

export function roadDist(x, z) {
  let best = Infinity;
  for (const pts of ROADS) {
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
      // быстрый отсев
      if (x < Math.min(ax, bx) - 20 || x > Math.max(ax, bx) + 20 || z < Math.min(az, bz) - 20 || z > Math.max(az, bz) + 20) continue;
      const vx = bx - ax, vz = bz - az;
      const t = Math.max(0, Math.min(1, ((x - ax) * vx + (z - az) * vz) / (vx * vx + vz * vz)));
      const d = Math.hypot(x - ax - vx * t, z - az - vz * t);
      if (d < best) best = d;
    }
  }
  return best;
}

export function siteDist(x, z) {
  let best = Infinity;
  for (const s of SITES) best = Math.min(best, Math.hypot(x - s.x, z - s.z) - s.r);
  return best;
}

export function heightAt(x, z) {
  let h = naturalHeight(x, z);
  for (const s of SITES) {
    const d = Math.hypot(x - s.x, z - s.z);
    if (d < s.r + 18) h = mix(s.h, h, smoothstep(s.r, s.r + 18, d));
  }
  return h;
}

export function slopeAt(x, z) {
  const e = 1.5;
  const dx = heightAt(x + e, z) - heightAt(x - e, z);
  const dz = heightAt(x, z + e) - heightAt(x, z - e);
  return Math.sqrt(dx * dx + dz * dz) / (2 * e); // tan угла
}

// Веса текстур: forest, mud(грязь/дорога), rock + macro-вариация (0..1)
export function splatAt(x, z, h, slope) {
  const d = riverDist(x, z);
  const n = vnoise(x * 0.2, z * 0.2, 5) - 0.5;
  const riverMud = 1 - smoothstep(RIVER_HALF + 3, RIVER_HALF + 11, d + n * 4);
  const road = 1 - smoothstep(ROAD_HALF - 0.6, ROAD_HALF + 1.4, roadDist(x, z) + n * 1.5);
  const yard = 1 - smoothstep(-2, 6, siteDist(x, z) + n * 4);
  const mud = Math.max(riverMud, road, yard * 0.85);
  const rock = smoothstep(0.55, 0.85, slope) * (1 - mud * 0.5);
  const forest = forestAt(x, z) * (1 - mud) * (1 - rock);
  const macro = fbm(x * 0.03, z * 0.03, 2, 3);
  return [forest, mud, rock, macro];
}

// Плотность травы 0..1
export function grassDensityAt(x, z, splat) {
  const [forest, mud, rock] = splat;
  const patch = smoothstep(0.25, 0.5, fbm(x * 0.05, z * 0.05, 2, 11));
  return Math.max(0, (1 - forest * 0.7) * (1 - mud) * (1 - rock * 1.2) * (0.45 + 0.55 * patch));
}

export function isWater(x, z) {
  return heightAt(x, z) < WATER_LEVEL - 0.15;
}
