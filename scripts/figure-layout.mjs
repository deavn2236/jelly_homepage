import { media } from '../content/media.mjs';

export function figureInfo(figure) {
  const src = figure.video || figure.src || figure.image;
  const info = media.videos[src] || media.images[src] || {};
  return { ...info, ratio: info.width && info.height ? info.width / info.height : 16 / 9 };
}

// Explicit row names preserve editorial groupings. Other rows pair compatible
// neighboring media; extreme ratios retain a full row and their original shape.
export function figureRows(section) {
  const figures = section.figures || [];
  if (section.layout === 'equipment' && figures.length === 2) return [figures];
  const rows = [];
  for (let index = 0; index < figures.length;) {
    const current = figures[index];
    const next = figures[index + 1];
    const full = section.layout === 'full' || section.id === 'method' || current.layout === 'full';
    if (full || !next) { rows.push([current]); index++; continue; }
    if (current.row) {
      const pair = next.row === current.row && next.layout !== 'full';
      rows.push(pair ? [current, next] : [current]); index += pair ? 2 : 1; continue;
    }
    const a = figureInfo(current).ratio;
    const z = figureInfo(next).ratio;
    const compatible = !next.row && next.layout !== 'full' &&
      Boolean(current.video) === Boolean(next.video) &&
      a >= .75 && a < 2.3 && z >= .75 && z < 2.3 &&
      Math.max(a, z) / Math.min(a, z) <= 1.3;
    rows.push(compatible ? [current, next] : [current]);
    index += compatible ? 2 : 1;
  }
  return rows;
}

export function figureWidth(figure) {
  if (Number.isInteger(figure.displayWidth) && figure.displayWidth >= 200 && figure.displayWidth <= 1600) return figure.displayWidth;
  const ratio = figureInfo(figure).ratio;
  if (figure.role === 'main') return Math.round(Math.min(560, 340 * ratio));
  if (figure.role === 'sensor') return Math.round(Math.min(220, 180 * ratio));
  if (figure.video && ratio < .75) return 360;
  if (ratio >= 2.3) return 1040;
  return figure.video ? 820 : 900;
}
