# 🌱 योग Garden - Digital Garden de Yoga e Psicanálise

Um ecossistema vivo de conhecimento interconectado, integrando Yoga, Sânscrito, Psicanálise e Tecnologia.

## 🎯 Conceito: Digital Garden

Este não é um blog tradicional linear. É um **Digital Garden** onde:

- ✨ **Conteúdos crescem organicamente** e são constantemente atualizados
- 🔗 **Tudo está interconectado** através de wiki-links e hover cards
- 📊 **Conhecimento é visualizado** com componentes interativos (Gunas, Chakras, Kanban)
- 🧭 **Navegação não-linear** permite exploração fluida entre seções

## 🏗️ Arquitetura

### Layout de 3 Colunas

```
┌─────────────┬──────────────────────┬─────────────┐
│   Sidebar   │   Conteúdo Principal │     ToC     │
│  (Esquerda) │                      │  (Direita)  │
├─────────────┼──────────────────────┼─────────────┤
│ - Início    │                      │ ## Heading  │
│ - Diário    │   Artigo / Dashboard │ ## Heading  │
│ - Lab       │                      │   Subitem   │
│ - Sabedoria │                      │ ## Heading  │
└─────────────┴──────────────────────┴─────────────┘
```

### 4 Seções Principais

#### 1. 🏠 Início (Dashboard)
- **Widget Sadhana Atual**: Foco energético e progresso (Dia X/365)
- **Jardim Recente**: Grid com últimas atualizações de todas as seções
- **Apresentação**: Quem sou e propósito do projeto
- **Quick Stats**: Números de posts, termos, estudos

**Arquivo**: `src/app/page.tsx`

#### 2. 📖 Diário
- Feed de reflexões diárias sobre Sādhana
- Posts em MDX com componentes interativos
- Suporte a wiki-links inline
- ToC automático à direita

**Pasta**: `src/app/diario/` e `content/posts/`

#### 3. 🧪 Laboratório
- Cronograma visual estilo Kanban
- 3 colunas: Planejado → Em Andamento → Integrado
- Cards de estudos com tags e posts relacionados
- Tracking de progresso

**Arquivo**: `src/app/laboratorio/page.tsx`

#### 4. 🧠 Sabedoria
- Glossário de termos em Sânscrito, Yoga e Psicanálise
- Cards clicáveis com preview
- Filtros por categoria
- Cada termo vinculado aos posts do Diário

**Pasta**: `src/app/sabedoria/`

## 🧩 Componentes Principais

### Componentes de Layout
- **`Sidebar.tsx`**: Navegação persistente com 4 seções
- **`TableOfContents.tsx`**: ToC dinâmico com scroll spy

### Componentes do Dashboard
- **`SadhanaWidget.tsx`**: Card de destaque com progresso da ascese
- **`RecentGarden.tsx`**: Grid de atualizações recentes
- **`AboutSection.tsx`**: Apresentação do projeto

### Componentes MDX de Interconexão
- **`WikiLink.tsx`**: Links com hover cards para definições
- **`StatusBoard.tsx`**: Quadro Kanban para estudos

### Componentes Yoga (já existentes)
- **`SanskritTerm.tsx`**: Exibe termos com devanāgarī e etimologia
- **`GunaChart.tsx`**: Gráfico de barras para Sattva/Rajas/Tamas
- **`MandalaClock.tsx`**: Termômetro energético dos Chakras

## 📝 Como Usar os Componentes

### Exemplo 1: WikiLink com Hover Card

```mdx
No primeiro capítulo, Arjuna experimenta <WikiLink 
  term="Viṣāda" 
  definition="Desalento profundo que marca o início da jornada espiritual."
  devanagari="विषाद"
  category="sanskrit"
>
  Viṣāda
</WikiLink> antes de iniciar o diálogo com Krishna.
```

**Resultado**: Ao passar o mouse sobre "Viṣāda", aparece um popover com:
- Termo em Devanāgarī
- Definição curta
- Link para página completa na Sabedoria

### Exemplo 2: Status Board

```mdx
<StatusBoard studies={[
  {
    title: "Bhagavad Gītā - Cap. 1-6",
    description: "Estudo dos primeiros capítulos",
    status: "integrated",
    tags: ["Filosofia", "Sânscrito"],
    linkedPosts: ["2026-01-21-raiva-de-ser-livre"]
  },
  {
    title: "Yoga Sūtras",
    status: "in-progress",
    tags: ["Yoga"]
  },
  {
    title: "Meditação Vipassanā",
    status: "planned",
    tags: ["Prática"]
  }
]} />
```

**Resultado**: Quadro Kanban visual com 3 colunas

### Exemplo 3: Componente Yoga

