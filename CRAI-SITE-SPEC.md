# CRAI — Site institucional do produto (spec de build para Claude Code)

Você vai construir um site em **React** que explica o produto da CRAI, com **área de cadastro e de pagamento já preenchidas** (mock visual, sem backend). Este documento é a fonte da verdade: siga o copy, os tokens e os efeitos descritos aqui. O que não estiver aqui, pergunte antes de inventar.

---

## 0. Regras do projeto (leia primeiro)

**Faça:**
- Site React (SPA) com roteamento, todas as páginas navegáveis.
- Cadastro e pagamento **com os campos já preenchidos** pelos valores mock da seção 9 — o visitante abre a tela e vê tudo pronto, só clica em avançar.
- Todos os dados vêm de arquivos locais em `src/data/`.
- Fonte **Inter** em todo o site.
- Efeitos visuais da seção 10 (catálogo derivado de svgator.com/blog/website-animation-examples-and-effects).

**Não faça:**
- Nenhum banco de dados, ORM, Prisma, Supabase, Firebase, SQLite — nada.
- Nenhum backend, API route, servidor, `fetch` para serviço externo.
- Nenhuma autenticação real, hash de senha, sessão, JWT.
- Nenhum gateway de pagamento real, SDK de PSP, chave de API.
- **Não use o logo da CRAI.** A marca aparece só como wordmark tipográfico "CRAI" (texto, com o tratamento da seção 4.4).
- Não instale bibliotecas fora da lista da seção 1.
- Não crie testes automatizados, CI, Docker.

Estados de formulário vivem em `useState`. Submit faz `console.log` + navega para a próxima tela. É uma vitrine navegável, não um produto funcional.

---

## 1. Stack e setup

```bash
npm create vite@latest crai-site -- --template react-ts
cd crai-site
npm i react-router-dom framer-motion
npm i -D tailwindcss @tailwindcss/vite
npm i @fontsource-variable/inter
```

- **React 18 + TypeScript + Vite**
- **react-router-dom** v6 (`createBrowserRouter`)
- **framer-motion** — transições de página, reveals, layout animations
- **Tailwind CSS v4** (plugin do Vite, config por `@theme` no CSS — sem `tailwind.config.js`)
- **@fontsource-variable/inter** — importe em `main.tsx`: `import '@fontsource-variable/inter'`
- Ícones: **SVG inline** escritos à mão em `src/components/icons/`. Não instale pacote de ícones — os ícones precisam ser animáveis path a path (seção 10.7).

Sem `localStorage`/`sessionStorage` para dados de negócio. A única exceção permitida é `sessionStorage` para marcar "preloader já rodou nesta sessão" (seção 10.1).

---

## 2. Estrutura de arquivos

```
src/
  main.tsx
  App.tsx                      # router + AnimatePresence + Preloader
  index.css                    # @theme, tokens, keyframes globais, reset
  routes/
    Home.tsx
    Produto.tsx
    Planos.tsx
    Painel.tsx                 # demo do painel do cliente
    Cadastro.tsx               # 3 etapas, pré-preenchido
    Pagamento.tsx              # autorização Pix, pré-preenchido
    Confirmacao.tsx
    Empresa.tsx
    Contato.tsx
    NotFound.tsx
  components/
    layout/ Header.tsx Footer.tsx PageShell.tsx
    motion/ Preloader.tsx PageTransition.tsx Reveal.tsx SelfDrawingSvg.tsx
            AmbientBackground.tsx TiltCard.tsx MagneticButton.tsx
            ScrollytellingSection.tsx HorizontalRail.tsx CountUp.tsx Skeleton.tsx
    ui/     Button.tsx Field.tsx Select.tsx Toggle.tsx Badge.tsx Card.tsx
            Stepper.tsx PixQrPlaceholder.tsx
    icons/  *.tsx
  sections/                    # blocos de página (Hero, ComoFunciona, Planos…)
  data/
    conteudo.ts                # todo o copy em pt-BR
    planos.ts
    mockCadastro.ts
    mockPagamento.ts
    mockPainel.ts
  lib/
    simulador.ts               # matemática do simulador de retorno
    format.ts                  # moeda BRL, percentual, CNPJ, telefone
    useReducedMotion.ts
    useInView.ts
```

Todo o texto visível sai de `src/data/conteudo.ts`. Nenhuma string de copy hardcoded em componente.

---

## 3. O produto (contexto real — use isso no copy)

A CRAI é uma empresa brasileira de software B2B. O produto recupera receita que empresas de SaaS perdem por churn e mostra o resultado em um painel.

