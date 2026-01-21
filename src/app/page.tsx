import Link from 'next/link';
import { getAllDiaryPosts, getLabPostsByStatus } from '@/lib/mdx';
import { Calendar, ArrowRight, Flame, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function Home() {
  const diaryPosts = getAllDiaryPosts().slice(0, 3);
  const doingPosts = getLabPostsByStatus('doing').slice(0, 3); // Top 3 em prática

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-20 space-y-16 md:space-y-20">
        
        {/* Hero Section - Editorial Style */}
        <header className="text-center max-w-3xl mx-auto py-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{color: 'var(--charcoal)', fontFamily: 'var(--font-serif)'}}>
            Bem-vindo à <span style={{color: 'var(--color-terracota-600)'}}>Sangha</span> Pessoal
          </h1>
          <p className="text-lg md:text-xl leading-loose" style={{color: 'var(--foreground)', fontFamily: 'var(--font-serif)'}}>
            Este é o registro digital da minha jornada de autoconhecimento.  
            Aqui, Yoga não é apenas exercício, mas uma ferramenta de engenharia interior 
            para lapidar a vontade e compreender a realidade.
          </p>
        </header>

        {/* Recent Diary Posts */}
        <section>
          <div className="mb-8 pb-4 border-b-2" style={{borderColor: 'var(--color-terracota-300)'}}>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3" style={{color: 'var(--charcoal)', fontFamily: 'var(--font-serif)'}}>
              <BookOpen className="w-7 h-7 md:w-8 md:h-8" style={{color: 'var(--color-terracota-600)'}} />
              Últimas Reflexões do Diário
            </h2>
          </div>
          <div className="space-y-6">
            {diaryPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/diario/${post.slug}`}
                className="group block"
              >
                <article className="bg-white p-6 md:p-8 border-l-4 transition-all hover:translate-x-1"
                  style={{
                    borderColor: '#2563eb',
                    boxShadow: 'var(--shadow-editorial-md)'
                  }}>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:underline transition-colors" style={{color: 'var(--charcoal)', fontFamily: 'var(--font-serif)'}}>
                    {post.frontmatter.title}
                  </h3>
                  <time className="text-sm mb-3 block" style={{color: '#78716c', fontFamily: 'var(--font-sans)', fontWeight: 300}}>
                    {format(new Date(post.frontmatter.date), "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </time>
                  <p className="text-base leading-relaxed" style={{color: 'var(--foreground)', fontFamily: 'var(--font-serif)'}}>
                    {post.frontmatter.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Lab Highlights - Editorial */}
        <section>
          <div className="mb-8 pb-4 border-b-2" style={{borderColor: 'var(--color-terracota-300)'}}>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3" style={{color: 'var(--charcoal)', fontFamily: 'var(--font-serif)'}}>
              <Flame className="w-7 h-7 md:w-8 md:h-8" style={{color: 'var(--color-terracota-600)'}} />
              Destaques do Laboratório
            </h2>
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
                      <div className="flex items-center gap-2 text-sm" style={{color: 'var(--color-terracota-600)', fontFamily: 'var(--font-sans)'}}>
                        <Calendar className="w-4 h-4" />
                        <span>{post.frontmatter.daysRemaining} dias restantes</span>
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-lg italic" style={{color: '#78716c', fontFamily: 'var(--font-serif)'}}>
              Nenhum estudo em prática no momento.
            </p>
          )}
          
          <div className="text-center mt-8">
            <Link
              href="/laboratorio"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium transition-all border-2 hover:translate-y-[-2px]"
              style={{
                color: 'var(--color-terracota-700)',
                borderColor: 'var(--color-terracota-500)',
                fontFamily: 'var(--font-sans)',
                boxShadow: 'var(--shadow-editorial)'
              }}
            >
              Ver Kanban Completo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
