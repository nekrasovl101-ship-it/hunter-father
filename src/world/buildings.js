import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { SITES, SITE_SIZE, forestAt, riverDist, roadDist, siteDist, slopeAt, heightAt, RIVER_HALF, PLAY_LIMIT } from '../../shared/terrain.js';
import { mulberry32 } from '../../shared/world.js';

// Процедурные избы из брёвен с PBR-текстурами (Poly Haven), сараи и вышки.
// Все постройки склеиваются в один меш на материал → ~6 draw calls на всю карту.

// UV в метрах по доминирующей оси нормали (как трипланар, но заранее)
function worldUV(g, scale = 0.5, rotateLogs = false) {
  g = g.index ? g.toNonIndexed() : g;
  const p = g.attributes.position, n = g.attributes.normal;
  const uv = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i++) {
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
    let u, v;
    if (ay >= ax && ay >= az) { u = p.getX(i); v = p.getZ(i); }
    else if (ax >= az) { u = p.getZ(i); v = p.getY(i); }
    else { u = p.getX(i); v = p.getY(i); }
    if (rotateLogs) [u, v] = [v, u];
    uv[i * 2] = u * scale; uv[i * 2 + 1] = v * scale;
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return g;
}

const box = (w, h, d, x, y, z) => new THREE.BoxGeometry(w, h, d).translate(x, y, z);

class Builder {
  constructor() { this.parts = {}; }
  add(mat, geo, uvScale = 0.5) {
    (this.parts[mat] ||= []).push(worldUV(geo, uvScale));
  }
  // перенос всех частей одной постройки в мир
  commit(local, x, y, z, rot) {
    const m = new THREE.Matrix4().makeRotationY(rot).setPosition(x, y, z);
    for (const [mat, list] of Object.entries(local.parts)) {
      for (const g of list) (this.parts[mat] ||= []).push(g.clone().applyMatrix4(m));
    }
  }
}

