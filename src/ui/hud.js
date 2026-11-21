import { MAG_SIZE } from '../player/gun.js';

const $ = (s) => document.querySelector(s);

export class Hud {
  constructor() {
    this.el = $('#hud');
    this.ammo = $('#ammo');
    this.score = $('#score');
    this.fps = $('#fps');
    this.msg = $('#messages');
    this.scope = $('#scope');
    this.cross = $('#crosshair');
    this.hitmark = $('#hitmark');
    this.compass = $('#compass-strip');
    this.frames = 0; this.acc = 0;
    this._buildCompass();
  }

  _buildCompass() {
    const marks = ['С', '', 'СВ', '', 'В', '', 'ЮВ', '', 'Ю', '', 'ЮЗ', '', 'З', '', 'СЗ', ''];
    let html = '';
    for (let r = 0; r < 3; r++) for (let i = 0; i < 16; i++) {
      html += `<span class="${marks[i] ? 'major' : ''}">${marks[i] || '·'}</span>`;
    }
    this.compass.innerHTML = html;
  }

  show(v) { this.el.classList.toggle('hidden', !v); }

  update(dt, { gun, yaw, score, kills, showFps }) {
    const bullets = '▮'.repeat(gun.ammo) + '▯'.repeat(MAG_SIZE - gun.ammo);
    const state = gun.state === 'reloading' ? ' <small>перезарядка…</small>' : '';
    this.ammo.innerHTML = `<b>${bullets}</b> <span>${gun.reserve}</span>${state}`;
    this.score.innerHTML = `Добыча: <b>${kills}</b> · Очки: <b>${score}</b>`;
    this.scope.classList.toggle('on', gun.aimT > 0.92);
    this.cross.style.opacity = gun.aimT > 0.5 ? 0 : 1;
    // компас: yaw=0 — смотрим на север (-Z)
    let deg = ((-yaw * 180) / Math.PI) % 360;
    if (deg < 0) deg += 360;
    const cell = 40; // px на 22.5°
    this.compass.style.transform = `translateX(${-(16 * cell + (deg / 22.5) * cell) + this.compass.parentElement.clientWidth / 2 - cell / 2}px)`;

    this.frames++; this.acc += dt;
    if (this.acc > 0.5) {
      this.fps.textContent = showFps ? `${Math.round(this.frames / this.acc)} fps` : '';
      this.frames = 0; this.acc = 0;
    }
  }

  message(text, cls = '') {
    const d = document.createElement('div');
    d.className = 'msg ' + cls;
    d.innerHTML = text;
    this.msg.appendChild(d);
    setTimeout(() => d.classList.add('out'), 2600);
    setTimeout(() => d.remove(), 3200);
  }

  hitMarker(kill) {
    this.hitmark.className = kill ? 'kill' : 'hit';
    void this.hitmark.offsetWidth;
    this.hitmark.classList.add('show');
  }
}
