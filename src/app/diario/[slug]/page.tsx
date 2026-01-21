import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, Calendar, Clock, MessageCircle, Tag } from 'lucide-react';
import { getDiaryPostBySlug, getAllDiaryPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

// Generate static params for all diary posts
export async function generateStaticParams() {
  const posts = getAllDiaryPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getDiaryPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.frontmatter.title} | Sangha Digital`,
    description: post.frontmatter.excerpt,
  };
}

export default async function DiaryPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getDiaryPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;

  return (
    <>
      <TopBar />
      <div style={{ backgroundColor: '#FDFBF7', minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
          {/* Back Link */}
          <Link 
            href="/diario"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ 
              color: '#C05621',
              fontFamily: 'var(--font-sans)'
            }}
          >
            <ArrowLeft size={16} />
            Voltar para o Diário
          </Link>

          {/* Article Header */}
          <article>
            {/* Category Badge */}
            {frontmatter.category && (
              <div className="mb-6">
                <span 
                  className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full"
                  style={{
                    backgroundColor: '#ffedd5',
                    color: '#C05621',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {frontmatter.category}
                </span>
              </div>
            )}

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

            {/* Excerpt */}
            {frontmatter.excerpt && (
              <p 
                className="text-xl md:text-2xl mb-8 leading-relaxed"
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  color: '#57534e'
                }}
              >
                {frontmatter.excerpt}
              </p>
            )}

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
                <Clock size={16} />
                {readingTime} de leitura
              </div>

              {frontmatter.comments !== undefined && (
                <div className="flex items-center gap-2 text-sm" style={{ color: '#78716c' }}>
                  <MessageCircle size={16} />
                  {frontmatter.comments} {frontmatter.comments === 1 ? 'comentário' : 'comentários'}
                </div>
              )}
            </div>

            {/* Sanskrit Term (if present) */}
            {frontmatter.sanskrit && frontmatter.sanskritMeaning && (
              <div 
                className="mb-8 p-6 rounded"
                style={{
                  backgroundColor: '#fafaf9',
                  borderLeft: '3px solid #C05621'
                }}
              >
                <div className="text-sm uppercase tracking-wider mb-2" style={{ color: '#78716c', fontFamily: 'var(--font-sans)' }}>
                  Termo Sânscrito
                </div>
                <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)', color: '#C05621' }}>
                  {frontmatter.sanskrit}
                </div>
                <div className="text-base" style={{ fontFamily: 'var(--font-serif)', color: '#57534e' }}>
                  {frontmatter.sanskritMeaning}
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

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="mt-12 pt-8" style={{ borderTop: '1px solid #e7e5e4' }}>
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag size={16} style={{ color: '#78716c' }} />
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{
                        backgroundColor: '#f5f5f4',
                        color: '#57534e',
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
