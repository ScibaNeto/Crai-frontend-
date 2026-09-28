# CRAI — Site: checklist de lançamento (SEO, mobile e conformidade)

> **Stack:** Next.js 14 (App Router) · Tailwind CSS · bilíngue pt/en · temas claro e escuro
> **Repositório:** `github.com/ScibaNeto/Crai-frontend-`
> **Responsável:** José Scibarauskas Neto (PO)
> **Última revisão:** 27/09/2026

Este documento cobre os 10 itens obrigatórios antes de colocar o site da CRAI no ar. Para cada item há o objetivo, como implementar no Next.js 14 e os critérios de aceite. Os textos da Política de Privacidade e dos Termos de Uso estão no fim, prontos para revisão.

---

## Status geral

> **Implementado em 27/09/2026 — adaptado à stack real.** O repositório é **Vite + React Router (SPA)**, não Next.js 14:
> não existem `app/`, `metadata`, `robots.ts` nem `sitemap.ts`. Os mesmos resultados foram obtidos assim:

| # | Item | Onde ficou no repo | Status |
|---|------|--------------------|--------|
| 0 | Constantes do site | `crai-site/src/lib/site.ts` (rotas + indexação) · `src/lib/seo.ts` · `VITE_SITE_URL` no `.env.example` | [x] |
| 1 | Página 404 personalizada | `src/routes/NotFound.tsx` (copy pt/en da tabela, 2 CTAs, `noindex`) · erro inesperado em `src/routes/ErroInesperado.tsx` | [x] ⚠️ |
| 2 | Design 100% mobile | viewport sem `maximum-scale` no `index.html`; testado em 360/390/1280 px, sem rolagem horizontal | [x] ⚠️ |
| 3 | Meta title por página | `seo.*.titulo` em `src/data/conteudo.pt.ts` / `.en.ts`, aplicado por rota em `App.tsx` | [x] |
| 4 | Meta description por página | `seo.*.descricao` (todas entre 120 e 160 caracteres, pt e en) + canonical e robots por rota | [x] |
| 5 | Imagem Open Graph | `public/og-image.png` (1200×630, 163 KB) + tags OG estáticas no `index.html` | [x] |
| 6 | Favicon ativo | `public/favicon.ico` (16/32/48), `favicon.svg`, `apple-touch-icon.png`, `icon-192/512.png`, `manifest.webmanifest` | [x] |
| 7 | robots.txt | gerado no build por `vite.config.ts` (`Disallow: /` fora da produção) | [x] |
| 8 | sitemap.xml | gerado no build por `vite.config.ts` a partir de `src/lib/site.ts` | [x] |
| 9 | Política de Privacidade | `/privacidade` · texto em `src/data/legal.pt.ts` e `legal.en.ts` | [x] ⚠️ |
| 10 | Termos de Uso | `/termos` · mesmo arquivo | [x] ⚠️ |

**Diferenças em relação ao plano original (⚠️)**

- **404 com HTTP 200:** num SPA a hospedagem serve o `index.html` para qualquer rota, então `curl -I` retorna 200. A página
  leva `noindex, nofollow`, o que evita a indexação. HTTP 404 de verdade exigiria configurar a hospedagem (pendente).
- **Rotas reais:** `/onboarding`, `/simulador` e `/login` não existem. Equivalentes: simulador em `/planos#simulador`,
  área logada em `/painel`, `/pagamento`, `/confirmacao`, login em `/entrar`. Indexáveis e no sitemap: `/`, `/produto`,
  `/planos`, `/empresa`, `/contato`, `/cadastro`, `/privacidade`, `/termos`. As demais têm `noindex` e `Disallow`.
- **Títulos:** padrão "Página | CRAI" (antes era "Página — CRAI"). A home mantém "CRAI — …".
- **Prévia de links:** WhatsApp/LinkedIn não executam JS, então todas as páginas compartilham a prévia da home
  (título, descrição e imagem do `index.html`). O Google executa JS e lê o título/descrição de cada rota.
