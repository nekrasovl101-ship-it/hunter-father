import * as THREE from 'three';
import { WORLD_SIZE, HALF, heightAt, slopeAt, splatAt, grassDensityAt } from '../../shared/terrain.js';

// Сетка высот, совпадающая с мешем: по ней ставим траву, игрока, животных.
export class Ground {
  constructor(seg) {
    this.seg = seg;
    this.step = WORLD_SIZE / seg;
    const n = seg + 1;
    this.h = new Float32Array(n * n);
    for (let iz = 0; iz < n; iz++) for (let ix = 0; ix < n; ix++) {
      this.h[iz * n + ix] = heightAt(-HALF + ix * this.step, -HALF + iz * this.step);
    }
  }
  sample(x, z) {
    const n = this.seg + 1;
    const fx = Math.min(this.seg - 1e-4, Math.max(0, (x + HALF) / this.step));
    const fz = Math.min(this.seg - 1e-4, Math.max(0, (z + HALF) / this.step));
    const ix = Math.floor(fx), iz = Math.floor(fz);
    const tx = fx - ix, tz = fz - iz;
    const i = iz * n + ix;
    const a = this.h[i], b = this.h[i + 1], c = this.h[i + n], d = this.h[i + n + 1];
    // та же триангуляция, что у PlaneGeometry: (a, c, b) и (c, d, b)
    if (tx + tz <= 1) return a + (b - a) * tx + (c - a) * tz;
    return d + (c - d) * (1 - tx) + (b - d) * (1 - tz);
  }
}

const FRAG_PRELUDE = /* glsl */`
uniform sampler2D tForestA, tMudA, tRockA, tMeadowA;
uniform sampler2D tGrassR, tForestR, tMudR, tRockR;
#ifdef USE_NORMALMAP
uniform sampler2D tForestN, tMudN, tRockN;
#endif
varying vec4 vSplat;
varying vec3 vTerrWorld;
vec4 splatBase() {
  vec3 s = clamp(vSplat.xyz, 0.0, 1.0);
  return vec4(max(0.0, 1.0 - s.x - s.y - s.z), s);
}
// смешивание с учётом «высоты» текстуры: камешки и комья пробиваются сквозь траву
vec4 heightBlend(vec4 w, vec4 h) {
  vec4 k = w * (0.35 + h);
  float m = max(max(k.x, k.y), max(k.z, k.w)) - 0.18;
  k = max(k - m, 0.0);
  return k / max(dot(k, vec4(1.0)), 1e-4);
}
void main() {`;

const MAP_FRAGMENT = /* glsl */`
vec2 wuv = vMapUv;
float camDist = length(vTerrWorld - cameraPosition);
// две частоты для травы и леса — убирают видимый повтор текстуры
vec2 uvG = wuv * 0.9, uvF = wuv * 0.75, uvM = wuv * 0.9, uvR = wuv * 0.45;
vec3 colG = texture2D(map, uvG).rgb;
vec3 colG2 = texture2D(map, uvG * 0.173 + 0.31).rgb;
vec3 meadow = texture2D(tMeadowA, uvG * 0.61).rgb;
float macro = vSplat.w;
colG = mix(colG, colG2, 0.35 + 0.3 * smoothstep(20.0, 120.0, camDist));
// сухие пятна поляны
float dry = smoothstep(0.45, 0.8, macro);
colG = mix(colG, meadow * vec3(1.05, 1.0, 0.8), dry * 0.55);
vec3 colF = texture2D(tForestA, uvF).rgb;
vec3 colM = texture2D(tMudA, uvM).rgb;
vec3 colR = texture2D(tRockA, uvR).rgb;
vec4 lum = vec4(dot(colG, vec3(0.33)), dot(colF, vec3(0.33)), dot(colM, vec3(0.33)), dot(colR, vec3(0.33)));
vec4 sw = heightBlend(splatBase(), lum * 1.6);
vec3 alb = colG * sw.x + colF * sw.y + colM * sw.z + colR * sw.w;
alb *= 0.82 + 0.36 * macro;
diffuseColor.rgb *= alb;
`;

