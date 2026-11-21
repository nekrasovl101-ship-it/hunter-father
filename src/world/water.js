import * as THREE from 'three';
import { HALF, WORLD_SIZE, WATER_LEVEL, RIVER_HALF, riverX } from '../../shared/terrain.js';

// Река. На всех пресетах: волны, френель, блик солнца, прозрачность по глубине (видно дно
// на мелководье), пена у берега. На «Ультре» — настоящее зеркальное отражение мира
// (отдельный рендер сцены из «отражённой» камеры) с искажением волнами.
export function createWater(heightTex, preset) {
  const pts = [];
  const idx = [];
  const W = RIVER_HALF + 6;
  let row = 0;
  for (let z = -HALF * 1.6; z <= HALF * 1.6; z += 4, row++) {
    const cx = riverX(z);
    pts.push(cx - W, WATER_LEVEL, z, cx + W, WATER_LEVEL, z);
    if (row > 0) {
      const a = (row - 1) * 2, b = a + 1, c = a + 2, d = a + 3;
      idx.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  geo.setIndex(idx);

  const reflect = !!preset.post;
  const mat = createWaterMaterial(heightTex, preset, false);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 2;
  if (reflect) mesh.mirror = new Mirror([mat], WATER_LEVEL, preset.reflectScale);
  return mesh;
}

// Материал воды: river — река (течение, пена, прозрачность по глубине),
// puddle — лужа (стоячая вода, круги от капель, мутноватая, мягкий край).
export function createWaterMaterial(heightTex, preset, puddle) {
  // у луж без своего зеркала («Ультра для телефона») — отражение цвета неба
  const reflect = !!preset.post && (!puddle || preset.puddleMirror !== false);
  const defines = {};
  if (reflect) defines.USE_REFLECT = '';
  if (puddle) defines.PUDDLE = '';
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    fog: true,
    defines,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: { value: 0 },
        uSunDir: { value: new THREE.Vector3(0, 1, 0) },
        uSunColor: { value: new THREE.Color(1, 1, 1) },
        uSkyColor: { value: new THREE.Color(0.6, 0.75, 0.9) },
        uDeep: { value: new THREE.Color(0x0b2420) },
        uShallow: { value: new THREE.Color(0x4a6a52) },
        uHeight: { value: null },
        uHalf: { value: HALF },
        uWorld: { value: WORLD_SIZE },
        tReflect: { value: null },
        uTexMatrix: { value: new THREE.Matrix4() },
        uRain: { value: 0 },
        uMask: { value: null },
      },
    ]),
    vertexShader: /* glsl */`
      #include <common>
      #include <fog_pars_vertex>
      uniform mat4 uTexMatrix;
      varying vec3 vWorld;
      varying vec4 vRefl;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        vRefl = uTexMatrix * wp;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: /* glsl */`
      #include <common>
      #include <fog_pars_fragment>
      uniform float uTime, uHalf, uWorld, uRain;
      uniform vec3 uSunDir, uSunColor, uSkyColor, uDeep, uShallow;
      uniform sampler2D uHeight;
      #ifdef PUDDLE
      uniform sampler2D uMask;
      #endif
      #ifdef USE_REFLECT
      uniform sampler2D tReflect;
      #endif
      varying vec3 vWorld;
      varying vec4 vRefl;
      float h2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h2(i), h2(i + vec2(1, 0)), f.x), mix(h2(i + vec2(0, 1)), h2(i + vec2(1, 1)), f.x), f.y); }
      // наклон поверхности: длинные волны + рябь, всё сносится течением
      vec2 slope(vec2 p) {
        vec2 g = vec2(0.0);
        g += vec2(0.6, 0.8) * cos(dot(p, vec2(0.6, 0.8)) * 1.3 + uTime * 1.7) * 0.08;
        g += vec2(-0.7, 0.5) * cos(dot(p, vec2(-0.7, 0.5)) * 2.7 + uTime * 2.3) * 0.05;
        g += vec2(0.2, -0.9) * cos(dot(p, vec2(0.2, -0.9)) * 5.1 + uTime * 3.1) * 0.03;
        vec2 q = p * 3.2 + vec2(0.0, -uTime * 1.6);
        float e = 0.08;
        float n0 = vn(q) + 0.5 * vn(q * 2.3 + 7.0);
        g += vec2(vn(q + vec2(e, 0.0)) + 0.5 * vn((q + vec2(e, 0.0)) * 2.3 + 7.0) - n0,
                  vn(q + vec2(0.0, e)) + 0.5 * vn((q + vec2(0.0, e)) * 2.3 + 7.0) - n0) / e * 0.018;
        return g;
      }
      void main() {
        vec2 p = vWorld.xz;
        #ifndef PUDDLE
        p.y -= uTime * 1.2; // течение
        vec2 g = slope(p);
        #else
        vec2 g = slope(p * 1.7) * 0.25;   // в луже вода стоит: только лёгкая рябь от ветра
        // круги от капель дождя
        for (int L = 0; L < 2; L++) {
          vec2 q = vWorld.xz * (2.2 + float(L) * 1.3) + float(L) * 17.0;
          vec2 cell = floor(q);
          vec2 f = fract(q) - 0.5 - (vec2(h2(cell), h2(cell + 9.1)) - 0.5) * 0.5;
          float ph = fract(uTime * (1.1 + h2(cell + 3.3) * 0.6) + h2(cell + 5.7));
          float r = length(f);
          float ring = exp(-pow((r - ph * 0.42) * 28.0, 2.0)) * (1.0 - ph) * step(h2(cell + 7.7), uRain * 0.9);
          g += f / max(r, 1e-3) * ring * 0.5;
        }
        #endif
        vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
        vec3 v = normalize(cameraPosition - vWorld);
        float ndv = max(dot(n, v), 0.0);
        float fres = 0.02 + 0.98 * pow(1.0 - ndv, 5.0);

        // глубина по карте высот рельефа: мелко — прозрачно и светлее, глубоко — тёмная вода
        float bed = texture2D(uHeight, clamp((vWorld.xz + uHalf) / uWorld, 0.0, 1.0)).r;
        float depth = max(vWorld.y - bed, 0.0);
        #ifdef PUDDLE
        // мелкая мутноватая вода: дно почти не видно уже через 10–15 см
        float dk = smoothstep(0.0, 0.12, depth);
        vec3 body = mix(vec3(0.09, 0.075, 0.05), vec3(0.025, 0.022, 0.018), dk);
        #else
        float dk = smoothstep(0.0, 1.2, depth);
        vec3 body = mix(uShallow, uDeep, dk);
        #endif

        #ifdef USE_REFLECT
        vec4 rc = vRefl; rc.xy += g * 0.45 * rc.w;
        vec3 refl = texture2DProj(tReflect, rc).rgb;
        #else
        vec3 refl = uSkyColor;
        #endif
        vec3 h = normalize(uSunDir + v);
        float spec = pow(max(dot(n, h), 0.0), 400.0) * 6.0 + pow(max(dot(n, h), 0.0), 60.0) * 0.25;
        vec3 col = mix(body, refl, clamp(fres + 0.08, 0.0, 1.0)) + uSunColor * spec;
        // пена и блики у берега
        #ifdef PUDDLE
        float foam = 0.0;
        #else
        float foam = (1.0 - smoothstep(0.02, 0.14, depth)) * smoothstep(0.55, 0.9, vn(p * 2.5 + uTime * 0.3) + vn(p * 6.0) * 0.4);
        #endif
        col = mix(col, vec3(0.85, 0.88, 0.86), foam * 0.35);
        #ifdef PUDDLE
        // мягкий край лужи: у самой кромки вода тонкая и прозрачная
        // край лужи — по карте луж с рваным шумом (а не по клеткам), плюс там, где земля выходит из воды
        float m = texture2D(uMask, (vWorld.xz + uHalf) / uWorld).r + (vn(vWorld.xz * 1.1) - 0.5) * 0.35 + (vn(vWorld.xz * 4.0) - 0.5) * 0.12;
        float edge = smoothstep(0.24, 0.34, m);
        float alpha = (mix(0.35, 0.96, dk) + fres * 0.4) * smoothstep(0.0, 0.025, depth) * edge;
        if (alpha < 0.01) discard;
        #else
        float alpha = mix(0.25, 0.94, dk) + fres * 0.4 + foam * 0.5;
        #endif
        gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,
  });
  mat.uniforms.uHeight.value = heightTex;
  return mat;
}