- **Imagem OG e ícones:** feitos com a tipografia do site (Inter) e o wordmark/seta já usados, não Bookman/Calibri.
- **Tema:** o site só tem tema escuro; `theme-color` fixo em `#1A120A`.
- **Mobile:** teste automatizado de rolagem horizontal feito; Lighthouse e teste em aparelho real ainda pendentes.
- **Textos legais:** ajustados ao que o site coleta hoje — seção 3.2 lista os campos reais do cadastro; 3.3 diz que o
  simulador calcula no navegador e não armazena nada (não há upload de CSV no site ainda); seção 10 cita
  armazenamento local em vez de cookies (não há analytics, logo não há banner). Campos `[ENTRE COLCHETES]`
  continuam aparecendo no site até serem preenchidos. Versão em inglês com aviso de que a portuguesa prevalece.
- **Links obrigatórios:** coluna "Legal" no rodapé; checkbox do cadastro com links (abrem em nova aba para não perder
  o formulário; o aceite já era gravado com data/hora em `aceite_termos_em`); aviso no login e no formulário de contato.

---

## 0. Pré-requisito: constantes do site

Centralizar URL, nome e textos padrão num só lugar evita divergência entre metadata, sitemap e robots.

```ts
// lib/site.ts
export const SITE = {
  name: "CRAI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.crai.com.br", // ⚠️ confirmar domínio final
  locale: "pt_BR",
  description:
    "A CRAI recupera pagamentos falhos no Pix Automático e antecipa cancelamentos com IA. Retenção de receita para SaaS brasileiros.",
  contactEmail: "agentia.startup@gmail.com", // ⚠️ trocar por contato@<domínio> quando existir
  dpoEmail: "privacidade@crai.com.br",       // ⚠️ criar a caixa antes do lançamento
} as const;
```

Adicionar `NEXT_PUBLIC_SITE_URL` no `.env.local` e nas variáveis de ambiente da hospedagem.

---

## 1. Página 404 personalizada

**Objetivo:** quem cai num link quebrado continua no site, com a identidade visual da CRAI e caminhos claros de volta.

**Implementação** — o App Router usa `app/not-found.tsx` automaticamente para qualquer rota inexistente e já responde com HTTP 404 (importante para o Google não indexar a página como conteúdo).

```tsx
// app/not-found.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold tracking-widest text-[#EF9311]">ERRO 404</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Essa página deu churn.</h1>
      <p className="mt-4 max-w-md text-base opacity-80">
        O endereço que você procurou não existe ou foi movido. Mas a sua receita
        não precisa ir embora junto.
      </p>
      <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <Link href="/" className="rounded-lg bg-[#EF9311] px-6 py-3 font-semibold text-[#1A120A]">
          Voltar para o início
        </Link>
        <Link href="/onboarding" className="rounded-lg border border-current px-6 py-3 font-semibold">
          Fazer uma simulação
        </Link>
      </div>
    </main>
  );
}
```

**Bilíngue:** adicionar a chave `notFound` ao contrato de tipo de `content/pt.ts` e `content/en.ts` e ler do mesmo hook/contexto que as outras páginas usam (se o idioma vem de contexto client-side, extrair o conteúdo para um componente `"use client"` renderizado dentro do `not-found.tsx`).

| Chave | pt | en |
|-------|----|----|
| `notFound.eyebrow` | ERRO 404 | ERROR 404 |
| `notFound.title` | Essa página deu churn. | This page churned. |
| `notFound.body` | O endereço que você procurou não existe ou foi movido. Mas a sua receita não precisa ir embora junto. | The page you're looking for doesn't exist or has moved. Your revenue doesn't have to go with it. |
| `notFound.ctaHome` | Voltar para o início | Back to home |
| `notFound.ctaSim` | Fazer uma simulação | Run a simulation |

**Critérios de aceite**

- [ ] `curl -I https://<domínio>/qualquer-coisa` retorna `HTTP/2 404`
- [ ] Funciona nos temas claro e escuro (trocar as cores fixas pelos tokens de tema já usados no site)
- [ ] Header e footer do site aparecem (se estiverem no `layout.tsx` raiz, isso é automático)
- [ ] Botões com área de toque ≥ 44 px e empilhados no celular
- [ ] Recomendado: `app/error.tsx` com o mesmo visual para erros 500

