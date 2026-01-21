'use client';

import { useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { Sparkles } from 'lucide-react';
import type { LabPost } from '@/types/content';

interface FocusHeaderClientProps {
  focus: LabPost | null;
}

export default function FocusHeaderClient({ focus }: FocusHeaderClientProps) {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (focus?.frontmatter.deadline) {
      const remaining = differenceInDays(
        new Date(focus.frontmatter.deadline),
        new Date()
      );
      setDaysRemaining(remaining);
    }
  }, [focus]);

  if (!focus) {
    return (
      <div className="text-white py-3 px-6 text-sm hidden md:block" style={{backgroundColor: 'var(--charcoal)', fontFamily: 'var(--font-sans)'}}>
        <div className="max-w-7xl mx-auto text-center">
          Sangha Digital - Jornada de Autoconhecimento
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Header - Full */}
      <div className="hidden md:block text-white py-3 px-6 text-sm" style={{backgroundColor: 'var(--charcoal)', fontFamily: 'var(--font-sans)'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold tracking-wide">FOCO ATUAL (SADHANA)</span>
            <span style={{color: 'var(--color-terracota-300)'}}>
              {focus.frontmatter.title}
            </span>
          </div>
          {daysRemaining !== null && (
            <div className="font-mono" style={{color: 'var(--color-terracota-200)'}}>
              ({daysRemaining} dias)
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header - Compact */}
      <div className="md:hidden text-white py-2 px-4 text-xs flex items-center justify-between" style={{backgroundColor: 'var(--charcoal)', fontFamily: 'var(--font-sans)'}}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3" style={{color: 'var(--color-terracota-300)'}} />
          <span className="truncate" style={{color: 'var(--color-terracota-300)'}}>
            {focus.frontmatter.title}
          </span>
        </div>
        {daysRemaining !== null && (
          <div className="font-mono whitespace-nowrap" style={{color: 'var(--color-terracota-200)'}}>
            {daysRemaining}d
          </div>
        )}
      </div>
    </>
  );
}
