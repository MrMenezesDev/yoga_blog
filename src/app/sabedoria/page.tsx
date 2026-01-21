import { Sparkles } from 'lucide-react';
import { getAllWisdomPosts } from '@/lib/mdx';
import WisdomGrid from '@/components/wisdom/WisdomGrid';

export default function SabedoriaPage() {
  const wisdomPosts = getAllWisdomPosts();
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

        <WisdomGrid posts={wisdomPosts} />

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
