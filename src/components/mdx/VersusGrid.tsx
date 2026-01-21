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
    <div className="my-12">
      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Left Side */}
        <div 
          className={`
            ${leftStyles.bg}
            border-l-4 p-6 md:p-8
          `}
          style={{
            borderLeftColor: leftStyles.border.replace('border-', ''),
            boxShadow: 'var(--shadow-editorial-md)'
          }}
        >
          <div className="mb-4">
            <h3 className={`text-3xl font-bold mb-2`} style={{color: 'var(--charcoal)', fontFamily: 'var(--font-serif)'}}>
              {leftTitle}
            </h3>
            {leftSubtitle && (
              <p className={`text-sm ${leftStyles.accent} font-medium`} style={{fontFamily: 'var(--font-sans)'}}>
                {leftSubtitle}
              </p>
            )}
          </div>
          
          <div className="prose prose-sm max-w-none leading-relaxed" style={{color: 'var(--foreground)'}}>
            {leftContent}
          </div>
        </div>
        
        {/* Right Side */}
        <div 
          className={`
            ${rightStyles.bg}
            border-l-4 p-6 md:p-8
          `}
          style={{
            borderLeftColor: rightStyles.border.replace('border-', ''),
            boxShadow: 'var(--shadow-editorial-md)'
          }}
        >
          <div className="mb-4">
            <h3 className={`text-3xl font-bold mb-2`} style={{color: 'var(--charcoal)', fontFamily: 'var(--font-serif)'}}>
              {rightTitle}
            </h3>
            {rightSubtitle && (
              <p className={`text-sm ${rightStyles.accent} font-medium`} style={{fontFamily: 'var(--font-sans)'}}>
                {rightSubtitle}
              </p>
            )}
          </div>
          
          <div className="prose prose-sm max-w-none leading-relaxed" style={{color: 'var(--foreground)'}}>
            {rightContent}
          </div>
        </div>
      </div>
      
      {/* Conclusion Box */}
      {conclusion && (
        <div className="bg-stone-100 border-l-4 p-6 md:p-8" style={{borderLeftColor: 'var(--color-terracota-500)', boxShadow: 'var(--shadow-editorial)'}}>
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div className="prose prose-sm max-w-none leading-relaxed" style={{color: 'var(--foreground)'}}>
              {conclusion}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