- **Dois tipos de perda atacados:**
  - *Churn involuntário* — a cobrança recorrente falha (saldo, limite, erro no débito) e o cliente cai sem querer sair.
  - *Churn voluntário* — o cliente decide cancelar.
- **Cobrança e recuperação por Pix Automático.** Cartão está no roadmap, não no produto de hoje.
- **Inferência de liquidez:** o sistema estima quando a conta do assinante tem saldo e reagenda a tentativa para essa janela, em vez de repetir a cobrança em horário fixo.
- **A CRAI não é gateway de pagamento** e **não tem CRM próprio.** A empresa cliente acompanha tudo por um painel.
- **Modelo comercial: só taxa de sucesso, sem mensalidade e sem taxa de implantação.**
  - **Standard** — 25% sobre o **ganho incremental** na recuperação.
  - **Premium** — inclui tudo do Standard e soma **20% sobre a receita preservada** na retenção, por uma janela de 6 meses.
  - Premium é degrau, não caminho paralelo: quem assina Premium tem a recuperação do Standard junto e paga as duas taxas.
- **Ganho incremental medido contra grupo de controle (holdout).** A CRAI só cobra sobre o que recuperou **acima** do que a empresa recuperaria sozinha. Estorno em até 90 dias devolve a taxa (cláusula de clawback).
- **Cliente ideal:** SaaS brasileiro com MRR entre **R$ 25 mil e R$ 500 mil**.
- **Compromisso explícito:** o agente de retenção nunca dificulta, obstrui ou atrasa um cancelamento — conforme o Decreto 11.034/2022.
- **LGPD:** tratamento de dados mínimo e finalidade declarada.

**Números que podem aparecer no site** (vêm do plano de negócio, não invente outros):
- Taxa de falha de cobrança considerada no modelo: **10%** do faturamento recorrente.
- Ganho incremental estimado sobre a receita em risco: **20%** (o grupo de controle já recebe as retentativas obrigatórias do BACEN, então o espaço incremental é menor que o de operações com cartão).
- Cliente de referência do modelo: MRR R$ 50.000, 500 assinantes, ticket médio R$ 100 → taxa Standard ≈ **R$ 250/mês**, Premium ≈ **R$ 700/mês**.

**Time (usar na página Empresa):**
- José Scibarauskas Neto — Product Owner
- João Vitor Gava — Tech Lead
- Gabriel de Frias Ramirez — Desenvolvimento e Gestão Financeira

**Proibido no copy:** "garantimos", "100%", "elimine o churn", qualquer promessa de resultado. Tom realista, sem exagero para o lado bom nem para o ruim.

> `TODO_DADOS` — itens que só o time da CRAI confirma. Deixe o valor default indicado, marcado com comentário `// confirmar` no código:
> - PSP usado na cobrança (Pagar.me / iugu / Asaas / Vindi): no site, escreva "Pix Automático" sem citar PSP.
> - Parâmetros de churn voluntário do simulador (seção 8).
> - Logotipos de clientes/parceiros: não coloque nenhum.

---

## 4. Identidade visual

### 4.1 Cores (tokens em `index.css` via `@theme`)

```css
@theme {
  --color-ink:      #1A120A;   /* fundo base, quase preto quente */
  --color-slate:    #2B2926;   /* superfícies elevadas */
  --color-graphite: #565C61;   /* cinza-chumbo da marca — bordas, texto secundário */
  --color-silver:   #A6AAAD;   /* cinza claro da marca — texto de apoio */
  --color-paper:    #E8EAEB;   /* texto principal sobre escuro */
  --color-orange:   #EF9311;   /* acento primário — ação, ganho, seta */
  --color-amber:    #FFB86C;   /* acento secundário — gradiente, hover */
}
```

Site é **escuro por padrão**. Não construa alternância de tema.

Uso disciplinado do laranja: ele marca **ação e valor recuperado**, nada mais. Botão primário, número de receita recuperada, linha do gráfico que sobe, seta de progresso. Texto corrido, bordas e ícones neutros ficam em graphite/silver. Se mais de três coisas na dobra estiverem laranja, reduza.

Contraste mínimo 4.5:1 para texto. `--color-graphite` **não** serve para texto pequeno sobre `--color-ink` — use `--color-silver`.

### 4.2 Tipografia

Inter Variable, uma família só, com alternates ligados:

