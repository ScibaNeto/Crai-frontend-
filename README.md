# CRAI — frontend

A CRAI recupera receita que empresas de SaaS brasileiras perdem por inadimplência e cancelamento, cobrando por
Pix Automático, e só é paga sobre o que recupera.

Este repositório tem o **site institucional** e a **área do cliente (beta)**: cadastro, login, autorização de
pagamento e painel. Bilíngue (português e inglês), tema escuro.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS 4 · framer-motion · Supabase (Auth + Postgres)

---

## 1. Rodar localmente

Precisa de **Node.js 20.19+ ou 22.12+**. Todos os comandos rodam dentro da pasta `crai-site/`.

```bash
cd crai-site
npm install
cp .env.example .env.local   # preencha (ver seção 2)
npm run dev                  # http://localhost:5173
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com recarga automática |
| `npm run build` | Checa os tipos (`tsc -b`) e gera o site final em `dist/` |
| `npm run preview` | Serve o conteúdo de `dist/` para conferir o build |
| `npm run lint` | Procura problemas no código (oxlint) |

> Rode `npm run build` e `npm run lint` antes de cada commit. Os dois precisam passar sem erro.

## 2. Variáveis de ambiente

Ficam em `crai-site/.env.local`, que **não vai para o git**. O modelo é o `crai-site/.env.example`.

| Variável | Onde achar no Supabase |
|---|---|
| `VITE_SUPABASE_URL` | Project Settings → API |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Project Settings → API Keys (começa com `sb_publishable_`) |
| `VITE_SITE_URL` | Não é do Supabase: domínio de produção, sem barra no fim (canonical, Open Graph, robots, sitemap) |

- A chave *publishable* pode ficar no navegador: quem protege os dados são as regras de acesso (RLS) do banco.
- **Nunca** coloque a chave `service_role` / *secret* no frontend.
- Sem `.env.local` o site abre normalmente; só cadastro e login avisam que estão indisponíveis.

## 3. Páginas (rotas)

| Rota | O que é | De onde vêm os dados |
|---|---|---|
| `/` | Página inicial | Texto fixo |
| `/produto` | Como a CRAI funciona | Texto fixo |
| `/planos` | Planos e simulador de recuperação | Texto fixo (simulador usa o MRR da empresa, se logado) |
| `/empresa` | Sobre a CRAI e o time | Texto fixo |
| `/contato` | Formulário de contato | **Demonstração**, não envia nada |
| `/cadastro` | Cria conta, perfil e empresa | Supabase |
| `/entrar` | Login | Supabase Auth |
| `/redefinir-senha` | Recuperação de senha | Supabase Auth |
| `/pagamento` | Autorização do Pix Automático (exige login) | Empresa real; **cobrança ainda simulada** |
| `/confirmacao` | Fim do fluxo de pagamento | — |
| `/painel` | Painel do cliente (beta) | Nome e plano reais; **números de demonstração** |
| `/privacidade` | Política de Privacidade | Texto fixo (`src/data/legal.pt.ts` / `legal.en.ts`) |
| `/termos` | Termos de Uso | Texto fixo (`src/data/legal.pt.ts` / `legal.en.ts`) |

Título, descrição e indexação de cada rota: `src/lib/site.ts` (quais indexar) e `seo` em `conteudo.pt.ts`/`.en.ts`
(os textos). Rota nova precisa entrar nos dois.

## 4. Estrutura

```
CRAI frontend/
├── README.md                este arquivo
├── .gitattributes           normaliza fim de linha (LF no repositório)
├── .gitignore               arquivos do sistema/editor na raiz
└── crai-site/               o site
    ├── .env.example         modelo das variáveis de ambiente
    ├── .gitignore           o que não vai para o git (node_modules, dist, .env…)
    ├── index.html           página base (título, favicon)
    ├── package.json         dependências e comandos
    ├── public/              arquivos servidos como estão (favicon, fotos do time)
    ├── supabase/
    │   ├── README.md        banco de dados: tabelas, permissões, configuração
    │   └── migrations/      SQL do banco
    └── src/
        ├── main.tsx         ponto de entrada
        ├── App.tsx          rotas, layout e título de cada página
        ├── index.css        estilos globais e tema (Tailwind)
        ├── routes/          uma página por rota (Home.tsx, Cadastro.tsx, Painel.tsx…)
        ├── sections/        blocos reaproveitados dentro das páginas (Simulador, Planos, Faq…)
        │   └── home/        seções da página inicial (HeroCrai, PainelMockup, Capitulos, Contraste, Preco…)
        ├── components/
        │   ├── ui/          peças básicas: botão, campo, select, card, badge
        │   ├── layout/      cabeçalho, rodapé, moldura da página
        │   ├── motion/      animações
        │   └── icons/       ícones SVG
        ├── data/
        │   ├── conteudo.pt.ts   TODO o texto do site em português (define o formato)
        │   ├── conteudo.en.ts   o mesmo texto em inglês
        │   ├── planos.ts        planos e preços
        │   └── mock*.ts         dados fictícios usados enquanto não há integração
        └── lib/
            ├── supabase.ts           conexão com o Supabase
            ├── database.types.ts     tipos do banco (gerados, não editar à mão)
            ├── useSessao.ts          hook: usuário logado e empresa
            ├── SessaoProvider.tsx    guarda a sessão para o app inteiro
            ├── auth.ts, cadastro.ts  login, cadastro, redefinição de senha
            ├── cnpj.ts, empresa.ts   validação de CNPJ e dados da empresa
            ├── i18n.tsx, lang.ts     troca de idioma
            └── format.ts, chart.ts…  formatação de números e gráficos
