import * as THREE from 'three';
import { loadModel, ModelInstance } from './assets.js';
import { MODELS } from '../config/models.js';
import { buildRifle } from '../player/gun.js';

// Другие охотники: модель с анимациями, ружьё в руках, ник над головой.
function nickSprite(text) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 64;
  const x = c.getContext('2d');
  x.font = 'bold 30px -apple-system, Segoe UI, Roboto, sans-serif';
  const w = Math.min(248, x.measureText(text).width + 24);
  x.fillStyle = 'rgba(15,18,12,0.65)';
  x.beginPath(); x.roundRect((256 - w) / 2, 10, w, 44, 12); x.fill();
  x.fillStyle = '#f0e6cc'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, 128, 33);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false, transparent: true }));
  s.scale.set(1.6, 0.4, 1);
  s.renderOrder = 20;
  return s;
}

export class RemoteHunters {
  constructor(scene, ground, preset) {
    Object.assign(this, { scene, ground, preset });
    this.list = new Map(); // id -> view
    this.rifleGeo = buildRifle();
    this.rifleMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.2 });
    loadModel('hunter');
  }

  // g: 'm' — охотник, 'f' — охотница
  add(id, nick, g = 'm') {
    if (this.list.has(id)) { this.list.get(id).nick = nick; return; }
    const key = g === 'f' ? 'huntress' : 'hunter';
    const v = { id, nick, x: 0, y: 0, z: 0, yaw: 0, model: null, label: nickSprite(nick), target: null, flashT: 0 };
    this.list.set(id, v);
    loadModel(key).then((asset) => {
      if (!this.list.has(id)) return;
      v.model = new ModelInstance(asset, this.preset.shadows);
      v.model.play('idle');
      const cfg = MODELS[key].rifle;
      const bone = v.model.root.getObjectByName(cfg.bone);
      if (bone) {
        // компенсируем масштаб скелета, чтобы ружьё было «в метрах»
        v.model.root.updateMatrixWorld(true);
        const ws = bone.getWorldScale(new THREE.Vector3());
        const rifle = new THREE.Mesh(this.rifleGeo, this.rifleMat);
        rifle.scale.set(1 / ws.x, 1 / ws.y, 1 / ws.z);
        rifle.position.set(cfg.pos[0] / ws.x, cfg.pos[1] / ws.y, cfg.pos[2] / ws.z);
        rifle.rotation.set(...cfg.rot);
        rifle.castShadow = this.preset.shadows;
        bone.add(rifle);
        v.rifle = rifle;
      }
      v.model.root.add(v.label);
      v.label.position.y = 2.15;
      this.scene.add(v.model.root);
    });
  }

  remove(id) {
    const v = this.list.get(id);
    if (v?.model) this.scene.remove(v.model.root);
    this.list.delete(id);
  }

  // states: [id, x, y, z, yaw, pitch, speed, veh, alive, aim, seat]
  // seatFn(vehId, seat, out) → ставит out в точку глаз этого места, возвращает курс машины
  sync(states, myId, dt, camPos, seatFn) {
    for (const s of states) {
      const [id, x, y, z, yaw, , speed, veh, alive, aim, seat, dirt, fall] = s;
      if (id === myId) continue;
      const v = this.list.get(id);
      if (!v) continue;
      const first = v.target === null;
      v.target = { x, y, z, yaw, speed, veh, alive, aim, seat: seat || 0, dirt: dirt || 0, fall: !!fall };
      if (first) { v.x = x; v.y = y; v.z = z; v.yaw = yaw; }
    }
    for (const v of this.list.values()) {
      if (!v.model || !v.target) continue;
      const t = v.target;
      const k = Math.min(1, dt * 10);
      v.x += (t.x - v.x) * k; v.y += (t.y - v.y) * k; v.z += (t.z - v.z) * k;
      let dy = t.yaw - v.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      v.yaw += dy * k;
      const root = v.model.root;
      root.visible = true;
      // в машине: сидит на своём месте (видно в окнах), смотрит туда же, куда игрок
      const seatHeading = t.veh && seatFn ? seatFn(t.veh, t.seat, this._seat ||= new THREE.Vector3()) : null;
      if (seatHeading !== null && seatHeading !== undefined) {
        root.position.set(this._seat.x, this._seat.y - 1.62, this._seat.z); // голова на уровне глаз места
        root.rotation.y = t.seat === 0 ? seatHeading : v.yaw + Math.PI;
        if (v.rifle) v.rifle.visible = t.seat > 0;
        v.model.play(t.seat > 0 && t.aim ? 'aim' : 'idle', 0.2);
        v.model.update(dt);
        // ник того, кто сидит рядом в той же машине, не лезет в глаза
        v.label.visible = Math.hypot(this._seat.x - camPos.x, this._seat.z - camPos.z) > 4;
        v.label.scale.set(1.6, 0.4, 1);
        continue;
      }
      if (v.rifle) v.rifle.visible = true;
      v.label.visible = true;
      v.model.dirtU.value += ((t.dirt || 0) - v.model.dirtU.value) * Math.min(1, dt * 3);
      root.position.set(v.x, v.y, v.z);
      // yaw камеры смотрит в -Z, модель — в +Z
      root.rotation.y = v.yaw + Math.PI;
      let anim = t.speed > 4.6 ? 'run' : t.speed > 0.4 ? 'walk' : t.aim ? 'aim' : 'idle';
      if (t.fall) anim = 'fall';
      if (!t.alive) anim = 'death';
      if (v.flashT > 0) { v.flashT -= dt; if (!t.speed) anim = 'shoot'; }
      v.model.play(anim, 0.2);
      if (v.model.current && anim === 'walk') v.model.current.timeScale = Math.max(0.6, t.speed / 1.6);
      v.model.update(dt);
      // ник читаемого размера на любой дистанции
      const d = Math.hypot(v.x - camPos.x, v.z - camPos.z);
      const sc = Math.max(1, d / 12);
      v.label.scale.set(1.6 * sc, 0.4 * sc, 1);
      v.label.position.y = 2.1 + (sc - 1) * 0.2;
    }
  }

  shotFrom(id) {
    const v = this.list.get(id);
    if (v) v.flashT = 0.6;
    return v;
  }
}

