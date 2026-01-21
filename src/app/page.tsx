import Link from 'next/link';
import { getAllDiaryPosts, getLabPostsByStatus } from '@/lib/mdx';
import { Calendar, ArrowRight, Flame, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function Home() {
  const diaryPosts = getAllDiaryPosts().slice(0, 3);
  const doingPosts = getLabPostsByStatus('doing').slice(0, 3); // Top 3 em prática

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
        {/* Hero Section */}
        <header className="text-center py-12 md:py-16 rounded-2xl md:rounded-3xl border-2" 
          style={{
            background: 'linear-gradient(to bottom right, var(--color-saffron-50), #fef9c3)',
            borderColor: 'var(--color-saffron-200)',
            boxShadow: 'var(--shadow-soft)'
          }}>
          <h1 className="text-3xl md:text-5xl font-semibold mb-4" style={{color: 'var(--charcoal)'}}>
            Bem-vindo à <span style={{color: 'var(--color-saffron-600)'}}>Sangha</span> Pessoal
          </h1>
          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
            Este é o registro digital da minha jornada de autoconhecimento.  
            Aqui, Yoga não é apenas exercício, mas uma ferramenta de engenharia interior 
            para lapidar a vontade e compreender a realidade.
          </p>
        </header>

        {/* Recent Diary Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2" style={{color: 'var(--charcoal)'}}>
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" style={{color: '#2563eb'}} />
              Últimas Reflexões do Diário
            </h2>
            <Link
              href="/diario"
              className="font-medium flex items-center gap-1 text-sm md:text-base hover:underline"
              style={{color: 'var(--color-saffron-600)'}}
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {diaryPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/diario/${post.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-xl md:rounded-2xl border-2 border-stone-200 hover:border-stone-300 transition-all p-4 md:p-6 h-full"
                  style={{boxShadow: 'var(--shadow-soft)'}}>
                  <h3 className="text-base md:text-lg font-semibold mb-2 group-hover:underline transition-colors" style={{color: 'var(--charcoal)'}}>
                    {post.frontmatter.title}
                  </h3>
                  <time className="text-xs text-slate-500 mb-3 block">
                    {format(new Date(post.frontmatter.date), "d 'de' MMM", {
                      locale: ptBR,
                    })}
                  </time>
                  <p className="text-sm text-slate-600 line-clamp-3">
                    {post.frontmatter.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Lab Highlights - Humanized */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2" style={{color: 'var(--charcoal)'}}>
              <Flame className="w-5 h-5 md:w-6 md:h-6" style={{color: 'var(--color-saffron-600)'}} />
              Destaques do Laboratório
            </h2>
            <Link
              href="/laboratorio"
              className="font-medium flex items-center gap-1 text-sm md:text-base hover:underline"
              style={{color: 'var(--color-saffron-600)'}}
            >
              Ver Kanban completo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {doingPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {doingPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/laboratorio/${post.slug}`}
                  className="group block"
                >
                  <article className="bg-white rounded-xl md:rounded-2xl border-2 transition-all p-4 md:p-6 h-full"
                    style={{
                      borderColor: 'var(--color-saffron-200)',
                      boxShadow: 'var(--shadow-soft)'
                    }}>
                    <div className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3"
                      style={{
                        backgroundColor: 'var(--color-saffron-100)',
                        color: 'var(--color-saffron-700)'
                      }}>
                      EM PRÁTICA
                    </div>
                    <h3 className="text-base md:text-lg font-semibold mb-2 group-hover:underline" style={{color: 'var(--charcoal)'}}>
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                      {post.frontmatter.description}
                    </p>
                    {post.frontmatter.deadline && (
                      <div className="flex items-center gap-2 text-xs" style={{color: 'var(--color-saffron-600)'}}>
                        <Calendar className="w-3 h-3" />
                        <span>{post.frontmatter.daysRemaining} dias restantes</span>
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-stone-50 rounded-2xl border-2 border-stone-200">
              <p className="text-slate-600">Nenhum item em prática no momento.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
