import * as THREE from 'three';

// Небо, солнце/луна, туман и освещение.
// Время — часы 0..24 (высота солнца), погода — {cloud, rain, snow, fog} 0..1.
// Ключи по высоте солнца (рад): ночь → сумерки → закат → золотой час → день → полдень.
const KEYS = [
  { e: -0.40, zen: 0x01030a, hor: 0x080c1a, sun: 0x6a7aa0, si: 0.3, hs: 0x22304e, hg: 0x040506, hi: 0.14 },
  { e: -0.12, zen: 0x0a1430, hor: 0x2a2848, sun: 0x6a6a90, si: 0.12, hs: 0x34405e, hg: 0x0a0a0c, hi: 0.22 },
  { e: 0.00, zen: 0x22305c, hor: 0xd8683a, sun: 0xff6a28, si: 1.0, hs: 0x907890, hg: 0x2a2018, hi: 0.45 },
  { e: 0.10, zen: 0x31497e, hor: 0xf09858, sun: 0xff9a50, si: 2.0, hs: 0xa898a8, hg: 0x3a2e22, hi: 0.6 },
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

    this.uniforms = {
      uZenith: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
      uSunDir: { value: this.sunRealDir },
      uMoonDir: { value: new THREE.Vector3() },
      uSunColor: { value: new THREE.Color() },
      uTime: { value: 0 },
      uNight: { value: 0 },
      uCover: { value: 0 },
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
        uniform float uTime, uNight, uCover;
        varying vec3 vDir;
        float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vn(vec2 p) {
          vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y);
        }
        float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * vn(p); p *= 2.03; a *= 0.5; } return s; }
        void main() {
          vec3 d = normalize(vDir);
          float h = max(d.y, 0.0);
          vec3 col = mix(uHorizon, uZenith, smoothstep(0.03, 0.7, h));
          col = mix(col, uHorizon * 0.8, smoothstep(0.0, -0.2, d.y));
          float sunUp = smoothstep(-0.12, 0.02, uSunDir.y);
          float s = max(dot(d, uSunDir), 0.0);
          col += uSunColor * (pow(s, 900.0) * 6.0 * sunUp + pow(s, 12.0) * 0.35 + pow(s, 3.0) * 0.12) * sunUp * (1.0 - uCover * 0.85);
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
          // облака: проекция на «потолок», дрейф по ветру; плотность зависит от погоды
          if (d.y > 0.02) {
            vec2 cp = d.xz / (d.y + 0.08) * 1.4 + vec2(uTime * 0.012, uTime * 0.004) * (1.0 + uCover * 2.0);
            float n = fbm(cp);
            float lo = mix(0.48, 0.12, uCover), hi = mix(0.78, 0.5, uCover);
            float cov = smoothstep(lo, hi, n) * smoothstep(0.02, 0.25, d.y);
            float shade = fbm(cp + uSunDir.xz * 0.15);
            vec3 cloudCol = mix(uHorizon * 1.05, vec3(0.95) * max(0.08, 1.0 - uNight) + uSunColor * 0.25 * sunUp, 0.55 + (n - shade) * 2.0);
            cloudCol *= mix(1.0, 0.45, uCover * uCover);   // тяжёлые дождевые тучи темнее
            cloudCol += uSunColor * pow(s, 6.0) * 0.6 * sunUp;
            col = mix(col, cloudCol, cov * 0.95);
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
    this.hemi.intensity = (a.hi + (b.hi - a.hi) * k) * (1 + overcast * 0.35);
    this.light = THREE.MathUtils.clamp(this.hemi.intensity * 0.9 + si * 0.22, 0.08, 1.15);

    this.scene.fog.color.copy(hor);
    const vd = this.preset.viewDist;
    const thick = Math.max(fog, storm * 0.6);
    this.scene.fog.far = vd * (1 - thick * 0.7) * (1 - night * 0.25);
    this.scene.fog.near = Math.max(5, vd * 0.24 * (1 - thick * 0.9) * (1 - Math.max(0, 1 - Math.abs(e) * 8) * 0.3));
  }

  // Материал для дальних гор: цвет неба в этом направлении (воздушная перспектива)
  farMaterial(viewDist) {
    return new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uLightDir: { value: this.sunDir }, uFogColor: { value: this.scene.fog.color }, uNear: { value: viewDist * 0.75 }, uFar: { value: viewDist * 1.5 } },
      vertexShader: /* glsl */`
        varying vec3 vW; varying vec3 vN;
        void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normal; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: /* glsl */`
        uniform vec3 uZenith, uHorizon, uSunColor, uFogColor, uLightDir;
        uniform float uNear, uFar, uNight;
        varying vec3 vW; varying vec3 vN;
        float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
        void main() {
          vec3 n = normalize(vN);
          vec3 d = normalize(vW - cameraPosition);
          float dist = length(vW - cameraPosition);
          float slope = 1.0 - n.y;
          float nz = vn(vW.xz * 0.02) * 0.6 + vn(vW.xz * 0.11) * 0.4;
          // лес внизу, скалы на крутых склонах и выше, снег на вершинах
          vec3 forest = mix(vec3(0.07, 0.11, 0.05), vec3(0.13, 0.17, 0.08), nz);
          vec3 rock = mix(vec3(0.30, 0.29, 0.27), vec3(0.42, 0.40, 0.37), nz);
          vec3 snow = vec3(0.86, 0.89, 0.94);
          float rockK = clamp(smoothstep(0.35, 0.6, slope + nz * 0.2) + smoothstep(120.0, 190.0, vW.y + nz * 30.0), 0.0, 1.0);
          vec3 col = mix(forest, rock, rockK);
          float snowK = smoothstep(195.0, 235.0, vW.y + nz * 40.0) * (1.0 - smoothstep(0.55, 0.8, slope));
          col = mix(col, snow, snowK);
          // освещение: солнце + небо
          float ndl = max(dot(n, uLightDir), 0.0);
          vec3 lit = col * (uSunColor * ndl * 1.1 * (1.0 - uNight) + mix(uHorizon, uZenith, 0.5) * 0.55);
          // воздушная перспектива: чем дальше — тем больше цвета неба
          vec3 sky = mix(uHorizon, uZenith, smoothstep(0.03, 0.7, max(d.y, 0.0)));
          float air = 1.0 - exp(-dist * 0.00085);
          vec3 aerial = mix(lit, sky, clamp(0.18 + air * 0.72, 0.0, 0.92));
          gl_FragColor = vec4(mix(uFogColor, aerial, smoothstep(uNear, uFar, dist)), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
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
