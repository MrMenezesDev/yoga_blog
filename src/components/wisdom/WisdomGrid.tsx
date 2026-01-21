'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { WisdomPost } from '@/types/content';

// Category config para manter consistência com a página individual
const categoryConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  conceito: { label: 'Conceito Filosófico', color: '#7c3aed', bgColor: '#ede9fe' },
  pratica: { label: 'Prática', color: '#ea580c', bgColor: '#ffedd5' },
  etica: { label: 'Ética', color: '#0284c7', bgColor: '#e0f2fe' },
  tempo: { label: 'Tempo/Ciclo', color: '#16a34a', bgColor: '#dcfce7' },
  psicologia: { label: 'Psicologia', color: '#dc2626', bgColor: '#fee2e2' },
};

interface WisdomGridProps {
  posts: WisdomPost[];
}

export default function WisdomGrid({ posts }: WisdomGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(posts.map((post) => post.frontmatter.category)));
  const filteredPosts = selectedCategory 
    ? posts.filter((post) => post.frontmatter.category === selectedCategory)
    : posts;

  return (
    <>
      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null 
              ? 'bg-orange-500 text-white border-2 border-orange-500' 
              : 'bg-white border-2 border-gray-200 hover:border-orange-300 text-gray-700'
          }`}
        >
          Todos ({posts.length})
        </button>
        {categories.map((category) => {
          const catInfo = categoryConfig[category] || categoryConfig.conceito;
          const count = posts.filter(p => p.frontmatter.category === category).length;
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive ? 'border-2' : 'bg-white border-2 border-gray-200 hover:border-orange-300'
              }`}
              style={{
                color: isActive ? '#fff' : catInfo.color,
                backgroundColor: isActive ? catInfo.color : undefined,
                borderColor: isActive ? catInfo.color : undefined,
              }}
            >
              {catInfo.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Glossary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => {
          const catInfo = categoryConfig[post.frontmatter.category] || categoryConfig.conceito;
          return (
            <article
              key={post.slug}
              className="bg-white rounded-lg border-2 border-gray-100 hover:border-orange-300 transition-all p-6 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                    {post.frontmatter.title}
                  </h2>
                  {post.frontmatter.pronunciation && (
                    <div className="text-sm italic text-gray-500">
                      /{post.frontmatter.pronunciation}/
                    </div>
                  )}
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                  style={{
                    backgroundColor: catInfo.bgColor,
                    color: catInfo.color,
                  }}
                >
                  {catInfo.label}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {post.frontmatter.definition}
              </p>

              <Link
                href={`/sabedoria/${post.slug}`}
                className="text-orange-600 font-medium hover:text-orange-700 transition-colors inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Explorar conceito completo →
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
}
