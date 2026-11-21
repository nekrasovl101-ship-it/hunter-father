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

  seatWorld(out = new THREE.Vector3(), seat = 0) {
    const sp = this.cfg.seats?.[seat];
    return (sp ? out.set(sp[0], sp[1], sp[2]) : out.copy(this.cfg.seat)).applyMatrix4(this.root.matrixWorld);
  }

  // Салон от первого лица (только для своего водителя): руль с руками, приборная панель со спидометром
  buildCockpit() {
    if (this.cockpit) return this.cockpit;
    const g = new THREE.Group();
    const s = this.cfg.seat;
    const dark = new THREE.MeshStandardMaterial({ color: 0x1d1c1a, roughness: 0.55, metalness: 0.2 });
    const panel = new THREE.MeshStandardMaterial({ color: 0x2a2724, roughness: 0.8, metalness: 0 });
    const glove = new THREE.MeshStandardMaterial({ color: 0x3b2c20, roughness: 0.85, metalness: 0 });
    const sleeve = new THREE.MeshStandardMaterial({ color: 0x4a5236, roughness: 0.9, metalness: 0 });
    // руль: обод, три спицы, ступица; наклонён к водителю
    const wheel = new THREE.Group();
    wheel.position.set(s.x, s.y - 0.33, s.z + 0.46);
    wheel.rotation.x = 0.5;   // верх руля дальше от водителя, низ ближе
    const spin = new THREE.Group();
    wheel.add(spin);
    spin.add(new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.022, 10, 40), dark));
    spin.add(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.05, 20).rotateX(Math.PI / 2), dark));
    for (const a of [Math.PI / 2, Math.PI * 7 / 6, -Math.PI / 6]) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.028, 0.018), dark);
      sp.position.set(Math.cos(a) * 0.1, Math.sin(a) * 0.1, 0); sp.rotation.z = a;
      spin.add(sp);
    }
    // рулевая колонка
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.35, 10).rotateX(Math.PI / 2), dark);
    col.position.set(0, 0, 0.18); wheel.add(col);
    g.add(wheel);
    // руки в перчатках на ободе (на «10 и 2»), предплечья тянутся к плечам
    const grips = [new THREE.Object3D(), new THREE.Object3D()];
    grips[0].position.set(-0.17, 0.08, 0); grips[1].position.set(0.17, 0.08, 0);
    const arms = [];
    for (const gp of grips) {
      spin.add(gp);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.042, 12, 10).scale(1, 1.25, 0.9), glove);
      gp.add(hand);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 1, 10), sleeve);
      g.add(arm);
      arms.push(arm);
    }
    const shoulders = [new THREE.Vector3(s.x - 0.24, s.y - 0.42, s.z - 0.08), new THREE.Vector3(s.x + 0.24, s.y - 0.42, s.z - 0.08)];
    // приборная панель во всю ширину + щиток приборов со спидометром и тахометром
    const dash = new THREE.Mesh(new THREE.BoxGeometry(this.size.x * 0.86, 0.22, 0.4), panel);
    dash.position.set(0, s.y - 0.42, s.z + 0.84);
    g.add(dash);
    const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 128;
    const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace;
    const gauges = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.18), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
    gauges.position.set(s.x, s.y - 0.27, s.z + 0.68);
    gauges.rotation.set(-0.35, Math.PI, 0);
    g.add(gauges);
    this.root.add(g);
    g.visible = false;
    const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), dir = new THREE.Vector3();
    let gT = 0;
    this.cockpit = g;
    g.updateCockpit = (dt) => {
      spin.rotation.z = -this.steer * 4;   // руль крутится сильнее колёс
      g.updateMatrixWorld(true);
      const inv = this.root.matrixWorld.clone().invert();
      grips.forEach((gp, i) => {
        gp.getWorldPosition(tmpA).applyMatrix4(inv);   // точка хвата в координатах машины
        tmpB.copy(shoulders[i]);
        dir.subVectors(tmpA, tmpB);
        const len = dir.length();
        arms[i].position.copy(tmpB).addScaledVector(dir, 0.5);
        arms[i].scale.set(1, len, 1);
        arms[i].quaternion.setFromUnitVectors(up, dir.normalize());
      });
      // приборы — 8 раз в секунду
      if ((gT += dt) > 0.12) {
        gT = 0;
        const c = canvas.getContext('2d');
        c.fillStyle = '#0c0d0c'; c.fillRect(0, 0, 256, 128);
        const dial = (cx, val, max, label) => {
          c.strokeStyle = '#3a3d38'; c.lineWidth = 4; c.beginPath(); c.arc(cx, 70, 50, Math.PI * 0.8, Math.PI * 2.2); c.stroke();
          c.strokeStyle = '#d9a441'; c.beginPath(); c.arc(cx, 70, 50, Math.PI * 0.8, Math.PI * 0.8 + Math.PI * 1.4 * Math.min(1, val / max)); c.stroke();
          const a = Math.PI * 0.8 + Math.PI * 1.4 * Math.min(1, val / max);
          c.strokeStyle = '#f04a2a'; c.lineWidth = 3; c.beginPath(); c.moveTo(cx, 70); c.lineTo(cx + Math.cos(a) * 42, 70 + Math.sin(a) * 42); c.stroke();
          c.fillStyle = '#e8e2cc'; c.font = 'bold 22px sans-serif'; c.textAlign = 'center'; c.fillText(String(Math.round(val)), cx, 100);
          c.font = '11px sans-serif'; c.fillStyle = '#9a9a8a'; c.fillText(label, cx, 118);
        };
        dial(68, Math.abs(this.speed) * 3.6, 140, 'км/ч');
        dial(188, (this.rpm || 0) * 6, 6, 'об/мин ×1000');
        tex.needsUpdate = true;
      }
    };
    return g;
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
  // seat > 0 — пассажир: свободный обзор во все стороны (можно стрелять), aimT — приближение оптики
  update(dt, v, look, seat = 0, aimT = 0) {
    const cam = this.camera;
    const passenger = seat > 0;
    const sens = passenger ? 0.0022 * (1 - aimT * 0.78) : 0.004;
    if (look.x || look.y) {
      this.idle = 0;
      this.yawOff -= look.x * sens;
      this.pitchOff = passenger && this.firstPerson
        ? Math.max(-1.2, Math.min(1.2, this.pitchOff - look.y * sens))
        : Math.max(-0.3, Math.min(0.9, this.pitchOff + look.y * 0.003));
    }
    else { this.idle += dt; if (this.idle > 1.5 && !this.firstPerson && !passenger) this.yawOff *= Math.max(0, 1 - dt * 2); }
    if (this.firstPerson) {
      v.root.updateMatrixWorld(true);
      v.seatWorld(cam.position, seat);
      cam.rotation.set(0, 0, 0, 'YXZ');
      cam.rotation.y = v.heading + Math.PI + this.yawOff;
      cam.rotation.x = passenger ? this.pitchOff - v.pitch * 0.5 : -v.pitch - (this.pitchOff - 0.12) * 0.8;
      cam.rotation.z = -v.roll * 0.5;
      const fov = passenger ? 72 + (14 - 72) * aimT * aimT : 72;
      if (Math.abs(cam.fov - fov) > 0.01) { cam.fov = fov; cam.updateProjectionMatrix(); }
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