---

## 2. Design 100% mobile

**Objetivo:** o público decide em reunião, no notebook, mas o primeiro contato costuma vir de link no WhatsApp ou LinkedIn, aberto no celular. Nenhuma página pode quebrar em 360 px.

**Implementação**

```ts
// app/layout.tsx
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Não usar maximumScale: 1 — bloqueia o zoom e prejudica acessibilidade
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1A120A" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};
```

**Regras de layout**

- Mobile-first no Tailwind: classes sem prefixo são o celular; `sm:`, `md:`, `lg:` acrescentam para telas maiores
- Usar `min-h-dvh` em vez de `h-screen`/`100vh` (a barra do navegador no iOS corta o conteúdo)
- Inputs com fonte ≥ 16 px (`text-base`) — abaixo disso o Safari dá zoom automático ao focar
- Área de toque mínima de 44 × 44 px em botões, links do menu e checkboxes
- Tabelas (planos, resultados da simulação) viram cards empilhados no celular ou ficam dentro de `overflow-x-auto`
- Imagens com `next/image` e `sizes` definido
- Menu com hambúrguer abaixo de `md`, com foco preso no menu aberto e fechamento por `Esc`
- Wizard de onboarding de 5 etapas: uma etapa por tela, botões "Voltar/Próximo" fixos no rodapé, upload de CSV/XLSX testado em Android e iOS (`accept=".csv,.xlsx"`)

**Matriz de teste**

| Largura | Dispositivo de referência |
|---------|---------------------------|
| 360 px | Android pequeno (Galaxy A) |
| 390 px | iPhone 13/14/15 |
| 430 px | iPhone Pro Max |
| 768 px | iPad retrato |
| 1280 px | Notebook |

**Critérios de aceite**

- [ ] Nenhuma rolagem horizontal em 360 px (no console: `document.documentElement.scrollWidth > innerWidth` deve dar `false`)
- [ ] Lighthouse mobile: Performance ≥ 85, Acessibilidade ≥ 95, SEO = 100
- [ ] Fluxo completo do onboarding concluído num celular real
- [ ] Temas claro e escuro conferidos no celular

---

## 3 e 4. Meta title e meta description por página

**Objetivo:** cada página aparece no Google e nos compartilhamentos com título e resumo próprios, sem duplicação.

**Regras**

- Title: até **60 caracteres**, termo principal no início, marca no fim via template
- Description: entre **120 e 160 caracteres**, com benefício e chamada implícita
- Nenhum par title/description repetido entre páginas
- Evitar preços na description (o modelo comercial ainda está sendo ajustado)

**Layout raiz (padrões e template)**

```ts
// app/layout.tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "CRAI — Recuperação de receita e retenção para SaaS",
    template: "%s | CRAI",
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    siteName: SITE.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
```

**Por página**

```ts
// app/privacidade/page.tsx
export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a CRAI coleta, usa, protege e compartilha dados pessoais de visitantes, usuários e clientes, conforme a LGPD.",
  alternates: { canonical: "/privacidade" },
};
```

> ⚠️ **Pegadinha do Next.js:** páginas com `"use client"` no topo **não podem** exportar `metadata`. Nesses casos, mover o `"use client"` para um componente filho ou criar um `layout.tsx` na pasta da rota só para a metadata.
>
> ⚠️ Se a página definir `openGraph`, o objeto **substitui** o do layout inteiro (não mescla). Repetir `siteName`, `locale` e `type` ou usar a imagem OG por arquivo (item 5), que é herdada automaticamente.

**Inventário de páginas** (⚠️ conferir contra as rotas reais do repositório)

