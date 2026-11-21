import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MODELS } from '../config/models.js';

const loader = new GLTFLoader();
const cache = new Map();

// Склеивает материалы без текстур в один с цветами вершин:
// у Quaternius 4–7 материалов на модель → 1 draw call.
function flattenMaterials(root) {
  // 1) glTF-примитивы с разными материалами приходят отдельными SkinnedMesh
  //    с общим скелетом — сливаем их в один меш с цветами вершин
  const bySkel = new Map();
  root.traverse((o) => {
    if (o.isSkinnedMesh && !o.material.map) {
      if (!bySkel.has(o.skeleton)) bySkel.set(o.skeleton, []);
      bySkel.get(o.skeleton).push(o);
    }
  });
  for (const [skeleton, list] of bySkel) {
    if (list.length < 2) continue;
    const geos = list.map((m) => {
      const g = m.geometry.clone();
      for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'skinIndex', 'skinWeight'].includes(k)) g.deleteAttribute(k);
      const c = m.material.color;
      const col = new Float32Array(g.attributes.position.count * 3);
      for (let i = 0; i < col.length; i += 3) { col[i] = c.r; col[i + 1] = c.g; col[i + 2] = c.b; }
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      g.morphAttributes = {};
      return g.index ? g : g;
    });
    const allIndexed = geos.every((g) => g.index);
    const merged = mergeGeometries(allIndexed ? geos : geos.map((g) => (g.index ? g.toNonIndexed() : g)));
    if (!merged) continue;
    const first = list[0];
    const mesh = new THREE.SkinnedMesh(merged, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0 }));
    mesh.name = first.name;
    mesh.position.copy(first.position); mesh.quaternion.copy(first.quaternion); mesh.scale.copy(first.scale);
    first.parent.add(mesh);
    mesh.bind(skeleton, first.bindMatrix);
    for (const m of list) m.parent.remove(m);
  }
  // 2) многоматериальные меши (группы геометрии)
  root.traverse((o) => {
    if (!o.isMesh || !Array.isArray(o.material)) return;
    if (o.material.some((m) => m.map)) return;
    const geo = o.geometry;
    const n = geo.attributes.position.count;
    const col = new Float32Array(n * 3);
    const idx = geo.index;
    for (const g of geo.groups) {
      const c = o.material[g.materialIndex].color;
      for (let i = g.start; i < g.start + g.count; i++) {
        const v = idx ? idx.getX(i) : i;
        col[v * 3] = c.r; col[v * 3 + 1] = c.g; col[v * 3 + 2] = c.b;
      }
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.clearGroups();
    o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0 });
  });
}

// Перекраска текстурной модели: яркость текстуры × цвет (свинья → кабан)
function tintMaterials(root, color) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    const m = o.material.clone();
    m.roughness = 0.9;
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uTint = { value: color };
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', '#include <common>\nuniform vec3 uTint;')
        .replace('#include <map_fragment>', '#include <map_fragment>\nfloat lumT = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));\ndiffuseColor.rgb = uTint * (0.55 + lumT * 1.4);');
    };
    o.material = m;
  });
}

function findClip(clips, names) {
  for (const n of names) {
    const exact = clips.find((c) => c.name === n);
    if (exact) return exact;
    const suf = clips.find((c) => c.name.endsWith('|' + n));
    if (suf) return suf;
  }
  return null;
}

export async function loadModel(key) {
  if (cache.has(key)) return cache.get(key);
  const cfg = MODELS[key];
  const p = loader.loadAsync(cfg.url).then((gltf) => {
    const scene = gltf.scene;
    // у части моделей в glTF стоит metallic=1 — без карты окружения они выглядят чёрными
    scene.traverse((o) => { if (o.isMesh) for (const m of [].concat(o.material)) if (!m.metalnessMap) { m.metalness = 0; m.roughness = Math.max(m.roughness ?? 1, 0.6); } });
    if (cfg.flatten) flattenMaterials(scene);
    if (cfg.tint) tintMaterials(scene, new THREE.Color(cfg.tint));
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene, true);
    const size = box.getSize(new THREE.Vector3());
    const scale = cfg.height / size.y;
    const clips = {};
    for (const [k, names] of Object.entries(cfg.anims || {})) clips[k] = findClip(gltf.animations, names);
    return { scene, scale, minY: box.min.y, clips, cfg, size };
  });
  cache.set(key, p);
  return p;
}

// Экземпляр модели с миксером анимаций
export class ModelInstance {
  constructor(asset, castShadow) {
    this.asset = asset;
    const inner = SkeletonUtils.clone(asset.scene);
    inner.scale.setScalar(asset.scale);
    inner.position.y = -asset.minY * asset.scale;
    inner.rotation.y = asset.cfg.yaw || 0;
    inner.traverse((o) => {
      if (o.isMesh) { o.castShadow = castShadow; o.frustumCulled = false; }
    });
    this.root = new THREE.Group();
    this.root.add(inner);
    this.mixer = new THREE.AnimationMixer(inner);
    this.actions = {};
    this.current = null;
  }

  play(name, fade = 0.3) {
    if (this.currentName === name) return;
    const clip = this.asset.clips[name] || this.asset.clips.idle;
    if (!clip) return;
    let a = this.actions[name];
    if (!a) {
      a = this.actions[name] = this.mixer.clipAction(clip);
      if (name === 'death') { a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; }
    }
    a.reset().play();
    if (this.current) this.current.crossFadeTo(a, fade, false);
    this.current = a;
    this.currentName = name;
  }

  update(dt) { this.mixer.update(dt); }
}
