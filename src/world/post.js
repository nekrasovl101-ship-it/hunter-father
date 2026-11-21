import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

// Постобработка для «Ультры»: HDR-буфер с MSAA ×4, мягкое свечение солнца и бликов,
// «киношная» цветокоррекция (контраст, тёплые света / холодные тени), виньетка и лёгкое зерно.
const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uVignette: { value: 0.32 }, uWarm: { value: 0 } },
  vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uVignette; uniform float uWarm;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      // насыщенность чуть выше, S-кривая контраста
      c = mix(vec3(l), c, 1.12);
      c = mix(c, c * c * (3.0 - 2.0 * c), 0.28);
      // тёплые света, прохладные тени
      c += mix(vec3(-0.012, 0.0, 0.018), vec3(0.018, 0.008, -0.014), smoothstep(0.15, 0.75, l));
      // закат: тёплый «киношный» тон — золотые света, сиреневые тени, насыщеннее
      float lw = dot(c, vec3(0.2126, 0.7152, 0.0722));
      vec3 warm = mix(c * vec3(0.92, 0.86, 1.08), c * vec3(1.12, 0.95, 0.82), smoothstep(0.1, 0.6, lw));
      warm = mix(vec3(lw), warm, 1.15);
      c = mix(c, warm, uWarm);
      // виньетка
      vec2 d = vUv - 0.5;
      c *= 1.0 - uVignette * smoothstep(0.25, 0.85, dot(d, d) * 2.2);
      // зерно (убирает «полосы» в небе)
      c += (hash(vUv * 1000.0 + fract(uTime)) - 0.5) * 0.012;
      gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    }`,
};

// Лучи солнца («god rays»): яркое небо вокруг солнца радиально размывается к солнцу,
// стволы и кроны его загораживают → видны световые столбы сквозь лес.
const RaysShader = {
  uniforms: { tDiffuse: { value: null }, uSun: { value: new THREE.Vector2(0.5, 0.5) }, uStrength: { value: 0 }, uTint: { value: new THREE.Color(1, 0.9, 0.7) } },
  vertexShader: GradeShader.vertexShader,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uStrength; uniform vec3 uTint;
    varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec4 base = texture2D(tDiffuse, vUv);
      if (uStrength < 0.001) { gl_FragColor = base; return; }
      vec2 d = (uSun - vUv) / 48.0 * 0.9;
      vec2 uv = vUv + d * h(vUv * 931.0);
      float acc = 0.0, w = 1.0;
      for (int i = 0; i < 48; i++) {
        vec3 c = texture2D(tDiffuse, uv).rgb;
        float l = max(dot(c, vec3(0.2126, 0.7152, 0.0722)) - 1.15, 0.0);
        acc += min(l, 4.0) * w;
        w *= 0.955; uv += d;
      }
      acc /= 48.0;
      gl_FragColor = vec4(base.rgb + uTint * acc * uStrength, base.a);
    }`,
};

export class Post {
  // lite — телефон: без MSAA, свечение в низком разрешении, меньше выборок у лучей
  constructor(renderer, scene, camera, lite = false) {
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: lite ? 0 : 4 });
    this.composer = new EffectComposer(renderer, rt);
    this.composer.addPass(new RenderPass(scene, camera));
    this.rays = new ShaderPass({ ...RaysShader, fragmentShader: lite ? RaysShader.fragmentShader.replaceAll('48', '20') : RaysShader.fragmentShader });
    this.composer.addPass(this.rays);
    this.camera = camera;
    this._sp = new THREE.Vector3();
    this._fw = new THREE.Vector3();
    this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x / (lite ? 4 : 2), size.y / (lite ? 4 : 2)), 0.22, 0.55, 0.92);
    this.lite = lite;
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.grade = new ShaderPass(GradeShader);
    this.composer.addPass(this.grade);
    this.renderer = renderer;
  }

  setSize(w, h) {
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    this.composer.setSize(w, h);
  }

  // sunDir — направление на солнце, sunColor — его цвет
  render(dt, sunDir, sunColor, k = 1, sunset = 0) {
    this.grade.uniforms.uWarm.value = sunset * 0.4;
    this.bloom.strength = 0.22 + sunset * 0.08;
    this.grade.uniforms.uTime.value += dt;
    if (sunDir) {
      const cam = this.camera;
      const p = this._sp.copy(cam.position).addScaledVector(sunDir, 1000).project(cam);
      const facing = cam.getWorldDirection(this._fw).dot(sunDir);
      const u = this.rays.uniforms;
      u.uSun.value.set(p.x * 0.5 + 0.5, p.y * 0.5 + 0.5);
      // сила лучей: солнце в кадре или рядом, сильнее у горизонта
      const onScreen = Math.max(0, 1 - Math.max(Math.abs(p.x), Math.abs(p.y)) / 1.6);
      u.uStrength.value = facing > 0 ? onScreen * Math.min(1, facing * 2) * (1.2 - sunDir.y * 0.5) * 2.2 * k : 0;
      if (sunColor) u.uTint.value.copy(sunColor);
    }
    this.composer.render(dt);
  }
}