| Rota | Title (resultado final) | Description | Indexar? |
|------|-------------------------|-------------|----------|
| `/` | CRAI — Recuperação de receita e retenção para SaaS | A CRAI recupera pagamentos falhos no Pix Automático e antecipa cancelamentos com IA. Retenção de receita para SaaS brasileiros. | Sim |
| `/onboarding` | Simule sua recuperação de receita \| CRAI | Envie sua base de clientes ou gere dados de teste e veja, em minutos, quanto do seu churn a CRAI poderia recuperar e reter. | Sim |
| `/simulador` (área logada) | Painel \| CRAI | Área autenticada da CRAI com perfil salvo, histórico de simulações e indicadores de churn da sua base de clientes. | **Não** |
| `/login` | Entrar \| CRAI | Acesse sua conta CRAI para ver os indicadores de churn e retenção da sua empresa. | **Não** |
| `/privacidade` | Política de Privacidade \| CRAI | Como a CRAI coleta, usa, protege e compartilha dados pessoais de visitantes, usuários e clientes, conforme a LGPD. | Sim |
| `/termos` | Termos de Uso \| CRAI | Regras de uso do site e da plataforma CRAI: conta, responsabilidades, dados enviados, propriedade intelectual e limitações. | Sim |
| 404 | Página não encontrada \| CRAI | — | **Não** |

Páginas "Não" recebem `robots: { index: false, follow: false }` na metadata e ficam fora do sitemap.

**Critérios de aceite**

- [ ] Todas as rotas da tabela conferidas no código-fonte da página (`Ctrl+U`): um só `<title>` e uma só `<meta name="description">`
- [ ] Nenhum title acima de 60 caracteres; nenhuma description fora de 120–160
- [ ] `<link rel="canonical">` presente e apontando para o domínio de produção

---

## 5. Imagem Open Graph

**Objetivo:** link da CRAI compartilhado no WhatsApp, LinkedIn ou Slack aparece com imagem, título e descrição, não como link cru.

**Especificação**

| Propriedade | Valor |
|-------------|-------|
| Tamanho | 1200 × 630 px (proporção 1,91:1) |
| Formato | PNG ou JPG, **até 300 KB** (o WhatsApp costuma ignorar imagens maiores) |
| Área segura | conteúdo importante dentro dos 1080 × 560 centrais (o LinkedIn corta as bordas) |
| Fundo | `#1A120A` |
| Destaque | laranja `#EF9311` / âmbar `#FFB86C` |
| Conteúdo | logo CRAI + "Recuperação de receita e retenção para SaaS" + "Pix Automático · IA · LGPD" |
| Tipografia | Bookman Old Style (título) e Calibri (apoio), conforme identidade |

**Opção A (recomendada) — imagem estática:** salvar como `app/opengraph-image.png` e criar `app/opengraph-image.alt.txt` com o texto alternativo. O Next.js gera as tags `og:image`, `og:image:width`, `og:image:height` e `twitter:image` sozinho, e todas as páginas herdam.

**Opção B — imagem gerada por código:**

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CRAI — Recuperação de receita e retenção para SaaS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px", background: "#1A120A", color: "#FFFFFF",
      }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: "#EF9311" }}>CRAI</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          Recuperação de receita e retenção para SaaS
        </div>
        <div style={{ fontSize: 30, marginTop: 32, color: "#FFB86C" }}>
          Pix Automático · IA · LGPD
        </div>
      </div>
    ),
    size,
  );
}
```

Se alguma página precisar de imagem própria (ex.: `/onboarding`), basta colocar outro `opengraph-image.png` dentro da pasta da rota.

**Critérios de aceite**

- [ ] Prévia correta no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) e no [Sharing Debugger do Facebook](https://developers.facebook.com/tools/debug/)
- [ ] Teste real: colar o link numa conversa do WhatsApp e ver a prévia
- [ ] `og:image` com URL absoluta (depende do `metadataBase` do item 3)

---

## 6. Favicon ativo

**Objetivo:** ícone da CRAI na aba do navegador, nos favoritos, na tela inicial do celular e nos resultados do Google.

**Arquivos** (todos dentro de `app/` — o Next.js gera as tags `<link>` sozinho)

| Arquivo | Tamanho | Uso |
|---------|---------|-----|
| `app/favicon.ico` | 16, 32 e 48 px no mesmo `.ico` | Aba do navegador, Google |
| `app/icon.png` | 512 × 512 | Navegadores modernos |
| `app/apple-icon.png` | 180 × 180, **sem transparência** | Tela inicial do iPhone |
| `app/manifest.ts` | — | Android / "Adicionar à tela inicial" |

```ts
// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CRAI — Retention OS",
    short_name: "CRAI",
    start_url: "/",
    display: "standalone",
    background_color: "#1A120A",
    theme_color: "#EF9311",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
