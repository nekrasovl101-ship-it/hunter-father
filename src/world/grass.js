import * as THREE from 'three';
import { WORLD_SIZE, HALF } from '../../shared/terrain.js';
import { mulberry32 } from '../../shared/world.js';

// Трава: один draw call на слой. Инстансы лежат в «плитке» вокруг игрока и
// заворачиваются по модулю в вершинном шейдере; высота, плотность и «сухость»
// берутся из текстуры высот. Ветер и примятие игроком — в вершинном шейдере.

// Пучок изогнутых травинок. color.r — доля высоты (0 у корня, 1 у кончика).
function bladeClump(rnd, blades) {
  const pos = [], col = [], idx = [];
  for (let b = 0; b < blades; b++) {
    const ox = (rnd() - 0.5) * 0.45, oz = (rnd() - 0.5) * 0.45;
    const a = rnd() * Math.PI * 2;
    const cx = Math.cos(a), sz = Math.sin(a);
    const w = 0.02 + rnd() * 0.016, h = 0.3 + rnd() * 0.4;
    const curve = 0.08 + rnd() * 0.22;
    const start = pos.length / 3;
    const rows = [[0, 1], [0.4, 0.88], [0.75, 0.55]];
    for (const [t, ww] of rows) {
      // изгиб вперёд: смещение растёт квадратично
      const fx = -sz * curve * t * t, fz = cx * curve * t * t;
      for (const sgn of [-1, 1]) {
        pos.push(ox + fx + cx * w * ww * sgn, t * h, oz + fz + sz * w * ww * sgn);
        col.push(t, sgn * 0.5 + 0.5, rnd());
      }
    }
    pos.push(ox - sz * curve, h, oz + cx * curve);
    col.push(1, 0.5, rnd());
    const s = start;
    idx.push(s, s + 1, s + 2, s + 1, s + 3, s + 2, s + 2, s + 3, s + 4, s + 3, s + 5, s + 4, s + 4, s + 5, s + 6);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  return g;
}

// Цветок: стебель + две перекрещенные «чашечки»
function flowerGeo() {
  const pos = [], col = [], idx = [];
  const h = 0.42, r = 0.06;
  // стебель
  pos.push(-0.006, 0, 0, 0.006, 0, 0, -0.006, h, 0, 0.006, h, 0);
  col.push(0, 0, 0, 0, 1, 0, 0.9, 0, 0, 0.9, 1, 0);
  idx.push(0, 1, 2, 1, 3, 2);
  // головка-«ромашка»: веер из 6 лепестков, слегка наклонённый (color.g = 2 — признак лепестка)
  const c0 = pos.length / 3;
  pos.push(0, h + 0.01, 0); col.push(1, 2, 0);
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    pos.push(Math.cos(a) * r, h + Math.sin(a) * r * 0.5, Math.sin(a) * r * 0.6); col.push(1, 2, 0);
    if (i > 0) idx.push(c0, c0 + i, c0 + i + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  return g;
}

function makeLayer(base, count, tile, dist, heightTex, shared, rnd, flowers) {
  const geo = new THREE.InstancedBufferGeometry();
  geo.index = base.index;
  geo.setAttribute('position', base.attributes.position);
  geo.setAttribute('color', base.attributes.color);
  const off = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    off[i * 4] = rnd(); off[i * 4 + 1] = rnd();
    off[i * 4 + 2] = rnd() * Math.PI * 2; off[i * 4 + 3] = rnd();
  }
  geo.setAttribute('aOff', new THREE.InstancedBufferAttribute(off, 4));
  geo.instanceCount = count;

  const uniforms = {
    uHeight: { value: heightTex },
    uCenter: { value: new THREE.Vector2() },
    uPlayer: { value: new THREE.Vector3() },
    uTile: { value: tile },
    uDist: { value: dist },
    uWorld: { value: WORLD_SIZE },
    uHalf: { value: HALF },
    uTime: shared.uTime,
    uSeason: shared.uSeason,
  };
  const mat = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, uniforms);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
        attribute vec4 aOff;
        attribute vec3 color;
        uniform sampler2D uHeight;
        uniform vec2 uCenter;
        uniform vec3 uPlayer;
        uniform float uTile, uDist, uWorld, uHalf, uTime;
        uniform vec4 uSeason;
        varying vec3 vGrassCol;`)
      .replace('#include <beginnormal_vertex>', 'vec3 objectNormal = vec3(0.0, 1.0, 0.0);')
      .replace('#include <begin_vertex>', `
        vec2 origin = uCenter - uTile * 0.5;
        vec2 wp = origin + mod(aOff.xy * uTile - origin, uTile);
        vec4 hs = texture2D(uHeight, (wp + uHalf) / uWorld);
        float d = distance(wp, uCenter);
        float fade = 1.0 - smoothstep(uDist * 0.55, uDist, d);
        float dens = ${flowers ? 'hs.g * (1.0 - hs.b) * smoothstep(0.35, 0.6, hs.a) * 0.5' : 'hs.g'};
        float sc = step(aOff.w, dens) * fade * (0.65 + 0.6 * fract(aOff.w * 7.31));
        // зимой трава под снегом (торчат редкие сухие стебли), цветов нет; осенью цветов мало
        sc *= ${flowers ? '(1.0 - uSeason.y) * (1.0 - uSeason.x * 0.85)' : '1.0 - uSeason.y * step(0.18, fract(aOff.w * 3.7))'};
        sc *= 1.0 - uSeason.y * 0.35;
        float c = cos(aOff.z), s = sin(aOff.z);
        vec3 transformed = position;
        transformed.xz = mat2(c, -s, s, c) * transformed.xz;
        transformed *= sc;
        float t = color.r;
        float bend = t * t;
        // ветер: крупные порывы + мелкая дрожь
        float gust = sin(uTime * 0.9 + wp.x * 0.05 + wp.y * 0.03) * 0.5 + 0.5;
        float w = sin(uTime * 2.1 + wp.x * 0.35 + wp.y * 0.21) * 0.35 + gust * 0.6;
        transformed.x += bend * w * 0.18 * sc;
        transformed.z += bend * w * 0.09 * sc;
        // примятие под ногами
        vec2 away = wp - uPlayer.xz;
        float pl = 1.0 - smoothstep(0.3, 1.3, length(away));
        transformed.xz += normalize(away + 1e-4) * pl * bend * 0.35 * sc;
        transformed.y *= 1.0 - pl * 0.4;
        transformed.xz += wp;
        transformed.y += hs.r - 0.03;
        // цвет: сочная зелень ↔ сухая трава, по тем же пятнам, что и земля
        float dry = smoothstep(0.45, 0.8, hs.a) * 0.75 + fract(aOff.w * 13.7) * 0.25;
        dry = mix(dry, 0.75 + dry * 0.5, max(uSeason.x, uSeason.y));
        dry *= 1.0 - uSeason.z * 0.6;
        vec3 baseC = vec3(0.025, 0.05, 0.012);
        vec3 tipLush = vec3(0.13, 0.22, 0.04);
        vec3 tipDry = vec3(0.30, 0.27, 0.10);
        vec3 tip = mix(tipLush, tipDry, dry * 0.8) * (0.8 + 0.4 * fract(aOff.w * 31.1));
        vGrassCol = mix(baseC, tip, smoothstep(0.0, 0.9, t)) * mix(1.0, 0.7, hs.b);
        vGrassCol *= 1.0 - uSeason.w * 0.25;
        vGrassCol = mix(vGrassCol, vec3(0.30, 0.25, 0.15) * (0.45 + 0.55 * t), uSeason.y);
        ${flowers ? `
        if (color.g > 1.5) {
          float k = fract(aOff.w * 97.3);
          vGrassCol = k < 0.4 ? vec3(0.9, 0.88, 0.8) : k < 0.7 ? vec3(0.85, 0.65, 0.05) : vec3(0.42, 0.2, 0.6);
        } else vGrassCol = mix(vec3(0.03, 0.06, 0.015), vec3(0.08, 0.14, 0.03), t);` : ''}`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vGrassCol;')
      .replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb = vGrassCol;')
      // обе стороны травинки освещаются одинаково (нормаль «вверх» без разворота)
      .replace('#include <normal_fragment_begin>', 'float faceDirection = 1.0;\nvec3 normal = normalize(vNormal);\nvec3 nonPerturbedNormal = normal;');
  };
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.matrixAutoUpdate = false;
  mesh.uniforms = uniforms;
  return mesh;
}

export function createGrass(preset, heightTex, shared) {
  const rnd = mulberry32(777);
  const group = new THREE.Group();
  const tile = preset.grassDist * 2.1;
  const grass = makeLayer(bladeClump(rnd, preset.grassBlades || 7), preset.grass, tile, preset.grassDist, heightTex, shared, rnd, false);
  const flowers = makeLayer(flowerGeo(), Math.round(preset.grass * 0.12), tile, preset.grassDist * 0.8, heightTex, shared, rnd, true);
  group.add(grass, flowers);
  group.update = (camPos, playerPos) => {
    for (const m of [grass, flowers]) {
      m.uniforms.uCenter.value.set(camPos.x, camPos.z);
      m.uniforms.uPlayer.value.copy(playerPos);
    }
  };
  return group;
}
