import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type CategoryType = 
  | 'filosofia' 
  | 'pratica' 
  | 'insight' 
  | 'estudo' 
  | 'discussao' 
  | 'ascensao';

interface ConceptCardProps {
  category: CategoryType;
  icon?: LucideIcon;
  title?: string;
  children: ReactNode;
}

const categoryStyles: Record<CategoryType, {
  borderColor: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
  label: string;
}> = {
  filosofia: {
    borderColor: 'border-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-800',
    label: 'FILOSOFIA COMPARADA'
  },
  pratica: {
    borderColor: 'border-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-800',
    label: 'PRÁTICA'
  },
  insight: {
    borderColor: 'border-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    textColor: 'text-green-800',
    label: 'INSIGHT'
  },
  estudo: {
    borderColor: 'border-sky-600',
    bgColor: 'bg-sky-50',
    iconColor: 'text-sky-600',
    textColor: 'text-sky-800',
    label: 'ESTUDO PROFUNDO'
  },
  discussao: {
    borderColor: 'border-violet-600',
    bgColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
    textColor: 'text-violet-800',
    label: 'DISCUSSÃO ABERTA'
  },
  ascensao: {
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    textColor: 'text-emerald-800',
    label: 'ASCENSÃO CONFIRMADA'
  }
};

export default function ConceptCard({ category, icon: Icon, title, children }: ConceptCardProps) {
  const styles = categoryStyles[category];
  
  return (
    <div 
      className={`
        ${styles.bgColor} ${styles.borderColor}
        border-l-4 rounded-2xl p-6 my-8
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]
        transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)]
        hover:translate-y-[-2px]
      `}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {Icon && (
          <div className={`${styles.iconColor} flex-shrink-0 mt-1`}>
            <Icon size={24} strokeWidth={1.5} />
          </div>
        )}
        
        <div className="flex-1">
          {/* Category Label */}
          <div className={`text-xs font-semibold tracking-wider ${styles.textColor} mb-2 uppercase`}>
            {styles.label}
          </div>
          
          {/* Title */}
          {title && (
            <h3 className="text-xl font-semibold text-stone-800 mb-3 leading-tight font-serif">
              {title}
            </h3>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="prose prose-sm max-w-none">
        {children}
      </div>
    </div>
  );
}
