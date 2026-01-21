'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  containerSelector?: string;
}

export default function TableOfContents({
  containerSelector = '.prose',
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const headingElements = container.querySelectorAll('h2, h3');
    const items: TocItem[] = Array.from(headingElements).map((heading) => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1)),
    }));

    // Ensure headings have IDs
    headingElements.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = items[index].id;
      }
    });

    setHeadings(items);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [containerSelector]);

  if (headings.length === 0) return null;

  return (
    <nav className="fixed right-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-50 to-white border-l border-blue-200 overflow-y-auto p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
        Neste Artigo
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${
              heading.level === 3 ? 'ml-4' : ''
            }`}
          >
            <a
              href={`#${heading.id}`}
              className={`
                block text-sm py-1 border-l-2 pl-3 transition-all duration-200
                ${
                  activeId === heading.id
                    ? 'border-orange-500 text-orange-700 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
