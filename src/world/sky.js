import * as THREE from 'three';

// Небо, солнце/луна, туман и освещение.
// Время — часы 0..24 (высота солнца), погода — {cloud, rain, snow, fog} 0..1.
// Ключи по высоте солнца (рад): ночь → сумерки → закат → золотой час → день → полдень.
const KEYS = [
  { e: -0.40, zen: 0x01030a, hor: 0x080c1a, sun: 0x6a7aa0, si: 0.3, hs: 0x22304e, hg: 0x040506, hi: 0.14 },
  { e: -0.12, zen: 0x0a1430, hor: 0x2a2848, sun: 0x6a6a90, si: 0.12, hs: 0x34405e, hg: 0x0a0a0c, hi: 0.22 },
  { e: 0.00, zen: 0x283466, hor: 0xe8703e, sun: 0xff6424, si: 1.2, hs: 0xa88aa8, hg: 0x44302a, hi: 0.66 },
  { e: 0.10, zen: 0x38508e, hor: 0xf0a064, sun: 0xff9a48, si: 2.2, hs: 0xc4a8bc, hg: 0x463a2e, hi: 0.7 },
  { e: 0.22, zen: 0x4064aa, hor: 0xf8b878, sun: 0xffb868, si: 2.4, hs: 0xbcb2c4, hg: 0x3c3426, hi: 0.62 },
  { e: 0.40, zen: 0x4a78b8, hor: 0xe2d0aa, sun: 0xffd9a0, si: 2.5, hs: 0xb4bed0, hg: 0x3a3624, hi: 0.62 },
  { e: 1.10, zen: 0x3f7fd0, hor: 0xb9d4ea, sun: 0xfff4e0, si: 2.8, hs: 0xb0cce8, hg: 0x363622, hi: 0.6 },
];
const GREY = new THREE.Color(0x8a9096);

