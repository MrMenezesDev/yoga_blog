import Link from 'next/link';
import { getAllDiaryPosts, getLabPostsByStatus } from '@/lib/mdx';
import { Calendar, ArrowRight, Flame, BookOpen, Target, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TopBar from '@/components/TopBar';
import MandalaWidget from '@/components/MandalaWidget';
import RichPostCard from '@/components/RichPostCard';
import Footer from '@/components/Footer';

export default async function Home() {
  const diaryPosts = getAllDiaryPosts().slice(0, 2);
  const doingPosts = getLabPostsByStatus('doing').slice(0, 3);

  return (
    <>
      <TopBar />
      <div className="min-h-screen pb-16" style={{ backgroundColor: '#f5f5f4' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-20 space-y-16 md:space-y-20">
          
          {/* Hero Section - Editorial Typography First */}
          <header className="text-center max-w-4xl mx-auto py-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{color: '#2D2420', fontFamily: 'var(--font-serif)'}}>
              Jardim Digital de <span style={{color: '#C05621'}}>Sangha</span>
            </h1>
            <p className="text-lg md:text-xl leading-loose text-stone-700" style={{fontFamily: 'var(--font-serif)'}}>
              Este é o registro vivo da minha jornada de autoconhecimento através do Yoga e da Filosofia Indiana.  
              Aqui, cada post é uma escavação arqueológica da consciência — um laboratório onde teoria e vida colidem.
            </p>
          </header>

          {/* Mandala Widget + Recent Posts Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <MandalaWidget />
            </div>
            <div className="md:col-span-2">
              <div className="bg-white p-6 border-l-4 border-stone-500" style={{ boxShadow: 'var(--shadow-editorial-md)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)', color: '#2D2420' }}>
                  🎯 Foco Atual (Sadhana)
                </h3>
                <div className="space-y-2 text-sm" style={{ fontFamily: 'var(--font-sans)', color: '#57534e' }}>
                  <p><strong>Período:</strong> 05 Jan - 19 Mar 2026 (74 dias)</p>
                  <p><strong>Meta:</strong> Cristalizar a vontade através da disciplina diária</p>
                  <p><strong>Práticas:</strong> Surya Namaskar, Likhita Japa, Estudo da Gītā</p>
                  <p><strong>Estudo Paralelo:</strong> Yoga Sutras de Patañjali (Triangulação com 3 versões)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Diary Posts - Rich Cards */}
          <section>
            <div className="mb-8 pb-4 border-b-2 border-stone-300">
              <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-3" style={{color: '#2D2420', fontFamily: 'var(--font-serif)'}}>
                <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-stone-700" />
                Diário de Jornada
              </h2>
              <p className="text-base mt-2 text-stone-600" style={{ fontFamily: 'var(--font-serif)' }}>
                Reflexões diárias sobre a prática, insights filosóficos e o processo de transformação interior
              </p>
            </div>
            <div className="space-y-8 md:space-y-10">
              {diaryPosts.map((post) => (
                <RichPostCard
                  key={post.slug}
                  slug={`diario/${post.slug}`}
                  title={post.frontmatter.title}
                  date={format(new Date(post.frontmatter.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  category={post.frontmatter.category || 'Reflexão'}
                  excerpt={post.frontmatter.excerpt || ''}
                  sanskrit={post.frontmatter.sanskrit}
                  sanskritMeaning={post.frontmatter.sanskritMeaning}
                  comments={post.frontmatter.comments || 0}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/diario"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 transition-all duration-300 text-base font-medium hover:bg-stone-800 hover:text-white hover:border-stone-800"
                style={{ 
                  borderColor: '#C05621', 
                  color: '#C05621',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                Ver todo o Diário
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>

          {/* Lab Highlights - Rich Cards */}
          <section>
            <div className="mb-8 pb-4 border-b-2 border-stone-300">
              <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-3" style={{color: '#2D2420', fontFamily: 'var(--font-serif)'}}>
                <Flame className="w-8 h-8 md:w-10 md:h-10" style={{color: '#C05621'}} />
                Laboratório (Em Prática)
              </h2>
              <p className="text-base mt-2 text-stone-600" style={{ fontFamily: 'var(--font-serif)' }}>
                Experimentos práticos de aplicação dos conceitos filosóficos no dia a dia
              </p>
            </div>
            
            {doingPosts.length > 0 ? (
              <div className="space-y-6">
                {doingPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/laboratorio/${post.slug}`}
                    className="group block"
                  >
                    <article className="bg-white p-6 md:p-8 border-l-4 transition-all hover:translate-x-1"
                      style={{
                        borderColor: '#C05621',
                        boxShadow: 'var(--shadow-editorial-md)'
                      }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="px-3 py-1 rounded-full flex items-center gap-1.5"
                          style={{ backgroundColor: '#ffedd5' }}
                        >
                          <Sparkles size={14} style={{ color: '#C05621' }} />
                          <span
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: '#C05621', fontFamily: 'var(--font-sans)' }}
                          >
                            EM PRÁTICA
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:underline" style={{color: '#2D2420', fontFamily: 'var(--font-serif)'}}>
                        {post.frontmatter.title}
                      </h3>
                      <p className="text-base leading-loose text-stone-700" style={{fontFamily: 'var(--font-serif)'}}>
                        {post.frontmatter.excerpt}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-stone-100 p-8 text-center border-l-4 border-stone-400" style={{ boxShadow: 'var(--shadow-editorial-md)' }}>
                <p className="text-base text-stone-600" style={{fontFamily: 'var(--font-serif)'}}>
                  Nenhum experimento em andamento no momento.
                </p>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <Link
                href="/laboratorio"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 transition-all duration-300 text-base font-medium hover:bg-stone-800 hover:text-white hover:border-stone-800"
                style={{ 
                  borderColor: '#C05621', 
                  color: '#C05621',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                Ver todo o Laboratório
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
