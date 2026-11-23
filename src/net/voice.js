// Голосовой чат: звук идёт напрямую между игроками (WebRTC), сервер только передаёт «рукопожатие».
// Рядом голос объёмный — слышно, с какой стороны говорит охотник, и тише с расстоянием;
// издалека — как по рации (узкая полоса частот), чтобы друзья на другом конце карты не пропадали.
const ICE = [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
  { urls: 'stun:stun.cloudflare.com:3478' },
];

export class Voice {
  // net — соединение с комнатой, sound — звук игры (берём его AudioContext)
  constructor(net, sound) {
    this.net = net;
    this.sound = sound;
    this.peers = new Map();     // id → {pc, sender, pending, nodes, level}
    this.track = null;
    this.micOn = false;         // открытый микрофон (кнопка 🎤)
    this.ptt = false;           // держит G — говорит
    this.denied = false;
    this.onChange = null;       // вызывается при смене состояния микрофона / говорящих
  }

  // я только что вошёл: звоню всем, кто уже в комнате (они ответят). Новички потом позвонят мне сами.
  callAll(ids) { for (const id of ids) if (id !== this.net.id) this._call(id); }

  _peer(id) {
    let p = this.peers.get(id);
    if (p) return p;
    const pc = new RTCPeerConnection({ iceServers: ICE });
    const tr = pc.addTransceiver('audio', { direction: 'sendrecv' });
    p = { id, pc, sender: tr.sender, pending: [], nodes: null, level: 0 };
    this.peers.set(id, p);
    if (this.track) tr.sender.replaceTrack(this.track);
    pc.onicecandidate = (e) => { if (e.candidate) this.net.send({ t: 'rtc', to: id, data: { ice: e.candidate } }); };
    pc.ontrack = (e) => this._attach(p, e.streams[0] || new MediaStream([e.track]));
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'failed') pc.restartIce?.();
    };
    return p;
  }

  async _call(id) {
    const p = this._peer(id);
    try {
      await p.pc.setLocalDescription(await p.pc.createOffer());
      this.net.send({ t: 'rtc', to: id, data: { sdp: p.pc.localDescription } });
    } catch (e) { console.warn('voice offer', e); }
  }

  async signal(from, data) {
    if (!data) return;
    const p = this._peer(from);
    try {
      if (data.sdp) {
        await p.pc.setRemoteDescription(data.sdp);
        for (const c of p.pending.splice(0)) await p.pc.addIceCandidate(c).catch(() => {});
        if (data.sdp.type === 'offer') {
          await p.pc.setLocalDescription(await p.pc.createAnswer());
          this.net.send({ t: 'rtc', to: from, data: { sdp: p.pc.localDescription } });
        }
      } else if (data.ice) {
        if (p.pc.remoteDescription) await p.pc.addIceCandidate(data.ice).catch(() => {});
        else p.pending.push(data.ice);
      }
    } catch (e) { console.warn('voice signal', e); }
  }

  // входящий голос → объёмный звук + «рация»
  _attach(p, stream) {
    // Chrome отдаёт звук WebRTC в Web Audio только если поток ещё и подключён к <audio>
    const el = new Audio();
    el.srcObject = stream; el.muted = true; el.play().catch(() => {});
    p.el = el;
    const ctx = this.sound.ctx;
    if (!ctx) { el.muted = false; return; }   // звук игры ещё не включён — просто играем как есть
    const src = ctx.createMediaStreamSource(stream);
    const near = ctx.createGain();
    const pan = ctx.createPanner();
    Object.assign(pan, { panningModel: 'HRTF', distanceModel: 'inverse', refDistance: 5, rolloffFactor: 1.1, maxDistance: 10000 });
    src.connect(near).connect(pan).connect(ctx.destination);
    // рация: полоса 400–3000 Гц, слышна тем сильнее, чем дальше охотник
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 400;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3000;
    const radio = ctx.createGain(); radio.gain.value = 0;
    src.connect(hp).connect(lp).connect(radio).connect(ctx.destination);
    const an = ctx.createAnalyser(); an.fftSize = 256;
    src.connect(an);
    p.nodes = { src, near, pan, radio, an, buf: new Uint8Array(an.fftSize) };
  }

  remove(id) {
    const p = this.peers.get(id);
    if (!p) return;
    try { p.pc.close(); } catch {}
    if (p.nodes) { try { p.nodes.src.disconnect(); } catch {} }
    if (p.el) p.el.srcObject = null;
    this.peers.delete(id);
    this.onChange?.();
  }

  // включить/выключить открытый микрофон
  async toggleMic() { return this.setMic(!this.micOn); }

  async setMic(on) {
    if (on && !(await this._ensureTrack())) return false;
    this.micOn = on;
    this._apply();
    return true;
  }

  // рация: G зажата — говорю
  async setPtt(on) {
    if (on && !(await this._ensureTrack())) return;
    this.ptt = on;
    this._apply();
  }

  async _ensureTrack() {
    if (this.track) return true;
    if (this._asking) return this._asking;
    this._asking = (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
        this.track = s.getAudioTracks()[0];
        this.track.enabled = false;
        for (const p of this.peers.values()) p.sender.replaceTrack(this.track).catch(() => {});
        this.denied = false;
        return true;
      } catch (e) {
        this.denied = true;
        this.onChange?.();
        return false;
      } finally { this._asking = null; }
    })();
    return this._asking;
  }

  get talking() { return !!this.track && (this.micOn || this.ptt); }

  _apply() {
    if (this.track) this.track.enabled = this.micOn || this.ptt;
    this.net.send({ t: 'mic', on: this.talking });
    this.onChange?.();
  }

  // каждый кадр: слушатель — камера, источники — головы охотников; posOf(id) → {x,y,z} или null
  update(camera, posOf) {
    const ctx = this.sound.ctx;
    if (!ctx || !this.peers.size) return;
    const L = ctx.listener, t = ctx.currentTime;
    const cp = camera.position;
    const f = camera.getWorldDirection(this._f ||= camera.position.clone());
    if (L.positionX) {
      L.positionX.setValueAtTime(cp.x, t); L.positionY.setValueAtTime(cp.y, t); L.positionZ.setValueAtTime(cp.z, t);
      L.forwardX.setValueAtTime(f.x, t); L.forwardY.setValueAtTime(f.y, t); L.forwardZ.setValueAtTime(f.z, t);
      L.upX.setValueAtTime(0, t); L.upY.setValueAtTime(1, t); L.upZ.setValueAtTime(0, t);
    } else { L.setPosition(cp.x, cp.y, cp.z); L.setOrientation(f.x, f.y, f.z, 0, 1, 0); }
    let speakingChanged = false;
    for (const p of this.peers.values()) {
      const n = p.nodes;
      if (!n) continue;
      const pos = posOf(p.id);
      if (pos) {
        if (n.pan.positionX) { n.pan.positionX.setValueAtTime(pos.x, t); n.pan.positionY.setValueAtTime(pos.y, t); n.pan.positionZ.setValueAtTime(pos.z, t); }
        else n.pan.setPosition(pos.x, pos.y, pos.z);
        const d = Math.hypot(pos.x - cp.x, pos.z - cp.z);
        // ближе 25 м — живой голос, дальше всё больше «рация»
        const k = Math.min(1, Math.max(0, (d - 25) / 60));
        n.radio.gain.setTargetAtTime(0.55 * k, t, 0.1);
        n.near.gain.setTargetAtTime(1 - k * 0.6, t, 0.1);
      } else { n.radio.gain.setTargetAtTime(0.55, t, 0.1); n.near.gain.setTargetAtTime(0, t, 0.1); }
      // кто сейчас говорит (по громкости)
      n.an.getByteTimeDomainData(n.buf);
      let s = 0;
      for (let i = 0; i < n.buf.length; i += 4) s = Math.max(s, Math.abs(n.buf[i] - 128));
      const was = p.level > 6;
      p.level = p.level * 0.8 + s * 0.2;
      if ((p.level > 6) !== was) speakingChanged = true;
    }
    if (speakingChanged) this.onChange?.();
  }

  speaking() { return [...this.peers.values()].filter((p) => p.level > 6).map((p) => p.id); }

  close() {
    for (const id of [...this.peers.keys()]) this.remove(id);
    if (this.track) { this.track.stop(); this.track = null; }
  }
}
