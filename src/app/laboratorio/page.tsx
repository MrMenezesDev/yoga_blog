import KanbanBoard from '@/components/lab/KanbanBoard';
import { getAllLabPosts } from '@/lib/mdx';
import { FlaskConical } from 'lucide-react';

export default async function LaboratorioPage() {
  const labPosts = getAllLabPosts();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-8 h-8 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Laboratório (Kanban)
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Cronograma visual de estudos, rituais e práticas organizados por status: 
            A Estudar → Em Prática → Integrado.
          </p>
        </header>

        <KanbanBoard posts={labPosts} />

        <section className="mt-16 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-8 border-2 border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Como funciona o Kanban
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📋 A Estudar</h3>
              <p className="text-sm text-gray-700">
                Estudos planejados mas ainda não iniciados. Estão no radar, aguardando o momento certo.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🔥 Em Prática</h3>
              <p className="text-sm text-gray-700">
                Rituais e estudos ativos no momento. Aqui acontece a experimentação e o aprendizado.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">✅ Integrado</h3>
              <p className="text-sm text-gray-700">
                Práticas que se tornaram parte da rotina ou estudos concluídos e aplicados no Diário.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
