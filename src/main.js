import './style.css';
import * as THREE from 'three';
import { Post } from './world/post.js';
import { Vision } from './world/vision.js';
import { SelfBody } from './entities/hunters.js';
import { HEAT } from './entities/assets.js';
import { Binoculars, Phone } from './ui/gadgets.js';
import { createPuddles, createPuddleMesh } from './world/puddles.js';
import { Environment, Precipitation, seasonFor, seasonVector, SEASONS, WEATHER_NAMES } from './world/environment.js';
import { PRESETS, getPreset, loadSettings, saveSettings, isTouch } from './config/settings.js';
import { VEHICLES } from './config/models.js';
import { initTextures, loadSet, upgradeSetToHD } from './core/textures.js';
import { Input } from './core/input.js';
import { Sound } from './core/audio.js';
import { createTerrain } from './world/terrain.js';
import { createWater } from './world/water.js';
import { createGrass } from './world/grass.js';
import { createRocks } from './world/vegetation.js';
import { createTrees } from './world/trees.js';
import { createBuildings, TOWER_H } from './world/buildings.js';
import { SkySystem } from './world/sky.js';
import { Impacts } from './world/effects.js';
import { Player } from './player/player.js';
import { Rifle } from './player/gun.js';
import { Vehicle, VehicleCamera } from './vehicles/vehicle.js';
import { AnimalViews } from './entities/animals.js';
import { Hud } from './ui/hud.js';
import { World } from '../shared/world.js';
import { AnimalSim, SPECIES, isBlocked, speciesFor } from '../shared/animals.js';
import { SITES, riverDist, riverX, roadDist, ROAD_HALF, WATER_LEVEL } from '../shared/terrain.js';
import { Net, createRoom, leaderboard } from './net/net.js';
import { RemoteHunters } from './entities/hunters.js';
import { Chat } from './ui/chat.js';
import { Voice } from './net/voice.js';
import { ROOM_VEHICLES, SPECIES_IDS, ANIMS, SEND_MS, CODE_LEN, MAX_PLAYERS } from '../shared/protocol.js';

const $ = (s) => document.querySelector(s);
export const fmtScore = (n) => Number(n || 0).toLocaleString('ru-RU', { maximumFractionDigits: 0 });
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const settings = loadSettings();

class Game {
  constructor(net = null, welcome = null) {
    this.net = net;            // null — одиночная игра
    this.welcome = welcome;
    this.netAnimals = new Map();
    this.snap = null;
    this.sendT = 0;
    this.roster = new Map();   // id -> ник
    this.scores = { list: [], best: [] };
    this.sound = new Sound();
    this.score = 0;
    this.kills = 0;
    this.running = false;
    this.paused = false;
    this.clock = new THREE.Clock();
    this.shared = { uTime: { value: 0 }, uSeason: { value: new THREE.Vector4() }, uRain: { value: 0 }, uBiome: { value: 0 } };
    this.vehicles = [];
    this.driving = null;
    this.damageT = 0;
  }

