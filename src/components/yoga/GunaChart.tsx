'use client';

import React from 'react';

interface GunaChartProps {
  sattva: number;
  rajas: number;
  tamas: number;
  date?: string;
  context?: string;
}

export default function GunaChart({
  sattva,
  rajas,
  tamas,
  date,
  context,
}: GunaChartProps) {
  const total = sattva + rajas + tamas;
  const sattvaPct = (sattva / total) * 100;
  const rajasPct = (rajas / total) * 100;
  const tamasPct = (tamas / total) * 100;

  return (
    <div className="my-6 md:my-8 p-4 md:p-6 rounded-xl md:rounded-2xl" 
      style={{
        background: 'linear-gradient(to bottom right, #f8fafc, #dbeafe)',
        boxShadow: 'var(--shadow-soft)'
      }}>
      <div className="mb-4">
        <h3 className="text-base md:text-lg font-semibold mb-1" style={{color: 'var(--charcoal)'}}>
          Balanço de Gunas
        </h3>
        {date && (
          <p className="text-xs md:text-sm text-slate-600">Data: {date}</p>
        )}
        {context && (
          <p className="text-xs md:text-sm text-slate-600 italic mt-1">{context}</p>
        )}
      </div>

      <div className="space-y-4">
        {/* Sattva */}
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between mb-1 gap-1">
            <span className="text-xs md:text-sm font-medium text-slate-700">
              Sattva (सत्त्व) - Clareza/Pureza
            </span>
            <span className="text-xs md:text-sm font-semibold text-blue-600">
              {sattva}% ({sattvaPct.toFixed(0)}%)
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${sattvaPct}%` }}
            />
          </div>
        </div>

        {/* Rajas */}
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between mb-1 gap-1">
            <span className="text-xs md:text-sm font-medium text-slate-700">
              Rajas (रजस्) - Atividade/Paixão
            </span>
            <span className="text-xs md:text-sm font-semibold text-red-600">
              {rajas}% ({rajasPct.toFixed(0)}%)
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${rajasPct}%` }}
            />
          </div>
        </div>

        {/* Tamas */}
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between mb-1 gap-1">
            <span className="text-xs md:text-sm font-medium text-slate-700">
              Tamas (तमस्) - Inércia/Escuridão
            </span>
            <span className="text-xs md:text-sm font-semibold text-slate-600">
              {tamas}% ({tamasPct.toFixed(0)}%)
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-3">
            <div
              className="bg-slate-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${tamasPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-[10px] md:text-xs text-slate-500 italic">
          Baseado no diagnóstico do Bhagavad Gītā, Cap. 17
        </p>
      </div>
    </div>
  );
}
