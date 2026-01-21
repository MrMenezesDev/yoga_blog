'use client';

import Link from 'next/link';
import { Calendar, Sparkles, BookOpen } from 'lucide-react';

interface GardenUpdate {
  title: string;
  type: 'post' | 'wiki' | 'lab';
  date: string;
  slug: string;
  excerpt?: string;
}

interface RecentGardenProps {
  updates: GardenUpdate[];
}

const typeConfig = {
  post: {
    label: 'Diário',
    icon: BookOpen,
    color: 'text-blue-600 bg-blue-50',
    href: (slug: string) => `/diario/${slug}`,
  },
  wiki: {
    label: 'Sabedoria',
    icon: Sparkles,
    color: 'text-purple-600 bg-purple-50',
    href: (slug: string) => `/sabedoria/${slug}`,
  },
  lab: {
    label: 'Laboratório',
    icon: Calendar,
    color: 'text-green-600 bg-green-50',
    href: (slug: string) => `/laboratorio/${slug}`,
  },
};

export default function RecentGarden({ updates }: RecentGardenProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Jardim Recente</h2>
        <span className="text-sm text-gray-500">
          Últimas atualizações interconectadas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updates.map((update) => {
          const config = typeConfig[update.type];
          const Icon = config.icon;

          return (
            <Link
              key={update.slug}
              href={config.href(update.slug)}
              className="group block"
            >
              <article className="h-full bg-white rounded-lg border-2 border-gray-100 hover:border-orange-300 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`p-2 rounded-lg ${config.color}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {config.label}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {update.title}
                  </h3>

                  {update.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {update.excerpt}
                    </p>
                  )}

                  <time className="text-xs text-gray-500">
                    {new Date(update.date).toLocaleDateString('pt-BR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <div className="h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
