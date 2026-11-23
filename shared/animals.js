// Симуляция животных. Авторитетная логика: в одиночной игре крутится в браузере,
// в онлайне — внутри Durable Object на сервере. Клиент только отображает.
import { heightAt, slopeAt, isWater, PLAY_LIMIT, HALF } from './terrain.js';
import { mulberry32, raySphere } from './world.js';

// Хитбоксы четвероногого по нескольким размерам (метры, +Z — вперёд).
//  bh — высота центра тела, bl — полудлина тела, br — радиус тела,
//  hy/hz — центр головы, hr — радиус головы
function quad({ bh, bl, br, hy, hz, hr }) {
  return [
    { part: 'head', x: 0, y: hy, z: hz, r: hr, dmg: 999 },
    { part: 'neck', x: 0, y: (hy + bh) / 2 + br * 0.15, z: (hz + bl * 0.8) / 2, r: hr * 0.9, dmg: 120 },
    { part: 'vitals', x: 0, y: bh, z: bl * 0.45, r: br * 0.58, dmg: 150 },
    { part: 'body', x: 0, y: bh, z: bl * 0.4, r: br, dmg: 55 },
    { part: 'body', x: 0, y: bh, z: -bl * 0.5, r: br, dmg: 55 },
    { part: 'body', x: 0, y: bh * 0.92, z: -bl * 0.05, r: br * 1.05, dmg: 55 }, // середина корпуса — без щелей
    { part: 'legs', x: 0, y: bh * 0.42, z: 0, r: bh * 0.38, dmg: 25 },
  ];
}