// Планарное отражение относительно плоскости воды (по мотивам three/examples Reflector)
export class Mirror {
  constructor(mats, level, scale = 0.4) {
    this.mats = mats;
    this.scale = scale;
    this.level = level;
    this.rt = new THREE.WebGLRenderTarget(512, 512, { type: THREE.HalfFloatType });
    this.cam = new THREE.PerspectiveCamera();
    for (const m of mats) m.uniforms.tReflect.value = this.rt.texture;
    this._plane = new THREE.Plane();
    this._clip = new THREE.Vector4();
    this._q = new THREE.Vector4();
    this._v = new THREE.Vector3();
    this._t = new THREE.Vector3();
    this._look = new THREE.Vector3();
  }

  // hide: объекты, которых не должно быть в отражении (трава, вода, ружьё)
  render(renderer, scene, camera, hide) {
    const size = renderer.getDrawingBufferSize(this._size || (this._size = new THREE.Vector2()));
    const w = Math.round(size.x * this.scale), h = Math.round(size.y * this.scale);
    if (this.rt.width !== w || this.rt.height !== h) this.rt.setSize(w, h);
    const L = this.level;
    if (camera.position.y < L) return;

    const cam = this.cam;
    // позиция и направление взгляда, отражённые относительно y = WATER_LEVEL
    cam.position.copy(camera.position); cam.position.y = 2 * L - cam.position.y;
    camera.getWorldDirection(this._v);
    this._look.copy(camera.position).add(this._v); this._look.y = 2 * L - this._look.y;
    cam.up.set(0, 1, 0).applyQuaternion(camera.quaternion); cam.up.y *= -1;
    cam.lookAt(this._look);
    cam.near = camera.near; cam.far = camera.far; cam.fov = camera.fov; cam.aspect = camera.aspect;
    cam.updateMatrixWorld();
    cam.updateProjectionMatrix();

    // матрица для выборки текстуры в шейдере воды
    const tm = this.mats[0].uniforms.uTexMatrix.value;
    tm.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    tm.multiply(cam.projectionMatrix).multiply(cam.matrixWorldInverse);
    for (const m of this.mats) if (m.uniforms.uTexMatrix.value !== tm) m.uniforms.uTexMatrix.value.copy(tm);

    // наклонная плоскость отсечения: в отражение не попадает то, что под водой
    this._plane.setFromNormalAndCoplanarPoint(this._t.set(0, 1, 0), this._v.set(0, L, 0));
    this._plane.applyMatrix4(cam.matrixWorldInverse);
    this._clip.set(this._plane.normal.x, this._plane.normal.y, this._plane.normal.z, this._plane.constant);
    const pm = cam.projectionMatrix, q = this._q;
    q.x = (Math.sign(this._clip.x) + pm.elements[8]) / pm.elements[0];
    q.y = (Math.sign(this._clip.y) + pm.elements[9]) / pm.elements[5];
    q.z = -1.0;
    q.w = (1.0 + pm.elements[10]) / pm.elements[14];
    this._clip.multiplyScalar(2.0 / this._clip.dot(q));
    pm.elements[2] = this._clip.x; pm.elements[6] = this._clip.y;
    pm.elements[10] = this._clip.z + 1.0 - 0.003; pm.elements[14] = this._clip.w;

    const vis = hide.map((o) => o.visible);
    for (const o of hide) o.visible = false;
    const prevRT = renderer.getRenderTarget();
    const prevShadow = renderer.shadowMap.autoUpdate;
    renderer.shadowMap.autoUpdate = false;
    renderer.setRenderTarget(this.rt);
    renderer.clear();
    renderer.render(scene, cam);
    renderer.setRenderTarget(prevRT);
    renderer.shadowMap.autoUpdate = prevShadow;
    hide.forEach((o, i) => { o.visible = vis[i]; });
  }
}