```css
body {
  font-family: 'Inter Variable', system-ui, sans-serif;
  font-feature-settings: 'cv11' 1, 'ss01' 1;  /* 'a' e 'g' de uma perna, pontuação melhor */
  font-variation-settings: 'opsz' 20;
}
.tabular { font-variant-numeric: tabular-nums; }  /* obrigatório em toda tabela e número financeiro */
```

Escala (desktop → mobile):

| Papel | Tamanho | Peso | Line-height | Tracking |
|---|---|---|---|---|
| Display (hero) | 68px → 40px | 640 | 1.02 | -0.035em |
| H1 | 46px → 32px | 620 | 1.08 | -0.025em |
| H2 | 32px → 25px | 600 | 1.15 | -0.02em |
| H3 | 22px → 19px | 560 | 1.25 | -0.01em |
| Corpo | 17px → 16px | 400 | 1.62 | 0 |
| Apoio | 14px | 450 | 1.5 | 0 |
| Número grande | 54px | 680 | 1 | -0.03em, tabular |

Regras: linha de texto com no máximo 72 caracteres. Frases em **sentence case** — nada de rótulo em caixa alta acima de título. Não destaque uma palavra solta do título em laranja ou itálico: se o título precisa de ênfase, reescreva o título.

### 4.3 Layout

- Container 1200px, respiro lateral 24px (mobile) / 48px (desktop).
- Grade de 12 colunas; seções alternam entre 12/12 e 7/5.
- Alinhamento **à esquerda** em tudo, inclusive hero. Nada centralizado exceto o rodapé legal.
- Raio: 4px em campos e botões, 14px em cards grandes, 0 em divisores. Um raio por nível de hierarquia, não o mesmo em tudo.
- Ritmo vertical: 128px entre seções no desktop, 80px no mobile.
- Sem sombra cinza genérica. Profundidade vem de: borda `1px solid rgba(166,170,173,.14)` + fundo `--color-slate` + um brilho laranja muito baixo só no elemento em foco.

### 4.4 Wordmark (sem logo)

Texto "CRAI" em Inter 680, tracking -0.04em, cor `--color-paper`, com o **A** em `--color-silver` e uma seta ascendente desenhada em SVG cruzando o A em `--color-orange` (path simples de 3 pontos, stroke 3px, linecap round). É um componente `<Wordmark />` em `components/ui/`, não um arquivo de imagem. No header a seta se redesenha no hover (seção 10.3).

---

## 5. Mapa de rotas

| Rota | Página | Papel |
|---|---|---|
| `/` | Home | Explica o problema, o produto e o modelo. Leva ao cadastro. |
| `/produto` | Produto | Como funciona por dentro: recuperação, retenção, inferência de liquidez, painel. |
| `/planos` | Planos | Standard × Premium em degraus + simulador de retorno. |
| `/painel` | Painel (demo) | Prévia navegável do painel do cliente. Marcar como **beta**. |
| `/cadastro` | Cadastro | Wizard de 3 etapas, **campos já preenchidos**. |
| `/pagamento` | Pagamento | Autorização de cobrança por Pix Automático, **já preenchida**. |
| `/confirmacao` | Confirmação | Fim do fluxo. |
| `/empresa` | Empresa | Propósito, como a empresa opera, time. |
| `/contato` | Contato | Formulário pré-preenchido. |
| `*` | 404 | Efeito líquido (seção 10.14). |

Header fixo com blur (seção 10.11): Produto · Planos · Painel · Empresa · Contato + botão primário "Criar conta". Footer com navegação, aviso "Site demonstrativo — nenhum pagamento é processado" e linha LGPD.

---

## 6. Páginas — conteúdo e copy

Copy abaixo é definitivo. Escreva em `conteudo.ts` exatamente assim.

### 6.1 Home

**Hero**
- Display: `A receita que some antes de virar churn`
- Subtítulo: `Cobranças que falham e assinantes que decidem sair drenam faturamento recorrente todo mês. A CRAI recupera parte disso por Pix Automático e cobra só sobre o que recupera.`
- Ações: `Criar conta` (primário, → `/cadastro`) · `Ver como funciona` (secundário, → `/produto`)
- Linha de apoio: `Sem mensalidade. Sem taxa de implantação. Sem CRM para você manter.`
- Visual: gráfico SVG ao vivo (seção 10.2) — linha de faturamento com um vale de falha e uma recuperação parcial em laranja.

**Onde o dinheiro escapa** (3 blocos, sem numeração — não é sequência)
1. `Cobrança falha` — `Cerca de 10% do faturamento recorrente tropeça em saldo, limite ou erro de débito. O assinante não quis sair; o pagamento é que não passou.`
2. `Tentativa cega` — `A retentativa padrão acontece em horário fixo, sem olhar quando a conta do assinante tem saldo. Boa parte falha de novo pelo mesmo motivo.`
3. `Cancelamento` — `Quem decide sair leva junto meses de receita futura. O aviso costuma aparecer tarde demais para qualquer conversa.`

