'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Beaker, Brain } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

const navItems: NavItem[] = [
  {
    name: 'Início',
    href: '/',
    icon: <Home className="w-5 h-5" />,
    description: 'Dashboard geral',
  },
  {
    name: 'Diário',
    href: '/diario',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Reflexões e rituais',
  },
  {
    name: 'Laboratório',
    href: '/laboratorio',
    icon: <Beaker className="w-5 h-5" />,
    description: 'Cronograma de estudos',
  },
  {
    name: 'Sabedoria',
    href: '/sabedoria',
    icon: <Brain className="w-5 h-5" />,
    description: 'Glossário e conceitos',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-orange-50 to-white border-r border-orange-200 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-orange-200">
        <Link href="/" className="block">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-orange-600">योग</span> Garden
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Digital Garden de Yoga e Psicanálise
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname?.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200 group
                    ${
                      isActive
                        ? 'bg-orange-100 text-orange-900 font-medium'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-800'
                    }
                  `}
                >
                  <span
                    className={`
                      ${
                        isActive
                          ? 'text-orange-600'
                          : 'text-gray-500 group-hover:text-orange-500'
                      }
                    `}
                  >
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-600">
                      {item.description}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-orange-200 bg-white">
        <div className="text-xs text-gray-500 space-y-1">
          <p className="font-medium text-gray-700">Sadhana Atual</p>
          <p className="text-orange-600">Manipura Chakra - Dia 305/365</p>
        </div>
      </div>
    </aside>
  );
}