export const SPECIES = {
  deer: {
    name: 'Олень', hp: 100, walk: 1.5, run: 10.5, turn: 2.6, radius: 0.55,
    hearing: 170, sight: 30, score: 100, herd: [2, 5], count: 16,
    hitboxes: quad({ bh: 0.95, bl: 0.7, br: 0.38, hy: 1.5, hz: 0.75, hr: 0.2 }),
  },
  stag: {
    name: 'Благородный олень', hp: 150, walk: 1.5, run: 10, turn: 2.4, radius: 0.65,
    hearing: 180, sight: 32, score: 220, herd: [1, 1], count: 4,
    hitboxes: quad({ bh: 1.12, bl: 0.8, br: 0.45, hy: 1.75, hz: 0.88, hr: 0.24 }),
  },
  boar: {
    name: 'Кабан', hp: 170, walk: 1.2, run: 7.5, turn: 3, radius: 0.5,
    hearing: 130, sight: 22, score: 150, herd: [2, 4], count: 9,
    aggressive: 'wounded', damage: 22, attackRange: 1.7, attackCd: 1.3,
    hitboxes: quad({ bh: 0.5, bl: 0.5, br: 0.32, hy: 0.5, hz: 0.68, hr: 0.18 }),
  },
  hare: {
    name: 'Заяц', hp: 25, walk: 1.2, run: 12, turn: 5, radius: 0.2,
    hearing: 120, sight: 16, score: 40, herd: [1, 1], count: 9, zigzag: true, hop: true,
    hitboxes: [
      { part: 'head', x: 0, y: 0.32, z: 0.2, r: 0.08, dmg: 999 },
      { part: 'body', x: 0, y: 0.2, z: -0.02, r: 0.16, dmg: 60 },
    ],
  },
  fox: {
    name: 'Лиса', hp: 40, walk: 1.3, run: 9.5, turn: 4, radius: 0.3,
    hearing: 140, sight: 20, score: 70, herd: [1, 1], count: 4,
    hitboxes: quad({ bh: 0.38, bl: 0.35, br: 0.17, hy: 0.48, hz: 0.45, hr: 0.11 }),
  },
  wolf: {
    name: 'Волк', hp: 95, walk: 1.6, run: 10.5, turn: 3.4, radius: 0.45,
    hearing: 200, sight: 50, score: 180, herd: [3, 4], count: 7,
    aggressive: 'predator', damage: 8, attackRange: 1.9, attackCd: 1.5,
    hitboxes: quad({ bh: 0.66, bl: 0.55, br: 0.27, hy: 0.85, hz: 0.72, hr: 0.16 }),
  },
  // ---------- Африка (карта «Саванна») ----------
  zebra: {
    map: 'africa', name: 'Зебра', hp: 130, walk: 1.4, run: 13, turn: 2.6, radius: 0.6,
    hearing: 180, sight: 40, score: 140, herd: [3, 7], count: 18,
    hitboxes: quad({ bh: 1.0, bl: 0.8, br: 0.42, hy: 1.45, hz: 0.95, hr: 0.22 }),
  },
  gazelle: {
    map: 'africa', name: 'Газель', hp: 60, walk: 1.4, run: 15, turn: 4, radius: 0.35,
    hearing: 190, sight: 45, score: 110, herd: [3, 6], count: 16, zigzag: true,
    hitboxes: quad({ bh: 0.66, bl: 0.5, br: 0.26, hy: 1.0, hz: 0.6, hr: 0.13 }),
  },
  giraffe: {
    map: 'africa', name: 'Жираф', hp: 240, walk: 1.3, run: 9, turn: 1.8, radius: 0.9,
    hearing: 200, sight: 70, score: 300, herd: [2, 4], count: 9,
    hitboxes: quad({ bh: 2.1, bl: 1.0, br: 0.62, hy: 4.6, hz: 1.25, hr: 0.3 }),
  },
  elephant: {
    map: 'africa', name: 'Слон', hp: 650, walk: 1.1, run: 6.5, turn: 1.4, radius: 1.7,
    hearing: 170, sight: 30, score: 500, herd: [2, 5], count: 9,
    aggressive: 'wounded', damage: 35, attackRange: 3.4, attackCd: 2,
    hitboxes: quad({ bh: 2.0, bl: 1.6, br: 1.15, hy: 2.6, hz: 2.1, hr: 0.6 }),
  },
  rhino: {
    map: 'africa', name: 'Носорог', hp: 420, walk: 1.2, run: 9, turn: 2, radius: 1.1,
    hearing: 160, sight: 18, score: 420, herd: [1, 2], count: 5,
    aggressive: 'wounded', damage: 30, attackRange: 2.6, attackCd: 1.8,
    hitboxes: quad({ bh: 1.0, bl: 1.4, br: 0.78, hy: 1.1, hz: 1.85, hr: 0.42 }),
  },
  hippo: {
    map: 'africa', name: 'Бегемот', hp: 460, walk: 1.0, run: 7, turn: 1.8, radius: 1.2,
    hearing: 150, sight: 20, score: 380, herd: [2, 4], count: 6,
    aggressive: 'wounded', damage: 30, attackRange: 2.6, attackCd: 1.8,
    hitboxes: quad({ bh: 0.9, bl: 1.3, br: 0.82, hy: 1.0, hz: 1.65, hr: 0.44 }),
  },
  lion: {
    map: 'africa', name: 'Лев', hp: 190, walk: 1.5, run: 13, turn: 3.2, radius: 0.6,
    hearing: 220, sight: 60, score: 400, herd: [1, 3], count: 6,
    aggressive: 'predator', damage: 12, attackRange: 2.2, attackCd: 1.4,
    hitboxes: quad({ bh: 0.85, bl: 0.8, br: 0.4, hy: 1.1, hz: 1.0, hr: 0.26 }),
  },
  hyena: {
    map: 'africa', name: 'Гиена', hp: 110, walk: 1.6, run: 11, turn: 3.4, radius: 0.45,
    hearing: 210, sight: 50, score: 160, herd: [3, 5], count: 7,
    aggressive: 'predator', damage: 7, attackRange: 1.9, attackCd: 1.5,
    hitboxes: quad({ bh: 0.62, bl: 0.55, br: 0.3, hy: 0.8, hz: 0.75, hr: 0.18 }),
  },
};

