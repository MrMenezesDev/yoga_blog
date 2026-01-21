'use client';

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
    color: 'bg-gray-50 border-gray-300',
    iconColor: 'text-gray-500',
    badgeColor: 'bg-gray-100 text-gray-700',
  },
  doing: {
    label: 'Em Prática',
    icon: Clock,
    color: 'bg-orange-50 border-orange-300',
    iconColor: 'text-orange-500',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  done: {
    label: 'Integrado',
    icon: CheckCircle2,
    color: 'bg-green-50 border-green-300',
    iconColor: 'text-green-500',
    badgeColor: 'bg-green-100 text-green-700',
  },
};

const typeLabels = {
  ritual: 'Ritual',
  estudo: 'Estudo',
  pratica: 'Prática',
};

export default function KanbanBoard({ posts }: KanbanBoardProps) {
  // Agrupar por status
  const columns = {
    todo: posts.filter((p) => p.frontmatter.status === 'todo'),
    doing: posts.filter((p) => p.frontmatter.status === 'doing'),
    done: posts.filter((p) => p.frontmatter.status === 'done'),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => {
        const config = statusConfig[status];
        const Icon = config.icon;
        const columnPosts = columns[status];

        return (
          <div key={status} className="flex flex-col">
            {/* Column Header */}
            <div className={`flex items-center gap-3 p-4 rounded-t-lg border-2 ${config.color}`}>
              <Icon className={`w-5 h-5 ${config.iconColor}`} />
              <h3 className="font-bold text-gray-900">{config.label}</h3>
              <span className="ml-auto text-sm font-semibold text-gray-600">
                {columnPosts.length}
              </span>
            </div>

            {/* Cards Container */}
            <div className={`flex-1 p-4 space-y-3 border-2 border-t-0 rounded-b-lg ${config.color}`}>
              {columnPosts.length > 0 ? (
                columnPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/laboratorio/${post.slug}`}
                    className="block group"
                  >
                    <article className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-orange-400 transition-all hover:shadow-md">
                      {/* Type Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${config.badgeColor}`}>
                          {typeLabels[post.frontmatter.type]}
                        </span>
                        {post.frontmatter.daysRemaining !== undefined && 
                         post.frontmatter.daysRemaining >= 0 && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.frontmatter.daysRemaining}d
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {post.frontmatter.title}
                      </h4>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {post.frontmatter.description}
                      </p>

                      {/* Tags */}
                      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.frontmatter.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Related Count */}
                      {(post.frontmatter.relatedDiary || post.frontmatter.relatedConcepts) && (
                        <div className="pt-3 border-t border-gray-200 flex items-center gap-3 text-xs text-gray-500">
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
                <div className="bg-white/50 p-6 rounded-lg border-2 border-dashed border-gray-300 text-center">
                  <p className="text-sm text-gray-400">Nenhum item nesta coluna</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
