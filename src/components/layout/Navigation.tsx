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
      <nav className="hidden md:block bg-white border-b" style={{borderColor: '#e7e5e4', boxShadow: 'var(--shadow-editorial)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8">
            {/* Logo/Brand */}
            <Link href="/" className="py-4 flex items-center gap-2">
              <div className="text-xl font-bold" style={{fontFamily: 'var(--font-serif)'}}>
                <span style={{color: 'var(--color-terracota-600)'}}>SANGHA</span> <span style={{color: 'var(--charcoal)'}}>DIGITAL</span>
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
                      flex items-center gap-2 px-4 py-4 text-sm font-medium transition-all
                      ${
                        active
                          ? ''
                          : 'hover:bg-stone-50'
                      }
                    `}
                    style={active ? {
                      color: 'var(--color-terracota-700)',
                      borderBottom: '2px solid var(--color-terracota-500)',
                      fontFamily: 'var(--font-sans)'
                    } : {
                      color: '#78716c',
                      fontFamily: 'var(--font-sans)'
                    }}
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50" style={{borderColor: '#e7e5e4', boxShadow: 'var(--shadow-editorial-lg)'}}>
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all flex-1"
                style={active ? {color: 'var(--color-terracota-600)'} : {color: '#78716c'}}
              >
                <Icon className={`w-6 h-6 ${
                  active ? 'scale-110' : 'scale-100'
                } transition-transform`} />
                <span className="text-xs font-medium" style={{fontFamily: 'var(--font-sans)'}}>{item.name}</span>
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
