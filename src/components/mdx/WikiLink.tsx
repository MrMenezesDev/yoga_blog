'use client';

import { useState, useRef, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface WikiLinkProps {
  term: string;
  children: React.ReactNode;
  definition?: string;
  devanagari?: string;
  category?: 'sanskrit' | 'psychoanalysis' | 'yoga' | 'general';
}

const categoryColors = {
  sanskrit: 'border-orange-500 bg-orange-50',
  psychoanalysis: 'border-purple-500 bg-purple-50',
  yoga: 'border-blue-500 bg-blue-50',
  general: 'border-gray-500 bg-gray-50',
};

export default function WikiLink({
  term,
  children,
  definition,
  devanagari,
  category = 'general',
}: WikiLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const linkRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && linkRef.current && popoverRef.current) {
      const linkRect = linkRef.current.getBoundingClientRect();
      const popoverHeight = popoverRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - linkRect.bottom;
      
      // If not enough space below, show above
      setPosition(spaceBelow < popoverHeight + 20 ? 'top' : 'bottom');
    }
  }, [isHovered]);

  return (
    <span className="relative inline-block">
      <span
        ref={linkRef}
        className="text-orange-600 underline decoration-dotted cursor-help hover:text-orange-700 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>

      {isHovered && (
        <div
          ref={popoverRef}
          className={`
            absolute z-50 w-80 p-4 rounded-lg shadow-xl border-2
            ${categoryColors[category]}
            ${position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'}
            left-1/2 transform -translate-x-1/2
            animate-in fade-in slide-in-from-top-2 duration-200
          `}
        >
          {/* Arrow */}
          <div
            className={`
              absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45
              ${position === 'bottom' ? '-top-1.5' : '-bottom-1.5'}
              ${categoryColors[category].split(' ')[1]}
              border-l-2 border-t-2
              ${categoryColors[category].split(' ')[0]}
            `}
          />

          <div className="relative">
            <div className="flex items-start gap-2 mb-2">
              <BookOpen className="w-4 h-4 mt-1 flex-shrink-0 text-gray-600" />
              <div>
                {devanagari && (
                  <div className="text-2xl font-serif text-gray-900 mb-1">
                    {devanagari}
                  </div>
                )}
                <h4 className="font-bold text-gray-900 text-lg">{term}</h4>
              </div>
            </div>

            {definition && (
              <p className="text-sm text-gray-700 leading-relaxed">
                {definition}
              </p>
            )}

            <div className="mt-3 pt-3 border-t border-gray-300">
              <a
                href={`/sabedoria/${term.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium"
              >
                Ver definição completa →
              </a>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}
