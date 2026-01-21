# 🎨 Design System - Sangha Digital

## Visão Geral

Transformação completa do blog de um design genérico para um **Jardim Digital Editorial e Semântico**, inspirado nos canvas React/Tailwind fornecidos. O design agora reflete a profundidade filosófica do conteúdo através de uma estética editorial sofisticada.

---

## 📐 Fundação Visual

### Paleta de Cores Base

#### Background & Superfícies
- **App Background:** `#f5f5f4` (stone-100) - Tom neutro quente
- **Card Background:** `#ffffff` (white) - Contraste limpo
- **Subtle Boxes:** `#f5f5f4` (stone-50) - Para destaques internos

#### Tipografia
- **Texto Principal:** `#44403C` (stone-700) - Cinza chumbo quente
- **Títulos:** `#2D2420` (charcoal/brown-coffee) - Marrom café escuro
- **Texto Secundário:** `#57534e` (stone-600)

#### Accent Colors (Terracota)
- **Primary:** `#C05621` - Terracota principal
- **Hover/Active:** `#A84918` - Terracota escuro
- **Light Backgrounds:** `#fef8f3` - Terracota 50

---

## 🎭 Cores Semânticas (Categorias)

Cada categoria de conteúdo tem cores específicas para criar identidade visual:

| Categoria | Cor Principal | Background | Uso |
|-----------|---------------|------------|-----|
| **Filosofia** | `#9333ea` (purple-600) | `#f3e8ff` | Insights profundos, Vedanta |
| **Prática** | `#ea580c` (orange-600) | `#ffedd5` | Rituais, Tapas, Asanas |
| **Insight** | `#16a34a` (green-600) | `#dcfce7` | Descobertas pessoais |
| **Estudo** | `#0284c7` (sky-600) | `#e0f2fe` | Análise textual, Sutras |
| **Discussão** | `#7c3aed` (violet-600) | `#ede9fe` | Debates filosóficos |
| **Mandala** | `#dc2626` (red-600) | `#fee2e2` | Práticas diárias intensas |

---

## ✍️ Tipografia

### Font Stacks

```css
--font-serif: 'Georgia', 'Times New Roman', serif;
--font-sans: system-ui, -apple-system, sans-serif;
```

### Hierarquia

#### Serif (Conteúdo & Títulos)
- **Hero Title:** text-7xl (72px) - Impacto editorial
- **Section Title:** text-5xl (48px) - Divisões principais  
- **Card Title:** text-3xl (30px) - Destaque de posts
- **Body Text:** text-base (17px) - Leiturabilidade

#### Sans-Serif (UI & Labels)
- **Badges:** text-xs uppercase tracking-wider - Categorias
- **Dates/Meta:** text-sm - Informações secundárias
- **Buttons:** text-base font-medium - Calls-to-action

### Line Height
- **Body:** leading-loose (1.8) - Respiração editorial
- **Titles:** leading-tight (1.2) - Impacto visual

---

## 🧩 Componentes Criados

### 1. TopBar
**Arquivo:** `src/components/TopBar.tsx`

Barra superior fixa com countdown do Mandala.

**Características:**
- Background: `bg-stone-900` (escuro)
- Texto: Terracota-400 para destaque
- Ícone: Target (alvo)
- Tracking: uppercase widest

**Uso:**
```tsx
import TopBar from '@/components/TopBar';

<TopBar />
```

---

### 2. MandalaWidget
**Arquivo:** `src/components/MandalaWidget.tsx`

Checklist visual das práticas diárias.

**Características:**
- Border-left: 4px Terracota-500
- Ícones: Sun, Moon, PenTool, BookOpen
- Estados: CheckCircle (verde) / Circle (cinza)
- Tipografia: Sans para UI

**Uso:**
```tsx
<MandalaWidget />
```

---

### 3. RichPostCard
**Arquivo:** `src/components/RichPostCard.tsx`

Card editorial completo com todas as informações do post.

**Anatomia:**
1. **Category Badge** (topo)
   - Ícone + Label coloridos
   - Fundo com opacity da cor da categoria
   
