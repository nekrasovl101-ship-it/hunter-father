// Процедурный звук на Web Audio (без файлов): выстрел с эхом леса, затвор,
// перезарядка, шаги и фон (ветер + птицы).
export class Sound {
  constructor() {
    this.ctx = null;
  }

  // Должно вызываться из обработчика клика/тача (требование iOS)
  unlock() {
    if (this.ctx) { this.ctx.resume(); return; }
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    const ctx = (this.ctx = new C());
    this.master = ctx.createGain();
    this.master.gain.value = 0.8;
    this.master.connect(ctx.destination);
    // эхо
    this.echo = ctx.createDelay(2);
    this.echo.delayTime.value = 0.42;
    const fb = ctx.createGain(); fb.gain.value = 0.32;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
    this.echo.connect(lp); lp.connect(fb); fb.connect(this.echo); lp.connect(this.master);
    this.noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    this._ambient();
  }

  _noise(dur, { freq = 1000, q = 0.7, type = 'lowpass', gain = 1, attack = 0.002, decay = dur, when = 0, echo = 0, dest } = {}) {
    const ctx = this.ctx; if (!ctx) return;
    const t = ctx.currentTime + when;
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    src.connect(f); f.connect(g); g.connect(dest || this.master);
    if (echo) { const e = ctx.createGain(); e.gain.value = echo; g.connect(e); e.connect(this.echo); }
    src.start(t, Math.random()); src.stop(t + dur + 0.05);
    return f;
  }

  // distance — для чужих выстрелов (онлайн)
  // тихий «тинь» — пришло сообщение в чат
  chatPing() {
    const ctx = this.ctx; if (!ctx) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(880, t); o.frequency.setValueAtTime(1320, t + 0.07);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.06, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    o.connect(g).connect(this.master); o.start(t); o.stop(t + 0.3);
  }

