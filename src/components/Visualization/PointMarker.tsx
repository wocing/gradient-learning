interface PointMarkerProps {
  position: [number, number, number];
  color?: number;
  size?: number;
}

export function PointMarker({
  position,
  color = 0xffd700,
  size = 0.15
}: PointMarkerProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}