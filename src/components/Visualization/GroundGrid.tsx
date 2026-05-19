import * as THREE from 'three';

interface GroundGridProps {
  size?: number;
  divisions?: number;
}

export function GroundGrid({ size = 4, divisions = 20 }: GroundGridProps) {
  const gridHelper = new THREE.GridHelper(size, divisions, 0x444466, 0x333355);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          color={0x1a1f35}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      <primitive object={gridHelper} />
    </group>
  );
}