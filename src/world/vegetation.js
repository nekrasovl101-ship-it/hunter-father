import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mulberry32 } from '../../shared/world.js';

// ---------- вспомогательные функции ----------
function colorize(geo, rgb, jitter, rnd) {
  const n = geo.attributes.position.count;
  const c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const k = 1 + (rnd() - 0.5) * jitter;
    c[i * 3] = rgb[0] * k; c[i * 3 + 1] = rgb[1] * k; c[i * 3 + 2] = rgb[2] * k;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(c, 3));
  return geo;
}
function jitterVerts(geo, amt, rnd) {
  const p = geo.attributes.position;
  const map = new Map();
  for (let i = 0; i < p.count; i++) {
    const key = `${p.getX(i).toFixed(3)},${p.getY(i).toFixed(3)},${p.getZ(i).toFixed(3)}`;
    let o = map.get(key);
    if (!o) { o = [(rnd() - 0.5) * amt, (rnd() - 0.5) * amt, (rnd() - 0.5) * amt]; map.set(key, o); }
    p.setXYZ(i, p.getX(i) + o[0], p.getY(i) + o[1], p.getZ(i) + o[2]);
  }
  return geo;
}
const strip = (g) => { // единый набор атрибутов для merge
  g = g.index ? g.toNonIndexed() : g;
  for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'color', 'uv'].includes(k)) g.deleteAttribute(k);
  return g;
};

function trunk(rTop, rBot, h, seg, uvScale) {
  const g = new THREE.CylinderGeometry(rTop, rBot, h, seg, 1, true);
  g.translate(0, h / 2, 0);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * uvScale[0], uv.getY(i) * uvScale[1]);
  return g;
}

// ---------- LOD-менеджер для инстансов ----------
// items: [{x,z,...}], matrices: Float32Array(16*n)
// hi: массив InstancedMesh для ближнего уровня, lo: InstancedMesh для дальнего (или null)
export class InstanceLOD {
  constructor(items, matrices, hi, lo, hiDist, farDist) {
    Object.assign(this, { items, matrices, hi, lo, hiDist, farDist });
    this.last = new THREE.Vector3(1e9, 0, 0);
    this.lastFw = new THREE.Vector2(0, 0);
    this.lastCos = 2;
  }
  // view — {fx, fz, cos}: направление взгляда и косинус половины угла обзора (с запасом).
  // Деревья за спиной и сбоку (дальше ~45 м — их тени до кадра не дотянутся) не рисуются.
  update(cam, force = false, view = null) {
    const moved = this.last.distanceToSquared(cam) >= 9;
    const turned = view && (this.lastFw.x * view.fx + this.lastFw.y * view.fz < 0.985 || Math.abs(view.cos - this.lastCos) > 0.03);
    if (!force && !moved && !turned) return;
    this.last.copy(cam);
    if (view) { this.lastFw.set(view.fx, view.fz); this.lastCos = view.cos; }
    const fx = view ? view.fx : 0, fz = view ? view.fz : 0, cl = view ? view.cos : -2;
    const near2 = 45 * 45;
    const h2 = this.hiDist * this.hiDist, f2 = this.farDist * this.farDist;
    let nh = 0, nl = 0;
    const capHi = this.hi[0].instanceMatrix.count;
    const capLo = this.lo ? this.lo.instanceMatrix.count : 0;
    const hiArr = this.hi.map((m) => m.instanceMatrix.array);
    const loArr = this.lo?.instanceMatrix.array;
    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i];
      const dx = it.x - cam.x, dz = it.z - cam.z;
      const d2 = dx * dx + dz * dz;
      if (d2 > near2 && (dx * fx + dz * fz) < cl * Math.sqrt(d2)) continue;   // вне кадра
      if (d2 < h2 && nh < capHi) {
        const src = this.matrices.subarray(i * 16, i * 16 + 16);
        for (const a of hiArr) a.set(src, nh * 16);
        nh++;
      } else if (d2 < f2 && this.lo && nl < capLo) {
        loArr.set(this.matrices.subarray(i * 16, i * 16 + 16), nl * 16);
        nl++;
      }
    }
    for (const m of this.hi) { m.count = nh; m.instanceMatrix.needsUpdate = true; }
    if (this.lo) { this.lo.count = nl; this.lo.instanceMatrix.needsUpdate = true; }
  }
}

export function makeMatrices(items, yawOffset = 0) {
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const arr = new Float32Array(items.length * 16);
  items.forEach((it, i) => {
    q.setFromAxisAngle(up, it.rot + yawOffset);
    p.set(it.x, it.y, it.z);
    s.setScalar(it.s);
    if (it.squash) s.y *= it.squash;
    m.compose(p, q, s).toArray(arr, i * 16);
  });
  return arr;
}

export function createRocks(world, preset, rockSet, mossSet) {
  const rnd = mulberry32(9);
  const geo = new THREE.IcosahedronGeometry(1, 2);
  jitterVerts(geo, 0.35, rnd);
  geo.scale(1.1, 0.7, 1);
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({
    map: rockSet.albedo, normalMap: preset.normalMaps ? rockSet.normal : null, roughnessMap: rockSet.rough,
    roughness: 1, metalness: 0,
  });
  // мох на верхних гранях
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.tMoss = { value: mossSet.albedo };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vUp;\nvarying vec2 vMossUv;')
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
        vec3 wn = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * objectNormal);
        vUp = wn.y;
        vec4 wpm = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
        vMossUv = wpm.xz * 0.35;`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform sampler2D tMoss;\nvarying float vUp;\nvarying vec2 vMossUv;')
      .replace('#include <map_fragment>', `#include <map_fragment>
        vec3 moss = texture2D(tMoss, vMossUv).rgb;
        float mk = smoothstep(0.45, 0.8, vUp + (moss.g - 0.15));
        diffuseColor.rgb = mix(diffuseColor.rgb, moss, mk);`);
  };
  const items = world.rocks.map((r) => ({ ...r, squash: 1 }));
  const mats = makeMatrices(items);
  const mesh = new THREE.InstancedMesh(geo, mat, items.length);
  mesh.frustumCulled = false;
  mesh.castShadow = preset.shadows;
  mesh.receiveShadow = preset.shadows;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const lod = new InstanceLOD(items, mats, [mesh], null, preset.viewDist * 0.8, preset.viewDist);
  mesh.update = (cam, force, view) => lod.update(cam, force, view);
  return mesh;
}
