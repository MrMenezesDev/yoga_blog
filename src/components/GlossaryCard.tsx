import { Brain, Heart, Sparkles, Shield } from 'lucide-react';

interface GlossaryCardProps {
  term: string;
  sanskrit: string;
  definition: string;
  category: 'philosophy' | 'practice' | 'ethics' | 'insight';
}

const categoryConfig = {
  philosophy: {
    color: '#9333ea',
    bgColor: '#f3e8ff',
    icon: Brain,
    label: 'Filosofia'
  },
  practice: {
    color: '#ea580c',
    bgColor: '#ffedd5',
    icon: Sparkles,
    label: 'Prática'
  },
  ethics: {
    color: '#16a34a',
    bgColor: '#dcfce7',
    icon: Shield,
    label: 'Ética'
  },
  insight: {
    color: '#0284c7',
    bgColor: '#e0f2fe',
    icon: Heart,
    label: 'Insight'
  }
};

export default function GlossaryCard({ term, sanskrit, definition, category }: GlossaryCardProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <article
      className="p-6 transition-all hover:scale-105 cursor-pointer"
      style={{
        backgroundColor: config.bgColor,
        borderLeft: `4px solid ${config.color}`,
        boxShadow: 'var(--shadow-editorial-md)'
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} style={{ color: config.color }} />
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: config.color, fontFamily: 'var(--font-sans)' }}
        >
          {config.label}
        </span>
      </div>
      
      <h3
        className="text-xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-serif)', color: '#2D2420' }}
      >
        {term}
      </h3>
      
      <p
        className="text-base font-bold mb-3"
        style={{ fontFamily: 'var(--font-serif)', color: config.color }}
      >
        {sanskrit}
      </p>
      
      <p
        className="text-sm leading-relaxed"
        style={{ fontFamily: 'var(--font-sans)', color: '#57534e' }}
      >
        {definition}
      </p>
    </article>
  );
}