// звери выбранной карты (лес — без пометки map)
export const speciesFor = (map) => Object.entries(SPECIES).filter(([, sp]) => (sp.map || 'forest') === map);
// на карте зверей теперь больше: численность каждого вида × 1.5
export const COUNT_MUL = 1.5;

const TAU = Math.PI * 2;
const wrapAngle = (a) => ((a + Math.PI) % TAU + TAU) % TAU - Math.PI;

export function isBlocked(x, z) {
  if (Math.abs(x) > PLAY_LIMIT - 4 || Math.abs(z) > PLAY_LIMIT - 4) return true;
  if (isWater(x, z)) return true;
  return slopeAt(x, z) > 0.95;
}

export class AnimalSim {
  constructor(world, seed = 99, map = 'forest') {
    this.world = world;
    this.map = map;
    this.rnd = mulberry32(seed);
    this.animals = [];
    this.nextId = 1;
    this.nextGroup = 1;
    this.events = []; // {type:'kill'|'hit'|'flee'|'attack', ...} — забирает внешний код
    this.respawnT = 0;
  }

  spawn(type, x, z, heading = this.rnd() * TAU, group = 0) {
    const sp = SPECIES[type];
    const a = {
      id: this.nextId++, type, x, z, y: heightAt(x, z), heading, group,
      state: 'idle', anim: 'idle', timer: 1 + this.rnd() * 3, hp: sp.hp,
      speed: 0, tx: x, tz: z, fx: 0, fz: 0, deadTime: 0, avoid: 0, avoidT: 0,
      target: null, attackT: 0, wounded: false, lod: 0,
    };
    this.animals.push(a);
    return a;
  }

  // Стадо/стая вокруг точки
  spawnGroup(type, cx, cz) {
    const sp = SPECIES[type];
    const n = sp.herd[0] + Math.floor(this.rnd() * (sp.herd[1] - sp.herd[0] + 1));
    const g = this.nextGroup++;
    const heading = this.rnd() * TAU;
    let made = 0;
    for (let i = 0; i < n * 4 && made < n; i++) {
      const x = cx + (this.rnd() - 0.5) * 14, z = cz + (this.rnd() - 0.5) * 14;
      if (isBlocked(x, z)) continue;
      this.spawn(type, x, z, heading + (this.rnd() - 0.5), g);
      made++;
    }
    return made;
  }

  // Точка для появления: свободная и далеко от игроков
  findSpawnPoint(players, minDist = 140) {
    for (let i = 0; i < 40; i++) {
      const x = (this.rnd() * 2 - 1) * (PLAY_LIMIT - 30), z = (this.rnd() * 2 - 1) * (PLAY_LIMIT - 30);
      if (isBlocked(x, z)) continue;
      if (players.some((p) => Math.hypot(p.x - x, p.z - z) < minDist)) continue;
      return [x, z];
    }
    return null;
  }

  populate(players = []) {
    for (const [type, sp] of speciesFor(this.map)) {
      let have = 0;
      while (have < Math.round(sp.count * COUNT_MUL)) {
        const pt = this.findSpawnPoint(players, sp.aggressive === 'predator' ? 160 : 60);
        if (!pt) break;
        const n = this.spawnGroup(type, pt[0], pt[1]);
        if (!n) continue;
        have += n;
      }
    }
  }

  remove(a) {
    const i = this.animals.indexOf(a);
    if (i >= 0) this.animals.splice(i, 1);
  }

  // Громкий звук (выстрел, двигатель): все в радиусе слышимости убегают
  noise(x, z, loudness = 1) {
    for (const a of this.animals) {
      if (a.state === 'dead' || a.state === 'chase' || a.state === 'attack') continue;
      const d = Math.hypot(a.x - x, a.z - z);
      if (d < SPECIES[a.type].hearing * loudness) this._flee(a, x, z, 7 + this.rnd() * 6);
    }
  }

