import * as THREE from 'three';
import { WORLD_SIZE, HALF, heightAt, slopeAt, splatAt, grassDensityAt, fbm } from '../../shared/terrain.js';

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
uniform vec4 uSeason;
#ifdef HAS_SNOW
uniform sampler2D tSnowA, tSnowN, tSnowR;
#endif
#ifdef HAS_LEAVES
uniform sampler2D tLeafA, tLeafN, tLeafR;
#endif
float tHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float tNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(tHash(i), tHash(i + vec2(1, 0)), f.x), mix(tHash(i + vec2(0, 1)), tHash(i + vec2(1, 1)), f.x), f.y); }
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
vec3 colR = texture2D(tRockA, uvR).rgb * vec3(0.66, 0.65, 0.63);
vec4 lum = vec4(dot(colG, vec3(0.33)), dot(colF, vec3(0.33)), dot(colM, vec3(0.33)), dot(colR, vec3(0.33)));
vec4 sw = heightBlend(splatBase(), lum * 1.6);
vec3 alb = colG * sw.x + colF * sw.y + colM * sw.z + colR * sw.w;
alb *= 0.82 + 0.36 * macro;
// времена года: осенью трава жухнет и лежат опавшие листья, весной сочнее, зимой — снег
float gl = dot(colG, vec3(0.33));
vec3 autumnG = mix(vec3(gl) * vec3(1.2, 0.92, 0.45), colF, 0.4);
alb += sw.x * (autumnG - colG) * uSeason.x * 0.8;
alb += sw.x * colG * vec3(-0.08, 0.14, -0.1) * uSeason.z;
float leafK = 0.0;
#ifdef HAS_LEAVES
vec2 uvL = wuv * 0.55;
vec3 colL = texture2D(tLeafA, uvL).rgb;
leafK = clamp((sw.y * 0.95 + sw.x * 0.55 * smoothstep(0.35, 0.7, tNoise(vTerrWorld.xz * 0.07))) * (1.0 - sw.z) * (1.0 - sw.w), 0.0, 1.0);
leafK = smoothstep(0.2, 0.6, leafK + (dot(colL, vec3(0.33)) - 0.3) * 0.6);
alb = mix(alb, colL * 1.05, leafK);
#endif
// снег: та же маска, что и толщина слоя на CPU, + рваный край по рельефу текстуры
float sn = 0.0;
vec2 uvS = wuv * 0.42;
#ifdef HAS_SNOW
vec3 colS = texture2D(tSnowA, uvS).rgb;
colS = mix(colS, vec3(0.9, 0.92, 0.95), 0.35 + 0.25 * smoothstep(10.0, 60.0, camDist));
// зимой нет зелени: всё, что не под снегом, — жухлое; двор и дороги — притоптанный тонкий снег
alb = mix(alb, autumnG * 0.75, 0.85);
float cover = max(0.0, (1.0 - vSplat.y * 0.75) * (1.0 - vSplat.z * 0.85) * (0.75 + 0.5 * vSplat.w) * (1.0 - vSplat.x * 0.3));
sn = smoothstep(0.05, 0.35, cover + (dot(colS, vec3(0.33)) - 0.75) * 0.6 + (tNoise(vTerrWorld.xz * 0.5) - 0.5) * 0.25);
alb = mix(alb, colS * vec3(0.97, 0.99, 1.03), sn);
#endif
// мокрая земля темнее, в низинах — лужи
float puddle = uSeason.w * (1.0 - sn) * (sw.z + sw.y * 0.5 + sw.x * 0.3) * smoothstep(0.64, 0.7, tNoise(vTerrWorld.xz * 0.11) * 0.7 + tNoise(vTerrWorld.xz * 0.43) * 0.3) * (1.0 - sw.w) * (1.0 - sw.y * 0.6);
alb *= 1.0 - uSeason.w * 0.32 * (1.0 - sn);
alb = mix(alb, alb * 0.35, puddle);
diffuseColor.rgb *= alb;
`;

const ROUGH_FRAGMENT = /* glsl */`
float roughnessFactor = roughness * (texture2D(tGrassR, uvG).g * sw.x + texture2D(tForestR, uvF).g * sw.y
  + texture2D(tMudR, uvM).g * sw.z + texture2D(tRockR, uvR).g * sw.w);