  async init(onProgress0) {
    // ?timing — замер этапов загрузки в консоль
    const T0 = performance.now(); let Tp = T0;
    const onProgress = (k, label) => { if (location.search.includes('timing')) { const n = performance.now(); console.log(`[load] ${label} +${Math.round(n - Tp)} мс (всего ${Math.round(n - T0)})`); Tp = n; } onProgress0(k, label); };
    const preset = (this.preset = getPreset(settings.quality));
    // карта: лес (тайга) или Африка (саванна); в онлайне — карта комнаты
    this.map = this.net ? (this.welcome.map || 'forest') : (settings.map || 'forest');
    this.shared.uBiome.value = this.map === 'africa' ? 1 : 0;
    this.season = this.map === 'africa' ? 'summer' : seasonFor(settings.season);   // в саванне всегда сухое лето
    this.shared.uSeason.value.copy(seasonVector(this.season));
    this.env = new Environment(settings, this.season, this.shared);
    const canvas = $('#game');
    // если видеокарта занята (много вкладок с 3D) — пробуем ещё раз с щадящими настройками
    let renderer;
    try { // с постобработкой сглаживание делается в её буфере — у самого холста оно лишнее
      renderer = new THREE.WebGLRenderer({ canvas, antialias: preset.post ? false : (preset.msaa ?? preset.antialias), powerPreference: 'high-performance' }); }
    catch {
      try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false }); }
      catch { throw new Error('WEBGL'); }
    }
    this.renderer = renderer;
    this.basePixelRatio = Math.min(devicePixelRatio, preset.pixelRatio);
    this.resScale = 1;
    renderer.setPixelRatio(this.basePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = preset.shadows;
    renderer.shadowMap.type = preset.softShadows ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;

    const scene = (this.scene = new THREE.Scene());
    const camera = (this.camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.1, 2000));
    scene.add(camera);

    onProgress(0.05, 'Текстуры…');
    await initTextures(renderer);
    const aniso = Math.min(renderer.capabilities.getMaxAnisotropy(), preset.aniso || (preset.antialias ? 8 : 4));
    const nm = preset.normalMaps;
    const keys = ['grass', 'meadow', 'forest', 'mud', 'rock', 'bark', 'moss', 'barkBroad', 'logs', 'roof', 'planks'];
    if (this.season === 'winter') keys.push('snow');
    if (this.season === 'autumn') keys.push('leaves');
    const loaded = await Promise.all(keys.map((k) => loadSet(k, {
      normal: nm && !['meadow', 'moss'].includes(k),
      hd: false, // 2K подгружаются в фоне после старта (см. upgradeTextures)
      anisotropy: ['grass', 'meadow', 'forest', 'mud', 'rock', 'snow', 'leaves'].includes(k) ? aniso : 2,
    })));
    const sets = Object.fromEntries(keys.map((k, i) => [k, loaded[i]]));
    this._sets = sets;

    onProgress(0.35, 'Генерация леса…');
    await new Promise((r) => setTimeout(r, 0));
    this.world = new World(4242, this.map);
    const terrain = createTerrain(preset, sets, this.shared, createPuddles);
    this.puddles = terrain.puddles;
    this.ground = terrain.ground;
    scene.add(terrain.mesh, terrain.far);
    this.water = createWater(terrain.heightTex, preset);
    if (this.puddles) { this.puddleMesh = createPuddleMesh(this.puddles, terrain.heightTex, preset); scene.add(this.puddleMesh); }
    scene.add(this.water);
    this.grass = createGrass(preset, terrain.heightTex, this.shared);
    scene.add(this.grass);
    this.sky = new SkySystem(scene, preset);
    this.sky.winter = this.season === 'winter';
    terrain.far.material = this.sky.farMaterial(preset.viewDist, sets.rock, this.map === 'africa' ? 1 : 0);
    onProgress(0.5, 'Деревья…');
    this.trees = await createTrees(this.world, preset, sets.bark, sets.barkBroad, this.shared, renderer);
    scene.add(this.trees);
    this.rocks = createRocks(this.world, preset, sets.rock, this.season === 'winter' ? sets.snow : sets.moss); // зимой сверху снег вместо мха
    scene.add(this.rocks);
    onProgress(0.6, 'Избушки…');
    this.buildings = createBuildings(this.world, preset, sets);
    scene.add(this.buildings);
    this.towers = this.buildings.towers;
    this.buildings.setSeason(this.season, sets.snow);
    this.impacts = new Impacts(scene);
    this.precip = new Precipitation(scene, preset, terrain.heightTex);
    // тёплый свет лампы в доме, где сейчас игрок (один источник на всю карту)
    this.houseLight = new THREE.PointLight(0xffb060, 0, 10, 1.4);
    scene.add(this.houseLight);

    onProgress(0.7, 'Животные и машины…');
    this.input = new Input(canvas, isTouch ? $('#touch') : null, settings);
    // мышь отпущена: пауза — кроме случая, когда игрок пишет в чат
    this.input.onLockChange = (locked) => { if (!locked && this.running && !isTouch && !this.chat?.isOpen) this.pause(true); };
    addEventListener('keydown', (e) => { if (e.code === 'Escape' && this.input.dragLook && this.running) this.pause(!this.paused); });
    this.player = new Player(camera, this.ground, this.world, this.sound);
    // шаги по лужам: та же карта, что рисует лужи
    if (this.puddles) this.player.puddleAt = (x, z) => this.puddles.wetAt(x, z);
    // своё тело (вид от третьего лица) и падения в грязь
    this.body = new SelfBody(scene, preset, settings.gender);
    this.tp = false;
    this.mudFlash = 0;
    this.player.onFall = (kind) => {
      this.sound.crash(kind === 'slip' ? 4 : 6);
      if (kind === 'slip') this.sound.splashStep();
      this.mudFlash = kind === 'slip' ? 1 : 0.6;
      this.hud.message(kind === 'slip' ? 'Вы поскользнулись и упали в грязь!' : 'Неудачное приземление — вы упали', 'warn');
    };
    this.gun = new Rifle(camera, this.sound);
    this.vcam = new VehicleCamera(camera);
    this.views = new AnimalViews(scene, this.ground, preset);
    this.views.smooth = !!this.net;
    await this.views.preload(speciesFor(this.map).map(([k]) => k));   // модели только зверей этой карты
    if (this.net) {
      // онлайн: животными управляет сервер
      this.sim = null;
      this.hunters = new RemoteHunters(scene, this.ground, preset);
      for (const p of this.welcome.players) { this.roster.set(p.id, p.nick); if (p.id !== this.net.id) this.hunters.add(p.id, p.nick, p.g); }
      this._bindNet();
    } else {
      this.sim = new AnimalSim(this.world, (Math.random() * 1e9) | 0, this.map);
      // стадо впереди — чтобы сразу было на кого охотиться
      this.sim.spawnGroup(this.map === 'africa' ? 'zebra' : 'deer', 0, -70);
      this.sim.populate([{ x: 0, z: 0 }]);
    }

    // машины у базы (в онлайне — общие для комнаты)
    const list = ROOM_VEHICLES;
    for (const rv of list) {
      const v = await Vehicle.create(rv.key, this.world, this.ground, rv.x, rv.z, rv.heading);
      v.netId = rv.id;
      v.dirt = 0.12 + ((rv.id * 37) % 10) / 40;   // машины у хуторов уже немного в грязи
      const wv = this.net ? this.welcome.vehicles.find((q) => q.id === rv.id) : null;
      v.remoteDriver = wv?.driver || 0;
      v.seats = wv?.seats ? [...wv.seats] : [0, 0, 0, 0];
      v.onCrash = (k) => { if (k > 3) this.sound.crash(k); };
      v.onLand = (k) => this.sound.crash(k * 0.3);
      this.vehicles.push(v);
      scene.add(v.root);
    }

    this.hud = new Hud();
    this.binoc = new Binoculars();
    this.phone = new Phone();
    // инвентарь: в руках одно (ружьё/бинокль/телефон), фонарик — вкл/выкл, аптечка — расходник
    this.slot = 'rifle';
    this.medkits = 3;
    this.flashlight = new THREE.SpotLight(0xfff0d8, 0, 60, 0.42, 0.55, 1.2);
    this.flashlight.position.set(0.1, -0.1, -1.6); // впереди ствола — не пересвечивает ружьё
    this.flashlight.target.position.set(0, -0.6, -10);
    camera.add(this.flashlight, this.flashlight.target);
    this.lightOn = false;
    for (const el of document.querySelectorAll('#hotbar .slot[data-slot]')) {
      const fn = (e) => { e.preventDefault(); e.stopPropagation(); this.input._edges.add('pick:' + el.dataset.slot); };
      el.addEventListener('click', fn);
      el.addEventListener('touchstart', fn, { passive: false });
    }
    addEventListener('resize', () => this.resize());
    this.resize();

    // прогрев шейдеров, чтобы не было фризов при первом кадре
    this.player.update(0, this.input, 0);
    this.trees.update(camera.position, true);
    this.rocks.update(camera.position, true);
    if (preset.post) { this.post = new Post(renderer, scene, camera, !!preset.postLite); renderer.info.autoReset = false; }
    // тени: на телефоне пересчитываются через кадр
    this.vision = new Vision(renderer, this.post);
    renderer.shadowMap.autoUpdate = false;
    this.mirrorEvery = preset.mirrorEvery || 1;
    this._frameN = 0;
    this._fpsAcc = 0; this._fpsN = 0; this._resT = 0;
    this.resize();
    onProgress(0.95, 'Шейдеры…');
    renderer.compile(scene, camera);
    onProgress(1, 'Готово');
  }

  resize() {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth, innerHeight);
    this.post?.setSize(innerWidth, innerHeight);
  }

  // 2K-текстуры: качаем в фоне по одному набору (сначала земля), подменяем на лету
  async upgradeTextures() {
    const p = this.preset.hdTextures;
    if (!p || !this._sets) return;
    const ground = ['grass', 'meadow', 'forest', 'mud', 'rock', 'snow', 'leaves'];
    const order = Object.keys(this._sets).sort((a, b) => ground.includes(b) - ground.includes(a));
    for (const k of order) {
      if (p === 'ground' && !ground.includes(k)) continue;
      await upgradeSetToHD(k, this._sets[k]);
    }
  }

  start() {
    this.running = true;
    setTimeout(() => this.upgradeTextures(), 1500);
    this.hud.show(true);
    if (this.net) {
      $('#room-tag').classList.remove('hidden');
      $('#btn-board').classList.remove('hidden');
      this.renderBoard();
      this._startComms();
    }
    addEventListener('keydown', (e) => { if (e.code === 'Tab' && this.net) { e.preventDefault(); $('#board').classList.toggle('hidden'); } });
    $('#touch').classList.toggle('hidden', !isTouch);
    this.clock.start();
    this.renderer.setAnimationLoop(() => this.frame());
    this.input.enabled = true;
    this.input.requestLock();
  }

  // ---------- чат и голос (только в онлайне) ----------
  _startComms() {
    const net = this.net;
    this.chat = new Chat((text) => net.send({ t: 'chat', text }));
    this.chat.show(true);
    this.chat.add('', 'Enter или T — написать в чат · G (держать) или 🎤 — голос', 'sys');
    this.voice = new Voice(net, this.sound);
    this.voice.onChange = () => this._voiceUi();
    this.voice.callAll(this.welcome.players.map((p) => p.id));
    this.micOf = new Set();
    for (const b of ['#btn-chat', '#btn-mic']) $(b).classList.remove('hidden');
    const tap = (sel, fn) => {
      $(sel).addEventListener('click', fn);
      $(sel).addEventListener('touchstart', (e) => { e.preventDefault(); fn(); }, { passive: false });
    };
    tap('#btn-chat', () => { this.sound.unlock(); this.chat.open(); });
    tap('#btn-mic', async () => {
      this.sound.unlock();
      const ok = await this.voice.toggleMic();
      if (!ok) this.chat.add('', 'Нет доступа к микрофону — разрешите его в настройках браузера', 'sys');
    });
    addEventListener('keydown', (e) => {
      if (!this.running || this.paused || e.repeat || this.chat.isOpen) return;
      if (e.target?.tagName === 'INPUT') return;
      if (e.code === 'Enter' || e.code === 'KeyT') { e.preventDefault(); this.input.keys.clear(); this.chat.open(); }
      if (e.code === 'KeyG') this.voice.setPtt(true);
    });
    addEventListener('keyup', (e) => { if (e.code === 'KeyG') this.voice.setPtt(false); });
    addEventListener('blur', () => this.voice.setPtt(false));
    this._voiceUi();
  }

  _voiceUi() {
    const v = this.voice;
    if (!v) return;
    const btn = $('#btn-mic');
    btn.classList.toggle('on', v.micOn);
    btn.classList.toggle('denied', v.denied);
    btn.title = v.micOn ? 'Микрофон включён (нажмите, чтобы выключить)' : 'Включить микрофон · G — говорить, пока держите';
    const names = v.speaking().map((id) => this.roster.get(id)).filter(Boolean);
    const parts = [];
    if (v.talking) parts.push('<span class="me">🎙 Вы в эфире</span>');
    for (const n of names) parts.push(`<span>🔊 ${esc(n)}</span>`);
    $('#voice-ind').innerHTML = parts.join('');
  }

  pause(v) {
    this.paused = v;
    $('#pause').classList.toggle('hidden', !v);
    if (!v) this.input.requestLock(true); // «Продолжить» — это клик, захват мыши разрешён
  }

  shoot() {
    if (!this.gun.fire()) return;
    const cam = this.camera;
    const dir = new THREE.Vector3();
    cam.getWorldDirection(dir);
    // разброс: от бедра большой, в оптику — почти нулевой
    // в оптике точность набирается быстро: уже на середине подъёма прицела разброс почти нулевой
    const aimK = THREE.MathUtils.smoothstep(this.gun.aimT, 0.15, 0.6);
    const spread = THREE.MathUtils.lerp(0.035 + Math.min(this.player.speed, 7) * 0.006, this.gun.weapon === 'sniper' ? 0.0004 : 0.0012, aimK);
    dir.x += (Math.random() - 0.5) * spread * 2;
    dir.y += (Math.random() - 0.5) * spread * 2;
    dir.z += (Math.random() - 0.5) * spread * 2;
    dir.normalize();
    const o = cam.position;
    this.player.addRecoil((0.03 + 0.03 * (1 - this.gun.aimT)) * (this.gun.weapon === 'sniper' ? 1.5 : 1));
    if (this.net) {
      // онлайн: попадание считает сервер (с поправкой на задержку)
      this._lastShot = { o: o.clone(), dir: dir.clone() };
      this.net.send({ t: 'shot', o: [o.x, o.y, o.z], d: [dir.x, dir.y, dir.z], lag: Math.round(this.net.rtt / 2 + 90) });
      return;
    }
    const res = this.sim.shoot(o.x, o.y, o.z, dir.x, dir.y, dir.z, 450, 'me');
    this.sim.noise(o.x, o.z, 1);
    this.showShotResult(res, o, dir);
  }

  showShotResult(res, o, dir) {
    if (res && res.animal) {
      const hp = o.clone().addScaledVector(dir, res.dist);
      this.impacts.spawn(hp, 0x7a1010, 10);
      this.sound.hit();
      this.hud.hitMarker(res.killed);
      const sp = SPECIES[res.animal.type];
      if (res.killed) {
        if (!this.net) { this.kills++; this.score += res.score; } // в онлайне счёт присылает сервер
        const part = { head: ' · в голову!', vitals: ' · в сердце', neck: ' · в шею' }[res.part] || '';
        this.hud.message(`${sp.name}: добыча! <b>+${res.score}</b>${part} · ${Math.round(res.dist)} м`, 'good');
      } else if (sp.aggressive) {
        this.hud.message(`${sp.name} ранен и бросается на вас!`, 'warn');
      } else {
        this.hud.message('Ранен — зверь убегает', 'warn');
      }
    } else if (res && res.wallDist < 450) {
      this.impacts.spawn(o.clone().addScaledVector(dir, res.wallDist - 0.05), 0x6b5a40, 12);
    }
  }

  // видна ли река в кадре (проверяем точки русла вокруг камеры)
  riverInView(cp) {
    this._frustum ||= new THREE.Frustum(); this._pm ||= new THREE.Matrix4();
    this.camera.updateMatrixWorld(); this._frustum.setFromProjectionMatrix(this._pm.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));
    const sp = this._rsph ||= new THREE.Sphere(new THREE.Vector3(), 14);
    for (let dz = -this.preset.viewDist; dz <= this.preset.viewDist; dz += 18) {
      const z = cp.z + dz;
      sp.center.set(riverX(z), 0, z);
      if (this._frustum.intersectsSphere(sp)) return true;
    }
    return false;
  }

  // ---------- авто-разрешение: держим плавность, снижая/повышая чёткость картинки ----------
  // Чёткость картинки НЕ снижается никогда (иначе «пиксели»). Если кадров мало —
  // по шагам экономим там, где глазу почти не видно, и возвращаем, когда снова тянет:
  //  1 — отражения в воде обновляются через кадр; 2 — дальняя трава реже на 25%;
  //  3 — тени через 2–3 кадра; 4 — средняя трава реже, отражения раз в 3 кадра; 5 — трава у ног реже
  adaptResolution(dt) {
    this._fpsAcc += dt; this._fpsN++;
    this._resT += dt;
    if (this._resT < 1.5) return;
    const fps = this._fpsN / this._fpsAcc;
    this._fpsAcc = 0; this._fpsN = 0; this._resT = 0;
    const target = isTouch ? 40 : 55;
    let lvl = this.qLevel || 0;
    // если прошлый шаг не дал прироста (лимит 30 FPS в энергосбережении) — откатываем его
    if (this._lastStep && fps < this._lastStep.fps * 1.04) { lvl = this._lastStep.lvl; this._lastStep = null; this._lockT = performance.now() + 30000; }
    else {
      this._lastStep = null;
      if (fps < target - 3 && lvl < 5 && performance.now() > (this._lockT || 0)) { this._lastStep = { fps, lvl }; lvl++; }
      else if (fps > target + 10 && lvl > 0) lvl--;
    }
    if (lvl !== this.qLevel) { this.qLevel = lvl; this.applyQuality(lvl); }
  }

  applyQuality(lvl) {
    this.mirrorEvery = lvl >= 4 ? 3 : lvl >= 1 ? 2 : 1;
    this.preset.shadowEvery = Math.max(this.baseShadowEvery ||= this.preset.shadowEvery || 1, lvl >= 3 ? 3 : lvl >= 1 ? 2 : 1);
    const L = this.grass.lod;
    const k = (layer, f) => layer?.setFraction(f);
    k(L.far, lvl >= 2 ? 0.75 : 1);
    k(L.mid, lvl >= 4 ? 0.8 : 1);
    k(L.flowers, lvl >= 4 ? 0.7 : 1);
    k(L.near, lvl >= 5 ? 0.75 : 1);
  }

  // вид от третьего лица: камера за плечом (в оптику/бинокль/тепловизор — снова из глаз)
  thirdPerson(dt) {
    const on = this.tp && !this.driving && this.gun.aimT < 0.3 && this.binoc.t < 0.2 && this.slot !== 'thermal' && this.slot !== 'phone';
    this.body.update(dt, this.player, on, this.input.aim);
    if (!on) { this._tpK = 0; return; }
    const cam = this.camera;
    const dir = cam.getWorldDirection(this._tpDir ||= new THREE.Vector3());
    const right = (this._tpR ||= new THREE.Vector3()).set(-dir.z, 0, dir.x).normalize();
    const back = 3.2 * (this._tpK = Math.min(1, (this._tpK || 0) + dt * 4));
    // от третьего лица камера не «падает» вместе с охотником — смотрим, как он падает
    cam.rotation.set(this.player.pitch, this.player.yaw, 0, 'YXZ');
    cam.position.copy(this.player.pos).add({ x: 0, y: 1.68, z: 0 }).addScaledVector(dir, -back).addScaledVector(right, 0.55).add({ x: 0, y: 0.25, z: 0 });
    const gy = this.ground.sample(cam.position.x, cam.position.z) + 0.4;
    if (cam.position.y < gy) cam.position.y = gy;
    this.gun.root.visible = false;
  }

  // ---------- грязь: машины пачкаются на бездорожье и в лужах, отмываются в реке и под дождём ----------
  updateDirt(dt) {
    const w = this.env.wet, rain = this.env.weather.rain;
    for (const v of this.vehicles) {
      const sp = Math.abs(v.speed);
      const inWater = this.ground.sample(v.pos.x, v.pos.z) < WATER_LEVEL - 0.3;
      let d = v.dirt;
      if (inWater) d -= dt * (sp > 1 ? 0.35 : 0.12);
      else if (sp > 1.5) {
        const offroad = roadDist(v.pos.x, v.pos.z) > ROAD_HALF + 1;
        d += dt * (offroad ? 0.006 : 0.0015) * (sp / 8) * (1 + 2.5 * w + this.shared.uSeason.value.x);
        if (this.puddles?.wetAt(v.pos.x, v.pos.z)) d += dt * 0.09 * Math.min(2, sp / 6);
      }
      d -= dt * 0.004 * rain;
      v.dirt = Math.max(0, Math.min(1, d));
      v.dirtU.value = v.dirt;
    }
    // охотник: дождь понемногу отмывает; брызги на экране после падения гаснут
    this.player.dirt = Math.max(0, this.player.dirt - dt * 0.004 * rain);
    this.mudFlash = Math.max(0, this.mudFlash - dt * 0.22);
    const op = this.tp ? 0 : Math.min(1, this.mudFlash * 1.2);
    if (Math.abs(op - (this._mudOp ?? -1)) > 0.01) { this._mudOp = op; $('#mud-screen').style.opacity = op.toFixed(2); }
  }

  // ---------- инвентарь ----------
  // ночное видение в прицеле: по умолчанию само включается в темноте, N — переключить вручную
  nightVision() { return this.nvOn ?? (this.sky.night > 0.2 || this.sky.light < 0.35); }

  updateVision(dt) {
    const thermal = this.slot === 'thermal' && !this.driving;
    const nv = !thermal && this.slot === 'sniper' && this.gun.aimT > 0.85 && this.nightVision();
    const mode = thermal ? 1 : nv ? 2 : 0;
    if (mode !== this.vision.mode) this.vision.set(mode);
    this.vision.uniforms.uGain.value = 1.2 + 6 * this.sky.night + 2 * Math.max(0, 0.6 - this.sky.light);
    if (mode) this.vision.tick(dt);
    HEAT.value = thermal ? 1 : 0;
    // тепловизор-монокуляр с небольшим приближением ×1.7
    this.player.fovMul += ((thermal ? 0.6 : 1) - (this.player.fovMul || 1)) * Math.min(1, dt * 8);
    // тепловизор видит сквозь туман и темноту дальше
    const fog = this.scene.fog;
    if (thermal) { this._fogBase ??= [fog.near, fog.far]; fog.near = this._fogBase[0] * 3; fog.far = this._fogBase[1] * 3; }
    else if (this._fogBase) { [fog.near, fog.far] = this._fogBase; this._fogBase = null; }
    $('#thermal-ui').classList.toggle('on', thermal);
    if (thermal) this.gun.root.visible = false;
    const sc = $('#scope');
    sc.classList.toggle('sniper', this.slot === 'sniper');
    sc.classList.toggle('nv', nv);
    if (this.slot === 'sniper') {
      const txt = `×${this.sniperZoom || 8} · ${nv ? 'НОЧНОЕ ВИДЕНИЕ' : 'дневной'} · N — ночное, колесо/± — кратность`;
      if (txt !== this._scopeTxt) { $('#scope-info').textContent = txt; this._scopeTxt = txt; }
    }
  }

  get armed() { return this.slot === 'rifle' || this.slot === 'sniper'; }

  select(slot) {
    if (slot === this.slot && slot !== 'rifle') slot = 'rifle';   // повторный выбор — убрать в карман
    this.slot = slot;
    if (slot === 'rifle' || slot === 'sniper') this.gun.setWeapon(slot);
    this.binoc.toggle(slot === 'binoc');
    this.phone.toggle(slot === 'phone');
    if (!this.armed) { this.input.aim = false; this.input.syncAimButton?.(); }
  }

  handleInventory(input) {
    const order = ['rifle', 'sniper', 'binoc', 'phone', 'thermal'];
    const keys = { slot1: 'rifle', slot2: 'sniper', slot3: 'binoc', slot4: 'phone', slot5: 'thermal', slot6: 'light', slot7: 'med', binoc: 'binoc', phone: 'phone', light: 'light' };
    const picks = [];
    for (const [edge, slot] of Object.entries(keys)) if (input.consume(edge)) picks.push(slot);
    for (const slot of ['rifle', 'sniper', 'binoc', 'phone', 'thermal', 'light', 'med']) if (input.consume('pick:' + slot)) picks.push(slot);
    // снайперская в оптике: колесо и +/− меняют кратность, N — ночное видение
    const sniperAim = this.slot === 'sniper' && this.gun.aimT > 0.5;
    let zoomStep = (input.consume('zin') ? 1 : 0) - (input.consume('zout') ? 1 : 0);
    if (sniperAim) zoomStep += (input.consume('slotPrev') ? 1 : 0) - (input.consume('slotNext') ? 1 : 0);
    if (zoomStep) this.sniperZoom = Math.max(4, Math.min(16, Math.round((this.sniperZoom || 8) * Math.pow(1.25, zoomStep) * 2) / 2));
    if (input.consume('nv')) { this.nvOn = !this.nightVision(); this.hud.message(`Ночное видение: ${this.nvOn ? 'вкл' : 'выкл'}`); }
    if (input.consume('slotNext')) picks.push(order[(order.indexOf(this.slot) + 1) % order.length]);
    if (input.consume('slotPrev')) picks.push(order[(order.indexOf(this.slot) + order.length - 1) % order.length]);
    for (const slot of picks) {
      if (slot === 'light') { this.lightOn = !this.lightOn; this.flashlight.intensity = this.lightOn ? 60 : 0; this.sound.click?.(0, 2600, 0.35); continue; }
      if (slot === 'med') {
        if (this.medkits <= 0) this.hud.message('Аптечки закончились', 'warn');
        else if (this.player.health >= 100) this.hud.message('Вы здоровы');
        else { this.medkits--; this.player.health = Math.min(100, this.player.health + 50); this.hud.message(`Аптечка: +50 здоровья (осталось ${this.medkits})`); }
        continue;
      }
      if (this.driving) continue;
      if (slot === 'rifle' && this.slot === 'rifle') continue;
      this.select(slot);
    }
    document.body.classList.toggle('sniper-aim', this.slot === 'sniper' && this.gun.aimT > 0.5);
    if (this.slot === 'phone' && !this.phone.on) this.select('rifle'); // закрыли крестиком
    // интерфейс
    const hb = this._hb || (this._hb = { slots: [...document.querySelectorAll('#hotbar .slot[data-slot]')] });
    const key = `${this.slot}|${this.lightOn}|${this.medkits}|${this.gun.weapon}${this.gun.ammo}/${this.gun.reserve}|${this.kills}`;
    if (key !== hb.key) {
      hb.key = key;
      for (const el of hb.slots) el.classList.toggle('active', el.dataset.slot === this.slot);
      document.querySelector('#hotbar [data-slot=light]').classList.toggle('lit', this.lightOn);
      document.querySelector('#hotbar [data-slot=med]').classList.toggle('empty', this.medkits <= 0);
      $('#inv-light').textContent = this.lightOn ? 'вкл' : 'выкл';
      $('#inv-med').textContent = '×' + this.medkits;
      const st = this.gun.stock, w = this.gun.weapon;
      const ra = w === 'rifle' ? [this.gun.ammo, this.gun.reserve] : [st.rifle.ammo, st.rifle.reserve];
      $('#inv-ammo').textContent = `${ra[0]}/${ra[1]}`;
      $('#inv-trophy').textContent = this.kills;
    }
  }

  // ---------- дома ----------
  houseAt(x, z) {
    for (const b of this.world.buildings) {
      const rx = x - b.x, rz = z - b.z;
      const c = Math.cos(b.rot), s = Math.sin(b.rot);
      const lx = rx * c - rz * s, lz = rx * s + rz * c;
      const L = b.layout;
      if (Math.abs(lx) < L.w / 2 && Math.abs(lz) < L.d / 2 + 0.2) return b;
    }
    return null;
  }

  updateHouseLight(dt) {
    const p = this.camera.position;
    const b = !this.driving && this.houseAt(p.x, p.z);
    const L = this.houseLight;
    if (b && b !== this._house) {
      const c = Math.cos(b.rot), s = Math.sin(b.rot);
      const lx = 0.2, lz = 0.1, ly = b.h + b.layout.H - 0.6;
      L.position.set(b.x + lx * c + lz * s, ly, b.z - lx * s + lz * c);
    }
    if (b) this._house = b;
    const target = b ? (b.layout.isShed ? 3 : 9) : 0;
    L.intensity += (target - L.intensity) * Math.min(1, dt * 4);
  }

  // ---------- бинокль и телефон ----------
  animalList() { return this.sim ? this.sim.animals : [...this.netAnimals.values()]; }

  rangefinder() {
    const o = this.camera.position;
    const dir = this.camera.getWorldDirection(this._rfDir || (this._rfDir = new THREE.Vector3()));
    let dist = this.world.raycastStatic(o.x, o.y, o.z, dir.x, dir.y, dir.z, 900);
    let label = '';
    for (const a of this.animalList()) {
      const ay = (a.y ?? this.ground.sample(a.x, a.z)) + 0.8;
      const dx = a.x - o.x, dy = ay - o.y, dz = a.z - o.z;
      const t = dx * dir.x + dy * dir.y + dz * dir.z;
      if (t <= 0 || t > dist) continue;
      const off = Math.hypot(dx - dir.x * t, dy - dir.y * t, dz - dir.z * t);
      if (off < 1.2 + t * 0.004) { dist = t; label = (SPECIES[a.type]?.name || '') + (a.state === 'dead' ? ' (добыт)' : ''); }
    }
    return { dist, label };
  }

  phoneState() {
    const p = this.player.pos;
    return {
      x: p.x, z: p.z, yaw: this.driving ? this.driving.heading + Math.PI : this.player.yaw,
      hunters: this.hunters ? [...this.hunters.list.values()].filter((h) => h.target).map((h) => ({ x: h.x, z: h.z, nick: h.nick })) : [],
      vehicles: this.vehicles.filter((v) => v !== this.driving).map((v) => ({ x: v.pos.x, z: v.pos.z })),
      towers: this.towers,
      animals: this.animalList().map((a) => ({ x: a.x, z: a.z, type: a.type, dead: a.state === 'dead' })),
      kills: this.kills, score: this.score,
    };
  }

  // ---------- машины и вышки ----------
  nearestVehicle() {
    let best = null, bd = 4.2;
    for (const v of this.vehicles) {
      const d = Math.hypot(v.pos.x - this.player.pos.x, v.pos.z - this.player.pos.z);
      if (d < bd) { bd = d; best = v; }
    }
    return best;
  }
  nearestTower() {
    for (const t of this.towers) {
      const d = Math.hypot(t.x - this.player.pos.x, t.z - this.player.pos.z);
      if (this.player.platform === t.platform && this.player.platform) return t;
      if (d < 2.8) return t;
    }
    return null;
  }

  requestVehicle(v) {
    if (!this.net) { this.enterVehicle(v, 0); return; }
    // сервер сам выберет место: за руль, если свободно, иначе пассажиром
    if (v.seats && v.seats.every(Boolean)) { this.hud.message('В машине нет мест'); return; }
    this.net.send({ t: 'enter', id: v.netId });
  }

  // seat: 0 — водитель, 1–3 — пассажиры
  enterVehicle(v, seat = 0) {
    this.driving = v;
    this.seat = seat;
    if (seat === 0) v.driver = 'me';
    this.gun.root.visible = false;
    this.input.aim = false;
    this.vcam.reset(v);
    this.vcam.firstPerson = true;   // сразу вид из салона (V — камера снаружи)
    this.vcam.yawOff = 0;
    this.vcam.pitchOff = seat === 0 ? 0.12 : 0;
    if (seat === 0) this.sound.engineStart();
    document.body.classList.toggle('driving', seat === 0);
    document.body.classList.toggle('passenger', seat > 0);
    this.hud.message(seat === 0
      ? `${v.cfg.name}: W/S — газ/тормоз, A/D — руль, Space — ручник, V — камера, F — выйти`
      : `Вы пассажир (${seat === 1 ? 'спереди' : v.cfg.name === 'Пикап' ? 'в кузове' : 'сзади'}). Можно стрелять. V — камера, F — выйти`);
  }
  exitVehicle() {
    const v = this.driving;
    const passenger = this.seat > 0;
    if (Math.abs(v.speed) > (passenger ? 8 : 4)) { this.hud.message(passenger ? 'Машина едет слишком быстро' : 'Сначала остановитесь'); return; }
    const p = v.exitPoint();
    this.player.pos.set(p.x, this.ground.sample(p.x, p.z), p.z);
    this.player.vel.set(0, 0, 0);
    this.player.yaw = v.heading + Math.PI;
    this.player.pitch = 0;
    if (!passenger) { v.driver = null; v.speed = 0; }
    this.driving = null;
    this.seat = 0;
    if (v.cockpit) v.cockpit.visible = false;
    if (this.net) { this.net.send({ t: 'exit', id: v.netId }); if (!passenger) v.remoteDriver = 0; }
    if (!passenger) this.sound.engineStop();
    document.body.classList.remove('driving', 'passenger');
    this.camera.fov = this.player.baseFov;
    this.camera.updateProjectionMatrix();
  }

  useAction() {
    if (this.driving) { this.exitVehicle(); return; }
    if (this.player.platform) {
      // спуск с вышки
      const t = this.towers.find((q) => q.platform === this.player.platform);
      this.player.platform = null;
      const ox = Math.sin(t.rot) * 2.4, oz = Math.cos(t.rot) * 2.4;
      this.player.pos.set(t.x + ox, this.ground.sample(t.x + ox, t.z + oz), t.z + oz);
      return;
    }
    const v = this.nearestVehicle();
    if (v) { this.requestVehicle(v); return; }
    const t = this.nearestTower();
    if (t) {
      t.platform ||= { x: t.x, z: t.z, y: t.y - 0.1 + TOWER_H + 0.06, r: 0.85 };
      this.player.platform = t.platform;
      this.player.pos.set(t.x, t.platform.y, t.z);
      this.player.vel.set(0, 0, 0);
      this.hud.message('Вы на вышке. F — спуститься');
    }
  }

  // ---------- онлайн ----------
  _bindNet() {
    const net = this.net;
    net.on('snap', (m) => { this.snap = m; })
      .on('join', (m) => { this.roster.set(m.id, m.nick); this.hunters.add(m.id, m.nick, m.g); this.hud?.message(`${esc(m.nick)} присоединился к охоте`); this.chat?.add('', `${m.nick} присоединился`, 'sys'); })
      .on('leave', (m) => { const n = this.roster.get(m.id) || 'Охотник'; this.hud?.message(`${esc(n)} ушёл`); this.chat?.add('', `${n} ушёл`, 'sys'); this.roster.delete(m.id); this.hunters.remove(m.id); this.voice?.remove(m.id); })
      .on('chat', (m) => { this.chat?.add(m.nick, m.text, m.id === net.id ? 'me' : ''); if (m.id !== net.id) this.sound.chatPing?.(); })
      .on('rtc', (m) => this.voice?.signal(m.from, m.data))
      .on('mic', () => this._voiceUi())
      .on('scores', (m) => { this.scores = m; const me = m.list.find((q) => q.id === net.id); if (me) { this.score = me.score; this.kills = me.kills; } this.renderBoard(); })
      .on('dmg', (m) => this.damage(m.dmg, m.species))
      .on('hit', (m) => {
        const s = this._lastShot;
        if (!s) return;
        const res = m.aid ? { animal: { type: m.species }, part: m.part, dist: m.dist, killed: m.killed, score: m.score } : { wallDist: m.wall < 0 ? Infinity : m.wall };
        this.showShotResult(res, s.o, s.dir, true);
      })
      .on('kill', (m) => { if (m.by !== net.id) this.hud.message(`${m.nick}: ${SPECIES[m.species].name.toLowerCase()} — добыча! +${m.score}`); })
      .on('shot', (m) => {
        // чужой выстрел: звук с учётом расстояния + анимация стрелка
        const d = Math.hypot(m.o[0] - this.camera.position.x, m.o[2] - this.camera.position.z);
        this.sound.shot(d);
        this.hunters.shotFrom(m.id);
      })
      .on('enter', (m) => {
        const v = this.vehicles.find((q) => q.netId === m.id);
        if (!v) return;
        const seat = m.seat || 0;
        (v.seats ||= [0, 0, 0, 0])[seat] = m.by;
        if (seat === 0) v.remoteDriver = m.by;
        if (m.by === net.id) this.enterVehicle(v, seat);
      })
      .on('exit', (m) => {
        const v = this.vehicles.find((q) => q.netId === m.id);
        if (!v) return;
        if (v.seats && m.seat >= 0) v.seats[m.seat] = 0;
        if (m.by !== net.id && m.seat === 0) v.remoteDriver = 0;
      })
      .on('deny', () => this.hud.message('В машине нет мест'))
      .on('close', (reason) => {
        this.hud.message(`Связь потеряна: ${reason}. Переподключаемся…`, 'warn');
        $('#room-tag').textContent = 'нет связи — переподключение…';
        this._reconnect(0);
      });
  }

  // Автопереподключение к той же комнате (сервер перезапустился, пропал Wi-Fi и т. п.)
  async _reconnect(attempt) {
    if (attempt > 15) { this.hud.message('Не удалось переподключиться. Вернитесь в меню.', 'warn'); return; }
    await new Promise((r) => setTimeout(r, Math.min(5000, 1000 + attempt * 500)));
    try {
      const w = await this.net.connect(this.net.code, settings.nick, settings.gender);
      if (this.driving) { this.driving.driver = null; this.driving.speed = 0; this.driving = null; this.sound.engineStop(); document.body.classList.remove('driving'); }
      for (const id of [...this.hunters.list.keys()]) this.hunters.remove(id);
      this.roster.clear();
      for (const p of w.players) { this.roster.set(p.id, p.nick); if (p.id !== this.net.id) this.hunters.add(p.id, p.nick, p.g); }
      // голос: старые соединения больше не действуют — звоним всем заново
      if (this.voice) {
        for (const id of [...this.voice.peers.keys()]) this.voice.remove(id);
        this.voice.callAll(w.players.map((p) => p.id));
        if (this.voice.talking) this.net.send({ t: 'mic', on: true });
      }
      this._tag = '';
      this.hud.message('Связь восстановлена');
    } catch (e) {
      if (/не найдена|заполнена/.test(e.message)) { this.hud.message(e.message, 'warn'); return; }
      this._reconnect(attempt + 1);
    }
  }

  netFrame(dt) {
    const net = this.net, p = this.player.pos;
    // своё состояние — 10 раз в секунду
    this.sendT -= dt * 1000;
    if (this.sendT <= 0) {
      this.sendT = SEND_MS;
      const msg = {
        t: 'st', p: [+p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2)], yaw: +this.player.yaw.toFixed(2), pitch: +this.player.pitch.toFixed(2),
        sp: +this.player.speed.toFixed(1), a: this.player.health > 0 ? 1 : 0, d: +this.player.dirt.toFixed(2), f: this.player.fallT > 0 ? 1 : 0, ai: this.gun.aimT > 0.5 ? 1 : 0, g: +this.ground.sample(p.x, p.z).toFixed(1),
      };
      if (this.driving && this.seat === 0) msg.vs = this.driving.netState();
      net.send(msg);
    }
    const snap = this.snap;
    if (snap) {
      // животные из снимка сервера
      const seen = new Set();
      for (const [id, ti, x, z, h, ai, sp] of snap.a) {
        let a = this.netAnimals.get(id);
        if (!a) { a = { id }; this.netAnimals.set(id, a); }
        a.type = SPECIES_IDS[ti]; a.x = x; a.z = z; a.heading = h; a.anim = ANIMS[ai]; a.speed = sp; a.t = performance.now();
        a.state = a.anim === 'death' ? 'dead' : 'alive';
        seen.add(id);
      }
      for (const id of this.netAnimals.keys()) if (!seen.has(id)) this.netAnimals.delete(id);
      // машины, которыми управляют другие
      for (const vs of snap.v) {
        const v = this.vehicles.find((q) => q.netId === vs[0]);
        if (!v || (v === this.driving && this.seat === 0)) continue;
        v.remoteDriver = vs[9];
        // высота 0 — сервер ещё не получал положение этой машины: ставим на землю
        if (vs[2] === 0) vs[2] = this.ground.sample(vs[1], vs[3]);
        if (vs[9] && vs[9] !== net.id) v.applyRemote(dt, vs.slice(1, 9));
        else if (!vs[9] && (Math.abs(v.pos.x - vs[1]) > 0.5 || Math.abs(v.pos.z - vs[3]) > 0.5)) v.applyRemote(dt, [...vs.slice(1, 7), 0, 0]);
        else v.update(dt, null);
      }
      this.hunters.sync(snap.p, net.id, dt, this.camera.position, (vid, seat, out) => {
        const v = this.vehicles.find((q) => q.netId === vid);
        if (!v) return null;
        v.root.updateMatrixWorld();
        v.seatWorld(out, seat);
        return v.heading;
      });
    }
    this.views.sync([...this.netAnimals.values()], dt, this.camera);
    // голоса — из голов охотников
    this.voice?.update(this.camera, (id) => {
      const h = this.hunters.list.get(id);
      return h && h.target ? { x: h.x, y: h.y + 1.6, z: h.z } : null;
    });
  }

  renderBoard() {
    const el = $('#board-list');
    if (!el) return;
    const rows = this.scores.list.map((q, i) => `<tr class="${q.id === this.net?.id ? 'me' : ''}"><td>${i + 1}</td><td>${esc(q.nick)}</td><td>${q.kills}</td><td>${fmtScore(q.score)}</td></tr>`).join('');
    const best = this.scores.best.map((q, i) => `<tr><td>${i + 1}</td><td>${esc(q.nick)}</td><td>${q.kills}</td><td>${fmtScore(q.score)}</td></tr>`).join('');
    el.innerHTML = `<h3>Охотники в комнате</h3><table><tr><th>#</th><th>Ник</th><th>Добыча</th><th>Очки</th></tr>${rows}</table>`
      + (best ? `<h3>Рекорды комнаты</h3><table><tr><th>#</th><th>Ник</th><th>Добыча</th><th>Очки</th></tr>${best}</table>` : '');
  }

  damage(dmg, species) {
    if (this.player.health <= 0) return;
    this.player.health = Math.max(0, this.player.health - dmg);
    this.damageT = 0.35;
    this.sound.bite();
    this.player.addRecoil(-0.03);
    if (this.player.health <= 0) {
      this.hud.message(`Вас загрыз${species === 'boar' ? ' кабан' : 'ли волки'}… Возвращение на базу`, 'warn');
      this.score = Math.max(0, this.score - 100);
      setTimeout(() => {
        this.player.health = 100;
        this.medkits = 3;
        this.player.platform = null;
        this.player.pos.set(0, this.ground.sample(0, 0), 0);
        this.player.vel.set(0, 0, 0);
      }, 1500);
    }
  }

  frame() {
    const dt = Math.min(0.05, this.clock.getDelta());
    const input = this.input;
    input.poll();
    if (input.consume('pause')) this.pause(!this.paused);
    if (this.paused) { if (this.post) this.post.render(0); else this.renderer.render(this.scene, this.camera); return; }

    this.shared.uTime.value += dt;
    const t = this.shared.uTime.value;
    // время суток, погода, сезон
    this.env.update(dt);
    const env = this.env;
    if (Math.abs(env.hours - this.sky.hours) > 0.01 || !this._wx || Object.keys(env.weather).some((k) => Math.abs(env.weather[k] - this._wx[k]) > 0.004)) {
      this._wx = { ...env.weather };
      this.sky.set(env.hours, env.weather);
      this.trees.setLight(this.sky.light);
      this.buildings.setEvening(Math.max(this.sky.night, env.weather.cloud * 0.3 * (1 - this.sky.light)));
    }
    this.shared.uRain.value = env.weather.rain;
    this.sky.updateEnv(this.renderer, dt);
    this.precip.update(dt, this.camera.position, env.weather, this.sky.hemi.color, this.renderer.getPixelRatio() * innerHeight / 600);
    this.sound.rain(this.paused ? 0 : env.weather.rain);
    if (input.consume('use')) { this.select('rifle'); this.useAction(); }
    this.handleInventory(input);
    if (input.consume('debug')) this.views.debug = !this.views.debug;
    const p = this.player.pos;

    if (this.driving && this.seat > 0) {
      // пассажир: сидит на своём месте, свободно смотрит по сторонам и может стрелять
      const v = this.driving;
      input.consume('jump');
      if (input.consume('view')) this.vcam.firstPerson = !this.vcam.firstPerson;
      const armed = this.armed;
      if (input.consume('fire') && this.player.health > 0) { if (armed) this.shoot(); else this.select('rifle'); }
      if (input.consume('reload')) this.gun.reload();
      this.vcam.update(dt, v, input.takeLook(), this.seat, this.gun.aimT);
      this.gun.update(dt, armed && input.aim && this.vcam.firstPerson, 0);
      if (!armed || !this.vcam.firstPerson) this.gun.root.visible = false;
      v.root.updateMatrixWorld();
      v.seatWorld(this._seatPos ||= new THREE.Vector3(), this.seat);
      p.set(this._seatPos.x, this._seatPos.y - 1.6, this._seatPos.z);
      this.player.yaw = this.camera.rotation.y; this.player.pitch = this.camera.rotation.x;
      this.player.speed = Math.abs(v.speed);
    } else if (this.driving) {
      const v = this.driving;
      input.consume('fire'); input.consume('reload'); input.consume('jump');
      if (input.consume('view')) this.vcam.firstPerson = !this.vcam.firstPerson;
      v.update(dt, { throttle: input.move.y, steer: input.move.x, handbrake: input.jumpHeld });
      p.set(v.pos.x, v.pos.y, v.pos.z);
      this.player.speed = Math.abs(v.speed);
      this.vcam.update(dt, v, input.takeLook());
      // салон с рулём и руками — только в виде из кабины
      const ck = v.buildCockpit();
      ck.visible = this.vcam.firstPerson;
      if (ck.visible) ck.updateCockpit(dt);
      this.sound.engineUpdate(v.rpm, v.throttle);
      // двигатель распугивает зверей
      if (this.sim && Math.abs(v.speed) > 3 && Math.random() < dt * 2) this.sim.noise(v.pos.x, v.pos.z, 0.35);
    } else {
      if (input.consume('view')) { this.tp = !this.tp; this.hud.message(this.tp ? 'Вид от третьего лица (V — обратно)' : 'Вид от первого лица'); }
      const armed = this.armed;
      if (input.consume('fire') && this.player.health > 0) { if (armed) this.shoot(); else this.select('rifle'); }
      if (input.consume('reload')) { if (!armed) this.select('rifle'); this.gun.reload(); }
      this.gun.update(dt, armed && input.aim, this.player.speed);
      if (!armed) this.gun.root.visible = false;
      this.player.aimFov = this.slot === 'sniper' ? 72 / (this.sniperZoom || 8) : 14;
      this.player.update(dt, input, this.gun.aimT, this.binoc.t);
      this.thirdPerson(dt);
    }
    const cp = this.camera.position;
    if (this.net) {
      this.netFrame(dt);
    } else {
      // стоящие машины тоже обновляются (катятся с горки, оседают)
      for (const v of this.vehicles) if (v !== this.driving) v.update(dt, null);
      this.sim.update(dt, [{ id: 'me', x: p.x, y: p.y, z: p.z, speed: this.player.speed, inVehicle: !!this.driving || !!this.player.platform, alive: this.player.health > 0 }]);
      for (const e of this.sim.events) if (e.type === 'attack' && e.target === 'me') this.damage(e.dmg, e.species);
      this.sim.events.length = 0;
      this.views.sync(this.sim.animals, dt, this.camera);
    }

    this.grass.update(cp, p, this.camera, this._hFn ||= (x, z) => this.ground.sample(x, z));
    const view = this.viewCone();
    this.trees.update(cp, false, view);
    this.rocks.update(cp, false, view);
    this.sky.update(cp, t);
    for (const w of [this.water, this.puddleMesh]) {
      if (!w) continue;
      const u = w.material.uniforms;
      u.uTime.value = t;
      u.uSunDir.value.copy(this.sky.sunDir);
      u.uSunColor.value.copy(this.sky.sun.color);
      u.uSkyColor.value.copy(this.sky.uniforms.uHorizon.value);
      u.uRain.value = this.env.weather.rain;
    }
    this.impacts.update(dt);
    this.updateDirt(dt);
    this.binoc.update(dt, () => this.rangefinder());
    this.updateVision(dt);
    this.updateHouseLight(dt);
    this.phone.update(dt, this.phoneState());

    if (this.water.mirror && this._frameN % (this.mirrorEvery || 1) === 0 && riverDist(cp.x, cp.z) < this.preset.viewDist && this.riverInView(cp)) {
      this.water.mirror.render(this.renderer, this.scene, this.camera, [this.water, this.grass, this.gun.root, this.puddleMesh].filter(Boolean));
    }
    // отражение в ближайшей луже (своя плоскость на её уровне) — только если она в кадре
    if (this.puddleMesh?.mirror && this._frameN % (this.mirrorEvery || 1) === 0) {
      const lvl = this.puddleMesh.nearestLevel(cp);
      this._frustum ||= new THREE.Frustum(); this._pm ||= new THREE.Matrix4();
      this.camera.updateMatrixWorld(); this._frustum.setFromProjectionMatrix(this._pm.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));
      this._sph ||= new THREE.Sphere(new THREE.Vector3(), 6);
      if (lvl !== null) this._sph.center.copy(this.puddleMesh.nearestPos);
      const inView = lvl !== null && this._frustum.intersectsSphere(this._sph);
      if (lvl !== null && inView) {
        this.puddleMesh.mirror.level = lvl;
        this.puddleMesh.mirror.render(this.renderer, this.scene, this.camera, [this.water, this.grass, this.gun.root, this.puddleMesh]);
      }
    }
    this._frameN++;
    if (this._frameN % (this.preset.shadowEvery || 1) === 0) this.renderer.shadowMap.needsUpdate = true;
    if (this.preset.adaptive) this.adaptResolution(dt);
    if (this.post) { this.renderer.info.reset(); this.post.render(dt, this.sky.sunRealDir, this.sky.sun.color, (1 - this.sky.uniforms.uCover.value) * (1 - this.sky.night), this.sky.sunset); } else if (this.vision.mode) this.vision.render(this.scene, this.camera, 0); else this.renderer.render(this.scene, this.camera);
    this.updateHud(dt);
  }

  // направление взгляда по горизонтали и косинус половины горизонтального угла обзора + запас 22°
  viewCone() {
    const cam = this.camera, v = this._vc ||= { fx: 0, fz: -1, cos: 0 };
    const d = cam.getWorldDirection(this._vd ||= new THREE.Vector3());
    const l = Math.hypot(d.x, d.z) || 1;
    v.fx = d.x / l; v.fz = d.z / l;
    const half = Math.atan(Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * cam.aspect) + 0.38;
    // смотрим сильно вверх/вниз — конус шире (по горизонтали видно больше)
    v.cos = Math.abs(d.y) > 0.6 || half >= Math.PI ? -2 : Math.cos(Math.min(Math.PI, half + Math.abs(d.y) * 0.6));
    return v;
  }

  updateHud(dt) {
    const hud = this.hud;
    // подсказка «кликните» — пока мышь не захвачена (только на компьютере)
    const needLock = !isTouch && !this.input.locked && !this.input.dragLook && !this.paused && this.running;
    if (needLock !== this._needLock) { this._needLock = needLock; $('#lock-hint').classList.toggle('hidden', !needLock); $('#game').classList.toggle('locked', this.input.locked); }
    hud.update(dt, { gun: this.gun, yaw: this.driving ? this.driving.heading + Math.PI : this.player.yaw, score: this.score, kills: this.kills, showFps: settings.showFps });
    if (settings.showFps) hud.fps.textContent = hud.fps.textContent.replace(/ ·.*$/, '') + ` · ${this.renderer.info.render.calls} dc · Q${this.qLevel || 0}`;
    $('#health-bar').style.width = `${this.player.health}%`;
    if (this.net) {
      const tag = `Комната <b>${this.net.code}</b> · ${this.roster.size}/${MAX_PLAYERS} · ${Math.round(this.net.rtt)} мс`;
      if (tag !== this._tag) { $('#room-tag').innerHTML = tag; this._tag = tag; }
    }
    this.damageT -= dt;
    $('#damage').classList.toggle('on', this.damageT > 0);
    // подсказки
    let prompt = '', useBtn = false;
    const key = isTouch ? '🚙' : 'F';
    if (this.driving) { useBtn = true; }
    else if (this.player.platform) { prompt = `<b>${key}</b> — спуститься с вышки`; useBtn = true; }
    else {
      const v = this.nearestVehicle();
      const tw = !v && this.nearestTower();
      if (v) {
        const driverFree = !v.remoteDriver || !this.net;
        const free = v.seats ? v.seats.filter((q) => !q).length : 4;
        prompt = free === 0 ? `${v.cfg.name}: мест нет` : `<b>${key}</b> — сесть ${driverFree ? 'за руль' : 'пассажиром'}: ${v.cfg.name}`;
        useBtn = free > 0;
      }
      else if (tw) { prompt = `<b>${key}</b> — подняться на вышку`; useBtn = true; }
    }
    if (prompt !== this._prompt) { $('#prompt').innerHTML = prompt; this._prompt = prompt; }
    if (isTouch) {
      $('#btn-use').classList.toggle('hidden', !useBtn);
      $('#btn-view').classList.toggle('hidden', !this.driving);
    }
    const speed = this.driving ? `${Math.round(Math.abs(this.driving.speed) * 3.6)}<small>км/ч</small>` : '';
    if (speed !== this._speed) { $('#speedo').innerHTML = speed; this._speed = speed; }
  }
}

