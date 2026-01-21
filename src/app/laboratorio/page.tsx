import StatusBoard from '@/components/mdx/StatusBoard';

const studies = [
  {
    title: 'Bhagavad Gītā - Capítulos 1-6',
    description: 'Estudo aprofundado dos primeiros 6 capítulos com comentários de Śaṅkara',
    status: 'integrated' as const,
    tags: ['Filosofia', 'Sânscrito'],
    linkedPosts: ['2026-01-21-raiva-de-ser-livre'],
  },
  {
    title: 'Yoga Sūtras de Patañjali',
    description: 'Análise dos 196 aforismos, com foco em Samādhi Pāda',
    status: 'in-progress' as const,
    tags: ['Yoga', 'Filosofia'],
    linkedPosts: [],
  },
  {
    title: 'Lacan - Seminário 7: A Ética da Psicanálise',
    description: 'Cruzamento entre o conceito de Das Ding e o Ātman védico',
    status: 'in-progress' as const,
    tags: ['Psicanálise', 'Filosofia'],
    linkedPosts: [],
  },
  {
    title: 'Upaniṣads - Īśa e Kaṭha',
    description: 'Tradução direta do sânscrito com análise gramatical',
    status: 'planned' as const,
    tags: ['Sânscrito', 'Filosofia'],
    linkedPosts: [],
  },
  {
    title: 'Prāṇāyāma Avançado',
    description: 'Técnicas de Nāḍī Śodhana, Kapālabhāti e Bhastrikā - 40 min/dia',
    status: 'integrated' as const,
    tags: ['Prática', 'Yoga'],
    linkedPosts: ['2026-01-21-raiva-de-ser-livre'],
  },
  {
    title: 'Meditação nos Chakras',
    description: 'Ciclo de 7 semanas focando um chakra por semana',
    status: 'in-progress' as const,
    tags: ['Prática', 'Meditação'],
    linkedPosts: [],
  },
];

export default function LaboratorioPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Laboratório de Estudos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Cronograma visual dos materiais em estudo, organizados em três fases: 
            Planejado, Em Andamento e Integrado à prática.
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h3 className="font-semibold text-orange-900 mb-2">
              📊 Método Kanban Aplicado ao Sādhana
            </h3>
            <p className="text-sm text-orange-800">
              Cada estudo passa por três estágios: <strong>Planejado</strong> (leitura inicial e organização), 
              <strong> Em Andamento</strong> (estudo ativo com anotações), e <strong>Integrado</strong> 
              (aplicado nas práticas diárias e reflexões do Diário).
            </p>
          </div>
        </header>

        <StatusBoard studies={studies} title="Cronograma de Sādhana 2026" />

        <section className="mt-16 bg-slate-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Princípios do Laboratório
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                🔗 Interconexão Radical
              </h3>
              <p className="text-gray-700 text-sm">
                Cada estudo deve gerar pelo menos uma reflexão no Diário e enriquecer 
                o Glossário da Sabedoria com novos termos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                ⏱️ Slow Study
              </h3>
              <p className="text-gray-700 text-sm">
                Preferência por profundidade sobre velocidade. Um capítulo bem digerido 
                vale mais que um livro lido superficialmente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                🌱 Crescimento Orgânico
              </h3>
              <p className="text-gray-700 text-sm">
                Novos estudos surgem naturalmente das lacunas percebidas durante 
                a prática e reflexão.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                🎯 Prática como Critério
              </h3>
              <p className="text-gray-700 text-sm">
                Um estudo só é considerado "Integrado" quando suas ideias são 
                aplicadas concretamente no Sādhana diário.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
