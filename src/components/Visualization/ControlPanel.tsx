import { useState } from 'react';
import { surfaceFunctions } from '../../utils/math';

interface ControlPanelProps {
  selectedFunctionId: string;
  onFunctionChange: (id: string) => void;
  point: { x: number; y: number };
  onPointChange: (point: { x: number; y: number }) => void;
  direction: { x: number; y: number };
  onDirectionChange: (direction: { x: number; y: number }) => void;
  showGradient: boolean;
  onShowGradientChange: (show: boolean) => void;
  showDirection: boolean;
  onShowDirectionChange: (show: boolean) => void;
}

export function ControlPanel({
  selectedFunctionId,
  onFunctionChange,
  point,
  onPointChange,
  direction,
  onDirectionChange,
  showGradient,
  onShowGradientChange,
  showDirection,
  onShowDirectionChange
}: ControlPanelProps) {
  const [xInput, setXInput] = useState(point.x.toFixed(2));
  const [yInput, setYInput] = useState(point.y.toFixed(2));

  const handleXChange = (value: string) => {
    setXInput(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= -2 && num <= 2) {
      onPointChange({ x: num, y: point.y });
    }
  };

  const handleYChange = (value: string) => {
    setYInput(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= -2 && num <= 2) {
      onPointChange({ x: point.x, y: num });
    }
  };

  const angle = Math.atan2(direction.y, direction.x) * (180 / Math.PI);

  return (
    <div className="bg-secondary/90 backdrop-blur rounded-lg p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          选择函数
        </label>
        <div className="space-y-2">
          {surfaceFunctions.map((fn) => (
            <label
              key={fn.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="surface"
                checked={selectedFunctionId === fn.id}
                onChange={() => onFunctionChange(fn.id)}
                className="w-4 h-4 accent-accent-blue"
              />
              <span className="text-gray-300 text-sm">{fn.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          点 P 坐标
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm w-6">x =</span>
            <input
              type="number"
              min="-2"
              max="2"
              step="0.1"
              value={xInput}
              onChange={(e) => handleXChange(e.target.value)}
              onBlur={() => setXInput(point.x.toFixed(2))}
              className="flex-1 bg-primary border border-gray-600 rounded px-3 py-1.5 text-gray-300 text-sm focus:border-accent-blue focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm w-6">y =</span>
            <input
              type="number"
              min="-2"
              max="2"
              step="0.1"
              value={yInput}
              onChange={(e) => handleYChange(e.target.value)}
              onBlur={() => setYInput(point.y.toFixed(2))}
              className="flex-1 bg-primary border border-gray-600 rounded px-3 py-1.5 text-gray-300 text-sm focus:border-accent-blue focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          方向向量角度 θ
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="-180"
            max="180"
            step="5"
            value={angle}
            onChange={(e) => {
              const rad = parseFloat(e.target.value) * (Math.PI / 180);
              onDirectionChange({
                x: Math.cos(rad),
                y: Math.sin(rad)
              });
            }}
            className="flex-1 accent-accent-blue"
          />
          <span className="text-gray-300 text-sm w-14 text-right">
            {angle.toFixed(0)}°
          </span>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          显示选项
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showGradient}
              onChange={(e) => onShowGradientChange(e.target.checked)}
              className="w-4 h-4 accent-accent-orange"
            />
            <span className="text-gray-300 text-sm">
              <span className="text-accent-orange">■</span> 梯度向量
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showDirection}
              onChange={(e) => onShowDirectionChange(e.target.checked)}
              className="w-4 h-4 accent-accent-blue"
            />
            <span className="text-gray-300 text-sm">
              <span className="text-accent-blue">■</span> 方向向量
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}