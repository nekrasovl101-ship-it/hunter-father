// Общие константы сетевого протокола (клиент ↔ сервер)
import { SPECIES } from './animals.js';
import { SITES, SITE_SIZE } from './terrain.js';

export const MAX_PLAYERS = 8;
export const TICK_MS = 100;               // сервер: 10 тиков/с
export const SEND_MS = 100;               // клиент шлёт своё состояние 10 раз/с
export const SPECIES_IDS = Object.keys(SPECIES);
export const ANIMS = ['idle', 'walk', 'run', 'eat', 'death', 'attack'];
export const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const CODE_LEN = 5;

// Машины в каждой комнате (позиции у базы)
const base = SITES[0];
export const ROOM_VEHICLES = [
  { id: 1, key: 'rover', x: base.x + 8, z: 15, heading: Math.PI },
  { id: 2, key: 'pickup', x: base.x + 17, z: 16, heading: Math.PI },
  { id: 3, key: 'rover', x: base.x + 26, z: 17, heading: Math.PI },
  { id: 4, key: 'pickup', x: base.x + 2, z: 11, heading: Math.PI },
  ...[[0, 'pickup'], [2, 'rover'], [3, 'pickup'], [4, 'rover'], [6, 'pickup'], [7, 'rover']].map(([n, key], i) => {
    // машины у дальних хуторов — сбоку от дома
    const s = SITES.filter((q) => q.type !== 'shed' && q !== base)[n];
    const [w] = SITE_SIZE[s.type];
    const lx = w / 2 + 3.5, lz = 1.5;
    return { id: 5 + i, key, x: s.x + lx * Math.cos(s.rot) + lz * Math.sin(s.rot), z: s.z - lx * Math.sin(s.rot) + lz * Math.cos(s.rot), heading: s.rot };
  }),
];

export const r1 = (v) => Math.round(v * 10) / 10;
export const r2 = (v) => Math.round(v * 100) / 100;

export function cleanNick(s) {
  return String(s || '').replace(/[<>&"'`]/g, '').trim().slice(0, 16) || 'Охотник';
}
