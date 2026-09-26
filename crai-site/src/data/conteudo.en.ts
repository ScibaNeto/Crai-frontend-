import type { Conteudo } from './conteudo.pt'

// English copy. Not a literal translation: shorter, same dry tone, no promise that is not in the Portuguese.
// Legal names stay in Portuguese (LGPD, Decreto 11.034/2022) with a short gloss. Currency is always BRL.

export const conteudoEn: Conteudo = {
  idioma: {
    grupoAria: 'Language',
    opcoes: [
      { id: 'pt', rotulo: 'PT', nome: 'Português' },
      { id: 'en', rotulo: 'EN', nome: 'English' },
    ],
  },

  titulos: {
    home: 'CRAI — Revenue recovery for SaaS',
    produto: 'How CRAI works — CRAI',
    planos: 'Plans and simulator — CRAI',
    painel: 'Dashboard (demo) — CRAI',
    cadastro: 'Create account — CRAI',
    pagamento: 'Billing authorization — CRAI',
    confirmacao: 'Authorization recorded — CRAI',
    empresa: 'About CRAI — CRAI',
    contato: 'Contact — CRAI',
    naoEncontrada: 'Page not found — CRAI',
    entrar: 'Sign in — CRAI',
    redefinirSenha: 'New password — CRAI',
  },
  metaDescricao: 'CRAI recovers revenue SaaS companies lose to churn, through Pix Automático, and charges only on what it recovers.',

  site: {
    marca: 'CRAI',
    pularConteudo: 'Skip to content',
    inicioAria: 'CRAI, home page',
    navAria: 'Main navigation',
    nav: [
      { rotulo: 'Product', para: '/produto' },
      { rotulo: 'Plans', para: '/planos' },
      { rotulo: 'Dashboard', para: '/painel' },
      { rotulo: 'Company', para: '/empresa' },
      { rotulo: 'Contact', para: '/contato' },
    ],
    criarConta: 'Create account',
    entrar: 'Sign in',
    sair: 'Sign out',
    abrirMenu: 'Open menu',
    fecharMenu: 'Close menu',
    rodape: {
      descricao: 'B2B software that recovers part of the revenue SaaS companies lose to churn and shows the result in a dashboard.',
      navAria: 'Footer links',
      colunas: [
        {
          titulo: 'Product',
          links: [
            { rotulo: 'How it works', para: '/produto' },
            { rotulo: 'Plans and simulator', para: '/planos' },
            { rotulo: 'Dashboard (demo)', para: '/painel' },
          ],
        },
        {
          titulo: 'Company',
          links: [
            { rotulo: 'About CRAI', para: '/empresa' },
            { rotulo: 'Contact', para: '/contato' },
            { rotulo: 'Create account', para: '/cadastro' },
          ],
        },
      ],
      aviso: 'Beta version — no payment is processed.',
      lgpd: 'Data handled under the LGPD (Brazil’s data protection law), with minimal collection and a stated purpose.',
      legal: '© 2026 CRAI. Beta version.',
      marca: 'Revenue recovery and retention for Brazilian SaaS, billed only on what comes back.',
    },
  },

  home: {
    hero: {
      titulo: 'The revenue that leaves before it becomes churn',
      subtitulo:
        'Failed charges and subscribers who decide to leave drain recurring revenue every month. CRAI recovers part of it through Pix Automático and charges only on what it recovers.',
      acaoPrimaria: { rotulo: 'Create account', para: '/cadastro' },
      acaoSecundaria: { rotulo: 'See how it works', para: '/produto' },
      apoio: 'No monthly fee. No setup fee. No CRM for you to maintain.',
      grafico: {
        titulo: 'Illustrative chart of recurring revenue',
        descricao: 'Revenue drops when charges fail. The orange line is the recovered part: it climbs, but not back to the previous level.',
        rotulos: {
          faturamento: 'Recurring revenue',
          falha: 'Charges fail',
          recuperado: 'Recovered part',
        },
      },
    },
    escapa: {
      titulo: 'Where the money leaks',
      trilhoAria: 'Three ways to lose recurring revenue',
      blocos: [
        {
          id: 'falha',
          titulo: 'Failed charge',
          texto:
            'About 10% of recurring revenue trips on balance, limits or debit errors. The subscriber did not want to leave; the payment just did not go through.',
        },
        {
          id: 'cega',
          titulo: 'Blind retry',
          texto:
            'The default retry runs at a fixed time, without checking when the subscriber’s account has funds. Much of it fails again for the same reason.',
        },
        {
          id: 'cancelamento',
          titulo: 'Cancellation',
          texto: 'Whoever decides to leave takes months of future revenue along. The warning usually comes too late for any conversation.',
        },
      ],
    },
    comoFunciona: {
      titulo: 'How CRAI works',
      ilustracaoTitulo: 'Steps of CRAI’s work',
      passos: [
        {
          numero: '01',
          titulo: 'Connect',
          texto: 'The subscriber base and billing history come in by file import or integration.',
          estado: 'Subscriber base and billing history',
        },
        {
          numero: '02',
          titulo: 'Predict',
          texto: 'Models estimate each subscriber’s risk of dropping and likely liquidity window.',
          estado: 'Drop risk and liquidity window per subscriber',
        },
        {
          numero: '03',
          titulo: 'Act',
          texto: 'The charge is rescheduled to the estimated window and the message goes out on the right channel, in the right tone.',
          estado: 'New attempt in the estimated window',
        },
        {
          numero: '04',
          titulo: 'Measure',
          texto: 'A control group stays out of the action. The gap between the two groups is the incremental gain — the only thing CRAI charges on.',
          estado: 'Control group compared with the treated group',
        },
      ],
    },
    modelo: {
      titulo: 'You pay after you get paid',
      texto:
        'CRAI charges no monthly or setup fee. On Standard, 25% of the incremental gain from recovery. On Premium, that still applies, plus 20% of the revenue preserved through retention, for six months. If a payment is refunded within 90 days, the fee comes back.',
      link: { rotulo: 'See the plans', para: '/planos' },
      extratoTitulo: 'What goes on the bill',
      extrato: [
        { rotulo: 'Monthly fee', valor: 'None' },
        { rotulo: 'Setup', valor: 'None' },
        { rotulo: 'Standard', valor: '25% of incremental gain' },
        { rotulo: 'Premium', valor: '+ 20% of preserved revenue' },
        { rotulo: 'Refund within 90 days', valor: 'Fee returned' },
      ],
    },
    naoFaz: {
      titulo: 'What CRAI does not do',
      itens: [
        {
          titulo: 'We are not a payment gateway.',
          texto: 'Billing stays in your current setup; CRAI acts on top of it.',
        },
        {
          titulo: 'We have no CRM of our own.',
          texto: 'You follow results in the dashboard, with no extra system to feed.',
        },
        {
          titulo: 'We hold no one back.',
          texto:
            'The retention agent never hinders, obstructs or delays a cancellation. Decreto 11.034/2022 (Brazil’s consumer-service rules).',
        },
      ],
    },
    fechamento: {
      titulo: 'Start with the simulator',
      texto: 'Enter your MRR and see how much of your revenue at risk goes on the bill.',
      acao: { rotulo: 'Open the simulator', para: '/planos#simulador' },
    },
  },

  produto: {
    titulo: 'How CRAI works inside',
    lead: 'Charge recovery, liquidity inference, friction-free retention, and a measurement that separates what CRAI did from what would have happened anyway.',
    recuperacao: {
      titulo: 'Recovering failed charges',
      paragrafos: [
        'When a Pix Automático charge fails, CRAI classifies the reason, estimates the subscriber’s next liquidity window and schedules a new attempt for it.',
        'The decision is made per subscriber, from their own history, not by one fixed rule for the whole base. If the new attempt does not clear, the case takes another route.',
      ],
      fluxo: {
        titulo: 'Recovery flow for a failed charge',
        descricao: 'Failed charge, reason classification, estimated liquidity window, new Pix Automático attempt and, finally, confirmation or a new route.',
        etapas: [
          {
            n: '01',
            titulo: 'Charge fails',
            texto: 'The Pix Automático charge does not clear and revenue is at risk.',
          },
          {
            n: '02',
            titulo: 'Reason classification',
            texto: 'Balance, limit, authorization or technical error — each needs a different answer.',
          },
          {
            n: '03',
            titulo: 'Estimated liquidity window',
            texto: 'The subscriber’s history points to when the account should have balance.',
          },
          {
            n: '04',
            titulo: 'New attempt via Pix Automático',
            texto: 'The charge returns inside that window, not at a fixed time of day.',
          },
        ],
        ciclo: {
          rotulo: 'Cycle',
          texto: 'New route: if it does not clear, it reprocesses until it finds the best window.',
        },
        resultado: {
          rotulo: 'Result',
          titulo: 'Confirmed',
          texto: 'The charge clears and the subscription stays active, with no manual collections.',
          selo: 'Revenue recovered',
        },
      },
      morph: {
        titulo: 'Failed invoice icon turning into a confirmed payment',
        antes: 'Charge failed',
        depois: 'Payment confirmed',
      },
    },
    liquidez: {
      titulo: 'Liquidity inference',
      badge: 'included in Standard',
      texto:
        'The system learns each subscriber’s cash-in cycle and charges when the account has funds, instead of repeating the same attempt at the same time.',
      nota: 'Part of Standard. It is what separates the entry plan from a plain retry.',
      ilustracao: {
        titulo: 'Estimated balance of a subscriber’s account over the month',
        descricao: 'The balance is low early in the month, when the fixed-time attempt happens, and rises around day 10, the window CRAI estimates.',
        dias: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
        fixa: 'Fixed-time attempt',
        janela: 'Estimated window',
        saldo: 'Estimated balance',
      },
    },
    retencao: {
      titulo: 'Retaining those about to leave',
      texto:
        'On Premium, CRAI watches risk signals before the cancellation request and suggests one action per subscriber. The action is an offer or a conversation, never friction.',
      sinaisTitulo: 'Signals watched',
      sinais: ['Usage falling over the weeks', 'Repeated failed charges', 'Change in access pattern', 'Visits to the cancellation page'],
      acoesTitulo: 'Possible actions',
      acoes: ['An offer that fits current usage', 'A pause instead of a cancellation', 'A conversation with your team'],
      compromisso: {
        titulo: 'Whoever wants to leave, leaves',
        texto:
          'The retention agent never hinders, obstructs or delays a cancellation, as required by Decreto 11.034/2022 (Brazil’s consumer-service rules). The cancellation path stays exactly as it was.',
      },
    },
    medicao: {
      titulo: 'Measured against a control group',
      texto: 'You only pay for what CRAI recovered beyond what your company would have recovered on its own.',
      passos: [
        {
          titulo: 'One part stays out',
          texto: 'A group of subscribers with failed charges gets no action from CRAI and only the mandatory retries.',
        },
        {
          titulo: 'CRAI acts on the rest',
          texto: 'The other group gets rescheduling and outreach at the best moment to pay.',
        },
        {
          titulo: 'The gap is computed every month',
          texto: 'What the treated group recovered above the control group is the incremental gain, and it shows up in the dashboard.',
        },
      ],
      legenda: 'CRAI only charges for what clears the line.',
      exemplo: {
        titulo: 'One month of the reference customer',
        emRisco: '{valor} in failed charges',
        controle: 'Control group',
        tratado: 'Group treated by CRAI',
        recuperado: '{pct} recovered, {valor}',
        ganhoChave: '+ {valor} incremental gain',
        legendaLinha: 'What the control group recovered on its own',
        legendaBase: 'Basis for CRAI’s fee',
        contaGanho: 'Incremental gain',
        contaTaxa: 'CRAI fee ({pct})',
        contaFica: 'You keep',
        nota: 'Illustrative example with the model’s reference customer: MRR of R$ 50k and 10% of charges failing. The real result is measured against the control group in your own base.',
      },
    },
    painel: {
      titulo: 'The dashboard',
      texto:
        'Revenue at risk, recovered revenue, incremental gain and the period’s fee, with the detail of every charge. You follow results without feeding another system.',
      link: { rotulo: 'Open the dashboard demo', para: '/painel' },
      prints: {
        indicador: 'Incremental gain',
        indicadorDetalhe: 'Last 30 days, above the control group',
        grafico: 'Control × treated',
        tabela: 'Recent charges',
      },
    },
    dados: {
      titulo: 'Data and limits',
      itens: [
        {
          id: 'entrada',
          titulo: 'How data comes in',
          texto: 'CSV or spreadsheet import, or integration with the system you already use.',
        },
        {
          id: 'lgpd',
          titulo: 'LGPD',
          texto: 'Minimal data processing under the LGPD (Brazil’s data protection law), with a stated purpose: recover charges and reduce cancellations.',
        },
        {
          id: 'cartao',
          titulo: 'No card data',
          texto: 'The product runs on Pix Automático, so CRAI stores no card data.',
        },
        {
          id: 'gateway',
          titulo: 'No gateway switch',
          texto: 'Billing stays in your current setup. CRAI acts on top of it, not in its place.',
        },
      ],
    },
  },

  planosPagina: {
    titulo: 'A success fee and nothing else',
    lead: 'No monthly fee, no setup fee. You pay a share of what CRAI recovers, measured against a control group.',
    selecionado: 'Selected',
    selecionarAria: 'Select the {plano} plan',
    nota: 'The two Premium fees add up: 25% of the incremental gain from recovery and 20% of preserved revenue. A refund within 90 days returns the matching fee.',
    faixa: 'CRAI serves SaaS companies with MRR between R$ 25k and R$ 500k.',
    faq: {
      titulo: 'Frequently asked questions',
      itens: [
        {
          pergunta: 'How do you prove the incremental gain?',
          resposta:
            'Part of the subscribers with failed charges stays in a control group, outside CRAI’s action. Monthly, we compare recovery in both groups; the gap is the incremental gain. Each report lives in the dashboard.',
        },
        {
          pergunta: 'What if the customer asks for a refund?',
          resposta: 'If a recovered payment is refunded within 90 days, the fee charged on it is returned. This is the clawback clause in the contract.',
        },
        {
          pergunta: 'Do you accept cards?',
          resposta: 'Today the operation runs on Pix Automático. Cards are on the roadmap, not in the product yet.',
        },
        {
          pergunta: 'Do I need to switch my gateway?',
          resposta: 'No. CRAI is not a payment gateway. Billing stays in your current setup and CRAI acts on top of it.',
        },
        {
          pergunta: 'Do you make cancelling harder to keep the customer?',
          resposta:
            'No. The retention agent never hinders, obstructs or delays a cancellation, as required by Decreto 11.034/2022 (Brazil’s consumer-service rules). Beyond the rule, holding someone back only delays the exit and sours the relationship.',
        },
      ],
    },
  },

  planos: {
    standard: {
      nome: 'Standard',
      titulo: 'Recover what failed',
      resumo: 'Recovery of failed charges, billed only on what came in above the control group.',
      valor: '25%',
      base: 'of the incremental gain',
      detalhe: '',
      inclui: "What's included:",
      itens: [
        'Recovery of failed charges',
        'Liquidity inference and rescheduling',
        'Multichannel messaging to the subscriber',
        'Measurement with a control group',
        'Results dashboard',
      ],
      cta: 'Start with Standard',
    },
    premium: {
      nome: 'Premium',
      titulo: 'Recover and retain',
      resumo: 'Recovery of failed charges combined with retention of those signalling they will leave.',
      valor: '45%',
      base: '',
      detalhe: '25% of the incremental gain + 20% of preserved revenue',
      inclui: 'Everything in Standard, plus:',
      itens: [
        'Cancellation risk signals',
        'Retention action with no friction on cancellation',
        '6-month measurement window on preserved revenue',
        'SDK integration',
      ],
      cta: 'Start with Premium',
    },
  },

  simuladorCopy: {
    titulo: 'Return simulator',
    lead: 'Enter your MRR and see how much of your revenue at risk goes on the bill.',
    mrrRotulo: 'Monthly MRR, in BRL',
    sliderRotulo: 'Adjust MRR',
    planoRotulo: 'Plan',
    planos: [
      { value: 'standard', label: 'Standard' },
      { value: 'premium', label: 'Premium' },
    ],
    saidas: {
      risco: 'Revenue at risk / month',
      ganho: 'Estimated incremental gain',
      taxa: 'CRAI’s fee',
      fica: 'Stays with you',
    },
    preservada: 'plus {valor} of preserved revenue',
    taxaDetalheStandard: '25% of the incremental gain',
    taxaDetalhePremium: '{rec} from recovery + {ret} from retention',
    premissas: 'Estimate based on CRAI’s model assumptions (10% failure, 20% incremental gain). The real result is measured against a control group.',
    foraDaFaixa: 'Outside the range CRAI serves today.',
    acao: { rotulo: 'Create account', para: '/cadastro' },
  },

  painel: {
    titulo: 'Dashboard',
    badge: 'beta',
    lead: 'Browsable preview of the customer dashboard, with fictional data from a demo company.',
    leadConta: "Your company's dashboard, in beta. The numbers below are still demo data until the integration with your billing.",
    retencaoPremium: {
      titulo: 'Retention is part of Premium',
      texto:
        'Your current plan is Standard, focused on recovering failed charges. Reading subscribers at risk of canceling comes with Premium.',
      acao: 'See the plans',
    },
    navAria: 'Dashboard sections',
    abas: [
      { id: 'recuperacao', rotulo: 'Recovery' },
      { id: 'retencao', rotulo: 'Retention' },
    ],
    periodoAria: 'Data period',
    periodos: { '30d': 'Last 30 days', '90d': '90 days', '12m': '12 months' },
    carregando: 'Loading period data',
    indicadores: {
      risco: 'Revenue at risk',
      riscoDetalhe: 'Failed charges',
      recuperada: 'Recovered revenue',
      recuperadaDetalhe: 'Treated group',
      ganho: 'Incremental gain',
      ganhoDetalhe: 'Above the control group',
      taxa: 'CRAI’s fee for the period',
      taxaDetalhe: 'Recovery {rec} · Retention {ret}',
      taxaDetalheStandard: '25% of the incremental gain',
    },
    grafico: {
      titulo: 'Recovery rate: control × treated',
      descricao: 'Share of revenue at risk recovered by each group in the selected period.',
      controle: 'Control group',
      tratado: 'Treated group',
      ganho: 'Incremental gain',
    },
    meses: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    semana: 'Wk {n}',
    tabela: {
      titulo: 'Recent charges',
      colunas: ['Subscriber', 'Amount', 'Failure reason', 'Estimated window', 'Status', 'Attempt'],
      tentativa: '#{n}',
      janela: 'Day {dia} · {de}:00–{ate}:00',
      semJanela: '—',
    },
    motivos: {
      saldo: 'Insufficient funds',
      limite: 'Limit exceeded',
      revogada: 'Authorization revoked',
      instituicao: 'Bank error',
    },
    status: {
      recuperada: 'Recovered',
      reagendada: 'Rescheduled',
      tentativa: 'In progress',
      controle: 'Control group',
      naoRecuperada: 'Not recovered',
    },
    retencao: {
      titulo: 'Subscribers at risk of cancelling',
      colunas: ['Subscriber', 'Risk signal', 'Risk', 'Suggested action'],
      nota: 'No suggested action blocks, hinders or delays a cancellation (Decreto 11.034/2022, Brazil’s consumer-service rules).',
      riscos: { alto: 'High', medio: 'Medium' },
      planosAssinante: { clinica: 'Clinic plan', rede: 'Network plan', essencial: 'Essential plan' },
      casos: {
        'rc-1': { sinal: 'Usage down 48% in the last 4 weeks', acao: 'Customer success team reaches out' },
        'rc-2': { sinal: 'Two charges failed in a row', acao: 'Offer a one-month pause' },
        'rc-3': { sinal: 'Requested a full data export', acao: 'Ask why, no offer' },
        'rc-4': { sinal: 'No admin login for 21 days', acao: 'Send the month’s usage summary' },
        'rc-5': { sinal: 'Active users fell from 12 to 5', acao: 'Suggest a smaller plan' },
        'rc-6': { sinal: 'Support ticket unanswered for 6 days', acao: 'Prioritize the open ticket' },
        'rc-7': { sinal: 'Visited the cancellation page', acao: 'Offer a conversation with the team, if they want' },
        'rc-8': { sinal: 'Scheduling feature unused for 30 days', acao: 'Offer team training' },
      },
    },
  },

  cadastro: {
    titulo: 'Create account',
    lead: 'Fill in your company details and who will manage the account. It takes about two minutes.',
    stepperAria: 'Sign-up steps',
    etapaDe: 'Step {n} of {total}',
    etapas: ['Company', 'Contact', 'Operation'],
    empresa: {
      titulo: 'Company details',
      razaoSocial: 'Legal name',
      nomeFantasia: 'Trade name',
      cnpj: 'CNPJ (company tax ID)',
      site: 'Website',
      segmento: 'Segment',
      segmentos: ['Clinic management SaaS', 'Finance management SaaS', 'Education SaaS', 'Retail SaaS', 'Other segment'],
      mrrFaixa: 'Average MRR',
      faixas: ['Up to R$ 25k', 'R$ 25k to R$ 75k', 'R$ 75k to R$ 200k', 'R$ 200k to R$ 500k', 'Above R$ 500k'],
      assinantes: 'Number of subscribers',
    },
    responsavel: {
      titulo: 'Account owner',
      nome: 'Full name',
      cargo: 'Role',
      email: 'Email',
      telefone: 'Phone',
      senha: 'Password',
      senhaDica: 'At least 8 characters.',
    },
    operacao: {
      titulo: 'Operation',
      plano: 'Plan',
      planoDica: {
        standard: '25% of the incremental gain from recovery.',
        premium: 'Everything in Standard, plus 20% of revenue preserved through retention.',
      },
      cobranca: 'Billing method',
      cobrancaDica: 'Cards coming soon',
      inicio: 'Desired start',
      termos: 'I have read and accept the terms of use and the privacy policy',
      comunicacao: 'Send me product news by email',
      comunicacaoDica: 'Optional',
    },
    voltar: 'Back',
    continuar: 'Continue',
    finalizar: 'Go to payment',
    enviando: 'Creating account…',
    concluindo: 'Finishing your sign-up…',
    temConta: 'Already have an account?',
    entrar: 'Sign in',
    jaTemConta: {
      titulo: 'Your account is already set up',
      texto: 'You are signed in as {email}.',
      painel: 'Go to dashboard',
      sair: 'Sign out',
    },
    validacao: {
      obrigatorio: 'Required field.',
      cnpj: 'Invalid CNPJ. Check the numbers.',
      email: 'Enter a valid email.',
      senha: 'The password must be at least 8 characters.',
      telefone: 'Incomplete phone number. Include the area code.',
      termos: 'To create the account, accept the terms of use and the privacy policy.',
    },
    erros: {
      config: 'Sign-up is unavailable right now. Please try again later.',
      email_existente: 'An account with this email already exists.',
      cnpj_existente: 'This CNPJ is already registered with CRAI. Ask the person who manages your company account for an invite.',
      cnpj_invalido: 'Invalid CNPJ. Check the numbers.',
      senha_fraca: 'Weak password. Use at least 8 characters, mixing letters and numbers.',
      email_invalido: 'This email was not accepted. Check the address.',
      limite: 'Too many attempts in a short time. Wait a few minutes and try again.',
      rede: "Couldn't reach the server. Check your connection and try again.",
      desconhecido: "Couldn't complete the sign-up. Please try again.",
    },
    confirmarEmail: {
      titulo: 'Confirm your email',
      texto: 'We sent a confirmation link to {email}. Open it in this same browser to finish signing up and go on to payment.',
      voltar: 'Back to home',
    },
    mock: {
      cobranca: 'Pix Automático',
      mensagem:
        'Hi, CRAI team. We have about 500 subscribers and want to understand how preserved revenue is measured on Premium and how long integration takes.',
    },
  },

  entrar: {
    titulo: 'Sign in',
    lead: "Access your company's CRAI account.",
    email: 'Email',
    senha: 'Password',
    entrar: 'Sign in',
    entrando: 'Signing in…',
    esqueci: 'Forgot my password',
    semConta: "Don't have an account yet?",
    criarConta: 'Create account',
    validacao: {
      email: 'Enter a valid email.',
      senha: 'Enter your password.',
    },
    erros: {
      config: 'Sign-in is unavailable right now. Please try again later.',
      credenciais: 'Incorrect email or password.',
      nao_confirmado: 'Confirm your email before signing in. The link is in your inbox.',
      senha_fraca: 'Weak password.',
      mesma_senha: 'The new password must be different from the current one.',
      limite: 'Too many attempts in a short time. Wait a few minutes and try again.',
      rede: "Couldn't reach the server. Check your connection and try again.",
      desconhecido: "Couldn't sign in. Please try again.",
    },
    recuperar: {
      titulo: 'Reset password',
      texto: "Enter the account email. We'll send a link to create a new password.",
      enviar: 'Send link',
      enviando: 'Sending…',
      enviado: 'If there is an account for {email}, you will receive a link to create a new password.',
      voltar: 'Back to sign in',
    },
  },
  redefinirSenha: {
    titulo: 'New password',
    lead: 'Choose a new password for your account.',
    senha: 'New password',
    dica: 'At least 8 characters.',
    salvar: 'Save new password',
    salvando: 'Saving…',
    curta: 'The password must be at least 8 characters.',
    sucesso: 'Password changed. You are signed in.',
    irPainel: 'Go to dashboard',
    linkInvalido: 'This link has expired or was already used. Request a new one on the sign-in page.',
    irEntrar: 'Go to sign in',
  },
  pagamento: {
    titulo: 'Billing authorization',
    lead: 'The success fee is charged through Pix Automático, only on measured results. Company details come from your sign-up.',
    carregando: 'Loading company details…',
    formTitulo: 'Pix Automático billing authorization',
    campos: {
      titular: 'Account holder',
      documento: 'Holder’s CPF or CNPJ (tax ID)',
      instituicao: 'Institution',
      agencia: 'Branch',
      conta: 'Account',
      chavePix: 'Company Pix key',
      dia: 'Monthly settlement day',
      limite: 'Maximum per charge',
      limiteDica: 'Pix Automático requires an authorized cap per charge. You can change it later.',
      autorizo: 'I authorize CRAI to charge the measured success fee',
      autorizoErro: 'Check the authorization to continue.',
    },
    instituicoes: ['Demo bank', 'Demo credit union', 'Fictional institution S.A.'],
    dias: [5, 10, 15],
    diaRotulo: 'Every day {n}',
    resumo: {
      titulo: 'Summary',
      plano: '{nome} plan',
      linhas: ['25% of the incremental gain from recovery', '20% of revenue preserved through retention (6 months)'],
      selos: ['No monthly fee', 'No setup fee'],
      estimativa: 'Estimate for the 1st settlement',
      estimativaNota: 'Estimate. Billing only happens on measured results.',
      totalHoje: 'Total today',
    },
    autorizar: 'Authorize billing',
    registrando: 'Recording authorization',
    registrada: 'Authorization recorded',
    demo: 'Demo environment. No data is sent and nothing is charged.',
  },

  confirmacao: {
    titulo: 'Authorization recorded',
    texto: 'The first settlement happens on the 5th of next month. Meanwhile, CRAI starts monitoring charges that fail.',
    marca: 'Confirmation mark',
    links: [
      { rotulo: 'Open the dashboard', para: '/painel', variante: 'primary' as const },
      { rotulo: 'See the plans', para: '/planos', variante: 'ghost' as const },
      { rotulo: 'Back to home', para: '/', variante: 'link' as const },
    ],
  },

  empresaPagina: {
    titulo: 'A software company for the revenue that leaves without notice',
    lead: 'CRAI is a Brazilian B2B software company. The product recovers part of the revenue SaaS companies lose to churn and shows the result in a dashboard.',
    proposito: {
      titulo: 'Purpose',
      texto:
        'Help SaaS companies lose less revenue to problems that have a fix: a charge that failed on the wrong day, a subscriber nobody heard before they cancelled. And do it without friction for whoever decided to leave.',
    },
    operacao: {
      titulo: 'How the company operates today',
      itens: [
        { titulo: 'For whom', texto: 'Brazilian SaaS companies with MRR between R$ 25k and R$ 500k.' },
        { titulo: 'How it bills and recovers', texto: 'Through Pix Automático. Cards are on the roadmap.' },
        { titulo: 'How it earns', texto: 'Success fee only, measured against a control group. No monthly or setup fee.' },
        { titulo: 'How it handles data', texto: 'Minimal collection and a stated purpose, under the LGPD (Brazil’s data protection law).' },
      ],
    },
    time: {
      titulo: 'Team',
      pessoas: [
        { nome: 'José Scibarauskas Neto', cargo: 'Product Owner and Frontend/Backend Dev', foto: '/time/jose.jpg' },
        { nome: 'João Vitor Gava', cargo: 'Tech Lead', foto: '/time/joao.jpg' },
        { nome: 'Gabriel de Frias Ramirez', cargo: 'Strategic Planning and Finance', foto: '/time/gabriel.jpg' },
      ],
    },
    origem: {
      titulo: 'Where CRAI came from',
      texto:
        'CRAI started as research on churn in Brazilian SaaS: why companies with a good product lost revenue every month, and how much of it came from billing rather than dissatisfaction. The hypotheses were validated in conversations with practitioners before becoming a product.',
    },
  },

  contatoPagina: {
    titulo: 'Contact',
    lead: 'Talk to the CRAI team. The form comes pre-filled with demo data.',
    campos: {
      nome: 'Name',
      email: 'Email',
      empresa: 'Company',
      assunto: 'Subject',
      mensagem: 'Message',
    },
    assuntos: ['I want to understand Premium', 'Question about measurement', 'Integration and data', 'Something else'],
    enviar: 'Send message',
    sucesso: {
      titulo: 'Message recorded',
      texto: 'This is a demo site, so nothing was sent. In a real environment, the team would reply to the email given.',
      editar: 'Edit message',
    },
    lateral: {
      titulo: 'Before you write',
      texto: 'If the question is about money, the simulator shows the math with your MRR. If it is about the product, the Product page explains each step.',
      links: [
        { rotulo: 'Open the simulator', para: '/planos#simulador' },
        { rotulo: 'See how it works', para: '/produto' },
      ],
    },
  },

  naoEncontrada: {
    codigo: '404',
    titulo: 'This page does not exist — but the revenue you are looking for might.',
    link: { rotulo: 'Back to home', para: '/' },
  },
}
