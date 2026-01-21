import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, Calendar, Clock, Target, Tag, Flame, Beaker, CheckCircle2 } from 'lucide-react';
import { getLabPostBySlug, getAllLabPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

// Generate static params for all lab posts
export async function generateStaticParams() {
  const posts = getAllLabPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getLabPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Projeto não encontrado',
    };
  }

  return {
    title: `${post.frontmatter.title} | Sangha Digital`,
    description: post.frontmatter.description,
  };
}

// Status config
const statusConfig = {
  todo: { 
    label: 'A Fazer', 
    color: '#78716c', 
    bgColor: '#f5f5f4',
    icon: Target
  },
  doing: { 
    label: 'Em Prática', 
    color: '#ea580c', 
    bgColor: '#ffedd5',
    icon: Flame
  },
  done: { 
    label: 'Completo', 
    color: '#16a34a', 
    bgColor: '#dcfce7',
    icon: CheckCircle2
  },
};

// Type config
const typeConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  estudo: { label: 'Estudo', color: '#7c3aed', bgColor: '#ede9fe' },
  pratica: { label: 'Prática', color: '#ea580c', bgColor: '#ffedd5' },
  experimento: { label: 'Experimento', color: '#0284c7', bgColor: '#e0f2fe' },
  projeto: { label: 'Projeto', color: '#16a34a', bgColor: '#dcfce7' },
};

export default async function LabPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getLabPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const statusInfo = statusConfig[frontmatter.status];
  const typeInfo = typeConfig[frontmatter.type] || typeConfig.estudo;
  const StatusIcon = statusInfo.icon;

  return (
    <>
      <TopBar />
      <div style={{ backgroundColor: '#FDFBF7', minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
          {/* Back Link */}
          <Link 
            href="/laboratorio"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ 
              color: '#C05621',
              fontFamily: 'var(--font-sans)'
            }}
          >
            <ArrowLeft size={16} />
            Voltar para Laboratório
          </Link>

          {/* Article Header */}
          <article>
            {/* Status & Type Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span 
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full"
                style={{
                  backgroundColor: statusInfo.bgColor,
                  color: statusInfo.color,
                  fontFamily: 'var(--font-sans)'
                }}
              >
                <StatusIcon size={14} />
                {statusInfo.label}
              </span>

              <span 
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full"
                style={{
                  backgroundColor: typeInfo.bgColor,
                  color: typeInfo.color,
                  fontFamily: 'var(--font-sans)'
                }}
              >
                <Beaker size={14} />
                {typeInfo.label}
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

            {/* Description */}
            <p 
              className="text-xl md:text-2xl mb-8 leading-relaxed"
              style={{ 
                fontFamily: 'var(--font-serif)',
                color: '#57534e'
              }}
            >
              {frontmatter.description}
            </p>

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
                Início: {format(new Date(frontmatter.date), "d 'de' MMMM", { locale: ptBR })}
              </div>

              {frontmatter.duration && (
                <div className="flex items-center gap-2 text-sm" style={{ color: '#78716c' }}>
                  <Clock size={16} />
                  {frontmatter.duration}
                </div>
              )}

              {frontmatter.deadline && (
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: statusInfo.color }}>
                  <Target size={16} />
                  {frontmatter.daysRemaining !== undefined && frontmatter.daysRemaining > 0
                    ? `${frontmatter.daysRemaining} dias restantes`
                    : 'Prazo encerrado'}
                </div>
              )}
            </div>

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
