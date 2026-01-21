// ============================================
// TYPE DEFINITIONS - SANGHA DIGITAL
// ============================================

/**
 * Status do Laboratório (Kanban)
 */
export type LabStatus = 'todo' | 'doing' | 'done';

/**
 * Categorias da Sabedoria (Wiki)
 */
export type WisdomCategory = 
  | 'conceito'      // Conceitos gerais
  | 'pratica'       // Práticas
  | 'etica'         // Ética
  | 'tempo'         // Temporalidade
  | 'psicologia';   // Psicologia/Psicanálise

/**
 * COLLECTION: Diary (Diário de Bordo)
 * Posts reflexivos com conceitos linkados
 */
export interface DiaryFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  
  // Conceitos linkados que aparecem no post (hover cards)
  relatedConcepts?: string[]; // slugs da Sabedoria
  
  // Estudos do Lab vinculados
  relatedLab?: string[]; // slugs do Laboratório
  
  // Flags opcionais
  featured?: boolean; // Aparece nos "Destaques"
  draft?: boolean;
}

/**
 * COLLECTION: Lab (Laboratório - Kanban)
 * Estudos, rituais e práticas em progresso
 */
export interface LabFrontmatter {
  title: string;
  date: string; // Data de criação
  
  // KANBAN STATUS - Campo crítico
  status: LabStatus; // 'todo' | 'doing' | 'done'
  
  // Metadata
  type: 'ritual' | 'estudo' | 'pratica'; // Tipo de item
  description: string; // Descrição curta para o card
  
  // Timing
  duration?: string; // Ex: "21 dias", "3 meses"
  deadline?: string; // Data limite (ISO)
  daysRemaining?: number; // Calculado automaticamente
  
  // Tags e relações
  tags: string[];
  relatedConcepts?: string[]; // Links para Sabedoria
  relatedDiary?: string[]; // Posts que mencionam este estudo
  
  // Flags
  featured?: boolean; // Aparece no "Foco Atual" da Home
}

/**
 * COLLECTION: Wisdom (Sabedoria - Wiki Pessoal)
 * Glossário de conceitos
 */
export interface WisdomFrontmatter {
  title: string; // Nome do conceito (ex: "Titiksha")
  
  // Categorização
  category: WisdomCategory;
  tags: string[];
  
  // Conteúdo da definição
  shortDefinition: string; // Para hover card (1 linha)
  etymology?: string; // Etimologia se aplicável
  
  // Relações
  relatedDiary?: string[]; // Posts que usam este conceito
  relatedLab?: string[]; // Estudos que abordam este conceito
  relatedConcepts?: string[]; // Outros conceitos relacionados
  
  // Badges visuais (conforme mockup)
  badge?: string; // Ex: "Conceito", "Prática", "Ética"
}

/**
 * POST COMPLETO (após parsing)
 */
export interface Post<T> {
  slug: string;
  frontmatter: T;
  content: string;
  readingTime?: number; // Em minutos
}

// ============================================
// HELPER TYPES
// ============================================

export type DiaryPost = Post<DiaryFrontmatter>;
export type LabPost = Post<LabFrontmatter>;
export type WisdomPost = Post<WisdomFrontmatter>;

/**
 * Estrutura de arquivos esperada:
 * 
 * content/
 * ├── diary/
 * │   ├── 2026-01-22-apego-autonomia.mdx
 * │   └── 2026-01-21-60-dias-marco.mdx
 * ├── lab/
 * │   ├── jejum-ekadashi.mdx
 * │   ├── estudo-corpo-causal.mdx
 * │   └── mandala-19mar.mdx
 * └── wisdom/
 *     ├── swastha.mdx
 *     ├── titiksha.mdx
 *     ├── upeksha.mdx
 *     └── kshana.mdx
 */