```

**Design do ícone:** em 16 px o logo completo fica ilegível. Usar só o "A" com a seta laranja sobre fundo `#1A120A` (ou fundo transparente com contorno), testando em aba clara e escura.

**Critérios de aceite**

- [ ] Remover o `favicon.ico` padrão do Next.js/Vercel (conferir também em `public/`)
- [ ] Ícone visível em aba clara e escura (Chrome, Safari, Edge)
- [ ] "Adicionar à tela inicial" no iPhone e Android mostra o ícone correto
- [ ] Sem erro 404 de ícone no console

---

## 7. robots.txt

**Objetivo:** dizer aos buscadores o que indexar, bloquear áreas privadas e impedir que o ambiente de testes apareça no Google.

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/simulador/", "/login"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

> `robots.txt` não é segurança: ele só pede para não indexar. A área `/simulador` continua protegida pela autenticação.

**Critérios de aceite**

- [ ] `https://<domínio>/robots.txt` abre e contém a linha `Sitemap:`
- [ ] Em preview/staging, o arquivo retorna `Disallow: /`
- [ ] Nenhuma página pública importante bloqueada por engano

---

## 8. sitemap.xml

**Objetivo:** listar as páginas públicas para acelerar a indexação.

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "",             priority: 1.0, freq: "weekly"  },
    { path: "/onboarding",  priority: 0.8, freq: "monthly" },
    { path: "/privacidade", priority: 0.3, freq: "yearly"  },
    { path: "/termos",      priority: 0.3, freq: "yearly"  },
  ];

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
```

**Regras**

- Só páginas indexáveis (nada de `/login`, `/simulador`, 404)
- Âncoras da home (`#recuperacao`, `#retencao`) **não** entram — não são URLs separadas
- Se o inglês ganhar rotas próprias (ex.: `/en`), adicionar `alternates.languages` em cada entrada e `hreflang` na metadata. Enquanto o idioma for só um seletor na mesma URL, o Google indexa a versão pt-BR

**Critérios de aceite**

- [ ] `https://<domínio>/sitemap.xml` abre como XML válido
- [ ] Todas as URLs retornam 200
- [ ] Sitemap enviado no Google Search Console (propriedade de domínio verificada via DNS)

---

## 9. Política de Privacidade

**Rota:** `/privacidade` · **Link obrigatório:** footer de todas as páginas, formulário de cadastro/login e tela de upload de base no onboarding.

> ⚠️ Texto-modelo alinhado à LGPD (Lei 13.709/2018) e ao Marco Civil da Internet (Lei 12.965/2014). Os campos entre colchetes precisam ser preenchidos e a versão final deve passar por revisão jurídica antes da publicação — este rascunho não substitui orientação de advogado. Conferir especialmente a seção 3.3 contra o que o site realmente armazena.

---

### Política de Privacidade da CRAI

**Vigência:** [DD/MM/AAAA] · **Versão:** 1.0

#### 1. Quem somos

A CRAI ([RAZÃO SOCIAL], CNPJ [00.000.000/0000-00], com sede em [ENDEREÇO]) desenvolve uma plataforma de recuperação de receita e retenção de clientes para empresas SaaS. Esta Política explica como tratamos dados pessoais no site [DOMÍNIO] e na plataforma CRAI.

#### 2. Nosso papel em relação aos dados

- **Como controladora:** tratamos os dados de visitantes do site e de usuários que criam conta (representantes das empresas clientes).
- **Como operadora:** tratamos os dados dos clientes finais que as empresas clientes enviam à plataforma (por exemplo, a base de assinantes de um SaaS). Nesse caso, a empresa cliente é a controladora, define as finalidades e é responsável por ter base legal para compartilhar esses dados conosco.

#### 3. Quais dados coletamos

**3.1 Visitantes do site**
- Dados de navegação: endereço IP, data e hora de acesso, navegador, dispositivo, páginas visitadas e origem do acesso.
- Cookies (ver seção 10).
- Dados informados em formulários de contato: nome, e-mail, empresa, cargo e mensagem.