function cabin(type, rnd) {
  const b = new Builder();
  const [w, d] = SITE_SIZE[type];
  const isShed = type === 'shed';
  const H = isShed ? 2.6 : type === 'lodge' ? 3.3 : 3.0;
  const t = 0.32;
  const wallMat = isShed ? 'planks' : 'logs';
  // фундамент
  b.add('stone', box(w + 0.35, 0.9, d + 0.35, 0, -0.35, 0), 0.6);
  // стены
  b.add(wallMat, box(w, H, t, 0, H / 2, d / 2 - t / 2));
  b.add(wallMat, box(w, H, t, 0, H / 2, -d / 2 + t / 2));
  b.add(wallMat, box(t, H, d - 2 * t, w / 2 - t / 2, H / 2, 0));
  b.add(wallMat, box(t, H, d - 2 * t, -w / 2 + t / 2, H / 2, 0));
  if (!isShed) {
    // выступающие концы брёвен на углах
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      for (let y = 0.15; y < H; y += 0.3) {
        const g = new THREE.CylinderGeometry(0.15, 0.15, 0.7, 7).rotateZ(Math.PI / 2).translate(sx * (w / 2 + 0.05), y, sz * (d / 2 - 0.15));
        b.add('bark', g, 1);
        const g2 = new THREE.CylinderGeometry(0.15, 0.15, 0.7, 7).rotateX(Math.PI / 2).translate(sx * (w / 2 - 0.15), y + 0.15, sz * (d / 2 + 0.05));
        b.add('bark', g2, 1);
      }
    }
  }
  // крыша (конёк вдоль X)
  const pitch = isShed ? 0.42 : 0.6;
  const ov = 0.55;
  const ridgeH = (d / 2) * Math.tan(pitch);
  const half = (d / 2 + ov) / Math.cos(pitch);
  for (const s of [1, -1]) {
    const g = new THREE.BoxGeometry(w + 2 * ov, 0.14, half);
    g.rotateX(s * pitch);
    g.translate(0, H + ridgeH / 2 - (ov * Math.tan(pitch)) / 2 + 0.08, (s * (d / 2 + ov)) / 2 - s * 0.0);
    b.add('roof', g, 0.5);
  }
  b.add('planks', box(w + 2 * ov, 0.18, 0.22, 0, H + ridgeH + 0.12, 0), 0.5); // конёк
  // фронтоны
  for (const s of [1, -1]) {
    const shape = new THREE.Shape([new THREE.Vector2(-d / 2, 0), new THREE.Vector2(d / 2, 0), new THREE.Vector2(0, ridgeH)]);
    const g = new THREE.ExtrudeGeometry(shape, { depth: t, bevelEnabled: false });
    g.rotateY(Math.PI / 2).translate(s * (w / 2) - (s > 0 ? t : 0), H, 0);
    b.add(isShed ? 'planks' : 'planks', g, 0.5);
  }
  // дверь
  const doorX = isShed ? 0 : -w * 0.22;
  b.add('door', box(isShed ? 1.8 : 1.0, 2.05, 0.08, doorX, 1.03, d / 2 + 0.03), 0.6);
  for (const s of [-1, 1]) b.add('planks', box(0.12, 2.25, 0.14, doorX + s * (isShed ? 0.96 : 0.56), 1.12, d / 2 + 0.05), 1);
  b.add('planks', box(isShed ? 2.1 : 1.25, 0.14, 0.14, doorX, 2.2, d / 2 + 0.05), 1);
  // окна со ставнями
  const windows = [];
  if (!isShed) {
    windows.push([w * 0.22, d / 2 + 0.03, 0], [-w * 0.2, -d / 2 - 0.03, Math.PI], [w * 0.2, -d / 2 - 0.03, Math.PI]);
    windows.push([w / 2 + 0.03, 0, Math.PI / 2], [-w / 2 - 0.03, 0, -Math.PI / 2]);
    if (type === 'lodge') windows.push([w * 0.42, d / 2 + 0.03, 0]);
  }
  for (const [wx, wz, wr] of windows) {
    const parts = [
      ['glass', box(0.95, 0.85, 0.04, 0, 1.55, 0)],
      ['planks', box(1.15, 0.1, 0.1, 0, 2.02, 0.03)], ['planks', box(1.15, 0.1, 0.12, 0, 1.08, 0.04)],
      ['planks', box(0.08, 0.95, 0.1, -0.53, 1.55, 0.03)], ['planks', box(0.08, 0.95, 0.1, 0.53, 1.55, 0.03)],
      ['planks', box(0.05, 0.85, 0.06, 0, 1.55, 0.03)],
      ['door', box(0.5, 0.95, 0.05, -0.85, 1.55, 0.05)], ['door', box(0.5, 0.95, 0.05, 0.85, 1.55, 0.05)],
    ];
    const m = new THREE.Matrix4().makeRotationY(wr).setPosition(wx, 0, wz);
    for (const [mat, g] of parts) b.add(mat, g.applyMatrix4(m), 1);
  }
  // крыльцо с навесом
  if (!isShed) {
    const pd = 2.2;
    b.add('planks', box(w * 0.9, 0.16, pd, 0, 0.32, d / 2 + pd / 2), 0.7);
    b.add('planks', box(1.2, 0.16, 0.5, doorX, 0.12, d / 2 + pd + 0.25), 0.7);
    for (const px of [-w * 0.43, 0, w * 0.43]) b.add('bark', new THREE.CylinderGeometry(0.1, 0.12, H - 0.3, 7).translate(px, (H - 0.3) / 2 + 0.3, d / 2 + pd - 0.15), 1);
    const pr = new THREE.BoxGeometry(w * 0.95, 0.1, pd + 0.5).rotateX(0.22).translate(0, H + 0.02, d / 2 + pd / 2 + 0.1);
    b.add('roof', pr, 0.5);
    b.add('planks', box(w * 0.9, 0.08, 0.08, 0, 1.0, d / 2 + pd - 0.12), 1); // перила
  }
  // печная труба
  if (!isShed) b.add('stone', box(0.85, H + ridgeH + 1.4, 0.85, w / 2 - 1.0, (H + ridgeH + 1.4) / 2, -d * 0.2), 0.6);
  return b;
}

function woodpile(b, x, z, rot) {
  const m = new THREE.Matrix4().makeRotationY(rot).setPosition(x, 0, z);
  for (let row = 0; row < 4; row++) {
    for (let i = 0; i < 6 - row; i++) {
      const g = new THREE.CylinderGeometry(0.14, 0.14, 1.6, 7).rotateX(Math.PI / 2)
        .translate((i - (5 - row) / 2) * 0.29, 0.14 + row * 0.25, 0).applyMatrix4(m);
      b.add('bark', g, 1);
    }
  }
}

function firePit(b, x, z, rnd) {
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    b.add('stone', new THREE.IcosahedronGeometry(0.22 + rnd() * 0.08, 0).scale(1, 0.7, 1).translate(x + Math.cos(a) * 0.8, 0.08, z + Math.sin(a) * 0.8), 1);
  }
  for (let i = 0; i < 3; i++) {
    b.add('bark', new THREE.CylinderGeometry(0.07, 0.07, 0.9, 6).rotateZ(Math.PI / 2).rotateY(i * 2.1).translate(x, 0.1, z), 1);
  }
}

