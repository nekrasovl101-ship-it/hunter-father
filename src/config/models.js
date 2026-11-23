import * as THREE from 'three';

// Реестр 3D-моделей. Чтобы заменить модель — положите свой .glb в /public/models
// и поправьте запись здесь. Анимации ищутся по списку имён (первое найденное).
//   height  — до какой высоты (м) масштабировать модель
//   yaw     — поворот модели, если она смотрит не в +Z
//   flatten — склеить материалы без текстур в один (меньше draw calls)
//   tint    — перекрасить текстуру модели (оттенки серого × цвет)
//   hop     — у модели нет анимаций: процедурные прыжки (заяц)
// Хитбоксы для попаданий — в shared/animals.js (SPECIES).
const STD = { idle: ['Idle', 'Idle_2'], walk: ['Walk'], run: ['Gallop', 'Run'], eat: ['Eating', 'Idle_Headlow', 'Idle_2_HeadLow'], death: ['Death'], attack: ['Attack', 'Attack_Headbutt', 'Headbutt'] };

export const MODELS = {
  deer: { url: 'models/deer.glb', height: 1.75, yaw: 0, flatten: true, anims: STD },
  stag: { url: 'models/stag.glb', height: 2.35, yaw: 0, flatten: true, anims: STD },
  wolf: { url: 'models/wolf.glb', height: 1.05, yaw: 0, flatten: true, anims: STD },
  fox: { url: 'models/fox.glb', height: 0.62, yaw: 0, flatten: true, anims: STD },
  boar: {
    url: 'models/boar.glb', height: 0.95, yaw: 0, tint: 0x5c4634,
    anims: { ...STD, eat: ['Idle_Eating', 'Eating'], attack: ['Headbutt', 'Attack'] },
    tusks: true,
  },
  hare: { url: 'models/hare.glb', height: 0.45, yaw: 0, hop: true, anims: {} },
  // ---------- Африка ----------
  // зебра — Quaternius (CC0), с анимациями; остальные — Poly by Google и др. (CC-BY 3.0), без анимаций:
  // gait — процедурная походка (покачивание, кивки), падение набок при гибели
  zebra: { url: 'models/africa/zebra.glb', height: 1.55, yaw: 0, flatten: true, anims: STD },
  gazelle: { url: 'models/deer.glb', height: 1.05, yaw: 0, flatten: true, tint: 0xc39a64, anims: STD },
  giraffe: { url: 'models/africa/giraffe.glb', height: 5.0, legs: 0.36, yaw: -Math.PI / 2, rotX: -Math.PI / 2, gait: true, anims: {} },
  elephant: { url: 'models/africa/elephant.glb', height: 3.2, legs: 0.4, yaw: -Math.PI / 2, tint: 0x77716a, gait: true, anims: {} },
  rhino: { url: 'models/africa/rhino.glb', height: 1.75, legs: 0.38, yaw: 0, tint: 0x6f6a64, gait: true, anims: {} },
  hippo: { url: 'models/africa/hippo.glb', height: 1.5, legs: 0.3, yaw: Math.PI / 2, tint: 0x6a5a60, gait: true, anims: {} },
  lion: { url: 'models/africa/lion.glb', height: 1.2, legs: 0.48, yaw: 0, gait: true, anims: {} },
  hyena: { url: 'models/africa/hyena.glb', height: 0.85, legs: 0.5, yaw: 0, gait: true, anims: {} },
  // Другие охотники в онлайне (Quaternius Adventurer, CC0)
  hunter: {
    url: 'models/hunter.glb', height: 1.8, yaw: 0, person: true,
    anims: { idle: ['Idle_Gun', 'Idle'], walk: ['Walk'], run: ['Run'], aim: ['Idle_Gun_Pointing'], shoot: ['Idle_Gun_Shoot', 'Gun_Shoot'], death: ['Death'], fall: ['HitRecieve_2', 'HitRecieve'] },
    // куда «вкладывать» ружьё: кость и смещение/поворот относительно неё
    rifle: { bone: 'WristR', pos: [0, 0.08, 0.02], rot: [0, 0, -Math.PI / 2] },
  },  // охотница (Quaternius «Animated Woman», CC0) — тот же скелет и анимации, одежда перекрашена в охотничью
  huntress: {
    url: 'models/huntress.glb', height: 1.7, yaw: 0, person: true,
    recolor: { White: 0x3f4a2c, Grey: 0x2a2822, Orange: 0x4a3c26 },
    anims: { idle: ['Idle_Gun', 'Idle'], walk: ['Walk'], run: ['Run'], aim: ['Idle_Gun_Pointing'], shoot: ['Idle_Gun_Shoot', 'Gun_Shoot'], death: ['Death'], fall: ['HitRecieve_2', 'HitRecieve'] },
    rifle: { bone: 'WristR', pos: [0, 0.08, 0.02], rot: [0, 0, -Math.PI / 2] },
  },

};

// Машины. wheels — регулярка по именам мешей колёс; seat — точка глаз водителя (локально, нос машины — +Z);
// seats — глаза всех мест: водитель, пассажир спереди, двое сзади (у пикапа — в кузове)
export const VEHICLES = {
  rover: {
    url: 'models/rover.glb', name: 'Внедорожник', length: 4.7, yaw: 0,
    wheels: /^Tire[1-4]$/, maxSpeed: 26, accel: 8, seat: new THREE.Vector3(0.38, 1.55, 0.15),
    seats: [[0.38, 1.55, 0.15], [-0.38, 1.55, 0.15], [0.38, 1.58, -0.85], [-0.38, 1.58, -0.85]],
  },
  pickup: {
    url: 'models/pickup.glb', name: 'Пикап', length: 5.4, yaw: 0,
    wheels: /Wheel/i, maxSpeed: 29, accel: 7.5, seat: new THREE.Vector3(0.42, 1.6, 0.4),
    seats: [[0.42, 1.6, 0.4], [-0.42, 1.6, 0.4], [0.45, 1.95, -1.5], [-0.45, 1.95, -1.5]],
  },
};