**3.2 Usuários com conta**
- Nome, e-mail corporativo, empresa, cargo e senha (armazenada de forma criptografada).
- Registros de uso da plataforma e das simulações salvas no perfil.

**3.3 Dados enviados pelas empresas clientes**
- Bases de clientes em CSV/XLSX ou via integração, que podem conter: identificador do cliente, histórico de pagamentos e cobranças, plano contratado, datas de adesão e cancelamento e indicadores de uso do produto.
- **Simulação anônima do onboarding:** os arquivos enviados na simulação sem login são processados apenas durante a sessão e [não são armazenados após o encerramento da sessão]. Recomendamos enviar bases sem nome, e-mail, CPF ou telefone dos clientes finais.

Não solicitamos dados pessoais sensíveis (art. 5º, II, da LGPD) e pedimos que não sejam enviados.

#### 4. Para que usamos os dados e com qual base legal

| Finalidade | Dados | Base legal (LGPD) |
|------------|-------|-------------------|
| Exibir e manter o site funcionando com segurança | Navegação, IP | Legítimo interesse (art. 7º, IX) |
| Guardar registros de acesso exigidos por lei | IP, data e hora | Obrigação legal (art. 7º, II; Marco Civil, art. 15) |
| Responder contatos e enviar propostas | Dados do formulário | Procedimentos preliminares de contrato (art. 7º, V) |
| Criar e manter a conta | Dados cadastrais | Execução de contrato (art. 7º, V) |
| Calcular risco de churn, recuperar pagamentos e gerar indicadores | Base enviada pela empresa cliente | Conforme instruções da empresa cliente (controladora) |
| Medir audiência e melhorar o site | Cookies analíticos | Consentimento (art. 7º, I) |
| Enviar comunicações sobre a CRAI | E-mail | Consentimento, revogável a qualquer momento |

#### 5. Com quem compartilhamos

Não vendemos dados pessoais. Compartilhamos apenas o necessário com:
- **Provedores de infraestrutura:** hospedagem do site ([PROVEDOR DE HOSPEDAGEM]) e banco de dados e autenticação (Supabase).
- **Provedores de pagamento:** [PSP A DEFINIR], quando a cobrança via Pix Automático estiver ativa.
- **Provedores de modelos de linguagem:** apenas quando a funcionalidade de mensagens geradas por IA estiver habilitada, com o mínimo de dados necessário.
- **Autoridades públicas:** quando houver obrigação legal ou ordem judicial.

Todos os fornecedores são contratualmente obrigados a proteger os dados e a usá-los só para prestar o serviço à CRAI.

#### 6. Transferência internacional

Alguns fornecedores podem armazenar dados em servidores fora do Brasil. Nesses casos, a transferência segue o art. 33 da LGPD, com cláusulas contratuais e garantias de proteção equivalentes.

#### 7. Por quanto tempo guardamos

| Dado | Prazo |
|------|-------|
| Registros de acesso ao site | 6 meses (Marco Civil, art. 15) |
| Dados de conta | Enquanto a conta estiver ativa + [5] anos para cumprimento de obrigações legais |
| Bases enviadas por empresas clientes | Durante o contrato; eliminadas em até [30] dias após o término, salvo instrução diferente da controladora |
| Formulários de contato | [24] meses |

#### 8. Decisões automatizadas

A plataforma usa modelos de inteligência artificial para estimar risco de cancelamento, prever a melhor data de cobrança e sugerir ações de retenção. Essas análises apoiam as decisões da empresa cliente. O titular pode solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado e informações sobre os critérios utilizados (art. 20 da LGPD), respeitados os segredos comercial e industrial.

#### 9. Seus direitos

Nos termos do art. 18 da LGPD, você pode solicitar: confirmação da existência de tratamento; acesso aos dados; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade; portabilidade; eliminação dos dados tratados com consentimento; informação sobre compartilhamentos; e revogação do consentimento.

