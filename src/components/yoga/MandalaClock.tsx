'use client';

import React from 'react';

interface ChakraLevel {
  name: string;
  sanskrit: string;
  level: number; // 0-100
}

interface MandalaClockProps {
  chakras?: ChakraLevel[];
  title?: string;
  description?: string;
}

const defaultChakras: ChakraLevel[] = [
  { name: 'Sahasrara', sanskrit: 'सहस्रार', level: 0 },
  { name: 'Ajna', sanskrit: 'आज्ञा', level: 0 },
  { name: 'Vishuddha', sanskrit: 'विशुद्ध', level: 0 },
  { name: 'Anahata', sanskrit: 'अनाहत', level: 30 },
  { name: 'Manipura', sanskrit: 'मणिपूर', level: 60 },
  { name: 'Svadhisthana', sanskrit: 'स्वाधिष्ठान', level: 40 },
  { name: 'Muladhara', sanskrit: 'मूलाधार', level: 80 },
];

export default function MandalaClock({
  chakras = defaultChakras,
  title = 'Termômetro Energético',
  description,
}: MandalaClockProps) {
  const colors = [
    'bg-violet-500',
    'bg-indigo-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-red-500',
  ];

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-4 italic">{description}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chakras.map((chakra, index) => (
          <div key={chakra.name} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-sm font-semibold text-gray-800">
                  {chakra.name}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {chakra.sanskrit}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-700">
                {chakra.level}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${colors[index]} h-2 rounded-full transition-all duration-700`}
                style={{ width: `${chakra.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-300">
        <p className="text-xs text-gray-500">
          Medição baseada na observação durante práticas de Prāṇāyāma e Dhyāna
        </p>
      </div>
    </div>
  );
}
