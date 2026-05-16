import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SurfaceFunction, generateSurfacePoints } from '../../utils/math';

interface SurfaceProps {
  surfaceFn: SurfaceFunction;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  resolution?: number;
}

export function Surface({
  surfaceFn,
  xMin = -2,
  xMax = 2,
  yMin = -2,
  yMax = 2,
  resolution = 40
}: SurfaceProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points = generateSurfacePoints(surfaceFn, xMin, xMax, yMin, yMax, resolution);
    const vertices: number[] = [];
    const colors: number[] = [];

    let zMin = Infinity;
    let zMax = -Infinity;

    for (const p of points) {
      if (p.z < zMin) zMin = p.z;
      if (p.z > zMax) zMax = p.z;
    }

    const range = zMax - zMin || 1;

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const idx = i * (resolution + 1) + j;
        const p0 = points[idx];
        const p1 = points[idx + 1];
        const p2 = points[idx + resolution + 1];
        const p3 = points[idx + resolution + 2];

        vertices.push(p0.x, p0.z, p0.y);
        vertices.push(p1.x, p1.z, p1.y);
        vertices.push(p2.x, p2.z, p2.y);

        vertices.push(p1.x, p1.z, p1.y);
        vertices.push(p3.x, p3.z, p3.y);
        vertices.push(p2.x, p2.z, p2.y);

        const normalize = (z: number) => (z - zMin) / range;

        for (let k = 0; k < 6; k++) {
          const z = [p0, p1, p2, p1, p3, p2][k].z;
          const t = normalize(z);
          const r = Math.floor(0 + t * (255 - 0));
          const g = Math.floor(100 + t * (200 - 100));
          const b = Math.floor(200 + t * (255 - 200));
          colors.push(r / 255, g / 255, b / 255);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    return geo;
  }, [surfaceFn, xMin, xMax, yMin, yMax, resolution]);

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhongMaterial
          vertexColors
          side={THREE.DoubleSide}
          transparent={false}
          opacity={1}
          wireframe={false}
          shininess={80}
          specular={0x444444}
        />
      </mesh>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color={0x000000} transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}