**Como a CRAI trabalha** (scrollytelling, seção 10.5 — aqui sim é sequência, numere 01–04)
- `01 Conecta` — `A base de assinantes e o histórico de cobrança entram por importação de arquivo ou integração.`
- `02 Prevê` — `Os modelos estimam risco de queda e a janela provável de liquidez de cada assinante.`
- `03 Age` — `A cobrança é reagendada para a janela estimada e a comunicação sai pelo canal certo, no tom certo.`
- `04 Mede` — `Um grupo de controle fica de fora da ação. A diferença entre os dois grupos é o ganho incremental — e é só sobre ele que a CRAI cobra.`

**Modelo comercial** (bloco de destaque)
- Título: `Você paga depois de receber`
- Texto: `A CRAI não cobra mensalidade nem implantação. No Standard, 25% sobre o ganho incremental da recuperação. No Premium, isso continua valendo e entram mais 20% sobre a receita preservada na retenção, por seis meses. Se um pagamento for estornado em até 90 dias, a taxa volta.`
- Link: `Ver os planos` → `/planos`

**O que a CRAI não faz** (bloco de honestidade, 12/12, fundo slate)
- `Não somos gateway de pagamento.` `A cobrança continua no seu arranjo atual; a CRAI atua sobre ela.`
- `Não temos CRM próprio.` `Você acompanha resultado no painel, sem mais um sistema para alimentar.`
- `Não seguramos ninguém.` `O agente de retenção nunca dificulta, obstrui ou atrasa um cancelamento. Decreto 11.034/2022.`

**Fechamento**
- `Comece pelo simulador` / `Coloque seu MRR e veja quanto da sua receita em risco entra na conta.` → `/planos#simulador`

### 6.2 Produto

Seções, nesta ordem:
1. **Recuperação de cobranças que falharam** — diagrama SVG auto-desenhado do fluxo: cobrança falha → classificação do motivo → estimativa de janela de liquidez → nova tentativa por Pix Automático → confirmação ou nova rota. Texto explica que a decisão é por assinante, não por regra fixa.
2. **Inferência de liquidez** — explique em linguagem de dono de SaaS: `O sistema aprende o ciclo de entrada de dinheiro de cada assinante e tenta cobrar quando a conta tem saldo, em vez de repetir a mesma tentativa no mesmo horário.` Está no Standard, é o diferencial do plano de entrada.
3. **Retenção de quem quer sair** — sinais de risco antes do cancelamento; a ação é oferta e conversa, nunca fricção. Repetir o compromisso do Decreto 11.034/2022 aqui.
4. **Medição contra grupo de controle** — gráfico de duas linhas (controle × tratado), a área entre elas é o ganho incremental em laranja. `A conta da CRAI é a área entre as duas linhas.`
5. **O painel** — 3 prints mock (componentes React, não imagens) + link para `/painel`.
6. **Dados e limites** — importação por CSV/planilha ou integração; LGPD; a CRAI não armazena dado de cartão porque o produto opera por Pix Automático.

### 6.3 Planos

Dois cards em degrau — o Premium é desenhado **contendo** o Standard (borda do card Premium envolve visualmente um bloco "tudo do Standard"). Nenhum preço mensal em lugar nenhum.

**Standard — 25% sobre o ganho incremental**
- Recuperação de cobranças que falharam
- Inferência de liquidez e reagendamento
- Comunicação multicanal com o assinante
- Medição com grupo de controle
- Painel de resultado

**Premium — tudo do Standard + 20% sobre a receita preservada**
- Sinais de risco de cancelamento
- Ação de retenção sem fricção no cancelamento
- Janela de apuração de 6 meses sobre a receita preservada
- Integração por SDK

Nota abaixo dos cards: `As duas taxas do Premium são somadas: 25% sobre o ganho incremental da recuperação e 20% sobre a receita preservada. Estorno em até 90 dias devolve a taxa correspondente.`

Faixa de atendimento: `A CRAI atende SaaS com MRR entre R$ 25 mil e R$ 500 mil.`

**Simulador** (`#simulador`) — seção 8.

