import * as THREE from 'three';
import { HALF, WORLD_SIZE, fbm, riverDist, RIVER_HALF, roadDist, ROAD_HALF, siteDist } from '../../shared/terrain.js';
import { createWaterMaterial, Mirror } from './water.js';

// Лужи — настоящая вода, как в реке. 1) Карта луж 512×512 (≈1.6 м на клетку): ровные низинки,
// колеи дорог, дворы. 2) Связные пятна → у каждого свой уровень воды (немного выше дна).
// 3) Плоская водная поверхность на этом уровне: где земля выше — её закрывает рельеф, так
// получается естественный берег. Карту же читает игрок — звук шлёпанья по воде.
const N = 512;

export function createPuddles(ground) {
  const step = WORLD_SIZE / N;
  const mask = new Float32Array(N * N);
  const H = new Float32Array(N * N);
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const x = -HALF + (i + 0.5) * step, z = -HALF + (j + 0.5) * step;
    const k = j * N + i;
    H[k] = ground.sample(x, z);
    if (riverDist(x, z) < RIVER_HALF + 4 || siteDist(x, z) < 2) continue;
    const e = 2.5;
    const hx1 = ground.sample(x + e, z), hx0 = ground.sample(x - e, z), hz1 = ground.sample(x, z + e), hz0 = ground.sample(x, z - e);
    const slope = Math.hypot(hx1 - hx0, hz1 - hz0) / (2 * e);
    if (slope > 0.14) continue;
    const bowl = (hx1 + hx0 + hz1 + hz0) / 4 - H[k];
    let n = fbm(x * 0.09, z * 0.09, 3, 501) * 0.65 + fbm(x * 0.3, z * 0.3, 2, 777) * 0.35;
    n += Math.max(0, bowl) * 0.6 - slope * 1.2;
    const road = roadDist(x, z) < ROAD_HALF + 0.6 ? 0.1 : 0;
    const yard = siteDist(x, z) < 7 ? 0.03 : 0;
    mask[k] = THREE.MathUtils.smoothstep(n + road + yard, 0.62, 0.7);
  }

  // связные пятна и их уровень воды
  const comp = new Int32Array(N * N).fill(-1);
  const levels = [];
  const cells = [];
  const stack = [];
  for (let k0 = 0; k0 < N * N; k0++) {
    if (mask[k0] < 0.35 || comp[k0] >= 0) continue;
    const id = levels.length;
    const list = [];
    stack.push(k0); comp[k0] = id;
    while (stack.length) {
      const k = stack.pop(); list.push(k);
      const i = k % N, j = (k / N) | 0;
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const ii = i + di, jj = j + dj;
        if (ii < 0 || jj < 0 || ii >= N || jj >= N) continue;
        const kk = jj * N + ii;
        if (comp[kk] < 0 && mask[kk] >= 0.35) { comp[kk] = id; stack.push(kk); }
      }
    }
    // уровень: 45-й перцентиль высот пятна + 3 см (вода заполняет нижнюю часть)
    const hs = list.map((k) => H[k]).sort((a, b) => a - b);
    const lvl = hs[Math.floor(hs.length * 0.45)] + 0.03;
    levels.push(list.length < 2 ? -1e9 : lvl);
    cells.push(list);
  }

  // геометрия: квадрат на каждую клетку пятна (+ кайма в 1 клетку) на уровне воды
  const pos = [];
  const idx = [];
  const seen = new Uint8Array(N * N);
  cells.forEach((list, id) => {
    const lvl = levels[id];
    if (lvl < -1e8) return;
    for (const k of list) {
      const i0 = k % N, j0 = (k / N) | 0;
      for (let dj = -2; dj <= 2; dj++) for (let di = -2; di <= 2; di++) {
        const i = i0 + di, j = j0 + dj;
        if (i < 0 || j < 0 || i >= N || j >= N) continue;
        const kk = j * N + i;
        if (seen[kk]) continue;
        // клетку, где земля заметно выше воды, не рисуем
        if (H[kk] > lvl + 0.6) continue;
        seen[kk] = 1;
        if (comp[kk] < 0) comp[kk] = id; // кайма принадлежит этому пятну
        const x = -HALF + i * step, z = -HALF + j * step, b = pos.length / 3;
        pos.push(x, lvl, z, x + step, lvl, z, x, lvl, z + step, x + step, lvl, z + step);
        idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
      }
    }
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeBoundingSphere();

  // значение маски (для мокрой кромки в шейдере земли)
  const data = new Uint8Array(N * N);
  for (let k = 0; k < N * N; k++) data[k] = Math.round(mask[k] * 255);
  const tex = new THREE.DataTexture(data, N, N, THREE.RedFormat, THREE.UnsignedByteType);
  tex.magFilter = tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;

  const cellOf = (x, z) => {
    const i = Math.floor((x + HALF) / step), j = Math.floor((z + HALF) / step);
    return i < 0 || j < 0 || i >= N || j >= N ? -1 : j * N + i;
  };
  return {
    tex, geo, levels, count: levels.length,
    // уровень воды в точке или null
    levelAt(x, z) { const k = cellOf(x, z); if (k < 0 || comp[k] < 0) return null; const l = levels[comp[k]]; return l < -1e8 ? null : l; },
    // стоит ли точка в воде (земля ниже уровня)
    wetAt(x, z) { const l = this.levelAt(x, z); return l !== null && ground.sample(x, z) < l - 0.005; },
  };
}

// Меш луж с водяным материалом (как у реки) и, на «Ультре», своим зеркальным отражением
export function createPuddleMesh(puddles, heightTex, preset) {
  const mat = createWaterMaterial(heightTex, preset, true);
  mat.uniforms.uMask.value = puddles.tex;
  const mesh = new THREE.Mesh(puddles.geo, mat);
  mesh.renderOrder = 2;
  mesh.matrixAutoUpdate = false;
  if (preset.post) mesh.mirror = new Mirror([mat], 0);
  // отражение строится для плоскости ближайшей к камере лужи
  mesh.nearestLevel = (cam) => {
    let best = null, bd = 1e9;
    for (let dz = -30; dz <= 30; dz += 3) for (let dx = -30; dx <= 30; dx += 3) {
      const l = puddles.levelAt(cam.x + dx, cam.z + dz);
      if (l === null) continue;
      const d = dx * dx + dz * dz;
      if (d < bd) { bd = d; best = l; }
    }
    return best;
  };
  return mesh;
}