// земля, трава, листья — матовые (иначе небо даёт белёсый блеск); мокрое — чуть глаже
roughnessFactor = max(roughnessFactor, 0.85);
roughnessFactor = mix(roughnessFactor, 0.62, uSeason.w);
#ifdef HAS_LEAVES
roughnessFactor = mix(roughnessFactor, max(texture2D(tLeafR, uvL).g, 0.8), leafK);
#endif
#ifdef HAS_SNOW
roughnessFactor = mix(roughnessFactor, texture2D(tSnowR, uvS).g * 0.9, sn);
#endif
roughnessFactor = mix(roughnessFactor, 0.04, puddle);
`;
// искры на снегу: редкие кристаллы, вспыхивающие при определённом угле к солнцу и камере
const SPARKLE = /* glsl */`
#include <emissivemap_fragment>
#ifdef HAS_SNOW
{
  vec2 cell = floor(vTerrWorld.xz * 38.0);
  float r = tHash(cell);
  vec3 vdir = normalize(cameraPosition - vTerrWorld);
  float ph = tHash(cell + 3.1) * 6.283 + dot(vdir, vec3(31.0, 17.0, 23.0));
  float glint = step(0.985, r) * pow(max(sin(ph), 0.0), 40.0) * sn * (1.0 - smoothstep(6.0, 30.0, camDist));
  #if NUM_DIR_LIGHTS > 0
  totalEmissiveRadiance += directionalLights[0].color * glint * 3.0;
  #endif
}
#endif
`;

const NORMAL_SAMPLE = (snow, leaves) => {
  let e = `(texture2D(normalMap, uvG) * sw.x + texture2D(tForestN, uvF) * sw.y + texture2D(tMudN, uvM) * sw.z + texture2D(tRockN, uvR) * sw.w)`;
  if (leaves) e = `mix(${e}, texture2D(tLeafN, uvL), leafK)`;
  if (snow) e = `mix(${e}, texture2D(tSnowN, uvS), sn)`;
  return `mix(${e}, vec4(0.5, 0.5, 1.0, 1.0), puddle)`; // в луже поверхность гладкая
};

// толщина снега и где он лежит (то же самое считает шейдер по splat)
export const SNOW_DEPTH = 0.32;
function snowCover(sp) {
  const [forest, mud, rock, macro] = sp;
  return Math.max(0, (1 - mud * 1.3) * (1 - rock * 0.85) * (0.75 + 0.5 * macro) * (1 - forest * 0.3));
}

export function createTerrain(preset, sets, shared) {
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
  const winter = shared.uSeason.value.y > 0.5;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const h = ground.h[i];
    pos.setY(i, h);
    uv.setXY(i, x / 4, z / 4);
    const sp = splatAt(x, z, h, slopeAt(x, z));
    splat.set(sp, i * 4);
    // зимой — толстый слой снега (кроме дорог, двора, берегов и скал); по нему ходят
    if (winter) {
      const depth = SNOW_DEPTH * snowCover(sp);
      ground.h[i] = h + depth;
      pos.setY(i, h + depth);
    }
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
  mat.envMapIntensity = 0.55;
  if (sets.snow) mat.defines = { ...mat.defines, HAS_SNOW: '' };
  if (sets.leaves) mat.defines = { ...mat.defines, HAS_LEAVES: '' };
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, {
      tMeadowA: { value: sets.meadow.albedo },
      uSeason: shared.uSeason,
      tForestA: { value: sets.forest.albedo }, tMudA: { value: sets.mud.albedo }, tRockA: { value: sets.rock.albedo },
      tGrassR: { value: sets.grass.rough }, tForestR: { value: sets.forest.rough },
      tMudR: { value: sets.mud.rough }, tRockR: { value: sets.rock.rough },
      tForestN: { value: sets.forest.normal }, tMudN: { value: sets.mud.normal }, tRockN: { value: sets.rock.normal },
    });
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec4 splat;\nvarying vec4 vSplat;\nvarying vec3 vTerrWorld;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvSplat = splat;\nvTerrWorld = (modelMatrix * vec4(position, 1.0)).xyz;');
    if (sets.snow) Object.assign(sh.uniforms, { tSnowA: { value: sets.snow.albedo }, tSnowN: { value: sets.snow.normal }, tSnowR: { value: sets.snow.rough } });
    if (sets.leaves) Object.assign(sh.uniforms, { tLeafA: { value: sets.leaves.albedo }, tLeafN: { value: sets.leaves.normal }, tLeafR: { value: sets.leaves.rough } });
    sh.fragmentShader = sh.fragmentShader
      .replace('void main() {', FRAG_PRELUDE)
      .replace('#include <map_fragment>', MAP_FRAGMENT)
      .replace('#include <roughnessmap_fragment>', ROUGH_FRAGMENT)
      .replace('#include <emissivemap_fragment>', SPARKLE)
      .replaceAll('texture2D( normalMap, vNormalMapUv )', NORMAL_SAMPLE(!!sets.snow, !!sets.leaves));
  };

  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = preset.shadows;
  mesh.matrixAutoUpdate = false;

  // Дальние горы за пределами карты: кольцо в полярной сетке (плотнее по углу),
  // хребты из «гребневого» шума, выше к горизонту. Цвет — лес / скалы / снег в шейдере.
  const far = new THREE.Mesh(farMountains(preset), new THREE.MeshBasicMaterial({ color: 0x4d5a33 }));
  far.matrixAutoUpdate = false;

  return { mesh, far, ground, heightTex };
}

function ridged(x, z) {
  let sum = 0, amp = 0.55, f = 1;
  for (let i = 0; i < 5; i++) {
    const n = 1 - Math.abs(fbm(x * f, z * f, 1, 300 + i * 31) * 2 - 1);
    sum += n * n * amp; amp *= 0.5; f *= 2.03;
  }
  return sum;
}

function farMountains(preset) {
  const A = preset.terrainSeg >= 300 ? 360 : 220;  // шагов по углу
  const R = preset.terrainSeg >= 300 ? 56 : 36;    // колец
  const r0 = HALF * 0.86, r1 = 1600;
  const pos = new Float32Array((A + 1) * (R + 1) * 3);
  let k = 0;
  for (let j = 0; j <= R; j++) {
    const r = r0 + (r1 - r0) * Math.pow(j / R, 1.6);
    for (let i = 0; i <= A; i++) {
      const a = (i / A) * Math.PI * 2;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const e = Math.max(Math.abs(x), Math.abs(z));
      let y;
      if (e < HALF - 4) y = heightAt(x, z) - 4; // под картой — не видно
      else {
        const out = Math.min(1, (e - HALF) / 260);
        const ridge = ridged(x * 0.0035, z * 0.0035);
        const far = Math.min(1, (e - HALF) / 900);
        y = heightAt(Math.max(-HALF, Math.min(HALF, x)), Math.max(-HALF, Math.min(HALF, z))) * (1 - out * 0.4)
          + out * out * (40 + ridge * 230 + far * 120 * fbm(x * 0.001, z * 0.001, 2, 91));
      }
      pos[k++] = x; pos[k++] = y; pos[k++] = z;
    }
  }
  const idx = [];
  for (let j = 0; j < R; j++) for (let i = 0; i < A; i++) {
    const a = j * (A + 1) + i, b = a + 1, c = a + A + 1, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