export class SkySystem {
  constructor(scene, preset) {
    this.scene = scene;
    this.preset = preset;
    this.hours = -1;
    this.azimuth = 0.9;
    this.sunDir = new THREE.Vector3();     // направление на главный источник (солнце или луна)
    this.sunRealDir = new THREE.Vector3(); // настоящее солнце (может быть под горизонтом)
    this.night = 0;                        // 0 — день, 1 — глубокая ночь
    this.light = 1;                        // общий уровень освещённости (для импостеров)
    this.weather = { cloud: 0, rain: 0, snow: 0, fog: 0 };
    this.thickU = { value: 0 };   // густота тумана/осадков для дальних гор

    this.uniforms = {
      uZenith: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
      uSunDir: { value: this.sunRealDir },
      uMoonDir: { value: new THREE.Vector3() },
      uSunColor: { value: new THREE.Color() },
      uTime: { value: 0 },
      uNight: { value: 0 },
      uCover: { value: 0 },
      uEnvPass: { value: 0 },
      uSunset: { value: 0 },
    };
    const skyMat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: /* glsl */`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,
      fragmentShader: /* glsl */`
        uniform vec3 uZenith, uHorizon, uSunDir, uSunColor, uMoonDir;
        uniform float uTime, uNight, uCover, uEnvPass, uSunset;
        varying vec3 vDir;
        float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vn(vec2 p) {
          vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y);
        }
        float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * vn(p); p *= 2.03; a *= 0.5; } return s; }
        float fbm3(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 3; i++) { s += a * vn(p); p *= 2.03; a *= 0.5; } return s / 0.875; }
        void main() {
          vec3 d = normalize(vDir);
          float h = max(d.y, 0.0);
          float sunUp = smoothstep(-0.12, 0.02, uSunDir.y);
          // Небо как в атмосфере: насыщенная синева почти до горизонта и тонкая светлая дымка у самого
          // горизонта (экспоненциально), ярче в сторону солнца (рассеяние Ми), чуть темнее напротив
          float haze = exp(-h * 7.0) * 0.85 + exp(-h * 2.2) * 0.15;
          vec3 col = mix(uZenith, uHorizon, haze);
          float sd = dot(d, uSunDir);
          float toSun = max(dot(normalize(d.xz + 1e-5), normalize(uSunDir.xz + 1e-5)), 0.0);
          col *= 1.0 + (0.22 * toSun * toSun * exp(-h * 3.0) - 0.08 * (1.0 - toSun)) * sunUp * (1.0 - uCover);
          col = mix(col, uHorizon * mix(1.0, 1.15, toSun), exp(-h * 20.0) * 0.5 * sunUp);
          col = mix(col, uHorizon * 0.75, smoothstep(0.0, -0.2, d.y));
          // закат: оранжевое зарево у солнца, розово-сиреневая полоса выше, к зениту — глубокий индиго
          if (uSunset > 0.01) {
            vec2 dh = normalize(d.xz + 1e-5), sh = normalize(uSunDir.xz + 1e-5);
            float toward = max(dot(dh, sh), 0.0);
            float band = smoothstep(0.0, 0.12, h) * smoothstep(0.6, 0.12, h);
            vec3 pink = vec3(0.98, 0.42, 0.62), violet = vec3(0.42, 0.26, 0.62), gold = vec3(1.0, 0.55, 0.18);
            vec3 ss = mix(violet, pink, 0.35 + 0.65 * toward);
            col = mix(col, ss * mix(0.6, 1.0, toward), band * uSunset * 0.3 * (1.0 - uCover * 0.6));
            col += gold * pow(toward, 5.0) * smoothstep(0.45, 0.0, h) * uSunset * 0.5 * (1.0 - uCover * 0.7);
            col += vec3(1.0, 0.35, 0.12) * pow(toward, 2.0) * smoothstep(0.12, 0.0, abs(d.y)) * uSunset * 0.18;
          }
          float s = max(sd, 0.0);
          col += uSunColor * (pow(s, 900.0) * 6.0 * sunUp * (1.0 - uEnvPass) + pow(s, 12.0) * 0.35 + pow(s, 3.0) * 0.12) * sunUp * (1.0 - uCover * 0.85);
          // звёзды и луна
          if (uNight > 0.01 && d.y > 0.0) {
            vec2 sp = d.xz / (d.y + 0.3) * 420.0;
            float st = pow(h21(floor(sp)), 220.0) * smoothstep(0.0, 0.2, d.y);
            float tw = 0.6 + 0.4 * sin(uTime * 3.0 + h21(floor(sp) + 7.0) * 30.0);
            col += vec3(0.9, 0.95, 1.0) * st * 2.2 * tw * uNight * (1.0 - uCover);
            col += vec3(0.06, 0.07, 0.1) * smoothstep(0.6, 0.0, abs(dot(d, normalize(vec3(0.3, 0.2, 1.0))))) * uNight * 0.4 * (1.0 - uCover); // Млечный путь
            float m = max(dot(d, uMoonDir), 0.0);
            col += vec3(0.85, 0.88, 0.95) * (smoothstep(0.9995, 0.9997, m) * 1.6 + pow(m, 60.0) * 0.08) * uNight * (1.0 - uCover * 0.7);
          }
          // облака: проекция на «потолок», дрейф по ветру, искажение формы (клубы), освещение от солнца:
          // светлые верхушки и края, тёмный низ у плотных облаков, серебристая кайма у солнца
          if (d.y > 0.0) {
            vec2 wind = vec2(uTime * 0.012, uTime * 0.004) * (1.0 + uCover * 2.0);
            vec2 cp = d.xz / (d.y + 0.08) * 1.4 + wind;
            vec2 warp = vec2(fbm3(cp * 0.6), fbm3(cp * 0.6 + 5.2)) - 0.5;
            vec2 q = cp + warp * 0.55;
            float n = fbm(q);
            float lo = mix(0.5, 0.12, uCover), hi = mix(0.74, 0.5, uCover);
            float dens = smoothstep(lo, hi, n);
            float fadeH = smoothstep(0.0, 0.22, d.y);
            float cov = dens * fadeH;
            // плотность чуть ближе к солнцу: если там гуще — эта точка в тени облака
            float nS = fbm3(q + uSunDir.xz * 0.22);
            float light = clamp(0.62 + (n - nS) * 3.2, 0.0, 1.0);
            vec3 skyAmb = mix(uHorizon, uZenith, 0.35);
            vec3 sunLit = vec3(1.0) * max(0.06, 1.0 - uNight) + uSunColor * 0.35 * sunUp;
            vec3 cloudCol = mix(skyAmb * 0.78, sunLit, light);
            cloudCol *= mix(1.0, 0.55, smoothstep(0.55, 1.0, dens) * (0.35 + uCover * 0.65)); // тёмное «брюхо»
            cloudCol *= mix(1.0, 0.45, uCover * uCover);   // тяжёлые дождевые тучи
            // серебристые края на просвет у солнца
            float sdp = max(sd, 0.0);
            cloudCol += uSunColor * pow(sdp, 8.0) * (1.0 - dens) * 1.4 * sunUp * (1.0 - uCover * 0.6);
            cloudCol += uSunColor * pow(sdp, 4.0) * 0.25 * sunUp;
            // у горизонта облака тонут в дымке
            cloudCol = mix(cloudCol, uHorizon, exp(-d.y * 9.0) * 0.55);
            // на закате облака подсвечены снизу: у солнца — золото и персик, дальше — розовые и лиловые
            if (uSunset > 0.01) {
              vec3 lit = mix(vec3(0.85, 0.36, 0.55), vec3(1.0, 0.62, 0.3), pow(toSun, 3.0));
              vec3 dark = vec3(0.32, 0.22, 0.42);
              vec3 sc = mix(dark, lit * 1.25, clamp(0.35 + (n - nS) * 3.0 + toSun * 0.4, 0.0, 1.0));
              cloudCol = mix(cloudCol, sc, uSunset * 0.55 * (1.0 - uCover * 0.5));
            }
            col = mix(col, cloudCol, cov * 0.96);
            // высокие перистые облака — тонкие вытянутые волокна (в ясную погоду)
            vec2 cc = d.xz / (d.y + 0.03) * 0.5 + wind * 0.6;
            float ci = smoothstep(0.52, 0.82, fbm3(vec2(cc.x * 0.45 + cc.y * 0.2, cc.y * 2.4)));
            col = mix(col, sunLit * 0.95 + uSunColor * 0.1, ci * 0.32 * fadeH * (1.0 - uCover) * (1.0 - cov) * max(0.15, 1.0 - uNight));
          }
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    this.dome = new THREE.Mesh(new THREE.SphereGeometry(1000, 24, 12), skyMat);
    this.dome.frustumCulled = false;
    this.dome.renderOrder = -1;
    scene.add(this.dome);

    // освещение от неба (IBL): небо рендерится в кубическую карту → PMREM → scene.environment.
    // Все PBR-материалы (земля, дома, машины, ружьё) получают рассеянный свет и блики от неба.
    this.ibl = !!preset.antialias;
    if (this.ibl) {
      this.envScene = new THREE.Scene();
      const d = new THREE.Mesh(this.dome.geometry, skyMat);
      d.scale.setScalar(0.05);
      this.envScene.add(d);
      this._envT = 99;
    }

    this.hemi = new THREE.HemisphereLight();
    scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight();
    this.sun.castShadow = preset.shadows;
    if (preset.shadows) {
      const s = this.sun.shadow;
      s.mapSize.set(preset.shadowMap, preset.shadowMap);
      const d = preset.shadowDist;
      Object.assign(s.camera, { left: -d, right: d, top: d, bottom: -d, near: 1, far: 400 });
      s.bias = -0.0004;
      s.normalBias = 0.6;
      s.camera.updateProjectionMatrix();
    }
    scene.add(this.sun, this.sun.target);
    scene.fog = new THREE.Fog(0xffffff, 30, preset.viewDist);
    this.set(13, this.weather);
  }

  // hours: 0..24; weather: {cloud, rain, snow, fog}
  set(hours, weather) {
    this.hours = hours;
    this.weather = weather;
    const { cloud, rain, snow, fog } = weather;
    const storm = Math.max(rain, snow * 0.8);
    // солнце: восход ~6:00, закат ~20:00, в полдень ~60°
    const day = hours >= 6 && hours <= 20;
    const e = day ? Math.sin(((hours - 6) / 14) * Math.PI) * 1.1 : -Math.sin(((((hours - 20) % 24) + 24) % 24 / 10) * Math.PI) * 0.45;
    const az = this.azimuth + (hours - 13) * 0.18;
    this.sunRealDir.set(Math.cos(e) * Math.sin(az), Math.sin(e), Math.cos(e) * Math.cos(az)).normalize();
    // луна — напротив солнца
    const me = Math.max(0.35, -e + 0.3);
    const moon = this.uniforms.uMoonDir.value.set(-Math.cos(me) * Math.sin(az), Math.sin(me), -Math.cos(me) * Math.cos(az)).normalize();

    let i = 0;
    while (i < KEYS.length - 2 && e > KEYS[i + 1].e) i++;
    const a = KEYS[i], b = KEYS[i + 1];
    const k = THREE.MathUtils.clamp((e - a.e) / (b.e - a.e), 0, 1);
    const C = (x, y) => new THREE.Color(x).lerp(new THREE.Color(y), k);
    const night = THREE.MathUtils.clamp((-e - 0.02) / 0.25, 0, 1);
    this.night = night;

    // пасмурно: серее и темнее
    const grey = (c, amt) => { const l = c.r * 0.3 + c.g * 0.59 + c.b * 0.11; return c.lerp(GREY.clone().multiplyScalar(l * 1.4 + 0.05), amt); };
    const overcast = Math.max(cloud, storm, fog * 0.6);
    const hor = grey(C(a.hor, b.hor), overcast * 0.75).multiplyScalar(1 - storm * 0.35);
    const zen = grey(C(a.zen, b.zen), overcast * 0.85).multiplyScalar(1 - storm * 0.45);
    this.uniforms.uZenith.value.copy(zen);
    this.uniforms.uHorizon.value.copy(hor);
    const sunC = C(a.sun, b.sun);
    this.uniforms.uSunColor.value.copy(sunC);
    this.uniforms.uNight.value = night;
    // сила «закатных» красок: солнце низко над горизонтом (вечер и утро)
    this.sunset = THREE.MathUtils.smoothstep(e, -0.12, 0.0) * (1 - THREE.MathUtils.smoothstep(e, 0.08, 0.3)) * (1 - overcast * 0.6);
    this.uniforms.uSunset.value = this.sunset;
    this.uniforms.uCover.value = Math.min(1, cloud * 0.8 + storm);

    // главный направленный свет: солнце днём, луна ночью
    const useMoon = e < -0.04;
    this.sunDir.copy(useMoon ? moon : this.sunRealDir);
    if (useMoon && this.sunDir.y < 0.25) this.sunDir.y = 0.25, this.sunDir.normalize();
    this.sun.color.copy(useMoon ? new THREE.Color(0x8fa4d0) : sunC);
    const si = (a.si + (b.si - a.si) * k) * (1 - overcast * 0.78) * (e > -0.04 && e < 0.02 ? 0.4 : 1);
    this.sun.intensity = si;
    this.hemi.color.copy(grey(C(a.hs, b.hs), overcast * 0.6));
    this.hemi.groundColor.copy(C(a.hg, b.hg));
    this.hemi.intensity = (a.hi + (b.hi - a.hi) * k) * (1 + overcast * 0.35) * (this.ibl ? 1.0 : 1);
    this.light = THREE.MathUtils.clamp(this.hemi.intensity * 0.9 + si * 0.22, 0.08, 1.15);

    this.scene.fog.color.copy(hor);
    const vd = this.preset.viewDist;
    const thick = Math.max(fog, storm * 0.6);
    this.thickU.value = Math.max(thick, night * 0.15);
    // в ясную погоду воздух прозрачнее: дымка начинается дальше и мягче (края карты не «белеют»)
    const clear = 1 - Math.min(1, thick * 1.5);
    this.scene.fog.far = vd * (1 + clear * 0.35) * (1 - thick * 0.7) * (1 - night * 0.25);
    this.scene.fog.near = Math.max(5, vd * (0.24 + clear * 0.2) * (1 - thick * 0.9) * (1 - Math.max(0, 1 - Math.abs(e) * 8) * 0.3));
  }

  // Материал для дальних гор: фото-текстура скал (трипланарно — без растяжения на кручах),
  // тёмный хвойный лес у подножия, промоины-расселины вдоль склона, снег там, где он держится,
  // освещение от солнца с детальным рельефом и воздушная перспектива (дальше — голубее и светлее)
  farMaterial(viewDist, rock) {
    return new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uWinter: { value: this.winter ? 1 : 0 }, uLightDir: { value: this.sunDir }, uFogColor: { value: this.scene.fog.color },
        uNear: { value: viewDist * 0.75 }, uFar: { value: viewDist * 1.5 }, tRock: { value: rock?.albedo || null }, uHasRock: { value: rock ? 1 : 0 }, uThick: this.thickU },
      vertexShader: /* glsl */`
        varying vec3 vW; varying vec3 vN;
        void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normal; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: /* glsl */`
        uniform vec3 uZenith, uHorizon, uSunColor, uFogColor, uLightDir;
        uniform float uNear, uFar, uNight, uWinter, uHasRock, uThick;
        uniform sampler2D tRock;
        varying vec3 vW; varying vec3 vN;
        float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
        float fbm3(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 3; i++) { s += a * vn(p); p *= 2.07; a *= 0.5; } return s / 0.875; }
        vec3 tri(vec3 p, vec3 n, float sc) {
          vec3 w = pow(abs(n), vec3(4.0)); w /= dot(w, vec3(1.0));
          return texture2D(tRock, p.zy * sc).rgb * w.x + texture2D(tRock, p.xz * sc).rgb * w.y + texture2D(tRock, p.xy * sc).rgb * w.z;
        }
        void main() {
          vec3 n0 = normalize(vN);
          vec3 d = normalize(vW - cameraPosition);
          float dist = length(vW - cameraPosition);
          // детальный рельеф: возмущаем нормаль градиентом шума (крупные складки + мелкие уступы)
          float e = 6.0;
          float b0 = fbm3(vW.xz * 0.012) + 0.35 * vn(vW.xz * 0.06);
          float bx = fbm3((vW.xz + vec2(e, 0.0)) * 0.012) + 0.35 * vn((vW.xz + vec2(e, 0.0)) * 0.06);
          float bz = fbm3((vW.xz + vec2(0.0, e)) * 0.012) + 0.35 * vn((vW.xz + vec2(0.0, e)) * 0.06);
          vec3 n = normalize(n0 + vec3(b0 - bx, 0.0, b0 - bz) * 4.5);
          float slope = 1.0 - n0.y;
          // промоины: тёмные полосы, бегущие вниз по склону
          vec2 sdir = normalize(n0.xz + 1e-4), perp = vec2(-sdir.y, sdir.x);
          float gully = smoothstep(0.58, 0.86, vn(vec2(dot(vW.xz, perp) * 0.045, dot(vW.xz, sdir) * 0.004 + vW.y * 0.003))) * smoothstep(0.25, 0.5, slope);
          // скалы: фото-текстура + крупная вариация цвета (охра/серый)
          vec3 rockTex = uHasRock > 0.5 ? tri(vW, n0, 1.0 / 38.0) * 0.6 + tri(vW, n0, 1.0 / 140.0) * 0.4 : vec3(0.45);
          float macro = fbm3(vW.xz * 0.0025);
          // пласты породы (наклонные полосы) и контраст текстуры
          float strata = smoothstep(0.35, 0.65, fract(vW.y * 0.045 + (vW.x + vW.z) * 0.004 + vn(vW.xz * 0.02) * 0.6));
          rockTex = mix(vec3(dot(rockTex, vec3(0.33))), rockTex, 1.4);
          vec3 rock = rockTex * mix(vec3(0.55, 0.53, 0.52), vec3(0.8, 0.7, 0.58), macro) * (0.82 + 0.25 * strata) * (1.0 - gully * 0.6);
          // хвойный лес: тёмная зелень с «кронами» (крапинки), заходит языками по ложбинам
          float trees = vn(vW.xz * 0.35) * 0.6 + vn(vW.xz * 1.3) * 0.4;
          vec3 forest = mix(vec3(0.028, 0.045, 0.025), vec3(0.06, 0.085, 0.045), trees) * (0.85 + 0.3 * macro);
          float treeLine = 105.0 + macro * 55.0 + gully * 20.0;
          float forestK = (1.0 - smoothstep(treeLine - 25.0, treeLine, vW.y)) * (1.0 - smoothstep(0.42, 0.62, slope + (trees - 0.5) * 0.15));
          vec3 col = mix(rock, forest, forestK);
          // альпийские луга между лесом и скалами
          col = mix(col, vec3(0.16, 0.17, 0.09) * (0.8 + 0.4 * trees), (1.0 - forestK) * (1.0 - smoothstep(0.3, 0.5, slope)) * (1.0 - smoothstep(treeLine, treeLine + 45.0, vW.y)) * 0.7);
          // снег: выше линии, держится на пологом, лежит в промоинах, сдувается с гребней
          float snowLine = mix(150.0, 25.0, uWinter) + macro * 40.0 - gully * 30.0;
          float snowK = smoothstep(snowLine, snowLine + 30.0, vW.y + (fbm3(vW.xz * 0.03) - 0.5) * 30.0) * (1.0 - smoothstep(0.62, 0.9, slope - gully * 0.25));
          vec3 snow = vec3(0.9, 0.93, 0.97);
          col = mix(col, snow, snowK);
          // освещение: солнце по детальной нормали, небо — снизу/сверху, тень на снегу голубоватая
          float ndl = max(dot(n, uLightDir), 0.0);
          vec3 amb = mix(uHorizon * 0.5, uZenith, n.y * 0.5 + 0.5) * 0.42;
          vec3 lit = col * (uSunColor * ndl * 1.35 * (1.0 - uNight) + amb * mix(1.0, 1.35, snowK));
          // воздушная перспектива: чем дальше — тем больше цвета неба
          vec3 sky = mix(uHorizon, uZenith, smoothstep(0.03, 0.7, max(d.y, 0.0)));
          // ясно — горы чёткие, вдали голубеют; туман/дождь — тонут в дымке
          float air = 1.0 - exp(-dist * 0.00062);
          vec3 aerial = mix(lit, sky * 0.95, clamp(0.05 + air * 0.62, 0.0, 0.82));
          gl_FragColor = vec4(mix(aerial, uFogColor, clamp(uThick * 1.4, 0.0, 1.0)), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
  }

  // перестраиваем карту окружения не чаще раза в 1.5 с (и сразу при сильной смене погоды/времени)
  updateEnv(renderer, dt) {
    if (!this.ibl) return;
    this._envT += dt;
    const sig = this.hours * 0.5 + this.weather.cloud + this.weather.rain + this.weather.snow + this.weather.fog;
    if (this._envT < 1.5 && Math.abs(sig - (this._envSig ?? -9)) < 0.15) return;
    if (this._envT < 0.3) return;
    this._envT = 0; this._envSig = sig;
    this.pmrem ||= new THREE.PMREMGenerator(renderer);
    this.uniforms.uEnvPass.value = 1;
    const rt = this.pmrem.fromScene(this.envScene, 0, 0.01, 100);
    this.uniforms.uEnvPass.value = 0;
    this.envRT?.dispose();
    this.envRT = rt;
    this.scene.environment = rt.texture;
    this.scene.environmentIntensity = 0.75;
  }

  // Тень следует за игроком; сдвиг кратен текселю — чтобы тени не «дрожали»
  update(camPos, time = 0) {
    this.uniforms.uTime.value = time;
    this.dome.position.copy(camPos);
    const texel = (this.preset.shadowDist * 2) / (this.preset.shadowMap || 1);
    const cx = Math.round(camPos.x / texel) * texel, cz = Math.round(camPos.z / texel) * texel;
    this.sun.target.position.set(cx, camPos.y, cz);
    this.sun.position.copy(this.sun.target.position).addScaledVector(this.sunDir, 200);
    this.sun.target.updateMatrixWorld();
  }
}