  _flee(a, fx, fz, time) {
    if (a.state !== 'flee') this.events.push({ type: 'flee', id: a.id });
    a.state = 'flee'; a.anim = 'run';
    a.fx = fx; a.fz = fz;
    a.timer = Math.max(a.timer, time);
    // паника передаётся стаду
    if (a.group) for (const b of this.animals) {
      if (b.group === a.group && b !== a && b.state !== 'dead' && b.state !== 'flee' && b.state !== 'chase') {
        b.state = 'flee'; b.anim = 'run'; b.fx = fx; b.fz = fz; b.timer = time;
      }
    }
  }

  _chase(a, p) {
    a.state = 'chase'; a.anim = 'run'; a.target = p.id; a.timer = 25;
  }

  _pickWanderTarget(a) {
    // держимся стада: цель смещена к центру группы
    let gx = 0, gz = 0, gn = 0;
    if (a.group) for (const b of this.animals) if (b.group === a.group && b.state !== 'dead') { gx += b.x; gz += b.z; gn++; }
    for (let i = 0; i < 8; i++) {
      const ang = a.heading + (this.rnd() - 0.5) * 2.4;
      const dist = 6 + this.rnd() * 20;
      let tx = a.x + Math.sin(ang) * dist, tz = a.z + Math.cos(ang) * dist;
      if (gn > 1) { tx = tx * 0.6 + (gx / gn) * 0.4; tz = tz * 0.6 + (gz / gn) * 0.4; }
      if (!isBlocked(tx, tz)) { a.tx = tx; a.tz = tz; return true; }
    }
    return false;
  }

  // players: [{id, x, y, z, speed, inVehicle, alive}]
  update(dt, players = []) {
    // ближние к игрокам животные — каждый кадр, дальние — реже
    for (const a of this.animals) {
      let near = Infinity;
      for (const p of players) near = Math.min(near, Math.hypot(p.x - a.x, p.z - a.z));
      a.lod += dt;
      const step = near < 320 ? 0 : near < 450 ? 0.1 : 0.3;
      if (a.lod < step) continue;
      this._updateOne(a, a.lod, players);
      a.lod = 0;
    }
    // восполнение популяции вдали от игроков
    this.respawnT += dt;
    if (this.respawnT > 5) {
      this.respawnT = 0;
      for (const a of [...this.animals]) if (a.state === 'dead' && a.deadTime > 90) this.remove(a);
      for (const [type, sp] of speciesFor(this.map)) {
        const alive = this.animals.filter((a) => a.type === type && a.state !== 'dead').length;
        if (alive <= Math.round(sp.count * COUNT_MUL) - sp.herd[1]) {
          const pt = this.findSpawnPoint(players, 180);
          if (pt) this.spawnGroup(type, pt[0], pt[1]);
        }
      }
    }
  }

