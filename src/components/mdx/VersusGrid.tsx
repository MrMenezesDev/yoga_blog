import { ReactNode } from 'react';

interface VersusGridProps {
  leftTitle: string;
  leftSubtitle?: string;
  leftContent: ReactNode;
  leftColor?: 'purple' | 'blue' | 'green' | 'orange';
  rightTitle: string;
  rightSubtitle?: string;
  rightContent: ReactNode;
  rightColor?: 'purple' | 'blue' | 'green' | 'orange';
  conclusion?: ReactNode;
}

const colorStyles = {
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-900',
    accent: 'text-purple-600'
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    accent: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-900',
    accent: 'text-green-600'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-900',
    accent: 'text-orange-600'
  }
};

export default function VersusGrid({
  leftTitle,
  leftSubtitle,
  leftContent,
  leftColor = 'blue',
  rightTitle,
  rightSubtitle,
  rightContent,
  rightColor = 'purple',
  conclusion
}: VersusGridProps) {
  const leftStyles = colorStyles[leftColor];
  const rightStyles = colorStyles[rightColor];
  
  return (
    <div className="my-10">
      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Left Side */}
        <div 
          className={`
            ${leftStyles.bg} ${leftStyles.border}
            border-2 rounded-2xl p-6
            shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]
          `}
        >
          <div className="mb-4">
            <h3 className={`text-2xl font-bold ${leftStyles.text} mb-1 font-serif`}>
              {leftTitle}
            </h3>
            {leftSubtitle && (
              <p className={`text-sm ${leftStyles.accent} font-medium`}>
                {leftSubtitle}
              </p>
            )}
          </div>
          
          <div className="prose prose-sm max-w-none text-stone-700">
            {leftContent}
          </div>
        </div>
        
        {/* Right Side */}
        <div 
          className={`
            ${rightStyles.bg} ${rightStyles.border}
            border-2 rounded-2xl p-6
            shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]
          `}
        >
          <div className="mb-4">
            <h3 className={`text-2xl font-bold ${rightStyles.text} mb-1 font-serif`}>
              {rightTitle}
            </h3>
            {rightSubtitle && (
              <p className={`text-sm ${rightStyles.accent} font-medium`}>
                {rightSubtitle}
              </p>
            )}
          </div>
          
          <div className="prose prose-sm max-w-none text-stone-700">
            {rightContent}
          </div>
        </div>
      </div>
      
      {/* Conclusion Box */}
      {conclusion && (
        <div className="bg-stone-100 border-2 border-stone-200 rounded-2xl p-6 shadow-soft">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="prose prose-sm max-w-none text-stone-700">
              {conclusion}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
