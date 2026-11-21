import * as THREE from 'three';

// Пыль/щепки в месте попадания пули: один Points-объект с пулом частиц
export class Impacts {
  constructor(scene) {
    this.N = 120;
    this.pos = new Float32Array(this.N * 3);
    this.vel = new Float32Array(this.N * 3);
    this.life = new Float32Array(this.N);
    this.col = new Float32Array(this.N * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    this.points = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false }));
    this.points.frustumCulled = false;
    scene.add(this.points);
    this.i = 0;
  }

  spawn(p, color = 0x6b5a40, n = 14) {
    const c = new THREE.Color(color);
    for (let k = 0; k < n; k++) {
      const i = this.i++ % this.N;
      this.pos.set([p.x, p.y, p.z], i * 3);
      this.vel.set([(Math.random() - 0.5) * 3, Math.random() * 3 + 1, (Math.random() - 0.5) * 3], i * 3);
      this.col.set([c.r, c.g, c.b], i * 3);
      this.life[i] = 0.6 + Math.random() * 0.4;
    }
    this.points.geometry.attributes.color.needsUpdate = true;
  }

  update(dt) {
    for (let i = 0; i < this.N; i++) {
      if (this.life[i] <= 0) { this.pos[i * 3 + 1] = -1e4; continue; }
      this.life[i] -= dt;
      this.vel[i * 3 + 1] -= 9 * dt;
      for (let a = 0; a < 3; a++) this.pos[i * 3 + a] += this.vel[i * 3 + a] * dt;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
  }
}
