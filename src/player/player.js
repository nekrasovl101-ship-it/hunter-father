import * as THREE from 'three';
import { WATER_LEVEL } from '../../shared/terrain.js';

const EYE = 1.68;
const GRAVITY = 22;

export class Player {
  constructor(camera, ground, world, sound) {
    Object.assign(this, { camera, ground, world, sound });
    this.pos = new THREE.Vector3(0, 0, 0);
    this.pos.y = ground.sample(0, 0);
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.recoil = 0;
    this.onGround = true;
    this.speed = 0;
    this.stepT = 0;
    this.baseFov = camera.fov;
    this.health = 100;
    this.platform = null;   // {x, z, y, r} — стоим на вышке
    this.dirt = 0;          // 0..1 — насколько охотник в грязи
    this.fallT = 0;         // > 0 — лежит после падения
    this.fovMul = 1;        // приближение тепловизора
  }

  // падение: поскользнулся в грязи (slip) или неудачно приземлился с высоты (high)
  fall(kind) {
    if (this.fallT > 0) return;
    this.fallT = 1.7;
    this.fallKind = kind;
    this.vel.x *= 0.25; this.vel.z *= 0.25;
    this.dirt = Math.min(1, this.dirt + (kind === 'slip' ? 0.45 : 0.28));
    this.onFall?.(kind);
  }

  update(dt, input, aimT, binocT = 0) {
    const look = input.takeLook();
    const aimFov = this.aimFov || 14;   // поле зрения в оптике (у снайперской — зависит от кратности)
    const zoom = THREE.MathUtils.lerp(THREE.MathUtils.lerp(1, aimFov / this.baseFov, aimT), 0.12, binocT);
    const sens = 0.0022 * zoom;
    this.yaw -= look.x * sens;
    this.pitch -= look.y * sens;
    this.pitch = Math.max(-1.45, Math.min(1.45, this.pitch));

    // отдача: резкий подброс и плавный возврат
    const rec = this.recoil * Math.min(1, dt * 12);
    this.pitch += rec;
    this.recoil -= rec;

    const inWater = this.pos.y < WATER_LEVEL - 0.4;
    let max = input.sprint && aimT < 0.3 ? 7.2 : 4.3;
    if (aimT > 0.5 || binocT > 0.5) max = 2.2;
    if (inWater) max *= 0.45;

    // пока лежишь после падения — не управляешь, только встаёшь
    if (this.fallT > 0) { this.fallT -= dt; max = 0; }
    const f = this.fallT > 0 ? 0 : input.move.y, s = this.fallT > 0 ? 0 : input.move.x;
    const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
    // вперёд = -Z камеры
    const wx = (-sin * f + cos * s) * max;
    const wz = (-cos * f - sin * s) * max;
    const accel = this.onGround ? 12 : 2;
    this.vel.x += (wx - this.vel.x) * Math.min(1, dt * accel);
    this.vel.z += (wz - this.vel.z) * Math.min(1, dt * accel);

    if (input.consume('jump') && this.onGround && !inWater && this.fallT <= 0) { this.vel.y = 6.5; this.onGround = false; }
    this.vel.y -= GRAVITY * dt;

    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    if (this.platform) {
      // на вышке: не даём шагнуть за перила
      const pl = this.platform;
      const dx = this.pos.x - pl.x, dz = this.pos.z - pl.z, d = Math.hypot(dx, dz);
      if (d > pl.r) { this.pos.x = pl.x + (dx / d) * pl.r; this.pos.z = pl.z + (dz / d) * pl.r; }
    } else this.world.collide(this.pos, 0.35);
    this.pos.y += this.vel.y * dt;
    const g = this.platform ? this.platform.y : this.ground.sample(this.pos.x, this.pos.z);
    if (this.pos.y <= g) {
      // тяжёлое приземление (прыжок с вышки, обрыв) — падаешь
      if (!this.onGround && this.vel.y < -11.5) this.fall('high');
      this.pos.y = g; this.vel.y = 0; this.onGround = true;
    }
    else if (this.pos.y > g + 0.3) this.onGround = false;
    else if (this.onGround) this.pos.y = g; // прилипание при спуске

    this.speed = Math.hypot(this.vel.x, this.vel.z);
    if (inWater) this.dirt = Math.max(0, this.dirt - dt * 0.25);   // в реке грязь смывается
    if (this.onGround && this.speed > 1) {
      this.stepT += dt * this.speed * 0.55;
      if (this.stepT > 1) {
        this.stepT = 0;
        const puddle = !inWater && this.puddleAt?.(this.pos.x, this.pos.z);
        if (puddle) {
          this.sound.splashStep();
          this.dirt = Math.min(1, this.dirt + 0.025);           // брызги на ботинки и штаны
          if (this.speed > 5.8 && Math.random() < 0.2) this.fall('slip');   // на бегу по грязи можно поскользнуться
        } else this.sound.step(inWater);
      }
    }

    const bob = this.onGround ? Math.sin(performance.now() * 0.001 * (4 + this.speed * 1.4)) * Math.min(this.speed, 7) * 0.012 * (1 - aimT) : 0;
    // падение: камера резко уходит к земле с креном, полежал — поднимаешься
    let eye = EYE, roll = 0, tilt = 0;
    if (this.fallT > 0) {
      const t = 1.7 - this.fallT;
      const k = THREE.MathUtils.smoothstep(t, 0, 0.22) * (1 - THREE.MathUtils.smoothstep(t, 1.05, 1.7));
      eye = EYE * (1 - 0.74 * k);
      roll = k * (this.fallKind === 'slip' ? 0.55 : -0.4);
      tilt = k * (this.fallKind === 'slip' ? 0.35 : -0.25);
    }
    this.fallK = eye < EYE ? 1 - eye / EYE : 0;
    this.camera.position.set(this.pos.x, this.pos.y + eye + bob, this.pos.z);
    this.camera.rotation.set(this.pitch + tilt, this.yaw, roll, 'YXZ');
    const fov = THREE.MathUtils.lerp(THREE.MathUtils.lerp(this.baseFov, aimFov, aimT * aimT), 9, binocT * binocT) * (this.fovMul || 1);
    if (Math.abs(fov - this.camera.fov) > 0.01) { this.camera.fov = fov; this.camera.updateProjectionMatrix(); }
  }

  addRecoil(a) { this.recoil += a; }
}
