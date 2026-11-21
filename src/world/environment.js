import * as THREE from 'three';

// Время суток, времена года и погода.
//  • Время: «цикл» (сутки за ~30 минут, старт в золотой час), «как в жизни» (часы компьютера),
//    или фиксированное: день / закат / ночь.
//  • Сезон: по текущему месяцу (или выбранный вручную): лето, осень, зима, весна.
//  • Погода: ясно → облачно → дождь (зимой — снег) → туман, меняется сама каждые несколько минут.

export const SEASONS = { summer: 'Лето', autumn: 'Осень', winter: 'Зима', spring: 'Весна' };
export function seasonFor(setting, date = new Date()) {
  if (setting && setting !== 'auto') return setting;
  const m = date.getMonth(); // 0 — январь
  return m <= 1 || m === 11 ? 'winter' : m <= 4 ? 'spring' : m <= 7 ? 'summer' : 'autumn';
}
// x — осень, y — зима (снежный покров), z — весна, w — мокро после дождя
export function seasonVector(season) {
  return new THREE.Vector4(season === 'autumn' ? 1 : 0, season === 'winter' ? 1 : 0, season === 'spring' ? 1 : 0, 0);
}

const W = {
  clear: { cloud: 0.05, rain: 0, snow: 0, fog: 0 },
  cloudy: { cloud: 0.75, rain: 0, snow: 0, fog: 0.1 },
  rain: { cloud: 1, rain: 1, snow: 0, fog: 0.25 },
  storm: { cloud: 1, rain: 1, snow: 0, fog: 0.45 },
  snow: { cloud: 0.9, rain: 0, snow: 1, fog: 0.35 },
  fog: { cloud: 0.4, rain: 0, snow: 0, fog: 1 },
};
export const WEATHER_NAMES = { auto: 'Меняется сама', clear: 'Ясно', cloudy: 'Облачно', rain: 'Дождь', snow: 'Снег', fog: 'Туман' };

export class Environment {
  constructor(settings, season, shared) {
    this.settings = settings;
    this.season = season;
    this.shared = shared;
    this.timeMode = settings.timeOfDay;
    const now = new Date();
    this.hours = this.timeMode === 'real' ? now.getHours() + now.getMinutes() / 60 : 17.3;
    this.weather = { ...W.clear };
    this.target = { ...W.clear };
    this.name = 'clear';
    this.left = 90 + Math.random() * 120;
    if (settings.weather && settings.weather !== 'auto') this._setTarget(settings.weather, true);
    else if (Math.random() < 0.35) this._setTarget(this._pick(), true);
    this.wet = 0;
  }

  _pick() {
    const r = Math.random();
    const s = this.season;
    if (s === 'winter') return r < 0.3 ? 'clear' : r < 0.55 ? 'cloudy' : r < 0.9 ? 'snow' : 'fog';
    if (s === 'autumn') return r < 0.3 ? 'clear' : r < 0.55 ? 'cloudy' : r < 0.8 ? 'rain' : r < 0.88 ? 'storm' : 'fog';
    if (s === 'spring') return r < 0.4 ? 'clear' : r < 0.65 ? 'cloudy' : r < 0.88 ? 'rain' : 'fog';
    return r < 0.55 ? 'clear' : r < 0.75 ? 'cloudy' : r < 0.9 ? 'rain' : r < 0.95 ? 'storm' : 'fog';
  }

  _setTarget(name, instant = false) {
    if (name === 'rain' && this.season === 'winter') name = 'snow';
    if (name === 'snow' && this.season === 'summer') name = 'rain';
    this.name = name;
    this.target = { ...W[name] };
    if (instant) this.weather = { ...this.target };
  }

