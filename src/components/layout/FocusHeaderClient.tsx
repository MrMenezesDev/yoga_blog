'use client';

import { useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
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
      <div className="bg-gray-900 text-white py-2 px-6 text-sm">
        <div className="max-w-7xl mx-auto text-center">
          Sangha Digital - Jornada de Autoconhecimento
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white py-2 px-6 text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold">FOCO ATUAL (SADHANA)</span>
          <span className="text-orange-400">
            {focus.frontmatter.title}
          </span>
        </div>
        {daysRemaining !== null && (
          <div className="text-orange-300 font-mono">
            ({daysRemaining} dias)
          </div>
        )}
      </div>
    </div>
  );
}
