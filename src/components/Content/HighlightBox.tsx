interface HighlightBoxProps {
  children: React.ReactNode;
}

export function HighlightBox({ children }: HighlightBoxProps) {
  return (
    <div className="my-4 p-4 bg-secondary rounded-lg border-l-4 border-accent-blue">
      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}