import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, Calendar, Tag, BookOpen } from 'lucide-react';
import { getWisdomPostBySlug, getAllWisdomPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

// Generate static params for all wisdom posts
export async function generateStaticParams() {
  const posts = getAllWisdomPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getWisdomPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Conceito não encontrado',
    };
  }

  return {
    title: `${post.frontmatter.title} | Sangha Digital`,
    description: post.frontmatter.definition,
  };
}

// Category config for colors
const categoryConfig: Record<string, { color: string; bgColor: string; label: string }> = {
  conceito: { color: '#7c3aed', bgColor: '#ede9fe', label: 'Conceito Filosófico' },
  pratica: { color: '#ea580c', bgColor: '#ffedd5', label: 'Prática' },
  etica: { color: '#0284c7', bgColor: '#e0f2fe', label: 'Ética' },
  tempo: { color: '#16a34a', bgColor: '#dcfce7', label: 'Tempo/Ciclo' },
  psicologia: { color: '#dc2626', bgColor: '#fee2e2', label: 'Psicologia' },
};

export default async function WisdomPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getWisdomPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const categoryInfo = categoryConfig[frontmatter.category] || categoryConfig.conceito;

  return (
    <>
      <TopBar />
      <div style={{ backgroundColor: '#FDFBF7', minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
          {/* Back Link */}
          <Link 
            href="/sabedoria"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ 
              color: '#C05621',
              fontFamily: 'var(--font-sans)'
            }}
          >
            <ArrowLeft size={16} />
            Voltar para Sabedoria
          </Link>

          {/* Article Header */}
          <article>
            {/* Category Badge */}
            <div className="mb-6">
              <span 
                className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full"
                style={{
                  backgroundColor: categoryInfo.bgColor,
                  color: categoryInfo.color,
                  fontFamily: 'var(--font-sans)'
                }}
              >
                {categoryInfo.label}
              </span>
            </div>

            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: '#2D2420'
              }}
            >
              {frontmatter.title}
            </h1>

            {/* Pronunciation */}
            {frontmatter.pronunciation && (
              <p 
                className="text-lg md:text-xl mb-4 italic"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  color: '#78716c'
                }}
              >
                /{frontmatter.pronunciation}/
              </p>
            )}

            {/* Definition Box */}
            <div 
              className="mb-8 p-6 rounded"
              style={{
                backgroundColor: '#fafaf9',
                borderLeft: '3px solid #C05621'
              }}
            >
              <div className="text-sm uppercase tracking-wider mb-2" style={{ color: '#78716c', fontFamily: 'var(--font-sans)' }}>
                Definição
              </div>
              <div className="text-xl leading-relaxed" style={{ fontFamily: 'var(--font-serif)', color: '#44403C' }}>
                {frontmatter.definition}
              </div>
            </div>

            {/* Metadata */}
            <div 
              className="flex flex-wrap items-center gap-4 md:gap-6 pb-8 mb-8"
              style={{ 
                borderBottom: '1px solid #e7e5e4',
                fontFamily: 'var(--font-sans)'
              }}
            >
              <div className="flex items-center gap-2 text-sm" style={{ color: '#78716c' }}>
                <Calendar size={16} />
                {format(new Date(frontmatter.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>

              <div className="flex items-center gap-2 text-sm" style={{ color: '#78716c' }}>
                <BookOpen size={16} />
                {frontmatter.category}
              </div>
            </div>

            {/* Etymology (if present) */}
            {frontmatter.etymology && (
              <div 
                className="mb-8 p-6 rounded"
                style={{
                  backgroundColor: '#fef3c7',
                  borderLeft: '3px solid #f59e0b'
                }}
              >
                <div className="text-sm uppercase tracking-wider mb-2" style={{ color: '#92400e', fontFamily: 'var(--font-sans)' }}>
                  Etimologia
                </div>
                <div className="text-base" style={{ fontFamily: 'var(--font-serif)', color: '#78350f' }}>
                  {frontmatter.etymology}
                </div>
              </div>
            )}

            {/* MDX Content */}
            <div 
              className="prose prose-lg max-w-none"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: '#44403C'
              }}
            >
              <MDXRemote source={content} />
            </div>

            {/* Synonyms */}
            {frontmatter.synonyms && frontmatter.synonyms.length > 0 && (
              <div className="mt-8 pt-8" style={{ borderTop: '1px solid #e7e5e4' }}>
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#2D2420' }}>
                  Sinônimos e Termos Relacionados
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  {frontmatter.synonyms.map((synonym) => (
                    <span
                      key={synonym}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{
                        backgroundColor: '#f5f5f4',
                        color: '#57534e',
                        fontFamily: 'var(--font-sans)'
                      }}
                    >
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="mt-8 pt-8" style={{ borderTop: '1px solid #e7e5e4' }}>
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag size={16} style={{ color: '#78716c' }} />
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{
                        backgroundColor: categoryInfo.bgColor,
                        color: categoryInfo.color,
                        fontFamily: 'var(--font-sans)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
