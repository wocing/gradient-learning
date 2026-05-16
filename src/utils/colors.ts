export function getColorByHeight(z: number, zMin: number, zMax: number): string {
  const normalized = (z - zMin) / (zMax - zMin);
  const r = Math.floor(74 + normalized * (0 - 74));
  const g = Math.floor(158 + normalized * (200 - 158));
  const b = Math.floor(255 + normalized * (255 - 255));
  return `rgb(${r}, ${g}, ${b})`;
}

export function getColorForGradient(gradientMagnitude: number): string {
  const intensity = Math.min(gradientMagnitude / 5, 1);
  const r = Math.floor(255 * intensity);
  const g = Math.floor(107 * (1 - intensity * 0.5));
  const b = Math.floor(74 * (1 - intensity));
  return `rgb(${r}, ${g}, ${b})`;
}

export const COLORS = {
  gradient: 0xff6b4a,
  direction: 0x4a9eff,
  tangentPlane: 0x8b5cf6,
  point: 0xffd700,
  surface: 0x4a9eff,
  contour: 0xffffff
} as const;