```

**Regras da casa**

- Texto que aparece na tela **não fica dentro do componente**: vai em `src/data/conteudo.pt.ts` e
  `src/data/conteudo.en.ts`. Ao adicionar um texto no `.pt`, o TypeScript acusa erro até ele existir também no `.en`.
- Página nova: crie em `src/routes/` e registre em `src/App.tsx`.
- Mudou o banco? Regenere `src/lib/database.types.ts` (ver [`crai-site/supabase/README.md`](crai-site/supabase/README.md)).


## 5. Animações (motion)

A linguagem visual segue duas referências: o site do **IrisFlow** (hero com aparelho em perspectiva, halo e anéis,
título que sobe palavra a palavra, capítulos 01/02/03, navegação em pílula de vidro, fundo com malha de gradiente,
blobs, grade mascarada e linha de varredura) e o catálogo de efeitos da **SVGator** (scrollytelling, self-drawing,
microinterações, marquee, gradiente animado, spotlight no hover, contadores).

| Peça | Onde | O que faz |
|---|---|---|
| `AmbientBackground` | `components/motion/` | Malha de gradiente, blobs que mudam de forma, grade, varredura e partículas. `variant="suave"` nas páginas internas |
| `Header` (`NavPill`) | `components/layout/` | Pílula de vidro que desliza até o link sob o cursor; header ganha vidro ao rolar |
| `ScrollProgress` | `components/motion/` | Filete laranja no topo acompanhando a leitura |
| `RevealWords` | `components/motion/Reveal.tsx` | Título palavra a palavra com máscara; `noScroll` anima ao entrar na tela; `destaque` pinta o final com gradiente |
| `Marquee` | `components/motion/` | Faixa infinita (pausa no hover) |
| `Spotlight` | `components/motion/` | Borda e brilho que seguem o cursor |
| `PainelMockup` | `sections/home/` | Painel em 3D com KPIs contando, gráfico se desenhando e feed de eventos |
| `Capitulos` | `sections/home/` | Visual preso à esquerda que troca conforme o capítulo cruza o centro da tela |
| `Contraste` | `sections/home/` | Régua fixa × janela de liquidez, com agulha percorrendo os dias |
| `IndiceCapitulos` | `components/layout/` | Índice fixo das seções (página Produto) com pílula que acompanha a rolagem |
| `Card` | `components/ui/` | Superfície de vidro com brilho seguindo o cursor, usada em formulários, simulador e time |
| `MarcaRodape` | `sections/` | "CRAI" do rodapé sobe letra a letra e a seta se desenha |

Classes de apoio ficam no bloco **Motion 2.0** do `src/index.css` (`.aurora`, `.nav-pill`, `.glass-panel`, `.device`,
`.beam`, `.spotlight`, `.marquee`, `.btn-shine`, `.text-gradient`, `.eyebrow`, `.chip`).

**Regra:** tudo respeita `prefers-reduced-motion`. Com movimento reduzido, fundos ficam estáticos, contadores mostram o
valor final e nada entra deslizando. Ao criar um efeito novo, trate os dois casos.

## 6. Banco de dados

Tudo sobre tabelas, permissões, login e configuração do painel do Supabase está em
[`crai-site/supabase/README.md`](crai-site/supabase/README.md).

## 7. Publicar

1. `npm run build` (dentro de `crai-site/`) gera a pasta `dist/`, que é o site pronto, já com `robots.txt` e
   `sitemap.xml` montados a partir de `VITE_SITE_URL`. Fora do deploy de produção (preview da Vercel/Netlify), o
   `robots.txt` sai com `Disallow: /`.
2. Na hospedagem, toda rota desconhecida deve servir o `index.html` (fallback de SPA). Com isso a página 404 aparece,
   mas o HTTP continua 200 — ela leva `noindex` para o Google não indexar.
3. No painel do Supabase → Authentication → URL Configuration, adicione o domínio publicado em **Site URL** e em
   **Redirect URLs** (`https://seu-dominio/**`). Sem isso, os links de e-mail (confirmação, nova senha) voltam para
   `localhost`.
4. Cabeçalhos de segurança e o fallback de SPA já vêm no repositório: `crai-site/vercel.json` (Vercel) e
   `crai-site/public/_headers` + `_redirects` (Netlify, Cloudflare Pages). Os dois têm o mesmo conteúdo: mudou um, mude o
   outro. A política de conteúdo (CSP) só libera o próprio site e o Supabase. Ao incluir um serviço externo (analytics,
   fontes, vídeo, CAPTCHA), acrescente o domínio dele na CSP, senão o navegador bloqueia.
   Por isso o site não pode ter `<script>` embutido no `index.html`: o do tema fica em `public/tema-inicial.js`.

## Time

- José Scibarauskas Neto — Product Owner e Dev Frontend/Backend
- João Vitor Gava — Tech Lead
- Gabriel de Frias Ramirez — Planejamento Estratégico e Gestão Financeira
