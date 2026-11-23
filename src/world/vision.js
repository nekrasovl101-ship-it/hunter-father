import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';

// Спецзрение поверх обычной картинки:
//  1 — тепловизор (white-hot): всё холодное — тёмно-серое, звери и охотники светятся белым
//      (их шейдер «меха» сам выдаёт яркое тепло, когда HEAT = 1);
//  2 — ночное видение (прицел снайперской): усиление света, зелёный люминофор, шум.
const VisionShader = {
  uniforms: { tDiffuse: { value: null }, uMode: { value: 0 }, uTime: { value: 0 }, uGain: { value: 4 } },
  vertexShader: /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform float uMode, uTime, uGain;
    varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      float n = h(vUv * 800.0 + fract(uTime * 7.0)) - 0.5;
      vec3 o = c;
      if (uMode > 0.5 && uMode < 1.5) {
        // тепловизор: холодный мир сжат в тёмно-серый диапазон, тёплые тела (l >> 1) — белые
        // холодный мир — по яркости в тёмно-сером диапазоне; тепло — только по пурпурной метке зверей/людей
        float cold = clamp(l * 0.2, 0.0, 0.24);
        float heat = min(c.r, c.b) - c.g * 3.0;
        float hot = smoothstep(0.6, 2.4, heat);
        cold *= 1.0 - smoothstep(0.2, 0.6, heat);
        float v = mix(cold, 1.0, hot) + n * 0.03;
        o = vec3(v) * vec3(0.96, 0.98, 1.0);
      } else if (uMode > 1.5) {
        // ночное видение: сильное усиление, зелёный люминофор, зерно и строки
        float v = 1.0 - exp(-l * uGain);
        v += n * 0.09;
        v *= 0.92 + 0.08 * sin(vUv.y * 900.0);
        o = vec3(0.22, 1.0, 0.32) * max(v, 0.0);
      }
      gl_FragColor = vec4(o, 1.0);
    }`,
};

export class Vision {
  // post — постобработка «Ультры» (если есть): эффект вставляется в её цепочку
  constructor(renderer, post) {
    this.renderer = renderer;
    this.mode = 0;
    if (post) {
      this.pass = new ShaderPass(VisionShader);
      this.pass.enabled = false;
      post.composer.insertPass(this.pass, 1);
      this.uniforms = this.pass.uniforms;
    } else {
      // без постобработки: рисуем сцену в текстуру и показываем её через шейдер
      const size = renderer.getDrawingBufferSize(new THREE.Vector2());
      this.rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: 4 });
      this.mat = new THREE.ShaderMaterial({
        ...VisionShader,
        uniforms: THREE.UniformsUtils.clone(VisionShader.uniforms),
        fragmentShader: VisionShader.fragmentShader.replace('gl_FragColor = vec4(o, 1.0);', 'gl_FragColor = vec4(pow(clamp(o, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);'),
        depthTest: false, depthWrite: false,
      });
      this.uniforms = this.mat.uniforms;
      this.uniforms.tDiffuse.value = this.rt.texture;   // без этого тепловизор показывал чёрный экран
      // полноэкранный треугольник (прежний квадрат в плоскости камеры отсекался — экран был чёрным)
      this.quad = new FullScreenQuad(this.mat);
    }
  }

  set(mode, gain = 4) {
    this.mode = mode;
    this.uniforms.uMode.value = mode;
    this.uniforms.uGain.value = gain;
    if (this.pass) this.pass.enabled = mode > 0;
  }

  // только для пути без постобработки, когда спецзрение включено
  render(scene, camera, dt) {
    const r = this.renderer;
    const size = r.getDrawingBufferSize(this._s || (this._s = new THREE.Vector2()));
    if (this.rt.width !== size.x || this.rt.height !== size.y) this.rt.setSize(size.x, size.y);
    this.uniforms.uTime.value += dt;
    const tm = r.toneMapping;
    r.setRenderTarget(this.rt);
    r.render(scene, camera);
    r.setRenderTarget(null);
    r.toneMapping = THREE.NoToneMapping;
    this.quad.render(r);
    r.toneMapping = tm;
  }

  tick(dt) { this.uniforms.uTime.value += dt; }
}
