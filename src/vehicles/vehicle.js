import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { VEHICLES } from '../config/models.js';
import { WATER_LEVEL, roadDist, ROAD_HALF } from '../../shared/terrain.js';

const loader = new GLTFLoader();
const cache = new Map();
const G = 18;

// Загружает модель машины, приводит к длине cfg.length, ставит «носом» в +Z,
// находит колёса и делает для каждого шарнир (руль + вращение).
async function loadVehicleAsset(key) {
  if (cache.has(key)) return cache.get(key);
  const cfg = VEHICLES[key];
  const p = loader.loadAsync(cfg.url).then((gltf) => {
    const model = gltf.scene;
    const wrap = new THREE.Group();
    wrap.add(model);
    wrap.rotation.y = cfg.yaw || 0;
    wrap.updateMatrixWorld(true);
    let box = new THREE.Box3().setFromObject(wrap);
    let size = box.getSize(new THREE.Vector3());
    const s = cfg.length / Math.max(size.x, size.z);
    wrap.scale.setScalar(s);
    wrap.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(wrap);
    const c = box.getCenter(new THREE.Vector3());
    wrap.position.set(-c.x, -box.min.y, -c.z);
    const root = new THREE.Group();
    root.add(wrap);
    root.updateMatrixWorld(true);
    // все неподвижные части склеиваем по материалам (32 меша → 2 draw call), колёса оставляем отдельно
    const byMat = new Map();
    const statics = [];
    model.traverse((o) => {
      if (!o.isMesh || (cfg.wheels.test(o.name) && !/spare/i.test(o.name))) return;
      const g = o.geometry.clone().applyMatrix4(o.matrixWorld);
      for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
      if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      const key = o.material.uuid;
      if (!byMat.has(key)) byMat.set(key, { mat: o.material, list: [] });
      byMat.get(key).list.push(g.index ? g.toNonIndexed() : g);
      statics.push(o);
    });
    for (const o of statics) o.parent.remove(o);
    for (const { mat, list } of byMat.values()) {
      const merged = new THREE.Mesh(mergeGeometries(list), mat);
      root.add(merged);
    }
    root.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      // стекло делаем полупрозрачным и бликующим, кузов — «краской»
      const m = o.material;
      if (m && /glass/i.test(m.name)) { m.transparent = true; m.opacity = 0.55; m.roughness = 0.05; m.metalness = 0.8; }
      else if (m && !m.userData.tuned) { m.roughness = Math.min(m.roughness ?? 1, 0.55); m.metalness = Math.max(m.metalness ?? 0, 0.15); m.userData.tuned = true; }
    });
    return { root, cfg, size: new THREE.Box3().setFromObject(root).getSize(new THREE.Vector3()) };
  });
  cache.set(key, p);
  return p;
}

export class Vehicle {
  static async create(key, world, ground, x, z, heading) {
    const asset = await loadVehicleAsset(key);
    return new Vehicle(asset, world, ground, x, z, heading);
  }

  constructor(asset, world, ground, x, z, heading) {
    Object.assign(this, { world, ground, cfg: asset.cfg });
    this.root = asset.root.clone(true);
    this.size = asset.size;
    this.pos = new THREE.Vector3(x, ground.sample(x, z), z);
    this.heading = heading;
    this.speed = 0;
    this.vy = 0;
    this.pitch = 0;
    this.roll = 0;
    this.steer = 0;
    this.airborne = false;
    this.driver = null;
    this.rpm = 0;
    this.throttle = 0;

    // колёса: шарниры в локальных координатах машины
    this.root.updateMatrixWorld(true);
    const wheels = [];
    this.root.traverse((o) => { if (o.isMesh && this.cfg.wheels.test(o.name) && !/spare/i.test(o.name)) wheels.push(o); });
    this.wheels = wheels.map((mesh) => {
      const b = new THREE.Box3().setFromObject(mesh);
      const c = b.getCenter(new THREE.Vector3());
      const steerPivot = new THREE.Group();
      steerPivot.position.copy(c);
      this.root.add(steerPivot);
      const spin = new THREE.Group();
      steerPivot.add(spin);
      spin.updateMatrixWorld(true);
      spin.attach(mesh);
      return { steerPivot, spin, front: c.z > 0, base: c.clone(), radius: Math.max(0.25, (b.max.y - b.min.y) / 2) };
    });
    const zs = this.wheels.map((w) => w.base.z);
    this.wheelbase = zs.length ? Math.max(2, Math.max(...zs) - Math.min(...zs)) : this.size.z * 0.6;
    this.track = Math.max(1.4, this.size.x * 0.82);
    this.frontZ = this.wheelbase / 2;
    this.radius = this.wheels[0]?.radius || 0.4;
    this._place();
  }

