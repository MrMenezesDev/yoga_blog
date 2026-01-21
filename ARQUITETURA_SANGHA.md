# 🏗️ Arquitetura Sangha Digital - Documentação Técnica

## 📋 Visão Geral

Sistema de Digital Garden com 3 coleções interconectadas (Diário, Laboratório, Sabedoria) usando Next.js 16, TypeScript, Tailwind e MDX com parsing manual via `gray-matter` e `next-mdx-remote`.

---

## 1. SCHEMA DE TIPOS (Type-Safe Collections)

### 📁 Localização: `src/types/content.ts`

```typescript
// Diário - Posts reflexivos
interface DiaryFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  relatedConcepts?: string[];  // Links para Sabedoria
  relatedLab?: string[];       // Links para Laboratório
  featured?: boolean;
  draft?: boolean;
}

// Laboratório - Kanban de estudos/rituais
interface LabFrontmatter {
  title: string;
  date: string;
  status: 'todo' | 'doing' | 'done';  // ⭐ CAMPO CRÍTICO PARA KANBAN
  type: 'ritual' | 'estudo' | 'pratica';
  description: string;
  duration?: string;
  deadline?: string;
  daysRemaining?: number;  // Auto-calculado
  tags: string[];
  relatedConcepts?: string[];
  relatedDiary?: string[];
  featured?: boolean;  // Aparece no header
}

// Sabedoria - Wiki de conceitos
interface WisdomFrontmatter {
  title: string;
  category: 'conceito' | 'pratica' | 'etica' | 'tempo' | 'psicologia';
  tags: string[];
  shortDefinition: string;  // Para hover card
  etymology?: string;
  badge?: string;
  relatedDiary?: string[];
  relatedLab?: string[];
  relatedConcepts?: string[];
}
```

### 📂 Estrutura de Pastas

```
content/
├── diary/           # Posts do Diário
│   └── do-apego-autonomia.mdx
├── lab/             # Items do Kanban
│   ├── jejum-ekadashi.mdx        (status: doing)
│   ├── mandala-19mar.mdx          (status: doing, featured: true)
│   └── estudo-corpo-causal.mdx   (status: todo)
└── wisdom/          # Glossário
    ├── titiksha.mdx
    ├── swastha.mdx
    ├── upeksha.mdx
    └── kshana.mdx
```

---

## 2. FUNÇÕES DE CARREGAMENTO

### 📁 Localização: `src/lib/mdx.ts`

```typescript
// Carregar todos os posts de uma coleção
getAllDiaryPosts(): DiaryPost[]
getAllLabPosts(): LabPost[]
getAllWisdomPosts(): WisdomPost[]

// Carregar post individual
getDiaryPostBySlug(slug: string): DiaryPost | null
getLabPostBySlug(slug: string): LabPost | null
getWisdomPostBySlug(slug: string): WisdomPost | null

// Filtros especiais
getLabPostsByStatus(status): LabPost[]     // Para Kanban
getCurrentFocus(): LabPost | null           // Para Header
getFeaturedDiaryPosts(limit): DiaryPost[]   // Para Dashboard
getConceptsBySlugsBatch(slugs[]): Map       // Para Hover Cards
```

**Características:**
- Parsing com `gray-matter`
- Cálculo automático de `daysRemaining` baseado em `deadline`
- Ordenação por data (posts mais recentes primeiro)
- Reading time calculation

---

## 3. LAYOUT PERSISTENTE

### Header Preto (Foco Atual)
**Componente:** `src/components/layout/FocusHeader.tsx`
- Busca o item do Lab com `featured: true`
- Mostra título + contagem regressiva
- Atualização client-side com `date-fns`

### Navbar Branca (4 Seções)
**Componente:** `src/components/layout/Navigation.tsx`
- Início, Diário, Laboratório, Sabedoria
- Active state com `usePathname()`
- Ícones: Lucide React

### Layout Root
**Arquivo:** `src/app/layout.tsx`
```tsx
<FocusHeaderServer /> {/* Server Component */}
<Navigation />        {/* Client Component */}
<main>{children}</main>
```

---

## 4. COMPONENTE KANBAN BOARD

### 📁 Localização: `src/components/lab/KanbanBoard.tsx`

**Funcionalidade:**
1. Recebe array de `LabPost[]`
2. Filtra automaticamente por status: `todo`, `doing`, `done`
3. Renderiza 3 colunas lado a lado
4. Cada card mostra:
   - Badge do tipo (Ritual/Estudo/Prática)
   - Título + descrição
   - Tags
   - Contagem de dias restantes (se houver deadline)
   - Links para posts/conceitos relacionados

**Visual:**
- Cores diferentes por coluna (cinza/laranja/verde)
- Hover effect nos cards
- Link direto para `/laboratorio/{slug}`

### Uso na Página
```tsx
// src/app/laboratorio/page.tsx
const labPosts = getAllLabPosts();
return <KanbanBoard posts={labPosts} />
```

---

## 5. HOVER CARD PARA CONCEITOS

### 📁 Localização: `src/components/mdx/ConceptHoverCard.tsx`

**Tecnologia:** Radix UI `@radix-ui/react-hover-card`

**Funcionalidade:**
1. Recebe `slug` e `concept` (WisdomPost)
2. Renderiza link com underline pontilhado
3. Ao hover, mostra popover com:
   - Título do conceito
   - Badge da categoria
   - Definição curta (`shortDefinition`)
   - Etimologia (se houver)
   - Link para página completa