**FAQ** (accordion com microinteração, seção 10.7):
- `Como vocês provam o ganho incremental?` — grupo de controle, apuração mensal, relatório no painel.
- `E se o cliente pedir estorno?` — clawback de 90 dias.
- `Vocês aceitam cartão?` — hoje a operação é por Pix Automático; cartão está no roadmap.
- `Preciso trocar meu gateway?` — não.
- `Vocês dificultam o cancelamento para segurar o cliente?` — não, e por quê.

### 6.4 Painel (demo)

Badge `beta` no título. Layout de aplicação: barra lateral estreita + conteúdo.
- Cabeçalho: `NimbusFlow Tecnologia` · seletor de período (Últimos 30 dias / 90 dias / 12 meses) — troca os dados mock com animação de layout.
- 4 indicadores com contador animado (seção 10.10): `Receita em risco`, `Receita recuperada`, `Ganho incremental`, `Taxa da CRAI no período`.
- Gráfico de linha controle × tratado (SVG, path auto-desenhado ao entrar na tela).
- Tabela de cobranças: assinante, valor, motivo da falha, janela estimada, status, tentativa. Números em `tabular-nums`.
- Aba `Retenção`: lista de assinantes com risco de cancelamento e a ação sugerida.
- **Skeleton screens** (seção 10.12) por 900ms simulados ao montar a página e a cada troca de período.

### 6.5 Cadastro — **pré-preenchido**

Wizard de 3 etapas com `<Stepper />`. Todos os campos já vêm com os valores de `mockCadastro.ts` (seção 9). O usuário pode editar, mas nada é obrigatório e nada é validado contra serviço nenhum.

1. **Empresa** — razão social, nome fantasia, CNPJ, site, segmento (select), MRR médio (select por faixa), nº de assinantes.
2. **Responsável** — nome, cargo, e-mail, telefone, senha (campo `password` já preenchido com pontinhos; nunca logue esse valor).
3. **Operação** — plano (toggle Standard/Premium, Premium marcado), forma de cobrança (Pix Automático, fixo e desabilitado com nota `Cartão em breve`), início desejado (date, preenchido), checkbox de termos **já marcado**, checkbox opcional de comunicação **desmarcado**.

Botão final: `Ir para o pagamento` → `/pagamento`. Barra de progresso animada entre etapas; transição horizontal entre passos com `AnimatePresence` (`x: 24 → 0`).

### 6.6 Pagamento — **pré-preenchido**

Duas colunas: formulário (7) + resumo (5, `position: sticky`).

**Formulário — autorização de cobrança por Pix Automático** (todos os campos já preenchidos, de `mockPagamento.ts`):
- Titular da conta, CPF/CNPJ do titular, instituição (select), agência, conta, chave Pix da empresa.
- Dia de apuração mensal (select, `Todo dia 5`).
- Limite máximo por cobrança (campo em BRL, preenchido) — explique em uma linha: `O Pix Automático exige um teto autorizado por cobrança. Você pode alterar depois.`
- Checkbox `Autorizo a CRAI a cobrar a taxa de sucesso apurada` — **já marcado**.

**Resumo (card com tilt, seção 10.9):**
- Plano Premium
- `25% sobre o ganho incremental da recuperação`
- `20% sobre a receita preservada na retenção (6 meses)`
- `Sem mensalidade` · `Sem taxa de implantação`
- Estimativa do mês com base no cadastro: use o simulador (seção 8) com o MRR do mock → mostre `Estimativa da 1ª apuração` com o valor calculado, e logo abaixo: `Estimativa. A cobrança só acontece sobre resultado apurado.`
- `Total hoje: R$ 0,00` em destaque.

Botão `Autorizar cobrança` → estado de carregamento com o QR se formando (seção 10.13, ~1,4s) → navega para `/confirmacao`.

Faixa fixa no rodapé da página: `Ambiente de demonstração. Nenhum dado é enviado e nenhuma cobrança é feita.`

### 6.7 Confirmação

- Marca de confirmação SVG que se desenha uma vez.
- `Autorização registrada` / `A primeira apuração acontece no dia 5 do mês que vem. Enquanto isso, a CRAI já começa a monitorar as cobranças que falharem.`
- Três links: `Abrir o painel` → `/painel` · `Ver os planos` → `/planos` · `Voltar ao início` → `/`.

### 6.8 Empresa

Propósito, como a empresa opera hoje, time (3 cards com os cargos da seção 3), e um bloco curto sobre a origem: pesquisa sobre churn em SaaS brasileiro, validação com profissionais de mercado. Sem foto, sem depoimento inventado.

### 6.9 Contato

Nome, e-mail, empresa, assunto (select), mensagem — **todos pré-preenchidos** com o mock. Botão `Enviar mensagem` → estado de sucesso inline, sem navegação.