  get forward() { return new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading)); }

  // controls: {throttle -1..1, steer -1..1 (вправо +), handbrake}
  update(dt, controls) {
    const cfg = this.cfg;
    const c = controls || { throttle: 0, steer: 0, handbrake: false };
    this.throttle = c.throttle;
    const fwd = this.forward;
    const inWater = this.ground.sample(this.pos.x, this.pos.z) < WATER_LEVEL - 0.4;
    const onRoad = roadDist(this.pos.x, this.pos.z) < ROAD_HALF + 0.8;
    const max = cfg.maxSpeed * (inWater ? 0.3 : onRoad ? 1 : 0.85);

    // руль: чем быстрее, тем меньше угол
    const maxSteer = 0.6 / (1 + Math.abs(this.speed) * 0.07);
    this.steer += (c.steer * maxSteer - this.steer) * Math.min(1, dt * 5);

    if (!this.airborne) {
      if (c.throttle > 0.05) {
        if (this.speed < -0.5) this.speed += 16 * c.throttle * dt;
        else this.speed += cfg.accel * c.throttle * Math.max(0, 1 - this.speed / max) * dt;
      } else if (c.throttle < -0.05) {
        if (this.speed > 0.5) this.speed += 16 * c.throttle * dt;
        else this.speed += cfg.accel * 0.7 * c.throttle * Math.max(0, 1 + this.speed / (cfg.maxSpeed * 0.3)) * dt;
      } else {
        const roll = (inWater ? 4 : 1.2) * dt;
        this.speed = Math.abs(this.speed) < roll ? 0 : this.speed - Math.sign(this.speed) * roll;
      }
      if (c.handbrake) this.speed *= Math.max(0, 1 - dt * 2.5);
      this.speed -= this.speed * (inWater ? 1.2 : 0.05) * dt;
      // уклон
      this.speed -= G * 0.55 * Math.sin(this.pitch) * dt;
      // поворот (кинематический «велосипед»)
      const yawRate = (this.speed * Math.tan(this.steer)) / this.wheelbase * (c.handbrake ? 1.5 : 1);
      this.heading -= yawRate * dt;
    }

    const prev = this.pos.clone();
    this.pos.x += fwd.x * this.speed * dt;
    this.pos.z += fwd.z * this.speed * dt;

    // столкновения: два круга (перед и зад)
    const hw = this.track / 2 + 0.15;
    const hits = [];
    for (const k of [1, -1]) {
      const p = { x: this.pos.x + fwd.x * this.frontZ * k, z: this.pos.z + fwd.z * this.frontZ * k };
      const before = { ...p };
      this.world.collide(p, hw);
      if (p.x !== before.x || p.z !== before.z) hits.push([p.x - before.x, p.z - before.z]);
    }
    if (hits.length) {
      for (const [dx, dz] of hits) { this.pos.x += dx; this.pos.z += dz; }
      const impact = Math.abs(this.speed);
      this.speed *= -0.25;
      this.onCrash?.(impact);
    }

    // подвеска: высоты под четырьмя колёсами
    // right = forward × up; порядок: перед-лево, перед-право, зад-лево, зад-право
    const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
    const hs = [];
    for (const [fz, sx] of [[1, -1], [1, 1], [-1, -1], [-1, 1]]) {
      const wx = this.pos.x + fwd.x * this.frontZ * fz + right.x * sx * this.track / 2;
      const wz = this.pos.z + fwd.z * this.frontZ * fz + right.z * sx * this.track / 2;
      hs.push(this.ground.sample(wx, wz));
    }
    const front = (hs[0] + hs[1]) / 2, rear = (hs[2] + hs[3]) / 2;
    const left = (hs[0] + hs[2]) / 2, rgt = (hs[1] + hs[3]) / 2;
    const targetY = (front + rear) / 2;
    const targetPitch = Math.atan2(front - rear, this.wheelbase);
    const targetRoll = Math.atan2(left - rgt, this.track);

    const predicted = this.pos.y + this.vy * dt;
    if (predicted > targetY + 0.12) {
      this.airborne = true;
      this.vy -= G * dt;
      this.pos.y = predicted;
      this.pitch += (targetPitch * 0.3 - this.pitch) * Math.min(1, dt * 1.5);
    } else {
      if (this.airborne && this.vy < -6) this.onLand?.(-this.vy);
      this.airborne = false;
      this.vy = Math.min(8, Math.max(-8, (targetY - prev.y) / Math.max(dt, 1e-3)));
      this.pos.y = targetY;
      this.pitch += (targetPitch - this.pitch) * Math.min(1, dt * 10);
      this.roll += (targetRoll - this.roll) * Math.min(1, dt * 10);
    }

    // колёса: вращение, руль, ход подвески
    this.wheels.forEach((w) => {
      w.spin.rotation.x += (this.speed / w.radius) * dt;
      if (w.front) w.steerPivot.rotation.y = this.steer * -1;
      // локальный +X машины — левый борт
      const fz = w.front ? 1 : -1, left = w.base.x > 0;
      const idx = (w.front ? 0 : 2) + (left ? 0 : 1);
      const plane = targetY + Math.sin(targetPitch) * this.frontZ * fz + Math.sin(targetRoll) * (left ? 1 : -1) * this.track / 2;
      const comp = this.airborne ? -0.12 : Math.max(-0.15, Math.min(0.15, hs[idx] - plane));
      w.steerPivot.position.y += (w.base.y + comp - w.steerPivot.position.y) * Math.min(1, dt * 15);
    });

    this.rpm += ((Math.abs(this.speed) / cfg.maxSpeed) * 0.8 + Math.abs(c.throttle) * 0.25 - this.rpm) * Math.min(1, dt * 4);
    this._place();
  }

  // Машиной управляет другой игрок: плавно двигаемся к присланному состоянию
  applyRemote(dt, st) {
    const [x, y, z, heading, pitch, roll, speed, steer] = st;
    const k = Math.min(1, dt * 10);
    this.pos.x += (x - this.pos.x) * k; this.pos.y += (y - this.pos.y) * k; this.pos.z += (z - this.pos.z) * k;
    let dh = heading - this.heading; dh = Math.atan2(Math.sin(dh), Math.cos(dh));
    this.heading += dh * k;
    this.pitch += (pitch - this.pitch) * k;
    this.roll += (roll - this.roll) * k;
    this.speed = speed; this.steer = steer;
    for (const w of this.wheels) {
      w.spin.rotation.x += (speed / w.radius) * dt;
      if (w.front) w.steerPivot.rotation.y = -steer;
    }
    this.rpm += ((Math.abs(speed) / this.cfg.maxSpeed) * 0.8 - this.rpm) * Math.min(1, dt * 4);
    this._place();
  }

  netState() {
    const r = (v) => Math.round(v * 100) / 100;
    return [r(this.pos.x), r(this.pos.y), r(this.pos.z), r(this.heading), r(this.pitch), r(this.roll), r(this.speed), r(this.steer)];
  }

  _place() {
    this.root.position.copy(this.pos);
    this.root.rotation.set(0, 0, 0);
    this.root.rotateY(this.heading);
    this.root.rotateX(-this.pitch);
    this.root.rotateZ(this.roll);
  }

  seatWorld(out = new THREE.Vector3()) {
    return out.copy(this.cfg.seat).applyMatrix4(this.root.matrixWorld);
  }

  // где высадить водителя: слева, иначе справа
  exitPoint() {
    const fwd = this.forward;
    const left = new THREE.Vector3(fwd.z, 0, -fwd.x);
    for (const s of [1, -1]) {
      const p = { x: this.pos.x + left.x * s * (this.track / 2 + 1.2), z: this.pos.z + left.z * s * (this.track / 2 + 1.2) };
      const b = { ...p };
      this.world.collide(p, 0.4);
      if (Math.hypot(p.x - b.x, p.z - b.z) < 0.3) return p;
    }
    return { x: this.pos.x + fwd.x * (this.size.z / 2 + 1.5), z: this.pos.z + fwd.z * (this.size.z / 2 + 1.5) };
  }
}