Se você é cliente final de uma empresa que usa a CRAI, encaminhe o pedido preferencialmente a essa empresa. Se nos contatar diretamente, repassaremos o pedido a ela.

Responderemos em até 15 dias. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).

#### 10. Cookies

| Tipo | Para que serve | Precisa de consentimento? |
|------|----------------|---------------------------|
| Essenciais | Login, sessão, preferência de tema e idioma | Não |
| Analíticos | Entender como o site é usado | Sim |

Você pode gerenciar cookies no banner do site ou nas configurações do navegador.

#### 11. Segurança

Adotamos criptografia em trânsito (HTTPS) e em repouso, controle de acesso por perfil, autenticação segura e registro de acessos. Em caso de incidente de segurança com risco relevante aos titulares, comunicaremos a ANPD e os afetados, conforme o art. 48 da LGPD.

#### 12. Público

A CRAI é um serviço destinado a empresas e não é direcionada a menores de 18 anos.

#### 13. Encarregado (DPO)

[NOME DO ENCARREGADO] · [privacidade@DOMÍNIO]

#### 14. Alterações

Podemos atualizar esta Política. A data de vigência no topo indica a versão atual, e mudanças relevantes serão comunicadas por e-mail aos usuários com conta.

---

## 10. Termos de Uso

**Rota:** `/termos` · **Link obrigatório:** footer de todas as páginas e checkbox "Li e aceito os Termos de Uso e a Política de Privacidade" no cadastro (desmarcado por padrão, com registro de data/hora do aceite).

> ⚠️ Mesmo aviso do item 9: texto-modelo com campos a preencher e revisão jurídica obrigatória antes de publicar. As condições comerciais detalhadas ficam no contrato/proposta, não aqui.

---

### Termos de Uso da CRAI

**Vigência:** [DD/MM/AAAA] · **Versão:** 1.0

#### 1. Aceitação

Ao acessar o site [DOMÍNIO] ou criar uma conta na plataforma CRAI, você concorda com estes Termos e com a [Política de Privacidade](/privacidade). Se estiver agindo em nome de uma empresa, declara ter poderes para aceitá-los em nome dela.

#### 2. Definições

- **CRAI:** [RAZÃO SOCIAL], CNPJ [00.000.000/0000-00].
- **Plataforma:** o site, o dashboard, as simulações, as APIs e os agentes de recuperação e retenção.
- **Cliente:** empresa que contrata ou testa a Plataforma.
- **Usuário:** pessoa autorizada pelo Cliente a usar a Plataforma.
- **Clientes finais:** os assinantes do Cliente, cujos dados podem ser enviados à Plataforma.

#### 3. O serviço

A Plataforma identifica pagamentos falhos e riscos de cancelamento, sugere e executa ações de recuperação (incluindo cobrança via Pix Automático, quando contratada) e apresenta indicadores em um dashboard. Funcionalidades identificadas como **beta** podem mudar, ser suspensas ou apresentar instabilidades.

#### 4. Conta

- O Usuário deve informar dados verdadeiros e mantê-los atualizados.
- Credenciais são pessoais e intransferíveis; o Cliente é responsável pelo que for feito com as contas de seus Usuários.
- Suspeita de uso indevido deve ser comunicada imediatamente a [contato@DOMÍNIO].

#### 5. Uso permitido

É proibido:
- Enviar dados sem base legal ou dados pessoais sensíveis de clientes finais;
- Tentar acessar áreas, contas ou dados de terceiros;
- Fazer engenharia reversa, copiar ou revender a Plataforma ou seus modelos;
- Sobrecarregar a infraestrutura, usar robôs não autorizados ou explorar vulnerabilidades;
- Usar a Plataforma para cobranças abusivas, enganosas ou em desacordo com o Código de Defesa do Consumidor.

#### 6. Dados enviados pelo Cliente

- O Cliente é o controlador dos dados de seus clientes finais e garante ter base legal para compartilhá-los com a CRAI.
- A CRAI atua como operadora, tratando esses dados apenas para prestar o serviço, conforme a [Política de Privacidade](/privacidade) e o contrato.
- O Cliente mantém a titularidade dos seus dados. A CRAI pode usar dados **agregados e anonimizados** para melhorar seus modelos, sem identificar o Cliente ou os clientes finais.

