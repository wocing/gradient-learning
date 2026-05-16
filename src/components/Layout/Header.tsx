import { chapters } from '../../data/chapters';

interface HeaderProps {
  currentChapter: string;
  onChapterChange: (chapterId: string) => void;
}

export function Header({ currentChapter, onChapterChange }: HeaderProps) {
  return (
    <header className="h-14 bg-secondary flex items-center px-6 border-b border-gray-700">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-white">
          梯度与方向向量
        </h1>
        <nav className="flex gap-1">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onChapterChange(chapter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentChapter === chapter.id
                  ? 'bg-accent-blue text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {chapter.title}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}