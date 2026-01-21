# 🧘 Jardim Digital de Sangha

Jardim digital pessoal onde Yoga, Sânscrito, Psicanálise e Filosofia Indiana se entrelaçam. Um registro vivo de uma jornada de autoconhecimento através da prática e estudo de 365 dias (Sādhana).

## 🏗️ Arquitetura

- **Framework:** Next.js 16.1.4 (App Router)
- **Styling:** Tailwind CSS 4 (Paper-inspired editorial design)
- **Content:** MDX files com frontmatter (Gray Matter)
- **Typography:** Crimson Pro (serif) + Inter (sans-serif)
- **Icons:** Lucide React
- **Date formatting:** date-fns (ptBR locale)
- **Hosting:** Cloudflare Pages (Static Export)

## 📁 Estrutura de Conteúdo

```
content/
├── diary/          # Diário de jornada (reflexões diárias)
├── wisdom/         # Glossário de conceitos (wiki pessoal)
├── lab/            # Laboratório de práticas (experimentos)
└── snippets/       # Dados auxiliares (JSON)
```

## 🚀 Início Rápido

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver o site.

### Build de Produção

```bash
# Gerar cache de conteúdo + build estático
npm run build

# Preview local do build
npm run preview
```

## 📝 Criando Conteúdo

### Novo Post do Diário

Crie um arquivo em `content/diary/YYYY-MM-DD-titulo-do-post.mdx`:

```mdx
---
title: "Título do Post"
date: "2026-01-21"
category: "Insight Profundo"
excerpt: "Breve resumo do post..."
tags: ["yoga", "filosofia"]
sanskrit: "Nirodha"
sanskritMeaning: "Contenção/Cessação"
comments: 0
---

Conteúdo do post em Markdown/MDX...
```

### Novo Conceito de Sabedoria

Crie um arquivo em `content/wisdom/nome-conceito.mdx`:

```mdx
---
title: "Viṣāda"
date: "2026-01-04"
category: "psicologia"
definition: "Desalento profundo; o colapso que precede o despertar"
pronunciation: "vi-shaa-da"
etymology: "Vi (separação) + Sad (afundar)"
synonyms: ["Desespero", "Paralisia Emocional"]
tags: ["bhagavad-gita", "emoção"]
---

Conteúdo do conceito...
```

### Novo Projeto do Laboratório

Crie um arquivo em `content/lab/nome-projeto.mdx`:

```mdx
---
title: "Estudo do Corpo Causal"
date: "2026-01-14"
status: "doing"  # todo | doing | done
type: "estudo"   # estudo | prática | experimento | projeto
description: "Mapeamento das Vāsanās e Kleśas"
duration: "30 dias"
deadline: "2026-02-13"
tags: ["corpo-causal", "kleśas"]
---

Conteúdo do projeto...
```

## 🎨 Design System

### Cores

- **Charcoal:** `#2D2420` (títulos)
- **Terracota:** `#C05621` (acentos)
- **Stone:** `#f5f5f4` (background)
- **Paper:** `#FDFBF7` (cards)

### Tipografia

- **Serif (Editorial):** Crimson Pro - para títulos e corpo de texto
- **Sans (UI):** Inter - para botões, badges, metadados

### Componentes Principais

- `RichPostCard` - Card editorial para posts
- `WisdomGrid` - Grade de conceitos com filtros
- `MandalaWidget` - Contador de dias de Sādhana
- `TopBar` - Navegação responsiva
- `Footer` - Rodapé com citação sânscrita

## 🌐 Deploy no Cloudflare Pages

### Preparação do Build

O projeto usa **Static Site Generation (SSG)** completo:

1. **Pre-build:** Script `generate-content-cache.mjs` lê todos os arquivos MDX e gera JSON
2. **Build:** Next.js importa JSON e gera páginas HTML estáticas
3. **Output:** Diretório `out/` com site 100% estático

### Deploy Manual via CLI

```bash
# Instalar Wrangler CLI globalmente
npm install -g wrangler

# Login no Cloudflare
wrangler login

# Build e deploy
npm run deploy
```

### Deploy Automático via Git

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Workers & Pages** → **Create application** → **Pages**
3. Conecte seu repositório GitHub/GitLab
4. Configure:
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** `18`
5. Toda vez que você fizer `git push`, o site será reconstruído automaticamente

### Verificar Deploy

Após o deploy, seu site estará disponível em:
- **Cloudflare:** `https://blog-yoga-site.pages.dev`
- **Custom domain:** Configure em Pages → Settings → Custom domains

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento (Turbopack)

# Build e Deploy
npm run prebuild         # Gera cache JSON dos arquivos MDX
npm run build            # Build completo (prebuild + next build)
npm run preview          # Preview local do build estático
npm run deploy           # Build + deploy para Cloudflare Pages

# Manutenção
npm run lint             # ESLint
```

## 📊 Estatísticas do Projeto

Após build:
- **~44 páginas estáticas** geradas
- **19 posts de diário**
- **15 conceitos de sabedoria**
- **3 projetos de laboratório**
- **100% HTML estático** (zero JavaScript server-side em runtime)

## 🔧 Tecnologias e Bibliotecas

| Dependência | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.1.4 | Framework React |
| React | 19.2.3 | UI Library |
| Tailwind CSS | 4.0 | Styling |
| next-mdx-remote | 5.0.0 | MDX rendering |
| gray-matter | 4.0.3 | Frontmatter parsing |
| date-fns | 4.1.0 | Data formatting |
| lucide-react | 0.562.0 | Icons |
| TypeScript | 5.x | Type safety |

## 📚 Recursos e Referências

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## 📄 Licença

Projeto pessoal - Todos os direitos reservados.

---

*"योग: कर्मसु कौशलम्" — Yoga é habilidade na ação (Bhagavad Gītā 2.50)*

