import { useState, useMemo } from 'react';
import { Header } from './components/Layout/Header';
import { ChapterContent } from './components/Content/ChapterContent';
import { Canvas3D } from './components/Visualization/Canvas3D';
import { ControlPanel } from './components/Visualization/ControlPanel';
import { chapters } from './data/chapters';

function App() {
  const [currentChapterId, setCurrentChapterId] = useState('introduction');
  const [selectedFunctionId, setSelectedFunctionId] = useState('paraboloid');
  const [point, setPoint] = useState({ x: 0.5, y: 0.5 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [showGradient, setShowGradient] = useState(true);
  const [showDirection, setShowDirection] = useState(true);

  const currentChapter = useMemo(() => {
    return chapters.find(c => c.id === currentChapterId) || chapters[0];
  }, [currentChapterId]);

  return (
    <div className="w-full h-full flex flex-col bg-primary">
      <Header
        currentChapter={currentChapterId}
        onChapterChange={setCurrentChapterId}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 h-full flex flex-col">
          <div className="flex-1">
            <Canvas3D
              selectedFunctionId={selectedFunctionId}
              point={point}
              direction={direction}
              showGradient={showGradient}
              showDirection={showDirection}
              showTangentPlane={false}
            />
          </div>
          <div className="h-64 overflow-y-auto p-4 border-t border-gray-700">
            <ControlPanel
              selectedFunctionId={selectedFunctionId}
              onFunctionChange={setSelectedFunctionId}
              point={point}
              onPointChange={setPoint}
              direction={direction}
              onDirectionChange={setDirection}
              showGradient={showGradient}
              onShowGradientChange={setShowGradient}
              showDirection={showDirection}
              onShowDirectionChange={setShowDirection}
            />
          </div>
        </div>

        <div className="w-1/2 h-full bg-secondary border-l border-gray-700">
          <ChapterContent chapter={currentChapter} />
        </div>
      </div>
    </div>
  );
}

export default App;