'use client';

import { Sun, Moon, PenTool, BookOpen, CheckCircle, Circle } from 'lucide-react';

interface MandalaTask {
  id: number;
  title: string;
  icon: 'sun' | 'moon' | 'pen' | 'book';
  done: boolean;
}

const iconMap = {
  sun: Sun,
  moon: Moon,
  pen: PenTool,
  book: BookOpen,
};

export default function MandalaWidget() {
  const tasks: MandalaTask[] = [
    { id: 1, title: "Banho/Limpeza", icon: 'sun', done: true },
    { id: 2, title: "Likhita Japa", icon: 'pen', done: true },
    { id: 3, title: "Leitura Gītā", icon: 'book', done: false },
    { id: 4, title: "Revisão da Noite", icon: 'moon', done: false },
  ];

  return (
    <div className="bg-white p-6 border-l-4 border-Terracota-500" style={{ boxShadow: 'var(--shadow-editorial-md)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Target className="text-Terracota-600" size={20} />
        <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: '#2D2420' }}>
          Mandala Diário
        </h3>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => {
          const Icon = iconMap[task.icon];
          return (
            <div key={task.id} className="flex items-center gap-3">
              {task.done ? (
                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              ) : (
                <Circle size={20} className="text-stone-400 flex-shrink-0" />
              )}
              <Icon 
                size={16} 
                className={task.done ? 'text-stone-600' : 'text-stone-400'}
              />
              <span 
                className={`text-sm ${task.done ? 'text-stone-700' : 'text-stone-500'}`}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {task.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Target({ className, size }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
