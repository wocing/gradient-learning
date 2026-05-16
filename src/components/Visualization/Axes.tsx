export function Axes({ size = 3 }: { size?: number }) {
  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-size, 0, 0, size, 0, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={0xff4444} linewidth={2} />
      </line>

      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, -size, 0, 0, size, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={0x44ff44} linewidth={2} />
      </line>

      <mesh position={[size * 0.45, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={0xff4444} />
      </mesh>
      <mesh position={[0, size * 0.45, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={0x44ff44} />
      </mesh>

      <mesh position={[0, 0, size * 0.45]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={0x4444ff} />
      </mesh>

      <mesh position={[0, 0, size]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={0x4444ff} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}