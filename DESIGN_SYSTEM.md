# 📖 Guia de Design System - Sangha Digital

## 🎨 Filosofia Visual: "Organic Academic"

O Sangha Digital migrou de uma estética **"Tech SaaS"** (fria, corporativa) para uma abordagem **"Organic Academic"** (suave, intelectual, contemplativa), inspirada em:

- 📄 Cadernos de notas manuscritas
- 📚 Livros clássicos de filosofia
- 🖼️ Papel arroz e tons terrosos
- 🌱 Elementos orgânicos e naturais

---

## 🎨 Paleta de Cores

### Cores Base
```css
--background: #FDFBF7  /* Papel Arroz Acadêmico */
--foreground: #44403c  /* Stone-700 - Texto Principal */
--charcoal: #292524    /* Stone-800 - Títulos */
```

### Paleta Saffron/Terracota (Identidade Visual)
```css
--color-saffron-50: #fff7ed   /* Fundos suaves */
--color-saffron-600: #ea580c  /* Accents principais */
--color-saffron-700: #c2410c  /* Hover states */
```

### Paleta de Categorias (Cards Acadêmicos)

| Categoria | Cor Principal | Uso |
|-----------|---------------|-----|
| **Filosofia** | `#9333ea` (Purple-600) | Conceitos filosóficos comparados |
| **Prática** | `#ea580c` (Orange-600) | Exercícios e aplicações |
| **Insight** | `#16a34a` (Green-600) | Descobertas pessoais |
| **Estudo** | `#0284c7` (Sky-600) | Análise textual profunda |
| **Discussão** | `#7c3aed` (Violet-600) | Questionamentos abertos |
| **Ascensão** | `#10b981` (Emerald-500) | Marcos de progresso espiritual |

---

## 🧩 Componentes MDX

### 1. `<ConceptCard />`

Card acadêmico com borda colorida lateral (`border-l-4`), ideal para destacar insights, conceitos ou notas importantes.

#### Props

```typescript
interface ConceptCardProps {
  category: 'filosofia' | 'pratica' | 'insight' | 'estudo' | 'discussao' | 'ascensao';
  icon?: LucideIcon;
  title?: string;
  children: ReactNode;
}
```

#### Exemplo de Uso

```mdx
import { Lightbulb } from 'lucide-react';

<ConceptCard category="filosofia" icon={Lightbulb} title="O Insight da Espiral">

A Quebra de Paradigma: Se você está **"cessando"** (Nirodha), mas a experiência vem de Rudh (conter), então Yoga não é parar, é **conter a potência**. É como segurar uma mola comprimida - pura energia em espiral.

Vrtti não é apenas uma onda plana, é um **vórtice espiralado** em todas as dimensões.

</ConceptCard>
```

#### Comportamento Visual