// ---------- меню ----------
function setupMenu() {
  const nick = $('#nick'), quality = $('#quality'), tod = $('#tod');
  nick.value = settings.nick;
  for (const [k, p] of Object.entries(PRESETS)) quality.add(new Option(p.label, k, false, k === settings.quality));
  tod.value = settings.timeOfDay;
  const mapSel = $('#map-sel');
  mapSel.value = settings.map || 'forest';
  mapSel.addEventListener('change', () => { settings.map = mapSel.value; saveSettings(settings); });
  const genderSel = $('#gender-sel');
  genderSel.value = settings.gender || 'm';
  genderSel.addEventListener('change', () => { settings.gender = genderSel.value; saveSettings(settings); });
  $('#sens').value = settings.sensitivity;
  $('#controls-help').innerHTML = isTouch
    ? 'Левый джойстик — ходьба (до упора — бег) · свайп справа — камера · кнопки: выстрел, прицел, перезарядка, прыжок, 🔭 бинокль, 📱 телефон с картой'
    : 'WASD — ходьба · Shift — бег · мышь — камера · ЛКМ — выстрел · ПКМ — оптика · R — перезарядка (в оптике — выстрел) · Space — прыжок · F — машина/вышка/дверь · V — вид от 3-го лица / в машине · 1–7 — инвентарь (2 — снайперская с ночной оптикой, 5 — тепловизор) · B — бинокль · M — телефон (карта) · Enter — чат · G (держать) — голос · Esc — пауза';

  // «Ультра» на телефоне — только после предупреждения
  const warnUltra = (sel) => sel.addEventListener('change', () => {
    if (sel.value !== 'ultra') return;
    $('#ultra-text').textContent = isTouch
      ? '«Ультра» сделана для компьютеров — на телефоне её лучше не запускать: будет тормозить и сильно греться. Для телефона есть свой режим «Ультра для телефона» — красивее «Высокой», но идёт плавно.'
      : 'Вы точно хотите включить «Ультру»? Это максимальная графика: отражения в воде, лучи солнца, 2K-текстуры. Компьютер может немного нагреваться и шуметь вентиляторами, нужна хорошая видеокарта.';
    $('#ultra-cancel').textContent = isTouch ? 'Выбрать «Ультра для телефона»' : 'Оставить «Высокую»';
    $('#ultra-ok').textContent = isTouch ? 'Всё равно включить' : 'Да, включить «Ультру»';
    $('#ultra-warn').classList.remove('hidden');
    $('#ultra-cancel').onclick = () => { sel.value = isTouch ? 'ultraPhone' : 'high'; $('#ultra-warn').classList.add('hidden'); sel.dispatchEvent(new Event('input')); };
    $('#ultra-ok').onclick = () => $('#ultra-warn').classList.add('hidden');
  });
  warnUltra(quality);
  warnUltra($('#quality-pause'));

  // время года и погода (в меню и на паузе — одинаковые списки)
  for (const sel of document.querySelectorAll('.season-sel')) {
    sel.add(new Option(`По месяцу (сейчас: ${SEASONS[seasonFor('auto')]})`, 'auto'));
    for (const [k, v] of Object.entries(SEASONS)) sel.add(new Option(v, k));
    sel.value = settings.season || 'auto';
    sel.addEventListener('change', () => { settings.season = sel.value; saveSettings(settings); for (const o of document.querySelectorAll('.season-sel')) o.value = sel.value; });
  }
  for (const sel of document.querySelectorAll('.weather-sel')) {
    for (const [k, v] of Object.entries(WEATHER_NAMES)) sel.add(new Option(v, k));
    sel.value = settings.weather || 'auto';
    sel.addEventListener('change', () => { settings.weather = sel.value; saveSettings(settings); for (const o of document.querySelectorAll('.weather-sel')) o.value = sel.value; });
  }

  const save = () => {
    settings.nick = nick.value.trim().slice(0, 16);
    settings.quality = quality.value;
    settings.timeOfDay = tod.value;
    settings.sensitivity = parseFloat($('#sens').value);
    saveSettings(settings);
  };

  let game = null;
  const status = (text, err = false) => { const el = $('#net-status'); el.textContent = text; el.classList.toggle('err', err); };

  // общий запуск: net = null — одиночная игра
  async function launch(net = null, welcome = null) {
    $('#menu').classList.add('hidden');
    $('#loading').classList.remove('hidden');
    game = new Game(net, welcome);
    game.sound.unlock();
    window.__game = game;
    if (!net && settings.nick === 'Leva') game.score = 5e24;   // рекорд владельца игры
    try {
      await game.init((p, label) => {
        $('#load-bar').style.width = `${p * 100}%`;
        $('#load-label').textContent = label;
      });
    } catch (e) {
      console.error(e);
      $('#load-label').innerHTML = e.message === 'WEBGL' || /WebGL/i.test(e.message)
        ? 'Браузер не дал доступ к 3D-графике (WebGL).<br>Закройте другие вкладки с 3D-играми и обновите страницу.<br>Не помогло — перезапустите браузер и проверьте, что включено<br>«Использовать аппаратное ускорение» в настройках.'
        : 'Ошибка: ' + (e?.message || String(e)) + '<br>Обновите страницу.';
      return;
    }
    $('#loading').classList.add('hidden');
    game.start();
    game.hud.message(net
      ? `Комната <b>${net.code}</b> — передайте код друзьям. Tab — таблица очков.`
      : game.map === 'africa'
        ? `Сафари, ${esc(settings.nick)}! Стадо зебр — впереди, к северу. Осторожно: львы и гиены нападают, слоны, носороги и бегемоты — если их ранить.`
        : `Удачной охоты, ${esc(settings.nick)}! Стадо оленей — впереди, к северу. Машины — у базы за спиной.`);
  }

  const needNick = () => {
    save();
    if (!settings.nick) { nick.focus(); nick.classList.add('err'); return true; }
    return false;
  };

  async function joinRoom(code) {
    const net = new Net();
    status('Подключение…');
    try {
      // одна автоматическая повторная попытка при сетевом сбое (мобильная сеть и т. п.)
      const welcome = await net.connect(code, settings.nick, settings.gender).catch(async (e) => {
        if (/не найдена|заполнена/.test(e.message)) throw e;
        await new Promise((r) => setTimeout(r, 1200));
        return net.connect(code, settings.nick, settings.gender);
      });
      // звук разрешаем, пока ещё есть «жест» пользователя
      await launch(net, welcome);
    } catch (e) {
      status(e.message, true);
    }
  }

  $('#btn-solo').addEventListener('click', () => { if (!needNick()) launch(); });
  $('#btn-create').addEventListener('click', async () => {
    if (needNick()) return;
    status('Создаём комнату…');
    try {
      const { code } = await createRoom(settings.map || 'forest');
      $('#room-code').value = code;
      await joinRoom(code);
    } catch (e) {
      status('Сервер недоступен. Запустите его: npm run dev в папке server', true);
    }
  });
  const join = () => {
    if (needNick()) return;
    const code = $('#room-code').value.trim().toUpperCase();
    if (code.length !== CODE_LEN) { status(`Код — ${CODE_LEN} символов`, true); return; }
    joinRoom(code);
  };
  $('#btn-join').addEventListener('click', join);
  $('#room-code').addEventListener('keydown', (e) => { if (e.key === 'Enter') join(); });
  // ссылка-приглашение: ...?room=ABCDE
  const invite = new URLSearchParams(location.search).get('room');
  if (invite) $('#room-code').value = invite.toUpperCase().slice(0, CODE_LEN);

  $('#btn-board').addEventListener('click', () => $('#board').classList.toggle('hidden'));
  $('#btn-board').addEventListener('touchstart', (e) => { e.preventDefault(); $('#board').classList.toggle('hidden'); }, { passive: false });

  // общий рейтинг в меню
  leaderboard().then(({ top }) => {
    if (!top?.length) return;
    $('#lb').innerHTML = top.slice(0, 10).map((r) => `<li><b>${esc(r.nick)}</b> — ${Number(r.score).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} очк., добыча: ${r.kills}</li>`).join('');
    $('#lb-wrap').classList.remove('hidden');
  }).catch(() => {});

  $('#btn-resume').addEventListener('click', () => game?.pause(false));
  $('#btn-apply').addEventListener('click', () => {
    settings.quality = $('#quality-pause').value;
    settings.timeOfDay = $('#tod-pause').value;
    settings.sensitivity = parseFloat($('#sens-pause').value);
    saveSettings(settings);
    location.reload();
  });
  $('#btn-menu').addEventListener('click', () => location.reload());
  const qp = $('#quality-pause');
  for (const [k, p] of Object.entries(PRESETS)) qp.add(new Option(p.label, k, false, k === settings.quality));
  $('#tod-pause').value = settings.timeOfDay;
  $('#sens-pause').value = settings.sensitivity;
  $('#sens-pause').addEventListener('input', (e) => { settings.sensitivity = parseFloat(e.target.value); saveSettings(settings); });
}

document.addEventListener('gesturestart', (e) => e.preventDefault());
setupMenu();
