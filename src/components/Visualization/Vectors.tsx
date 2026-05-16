import { useRef } from 'react';
import { Vector3 } from 'three';
import * as THREE from 'three';
import { COLORS } from '../../utils/colors';

interface GradientVectorProps {
  origin: [number, number, number];
  direction: { x: number; y: number; z: number };
  scale?: number;
}

export function GradientVector({ origin, direction, scale = 0.5 }: GradientVectorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);
  const normalizedDir = {
    x: direction.x / magnitude,
    y: direction.y / magnitude,
    z: direction.z / magnitude
  };

  return (
    <group ref={groupRef} position={origin}>
      <arrowHelper
        args={[
          new Vector3(normalizedDir.x, normalizedDir.z, normalizedDir.y),
          new Vector3(0, 0, 0),
          magnitude * scale,
          COLORS.gradient,
          0.3,
          0.15
        ]}
      />
    </group>
  );
}

interface DirectionVectorProps {
  origin: [number, number, number];
  direction: { x: number; y: number; z: number };
  color?: number;
  scale?: number;
}

export function DirectionVector({
  origin,
  direction,
  color = COLORS.direction,
  scale = 0.5
}: DirectionVectorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);

  if (magnitude === 0) return null;

  const normalizedDir = {
    x: direction.x / magnitude,
    y: direction.y / magnitude,
    z: direction.z / magnitude
  };

  return (
    <group ref={groupRef} position={origin}>
      <arrowHelper
        args={[
          new Vector3(normalizedDir.x, normalizedDir.z, normalizedDir.y),
          new Vector3(0, 0, 0),
          magnitude * scale,
          color,
          0.3,
          0.15
        ]}
      />
    </group>
  );
}