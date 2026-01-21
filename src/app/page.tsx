import Link from 'next/link';
import { getAllDiaryPosts, getAllLabPosts, getCurrentFocus } from '@/lib/mdx';
import { Calendar, ArrowRight, Target } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function Home() {
  const diaryPosts = getAllDiaryPosts().slice(0, 3);
  const labPosts = getAllLabPosts();
  const currentFocus = getCurrentFocus();

  const todoPosts = labPosts.filter((p) => p.frontmatter.status === 'todo');
  const doingPosts = labPosts.filter((p) => p.frontmatter.status === 'doing');
  const donePosts = labPosts.filter((p) => p.frontmatter.status === 'done');

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <header className="text-center py-16 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-200">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Bem-vindo à <span className="text-orange-600">Sangha</span> Pessoal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Este é o registro digital da minha jornada de autoconhecimento.  
            Aqui, Yoga não é apenas exercício, mas uma ferramenta de engenharia interior 
            para lapidar a vontade e compreender a realidade.
          </p>
        </header>

        {/* Current Focus */}
        {currentFocus && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-600" />
              Foco Atual (Sadhana)
            </h2>
            <Link href={`/laboratorio/${currentFocus.slug}`}>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-2xl hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">
                      {currentFocus.frontmatter.title}
                    </h3>
                    <p className="text-orange-100 mb-4">
                      {currentFocus.frontmatter.description}
                    </p>
                    {currentFocus.frontmatter.deadline && (
                      <div className="flex items-center gap-2 text-orange-200">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono">
                          Deadline:{' '}
                          {format(new Date(currentFocus.frontmatter.deadline), "d 'de' MMMM", {
                            locale: ptBR,
                          })}{' '}
                          ({currentFocus.frontmatter.daysRemaining} dias)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Recent Diary Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Últimas Reflexões do Diário
            </h2>
            <Link
              href="/diario"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diaryPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/diario/${post.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-lg border-2 border-gray-100 hover:border-blue-300 transition-all p-6 h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.frontmatter.title}
                  </h3>
                  <time className="text-xs text-gray-500 mb-3 block">
                    {format(new Date(post.frontmatter.date), "d 'de' MMM", {
                      locale: ptBR,
                    })}
                  </time>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.frontmatter.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Lab Stats */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Status do Laboratório
            </h2>
            <Link
              href="/laboratorio"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
            >
              Ver Kanban completo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <div className="text-4xl font-bold text-gray-600 mb-2">
                {todoPosts.length}
              </div>
              <div className="text-sm text-gray-600">A Estudar</div>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {doingPosts.length}
              </div>
              <div className="text-sm text-gray-600">Em Prática</div>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {donePosts.length}
              </div>
              <div className="text-sm text-gray-600">Integrado</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>
            Blog construído com Next.js, TypeScript, Tailwind CSS e MDX
          </p>
        </footer>
