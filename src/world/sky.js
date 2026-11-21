import * as THREE from 'three';

// Небо, солнце, туман и освещение. t: 0 — полдень, 1 — глубокий закат.
const KEYS = [
  // t, высота солнца (рад), zenith, horizon, sun color, sun intensity, hemi sky, hemi ground, hemi int
  { t: 0.0, elev: 1.0, zen: 0x3f7fd0, hor: 0xb9d4ea, sun: 0xfff4e0, si: 2.6, hs: 0xbcd6f0, hg: 0x4a4a2a, hi: 1.0 },
  { t: 0.5, elev: 0.38, zen: 0x4a78b8, hor: 0xe6d2a8, sun: 0xffd9a0, si: 2.3, hs: 0xc8ccd8, hg: 0x4d4128, hi: 1.0 },
  { t: 1.0, elev: 0.1, zen: 0x2b3f6e, hor: 0xf08a4a, sun: 0xff9a50, si: 2.0, hs: 0xb0a0c0, hg: 0x5a4030, hi: 1.15 },
];

export class SkySystem {
  constructor(scene, preset) {
    this.scene = scene;
    this.preset = preset;
    this.t = 0;
    this.azimuth = 0.9;
    this.sunDir = new THREE.Vector3();

    this.uniforms = {
      uZenith: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
      uSunDir: { value: this.sunDir },
      uSunColor: { value: new THREE.Color() },
      uTime: { value: 0 },
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
        uniform vec3 uZenith, uHorizon, uSunDir, uSunColor;
        uniform float uTime;
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
          float s = max(dot(d, uSunDir), 0.0);
          col += uSunColor * (pow(s, 900.0) * 6.0 + pow(s, 12.0) * 0.35 + pow(s, 3.0) * 0.12);
          // облака: проекция на «потолок», дрейф по ветру
          if (d.y > 0.02) {
            vec2 cp = d.xz / (d.y + 0.08) * 1.4 + vec2(uTime * 0.012, uTime * 0.004);
            float n = fbm(cp);
            float cov = smoothstep(0.48, 0.78, n) * smoothstep(0.02, 0.25, d.y);
            float shade = fbm(cp + uSunDir.xz * 0.15);
            vec3 cloudCol = mix(uHorizon * 1.05, vec3(1.0) * 0.95 + uSunColor * 0.25, 0.55 + (n - shade) * 2.0);
            cloudCol += uSunColor * pow(s, 6.0) * 0.6;
            col = mix(col, cloudCol, cov * 0.92);
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
    this.set(0);
  }

  set(t) {
    this.t = t;
    let a = KEYS[0], b = KEYS[1];
    if (t > 0.5) { a = KEYS[1]; b = KEYS[2]; }
    const k = (t - a.t) / (b.t - a.t);
    const lerpC = (x, y) => new THREE.Color(x).lerp(new THREE.Color(y), k);
    const elev = a.elev + (b.elev - a.elev) * k;
    this.sunDir.set(Math.cos(elev) * Math.sin(this.azimuth), Math.sin(elev), Math.cos(elev) * Math.cos(this.azimuth)).normalize();
    const hor = lerpC(a.hor, b.hor);
    this.uniforms.uZenith.value.copy(lerpC(a.zen, b.zen));
    this.uniforms.uHorizon.value.copy(hor);
    const sunC = lerpC(a.sun, b.sun);
    this.uniforms.uSunColor.value.copy(sunC);
    this.sun.color.copy(sunC);
    this.sun.intensity = a.si + (b.si - a.si) * k;
    this.hemi.color.copy(lerpC(a.hs, b.hs));
    this.hemi.groundColor.copy(lerpC(a.hg, b.hg));
    this.hemi.intensity = a.hi + (b.hi - a.hi) * k;
    this.scene.fog.color.copy(hor);
    this.scene.fog.near = 20 + (1 - t) * 20;
  }

  // Материал для дальних гор: цвет неба в этом направлении (воздушная перспектива)
  farMaterial(viewDist) {
    return new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uFogColor: { value: this.scene.fog.color }, uNear: { value: viewDist * 0.9 }, uFar: { value: viewDist * 2.2 } },
      vertexShader: /* glsl */`
        varying vec3 vW; varying vec3 vN;
        void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normal; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: /* glsl */`
        uniform vec3 uZenith, uHorizon, uSunDir, uSunColor, uFogColor;
        uniform float uNear, uFar;
        varying vec3 vW; varying vec3 vN;
        void main() {
          vec3 d = normalize(vW - cameraPosition);
          float dist = length(vW - cameraPosition);
          vec3 sky = mix(uHorizon, uZenith, smoothstep(0.03, 0.7, max(d.y, 0.0)));
          float lit = 0.75 + 0.25 * max(dot(normalize(vN), uSunDir), 0.0);
          vec3 haze = sky * mix(0.72, 0.9, smoothstep(uNear, uFar * 1.5, dist)) * lit;
          vec3 col = mix(uFogColor, haze, smoothstep(uNear, uFar, dist));
          gl_FragColor = vec4(col, 1.0);
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
