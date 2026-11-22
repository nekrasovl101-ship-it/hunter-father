import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';

// Сцена рисуется ОДИН раз в буфер со сглаживанием ×4, дальше эффекты работают с обычными
// (несглаженными) буферами. Раньше сглаживание ×4 было на всех промежуточных буферах —
// каждый эффект переписывал картинку ×4, и это съедало ~70% времени кадра.
class MSAARenderPass extends Pass {
  constructor(scene, camera, samples = 4) {
    super();
    Object.assign(this, { scene, camera });
    this.needsSwap = false;
    this.msaa = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples });
    this.quad = new FullScreenQuad(new THREE.ShaderMaterial({ ...CopyShader, uniforms: THREE.UniformsUtils.clone(CopyShader.uniforms), depthTest: false, depthWrite: false }));
  }
  setSize(w, h) { this.msaa.setSize(w, h); }
  render(renderer, writeBuffer, readBuffer) {
    renderer.setRenderTarget(this.msaa);
    renderer.clear();
    renderer.render(this.scene, this.camera);
    this.quad.material.uniforms.tDiffuse.value = this.msaa.texture;
    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    this.quad.render(renderer);
  }
}

// Постобработка для «Ультры»: HDR-буфер с MSAA ×4, мягкое свечение солнца и бликов,
// «киношная» цветокоррекция (контраст, тёплые света / холодные тени), виньетка и лёгкое зерно.
const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uVignette: { value: 0.32 }, uWarm: { value: 0 } },
  vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uVignette; uniform float uWarm;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    // ACES (как у OutputPass) + перевод в sRGB — в этом же проходе, без отдельного прохода по экрану
    vec3 acesFilmic(vec3 color) {
      const mat3 ACESInputMat = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383), vec3(0.04823, 0.01566, 0.83777));
      const mat3 ACESOutputMat = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276), vec3(-0.07367, -0.00605, 1.07602));
      color *= 1.0 / 0.6;
      color = ACESInputMat * color;
      vec3 a = color * (color + 0.0245786) - 0.000090537;
      vec3 b = color * (0.983729 * color + 0.4329510) + 0.238081;
      color = ACESOutputMat * (a / b);
      return clamp(color, 0.0, 1.0);
    }
    vec3 toSRGB(vec3 c) { return mix(c * 12.92, pow(c, vec3(0.41666)) * 1.055 - 0.055, step(0.0031308, c)); }
    void main(){
      vec3 c = toSRGB(acesFilmic(texture2D(tDiffuse, vUv).rgb));
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
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType });
    this.composer = new EffectComposer(renderer, rt);
    // Retina (2× и выше): пиксели крошечные — вместо дорогого MSAA×4 (~16 мс на кадр) сглаживаем
    // края умным SMAA в конце (~2 мс). На обычных мониторах — MSAA×4, как было.
    this.retina = renderer.getPixelRatio() >= 1.9;
    this.composer.addPass(new MSAARenderPass(scene, camera, this.retina ? 0 : 4));
    this.rays = new ShaderPass({ ...RaysShader, fragmentShader: RaysShader.fragmentShader.replaceAll('48', lite ? '14' : '24').replace('w *= 0.955;', lite ? 'w *= 0.92;' : 'w *= 0.915;') });
    this.composer.addPass(this.rays);
    this.camera = camera;
    this._sp = new THREE.Vector3();
    this._fw = new THREE.Vector3();
    // свечение размытое по природе — считаем в 1/4 разрешения (на вид то же, в 4 раза дешевле)
    this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.22, 0.55, 0.92);
    // композер задаёт полный размер, а свечение само делит на 2 — делим ещё на 2
    const bloomSetSize = this.bloom.setSize.bind(this.bloom);
    this.bloom.setSize = (w, h) => bloomSetSize(Math.max(2, Math.round(w / 2)), Math.max(2, Math.round(h / 2)));
    this.lite = lite;
    this.composer.addPass(this.bloom);
    this.grade = new ShaderPass(GradeShader);   // тонировка ACES + цвет + виньетка — один проход
    this.composer.addPass(this.grade);
    if (this.retina) this.composer.addPass(new SMAAPass(size.x, size.y));
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
      this.rays.enabled = u.uStrength.value > 0.002;   // солнца нет в кадре — проход не нужен
      if (sunColor) u.uTint.value.copy(sunColor);
    }
    this.composer.render(dt);
  }
}
