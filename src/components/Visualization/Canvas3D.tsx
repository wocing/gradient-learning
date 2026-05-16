import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Surface } from './Surface';
import { GradientVector, DirectionVector } from './Vectors';
import { PointMarker } from './PointMarker';
import { Axes } from './Axes';
import { GroundGrid } from './GroundGrid';
import { Legend } from './Legend';
import { surfaceFunctions, computeGradient, computeDirectionalDerivative } from '../../utils/math';
import { COLORS } from '../../utils/colors';
import { useMemo } from 'react';

interface Canvas3DProps {
  selectedFunctionId: string;
  point: { x: number; y: number };
  direction: { x: number; y: number };
  showGradient: boolean;
  showDirection: boolean;
  showTangentPlane: boolean;
}

export function Canvas3D({
  selectedFunctionId,
  point,
  direction,
  showGradient,
  showDirection
}: Canvas3DProps) {
  const surfaceFn = useMemo(() => {
    const found = surfaceFunctions.find(f => f.id === selectedFunctionId);
    return found ? found.fn : surfaceFunctions[0].fn;
  }, [selectedFunctionId]);

  const currentFunction = useMemo(() => {
    return surfaceFunctions.find(f => f.id === selectedFunctionId) || surfaceFunctions[0];
  }, [selectedFunctionId]);

  const gradient = useMemo(() => {
    return computeGradient(surfaceFn, point.x, point.y);
  }, [surfaceFn, point.x, point.y]);

  const pointZ = useMemo(() => {
    return surfaceFn(point.x, point.y);
  }, [surfaceFn, point.x, point.y]);

  const directionalDerivative = useMemo(() => {
    return computeDirectionalDerivative(gradient, { x: direction.x, y: direction.y, z: 0 });
  }, [gradient, direction.x, direction.y]);

  const gradientMagnitude = useMemo(() => {
    return Math.sqrt(gradient.x ** 2 + gradient.y ** 2);
  }, [gradient]);

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="bg-primary/95 backdrop-blur px-6 py-4 border-b border-gray-600 flex items-center justify-center gap-8">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-accent-blue/20 rounded-lg border border-accent-blue/40">
            <span className="text-accent-blue text-sm font-medium">当前函数</span>
          </div>
          <div className="text-white font-mono text-2xl tracking-wide">
            <span className="text-accent-blue">z</span>
            <span className="text-gray-400 mx-2">=</span>
            <span className="text-white font-semibold">{currentFunction.name.replace('z = ', '')}</span>
          </div>
        </div>
        <div className="h-10 w-px bg-gray-600" />
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-gray-700/50 rounded-lg border border-gray-600/40">
            <span className="text-gray-400 text-sm">定义域</span>
          </div>
          <span className="text-gray-300 font-mono">x ∈ [-2, 2], y ∈ [-2, 2]</span>
        </div>
      </div>

      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [6, 5, 6], fov: 45 }}
          className="w-full h-full"
        >
          <color attach="background" args={['#1a1f35']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />

          <GroundGrid size={4} divisions={16} />
          <Axes size={3} />
          <Surface surfaceFn={surfaceFn} />

          <PointMarker position={[point.x, pointZ, point.y]} color={COLORS.point} />

          {showGradient && (
            <GradientVector
              origin={[point.x, pointZ, point.y]}
              direction={gradient}
            />
          )}

          {showDirection && (
            <DirectionVector
              origin={[point.x, pointZ, point.y]}
              direction={{ x: direction.x, y: direction.y, z: 0 }}
              color={COLORS.direction}
            />
          )}

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={4}
            maxDistance={15}
          />
        </Canvas>

        <Legend />

        <div className="absolute bottom-4 left-4 bg-secondary/90 backdrop-blur rounded-lg p-4 text-sm" style={{ marginTop: '180px' }}>
          <div className="text-gray-400 mb-2">当前计算</div>
          <div className="space-y-1 text-gray-300">
            <div>点 P({point.x.toFixed(2)}, {point.y.toFixed(2)}, {pointZ.toFixed(2)})</div>
            <div>梯度 ∇f = ({gradient.x.toFixed(3)}, {gradient.y.toFixed(3)})</div>
            <div>|∇f| = {gradientMagnitude.toFixed(3)}</div>
            {showDirection && (
              <div className="text-accent-blue">
                方向导数 = {directionalDerivative.toFixed(3)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}