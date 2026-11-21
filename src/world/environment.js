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

// Дождь (штрихи) и снег (хлопья) вокруг камеры — одна геометрия, движение в шейдере
export class Precipitation {
  constructor(scene, preset) {
    const N = preset.post ? 9000 : preset.grass > 9000 ? 5000 : 2500;
    const pos = new Float32Array(N * 2 * 3);
    const end = new Float32Array(N * 2);
    for (let i = 0; i < N; i++) {
      const x = Math.random(), y = Math.random(), z = Math.random();
      for (let j = 0; j < 2; j++) { pos.set([x, y, z], (i * 2 + j) * 3); end[i * 2 + j] = j; }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aEnd', new THREE.BufferAttribute(end, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.uniforms = {
      uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uRain: { value: 0 }, uSnow: { value: 0 },
      uColor: { value: new THREE.Color(0.7, 0.75, 0.8) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms, transparent: true, depthWrite: false,
      vertexShader: /* glsl */`
        attribute float aEnd;
        uniform float uTime, uRain, uSnow; uniform vec3 uCam;
        varying float vA; varying float vEnd;
        void main() {
          const vec3 BOX = vec3(44.0, 26.0, 44.0);
          vec3 p = position * BOX;
          float snow = step(uRain, uSnow);
          float speed = mix(17.0, 1.6, snow);
          vec2 wind = mix(vec2(2.2, 0.8), vec2(0.6, 0.3), snow);
          p.y -= uTime * speed * (0.85 + position.x * 0.3);
          p.xz += wind * uTime + snow * vec2(sin(uTime * 0.9 + position.z * 40.0), cos(uTime * 0.7 + position.x * 40.0)) * 0.6;
          // заворачиваем в коробку вокруг камеры
          vec3 rel = mod(p - uCam + BOX * 0.5, BOX) - BOX * 0.5;
          vec3 w = uCam + rel;
          // хвост капли — по направлению движения
          w -= aEnd * mix(vec3(wind.x, -speed, wind.y) * 0.032, vec3(0.11, 0.13, 0.05), snow);
          float amount = max(uRain, uSnow);
          float lim = step(position.y, amount); // плотность
          vA = lim * (1.0 - smoothstep(10.0, 22.0, length(rel))) * mix(0.35, 0.9, snow);
          vEnd = aEnd;
          gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
        }`,
      fragmentShader: /* glsl */`
        uniform vec3 uColor; varying float vA; varying float vEnd;
        void main() { if (vA < 0.01) discard; gl_FragColor = vec4(uColor, vA * (1.0 - vEnd * 0.7)); }`,
    });
    this.mesh = new THREE.LineSegments(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 8;
    scene.add(this.mesh);
  }

  update(dt, cam, weather, lightColor) {
    const u = this.uniforms;
    u.uTime.value += dt;
    u.uCam.value.copy(cam);
    u.uRain.value = weather.rain;
    u.uSnow.value = weather.snow;
    u.uColor.value.copy(lightColor);
    this.mesh.visible = weather.rain > 0.02 || weather.snow > 0.02;
  }
}
