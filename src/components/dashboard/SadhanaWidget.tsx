'use client';

import { Calendar, Target, TrendingUp } from 'lucide-react';

interface SadhanaWidgetProps {
  title: string;
  focus: string;
  day: number;
  totalDays: number;
  description?: string;
}

export default function SadhanaWidget({
  title,
  focus,
  day,
  totalDays,
  description,
}: SadhanaWidgetProps) {
  const progress = (day / totalDays) * 100;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 text-white">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mandala" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mandala)"/>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-orange-100 text-sm">{description}</p>
          </div>
          <Target className="w-8 h-8 text-orange-200" />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold">{focus}</span>
            </div>
            <p className="text-orange-100 text-sm">Foco Energético Atual</p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-orange-400">
            <Calendar className="w-5 h-5" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso</span>
                <span className="font-semibold">Dia {day} de {totalDays}</span>
              </div>
              <div className="w-full bg-orange-400 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-orange-100">
            <TrendingUp className="w-4 h-4" />
            <span>{Math.round(progress)}% completado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
