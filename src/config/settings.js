// Пресеты графики. Применяются при старте игры.
export const PRESETS = {
  low: {
    label: 'Низкая', pixelRatio: 1, antialias: false, shadows: false, shadowMap: 512,
    terrainSeg: 160, normalMaps: false, grass: 6000, grassDist: 24,
    treeHi: 40, viewDist: 190, shadowDist: 0,
  },
  medium: {
    label: 'Средняя', pixelRatio: 1.5, antialias: false, shadows: true, shadowMap: 1024,
    terrainSeg: 224, normalMaps: true, grass: 10000, grassDist: 32,
    treeHi: 65, viewDist: 270, shadowDist: 45,
  },
  high: {
    label: 'Высокая', pixelRatio: 2, antialias: true, shadows: true, shadowMap: 2048,
    terrainSeg: 320, normalMaps: true, grass: 32000, grassDist: 50,
    treeHi: 100, viewDist: 380, shadowDist: 70,
  },
};

export const isTouch = new URLSearchParams(location.search).has('touch') || matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const KEY = 'hf_settings_v1';
const defaults = {
  quality: isIOS ? 'medium' : 'high',
  timeOfDay: 'day',      // day | sunset | cycle
  sensitivity: 1,
  showFps: true,
  nick: '',
};

export function loadSettings() {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch { return { ...defaults }; }
}
export function saveSettings(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}
