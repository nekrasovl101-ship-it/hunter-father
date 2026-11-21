import * as THREE from 'three';
import { HALF, WATER_LEVEL, RIVER_HALF, riverX } from '../../shared/terrain.js';

// Полоса воды вдоль русла (дешевле, чем плоскость на всю карту)
export function createWater() {
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

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: { value: 0 },
        uSunDir: { value: new THREE.Vector3(0, 1, 0) },
        uSunColor: { value: new THREE.Color(1, 1, 1) },
        uSkyColor: { value: new THREE.Color(0.6, 0.75, 0.9) },
        uDeep: { value: new THREE.Color(0x0e2a2a) },
      },
    ]),
    vertexShader: /* glsl */`
      #include <common>
      #include <fog_pars_vertex>
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: /* glsl */`
      #include <common>
      #include <fog_pars_fragment>
      uniform float uTime;
      uniform vec3 uSunDir, uSunColor, uSkyColor, uDeep;
      varying vec3 vWorld;
      float wave(vec2 p, vec2 d, float f, float s) { return sin(dot(p, d) * f + uTime * s); }
      void main() {
        vec2 p = vWorld.xz;
        p.y -= uTime * 1.2; // течение
        float e = 0.05;
        vec2 grad = vec2(0.0);
        grad += vec2(0.6, 0.8) * cos(dot(p, vec2(0.6, 0.8)) * 1.3 + uTime * 1.7) * 0.10;
        grad += vec2(-0.7, 0.5) * cos(dot(p, vec2(-0.7, 0.5)) * 2.7 + uTime * 2.3) * 0.06;
        grad += vec2(0.2, -0.9) * cos(dot(p, vec2(0.2, -0.9)) * 5.1 + uTime * 3.1) * 0.035;
        vec3 n = normalize(vec3(-grad.x, 1.0, -grad.y));
        vec3 v = normalize(cameraPosition - vWorld);
        float fres = pow(1.0 - max(dot(n, v), 0.0), 4.0) * 0.85 + 0.12;
        vec3 h = normalize(uSunDir + v);
        float spec = pow(max(dot(n, h), 0.0), 180.0) * 2.5;
        vec3 col = mix(uDeep, uSkyColor, fres) + uSunColor * spec;
        gl_FragColor = vec4(col, 0.82 + fres * 0.15);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 2;
  return mesh;
}