  _updateOne(a, dt, players) {
    const sp = SPECIES[a.type];
    if (a.state === 'dead') { a.deadTime += dt; return; }
    a.attackT -= dt;

    // восприятие
    if (a.state !== 'flee' && a.state !== 'chase' && a.state !== 'attack') {
      for (const p of players) {
        if (p.alive === false) continue;
        const d = Math.hypot(p.x - a.x, p.z - a.z);
        if (sp.aggressive === 'predator' && !p.inVehicle && a.hp > sp.hp * 0.4) {
          if (d < sp.sight * (p.speed > 4.5 ? 1 : 0.7)) {
            // вся стая переходит в погоню
            for (const b of this.animals) if (b.group === a.group && b.state !== 'dead') this._chase(b, p);
            break;
          }
          continue;
        }
        const k = p.inVehicle ? (p.speed > 2 ? 1.6 : 0.6) : 1;
        const range = (p.speed > 4.5 ? sp.sight : p.speed > 0.5 ? sp.sight * 0.5 : sp.sight * 0.25) * k;
        if (d < range) { this._flee(a, p.x, p.z, 6 + this.rnd() * 4); break; }
      }
    }

    a.timer -= dt;
    let desired = a.heading, targetSpeed = 0;

    switch (a.state) {
      case 'idle':
      case 'graze':
        if (a.timer <= 0) {
          if (this.rnd() < 0.55 && this._pickWanderTarget(a)) { a.state = 'walk'; a.anim = 'walk'; a.timer = 25; }
          else if (a.state === 'idle') { a.state = 'graze'; a.anim = 'eat'; a.timer = 4 + this.rnd() * 8; }
          else { a.state = 'idle'; a.anim = 'idle'; a.timer = 2 + this.rnd() * 4; }
        }
        break;
      case 'walk': {
        const dx = a.tx - a.x, dz = a.tz - a.z;
        if (dx * dx + dz * dz < 2 || a.timer <= 0) { a.state = 'graze'; a.anim = 'eat'; a.timer = 4 + this.rnd() * 8; break; }
        desired = Math.atan2(dx, dz);
        targetSpeed = sp.walk;
        break;
      }
      case 'flee': {
        if (a.timer <= 0) { a.state = 'walk'; a.anim = 'walk'; this._pickWanderTarget(a); a.timer = 15; break; }
        desired = Math.atan2(a.x - a.fx, a.z - a.fz);
        if (sp.zigzag) desired += Math.sin(a.timer * 5 + a.id) * 0.7;
        targetSpeed = sp.run;
        break;
      }
      case 'chase':
      case 'attack': {
        const p = players.find((q) => q.id === a.target);
        if (!p || p.alive === false || p.inVehicle || a.timer <= 0 || a.hp < sp.hp * 0.4) {
          if (a.hp < sp.hp * 0.4 && p) this._flee(a, p.x, p.z, 20);
          else { a.state = 'walk'; a.anim = 'walk'; this._pickWanderTarget(a); a.timer = 10; }
          a.target = null;
          break;
        }
        const dx = p.x - a.x, dz = p.z - a.z;
        const d = Math.hypot(dx, dz);
        desired = Math.atan2(dx, dz);
        if (d < sp.attackRange) {
          a.state = 'attack'; a.anim = 'attack'; targetSpeed = 0;
          if (a.attackT <= 0) {
            a.attackT = sp.attackCd;
            this.events.push({ type: 'attack', id: a.id, species: a.type, target: p.id, dmg: sp.damage });
          }
        } else {
          a.state = 'chase'; a.anim = 'run';
          // волки окружают: каждый заходит под своим углом
          if (a.type === 'wolf' && d > 6) desired += ((a.id % 3) - 1) * 0.5;
          targetSpeed = d > 4 ? sp.run : sp.walk * 2;
        }
        break;
      }
    }

    // обход препятствий (пересчитывается не каждый кадр)
    if (targetSpeed > 0) {
      a.avoidT -= dt;
      if (a.avoidT <= 0) {
        a.avoidT = 0.25;
        const look = targetSpeed > 3 ? 7 : 3;
        a.avoid = null;
        for (const off of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.4, -2.4, Math.PI]) {
          const h = desired + off;
          if (!isBlocked(a.x + Math.sin(h) * look, a.z + Math.cos(h) * look)) { a.avoid = off; break; }
        }
      }
      if (a.avoid === null) {
        if (a.state === 'walk') { a.state = 'idle'; a.anim = 'idle'; a.timer = 1; targetSpeed = 0; }
      } else desired += a.avoid;
    }