// Камера за машиной (или с места водителя)
export class VehicleCamera {
  constructor(camera) {
    this.camera = camera;
    this.pos = new THREE.Vector3();
    this.yawOff = 0;
    this.pitchOff = 0.12;
    this.firstPerson = false;
    this.idle = 0;
    this._look = new THREE.Vector3();
  }
  reset(v) {
    this.pos.copy(v.pos).addScaledVector(v.forward, -8).add(new THREE.Vector3(0, 3, 0));
    this.yawOff = 0;
  }
  update(dt, v, look) {
    const cam = this.camera;
    if (look.x || look.y) { this.idle = 0; this.yawOff -= look.x * 0.004; this.pitchOff = Math.max(-0.3, Math.min(0.9, this.pitchOff + look.y * 0.003)); }
    else { this.idle += dt; if (this.idle > 1.5 && !this.firstPerson) this.yawOff *= Math.max(0, 1 - dt * 2); }
    if (this.firstPerson) {
      v.root.updateMatrixWorld(true);
      v.seatWorld(cam.position);
      cam.rotation.set(0, 0, 0, 'YXZ');
      cam.rotation.y = v.heading + Math.PI + this.yawOff;
      cam.rotation.x = -v.pitch - (this.pitchOff - 0.12) * 0.8;
      cam.rotation.z = -v.roll * 0.5;
      return;
    }
    const h = v.heading + this.yawOff;
    const dist = 6.8 + Math.min(2.5, Math.abs(v.speed) * 0.05);
    const target = new THREE.Vector3(v.pos.x - Math.sin(h) * dist * Math.cos(this.pitchOff), v.pos.y + 1.6 + Math.sin(this.pitchOff) * dist, v.pos.z - Math.cos(h) * dist * Math.cos(this.pitchOff));
    const gy = v.ground.sample(target.x, target.z) + 0.8;
    if (target.y < gy) target.y = gy;
    this.pos.lerp(target, 1 - Math.exp(-dt * 7));
    cam.position.copy(this.pos);
    this._look.copy(v.pos).add(new THREE.Vector3(0, 1.3, 0));
    cam.lookAt(this._look);
  }
}
