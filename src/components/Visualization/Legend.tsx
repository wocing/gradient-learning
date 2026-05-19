export function Legend() {
  return (
    <div className="absolute top-4 left-4 bg-secondary/95 backdrop-blur rounded-lg p-4 text-sm">
      <div className="text-gray-400 mb-3 font-medium border-b border-gray-600 pb-2">
        图例
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-3 rounded" style={{
            background: 'linear-gradient(to right, #4a9eff, #00c8ff, #00ffb3)'
          }} />
          <span className="text-gray-300">曲面高度</span>
          <span className="text-gray-500 text-xs ml-auto">低 → 高</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-0 h-0" style={{
            borderLeft: '8px solid #ff6b4a',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent'
          }} />
          <span className="text-gray-300">梯度向量</span>
          <span className="text-gray-500 text-xs">变化最快方向</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-0 h-0" style={{
            borderLeft: '8px solid #4a9eff',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent'
          }} />
          <span className="text-gray-300">方向向量</span>
          <span className="text-gray-500 text-xs">自定义方向</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="text-gray-300">当前点 P</span>
          <span className="text-gray-500 text-xs">曲面上的点</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600">
        <div className="text-gray-400 mb-2 text-xs">操作提示</div>
        <div className="text-gray-500 text-xs space-y-1">
          <div>🖱️ 左键拖拽：旋转视角</div>
          <div>🖱️ 右键拖拽：平移</div>
          <div>🖱️ 滚轮：缩放</div>
        </div>
      </div>
    </div>
  );
}