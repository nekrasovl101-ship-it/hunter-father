import * as THREE from 'three';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

// Наборы PBR-текстур: <id>_albedo / _normal / _rough.
// Если tools/compress-textures.sh создал public/textures/manifest.json —
// грузим сжатые .ktx2 (Basis → ASTC/BC на GPU), иначе .jpg.
export const TEXTURE_SETS = {
  grass: 'grass004',
  meadow: 'leafy_grass',
  forest: 'forest_ground_04',
  mud: 'brown_mud_leaves_01',
  rock: 'rock_boulder_dry',
  bark: 'pine_bark',
  moss: 'moss002',
  barkBroad: 'bark_brown_02',
  logs: 'wood_trunk_wall',
  roof: 'roof_planks',
  planks: 'wood_planks',
};

const texLoader = new THREE.TextureLoader();
let ktx2 = null;
let manifest = null;

export async function initTextures(renderer) {
  try {
    const r = await fetch('textures/manifest.json');
    if (r.ok) manifest = await r.json();
  } catch {}
  if (manifest?.ktx2) {
    ktx2 = new KTX2Loader().setTranscoderPath('basis/').detectSupport(renderer);
  }
}

function loadOne(file, srgb, anisotropy) {
  const useKtx = ktx2 && manifest.ktx2.includes(file);
  const url = `textures/${file}.${useKtx ? 'ktx2' : 'jpg'}`;
  return new Promise((resolve) => {
    const done = (t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      t.anisotropy = anisotropy;
      resolve(t);
    };
    (useKtx ? ktx2 : texLoader).load(url, done, undefined, () => {
      console.warn('texture failed', url);
      const t = new THREE.DataTexture(new Uint8Array([128, 128, 255, 255]), 1, 1);
      t.needsUpdate = true;
      resolve(t);
    });
  });
}

export function loadImage(url) {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
}

export async function loadSet(key, { normal = true, anisotropy = 4 } = {}) {
  const id = TEXTURE_SETS[key];
  const [albedo, nrm, rough] = await Promise.all([
    loadOne(`${id}_albedo`, true, anisotropy),
    normal ? loadOne(`${id}_normal`, false, anisotropy) : null,
    loadOne(`${id}_rough`, false, anisotropy),
  ]);
  return { albedo, normal: nrm, rough };
}
