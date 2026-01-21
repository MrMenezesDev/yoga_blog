# Cloudflare Pages - Deploy do Blog Yoga

Este projeto está configurado para deploy no Cloudflare Pages com **geração estática completa (SSG)**.

## 📦 Arquitetura para Cloudflare

### Problema Original
- Next.js usa `fs` e `path` para ler MDX files em runtime
- Edge Runtime do Cloudflare não tem acesso ao filesystem
- Server Components precisam rodar no Edge

### Solução Implementada
1. **Build-time cache:** Script gera JSON com todos os posts antes do build
2. **Static Generation:** Todas as páginas são pré-renderizadas
3. **JSON imports:** Substituímos `fs.readFileSync()` por imports de JSON

## 🚀 Deploy no Cloudflare Pages

### Opção 1: Via Dashboard (Recomendado)

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vá em **Workers & Pages** → **Create application** → **Pages**
3. Conecte seu repositório GitHub/GitLab
4. Configure:
   - **Production branch:** `main`
   - **Build command:** `npm run pages:build`
   - **Build output directory:** `out`
   - **Node version:** `18`
5. **Environment variables:** Nenhuma necessária (tudo é estático)

### Opção 2: Via CLI

```bash
# Instalar dependências
npm install

# Instalar Wrangler CLI
npm install -g wrangler

# Login no Cloudflare
wrangler login

# Build e deploy
npm run pages:build
wrangler pages deploy out --project-name=blog-yoga-site
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento local (usa fs normal)
npm run dev

# Build para produção com cache gerado
npm run build

# Build específico para Cloudflare Pages
npm run pages:build

# Preview local do build
npm run preview

# Deploy direto para Cloudflare
npm run deploy
```

## 📁 Estrutura de Build

```
scripts/
  └── generate-content-cache.mjs  # Gera JSON dos posts MDX

src/lib/
  ├── mdx.ts                      # Versão com fs (dev/build normal)
  └── mdx.cloudflare.ts           # Versão com JSON (Cloudflare)

src/lib/generated/                # Gerado em build time
  ├── diary.json                  # Cache de posts do diário
  ├── lab.json                    # Cache de posts do laboratório
  └── wisdom.json                 # Cache de conceitos da sabedoria
```

## 🔄 Fluxo de Build

1. **Pre-build:** Script Node.js lê todos os MDX e gera JSON
2. **Next.js Build:** Importa JSON e gera páginas estáticas
3. **Output:** Diretório `out/` com HTML/CSS/JS estáticos
4. **Cloudflare:** Serve arquivos estáticos via CDN global

## ⚡ Vantagens

- ✅ **Velocidade:** Todas as páginas são estáticas (HTML puro)
- ✅ **SEO:** Conteúdo completamente indexável
- ✅ **Edge:** CDN global do Cloudflare (latência mínima)
- ✅ **Custo:** Free tier do Cloudflare (500 builds/mês)
- ✅ **Zero config:** Não precisa de servidor

## 🔀 Mudança de Arquitetura

### Antes (Local/Vercel)
```typescript
import { getAllDiaryPosts } from '@/lib/mdx';
// Lê do filesystem em runtime
```

### Depois (Cloudflare)
```typescript
import { getAllDiaryPosts } from '@/lib/mdx.cloudflare';
// Lê de JSON gerado em build time
```

**Nota:** Para desenvolvimento local, continue usando `@/lib/mdx` normal. O Cloudflare usa automaticamente a versão cloudflare.

## 🌐 URLs de Acesso

Após deploy:
- **Produção:** `https://blog-yoga-site.pages.dev`
- **Custom domain:** Configure em Pages → Custom domains

## 🐛 Troubleshooting

**Erro: "Module not found: fs"**
- Certifique-se de que `npm run prebuild` rodou antes do build
- Verifique se `src/lib/generated/*.json` existem

**Erro: "404 Not Found" em rotas dinâmicas**
- Verifique se `generateStaticParams()` está em todas as páginas `[slug]`
- Confirme que `output: 'export'` está no `next.config.ts`

**Imagens não carregam**
- Use `unoptimized: true` em `next.config.ts`
- Ou use Cloudflare Images (configuração separada)

## 📚 Recursos

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)
