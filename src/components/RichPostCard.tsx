import Link from 'next/link';
import { Calendar, MessageCircle, Flame, Brain, Heart, BookOpen, Layers, Search } from 'lucide-react';

interface RichPostCardProps {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  sanskrit?: string;
  sanskritMeaning?: string;
  comments?: number;
}

const categoryConfig = {
  'Filosofia': {
    color: '#9333ea',
    bgColor: '#f3e8ff',
    icon: Brain,
  },
  'Prática': {
    color: '#ea580c',
    bgColor: '#ffedd5',
    icon: Flame,
  },
  'Insight': {
    color: '#16a34a',
    bgColor: '#dcfce7',
    icon: Heart,
  },
  'Estudo': {
    color: '#0284c7',
    bgColor: '#e0f2fe',
    icon: BookOpen,
  },
  'Debate Filosófico': {
    color: '#7c3aed',
    bgColor: '#ede9fe',
    icon: Layers,
  },
  'Diário de Mandala': {
    color: '#dc2626',
    bgColor: '#fee2e2',
    icon: Flame,
  },
  'Estudo Profundo': {
    color: '#0284c7',
    bgColor: '#e0f2fe',
    icon: Search,
  },
  'Psicanálise & Yoga': {
    color: '#7c3aed',
    bgColor: '#ede9fe',
    icon: Brain,
  },
  'Jñana Yoga': {
    color: '#9333ea',
    bgColor: '#f3e8ff',
    icon: Brain,
  },
  'Karma Yoga & Relações': {
    color: '#ea580c',
    bgColor: '#ffedd5',
    icon: Heart,
  },
  'Metodologia': {
    color: '#64748b',
    bgColor: '#f1f5f9',
    icon: Layers,
  },
  'Estudo Causal': {
    color: '#0284c7',
    bgColor: '#e0f2fe',
    icon: Search,
  },
  'Ética Yóguica': {
    color: '#16a34a',
    bgColor: '#dcfce7',
    icon: Heart,
  },
  'Marco Energetico': {
    color: '#dc2626',
    bgColor: '#fee2e2',
    icon: Flame,
  },
  'Síntese Pessoal': {
    color: '#9333ea',
    bgColor: '#f3e8ff',
    icon: Brain,
  },
  'Insight Final': {
    color: '#16a34a',
    bgColor: '#dcfce7',
    icon: Heart,
  },
  'Psicanálise & Tantra': {
    color: '#7c3aed',
    bgColor: '#ede9fe',
    icon: Brain,
  },
};

export default function RichPostCard({
  slug,
  title,
  date,
  category,
  excerpt,
  sanskrit,
  sanskritMeaning,
  comments = 0,
}: RichPostCardProps) {
  const config = categoryConfig[category as keyof typeof categoryConfig] || {
    color: '#64748b',
    bgColor: '#f1f5f9',
    icon: BookOpen,
  };
  
  const Icon = config.icon;

  return (
    <Link href={`/${slug}`} className="block mb-8 md:mb-10">
      <article
        className="bg-white p-6 md:p-8 transition-transform hover:translate-x-1 cursor-pointer"
        style={{
          borderLeft: `4px solid ${config.color}`,
          boxShadow: 'var(--shadow-editorial-md)',
        }}
      >
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="px-3 py-1 rounded-full flex items-center gap-1.5"
            style={{ backgroundColor: config.bgColor }}
          >
            <Icon size={14} style={{ color: config.color }} />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: config.color, fontFamily: 'var(--font-sans)' }}
            >
              {category}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
          style={{ fontFamily: 'var(--font-serif)', color: '#2D2420' }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p
          className="text-base leading-loose mb-4"
          style={{ fontFamily: 'var(--font-serif)', color: '#44403C' }}
        >
          {excerpt}
        </p>

        {/* Sanskrit Term Box */}
        {sanskrit && (
          <div
            className="bg-stone-50 p-4 mb-4 border-l-2"
            style={{ borderLeftColor: config.color }}
          >
            <div className="flex items-baseline gap-2">
              <span
                className="text-xs font-bold uppercase tracking-wider text-stone-600"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Termo Chave:
              </span>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-serif)', color: config.color }}
              >
                {sanskrit}
              </span>
            </div>
            {sanskritMeaning && (
              <p
                className="text-sm mt-1 text-stone-600"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {sanskritMeaning}
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div
          className="flex items-center gap-4 text-sm text-stone-500 pt-3 border-t border-stone-200"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          {comments > 0 && (
            <div className="flex items-center gap-1.5">
              <MessageCircle size={14} />
              <span>{comments} comentários</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