```mdx
<SanskritTerm 
  term="Sthira"
  devanagari="स्थिर"
  transliteration="sthira"
  meaning="Estabilidade, firmeza"
  etymology="De sthā (estar firme)"
/>
```

## 🎨 Design System

### Cores Principais
- **Laranja Açafrão**: `orange-500` / `#f97316` (destaque, links)
- **Roxo**: `purple-500` (Sabedoria)
- **Azul**: `blue-500` (Diário, Sattva)
- **Verde**: `green-500` (Laboratório - Integrado)
- **Vermelho**: `red-500` (Rajas)
- **Cinza**: `gray-600` (Tamas)

### Tipografia
- **Títulos**: Playfair Display (serif) - elegância clássica
- **Corpo**: Geist Sans - legibilidade moderna
- **Código**: Geist Mono

### Gradientes
```css
from-orange-50 via-white to-blue-50  /* Fundo padrão */
from-orange-500 to-orange-600        /* Widget Sadhana */
from-purple-50 via-pink-50 to-orange-50 /* Mandala Clock */
```

## 📂 Estrutura de Pastas

```
blog_yoga_site/
├── content/
│   └── posts/                    # Arquivos MDX dos posts
│       ├── 2026-01-21-raiva-de-ser-livre.mdx
│       └── 2026-01-21-exemplo-interconexoes.mdx
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Layout root com Sidebar
│   │   ├── page.tsx              # Dashboard (Home)
│   │   ├── diario/page.tsx       # Lista de posts
│   │   ├── laboratorio/page.tsx  # Cronograma Kanban
│   │   ├── sabedoria/page.tsx    # Glossário
│   │   └── posts/[slug]/page.tsx # Template de post
│   └── components/
│       ├── layout/
│       │   ├── Sidebar.tsx
│       │   └── TableOfContents.tsx
│       ├── dashboard/
│       │   ├── SadhanaWidget.tsx
│       │   ├── RecentGarden.tsx
│       │   └── AboutSection.tsx
│       ├── mdx/
│       │   ├── WikiLink.tsx
│       │   └── StatusBoard.tsx
│       ├── yoga/
│       │   ├── SanskritTerm.tsx
│       │   ├── GunaChart.tsx
│       │   └── MandalaClock.tsx
│       └── philosophy/
│           └── LacanianInsight.tsx
├── mdx-components.tsx            # Configuração MDX
└── package.json
```

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

Acesse: `http://localhost:3000`

## 🔧 Tecnologias

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **MDX** (`@next/mdx`, `@mdx-js/react`)
- **Lucide React** (ícones)

## 🌱 Filosofia de Uso

### Crescimento Orgânico
Novos conteúdos surgem das lacunas percebidas durante o estudo. Não há cronograma rígido de publicação.

### Interconexão Radical
Todo post deve:
1. Linkar pelo menos 1 termo da Sabedoria
2. Referenciar estudos do Laboratório quando aplicável
3. Adicionar novos termos ao glossário quando necessário

### Manutenção Viva
Posts antigos são **constantemente atualizados** conforme o entendimento evolui. Cada página tem data de criação E última atualização.

### Navegação Não-Linear
O objetivo é permitir 3 tipos de leitura:
1. **Linear**: Diário cronológico
2. **Temática**: Filtrar por tags
3. **Exploratória**: Seguir wiki-links e conexões

## 📖 Exemplos de Fluxo

### Fluxo 1: Do Diário à Sabedoria
1. Leio uma reflexão no Diário
2. Encontro o termo "Viṣāda" com hover card
3. Clico para ir à página completa na Sabedoria
4. Vejo outros posts que usam esse conceito
5. Navego para outro post relacionado

### Fluxo 2: Do Laboratório ao Diário
1. Vejo no Laboratório que "Bhagavad Gītā Cap. 1-6" está "Integrado"
2. Clico para ver posts vinculados
3. Leio a reflexão "A Raiva de Ser Livre"
4. Descubro novos termos em Sânscrito
5. Exploro o glossário

### Fluxo 3: Dashboard → Exploração
1. Entro no site (Dashboard)
2. Vejo widget "Sadhana Atual: Manipura Chakra"
3. Clico em "Jardim Recente"
4. Descubro uma atualização no Laboratório
5. Navego para lá e vejo novo estudo planejado

## 🤝 Contribuindo

Este é um projeto pessoal de Sādhana, mas feedbacks sobre a estrutura técnica do Digital Garden são bem-vindos via issues/PRs.

## 📜 Licença

MIT License - Sinta-se livre para usar esta estrutura como base para seu próprio Digital Garden.

---

**"योग: कर्मसु कौशलम्"** — Yoga é habilidade na ação (Bhagavad Gītā 2.50)
