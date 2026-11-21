import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mulberry32 } from '../../shared/world.js';
import { forestAt, roadDist, siteDist, riverDist, RIVER_HALF, PLAY_LIMIT, slopeAt, heightAt } from '../../shared/terrain.js';
import { loadImage } from '../core/textures.js';
import { InstanceLOD, makeMatrices } from './vegetation.js';

// Реалистичные деревья из «карточек»:
//  ель — ярусы свисающих лап с процедурной текстурой хвои,
//  лиственное — гроздья листвы из CC0-фото листьев (ambientCG LeafSet009).
// Ближний LOD — полная геометрия, дальний — импостер (заранее отрендеренный билборд).

// ---------- текстуры ----------
function needleBranchTexture() {
  const W = 256, H = 512;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = 'rgba(30,48,22,0)'; x.fillRect(0, 0, W, H);
  const rnd = mulberry32(31);
  const needleColor = () => {
    const g = 55 + rnd() * 45, r = 22 + rnd() * 22, b = 18 + rnd() * 18;
    return `rgb(${r | 0},${g | 0},${b | 0})`;
  };
  // ветка снизу вверх по центру, боковые веточки, на них хвоя
  const twig = (x0, y0, ang, len, width) => {
    const x1 = x0 + Math.cos(ang) * len, y1 = y0 + Math.sin(ang) * len;
    x.strokeStyle = 'rgb(60,42,28)'; x.lineWidth = width; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke();
    const n = Math.floor(len / 2.2);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const px = x0 + (x1 - x0) * t, py = y0 + (y1 - y0) * t;
      const nl = (9 + rnd() * 7) * (1 - t * 0.45);
      for (const side of [-1, 1]) {
        const a = ang + side * (0.9 + rnd() * 0.4) - 0.25;
        x.strokeStyle = needleColor(); x.lineWidth = 1.6;
        x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(a) * nl, py + Math.sin(a) * nl); x.stroke();
      }
    }
  };
  // главная ось
  twig(W / 2, H - 4, -Math.PI / 2, H - 20, 4);
  for (let y = H - 40; y > 40; y -= 22 + rnd() * 10) {
    const t = 1 - y / H;
    const len = (W * 0.46) * (1 - t * 0.6) * (0.8 + rnd() * 0.3);
    twig(W / 2, y, -Math.PI / 2 - 0.9 - rnd() * 0.3, len, 2);
    twig(W / 2, y - 8, -Math.PI / 2 + 0.9 + rnd() * 0.3, len, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

async function leafClusterTexture() {
  const [colImg, opImg] = await Promise.all([
    loadImage('textures/foliage/leafset009_color.png'),
    loadImage('textures/foliage/leafset009_opacity.png'),
  ]);
  // лист с альфой: цвет + маска прозрачности
  const S = colImg.width;
  const sheet = document.createElement('canvas'); sheet.width = S; sheet.height = colImg.height;
  const sx = sheet.getContext('2d');
  sx.drawImage(opImg, 0, 0);
  const op = sx.getImageData(0, 0, sheet.width, sheet.height);
  sx.drawImage(colImg, 0, 0);
  const col = sx.getImageData(0, 0, sheet.width, sheet.height);
  for (let i = 0; i < col.data.length; i += 4) col.data[i + 3] = op.data[i];
  sx.putImageData(col, 0, 0);

  // гроздь: веточки + ~60 листьев (6 спрайтов 3×2 в исходнике)
  const W = 512;
  const c = document.createElement('canvas'); c.width = c.height = W;
  const x = c.getContext('2d');
  const rnd = mulberry32(77);
  x.strokeStyle = 'rgb(70,52,36)'; x.lineCap = 'round';
  for (let i = 0; i < 7; i++) {
    x.lineWidth = 3 + rnd() * 2;
    x.beginPath(); x.moveTo(W / 2, W / 2);
    const a = rnd() * Math.PI * 2, l = W * (0.25 + rnd() * 0.2);
    x.lineTo(W / 2 + Math.cos(a) * l, W / 2 + Math.sin(a) * l); x.stroke();
  }
  const cw = sheet.width / 3, ch = sheet.height / 2;
  for (let i = 0; i < 70; i++) {
    const k = Math.floor(rnd() * 6);
    const r = Math.sqrt(rnd()) * W * 0.42;
    const a = rnd() * Math.PI * 2;
    const px = W / 2 + Math.cos(a) * r, py = W / 2 + Math.sin(a) * r;
    const size = W * (0.12 + rnd() * 0.07);
    x.save();
    x.translate(px, py);
    x.rotate(a + Math.PI / 2 + (rnd() - 0.5) * 1.2);
    x.globalAlpha = 1;
    x.drawImage(sheet, (k % 3) * cw, Math.floor(k / 3) * ch, cw, ch, -size / 2, -size / 2, size, size * (ch / cw));
    // лёгкое затенение части листьев (глубина кроны)
    if (rnd() < 0.4) { x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(10,20,5,0.35)'; x.fillRect(-size / 2, -size / 2, size, size); x.globalCompositeOperation = 'source-over'; }
    x.restore();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ---------- геометрия ----------
// Карточка: прямоугольник от точки a вдоль dir длиной len, ширина w, нормаль для света n
function card(out, a, dir, side, len, w, n, uv = [0, 0, 1, 1]) {
  const p = out.pos.length / 3;
  const s = side.clone().multiplyScalar(w / 2);
  const b = a.clone().addScaledVector(dir, len);
  for (const v of [a.clone().sub(s), a.clone().add(s), b.clone().sub(s), b.clone().add(s)]) out.pos.push(v.x, v.y, v.z);
  for (let i = 0; i < 4; i++) out.nrm.push(n.x, n.y, n.z);
  out.uv.push(uv[0], uv[1], uv[2], uv[1], uv[0], uv[3], uv[2], uv[3]);
  out.idx.push(p, p + 1, p + 2, p + 1, p + 3, p + 2);
}
function toGeo(o) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(o.pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(o.nrm, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(o.uv, 2));
  g.setIndex(o.idx);
  return g;
}
function trunkGeo(rTop, rBot, h, seg, uvScale) {
  const g = new THREE.CylinderGeometry(rTop, rBot, h, seg, 3, true);
  g.translate(0, h / 2, 0);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * uvScale[0], uv.getY(i) * uvScale[1]);
  return g;
}

function spruce(rnd) {
  const H = 14;
  const o = { pos: [], nrm: [], uv: [], idx: [] };
  const up = new THREE.Vector3(0, 1, 0);
  for (let y = 1.8; y < H - 1.2; y += 0.42 + rnd() * 0.12) {
    const t = (y - 1.8) / (H - 3);
    const L = 3.1 * Math.pow(1 - t, 0.85) + 0.45;
    const n = 5 + Math.floor(rnd() * 3);
    const a0 = rnd() * Math.PI * 2;
    for (let k = 0; k < n; k++) {
      const a = a0 + (k / n) * Math.PI * 2 + (rnd() - 0.5) * 0.5;
      const radial = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      const droop = -0.25 - rnd() * 0.3 + t * 0.25;
      const dir = radial.clone().multiplyScalar(Math.cos(droop)).add(new THREE.Vector3(0, Math.sin(droop), 0)).normalize();
      // крен вокруг оси ветки — карточки не видны «ребром»
      const roll = (rnd() - 0.5) * 1.4;
      const side0 = new THREE.Vector3().crossVectors(up, dir).normalize();
      const side = side0.applyAxisAngle(dir, roll);
      const nrm = radial.clone().multiplyScalar(0.75).add(up.clone().multiplyScalar(0.65)).normalize();
      card(o, new THREE.Vector3(0, y, 0).addScaledVector(radial, 0.05), dir, side, L, L * 0.75, nrm);
    }
  }
  // макушка
  for (const a of [0, Math.PI / 2]) {
    const side = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    card(o, new THREE.Vector3(0, H - 1.6, 0), up, side, 2.2, 1.1, up);
  }
  return { trunk: trunkGeo(0.04, 0.3, H - 0.5, 8, [2, 7]), crown: toGeo(o), height: H + 0.6, width: 7.5 };
}

function broadleaf(rnd) {
  const o = { pos: [], nrm: [], uv: [], idx: [] };
  const center = new THREE.Vector3(0, 7.6, 0);
  const R = new THREE.Vector3(3.1, 2.7, 3.1);
  const tmp = new THREE.Vector3();
  for (let i = 0; i < 64; i++) {
    // точка в оболочке эллипсоида
    const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, rr = 0.55 + rnd() * 0.45;
    const d = new THREE.Vector3(Math.sqrt(1 - u * u) * Math.cos(th), u, Math.sqrt(1 - u * u) * Math.sin(th));
    const p = center.clone().add(d.clone().multiply(R).multiplyScalar(rr));
    // карточка смотрит примерно наружу
    const facing = d.clone().add(tmp.set(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(1.2)).normalize();
    const t1 = new THREE.Vector3().crossVectors(facing, Math.abs(facing.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)).normalize();
    const t2 = new THREE.Vector3().crossVectors(facing, t1).normalize();
    const size = 1.9 + rnd() * 1.0;
    const nrm = d.clone().multiplyScalar(0.8).add(new THREE.Vector3(0, 0.5, 0)).normalize();
    card(o, p.clone().addScaledVector(t2, -size / 2), t2, t1, size, size, nrm);
  }
  // ствол + основные ветви
  const parts = [trunkGeo(0.13, 0.32, 7.2, 8, [2, 4])];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + rnd();
    const len = 2.4 + rnd() * 1.4;
    const g = trunkGeo(0.03, 0.09, len, 5, [1, 1]);
    g.rotateZ(-(0.5 + rnd() * 0.4));
    g.rotateY(a);
    g.translate(0, 4.6 + rnd() * 1.6, 0);
    parts.push(g);
  }
  return { trunk: mergeGeometries(parts), crown: toGeo(o), height: 11.2, width: 7.4 };
}

// ---------- материалы ----------
function crownMaterial(map, shared, preset, flutter) {
  const m = new THREE.MeshLambertMaterial({ map, alphaTest: 0.42, side: THREE.DoubleSide });
  m.alphaToCoverage = !!preset.antialias;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = shared.uTime;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        #ifdef USE_INSTANCING
        vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        #else
        vec3 ip = vec3(0.0);
        #endif
        float sw = max(0.0, position.y - 2.0) * 0.012;
        float ph = uTime * 1.2 + ip.x * 0.11 + ip.z * 0.13;
        transformed.x += sin(ph) * sw;
        transformed.z += sin(ph * 0.8 + 1.3) * sw * 0.6;
        transformed += sin(uTime * 4.0 + position.x * 3.1 + position.y * 2.3 + ip.x) * ${flutter.toFixed(3)} * step(2.0, position.y);`)
      // свет одинаковый с обеих сторон карточки + лёгкая «просвечиваемость»
      .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <normal_fragment_begin>', 'float faceDirection = 1.0;\nvec3 normal = normalize(vNormal);\nvec3 nonPerturbedNormal = normal;');
  };
  return m;
}

// Импостер: рендерим дерево сбоку в текстуру с прозрачным фоном
function bakeImpostor(renderer, trunk, crown, trunkMat, crownMat, height, width) {
  const rt = new THREE.WebGLRenderTarget(256, 512, { colorSpace: THREE.SRGBColorSpace });
  rt.texture.generateMipmaps = true;
  rt.texture.minFilter = THREE.LinearMipmapLinearFilter;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xc8d8f0, 0x4a4a2a, 1.0));
  const sun = new THREE.DirectionalLight(0xfff4e0, 2.4);
  sun.position.set(0.4, 1, 1);
  scene.add(sun);
  const g = new THREE.Group();
  g.add(new THREE.Mesh(trunk, trunkMat), new THREE.Mesh(crown, crownMat));
  scene.add(g);
  const cam = new THREE.OrthographicCamera(-width / 2, width / 2, height, 0, -50, 50);
  cam.position.set(0, 0, 10);
  const prevTarget = renderer.getRenderTarget();
  const prevColor = renderer.getClearColor(new THREE.Color());
  const prevAlpha = renderer.getClearAlpha();
  const prevTone = renderer.toneMapping;
  renderer.setRenderTarget(rt);
  renderer.setClearColor(0x2a3a1a, 0);
  renderer.clear();
  renderer.render(scene, cam);
  // вторая проекция под 90°, смешиваем через прозрачность — объёмнее
  renderer.setRenderTarget(prevTarget);
  renderer.setClearColor(prevColor, prevAlpha);
  renderer.toneMapping = prevTone;
  return rt.texture;
}

function crossQuads(width, height) {
  const parts = [];
  for (const a of [0, Math.PI / 2]) {
    const g = new THREE.PlaneGeometry(width, height);
    g.translate(0, height / 2, 0);
    g.rotateY(a);
    parts.push(g);
  }
  const g = mergeGeometries(parts);
  // нормали «вверх-наружу», чтобы освещение не зависело от стороны
  const n = g.attributes.normal;
  for (let i = 0; i < n.count; i++) n.setXYZ(i, 0, 1, 0);
  return g;
}

export async function createTrees(world, preset, barkSet, barkBroadSet, shared, renderer) {
  const rnd = mulberry32(5);
  const needles = needleBranchTexture();
  const leaves = await leafClusterTexture();
  const types = [spruce(rnd), broadleaf(rnd)];
  const barkMats = [barkSet, barkBroadSet].map((b) => new THREE.MeshStandardMaterial({
    map: b.albedo, normalMap: preset.normalMaps ? b.normal : null, roughnessMap: b.rough, roughness: 1, metalness: 0,
  }));
  const crownMats = [crownMaterial(needles, shared, preset, 0.01), crownMaterial(leaves, shared, preset, 0.03)];
  crownMats[1].color.set(0x7d8a62); // листва темнее и менее жёлтая

  const group = new THREE.Group();
  const lods = [];
  const farMats = [];
  for (const type of [0, 1]) {
    const T = types[type];
    const items = world.trees.filter((t) => t.type === type);
    const mats = makeMatrices(items);
    const capHi = Math.min(items.length, 700);
    const trunk = new THREE.InstancedMesh(T.trunk, barkMats[type], capHi);
    const crown = new THREE.InstancedMesh(T.crown, crownMats[type], capHi);
    const imp = bakeImpostor(renderer, T.trunk, T.crown, barkMats[type], crownMats[type], T.height, T.width);
    const farMat = new THREE.MeshBasicMaterial({ map: imp, alphaTest: 0.4, side: THREE.DoubleSide });
    farMats.push(farMat);
    const far = new THREE.InstancedMesh(crossQuads(T.width, T.height), farMat, items.length);
    for (const m of [trunk, crown, far]) {
      m.frustumCulled = false; m.count = 0;
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      group.add(m);
    }
    trunk.castShadow = crown.castShadow = preset.shadows;
    trunk.receiveShadow = crown.receiveShadow = preset.shadows;
    lods.push(new InstanceLOD(items, mats, [trunk, crown], far, preset.treeHi, preset.viewDist));
  }

  // подлесок: кусты из гроздей листвы, только вблизи
  const bushes = [];
  const brnd = mulberry32(12);
  for (let i = 0; i < 5200 && bushes.length < 2600; i++) {
    const x = (brnd() * 2 - 1) * (PLAY_LIMIT - 10), z = (brnd() * 2 - 1) * (PLAY_LIMIT - 10);
    const f = forestAt(x, z);
    if (brnd() > f * 0.8 + 0.08) continue;
    if (riverDist(x, z) < RIVER_HALF + 4 || roadDist(x, z) < 4 || siteDist(x, z) < 4 || slopeAt(x, z) > 0.7) continue;
    bushes.push({ x, z, y: heightAt(x, z) - 0.1, s: 0.6 + brnd() * 0.7, rot: brnd() * 6.28 });
  }
  const bo = { pos: [], nrm: [], uv: [], idx: [] };
  // куст — «облако» карточек листвы в полусфере
  const bc = new THREE.Vector3(0, 0.55, 0);
  for (let i = 0; i < 16; i++) {
    const u = rnd() * 0.9 + 0.1, th = rnd() * Math.PI * 2;
    const d = new THREE.Vector3(Math.sqrt(1 - u * u) * Math.cos(th), u, Math.sqrt(1 - u * u) * Math.sin(th));
    const p = bc.clone().add(d.clone().multiply(new THREE.Vector3(0.75, 0.45, 0.75)).multiplyScalar(0.4 + rnd() * 0.6));
    const facing = d.clone().add(new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5)).normalize();
    const t1 = new THREE.Vector3().crossVectors(facing, new THREE.Vector3(0, 1, 0)).normalize();
    if (t1.lengthSq() < 0.1) t1.set(1, 0, 0);
    const t2 = new THREE.Vector3().crossVectors(facing, t1).normalize();
    const size = 0.8 + rnd() * 0.5;
    const nrm = d.clone().add(new THREE.Vector3(0, 0.7, 0)).normalize();
    card(bo, p.clone().addScaledVector(t2, -size / 2), t2, t1, size, size, nrm);
  }
  const bushMesh = new THREE.InstancedMesh(toGeo(bo), crownMats[1], Math.min(bushes.length, 900));
  bushMesh.frustumCulled = false; bushMesh.count = 0;
  bushMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  bushMesh.castShadow = false; bushMesh.receiveShadow = preset.shadows;
  group.add(bushMesh);
  lods.push(new InstanceLOD(bushes, makeMatrices(bushes), [bushMesh], null, Math.min(70, preset.viewDist * 0.4), 0));

  group.update = (cam, force) => lods.forEach((l) => l.update(cam, force));
  // яркость импостеров следует за временем суток
  group.setLight = (k) => farMats.forEach((m) => m.color.setScalar(k));
  return group;
}
