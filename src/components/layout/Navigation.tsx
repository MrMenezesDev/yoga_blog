'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, FlaskConical, Brain } from 'lucide-react';

const navItems = [
  {
    name: 'Início',
    href: '/',
    icon: Home,
  },
  {
    name: 'Diário',
    href: '/diario',
    icon: BookOpen,
  },
  {
    name: 'Laboratório',
    href: '/laboratorio',
    icon: FlaskConical,
  },
  {
    name: 'Sabedoria',
    href: '/sabedoria',
    icon: Brain,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-8">
          {/* Logo/Brand */}
          <Link href="/" className="py-4 flex items-center gap-2">
            <div className="text-xl font-bold text-gray-900">
              <span className="text-orange-600">SANGHA</span> DIGITAL
            </div>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-1 ml-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-4 text-sm font-medium
                    border-b-2 transition-colors
                    ${
                      active
                        ? 'border-orange-600 text-orange-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
