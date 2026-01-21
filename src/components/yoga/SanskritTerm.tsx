'use client';

import React from 'react';

interface SanskritTermProps {
  term: string;
  devanagari?: string;
  transliteration: string;
  meaning: string;
  etymology?: string;
  anvaya?: string;
}

export default function SanskritTerm({
  term,
  devanagari,
  transliteration,
  meaning,
  etymology,
  anvaya,
}: SanskritTermProps) {
  return (
    <div className="my-6 p-6 border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-transparent rounded-r-lg">
      <div className="flex items-baseline gap-3 mb-3">
        {devanagari && (
          <span className="text-3xl font-serif text-orange-900">
            {devanagari}
          </span>
        )}
        <span className="text-xl font-semibold text-gray-900">{term}</span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-gray-700">Transliteração:</span>{' '}
          <span className="italic text-gray-600">{transliteration}</span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Significado:</span>{' '}
          <span className="text-gray-800">{meaning}</span>
        </div>
        
        {etymology && (
          <div>
            <span className="font-medium text-gray-700">Etimologia:</span>{' '}
            <span className="text-gray-600">{etymology}</span>
          </div>
        )}
        
        {anvaya && (
          <div className="mt-3 pt-3 border-t border-orange-200">
            <span className="font-medium text-gray-700">Análise Gramatical (Anvaya):</span>
            <p className="mt-1 text-gray-600 italic">{anvaya}</p>
          </div>
        )}
      </div>
    </div>
  );
}
