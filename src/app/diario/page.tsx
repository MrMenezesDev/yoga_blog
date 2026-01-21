import Link from 'next/link';
import { getAllDiaryPosts } from '@/lib/mdx';
import { BookOpen, Calendar, Tag, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import RichPostCard from '@/components/RichPostCard';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

export default async function DiarioPage() {
  const posts = getAllDiaryPosts();

  return (
    <>
      <TopBar />
      <div className="min-h-screen py-12 pb-20" style={{ backgroundColor: '#f5f5f4' }}>
        <div className="max-w-5xl mx-auto px-6">
          <header className="mb-12 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-10 h-10 text-stone-700" />
              <h1 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: '#2D2420' }}>
                Diário de Jornada
              </h1>
            </div>
            <p className="text-lg md:text-xl leading-loose text-stone-700" style={{ fontFamily: 'var(--font-serif)' }}>
              Reflexões diárias sobre Sādhana, relacionamentos e a jornada de integração 
              entre Yoga e Psicanálise. Cada post é uma escavação arqueológica da consciência.
            </p>
          </header>

          <div className="space-y-8 md:space-y-10">
            {posts.length > 0 ? (
              posts.map((post) => (
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
              ))
            ) : (
              <div className="bg-stone-100 p-12 text-center border-l-4 border-stone-400" style={{ boxShadow: 'var(--shadow-editorial-md)' }}>
                <p className="text-lg text-stone-600" style={{ fontFamily: 'var(--font-serif)' }}>
                  Nenhuma entrada no diário ainda.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
