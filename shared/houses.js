// Планировка домов (общая для клиента и сервера): стены с проёмами под дверь и окна,
// мебель. Координаты локальные: X — вдоль фасада, Z — вглубь (+Z — фасад с дверью), Y — от пола.
import { SITE_SIZE } from './terrain.js';

export const WALL_T = 0.32;
export const WIN = { w: 0.95, y0: 1.1, y1: 2.0 };

export function houseLayout(type) {
  const [w, d] = SITE_SIZE[type];
  const isShed = type === 'shed';
  const H = isShed ? 2.6 : type === 'lodge' ? 3.3 : 3.0;
  const t = WALL_T;
  const door = { x: isShed ? 0 : -w * 0.22, w: isShed ? 1.8 : 1.0, h: 2.1 };
  // окна: [сторона, позиция вдоль стены]
  const windows = isShed ? [] : [['front', w * 0.22], ['back', -w * 0.2], ['back', w * 0.2], ['left', 0], ['right', 0]];
  if (type === 'lodge') windows.push(['front', w * 0.42 - 0.35], ['left', -d * 0.25]);

  // стена вдоль оси → набор коробок {lx, lz, hw, hd, y0, y1}
  const walls = [];
  const wall = (side, holes) => {
    const alongX = side === 'front' || side === 'back';
    const len = alongX ? w : d - 2 * t;
    const off = side === 'front' ? d / 2 - t / 2 : side === 'back' ? -d / 2 + t / 2 : side === 'right' ? w / 2 - t / 2 : -w / 2 + t / 2;
    const seg = (a, b, y0, y1) => {
      if (b - a < 0.01 || y1 - y0 < 0.01) return;
      const c = (a + b) / 2, h = (b - a) / 2;
      walls.push(alongX ? { lx: c, lz: off, hw: h, hd: t / 2, y0, y1, side } : { lx: off, lz: c, hw: t / 2, hd: h, y0, y1, side });
    };
    holes.sort((p, q) => p.a - q.a);
    let cur = -len / 2;
    for (const hl of holes) {
      seg(cur, hl.a, 0, H);
      seg(hl.a, hl.b, 0, hl.y0);
      seg(hl.a, hl.b, hl.y1, H);
      cur = hl.b;
    }
    seg(cur, len / 2, 0, H);
  };
  for (const side of ['front', 'back', 'left', 'right']) {
    const holes = windows.filter(([s]) => s === side).map(([, p]) => ({ a: p - WIN.w / 2, b: p + WIN.w / 2, y0: WIN.y0, y1: WIN.y1 }));
    if (side === 'front') holes.push({ a: door.x - door.w / 2, b: door.x + door.w / 2, y0: 0, y1: door.h });
    wall(side, holes);
  }

  // мебель: {kind, lx, lz, hw, hd, h, rot}
  const furniture = [];
  if (!isShed) {
    furniture.push({ kind: 'stove', lx: w / 2 - 1.0, lz: -d * 0.2, hw: 0.45, hd: 0.45, h: 1.1 });
    furniture.push({ kind: 'bed', lx: -w / 2 + 1.25, lz: -d / 2 + 1.0, hw: 0.95, hd: 0.5, h: 0.55 });
    furniture.push({ kind: 'table', lx: 0.2, lz: 0.1, hw: 0.75, hd: 0.45, h: 0.78 });
    furniture.push({ kind: 'bench', lx: 0.2, lz: 0.85, hw: 0.7, hd: 0.17, h: 0.45 });
    furniture.push({ kind: 'bench', lx: 0.2, lz: -0.65, hw: 0.7, hd: 0.17, h: 0.45 });
    furniture.push({ kind: 'shelf', lx: w / 2 - t - 0.2, lz: d * 0.22, hw: 0.2, hd: 0.6, h: 1.8 });
    furniture.push({ kind: 'chest', lx: -w / 2 + t + 0.4, lz: d / 2 - t - 0.9, hw: 0.3, hd: 0.45, h: 0.5 });
    if (type === 'lodge') {
      furniture.push({ kind: 'bed', lx: -w / 2 + 1.25, lz: -d / 2 + 2.2, hw: 0.95, hd: 0.5, h: 0.55 });
      furniture.push({ kind: 'rack', lx: 0, lz: -d / 2 + t + 0.12, hw: 0.8, hd: 0.08, h: 1.6 });
      furniture.push({ kind: 'table', lx: w * 0.28, lz: d * 0.18, hw: 0.6, hd: 0.6, h: 0.78 });
    }
  } else {
    furniture.push({ kind: 'crates', lx: -w / 2 + 0.6, lz: -d / 2 + 0.6, hw: 0.4, hd: 0.4, h: 0.8 });
  }
  return { w, d, H, t, door, windows, walls, furniture, isShed };
}