  shot(distance = 0) {
    const ctx = this.ctx; if (!ctx) return;
    const v = 1 / (1 + distance / 40);
    const dist = Math.min(1, distance / 300);
    const f = this._noise(1.4, { freq: 5200 - dist * 4000, gain: 1.6 * v, decay: 0.9, echo: 0.6 });
    if (f) f.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.5);
    // низкий «удар»
    const t = ctx.currentTime;
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(38, t + 0.25);
    const g = ctx.createGain(); g.gain.setValueAtTime(1.2 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + 0.4);
  }

  click(when = 0, freq = 3000, gain = 0.35) {
    this._noise(0.05, { freq, q: 3, type: 'bandpass', gain, decay: 0.04, when });
  }
  bolt() { this.click(0.05, 1800, 0.5); this.click(0.22, 2600, 0.45); this.click(0.42, 1500, 0.5); }
  reloadRound(i) { this.click(i * 0.42 + 0.3, 2200, 0.4); this.click(i * 0.42 + 0.38, 1200, 0.3); }
  dry() { this.click(0, 4000, 0.3); }
  step(water) {
    this._noise(0.15, { freq: water ? 900 : 500, q: 0.6, gain: water ? 0.22 : 0.12, decay: 0.12 });
  }
  hit() { this._noise(0.12, { freq: 300, q: 1, gain: 0.5, decay: 0.1, when: 0.08 }); }

  // Двигатель: две «пилы» через фильтр, высота от оборотов
  engineStart() {
    const ctx = this.ctx; if (!ctx || this.eng) return;
    const g = ctx.createGain(); g.gain.value = 0;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 600; f.Q.value = 2;
    const o1 = ctx.createOscillator(); o1.type = 'sawtooth';
    const o2 = ctx.createOscillator(); o2.type = 'square';
    o1.connect(f); o2.connect(f); f.connect(g); g.connect(this.master);
    o1.start(); o2.start();
    this.eng = { g, f, o1, o2 };
    g.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.4);
    this.click(0, 900, 0.5); this.click(0.08, 700, 0.4);
  }
  engineUpdate(rpm, throttle) {
    if (!this.eng) return;
    const t = this.ctx.currentTime;
    const base = 38 + rpm * 120;
    this.eng.o1.frequency.setTargetAtTime(base, t, 0.08);
    this.eng.o2.frequency.setTargetAtTime(base * 0.5 + 1.5, t, 0.08);
    this.eng.f.frequency.setTargetAtTime(350 + rpm * 900 + Math.abs(throttle) * 500, t, 0.1);
    this.eng.g.gain.setTargetAtTime(0.06 + Math.abs(throttle) * 0.05 + rpm * 0.04, t, 0.1);
  }
  engineStop() {
    if (!this.eng) return;
    const { g, o1, o2 } = this.eng;
    g.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15);
    setTimeout(() => { o1.stop(); o2.stop(); }, 800);
    this.eng = null;
  }
  crash(k) { this._noise(0.5, { freq: 700, q: 0.5, gain: Math.min(1.2, 0.3 + k * 0.06), decay: 0.4 }); }
  bite() { this._noise(0.15, { freq: 1600, q: 2, type: 'bandpass', gain: 0.6, decay: 0.12 }); this._noise(0.3, { freq: 300, gain: 0.5, decay: 0.25, when: 0.03 }); }

  // шаг по луже: всплеск (шлепок + брызги) и пара капель
  splashStep() {
    if (!this.ctx) return;
    this._noise(0.09, { freq: 420, q: 0.8, gain: 0.32, decay: 0.07 });
    this._noise(0.22, { freq: 2600, q: 0.9, type: 'bandpass', gain: 0.28 + Math.random() * 0.1, decay: 0.18, when: 0.015 });
    this._noise(0.12, { freq: 5200, q: 1.2, type: 'bandpass', gain: 0.08, decay: 0.1, when: 0.05 });
    const ctx = this.ctx, t = ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const o = ctx.createOscillator(); o.type = 'sine';
      const s = t + 0.06 + i * 0.07 + Math.random() * 0.05, f = 900 + Math.random() * 700;
      o.frequency.setValueAtTime(f, s); o.frequency.exponentialRampToValueAtTime(f * 1.8, s + 0.04);
      const g = ctx.createGain(); g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(0.05, s + 0.005); g.gain.exponentialRampToValueAtTime(0.0005, s + 0.06);
      o.connect(g); g.connect(this.master); o.start(s); o.stop(s + 0.07);
    }
  }

  // шум дождя: громкость 0..1
  rain(level) {
    const ctx = this.ctx;
    if (!ctx || !this.noiseBuf) return;
    if (!this._rain) {
      const src = ctx.createBufferSource(); src.buffer = this.noiseBuf; src.loop = true;
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 900;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 7000;
      const g = ctx.createGain(); g.gain.value = 0;
      src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(this.master); src.start();
      this._rain = g;
    }
    this._rain.gain.setTargetAtTime(level * 0.22, ctx.currentTime, 0.5);
  }

  _ambient() {
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuf; src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 380;
    const g = ctx.createGain(); g.gain.value = 0.05;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
    const lg = ctx.createGain(); lg.gain.value = 0.035;
    lfo.connect(lg); lg.connect(g.gain); lfo.start();
    src.connect(f); f.connect(g); g.connect(this.master); src.start();
    const bird = () => {
      const t = ctx.currentTime;
      const n = 2 + Math.floor(Math.random() * 4);
      const base = 2200 + Math.random() * 2200;
      for (let i = 0; i < n; i++) {
        const o = ctx.createOscillator(); o.type = 'sine';
        const s = t + i * (0.12 + Math.random() * 0.08);
        o.frequency.setValueAtTime(base, s);
        o.frequency.exponentialRampToValueAtTime(base * (0.7 + Math.random() * 0.8), s + 0.09);
        const gg = ctx.createGain();
        gg.gain.setValueAtTime(0, s); gg.gain.linearRampToValueAtTime(0.025, s + 0.02); gg.gain.linearRampToValueAtTime(0, s + 0.1);
        o.connect(gg); gg.connect(this.master); o.start(s); o.stop(s + 0.12);
      }
      setTimeout(bird, 2500 + Math.random() * 7000);
    };
    setTimeout(bird, 3000);
  }
}