// Вышка: 4 опоры, площадка 2×2 м на высоте 4.5 м, лестница, перила, крыша
export const TOWER_H = 4.5;
function tower(b) {
  const h = TOWER_H, s = 1.0;
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    b.add('bark', new THREE.CylinderGeometry(0.09, 0.12, h + 2.2, 6).translate(sx * s, (h + 2.2) / 2, sz * s), 1);
  }
  // раскосы
  for (const sx of [-1, 1]) {
    const g = new THREE.CylinderGeometry(0.05, 0.05, Math.hypot(2 * s, h * 0.7), 5).rotateX(Math.atan2(2 * s, h * 0.7)).translate(sx * s, h * 0.4, 0);
    b.add('bark', g, 1);
  }
  b.add('planks', box(2 * s + 0.4, 0.12, 2 * s + 0.4, 0, h, 0), 0.7);
  for (const [w, d, x, z] of [[2.4, 0.08, 0, 1.15], [2.4, 0.08, 0, -1.15], [0.08, 2.4, 1.15, 0], [0.08, 2.4, -1.15, 0]]) {
    b.add('planks', box(w, 0.1, d, x, h + 0.9, z), 1);
    b.add('planks', box(w, 0.5, d, x, h + 0.3, z), 0.7);
  }
  b.add('roof', box(2.8, 0.1, 2.8, 0, h + 2.25, 0), 0.5);
  // лестница с юга (+Z)
  for (const sx of [-0.3, 0.3]) {
    b.add('bark', new THREE.CylinderGeometry(0.05, 0.05, h + 0.6, 5).rotateX(-0.25).translate(sx, (h + 0.6) / 2 - 0.1, s + 0.7), 1);
  }
  for (let y = 0.4; y < h; y += 0.4) b.add('bark', new THREE.CylinderGeometry(0.035, 0.035, 0.6, 5).rotateZ(Math.PI / 2).translate(0, y, s + 0.7 + (h / 2 - y) * 0.255 - h * 0.13 + 0.55), 1);
}

export function pickTowerSpots() {
  const rnd = mulberry32(2024);
  const spots = [];
  // первая вышка недалеко от старта
  const cands = [];
  for (let i = 0; i < 600; i++) {
    const x = (rnd() * 2 - 1) * (PLAY_LIMIT - 40), z = (rnd() * 2 - 1) * (PLAY_LIMIT - 40);
    const f = forestAt(x, z);
    if (f < 0.05 || f > 0.4) continue;
    if (riverDist(x, z) < RIVER_HALF + 15 || roadDist(x, z) < 6 || siteDist(x, z) < 10 || slopeAt(x, z) > 0.25) continue;
    cands.push({ x, z, d0: Math.hypot(x, z) });
  }
  cands.sort((a, b) => a.d0 - b.d0);
  for (const c of cands) {
    if (spots.length === 0 && c.d0 < 35) continue;
    if (spots.every((s) => Math.hypot(s.x - c.x, s.z - c.z) > 170)) spots.push({ ...c, y: heightAt(c.x, c.z), rot: Math.atan2(-c.x, -c.z) + Math.PI });
    if (spots.length >= 6) break;
  }
  return spots;
}

export function createBuildings(world, preset, sets) {
  const rnd = mulberry32(8);
  const all = new Builder();
  for (const s of SITES) all.commit(cabin(s.type, rnd), s.x, s.h, s.z, s.rot);
  // хозяйство у базы
  const base = SITES[0];
  const yard = new Builder();
  woodpile(yard, 6.5, 2, 0.3);
  woodpile(yard, 6.5, 3.2, 0.3);
  firePit(yard, -2, 10, rnd);
  all.commit(yard, base.x, base.h, base.z, base.rot);

  const towers = pickTowerSpots();
  for (const t of towers) {
    const tb = new Builder();
    tower(tb);
    all.commit(tb, t.x, t.y - 0.1, t.z, t.rot);
  }

  const mk = (set, opts = {}) => new THREE.MeshStandardMaterial({
    map: set.albedo, normalMap: preset.normalMaps ? set.normal : null, roughnessMap: set.rough, roughness: 1, metalness: 0, ...opts,
  });
  const mats = {
    logs: mk(sets.logs),
    planks: mk(sets.planks),
    door: mk(sets.planks, { color: 0x7a5a40 }),
    roof: mk(sets.roof, { color: 0xb0a898 }),
    stone: mk(sets.rock),
    bark: mk(sets.bark),
    glass: new THREE.MeshStandardMaterial({ color: 0x1a2228, roughness: 0.08, metalness: 0.6, emissive: 0xffa040, emissiveIntensity: 0 }),
  };
  const group = new THREE.Group();
  for (const [name, list] of Object.entries(all.parts)) {
    const geo = mergeGeometries(list.map((g) => {
      g = g.index ? g.toNonIndexed() : g;
      for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
      return g;
    }));
    const mesh = new THREE.Mesh(geo, mats[name]);
    mesh.castShadow = preset.shadows;
    mesh.receiveShadow = preset.shadows;
    mesh.matrixAutoUpdate = false;
    group.add(mesh);
  }
  group.towers = towers;
  // окна светятся к вечеру
  group.setEvening = (k) => { mats.glass.emissiveIntensity = k * 1.6; };
  return group;
}
