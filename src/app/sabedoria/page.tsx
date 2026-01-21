import { BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getAllWisdomPosts } from '@/lib/mdx';

// Category config para manter consistência com a página individual
const categoryConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  conceito: { label: 'Conceito Filosófico', color: '#7c3aed', bgColor: '#ede9fe' },
  pratica: { label: 'Prática', color: '#ea580c', bgColor: '#ffedd5' },
  etica: { label: 'Ética', color: '#0284c7', bgColor: '#e0f2fe' },
  tempo: { label: 'Tempo/Ciclo', color: '#16a34a', bgColor: '#dcfce7' },
  psicologia: { label: 'Psicologia', color: '#dc2626', bgColor: '#fee2e2' },
};

export default function SabedoriaPage() {
  const wisdomPosts = getAllWisdomPosts();
  const categories = Array.from(new Set(wisdomPosts.map((post) => post.frontmatter.category)));
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧠 Sabedoria Interconectada
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Glossário vivo de conceitos fundamentais. Cada termo está conectado 
            às reflexões do Diário através de <em className="text-orange-600">wiki-links</em>.
          </p>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h3 className="font-semibold text-purple-900 mb-2">
              ✨ Como usar este glossário
            </h3>
            <p className="text-sm text-purple-800">
              Quando você encontrar um termo destacado no Diário (como{' '}
              <span className="text-orange-600 underline decoration-dotted cursor-help">
                Viṣāda
              </span>
              ), passe o mouse sobre ele para ver uma definição rápida. 
              Clique para vir até aqui e explorar o conceito em profundidade.
            </p>
          </div>
        </header>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const catInfo = categoryConfig[category] || categoryConfig.conceito;
            return (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-white border-2 border-gray-200 hover:border-orange-300 text-sm font-medium transition-all"
                style={{
                  color: catInfo.color,
                }}
              >
                {catInfo.label}
              </button>
            );
          })}
        </div>

        {/* Glossary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wisdomPosts.map((post) => {
            const catInfo = categoryConfig[post.frontmatter.category] || categoryConfig.conceito;
            return (
              <article
                key={post.slug}
                className="bg-white rounded-lg border-2 border-gray-100 hover:border-orange-300 transition-all p-6 shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                      {post.frontmatter.title}
                    </h2>
                    {post.frontmatter.pronunciation && (
                      <div className="text-sm italic text-gray-500">
                        /{post.frontmatter.pronunciation}/
                      </div>
                    )}
                  </div>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{
                      backgroundColor: catInfo.bgColor,
                      color: catInfo.color,
                    }}
                  >
                    {catInfo.label}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.frontmatter.definition}
                </p>

                <Link
                  href={`/sabedoria/${post.slug}`}
                  className="text-orange-600 font-medium hover:text-orange-700 transition-colors inline-flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Explorar conceito completo →
                </Link>
              </article>
            );
          })}
        </div>

        {/* Add New Term CTA */}
        <div className="mt-12 bg-gradient-to-br from-orange-50 to-purple-50 rounded-lg p-8 text-center border-2 border-dashed border-orange-200">
          <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Este glossário está sempre crescendo
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Novos termos surgem organicamente das leituras e práticas. 
            Cada conceito aqui foi encontrado em contexto real durante o Sādhana.
          </p>
        </div>
      </div>
    </div>
  );
}