- **Borda esquerda colorida** (4px)
- **Fundo suave** da cor da categoria (#fff7ed, #f3e8ff, etc)
- **Label superior** com nome da categoria (uppercase, tracking-wider)
- **Título em serif** (Playfair Display)
- **Sombra suave** que intensifica no hover
- **Animação de elevação** (`translateY(-2px)`) no hover

---

### 2. `<VersusGrid />`

Componente para **comparações acadêmicas lado a lado** (ex: "Yoga vs Vedanta", "Visão Tântrica vs Clássica").

#### Props

```typescript
interface VersusGridProps {
  leftTitle: string;
  leftSubtitle?: string;
  leftContent: ReactNode;
  leftColor?: 'purple' | 'blue' | 'green' | 'orange';
  
  rightTitle: string;
  rightSubtitle?: string;
  rightContent: ReactNode;
  rightColor?: 'purple' | 'blue' | 'green' | 'orange';
  
  conclusion?: ReactNode;
}
```

#### Exemplo de Uso

```mdx
<VersusGrid
  leftTitle="Yoga (Patañjali)"
  leftSubtitle="Psicologia - Caminho de Absorção"
  leftColor="blue"
  leftContent={
    <>
      <p>É a <strong>Psicologia</strong>. Ensina a separar "Eu" dos "Meus Pensamentos".</p>
      <p><strong>Método:</strong> Estima a separar Eu/Mundo para que "Eu" possa ouvir a verdade.</p>
    </>
  }
  
  rightTitle="Vedanta (Upanishads)"
  rightSubtitle="Metafísica - Não-Dualidade"
  rightColor="purple"
  rightContent={
    <>
      <p>É a <strong>Metafísica</strong>. Ensina que "Eu" e "Mundo" somos feitos da mesma Consciência.</p>
      <p><strong>Visão:</strong> Eu sou Brahman. Não há separação real.</p>
    </>
  }
  
  conclusion={
    <>
      <p><strong>A Conclusão:</strong> O Yoga prepara a mente para que ela possa ouvir a verdade do Vedanta.</p>
      <p>Precisamos dos dois. Como disse Gloria Arieira: <em>"Yoga e Vedanta caminham juntos"</em>.</p>
    </>
  }
/>
```

#### Comportamento Visual

- **Grid responsivo:** lado a lado no desktop (`md:grid-cols-2`), empilhado no mobile
- **Bordas coloridas** (`border-2`) com fundos suaves
- **Box de conclusão** (opcional) com ícone 💡 e fundo stone-100
- **Tipografia contrastante:** títulos em serif (bold), conteúdo em sans-serif

---

### 3. `<GiscusComments />`

Componente de comentários via **GitHub Discussions** (Giscus), com carregamento lazy.

#### Props

```typescript
interface GiscusCommentsProps {
  repo: string;           // Ex: "seu-usuario/seu-repo"
  repoId: string;         // ID do repositório (obter no Giscus)
  category: string;       // Nome da categoria de discussões
  categoryId: string;     // ID da categoria (obter no Giscus)
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  theme?: string;         // Ex: 'light', 'dark', 'noborder_light'
  lang?: string;          // Ex: 'pt', 'en'
  loading?: 'lazy' | 'eager';
}
```

#### Como Configurar

1. Acesse [giscus.app](https://giscus.app/)
2. Conecte seu repositório GitHub
3. Ative as **Discussions** no repositório
4. Copie os valores de `repo`, `repoId`, `category`, `categoryId`

#### Exemplo de Uso

```tsx
import GiscusComments from '@/components/mdx/GiscusComments';

// No final do layout do post:
<GiscusComments
  repo="seu-usuario/sangha-digital"
  repoId="R_kgDOxxxxx"
  category="Post Comments"
  categoryId="DIC_kwDOxxxxxx"
  mapping="pathname"
  theme="noborder_light"
  lang="pt"
  loading="lazy"
/>
```

---

## 📱 Navegação Responsiva

### Desktop (≥ 768px)
- Barra horizontal fixa no topo
- Menu com ícones + texto
- Logo "SANGHA DIGITAL" à esquerda
- Items de navegação à direita
- Hover com fundo saffron-50

### Mobile (< 768px)
- **Bottom Navigation Bar** (estilo app nativo)
- 4 ícones: Início, Diário, Laboratório, Sabedoria
- Ícone ativo: cor saffron-600 + scale-110
- Fixa no rodapé (`fixed bottom-0 z-50`)
- Backdrop blur para efeito de vidro

---

## 🎯 Header Responsivo (Foco Atual)

### Desktop
```
FOCO ATUAL (SADHANA)  |  [Título do Estudo]  |  (57 dias)
```

### Mobile
```
✨ [Título Truncado]  |  57d
```

- Usa `Sparkles` icon do Lucide React
- Texto truncado com `truncate`
- Formato compacto de dias: `57d` ao invés de `(57 dias)`

---

## 🎨 Sombras Orgânicas

```css
/* Sombra suave padrão */
--shadow-soft: 0 2px 15px -3px rgb(0 0 0 / 0.05), 0 10px 20px -2px rgb(0 0 0 / 0.03);

/* Sombra grande (modais, dropdowns) */
--shadow-soft-lg: 0 10px 40px -10px rgb(0 0 0 / 0.08), 0 2px 10px -2px rgb(0 0 0 / 0.04);

/* Sombras coloridas (hover states) */
--shadow-glow-orange: 0 4px 20px -4px rgb(234 88 12 / 0.15);
--shadow-glow-purple: 0 4px 20px -4px rgb(147 51 234 / 0.15);
--shadow-glow-green: 0 4px 20px -4px rgb(22 163 74 / 0.15);
```

**Uso:**
```tsx
<div style={{boxShadow: 'var(--shadow-soft)'}}>
  Card com sombra suave
</div>
```

---

## 📐 Bordas e Raio

- **Cards pequenos:** `rounded-xl` (0.75rem)
- **Cards grandes:** `rounded-2xl` (1rem)
- **Botões:** `rounded-lg` (0.5rem)
- **Inputs:** `rounded-md` (0.375rem)

---

## 🔤 Tipografia

### Fontes

- **Sans-serif (corpo):** Geist Sans
- **Serif (títulos):** Playfair Display
- **Mono (código):** Geist Mono

### Hierarquia

```css
h1: 2.25rem (36px) - font-semibold - Playfair - letter-spacing: -0.02em
h2: 1.875rem (30px) - font-semibold - Playfair
h3: 1.5rem (24px) - font-medium - Playfair
h4: 1.25rem (20px) - font-medium - Sans

body: 1rem (16px) - font-normal - line-height: 1.7 - letter-spacing: 0.01em
```

### Cores de Texto

- **Títulos:** `var(--charcoal)` (#292524)
- **Corpo:** `var(--foreground)` (#44403c)
- **Secundário:** `text-slate-600`
- **Ênfase:** `var(--color-saffron-700)`
- **Links:** `var(--color-saffron-600)`

---

## 🚀 Animações

### Hover States (Cards)

```css
transition: all 300ms ease;
hover:translate-y-[-2px]
hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)]
```

### Fade In

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Slide In

```css
@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Uso:**
```tsx
<div className="animate-in">
  Conteúdo com fade in
</div>
```

---

## 📦 Como Adicionar Novos Componentes MDX

1. **Criar o componente** em `src/components/mdx/`
2. **Exportar** via `src/components/mdx/index.ts`
3. **Registrar** no `mdx-components.tsx`:

```tsx
import { MeuNovoComponente } from '@/components/mdx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    MeuNovoComponente,
    // ... outros componentes
  };
}
```

4. **Usar nos posts** MDX:

```mdx
<MeuNovoComponente prop="valor">
  Conteúdo
</MeuNovoComponente>
```

---

## 🎯 Checklist de Design

Ao criar novos componentes, garanta:

- ✅ **Fundo orgânico:** Use tons de 50 (ex: `bg-orange-50`)
- ✅ **Sombras suaves:** `shadow-soft` ou `shadow-soft-lg`
- ✅ **Bordas arredondadas:** `rounded-xl` ou `rounded-2xl`
- ✅ **Tipografia:** Títulos em Playfair, corpo em Geist Sans
- ✅ **Responsividade:** Mobile-first (`<768px` = mobile, `≥768px` = desktop)
- ✅ **Hover states:** Leve elevação (`translateY(-2px)`) + sombra intensa
- ✅ **Cores semânticas:** Use as variáveis CSS do `@theme inline`
- ✅ **Acessibilidade:** Contraste mínimo 4.5:1 para texto

---

## 📚 Referências

- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/)
- [Giscus (Comments)](https://giscus.app/)
- [MDX Documentation](https://mdxjs.com/)
- [Next.js App Router](https://nextjs.org/docs/app)

---

**Design System Version:** 1.0.0 (Janeiro 2026)  
**Última atualização:** 21/01/2026
