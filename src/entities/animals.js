import { heightAt } from '../../shared/terrain.js';
import * as THREE from 'three';
import { SPECIES } from '../../shared/animals.js';
import { loadModel, ModelInstance } from './assets.js';
import { MODELS } from '../config/models.js';

// Отображение животных: берёт состояния из симуляции (локальной или сервера)
// и плавно двигает модели. Ничего не решает сам.
export class AnimalViews {
  constructor(scene, ground, preset) {
    Object.assign(this, { scene, ground, preset });
    this.views = new Map();
    this.debug = false;
    this._frustum = new THREE.Frustum();
    this._m = new THREE.Matrix4();
    this._sphere = new THREE.Sphere();
  }

  async preload(types) {
    await Promise.all(types.map((t) => loadModel(t)));
  }

  _create(a) {
    const v = { id: a.id, type: a.type, x: a.x, z: a.z, heading: a.heading, model: null, hit: null };
    this.views.set(a.id, v);
    const key = MODELS[a.type] ? a.type : 'deer';
    loadModel(key).then((asset) => {
      if (!this.views.has(a.id)) return;
      v.model = new ModelInstance(asset, this.preset.shadows);
      this.scene.add(v.model.root);
      v.model.play(a.anim);
      v.model.mixer.setTime(Math.random() * 3);
    });
    return v;
  }