**Cores por Categoria:**
- Conceito: azul
- Prática: verde
- Ética: roxo
- Tempo: laranja
- Psicologia: rosa

### Uso no MDX
```tsx
<ConceptHoverCard slug="titiksha" concept={conceptData}>
  Titikṣā
</ConceptHoverCard>
```

---

## 6. EXEMPLO REAL: ARQUIVO MDX DO LAB

### `content/lab/jejum-ekadashi.mdx`

```mdx
---
title: "Jejum de Ekadāśī"
date: "2026-01-15"
status: "doing"              # ⭐ DETERMINA A COLUNA DO KANBAN
type: "ritual"
description: "Jejum quinzenal para purificação"
duration: "Contínuo (2x/mês)"
deadline: "2026-12-31"
tags: ["Ritual", "Sādhana"]
relatedConcepts: ["titiksha", "upeksha"]
featured: false
---

# Jejum de Ekadāśī

## Protocolo Atual
- Manhã: Água com limão
- Tarde: Frutas
- Noite: Leite com açafrão

## Desafios
O principal não é a fome física, mas a **inquietação mental**.
Aqui entra **Titikṣā** - não reagir compulsivamente.
```

**Resultado:**
- ✅ Aparece na coluna "Em Prática" do Kanban
- ✅ Contagem regressiva de dias até 31/12/2026
- ✅ Menções a "Titikṣā" podem ter hover card
- ✅ Tags exibidas no card

---

## 7. FLUXO DE DADOS (Data Flow)

### Exemplo: Dashboard → Kanban → Post Individual

```
1. Usuário acessa /laboratorio
2. Page Server Component chama getAllLabPosts()
3. MDX parsing + frontmatter extraction
4. Passa array para <KanbanBoard posts={...} />
5. KanbanBoard filtra por status automaticamente
6. Renderiza 3 colunas com cards
7. Usuário clica em card → /laboratorio/jejum-ekadashi
8. getLabPostBySlug() carrega MDX completo
9. Renderiza com next-mdx-remote
```

### Exemplo: Diário → Hover Card → Sabedoria

```
1. Post do Diário menciona "Titikṣā"
2. Componente <ConceptHoverCard slug="titiksha" />
3. No servidor: getWisdomPostBySlug("titiksha")
4. Passa concept data pro client component
5. Hover mostra popover com definição
6. Click navega para /sabedoria/titiksha
```

---

## 8. DESIGN SYSTEM

### Cores Principais
```css
--orange-600: #f97316;  /* Accent (links, buttons) */
--gray-900: #0a0a0a;    /* Header background */
--gray-50: #f9fafb;     /* Page background */
```

### Tipografia
- **Títulos:** Playfair Display (serif)
- **Corpo:** Geist Sans
- **Código:** Geist Mono

### Gradientes
```css
/* Diário */
from-blue-50 to-white

/* Laboratório */
from-orange-50 to-yellow-50

/* Sabedoria */
from-purple-50 to-pink-50
```

---

## 9. CHECKLIST DE IMPLEMENTAÇÃO

### ✅ Concluído
- [x] Types definidos (`src/types/content.ts`)
- [x] Funções MDX (`src/lib/mdx.ts`)
- [x] Layout persistente (Header + Nav)
- [x] Componente KanbanBoard
- [x] Componente ConceptHoverCard
- [x] Exemplos MDX (3 coleções)
- [x] Página Laboratório com Kanban

### 🚧 Próximos Passos (Sugeridos)
- [ ] Página individual de post do Lab (`/laboratorio/[slug]`)
- [ ] Página Sabedoria com grid de conceitos
- [ ] Dashboard (Home) com widgets
- [ ] Página Diário com lista de posts
- [ ] Sistema de tags/filtros
- [ ] Busca global

---

## 10. COMANDOS ÚTEIS

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Adicionar novo Lab item
touch content/lab/nome-do-item.mdx

# Estrutura mínima Lab
---
title: "Título"
status: "todo"  # ou "doing" ou "done"
type: "ritual"   # ou "estudo" ou "pratica"
description: "Descrição curta"
tags: []
---
```

---

## 11. DEPENDÊNCIAS PRINCIPAIS

```json
{
  "next": "16.1.4",
  "react": "19.2.3",
  "next-mdx-remote": "^5.0.0",
  "gray-matter": "^4.0.3",
  "date-fns": "^4.1.0",
  "@radix-ui/react-hover-card": "^1.1.3",
  "lucide-react": "latest",
  "tailwindcss": "^4.0.0"
}
```

---

## 📌 RESUMO EXECUTIVO

**O que foi entregue:**

1. ✅ **Schema TypeScript** com 3 coleções (Diary, Lab, Wisdom)
2. ✅ **Componente KanbanBoard** que auto-organiza por status
3. ✅ **Arquivos MDX de exemplo** com frontmatter completo
4. ✅ **Layout persistente** (header preto + navbar)
5. ✅ **Hover Cards** para conceitos da Sabedoria
6. ✅ **Sistema de relações** entre coleções via slugs

**Diferenciais técnicos:**
- Type-safety sem Contentlayer (Next 16 ready)
- Cálculo automático de deadline no servidor
- Componentes client/server híbridos
- Radix UI para acessibilidade
- Design system baseado nos mockups

**Próximo passo imediato:**
Rodar `npm run dev` e ver o Kanban funcionando em `/laboratorio`.
