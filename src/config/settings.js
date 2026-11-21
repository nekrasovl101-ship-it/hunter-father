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
    terrainSeg: 320, normalMaps: true, grass: 45000, grassDist: 60,
    treeHi: 100, viewDist: 380, shadowDist: 70,
  },
  ultra: {
    label: 'Ультра', pixelRatio: 2.5, antialias: true, shadows: true, shadowMap: 4096,
    terrainSeg: 448, normalMaps: true, grass: 50000, grassDist: 50, grassFar: 60000, grassFarDist: 105,
    treeHi: 150, viewDist: 480, shadowDist: 100, softShadows: true, aniso: 16,
    hdTextures: true, post: true, grassBlades: 9, grassNear: 42000,
  },
};

export const isTouch = new URLSearchParams(location.search).has('touch') || matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

// Телефон: те же режимы и та же картинка. Отличия только там, где глаз их не видит
// (сглаживание, тени через кадр) или где Safari ограничивает видеопамять (2K — только у земли).
const MOBILE = {
  low: { pixelRatio: 1.5, msaa: true },
  medium: { pixelRatio: 2, msaa: true },
  high: { pixelRatio: 2, msaa: true, shadowEvery: 2 },
  // та же картинка, что на компьютере; отличия только незаметные глазу:
  // тени пересчитываются через кадр, 2K — только у текстур земли (лимит видеопамяти Safari)
  ultra: { pixelRatio: 2, msaa: true, shadowEvery: 2, hdTextures: 'ground', reflectScale: 0.35 },
};
export function getPreset(key) {
  const base = PRESETS[key] || PRESETS.medium;
  return { ...base, shadowEvery: 1, reflectScale: 0.4, ...(isTouch ? MOBILE[key] || {} : {}) };
}

const KEY = 'hf_settings_v1';
const defaults = {
  quality: isIOS ? 'medium' : 'high',
  timeOfDay: 'cycle',    // cycle | real | day | sunset | night
  season: 'auto',        // auto (по месяцу) | summer | autumn | winter | spring
  weather: 'auto',       // auto | clear | cloudy | rain | snow | fog
  v: 2,
  sensitivity: 1,
  showFps: true,
  nick: '',
};

export function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    // v2: новая смена дня и ночи по умолчанию
    if ((saved.v || 1) < 2) { saved.timeOfDay = 'cycle'; saved.v = 2; }
    return { ...defaults, ...saved };
  }
  catch { return { ...defaults }; }
}
export function saveSettings(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}