// Своё тело — для вида от третьего лица (V): та же модель охотника, ружьё в руке, анимации по движению,
// грязь на одежде
export class SelfBody {
  constructor(scene, preset, g = 'm') {
    this.scene = scene;
    this.ready = false;
    const key = g === 'f' ? 'huntress' : 'hunter';
    loadModel(key).then((asset) => {
      this.model = new ModelInstance(asset, preset.shadows);
      this.model.play('idle');
      const cfg = MODELS[key].rifle;
      const bone = this.model.root.getObjectByName(cfg.bone);
      if (bone) {
        this.model.root.updateMatrixWorld(true);
        const ws = bone.getWorldScale(new THREE.Vector3());
        const rifle = new THREE.Mesh(buildRifle(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.2 }));
        rifle.scale.set(1 / ws.x, 1 / ws.y, 1 / ws.z);
        rifle.position.set(cfg.pos[0] / ws.x, cfg.pos[1] / ws.y, cfg.pos[2] / ws.z);
        rifle.rotation.set(...cfg.rot);
        rifle.castShadow = preset.shadows;
        bone.add(rifle);
      }
      this.model.root.visible = false;
      scene.add(this.model.root);
      this.ready = true;
    });
  }

  // player — позиция/курс/скорость/падение; visible — включён ли вид от третьего лица
  update(dt, player, visible, aiming) {
    if (!this.ready) return;
    const root = this.model.root;
    root.visible = visible;
    this.model.dirtU.value = player.dirt;
    if (!visible) return;
    root.position.copy(player.pos);
    root.rotation.y = player.yaw + Math.PI;
    const anim = player.fallT > 0 ? 'fall' : player.speed > 4.6 ? 'run' : player.speed > 0.4 ? 'walk' : aiming ? 'aim' : 'idle';
    this.model.play(anim, 0.15);
    if (this.model.current && anim === 'walk') this.model.current.timeScale = Math.max(0.6, player.speed / 1.6);
    this.model.update(dt);
  }
}