---

## 7. Componentes de UI

- `Button` — variantes `primary` (fundo laranja, texto ink), `ghost` (borda graphite), `link`. Foco visível com anel de 2px em amber. Estado `loading` com spinner desenhado por stroke.
- `Field` — label acima, input com borda inferior 1px que vira 2px laranja no foco (transição de largura a partir do centro, 220ms). Mensagem de apoio em silver 14px.
- `Toggle` — Standard/Premium, com o indicador deslizando via `layoutId` do framer-motion.
- `Card`, `Badge` (`beta`, `incluído no Standard`), `Stepper`, `Skeleton`, `PixQrPlaceholder` (grade 21×21 de quadrados que aparecem em ordem pseudoaleatória — **não** gere um QR real).

---

## 8. Simulador de retorno (`lib/simulador.ts`)

Puro, sem rede. Entradas com sliders + inputs numéricos sincronizados.

```ts
export const PREMISSAS = {
  taxaFalha: 0.10,          // 10% do MRR tropeça na cobrança
  ganhoIncremental: 0.20,   // 20% da receita em risco, acima do grupo de controle
  feeRecuperacao: 0.25,     // Standard
  feeRetencao: 0.20,        // Premium
  receitaPreservadaSobreMrr: 0.045, // default derivado do cliente de referência — confirmar
};

// Recuperação
receitaEmRisco      = mrr * taxaFalha;
ganhoIncrementalRS  = receitaEmRisco * ganhoIncremental;
taxaStandard        = ganhoIncrementalRS * feeRecuperacao;

// Retenção (só Premium)
receitaPreservada   = mrr * receitaPreservadaSobreMrr;
taxaRetencao        = receitaPreservada * feeRetencao;

// Totais
custoPremium        = taxaStandard + taxaRetencao;
liquidoPremium      = (ganhoIncrementalRS + receitaPreservada) - custoPremium;
```

Confira com o cliente de referência: MRR 50.000 → risco 5.000 → ganho incremental 1.000 → **Standard R$ 250**; receita preservada 2.250 → taxa 450 → **Premium R$ 700**. Se sua implementação não bater nesses dois números, está errada.

Saída, com contador animado e `tabular-nums`:
`Receita em risco / mês` · `Ganho incremental estimado` · `Taxa da CRAI` · `Fica com você`.

Abaixo, sempre visível: `Estimativa baseada em premissas do modelo da CRAI (falha de 10%, ganho incremental de 20%). O resultado real é apurado contra grupo de controle.`

Se o MRR informado sair da faixa R$ 25 mil–R$ 500 mil, mostre uma nota discreta em vez de bloquear: `Fora da faixa que a CRAI atende hoje.`

---

## 9. Dados mock (pré-preenchimento)

`src/data/mockCadastro.ts`
```ts
export const empresa = {
  razaoSocial: 'NimbusFlow Tecnologia Ltda',
  nomeFantasia: 'NimbusFlow',
  cnpj: '12.345.678/0001-90',
  site: 'nimbusflow.com.br',
  segmento: 'SaaS de gestão para clínicas',
  mrrFaixa: 'R$ 25 mil a R$ 75 mil',
  mrr: 50000,
  assinantes: 500,
};
export const responsavel = {
  nome: 'Ana Ribeiro',
  cargo: 'Head de Receita',
  email: 'ana.ribeiro@nimbusflow.com.br',
  telefone: '(11) 98888-1200',
  senha: 'demonstracao',   // campo password, nunca exibir em claro
};
export const operacao = {
  plano: 'premium' as const,
  cobranca: 'Pix Automático',
  inicio: '2026-10-01',
  aceitouTermos: true,
  aceitouComunicacao: false,
};
```

`src/data/mockPagamento.ts`
```ts
export const autorizacao = {
  titular: 'NimbusFlow Tecnologia Ltda',
  documento: '12.345.678/0001-90',
  instituicao: 'Banco de demonstração',
  agencia: '0001',
  conta: '123456-7',
  chavePix: 'financeiro@nimbusflow.com.br',
  diaApuracao: 5,
  limitePorCobranca: 2000,
  autorizado: true,
};
```

Tudo fictício e obviamente fictício. Não use CNPJ, banco, agência ou chave de empresa real — nem da CRAI, nem de terceiros.

`src/data/mockPainel.ts` — 12 meses de série (controle × tratado), 24 linhas de cobrança com motivos realistas (`Saldo insuficiente`, `Limite excedido`, `Autorização revogada`, `Erro na instituição`), 8 assinantes com risco de cancelamento. Gere os números de forma determinística (array escrito à mão ou seed fixa) — nada de `Math.random()` na renderização, o painel não pode mudar a cada refresh.

