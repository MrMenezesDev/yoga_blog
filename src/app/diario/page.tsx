import Link from 'next/link';
import { getAllDiaryPosts } from '@/lib/mdx';
import { BookOpen, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function DiarioPage() {
  const posts = getAllDiaryPosts();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Diário de Bordo
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Reflexões diárias sobre Sādhana, relacionamentos e a jornada de integração 
            entre Yoga e Psicanálise.
          </p>
        </header>

        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg border-2 border-gray-100 hover:border-blue-300 transition-all p-6 shadow-sm hover:shadow-md"
              >
                <Link href={`/diario/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                </Link>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <time>
                      {format(new Date(post.frontmatter.date), "d 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                    </time>
                  </div>
                  {post.readingTime && (
                    <span>{post.readingTime} min de leitura</span>
                  )}
                </div>

                {/* Excerpt */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.frontmatter.excerpt}
                </p>

                {/* Tags */}
                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-gray-400" />
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Related Concepts */}
                {post.frontmatter.relatedConcepts && 
                 post.frontmatter.relatedConcepts.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">Conceitos:</span>
                      {post.frontmatter.relatedConcepts.map((concept, i) => (
                        <span key={concept}>
                          <Link
                            href={`/sabedoria/${concept}`}
                            className="text-orange-600 hover:text-orange-700 underline decoration-dotted"
                          >
                            {concept}
                          </Link>
                          {i < post.frontmatter.relatedConcepts!.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Read More */}
                <Link
                  href={`/diario/${post.slug}`}
                  className="mt-4 inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  Ler relato completo →
                </Link>
              </article>
            ))
          ) : (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <p className="text-gray-600">
                Nenhuma reflexão publicada ainda. Comece sua jornada criando arquivos em{' '}
                <code className="bg-gray-200 px-2 py-1 rounded font-mono text-sm">
                  content/diary/
                </code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
