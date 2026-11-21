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
  // Другие охотники в онлайне (Quaternius Adventurer, CC0)
  hunter: {
    url: 'models/hunter.glb', height: 1.8, yaw: 0,
    anims: { idle: ['Idle_Gun', 'Idle'], walk: ['Walk'], run: ['Run'], aim: ['Idle_Gun_Pointing'], shoot: ['Idle_Gun_Shoot', 'Gun_Shoot'], death: ['Death'] },
    // куда «вкладывать» ружьё: кость и смещение/поворот относительно неё
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
