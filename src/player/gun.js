import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Реалистичная модель (Poly Haven, CC0). Ствол модели смотрит в +X — разворачиваем в -Z.
const RIFLE_MODEL = { url: 'models/rifle/bolt_action_rifle.gltf', yaw: Math.PI / 2, offset: [0, -0.035, -0.22] };

// Процедурная болтовая винтовка с оптикой. Один меш = один draw call.
function part(geo, color, x, y, z, rx = 0) {
  if (rx) geo.rotateX(rx);
  geo.translate(x, y, z);
  geo = geo.index ? geo.toNonIndexed() : geo;
  geo.deleteAttribute('uv');
  const c = new THREE.Color(color);
  const arr = new Float32Array(geo.attributes.position.count * 3);
  for (let i = 0; i < arr.length; i += 3) { arr[i] = c.r; arr[i + 1] = c.g; arr[i + 2] = c.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geo;
}

export function buildRifle() {
  const WOOD = 0x6b3a1c, WOOD2 = 0x4a2812, METAL = 0x2a2c2e, DARK = 0x111214;
  const R = Math.PI / 2;
  const parts = [
    part(new THREE.BoxGeometry(0.048, 0.1, 0.32), WOOD, 0, -0.035, 0.17),        // приклад
    part(new THREE.BoxGeometry(0.05, 0.03, 0.06), DARK, 0, -0.03, 0.34),          // затыльник
    part(new THREE.BoxGeometry(0.04, 0.05, 0.12), WOOD2, 0, -0.005, 0.0),         // шейка
    part(new THREE.BoxGeometry(0.044, 0.045, 0.38), WOOD, 0, 0.0, -0.25),         // цевьё
    part(new THREE.BoxGeometry(0.036, 0.04, 0.2), METAL, 0, 0.035, -0.06),        // ствольная коробка
    part(new THREE.CylinderGeometry(0.011, 0.013, 0.6, 8), METAL, 0, 0.035, -0.5, R),  // ствол
    part(new THREE.CylinderGeometry(0.016, 0.016, 0.03, 8), DARK, 0, 0.035, -0.79, R), // дульный срез
    part(new THREE.CylinderGeometry(0.017, 0.017, 0.24, 10), DARK, 0, 0.088, -0.07, R), // прицел
    part(new THREE.CylinderGeometry(0.026, 0.019, 0.07, 10), DARK, 0, 0.088, -0.215, R),
    part(new THREE.CylinderGeometry(0.019, 0.022, 0.05, 10), DARK, 0, 0.088, 0.07, R),
    part(new THREE.BoxGeometry(0.012, 0.03, 0.02), METAL, 0, 0.065, -0.13),       // кольца
    part(new THREE.BoxGeometry(0.012, 0.03, 0.02), METAL, 0, 0.065, 0.0),
    part(new THREE.CylinderGeometry(0.006, 0.006, 0.06, 6).rotateZ(R * 0.9), METAL, 0.035, 0.04, 0.02), // рукоять затвора
    part(new THREE.SphereGeometry(0.012, 6, 6), METAL, 0.065, 0.035, 0.02),
    part(new THREE.TorusGeometry(0.022, 0.004, 4, 8, Math.PI).rotateX(Math.PI).rotateY(R), METAL, 0, -0.03, -0.01),
  ];
  const g = mergeGeometries(parts);
  g.computeVertexNormals();
  return g;
}

function flashTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d');
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,250,220,1)'); gr.addColorStop(0.25, 'rgba(255,200,90,0.9)'); gr.addColorStop(1, 'rgba(255,120,20,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export const MAG_SIZE = 5;
// Оружие: охотничий карабин и снайперская винтовка (свой магазин, медленнее затвор, сильнее отдача,
// оптика с переменным приближением 4×–16× и ночным видением)
export const WEAPONS = {
  rifle: { name: 'Ружьё', mag: 5, reserve: 25, cycle: 0.95, kick: 1, scale: 1 },
  sniper: { name: 'Снайперская', mag: 5, reserve: 20, cycle: 1.35, kick: 1.6, scale: 1.14 },
};

export class Rifle {
  constructor(camera, sound) {
    this.sound = sound;
    this.mesh = new THREE.Mesh(buildRifle(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.25 }));
    this.mesh.renderOrder = 10;
    this.root = new THREE.Group();
    this.root.add(this.mesh);
    camera.add(this.root);
    this.flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: flashTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    this.flash.scale.setScalar(0.22);
    this.flash.position.set(0, 0.035, -0.86);
    this.flash.visible = false;
    this.mesh.add(this.flash);

    this.weapon = 'rifle';
    this.magSize = MAG_SIZE;
    this.ammo = MAG_SIZE;
    this.reserve = 25;
    this.stock = { rifle: { ammo: MAG_SIZE, reserve: 25 }, sniper: { ammo: WEAPONS.sniper.mag, reserve: WEAPONS.sniper.reserve } };
    this.state = 'ready';   // ready | cycling | reloading
    this.timer = 0;
    this.aimT = 0;
    this.kick = 0;
    this.bobT = 0;
    this.flashT = 0;
    this.reloadStep = 0;
    this.hip = new THREE.Vector3(0.17, -0.2, -0.36);
    this._loadModel();
    this.ads = new THREE.Vector3(0, -0.088, -0.22);
  }

  _loadModel() {
    new GLTFLoader().load(RIFLE_MODEL.url, (gltf) => {
      const m = gltf.scene;
      m.rotation.y = RIFLE_MODEL.yaw;
      m.position.set(...RIFLE_MODEL.offset);
      m.traverse((o) => {
        if (!o.isMesh) return;
        o.renderOrder = 10;
        if (/bullet/i.test(o.name)) o.visible = false;
      });
      this.bolt = m.getObjectByName('bolt_action_rifle_7_62_bolt_b');
      this.bolt2 = m.getObjectByName('bolt_action_rifle_7_62_bolt_a');
      if (this.bolt) this.boltBase = this.bolt.position.x;
      // старую процедурную модель прячем, вспышку переносим к дулу
      this.mesh.geometry.dispose();
      this.mesh.geometry = new THREE.BufferGeometry();
      this.flash.position.set(0, -0.005, -0.86);
      this.mesh.add(m);
    }, undefined, () => console.warn('rifle model failed, using procedural'));
  }

  // сменить оружие в руках (патроны каждого хранятся отдельно)
  setWeapon(w) {
    if (w === this.weapon || !WEAPONS[w]) return;
    this.stock[this.weapon] = { ammo: this.ammo, reserve: this.reserve };
    this.weapon = w;
    const W = WEAPONS[w];
    ({ ammo: this.ammo, reserve: this.reserve } = this.stock[w]);
    this.magSize = W.mag;
    this.mesh.scale.set(1, 1, W.scale);   // длинный ствол
    this.state = 'ready';
    this.sound.bolt();
  }

  canFire() { return this.state === 'ready' && this.ammo > 0; }

  fire() {
    if (this.state === 'reloading' && this.ammo > 0) this.state = 'ready'; // прерываем перезарядку
    if (!this.canFire()) {
      if (this.state === 'ready' && this.ammo === 0) { this.sound.dry(); if (this.reserve > 0) this.reload(); }
      return false;
    }
    this.ammo--;
    this.kick = WEAPONS[this.weapon].kick;
    this.flashT = 0.05;
    this.flash.material.rotation = Math.random() * Math.PI;
    this.state = 'cycling';
    this.timer = WEAPONS[this.weapon].cycle;
    this.sound.shot(0);
    setTimeout(() => this.ammo >= 0 && this.sound.bolt(), 250);
    return true;
  }

  reload() {
    if (this.state !== 'ready' || this.ammo >= this.magSize || this.reserve <= 0) return;
    this.state = 'reloading';
    this.timer = 0.45;
    this.reloadStep = 0;
  }

  update(dt, aiming, moveSpeed) {
    this.timer -= dt;
    if (this.state === 'cycling' && this.timer <= 0) this.state = 'ready';
    if (this.state === 'reloading' && this.timer <= 0) {
      if (this.ammo < this.magSize && this.reserve > 0) {
        this.ammo++; this.reserve--;
        this.sound.reloadRound(0);
        this.timer = 0.42;
      } else {
        this.state = 'ready';
        this.sound.bolt();
      }
    }
    const wantAim = aiming && this.state !== 'reloading';
    this.aimT += ((wantAim ? 1 : 0) - this.aimT) * Math.min(1, dt * 10);
    this.kick = Math.max(0, this.kick - dt * 5);
    this.flashT -= dt;
    this.flash.visible = this.flashT > 0;

    this.bobT += dt * (2 + moveSpeed * 1.4);
    const bobA = Math.min(moveSpeed, 7) * 0.004 * (1 - this.aimT * 0.85);
    const p = this.root.position.copy(this.hip).lerp(this.ads, this.aimT);
    p.x += Math.cos(this.bobT) * bobA;
    p.y += Math.abs(Math.sin(this.bobT)) * bobA - this.kick * 0.015;
    p.z += this.kick * 0.09;
    let rx = this.kick * 0.18, rz = 0, ry = 0;
    if (this.state === 'cycling' && this.timer < 0.75) {
      const k = Math.sin(Math.min(1, (0.75 - this.timer) / 0.6) * Math.PI);
      rz = k * 0.25; rx -= k * 0.05;
    }
    if (this.state === 'reloading') { rz = 0.6; rx = -0.25; ry = 0.2; p.y -= 0.05; }
    // затвор: назад-вперёд при передёргивании
    if (this.bolt) {
      let k = 0;
      if (this.state === 'cycling' && this.timer < 0.75) k = Math.sin(Math.min(1, (0.75 - this.timer) / 0.6) * Math.PI);
      if (this.state === 'reloading') k = 1;
      this.bolt.position.x = this.boltBase - k * 0.09;
      if (this.bolt2) this.bolt2.position.x = this.bolt.position.x;
    }
    this.rot = this.rot || new THREE.Vector3();
    this.rot.x += (rx - this.rot.x) * Math.min(1, dt * 14);
    this.rot.y += (ry - this.rot.y) * Math.min(1, dt * 10);
    this.rot.z += (rz - this.rot.z) * Math.min(1, dt * 10);
    this.root.rotation.set(this.rot.x, this.rot.y, this.rot.z);
    // в оптике винтовку скрываем — рисуется оверлей прицела
    this.root.visible = this.aimT < 0.92;
  }
}
