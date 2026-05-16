import { useEffect, useRef } from 'react';
import katex from 'katex';

interface FormulaProps {
  latex: string;
  displayMode?: boolean;
}

export function Formula({ latex, displayMode = true }: FormulaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(latex, containerRef.current, {
        displayMode,
        throwOnError: false,
        trust: true
      });
    }
  }, [latex, displayMode]);

  return (
    <div
      ref={containerRef}
      className={`math-formula ${displayMode ? 'my-4 text-center' : 'inline-block'}`}
    />
  );
}