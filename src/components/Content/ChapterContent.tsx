import { Chapter, ContentBlock } from '../../data/chapters';
import { Formula } from './Formula';
import { HighlightBox } from './HighlightBox';

interface ChapterContentProps {
  chapter: Chapter;
}

export function ChapterContent({ chapter }: ChapterContentProps) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{chapter.title}</h2>
        <p className="text-gray-400">{chapter.subtitle}</p>
      </div>

      {chapter.sections.map((section) => (
        <section key={section.id} className="mb-8">
          <h3 className="text-lg font-semibold text-accent-blue mb-4">
            {section.title}
          </h3>
          <div className="space-y-4">
            {section.content.map((block, index) => (
              <ContentBlockRenderer key={index} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'text':
      return (
        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
          {block.content}
        </div>
      );
    case 'formula':
      return <Formula latex={block.latex} />;
    case 'highlight':
      return <HighlightBox>{block.content}</HighlightBox>;
    case 'list':
      return (
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case 'example':
      return (
        <div className="bg-secondary p-4 rounded-lg">
          <h4 className="font-semibold text-accent-orange mb-2">{block.title}</h4>
          <p className="text-gray-300">{block.content}</p>
        </div>
      );
    default:
      return null;
  }
}