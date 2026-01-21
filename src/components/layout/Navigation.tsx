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
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden md:block bg-white/80 backdrop-blur-sm border-b border-stone-200" style={{boxShadow: 'var(--shadow-soft)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8">
            {/* Logo/Brand */}
            <Link href="/" className="py-4 flex items-center gap-2">
              <div className="text-xl font-semibold">
                <span style={{color: 'var(--color-saffron-600)'}}>SANGHA</span> <span className="text-slate-700">DIGITAL</span>
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
                      flex items-center gap-2 px-4 py-4 text-sm font-medium rounded-xl
                      transition-all duration-300
                      ${
                        active
                          ? 'text-slate-800'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                      }
                    `}
                    style={active ? {
                      backgroundColor: 'var(--color-saffron-50)',
                      color: 'var(--color-saffron-700)',
                      boxShadow: 'var(--shadow-soft)'
                    } : {}}
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 z-50" style={{boxShadow: 'var(--shadow-soft-lg)'}}>
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 flex-1"
                style={active ? {color: 'var(--color-saffron-600)'} : {color: '#64748b'}}
              >
                <Icon className={`w-6 h-6 ${
                  active ? 'scale-110' : 'scale-100'
                } transition-transform`} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16" />
    </>
  );
}
