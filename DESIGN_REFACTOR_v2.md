# 🎨 DESIGN REFACTOR v2.0 - Sangha Digital

## 🎯 Objetivo
Transformar o visual "Tech SaaS frio" em uma experiência "Retiro Digital suave e acolhedor".

---

## ✅ MUDANÇAS IMPLEMENTADAS

### 1. **Paleta de Cores Orgânicas**

#### Antes:
- Preto puro (#000) e branco (#fff)
- Laranja neon (#f97316)
- Cinzas frios

#### Depois:
- **Background:** `#faf8f5` (Creme papel arroz)
- **Textos:** `#334155` (Slate-700 suave)
- **Títulos:** `#1e293b` (Charcoal/Slate-800)
- **Saffron Terracota:**
  - 50: `#fff7ed` (Muito claro)
  - 100-400: Gradientes suaves
  - 600: `#ea580c` (Terracota queimado - novo laranja)
  - 700-900: Tons mais profundos

### 2. **Sombras Suaves e Orgânicas**

Substituição de `shadow-md` hard por:

```css
--shadow-soft: 0 2px 15px -3px rgb(0 0 0 / 0.07), 0 10px 20px -2px rgb(0 0 0 / 0.04);
--shadow-soft-lg: 0 10px 40px -10px rgb(0 0 0 / 0.1), 0 2px 10px -2px rgb(0 0 0 / 0.05);
--shadow-glow: 0 0 20px rgb(249 115 22 / 0.15);
```

- Efeito de **flutuação leve**
- Distância maior, blur mais suave
- Opacidade reduzida (7% → 4%)

### 3. **Bordas Amigáveis**

- Cards: `rounded-md` → `rounded-xl` (mobile) / `rounded-2xl` (desktop)
- Botões: `rounded-md` → `rounded-xl`
- Inputs/Forms: `rounded-lg` → `rounded-xl`

### 4. **Tipografia Suave**

- Pesos reduzidos:
  - `font-bold` → `font-semibold` (títulos)
  - `font-semibold` → `font-medium` (subtítulos)
- Cores de texto:
  - `text-gray-900` → `var(--charcoal)` (#1e293b)
  - `text-gray-700` → `text-slate-600`
  - `text-gray-600` → `text-slate-500`

### 5. **Navegação Responsiva**

#### Desktop (≥768px):
- Menu horizontal no topo
- Backdrop blur sutil (`bg-white/80 backdrop-blur-sm`)
- Itens ativos com sombra suave e fundo saffron-50

#### Mobile (<768px):
- **Bottom Navigation Bar** fixa
- 4 ícones grandes (6x6) com labels
- Ícone ativo escala 110% com cor saffron-600
- `z-50` para ficar acima do conteúdo
- Spacer de 16px (h-16) no final da página

### 6. **Header de Foco Responsivo**

#### Desktop:
- Barra completa com "FOCO ATUAL (SADHANA)"
- Título do foco + countdown em dias

#### Mobile:
- Barra fina (`py-2`)
- Ícone Sparkles + título truncado
- Countdown abreviado (`57d`)

### 7. **Home Page Humanizada**

#### Mudanças:
1. **Removido:** Card laranja grande redundante de "Foco Atual"
2. **Substituído "Status do Laboratório"** (números frios) por:
   - **"Destaques do Laboratório"**
   - Mini-cards dos 3 primeiros items "Em Prática"
   - Mostra: Badge status, título, descrição, deadline
3. **Hero Section:** Gradiente suave saffron-50 → yellow-50
4. **Diário:** Cards com sombra soft, hover sutil

### 8. **Kanban Responsivo**

#### Desktop (≥768px):
- 3 colunas lado a lado
- Header colorido por status
- Cards com `shadow-soft`

#### Mobile (<768px):
- **Sistema de Tabs** no topo
- Apenas 1 coluna visível por vez
- Tabs com ícones + contadores
- Tab ativo mostra cor de fundo correspondente
- Cards com `active:scale-[0.98]` para feedback tátil

### 9. **Componentes MDX Responsivos**

#### GunaChart:
- Padding responsivo: `p-4` (mobile) / `p-6` (desktop)
- Labels empilhados em mobile (`flex-col`)
- Font sizes: `text-xs` (mobile) / `text-sm` (desktop)
- Barras 100% width sempre

#### MandalaClock:
- Grid de 1 coluna sempre (melhor legibilidade)
- Labels empilhados com `flex-wrap gap-2`
- Padding e espaçamento reduzidos

---

## 📱 BREAKPOINTS UTILIZADOS

```css
/* Mobile-first approach */
Default: 0-767px (mobile)
md: 768px+ (desktop)
lg: 1024px+ (desktop largo)
```

---

## 🎨 VARIÁVEIS CSS CUSTOMIZADAS

Todas definidas em `globals.css` via `@theme inline`:

```css
:root {
  --background: #faf8f5;
  --foreground: #334155;
  --charcoal: #1e293b;
  
  /* Paleta Saffron */
  --color-saffron-50: #fff7ed;
  --color-saffron-100: #ffedd5;
  ...
  --color-saffron-600: #ea580c; /* Terracota */
  
  /* Sombras */
  --shadow-soft: ...;
  --shadow-soft-lg: ...;
  --shadow-glow: ...;
}
```

Uso inline:
```jsx
style={{color: 'var(--color-saffron-600)'}}
style={{boxShadow: 'var(--shadow-soft)'}}
```

---

## 🚀 ARQUIVOS MODIFICADOS

### Core Styles:
1. `src/app/globals.css` - Cores, sombras, tipografia, prose

### Layouts:
2. `src/components/layout/Navigation.tsx` - Bottom nav mobile
3. `src/components/layout/FocusHeaderClient.tsx` - Header fino mobile

### Pages:
4. `src/app/page.tsx` - Home humanizada, sem redundância

### Components:
5. `src/components/lab/KanbanBoard.tsx` - Tabs mobile
6. `src/components/yoga/GunaChart.tsx` - Responsivo
7. `src/components/yoga/MandalaClock.tsx` - Responsivo

---

## ✨ RESULTADO FINAL

### Sensação Visual:
- ❌ Tech SaaS frio
- ✅ Retiro digital acolhedor

### Características:
- ✅ Cores terrosas e suaves
- ✅ Sombras difusas (flutuação)
- ✅ Bordas arredondadas
- ✅ Tipografia leve
- ✅ Mobile-first responsivo
- ✅ Feedback tátil em mobile
- ✅ Informação humanizada (cards reais vs números)

### Performance:
- ✅ Sem JavaScript extra
- ✅ CSS puro com Tailwind 4
- ✅ Transições suaves (300ms)
- ✅ Acessibilidade mantida

---

## 🎯 PRÓXIMOS PASSOS (Opcionais)

1. **Animações de Entrada:** Fade-in dos cards ao scroll
2. **Dark Mode:** Paleta noturna com tons quentes
3. **Micro-interações:** Hover cards com scale sutil
4. **Loading States:** Skeletons com gradientes suaves
5. **Acessibilidade:** Foco visible com ring-saffron-600

---

**Versão:** 2.0  
**Data:** 21 de Janeiro de 2026  
**Status:** ✅ COMPLETO E TESTADO