---

## 10. Catálogo de efeitos

Base: os efeitos do artigo da SVGator. Implementação em CSS/SVG/framer-motion — **nada de WebGL, three.js ou biblioteca de partículas**.

Disciplina: **um momento orquestrado por página**, não o mesmo fade-up em todas as seções. Escolha por página o efeito protagonista (indicado abaixo) e mantenha o resto discreto.

### 10.1 Preloader (`Preloader.tsx`) — *loading animation*
Só na primeira carga da sessão. Wordmark "CRAI" com a seta se desenhando por `stroke-dasharray`/`stroke-dashoffset` em ~900ms, depois fade de 240ms. Marque `sessionStorage.setItem('crai:preloaded','1')`. Máx. 1,2s no total.

### 10.2 Hero animado (`Home`) — *hero animation + ambient background + animated gradient* — **protagonista da Home**
Camadas:
1. Fundo: gradiente cônico escuro girando muito devagar (`@keyframes` 40s linear infinite) com `filter: blur(80px)`, opacidade ≤ 0.35.
2. Partículas: 18 círculos SVG com deriva vertical lenta e opacidades diferentes. Sem canvas.
3. Gráfico: linha de faturamento em silver que cai num vale, e uma segunda linha laranja que sobe parcialmente de volta. As duas se desenham na carga, em sequência (silver 800ms → laranja 700ms com 300ms de atraso), e depois a área entre elas preenche em laranja a 12% de opacidade.

### 10.3 Tipografia expressiva — *expressive typography*
Título do hero revelado palavra a palavra com máscara (`clip-path: inset(0 0 100% 0)` → `inset(0)`), 60ms de escalonamento, `cubic-bezier(.16,1,.3,1)`. Usar **só no hero da Home e no 404**. Na seta do wordmark do header, redesenhar no hover em 400ms.

### 10.4 Diagrama que se desenha (`SelfDrawingSvg.tsx`) — *self-drawing* — **protagonista do Produto**
Componente genérico: recebe um SVG com paths, calcula `getTotalLength()` de cada um, anima `strokeDashoffset` em ordem quando o bloco entra na viewport (`IntersectionObserver`, `threshold: .35`, dispara uma vez). Usado no fluxo de recuperação, no gráfico controle × tratado e na marca de confirmação.

### 10.5 Scrollytelling (`ScrollytellingSection.tsx`) — *scrollytelling*
Seção "Como a CRAI trabalha": coluna esquerda `sticky` com a ilustração, coluna direita com os 4 passos. Conforme cada passo entra na tela, a ilustração troca o estado ativo (destaque laranja no nó correspondente) com `layout` do framer-motion. No mobile vira empilhado, sem sticky.

### 10.6 Trilho horizontal (`HorizontalRail.tsx`) — *horizontal scrolling*
Na Home, o bloco "Onde o dinheiro escapa" é um trilho com `scroll-snap-type: x mandatory` no mobile e grade de 3 no desktop. Não force scroll-jacking vertical→horizontal.

### 10.7 Ícones animados e microinterações — *animated icons + microinteractions*
- Ícones de 24px com 2–3 paths que animam no hover do card (a seta desliza, o círculo completa o traço).
- Accordion do FAQ: `+` vira `×` por rotação de 45°; altura animada por `layout`.
- Input: sublinhado que cresce do centro no foco.
- Toggle de plano: indicador com `layoutId`.
- Botão: `scale: 0.985` no `:active`.

### 10.8 Morphing — *morphing*
No bloco de recuperação: ícone de fatura falhada faz morph para ícone de pagamento confirmado. Os dois paths precisam ter **o mesmo número de pontos**; interpole com `<animate attributeName="d">` ou framer-motion. Dispara ao entrar na tela e no hover. Um lugar só no site.

### 10.9 Cards com falso 3D (`TiltCard.tsx`) — *faux 3D*
`perspective: 900px`, rotação máxima de ±6° seguindo o mouse, `transition: transform 120ms`, brilho laranja sutil acompanhando o cursor. Usar **só** no resumo do pagamento e nos dois cards de plano.

### 10.10 Contadores — apoio a *microinteractions*
`CountUp.tsx`: anima de 0 ao valor em 900ms com easing de saída, `tabular-nums`, formatado em BRL. Roda quando entra na tela, uma vez por montagem.

