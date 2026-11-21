// Единый ввод: клавиатура+мышь (Pointer Lock) и сенсорное управление.
export class Input {
  constructor(canvas, touchRoot, settings) {
    this.canvas = canvas;
    this.settings = settings;
    this.move = { x: 0, y: 0 };       // x — вбок, y — вперёд
    this.look = { x: 0, y: 0 };       // накопленный сдвиг камеры (пиксели)
    this.sprint = false;
    this.aim = false;
    this.fireHeld = false;
    this._edges = new Set();          // fire, reload, jump, pause
    this.keys = new Set();
    this.enabled = false;
    this.locked = false;
    this.onLockChange = null;

    addEventListener('keydown', (e) => {
      if (e.repeat) return;
      this.keys.add(e.code);
      if (e.code === 'KeyR') this._edges.add('reload');
      if (e.code === 'Space') this._edges.add('jump');
      if (e.code === 'KeyH') this._edges.add('debug');
      if (e.code === 'KeyF' || e.code === 'KeyE') this._edges.add('use');
      if (e.code === 'KeyV' || e.code === 'KeyC') this._edges.add('view');
      if (e.code === 'KeyB') this._edges.add('binoc');
      if (e.code === 'KeyM' || e.code === 'KeyP') this._edges.add('phone');
    });
    addEventListener('keyup', (e) => this.keys.delete(e.code));
    addEventListener('blur', () => { this.keys.clear(); this.fireHeld = false; this.aim = false; });

    canvas.addEventListener('mousedown', (e) => {
      if (!this.enabled) return;
      if (!this.locked && !this.dragLook) { this.requestLock(); return; }
      if (e.button === 0) {
        // в режиме перетаскивания стреляем по «клику» (без движения), а не по нажатию
        if (this.dragLook && !this.locked) this._down = { x: e.clientX, y: e.clientY };
        else { this.fireHeld = true; this._edges.add('fire'); }
      }
      if (e.button === 2) this.aim = true;
    });
    addEventListener('mouseup', (e) => {
      if (e.button === 0 && this._down) {
        if (Math.hypot(e.clientX - this._down.x, e.clientY - this._down.y) < 6) this._edges.add('fire');
        this._down = null;
      }
      if (e.button === 0) this.fireHeld = false;
      if (e.button === 2) this.aim = false;
    });
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    addEventListener('mousemove', (e) => {
      // без Pointer Lock (например, во встроенном браузере) — обзор перетаскиванием
      if (!this.locked && !(this.dragLook && e.buttons)) return;
      this.look.x += e.movementX;
      this.look.y += e.movementY;
    });
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === canvas;
      if (!this.locked) { this.aim = false; this.fireHeld = false; }
      this.onLockChange?.(this.locked);
    });

    if (touchRoot) this._setupTouch(touchRoot);
  }

  requestLock() {
    if (this.isTouch || this.dragLook) return;
    try {
      const p = this.canvas.requestPointerLock?.();
      if (p?.catch) p.catch(() => { this.dragLook = true; });
    } catch { this.dragLook = true; }
  }

  consume(name) {
    const had = this._edges.has(name);
    this._edges.delete(name);
    return had;
  }

  // Вызывается каждый кадр: собирает клавиатурный ввод
  poll() {
    if (!this.isTouch || this.keys.size) {
      const k = this.keys;
      const x = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
      const y = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
      if (!this._joyActive) {
        const l = Math.hypot(x, y) || 1;
        this.move.x = x / l; this.move.y = y / l;
        this.sprint = k.has('ShiftLeft') || k.has('ShiftRight');
      }
      if (!this._jumpTouch) this.jumpHeld = k.has('Space');
    }
  }

  takeLook() {
    const s = this.settings.sensitivity;
    const r = { x: this.look.x * s, y: this.look.y * s };
    this.look.x = this.look.y = 0;
    return r;
  }

  _setupTouch(root) {
    this.isTouch = true;
    const joy = root.querySelector('#joy');
    const knob = root.querySelector('#joy-knob');
    const lookZone = root.querySelector('#look-zone');
    const fireBtn = root.querySelector('#btn-fire');
    const touches = new Map(); // id -> {kind, x, y, ox, oy}
    const JOY_R = 55;

    const setKnob = (dx, dy) => { knob.style.transform = `translate(${dx}px, ${dy}px)`; };

    const start = (e, kind, el) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        const rec = { kind, x: t.clientX, y: t.clientY, ox: t.clientX, oy: t.clientY };
        if (kind === 'joy') {
          const r = joy.getBoundingClientRect();
          rec.ox = r.left + r.width / 2; rec.oy = r.top + r.height / 2;
          this._joyActive = true;
        }
        touches.set(t.identifier, rec);
        if (kind === 'fire') { this.fireHeld = true; this._edges.add('fire'); el.classList.add('down'); }
        if (kind === 'joy') moveJoy(rec, t);
      }
    };
    const moveJoy = (rec, t) => {
      let dx = t.clientX - rec.ox, dy = t.clientY - rec.oy;
      const l = Math.hypot(dx, dy);
      if (l > JOY_R) { dx *= JOY_R / l; dy *= JOY_R / l; }
      setKnob(dx, dy);
      this.move.x = dx / JOY_R; this.move.y = -dy / JOY_R;
      this.sprint = l > JOY_R * 1.15;
    };
    const move = (e) => {
      for (const t of e.changedTouches) {
        const rec = touches.get(t.identifier);
        if (!rec) continue;
        e.preventDefault();
        if (rec.kind === 'joy') moveJoy(rec, t);
        else if (rec.kind === 'look' || rec.kind === 'fire') {
          // палец на кнопке выстрела тоже крутит камеру
          this.look.x += (t.clientX - rec.x) * 2.2;
          this.look.y += (t.clientY - rec.y) * 2.2;
        }
        rec.x = t.clientX; rec.y = t.clientY;
      }
    };
    const end = (e) => {
      for (const t of e.changedTouches) {
        const rec = touches.get(t.identifier);
        if (!rec) continue;
        touches.delete(t.identifier);
        if (rec.kind === 'joy') { this._joyActive = false; this.move.x = this.move.y = 0; this.sprint = false; setKnob(0, 0); }
        if (rec.kind === 'fire') { this.fireHeld = false; fireBtn.classList.remove('down'); }
      }
    };
    joy.addEventListener('touchstart', (e) => start(e, 'joy', joy), { passive: false });
    lookZone.addEventListener('touchstart', (e) => start(e, 'look', lookZone), { passive: false });
    fireBtn.addEventListener('touchstart', (e) => start(e, 'fire', fireBtn), { passive: false });
    addEventListener('touchmove', move, { passive: false });
    addEventListener('touchend', end);
    addEventListener('touchcancel', end);

    const tap = (id, fn) => root.querySelector(id).addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); fn(e.currentTarget); }, { passive: false });
    tap('#btn-aim', (el) => { this.aim = !this.aim; el.classList.toggle('on', this.aim); });
    tap('#btn-reload', () => this._edges.add('reload'));
    const jb = root.querySelector('#btn-jump');
    jb.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); this._edges.add('jump'); this.jumpHeld = true; this._jumpTouch = true; }, { passive: false });
    jb.addEventListener('touchend', () => { this.jumpHeld = false; this._jumpTouch = false; });
    tap('#btn-use', () => this._edges.add('use'));
    tap('#btn-binoc', () => this._edges.add('binoc'));
    tap('#btn-phone', () => this._edges.add('phone'));
    tap('#btn-view', () => this._edges.add('view'));
    tap('#btn-pause', () => this._edges.add('pause'));
    this.syncAimButton = () => root.querySelector('#btn-aim').classList.toggle('on', this.aim);
  }
}