    const diff = wrapAngle(desired - a.heading);
    const maxTurn = sp.turn * (targetSpeed > 3 ? 1.6 : 1) * dt;
    a.heading = wrapAngle(a.heading + Math.max(-maxTurn, Math.min(maxTurn, diff)));
    a.speed += (targetSpeed - a.speed) * Math.min(1, dt * (targetSpeed > a.speed ? 2.5 : 4));
    if (a.speed > 0.01) {
      const nx = a.x + Math.sin(a.heading) * a.speed * dt;
      const nz = a.z + Math.cos(a.heading) * a.speed * dt;
      if (!isWater(nx, nz)) {
        const p = { x: nx, z: nz };
        this.world.collide(p, sp.radius);
        a.x = p.x; a.z = p.z;
      } else {
        a.heading = wrapAngle(a.heading + Math.PI * 0.5);
      }
    }
    a.y = heightAt(a.x, a.z);
  }

  // Выстрел. Возвращает {animal, part, dist, killed, score} или {wallDist}.
  // куда попадёт пуля (без урона): { animal, part, dmg, dist } или { wallDist }
  peek(ox, oy, oz, dx, dy, dz, maxDist) {
    const wall = this.world.raycastStatic(ox, oy, oz, dx, dy, dz, maxDist);
    let best = null;
    for (const a of this.animals) {
      if (a.state === 'dead') continue;
      const ddx = a.x - ox, ddz = a.z - oz;
      if (ddx * ddx + ddz * ddz > (maxDist + 3) ** 2) continue;
      const sp = SPECIES[a.type];
      const c = Math.cos(a.heading), s = Math.sin(a.heading);
      const hits = [];
      let tmin = Infinity;
      for (const hb of sp.hitboxes) {
        const wx = a.x + hb.x * c + hb.z * s;
        const wz = a.z - hb.x * s + hb.z * c;
        const t = raySphere(ox, oy, oz, dx, dy, dz, wx, a.y + hb.y, wz, hb.r * 1.12);
        if (t < wall) { hits.push({ hb, t }); tmin = Math.min(tmin, t); }
      }
      if (!hits.length || (best && tmin >= best.dist)) continue;
      // пуля проходит тело насквозь: самая опасная зона в пределах 0.6 м после входа
      let pick = null;
      for (const h of hits) if (h.t < tmin + 0.6 && (!pick || h.hb.dmg > pick.hb.dmg)) pick = h;
      best = { animal: a, part: pick.hb.part, dmg: pick.hb.dmg, dist: tmin };
    }
    if (best) best.wallDist = wall;
    return best || { wallDist: wall };
  }

  shoot(ox, oy, oz, dx, dy, dz, maxDist, shooterId) {
    const best = this.peek(ox, oy, oz, dx, dy, dz, maxDist);
    if (!best.animal) return best;
    const a = best.animal;
    const sp = SPECIES[a.type];
    a.hp -= best.dmg;
    const killed = a.hp <= 0;
    if (killed) {
      a.state = 'dead'; a.anim = 'death'; a.speed = 0; a.deadTime = 0;
      const score = Math.round(sp.score * (best.part === 'head' ? 1.5 : best.part === 'vitals' ? 1.25 : 1));
      this.events.push({ type: 'kill', id: a.id, species: a.type, part: best.part, by: shooterId, score, dist: best.dist });
      best.score = score;
      // гибель сородича пугает стаю (и волков тоже)
      if (a.group) for (const b of this.animals) {
        if (b.group === a.group && b !== a && b.state !== 'dead' && (sp.aggressive !== 'predator' || this.rnd() < 0.7)) {
          b.state = 'idle'; b.target = null; this._flee(b, ox, oz, 14);
        }
      }
    } else {
      this.events.push({ type: 'hit', id: a.id, part: best.part, by: shooterId });
      if (sp.aggressive === 'wounded' || (sp.aggressive === 'predator' && a.hp > sp.hp * 0.4)) {
        // раненый кабан и волки бросаются на стрелка
        if (a.state !== 'chase' && a.state !== 'attack') this._chase(a, { id: shooterId });
        a.timer = 20;
      } else this._flee(a, ox, oz, 15);
    }
    best.killed = killed;
    return best;
  }
}
