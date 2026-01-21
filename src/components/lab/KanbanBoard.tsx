'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Circle, Clock, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import type { LabPost } from '@/types/content';

interface KanbanBoardProps {
  posts: LabPost[];
}

const statusConfig = {
  todo: {
    label: 'A Estudar',
    icon: Circle,
    color: 'bg-stone-50 border-stone-300',
    colorBg: '#f8fafc',
    colorBorder: '#d6d3d1',
    iconColor: 'text-slate-500',
    iconColorHex: '#64748b',
    badgeColor: 'bg-stone-100 text-slate-700',
    badgeColorBg: '#f5f5f4',
    badgeText: '#334155',
  },
  doing: {
    label: 'Em Prática',
    icon: Clock,
    color: '',
    colorBg: 'var(--color-saffron-50)',
    colorBorder: 'var(--color-saffron-300)',
    iconColor: '',
    iconColorHex: 'var(--color-saffron-500)',
    badgeColor: '',
    badgeColorBg: 'var(--color-saffron-100)',
    badgeText: 'var(--color-saffron-700)',
  },
  done: {
    label: 'Integrado',
    icon: CheckCircle2,
    color: 'bg-green-50 border-green-300',
    colorBg: '#dcfce7',
    colorBorder: '#86efac',
    iconColor: 'text-green-500',
    iconColorHex: '#22c55e',
    badgeColor: 'bg-green-100 text-green-700',
    badgeColorBg: '#d1fae5',
    badgeText: '#15803d',
  },
};

const typeLabels = {
  ritual: 'Ritual',
  estudo: 'Estudo',
  pratica: 'Prática',
};

export default function KanbanBoard({ posts }: KanbanBoardProps) {
  const [activeTab, setActiveTab] = useState<'todo' | 'doing' | 'done'>('doing');

  // Agrupar por status
  const columns = {
    todo: posts.filter((p) => p.frontmatter.status === 'todo'),
    doing: posts.filter((p) => p.frontmatter.status === 'doing'),
    done: posts.filter((p) => p.frontmatter.status === 'done'),
  };

  return (
    <>
      {/* Mobile Tabs */}
      <div className="md:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => {
          const config = statusConfig[status];
          const Icon = config.icon;
          const count = columns[status].length;
          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === status
                  ? 'shadow-md'
                  : 'bg-stone-100 text-slate-600'
              }`}
              style={activeTab === status ? {
                backgroundColor: config.colorBg,
                color: config.badgeText,
                borderWidth: '2px',
                borderColor: config.colorBorder
              } : {}}
            >
              <Icon className="w-4 h-4" style={activeTab === status ? {color: config.iconColorHex} : {}} />
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Mobile Column View */}
      <div className="md:hidden">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => {
          if (activeTab !== status) return null;
          const config = statusConfig[status];
          const columnPosts = columns[status];

          return (
            <div key={status} className="space-y-3">
              {columnPosts.length > 0 ? (
                columnPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/laboratorio/${post.slug}`}
                    className="block"
                  >
                    <article className="bg-white p-4 rounded-xl border-2 border-stone-200 active:scale-[0.98] transition-transform"
                      style={{boxShadow: 'var(--shadow-soft)'}}>
                      {/* Type Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-lg ${config.badgeColor || ''}`}
                          style={{backgroundColor: config.badgeColorBg, color: config.badgeText}}>
                          {typeLabels[post.frontmatter.type]}
                        </span>
                        {post.frontmatter.daysRemaining !== undefined && 
                         post.frontmatter.daysRemaining >= 0 && (
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.frontmatter.daysRemaining}d
                          </span>
                        )}
                      </div>

                      <h4 className="font-semibold mb-2" style={{color: 'var(--charcoal)'}}>
                        {post.frontmatter.title}
                      </h4>

                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {post.frontmatter.description}
                      </p>

                      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.frontmatter.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-stone-100 text-slate-600 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </Link>
                ))
              ) : (
                <div className="bg-stone-50 p-8 rounded-xl border-2 border-dashed border-stone-300 text-center">
                  <p className="text-sm text-slate-500">Nenhum item nesta coluna</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => {
          const config = statusConfig[status];
          const Icon = config.icon;
          const columnPosts = columns[status];

          return (
            <div key={status} className="flex flex-col">
              {/* Column Header */}
              <div className={`flex items-center gap-3 p-4 rounded-t-xl border-2 ${config.color || ''}`}
                style={status === 'doing' ? {
                  backgroundColor: config.colorBg,
                  borderColor: config.colorBorder,
                  boxShadow: 'var(--shadow-soft)'
                } : {}}>
                <Icon className={`w-5 h-5 ${config.iconColor || ''}`} 
                  style={status === 'doing' ? {color: config.iconColor} : {}} />
                <h3 className="font-semibold" style={{color: 'var(--charcoal)'}}>{config.label}</h3>
                <span className="ml-auto text-sm font-semibold text-slate-600">
                  {columnPosts.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className={`flex-1 p-4 space-y-3 border-2 border-t-0 rounded-b-xl ${config.color || ''}`}
                style={status === 'doing' ? {
                  backgroundColor: config.colorBg,
                  borderColor: config.colorBorder
                } : {}}>
                {columnPosts.length > 0 ? (
                  columnPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/laboratorio/${post.slug}`}
                      className="block group"
                    >
                      <article className="bg-white p-4 rounded-xl border-2 border-stone-200 hover:border-stone-400 transition-all"
                        style={{boxShadow: 'var(--shadow-soft)'}}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${config.badgeColor || ''}`}
                            style={status === 'doing' ? {backgroundColor: config.badgeColor, color: config.badgeText} : {}}>
                            {typeLabels[post.frontmatter.type]}
                          </span>
                          {post.frontmatter.daysRemaining !== undefined && 
                           post.frontmatter.daysRemaining >= 0 && (
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.frontmatter.daysRemaining}d
                            </span>
                          )}
                        </div>

                        <h4 className="font-semibold mb-2 group-hover:underline transition-colors" style={{color: 'var(--charcoal)'}}>
                          {post.frontmatter.title}
                        </h4>

                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                          {post.frontmatter.description}
                        </p>

                        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.frontmatter.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-stone-100 text-slate-600 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {(post.frontmatter.relatedDiary || post.frontmatter.relatedConcepts) && (
                          <div className="pt-3 border-t border-stone-200 flex items-center gap-3 text-xs text-slate-500">
                            {post.frontmatter.relatedDiary && post.frontmatter.relatedDiary.length > 0 && (
                              <span className="flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" />
                                {post.frontmatter.relatedDiary.length} relato(s)
                              </span>
                            )}
                            {post.frontmatter.relatedConcepts && post.frontmatter.relatedConcepts.length > 0 && (
                              <span>
                                {post.frontmatter.relatedConcepts.length} conceito(s)
                              </span>
                            )}
                          </div>
                        )}
                      </article>
                    </Link>
                  ))
                ) : (
                  <div className="bg-white/50 p-6 rounded-xl border-2 border-dashed border-stone-300 text-center">
                    <p className="text-sm text-slate-400">Nenhum item nesta coluna</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