### 10.11 Vidro (*glassmorphism*)
Header fixo: `backdrop-filter: blur(14px) saturate(140%)`, fundo `rgba(26,18,10,.72)`, borda inferior de 1px em `rgba(166,170,173,.14)`. A borda só aparece depois de 40px de scroll. Mesmo tratamento no card sticky do resumo de pagamento. Nada mais no site usa vidro.

### 10.12 Skeleton screens (`Skeleton.tsx`) — *loading skeleton*
Blocos com a forma real do conteúdo (não retângulos genéricos) e varredura diagonal de brilho em 1,6s. Usado no `/painel` na montagem e na troca de período.

### 10.13 Loader do Pix — *progression effect*
No submit do pagamento: os quadrados do `PixQrPlaceholder` aparecem em ordem pseudoaleatória em ~1,2s, depois um anel de confirmação se fecha. Só então navegue.

### 10.14 Efeito líquido no 404 — *liquid motion*
Blob SVG com dois paths alternando por `<animate>` em 6s, sob o texto `Essa página não existe — mas a receita que você procura talvez exista.` + link para a Home.

### 10.15 Transições de página (`PageTransition.tsx`) — *page transitions*
`AnimatePresence mode="wait"`: saída `opacity 1→0, y 0→-8` em 180ms; entrada `opacity 0→1, y 10→0` em 280ms com `cubic-bezier(.16,1,.3,1)`. Rolar para o topo a cada navegação.

### 10.16 Hover em links — *hover effects*
Links de navegação com sublinhado que cresce da esquerda em 180ms. Links dentro de texto ganham um traço laranja que se desenha. Sem `→` grudado no texto de botão.

### 10.17 Movimento reduzido — obrigatório
`lib/useReducedMotion.ts` lê `prefers-reduced-motion: reduce`. Quando ativo: sem preloader, sem parallax, sem auto-desenho (os paths nascem completos), sem partículas, sem tilt; transições ficam em `opacity` de 120ms. Um `@media (prefers-reduced-motion: reduce)` global cobre o CSS puro; o hook cobre o framer-motion.

---

## 11. Qualidade — piso obrigatório

- Responsivo de 360px a 1440px+. Testar o wizard e o painel em 390px.
- Foco de teclado visível em tudo que é focável. Wizard navegável só com teclado.
- `<label>` ligado a cada input por `htmlFor`/`id`. Nada de placeholder fazendo papel de label.
- Ordem de headings correta (um `h1` por página).
- Todo SVG decorativo com `aria-hidden="true"`; SVG informativo com `role="img"` + `<title>`.
- Imagens: nenhuma (o site é todo vetorial e tipográfico).
- Sem erro e sem warning no console.
- `npm run build` limpo.
- Zero dependência além da seção 1.

---

## 12. Ordem de execução sugerida

1. Setup, tokens em `index.css`, Inter, `Wordmark`, `Button`, `Field`, `Card`.
2. Shell: router, Header, Footer, `PageTransition`, `useReducedMotion`.
3. `conteudo.ts` e os mocks completos antes de qualquer página.
4. Home (hero + efeitos 10.2, 10.3, 10.6).
5. Produto (10.4, 10.5, 10.8).
6. `simulador.ts` + testes manuais dos dois números de referência, depois Planos.
7. Cadastro e Pagamento (pré-preenchidos) + Confirmação.
8. Painel (10.12) e Empresa/Contato.
9. 404, revisão de acessibilidade, `prefers-reduced-motion`, build.

Ao terminar cada etapa, rode o dev server e confira na tela antes de seguir.

---

## 13. Checklist de aceite

- [ ] Nenhum banco de dados, backend, API ou dependência de rede no projeto.
- [ ] O logo da CRAI não aparece em lugar nenhum; só o wordmark tipográfico.
- [ ] Inter carregada localmente e aplicada em todo o site.
- [ ] Cadastro abre com os três passos já preenchidos; pagamento abre com a autorização já preenchida e o checkbox marcado.
- [ ] Nenhum preço mensal em nenhuma página; só 25% e 20% de taxa de sucesso.
- [ ] Simulador bate R$ 250 (Standard) e R$ 700 (Premium) com MRR de R$ 50.000.
- [ ] O compromisso do Decreto 11.034/2022 aparece na Home e no Produto.
- [ ] Os 10 primeiros efeitos da seção 10 estão implementados e visíveis.
- [ ] `prefers-reduced-motion` desliga todo o movimento não essencial.
- [ ] Aviso de ambiente de demonstração visível na tela de pagamento.
- [ ] `npm run build` sem erros.