2. **Title** (destaque)
   - Serif, text-3xl, bold
   - Cor: charcoal (#2D2420)
   
3. **Excerpt** (corpo)
   - Serif, leading-loose
   - Cor: stone-700
   
4. **Sanskrit Term Box** (opcional)
   - Background: stone-50
   - Border-left-2 com cor da categoria
   - Termo em destaque + significado
   
5. **Footer** (meta)
   - Ícones de Calendar e MessageCircle
   - Data + número de comentários

**Características:**
- Border-left-4 colorida por categoria
- Hover: translate-x-1 (horizontal)
- Shadow: editorial-md (0.05 opacity)

**Uso:**
```tsx
<RichPostCard
  slug="diario/post-slug"
  title="Título do Post"
  date="5 de janeiro de 2026"
  category="Filosofia"
  excerpt="Resumo do conteúdo..."
  sanskrit="Nirodha"
  sanskritMeaning="Contenção Potente"
  comments={12}
/>
```

---

### 4. GlossaryCard
**Arquivo:** `src/components/GlossaryCard.tsx`

Card para glossário de termos sânscritos (página Sabedoria).

**Características:**
- Background colorido suave (by category)
- Border-left-4 colorida
- Hover: scale-105 (zoom leve)
- Ícones: Brain, Heart, Sparkles, Shield

**Uso:**
```tsx
<GlossaryCard
  term="Amizade"
  sanskrit="Maitrī"
  definition="Cultivo de amizade com os felizes..."
  category="ethics"
/>
```

---

## 🎨 Padrões Visuais

### Border-Left Pattern
Todos os cards usam `border-left-4` como elemento de identidade:

```tsx
style={{
  borderLeft: `4px solid ${categoryColor}`,
  boxShadow: 'var(--shadow-editorial-md)'
}}
```

### Hover States
- **Cards:** `hover:translate-x-1` (deslize horizontal)
- **Glossary:** `hover:scale-105` (zoom suave)
- **Buttons:** `hover:underline` ou `hover:bg-*`

### Shadows (Editorial)
```css
--shadow-editorial: 0 1px 3px 0 rgb(0 0 0 / 0.05);
--shadow-editorial-md: 0 4px 6px -1px rgb(0 0 0 / 0.05);
--shadow-editorial-lg: 0 10px 15px -3px rgb(0 0 0 / 0.05);
```

**Filosofia:** Sombras muito sutis (0.05 opacity) para elegância editorial.

---

## 📁 Estrutura de Postagens MDX

### Frontmatter Expandido

```yaml
---
title: "Título da Postagem"
date: "2026-01-21"
category: "Filosofia" # ou Prática, Insight, etc
excerpt: "Resumo de 2-3 linhas para preview"
sanskrit: "Darshana"
sanskritMeaning: "Ponto de Vista/Filosofia"
comments: 7
---
```

### Postagens Criadas (baseadas nos Canvas)

1. `2026-01-05-dia-1-cristalizacao.mdx` - Diário de Mandala
2. `2026-01-06-tromba-ganesha.mdx` - Estudo Profundo
3. `2026-01-06-embate-buraco-negro-espelho.mdx` - Debate Filosófico
4. `2026-01-09-arsenal-completo-triangulacao.mdx` - Metodologia
5. `2026-01-14-arqueologia-do-ser.mdx` - Estudo Causal
6. `2026-01-17-yoga-vedanta-metodo-visao.mdx` - Jñana Yoga
7. `2026-01-18-ilusao-da-gota.mdx` - Insight Final
8. `2026-01-20-indiferenca-ou-protecao.mdx` - Ética Yóguica
9. `2026-01-22-apego-autonomia-licoes-relacionamentos.mdx` - Karma Yoga

---

## 🚀 Como Usar o Sistema

### 1. Adicionar Nova Postagem

```bash
# Criar arquivo MDX
touch content/posts/2026-01-XX-titulo-slug.mdx
```

```yaml
---
title: "Meu Novo Post"
date: "2026-01-XX"
category: "Insight" # Escolha da lista
excerpt: "Breve descrição..."
sanskrit: "Viveka"
sanskritMeaning: "Discernimento"
comments: 0
---

Conteúdo em Markdown...
```

### 2. Adicionar Componente Glossário

```tsx
import GlossaryCard from '@/components/GlossaryCard';

<GlossaryCard
  term="Novo Termo"
  sanskrit="Sānscrito"
  definition="Explicação..."
  category="philosophy"
/>
```

---

## 🎯 Próximos Passos (Sugestões)

### Componentes Adicionais
- [ ] **WikiLink** - Links internos entre conceitos
- [ ] **TimelineView** - Visualização cronológica do Mandala
- [ ] **GunaChart** - Gráfico de análise dos Gunas
- [ ] **MandalaClock** - Relógio visual circular do progresso

### Páginas Específicas
- [ ] Atualizar `/diario` com filtros por categoria
- [ ] Criar página individual de post com RichPostCard expandido
- [ ] Adicionar página `/sabedoria` com GlossaryCard grid
- [ ] Implementar busca semântica por termos sânscritos

### Melhorias UX
- [ ] Transições suaves entre páginas
- [ ] Loading states com skeleton cards
- [ ] Modo escuro (opcional)
- [ ] Breadcrumbs para navegação

---

## 📚 Referências de Design

**Inspiração:** Canvas React/Tailwind fornecidos pelo usuário
**Estética:** Jardim Digital, Editorial Book Design, Typography-First
**Cores:** Stone palette + Semantic categories
**Filosofia:** "Cada elemento visual deve refletir a profundidade do conteúdo filosófico"

---

## 🛠️ Manutenção

### Adicionar Nova Categoria

1. **globals.css** - Adicionar cores:
```css
--color-category-nova: #hexcolor;
--color-category-nova-light: #hexcolor;
```

2. **RichPostCard.tsx** - Adicionar config:
```tsx
const categoryConfig = {
  'Nova Categoria': {
    color: '#hexcolor',
    bgColor: '#hexlight',
    icon: NovoIcone,
  }
}
```

### Modificar Tipografia

Editar `globals.css`:
```css
:root {
  --font-serif: 'SuaFonte', Georgia, serif;
  --font-sans: 'SuaFonte', system-ui, sans-serif;
}
```

---

**Última atualização:** 21 de janeiro de 2026  
**Desenvolvedor:** GitHub Copilot (Claude Sonnet 4.5)