  update(dt) {
    // время
    const m = this.timeMode;
    if (m === 'day') this.hours = 13;
    else if (m === 'sunset') this.hours = 19.1;
    else if (m === 'night') this.hours = 0.5;
    else if (m === 'real') { const n = new Date(); this.hours = n.getHours() + n.getMinutes() / 60 + n.getSeconds() / 3600; }
    else this.hours = (this.hours + dt / 75) % 24; // 1 игровой час = 75 с
    // погода
    const forced = this.settings.weather;
    if (forced && forced !== 'auto' && forced !== this.name && !(forced === 'rain' && this.name === 'snow' && this.season === 'winter')) this._setTarget(forced);
    if (!forced || forced === 'auto') {
      this.left -= dt;
      if (this.left <= 0) { this._setTarget(this._pick()); this.left = 120 + Math.random() * 180; }
    }
    const k = Math.min(1, dt / 25); // плавная смена ~25 с
    for (const key of Object.keys(this.weather)) this.weather[key] += (this.target[key] - this.weather[key]) * k;
    // земля мокнет под дождём и медленно сохнет
    this.wet = Math.max(0, Math.min(1, this.wet + (this.weather.rain > 0.3 ? dt / 40 : -dt / 240)));
    this.shared.uSeason.value.w = this.wet;
  }
}

