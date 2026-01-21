'use client';

import { differenceInDays } from 'date-fns';
import { Target } from 'lucide-react';

export default function TopBar() {
  const targetDate = new Date('2026-03-19');
  const today = new Date();
  const daysLeft = differenceInDays(targetDate, today);

  return (
    <div className="bg-stone-900 text-stone-300 py-3 px-4 text-center text-sm font-medium tracking-widest uppercase border-b border-stone-800">
      <div className="flex items-center justify-center gap-2">
        <Target size={16} className="text-Terracota-400" />
        <span>Mandala 19/Mar: </span>
        <span className="text-Terracota-400 font-bold">{daysLeft} Dias</span>
      </div>
    </div>
  );
}
