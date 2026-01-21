# 🚀 QUICK START - Sangha Digital

## Instalação e Execução

```bash
# Já instaladas as dependências principais:
npm install

# Rodar em desenvolvimento
npm run dev

# Acessar
http://localhost:3000
```

## 📍 Navegação

- `/` - Dashboard com foco atual e últimas atualizações
- `/diario` - Lista de posts reflexivos
- `/laboratorio` - Kanban de estudos e práticas
- `/sabedoria` - Glossário de conceitos

## ✍️ Criar Conteúdo

### Novo Item do Laboratório (Kanban)

```bash
# Criar arquivo
echo > content/lab/meu-estudo.mdx
```

**Template mínimo:**
```mdx
---
title: "Nome do Estudo"
date: "2026-01-21"
status: "todo"        # "todo" | "doing" | "done"
type: "estudo"        # "estudo" | "ritual" | "pratica"
description: "Descrição curta para o card"
tags: ["Tag1", "Tag2"]
---

# Conteúdo Markdown

Escreva aqui os detalhes do estudo ou ritual.
```

**Resultado:** Aparece automaticamente no Kanban na coluna correspondente ao `status`.

### Novo Post do Diário

```bash
echo > content/diary/2026-01-21-titulo.mdx
```

**Template:**
```mdx
---
title: "Título do Post"
date: "2026-01-21"
excerpt: "Resumo que aparece na listagem"
tags: ["Prática", "Reflexão"]
relatedConcepts: ["titiksha"]  # Ativa hover cards
relatedLab: ["jejum-ekadashi"]
featured: false
---

# Título

Conteúdo com Markdown normal...

Quando menciono conceitos que estão na Sabedoria,
eles aparecem com hover card automático.
```

### Novo Conceito da Sabedoria

```bash
echo > content/wisdom/novo-conceito.mdx
```

**Template:**
```mdx
---
title: "Nome do Conceito"
category: "conceito"  # conceito|pratica|etica|tempo|psicologia
tags: ["Vedanta"]
shortDefinition: "Definição de 1 linha para hover card"
etymology: "Opcional: etimologia"
badge: "Conceito"
---

# Nome do Conceito

Definição completa aqui...
```

## 🎯 Marcar Item como "Foco Atual"

Para que um item do Lab apareça no **header preto** e no **dashboard**:

```mdx
---
title: "Mandala 19/Mar"
status: "doing"
featured: true  # ⭐ Esta linha!
deadline: "2026-03-19"
---
```

**Resultado:** Aparece no topo de todas as páginas com contagem regressiva.

## 🔗 Interconexões

### Linkar Diário → Sabedoria
```yaml
# No frontmatter do post do Diário:
relatedConcepts: ["titiksha", "swastha"]
```

### Linkar Lab → Diário
```yaml
# No frontmatter do item do Lab:
relatedDiary: ["do-apego-autonomia"]
```

### Linkar Sabedoria → Tudo
```yaml
# No frontmatter do conceito:
relatedDiary: ["do-apego-autonomia"]
relatedLab: ["jejum-ekadashi"]
relatedConcepts: ["upeksha"]
```

## 📊 Status do Kanban

Os 3 estados possíveis:

| Status | Coluna | Significado |
|--------|--------|-------------|
| `todo` | A Estudar | Planejado mas não iniciado |
| `doing` | Em Prática | Ativo no momento |
| `done` | Integrado | Concluído ou incorporado à rotina |

## 🎨 Cores por Categoria (Sabedoria)

```
conceito    → Azul
pratica     → Verde
etica       → Roxo
tempo       → Laranja
psicologia  → Rosa
```

## 📝 Comandos Úteis

```bash
# Verificar estrutura
ls content/diary/
ls content/lab/
ls content/wisdom/

# Build para produção
npm run build

# Preview da build
npm run start
```

## 🐛 Troubleshooting

**Problema:** Item do Lab não aparece no Kanban
- ✅ Verificar se `status` é exatamente `"todo"`, `"doing"` ou `"done"`
- ✅ Verificar se o arquivo está em `content/lab/`
- ✅ Verificar se tem extensão `.mdx`

**Problema:** Hover card não funciona
- ✅ Verificar se o conceito existe em `content/wisdom/`
- ✅ Verificar se o slug no `relatedConcepts` corresponde ao nome do arquivo
- ✅ Ex: `titiksha.mdx` → slug é `"titiksha"`

**Problema:** Foco atual não aparece no header
- ✅ Apenas 1 item pode ter `featured: true` no Lab
- ✅ Verificar se tem `deadline` definido

## 🚀 Deploy (Vercel)

```bash
# Conectar ao Vercel
vercel

# Ou via GitHub
# Push para main → auto-deploy
```

## 📚 Arquivos de Referência

- `ARQUITETURA_SANGHA.md` - Documentação técnica completa
- `ENTREGAVEL_FINAL.md` - Resumo executivo do projeto
- `src/types/content.ts` - Interfaces TypeScript
- `src/lib/mdx.ts` - Funções de carregamento

---

**Pronto!** Agora é só criar conteúdo. 🌱
