export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export type SurfaceFunction = (x: number, y: number) => number;

export const surfaceFunctions: { id: string; name: string; fn: SurfaceFunction }[] = [
  {
    id: 'paraboloid',
    name: 'z = x² + y²',
    fn: (x, y) => x * x + y * y
  },
  {
    id: 'saddle',
    name: 'z = x² - y²',
    fn: (x, y) => x * x - y * y
  },
  {
    id: 'sin-cos',
    name: 'z = sin(x) · cos(y)',
    fn: (x, y) => Math.sin(x) * Math.cos(y)
  },
  {
    id: 'gaussian',
    name: 'z = e^(-x²-y²)',
    fn: (x, y) => Math.exp(-x * x - y * y)
  }
];

export function computePartialDerivative(
  fn: SurfaceFunction,
  x: number,
  y: number,
  h: number = 0.0001
): { fx: number; fy: number } {
  const fx = (fn(x + h, y) - fn(x - h, y)) / (2 * h);
  const fy = (fn(x, y + h) - fn(x, y - h)) / (2 * h);
  return { fx, fy };
}

export function computeGradient(
  fn: SurfaceFunction,
  x: number,
  y: number
): Vector3D {
  const { fx, fy } = computePartialDerivative(fn, x, y);
  return { x: fx, y: fy, z: 0 };
}

export function computeDirectionalDerivative(
  gradient: Vector3D,
  direction: Vector3D
): number {
  const norm = Math.sqrt(direction.x ** 2 + direction.y ** 2);
  if (norm === 0) return 0;
  const normalized = {
    x: direction.x / norm,
    y: direction.y / norm,
    z: 0
  };
  return gradient.x * normalized.x + gradient.y * normalized.y;
}

export function computeTangentPlane(
  fn: SurfaceFunction,
  x: number,
  y: number
): { a: number; b: number; c: number } {
  const { fx, fy } = computePartialDerivative(fn, x, y);
  const z = fn(x, y);
  return {
    a: fx,
    b: fy,
    c: z - fx * x - fy * y
  };
}

export function generateSurfacePoints(
  fn: SurfaceFunction,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  resolution: number
): Point3D[] {
  const points: Point3D[] = [];
  const stepX = (xMax - xMin) / resolution;
  const stepY = (yMax - yMin) / resolution;

  for (let i = 0; i <= resolution; i++) {
    for (let j = 0; j <= resolution; j++) {
      const x = xMin + i * stepX;
      const y = yMin + j * stepY;
      const z = fn(x, y);
      points.push({ x, y, z });
    }
  }
  return points;
}

export function generateContourLines(
  fn: SurfaceFunction,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  levels: number[],
  resolution: number = 50
): { level: number; points: Point3D[] }[] {
  const stepX = (xMax - xMin) / resolution;
  const stepY = (yMax - yMin) / resolution;
  const result: { level: number; points: Point3D[] }[] = [];

  for (const level of levels) {
    const points: Point3D[] = [];
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const x1 = xMin + i * stepX;
        const y1 = yMin + j * stepY;
        const x2 = x1 + stepX;
        const y2 = y1 + stepY;

        const z1 = fn(x1, y1);
        const z2 = fn(x2, y1);
        const z3 = fn(x2, y2);
        const z4 = fn(x1, y2);

        const edges: { x: number; y: number; z: number }[] = [];
        if ((z1 <= level && z2 > level) || (z1 > level && z2 <= level)) {
          const t = (level - z1) / (z2 - z1);
          edges.push({ x: x1 + t * stepX, y: y1, z: level });
        }
        if ((z2 <= level && z3 > level) || (z2 > level && z3 <= level)) {
          const t = (level - z2) / (z3 - z2);
          edges.push({ x: x2, y: y1 + t * stepY, z: level });
        }
        if ((z3 <= level && z4 > level) || (z3 > level && z4 <= level)) {
          const t = (level - z3) / (z4 - z3);
          edges.push({ x: x2 - t * stepX, y: y2, z: level });
        }
        if ((z4 <= level && z1 > level) || (z4 > level && z1 <= level)) {
          const t = (level - z4) / (z1 - z4);
          edges.push({ x: x1, y: y2 - t * stepY, z: level });
        }

        if (edges.length >= 2) {
          points.push(...edges.slice(0, 2) as Point3D[]);
        }
      }
    }
    result.push({ level, points });
  }

  return result;
}