  _hitDebug(v) {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0xff3030, wireframe: true });
    for (const hb of SPECIES[v.type].hitboxes) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(hb.r, 8, 6), mat);
      m.position.set(hb.x, hb.y, hb.z);
      g.add(m);
    }
    return g;
  }

  // Процедурная анимация для моделей без скелета (заяц): прыжки и падение
  _hop(v, a, dt) {
    const inner = v.model.root.children[0];
    v.hopT = (v.hopT || 0) + dt * (a.speed > 0.3 ? 2 + a.speed * 0.45 : 0);
    if (a.state === 'dead') {
      v.deadRoll = Math.min(Math.PI / 2, (v.deadRoll || 0) + dt * 6);
      v.model.root.rotateZ(v.deadRoll);
      return;
    }
    const ph = v.hopT * Math.PI;
    const amp = Math.min(0.35, a.speed * 0.04);
    const base = -v.model.asset.minY * v.model.asset.scale;
    inner.position.y = base + Math.abs(Math.sin(ph)) * amp;
    inner.rotation.x = Math.cos(ph) * amp * 0.9;
    // жуёт/шевелит ушами на месте — лёгкое покачивание
    if (a.speed < 0.3) inner.rotation.x = Math.sin(performance.now() * 0.003 + a.id) * 0.04;
  }

  // Процедурная походка для моделей без скелета (слон, жираф, лев…): шаг — покачивание и кивки,
  // бег — галоп с подскоком, на месте — дыхание; гибель — заваливается набок
  _gait(v, a, dt) {
    const inner = v.model.root.children[0];
    const base = -v.model.asset.minY * v.model.asset.scale;
    const lu = v.model.legU;
    if (a.state === 'dead') {
      if (lu) lu.value.y = 0;
      v.deadRoll = Math.min(Math.PI / 2 * 0.92, (v.deadRoll || 0) + dt * 2.2);
      inner.rotation.z = v.deadRoll;
      inner.position.y = base * (1 - v.deadRoll * 0.35);
      return;
    }
    v.deadRoll = 0; inner.rotation.z = 0;
    const h = v.model.asset.cfg.height;
    const sp = a.speed || 0;
    const freq = sp > 0.2 ? 0.9 + sp * 0.5 / Math.sqrt(h) : 0;   // шагов в секунду
    v.gaitT = (v.gaitT || 0) + dt * freq;
    const ph = v.gaitT * Math.PI * 2;
    if (lu) {
      // размах ноги: за цикл зверь проходит sp/freq метров — копыто качается на четверть шага
      // (в единицах модели: делим на масштаб); плавно нарастает/затухает при старте и остановке
      const legH = lu.value.z * v.model.asset.scale;
      const want = freq > 0 ? Math.min(0.55, (sp / freq) * 0.3 / legH) : 0;
      lu.value.y += (want - lu.value.y) * Math.min(1, dt * 6);
      lu.value.x = ph;
    }
    const run = Math.min(1, Math.max(0, (sp - 3) / 4));
    const amp = Math.min(0.06 * h, sp * 0.012 * h) * (1 + run * 1.5);
    inner.position.y = base + Math.abs(Math.sin(ph)) * amp * (0.5 + run);
    inner.rotation.x = Math.sin(ph) * (0.025 + run * 0.06);          // кивок/галоп
    inner.rotation.y = (v.model.asset.cfg.yaw || 0) + Math.sin(ph * 0.5) * 0.03 * (1 - run);
    if (sp < 0.2) inner.position.y = base + Math.sin(performance.now() * 0.0015 + a.id) * 0.004 * h;   // дыхание
  }

  // animals: массив состояний {id,type,x,z,heading,anim,speed}
  sync(animals, dt, camera) {
    const seen = new Set();
    camera.updateMatrixWorld();
    this._frustum.setFromProjectionMatrix(this._m.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    const cam = camera.position;
    const far2 = this.preset.viewDist * this.preset.viewDist;

    for (const a of animals) {
      seen.add(a.id);
      const v = this.views.get(a.id) || this._create(a);
      // Плавность: положение из симуляции/сервера обновляется рывками (сервер шлёт ~10 раз/с,
      // дальних зверей симуляция считает реже) — поэтому «досчитываем» движение по скорости и
      // направлению на время, прошедшее с последнего обновления. Зверь идёт ровно, без дёрганий.
      const moving = a.anim === 'walk' || a.anim === 'run';
      const age = !moving ? 0 : this.smooth ? Math.min(0.25, (performance.now() - (a.t || 0)) / 1000) : Math.min(0.35, a.lod || 0);
      const px = a.x + Math.sin(a.heading) * (a.speed || 0) * age;
      const pz = a.z + Math.cos(a.heading) * (a.speed || 0) * age;
      const k = this.smooth ? Math.min(1, dt * 10) : 1;
      // большой скачок (появился, перепрыгнул) — сразу на место
      if ((px - v.x) ** 2 + (pz - v.z) ** 2 > 36) { v.x = px; v.z = pz; }
      v.x += (px - v.x) * k;
      v.z += (pz - v.z) * k;
      let dh = a.heading - v.heading;
      dh = Math.atan2(Math.sin(dh), Math.cos(dh));
      v.heading += dh * (this.smooth ? Math.min(1, dt * 8) : Math.min(1, dt * 14));
      if (!v.model) continue;
      const root = v.model.root;
      // высота — та же, по которой считаются попадания (heightAt), иначе пуля проходит мимо «тела»
      const y = age > 0 || this.smooth ? heightAt(v.x, v.z) : a.y ?? heightAt(v.x, v.z);
      root.position.set(v.x, y, v.z);
      root.rotation.y = v.heading;

      const d2 = (v.x - cam.x) ** 2 + (v.z - cam.z) ** 2;
      this._sphere.center.set(v.x, y + 1, v.z);
      this._sphere.radius = 2;
      root.visible = d2 < far2 && this._frustum.intersectsSphere(this._sphere);

      v.model.play(a.anim);
      if (v.model.asset.cfg.hop) this._hop(v, a, dt);
      else if (v.model.asset.cfg.gait) this._gait(v, a, dt);
      if (v.model.current) {
        const sp = SPECIES[a.type];
        if (a.anim === 'walk') v.model.current.timeScale = Math.max(0.4, a.speed / sp.walk);
        else if (a.anim === 'run') v.model.current.timeScale = Math.max(0.5, a.speed / (sp.run * 0.85));
        else v.model.current.timeScale = 1;
      }
      // дальние животные анимируем реже
      v.acc = (v.acc || 0) + dt;
      const interval = !root.visible ? 0.5 : d2 > 80 * 80 ? 1 / 20 : 0;
      if (v.acc >= interval) { v.model.update(v.acc); v.acc = 0; }

      if (this.debug && !v.hit) { v.hit = this._hitDebug(v); root.add(v.hit); }
      if (v.hit) v.hit.visible = this.debug;
    }
    for (const [id, v] of this.views) {
      if (seen.has(id)) continue;
      if (v.model) this.scene.remove(v.model.root);
      this.views.delete(id);
    }
  }
}