const ROUGH_FRAGMENT = /* glsl */`
float roughnessFactor = roughness * (texture2D(tGrassR, uvG).g * sw.x + texture2D(tForestR, uvF).g * sw.y
  + texture2D(tMudR, uvM).g * sw.z + texture2D(tRockR, uvR).g * sw.w);
`;

const NORMAL_SAMPLE = `(texture2D(normalMap, uvG) * sw.x + texture2D(tForestN, uvF) * sw.y + texture2D(tMudN, uvM) * sw.z + texture2D(tRockN, uvR) * sw.w)`;

export function createTerrain(preset, sets) {
  const seg = preset.terrainSeg;
  const ground = new Ground(seg);
  const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, seg, seg);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  const n = seg + 1;
  const splat = new Float32Array(n * n * 4);
  // текстура для травы: R = высота, G = плотность травы
  const hm = new Uint16Array(n * n * 4);
  const toHalf = THREE.DataUtils.toHalfFloat;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const h = ground.h[i];
    pos.setY(i, h);
    uv.setXY(i, x / 4, z / 4);
    const sp = splatAt(x, z, h, slopeAt(x, z));
    splat.set(sp, i * 4);
    hm[i * 4] = toHalf(h);
    hm[i * 4 + 1] = toHalf(grassDensityAt(x, z, sp));
    hm[i * 4 + 2] = toHalf(sp[0]);
    hm[i * 4 + 3] = toHalf(sp[3]);
  }
  geo.setAttribute('splat', new THREE.BufferAttribute(splat, 4));
  geo.computeVertexNormals();

  const heightTex = new THREE.DataTexture(hm, n, n, THREE.RGBAFormat, THREE.HalfFloatType);
  heightTex.magFilter = heightTex.minFilter = THREE.LinearFilter;
  heightTex.needsUpdate = true;

  const mat = new THREE.MeshStandardMaterial({
    map: sets.grass.albedo,
    normalMap: preset.normalMaps ? sets.grass.normal : null,
    roughness: 1, metalness: 0,
  });
  if (preset.normalMaps) mat.normalScale.set(0.9, 0.9);
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, {
      tMeadowA: { value: sets.meadow.albedo },
      tForestA: { value: sets.forest.albedo }, tMudA: { value: sets.mud.albedo }, tRockA: { value: sets.rock.albedo },
      tGrassR: { value: sets.grass.rough }, tForestR: { value: sets.forest.rough },
      tMudR: { value: sets.mud.rough }, tRockR: { value: sets.rock.rough },
      tForestN: { value: sets.forest.normal }, tMudN: { value: sets.mud.normal }, tRockN: { value: sets.rock.normal },
    });
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec4 splat;\nvarying vec4 vSplat;\nvarying vec3 vTerrWorld;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvSplat = splat;\nvTerrWorld = (modelMatrix * vec4(position, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('void main() {', FRAG_PRELUDE)
      .replace('#include <map_fragment>', MAP_FRAGMENT)
      .replace('#include <roughnessmap_fragment>', ROUGH_FRAGMENT)
      .replaceAll('texture2D( normalMap, vNormalMapUv )', NORMAL_SAMPLE);
  };

  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = preset.shadows;
  mesh.matrixAutoUpdate = false;

  // Дальнее кольцо гор за пределами карты (низкая детализация, без теней)
  const farGeo = new THREE.PlaneGeometry(WORLD_SIZE * 3, WORLD_SIZE * 3, 72, 72);
  farGeo.rotateX(-Math.PI / 2);
  const fp = farGeo.attributes.position;
  for (let i = 0; i < fp.count; i++) {
    const x = fp.getX(i), z = fp.getZ(i);
    const inside = Math.max(Math.abs(x), Math.abs(z)) < HALF - 10;
    fp.setY(i, inside ? -30 : heightAt(x, z) - 1);
  }
  farGeo.computeVertexNormals();
  const farMat = new THREE.MeshLambertMaterial({ color: 0x4d5a33 });
  const far = new THREE.Mesh(farGeo, farMat);
  far.matrixAutoUpdate = false;

  return { mesh, far, ground, heightTex };
}