// Осадки вокруг камеры (движение целиком в шейдере, геометрия не меняется):
//  • дождь — тонкие штрихи по направлению падения;
//  • снег — мягкие круглые хлопья разного размера, кружатся;
//  • брызги — расходящиеся колечки на земле (высота из карты рельефа).
export class Precipitation {
  constructor(scene, preset, heightTex) {
    const big = preset.post ? 1 : preset.grass > 9000 ? 0.6 : 0.3;
    this.uniforms = {
      uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uRain: { value: 0 }, uSnow: { value: 0 },
      uColor: { value: new THREE.Color(0.7, 0.75, 0.8) }, uHeight: { value: heightTex },
      uHalf: { value: 400 }, uWorld: { value: 800 }, uPx: { value: 1 },
    };
    const u = this.uniforms;

    // --- дождь
    const NR = Math.round(9000 * big);
    const rp = new Float32Array(NR * 2 * 3), re = new Float32Array(NR * 2);
    for (let i = 0; i < NR; i++) { const x = Math.random(), y = Math.random(), z = Math.random(); for (let j = 0; j < 2; j++) { rp.set([x, y, z], (i * 2 + j) * 3); re[i * 2 + j] = j; } }
    const rg = new THREE.BufferGeometry();
    rg.setAttribute('position', new THREE.BufferAttribute(rp, 3));
    rg.setAttribute('aEnd', new THREE.BufferAttribute(re, 1));
    this.rain = new THREE.LineSegments(rg, new THREE.ShaderMaterial({
      uniforms: u, transparent: true, depthWrite: false,
      vertexShader: /* glsl */`
        attribute float aEnd;
        uniform float uTime, uRain; uniform vec3 uCam;
        varying float vA; varying float vEnd;
        void main() {
          const vec3 BOX = vec3(36.0, 22.0, 36.0);
          vec3 p = position * BOX;
          float speed = 16.0 + position.x * 5.0;
          vec2 wind = vec2(2.0, 0.7);
          p.y -= uTime * speed; p.xz += wind * uTime;
          vec3 rel = mod(p - uCam + BOX * 0.5, BOX) - BOX * 0.5;
          vec3 w = uCam + rel - aEnd * vec3(wind.x, -speed, wind.y) * 0.028;
          vA = step(position.y, uRain) * (1.0 - smoothstep(6.0, 18.0, length(rel))) * 0.28;
          vEnd = aEnd;
          gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
        }`,
      fragmentShader: /* glsl */`
        uniform vec3 uColor; varying float vA; varying float vEnd;
        void main() { if (vA < 0.005) discard; gl_FragColor = vec4(uColor * 1.1, vA * (1.0 - vEnd * 0.8)); }`,
    }));

    // --- снег
    const NS = Math.round(14000 * big);
    const sp = new Float32Array(NS * 3);
    for (let i = 0; i < NS * 3; i++) sp[i] = Math.random();
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    this.snow = new THREE.Points(sg, new THREE.ShaderMaterial({
      uniforms: u, transparent: true, depthWrite: false,
      vertexShader: /* glsl */`
        uniform float uTime, uSnow, uPx; uniform vec3 uCam;
        varying float vA;
        void main() {
          const vec3 BOX = vec3(40.0, 24.0, 40.0);
          vec3 p = position * BOX;
          float sz = 0.6 + pow(fract(position.x * 91.7), 3.0) * 2.4;      // большинство мелких, редкие — крупные хлопья
          p.y -= uTime * (0.9 + sz * 0.25);
          p.xz += vec2(0.7, 0.25) * uTime;
          float ph = position.z * 60.0;
          p.x += sin(uTime * 0.8 + ph) * 0.7; p.z += cos(uTime * 0.6 + ph * 1.3) * 0.7;
          vec3 rel = mod(p - uCam + BOX * 0.5, BOX) - BOX * 0.5;
          vec4 mv = viewMatrix * vec4(uCam + rel, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = sz * 0.035 * uPx * projectionMatrix[1][1] * 600.0 / max(-mv.z, 0.3);
          vA = step(position.y, uSnow) * (1.0 - smoothstep(12.0, 20.0, length(rel))) * smoothstep(0.3, 1.2, -mv.z);
        }`,
      fragmentShader: /* glsl */`
        uniform vec3 uColor; varying float vA;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.15, d) * vA;
          if (a < 0.01) discard;
          gl_FragColor = vec4(mix(uColor, vec3(1.0), 0.55), a * 0.9);
        }`,
    }));

    // --- брызги на земле
    const NP = Math.round(1800 * big);
    const pp = new Float32Array(NP * 3);
    for (let i = 0; i < NP * 3; i++) pp[i] = Math.random();
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    this.splash = new THREE.Points(pg, new THREE.ShaderMaterial({
      uniforms: u, transparent: true, depthWrite: false,
      vertexShader: /* glsl */`
        uniform float uTime, uRain, uPx, uHalf, uWorld; uniform vec3 uCam; uniform sampler2D uHeight;
        varying float vA; varying float vT;
        void main() {
          float life = 0.45;
          float t = uTime / life + position.z * 7.0;
          float cyc = floor(t); vT = fract(t);
          // каждое «рождение» — новая случайная точка в радиусе 14 м
          vec2 r = fract(vec2(sin(cyc * 12.9 + position.x * 78.2), sin(cyc * 39.3 + position.y * 11.1)) * 43758.5) * 28.0 - 14.0;
          vec2 xz = uCam.xz + r;
          float h = texture2D(uHeight, (xz + uHalf) / uWorld).r;
          vec4 mv = viewMatrix * vec4(xz.x, h + 0.08, xz.y, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (0.05 + vT * 0.12) * uPx * projectionMatrix[1][1] * 600.0 / max(-mv.z, 0.3);
          vA = step(position.y, uRain) * (1.0 - vT) * (1.0 - smoothstep(6.0, 14.0, length(r)));
        }`,
      fragmentShader: /* glsl */`
        uniform vec3 uColor; varying float vA; varying float vT;
        void main() {
          vec2 c = gl_PointCoord - 0.5; c.y *= 2.6;           // приплюснутое колечко
          float d = length(c);
          float ring = smoothstep(0.08, 0.0, abs(d - 0.32 * (0.4 + vT * 0.6)));
          float a = ring * vA * 0.28;
          if (a < 0.01) discard;
          gl_FragColor = vec4(uColor, a);
        }`,
    }));

    for (const m of [this.rain, this.snow, this.splash]) { m.frustumCulled = false; m.renderOrder = 8; scene.add(m); }
  }

  // snowGround — зимой брызг нет
  update(dt, cam, weather, lightColor, pixelRatio = 1) {
    const u = this.uniforms;
    u.uTime.value += dt;
    u.uCam.value.copy(cam);
    u.uRain.value = weather.rain;
    u.uSnow.value = weather.snow;
    u.uPx.value = pixelRatio;
    u.uColor.value.copy(lightColor);
    this.rain.visible = weather.rain > 0.02;
    this.splash.visible = weather.rain > 0.05;
    this.snow.visible = weather.snow > 0.02;
  }
}