#### 7. Cancelamento livre

Os agentes de retenção da CRAI **nunca dificultam, obstruem ou atrasam** o cancelamento solicitado por um cliente final. Ofertas de retenção são apresentadas como opção, e o pedido de cancelamento é sempre respeitado, em linha com o Decreto nº 11.034/2022.

#### 8. Remuneração

- As condições comerciais (planos, percentuais e forma de cobrança) constam na proposta ou contrato assinado com o Cliente.
- A remuneração por êxito é calculada sobre o **ganho incremental**, medido contra um grupo de controle, e não sobre o valor bruto recuperado.
- Simulações no site e acesso beta gratuito não geram cobrança.

#### 9. Simulações e resultados

Simulações, projeções e indicadores são **estimativas** baseadas nos dados fornecidos e em modelos estatísticos. Não constituem promessa ou garantia de resultado financeiro.

#### 10. Propriedade intelectual

A marca CRAI, o software, os modelos, o design e os conteúdos do site pertencem à CRAI. Estes Termos não transferem nenhum direito sobre eles, apenas concedem uma licença de uso limitada, não exclusiva e revogável durante a vigência da relação.

#### 11. Disponibilidade

A CRAI busca manter a Plataforma disponível de forma contínua, mas pode haver interrupções para manutenção, atualizações ou por falhas de terceiros (hospedagem, provedores de pagamento, instituições financeiras).

#### 12. Limitação de responsabilidade

Na extensão permitida pela lei, a CRAI não responde por lucros cessantes, perdas indiretas, decisões tomadas pelo Cliente com base nos indicadores, falhas de sistemas de terceiros ou dados incorretos enviados pelo Cliente. A responsabilidade total da CRAI fica limitada ao valor pago pelo Cliente nos [12] meses anteriores ao evento.

#### 13. Suspensão e encerramento

A CRAI pode suspender ou encerrar contas que violem estes Termos. O Cliente pode encerrar a conta a qualquer momento pelo e-mail [contato@DOMÍNIO]. Após o encerramento, os dados seguem os prazos da Política de Privacidade.

#### 14. Alterações

Estes Termos podem ser atualizados. Mudanças relevantes serão comunicadas com antecedência mínima de [15] dias aos usuários com conta. O uso continuado após a vigência indica concordância.

#### 15. Lei aplicável e foro

Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de [CIDADE/UF] para resolver eventuais controvérsias.

#### 16. Contato

[contato@DOMÍNIO] · [ENDEREÇO]

---

## Checklist final antes do deploy

- [ ] `npm run build` sem erros nem warnings de metadata
- [ ] Domínio definido em `NEXT_PUBLIC_SITE_URL` (produção) e `metadataBase` correto
- [ ] `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/favicon.ico` e `/opengraph-image.png` abrindo em produção
- [ ] URL inexistente retorna 404 com a página personalizada
- [ ] Lighthouse mobile rodado em home, `/onboarding`, `/privacidade` e `/termos`
- [ ] Prévias OG testadas no WhatsApp e no LinkedIn
- [ ] Links de Privacidade e Termos no footer e no cadastro
- [ ] Campos `[ENTRE COLCHETES]` dos textos legais preenchidos e revisados por advogado
- [ ] Banner de cookies ativo **se** houver ferramenta de analytics
- [ ] Site verificado e sitemap enviado no Google Search Console

### Pendências de decisão

| Pendência | Impacta | Dono |
|-----------|---------|------|
| Domínio definitivo | Itens 3, 5, 7, 8 | José |
| CNPJ / razão social | Itens 9, 10 | Gabriel |
| E-mail do encarregado (DPO) | Item 9 | José |
| Provedor de hospedagem | Item 9 (seção 5) | João Vitor |
| PSP do Pix Automático | Item 9 (seção 5) | Time |
| Se a simulação anônima armazena ou não os arquivos | Item 9 (seção 3.3) | João Vitor |
| Ferramenta de analytics (e se precisa de banner) | Itens 9 e 10 | José |
| Comarca do foro | Item 10 | Gabriel |
