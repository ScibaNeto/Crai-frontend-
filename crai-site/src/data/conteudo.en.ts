import type { Conteudo } from './conteudo.pt'
import { DOCUMENTOS_LEGAIS, EMAIL_CONTATO } from './institucional'

const { versao: VERSAO_DOCS, vigencia: VIGENCIA_DOCS } = DOCUMENTOS_LEGAIS

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

  seo: {
    home: {
      titulo: 'CRAI — Revenue recovery and retention for SaaS',
      descricao:
        'CRAI recovers failed payments through Pix Automático and helps Brazilian SaaS companies keep subscribers. You only pay on the revenue that comes back.',
    },
    produto: {
      titulo: 'How CRAI works | CRAI',
      descricao:
        'See how CRAI detects failed charges and cancellation risk, acts through Pix Automático and measures the result against a control group.',
    },
    planos: {
      titulo: 'Plans and simulator | CRAI',
      descricao:
        'Compare the Standard and Premium plans and simulate, with your own MRR, how much of the revenue you lose to churn CRAI could recover.',
    },
    painel: {
      titulo: 'Dashboard (demo) | CRAI',
      descricao:
        'CRAI dashboard with recovered revenue, charges in progress and churn indicators for your subscriber base, shown here as a demo version.',
    },
    cadastro: {
      titulo: 'Create account | CRAI',
      descricao:
        'Create your company’s CRAI account in about two minutes: company details, the account owner and billing through Pix Automático.',
    },
    pagamento: {
      titulo: 'Billing authorization | CRAI',
      descricao:
        'Authorize CRAI billing through Pix Automático. In the beta no payment is processed, and the authorization is for demonstration only.',
    },
    confirmacao: {
      titulo: 'Authorization recorded | CRAI',
      descricao:
        'Billing authorization recorded. Open the CRAI dashboard to follow recovered revenue and the churn indicators for your company.',
    },
    empresa: {
      titulo: 'About CRAI | CRAI',
      descricao:
        'Meet CRAI: the purpose, the way we operate and the team behind the revenue recovery and retention platform for Brazilian SaaS companies.',
    },
    contato: {
      titulo: 'Contact | CRAI',
      descricao:
        'Talk to the CRAI team about plans, how results are measured, data integration or any question about revenue recovery for SaaS.',
    },
    entrar: {
      titulo: 'Sign in | CRAI',
      descricao:
        'Sign in to your company’s CRAI account to follow recovered revenue, charges in progress and your churn and retention indicators.',
    },
    redefinirSenha: {
      titulo: 'New password | CRAI',
      descricao:
        'Set a new password for your company’s CRAI account. The reset link is sent to the registered email address and expires after a while.',
    },
    privacidade: {
      titulo: 'Privacy Policy | CRAI',
      descricao:
        'How CRAI collects, uses, protects and shares personal data of website visitors, users and customers, in line with Brazil’s LGPD.',
    },
    termos: {
      titulo: 'Terms of Use | CRAI',
      descricao:
        'Rules for using the CRAI website and platform: account, responsibilities, data you send, intellectual property and liability limits.',
    },
    dados: {
      titulo: 'Data, privacy and security (LGPD) | CRAI',
      descricao:
        'How CRAI protects SaaS and subscriber data: models trained without client data, per-company isolation, encrypted Pix keys and subprocessors.',
    },
    naoEncontrada: {
      titulo: 'Page not found | CRAI',
      descricao:
        'The address you looked for does not exist or has moved. Go back to the CRAI home page or simulate how much churned revenue could return.',
    },
  },

  site: {
    marca: 'CRAI',
    pularConteudo: 'Skip to content',
    inicioAria: 'CRAI, home page',
    navAria: 'Main navigation',
    nav: [
      { rotulo: 'Product', para: '/produto' },
      { rotulo: 'Plans', para: '/planos' },
      { rotulo: 'Dashboard', para: '/painel' },
      { rotulo: 'Data', para: '/dados' },
      { rotulo: 'Company', para: '/empresa' },
      { rotulo: 'Contact', para: '/contato' },
    ],
    criarConta: 'Create account',
    entrar: 'Sign in',
    sair: 'Sign out',
    abrirMenu: 'Open menu',
    fecharMenu: 'Close menu',
    temaClaro: 'Switch to light theme',
    temaEscuro: 'Switch to dark theme',
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
        {
          titulo: 'Legal',
          links: [
            { rotulo: 'Privacy Policy', para: '/privacidade' },
            { rotulo: 'Terms of Use', para: '/termos' },
            { rotulo: 'Privacy and security', para: '/dados' },
          ],
        },
      ],
      aviso: 'Beta version — no payment is processed.',
      lgpd: 'Data handled under the LGPD (Brazil’s data protection law), with minimal collection and a stated purpose.',
      legal: '© {ano} CRAI. Beta version.',
      documentosAria: 'Legal documents',
      documentos: [
        { rotulo: 'Terms of Use', para: '/termos' },
        { rotulo: 'Privacy Policy', para: '/privacidade' },
        { rotulo: 'Cookies and storage', para: '/privacidade#cookies' },
      ],
      marca: 'Revenue recovery and retention for Brazilian SaaS, billed only on what comes back.',
    },
    avisoPrivacidade: {
      aria: 'Cookie and privacy notice',
      titulo: 'No tracking cookies',
      texto:
        'CRAI does not use advertising or audience analytics cookies. We keep in your browser only what is essential for sign-in, language and theme. See the [Terms of Use](/termos) and the [Privacy Policy](/privacidade#cookies).',
      aceitar: 'Got it',
    },
  },

  legalPagina: {
    indice: 'Document contents',
    tabelaAria: 'Table (scroll sideways)',
    relacionadosAria: 'Other documents',
    relacionadosTitulo: 'See also',
    relacionados: [
      { rotulo: 'Terms of Use', para: '/termos' },
      { rotulo: 'Privacy Policy', para: '/privacidade' },
      { rotulo: 'Privacy and security, in plain language', para: '/dados' },
    ],
  },

  home: {
    hero: {
      selo: { tag: 'Beta', texto: 'Customer pilots in October and November 2026' },
      titulo: 'Revenue you already earned, back in the bank',
      destaque: 'back in the bank',
      subtitulo:
        'AI agents recover failed charges through Pix Automático and step in before a subscriber cancels. You follow everything on a dashboard and only pay on the gain CRAI proves.',
      acaoPrimaria: { rotulo: 'Run the free diagnosis', para: '/planos#simulador' },
      acaoSecundaria: { rotulo: 'See how it works', para: '/produto' },
      apoio: 'No monthly fee. No setup fee. No CRM for you to maintain.',
      fatos: ['No monthly fee', 'Pix Automático', 'Measured against a control group'],
      rolar: 'Scroll',
      mockup: {
        aria: 'Illustration of the CRAI dashboard with sample data for a SaaS with BRL 50k MRR',
        janela: 'dashboard.crai',
        titulo: 'This month',
        etiqueta: 'Illustrative data',
        status: 'Agents running',
        kpis: [
          { rotulo: 'Revenue at risk', valor: 5000, nota: '10% of BRL 50k MRR' },
          { rotulo: 'Incremental gain', valor: 1000, nota: 'above the control group' },
          { rotulo: 'You keep', valor: 750, nota: 'after the 25% fee' },
        ],
        grafico: 'Recovery accumulated this month',
        tratado: 'With CRAI',
        controle: 'Control group',
        eventosTitulo: 'Agent activity',
        eventos: [
          { tipo: 'ok', texto: 'Pix Automático recovered', valor: 'R$ 100.00' },
          { tipo: 'agenda', texto: 'New attempt in the liquidity window', valor: 'day 05' },
          { tipo: 'risco', texto: 'Risk signal: usage drop', valor: 'score 0.82' },
          { tipo: 'msg', texto: 'Retention offer sent', valor: 'WhatsApp' },
          { tipo: 'ok', texto: 'Pix Automático recovered', valor: 'R$ 100.00' },
          { tipo: 'saida', texto: 'Cancellation honored, no friction', valor: 'Decreto 11.034' },
        ],
      },
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
    marquee: {
      aria: 'What CRAI covers',
      itens: [
        'Pix Automático',
        'Liquidity inference',
        'Involuntary churn',
        'Voluntary churn',
        'Control group',
        'WhatsApp, email and SMS',
        'LGPD',
        'No monthly fee',
        'No setup fee',
        'Frictionless cancellation',
      ],
    },
    numeros: {
      eyebrow: 'The problem',
      titulo: 'Where the money leaks',
      lead: 'Revenue lost to failed charges rarely shows up as a single event in the numbers. Part of it is even booked as voluntary cancellation. That is why it goes unnoticed.',
      stats: [
        { de: 9, ate: 0, tipo: 'pct', texto: 'of monthly recurring revenue is lost, on average, to failed payments alone', fonte: 'Baremetrics' },
        { de: 25, ate: 40, tipo: 'pct', texto: 'of what companies record as cancellations is actually involuntary churn', fonte: 'Freemius' },
        {
          de: 45,
          ate: 70,
          tipo: 'pct',
          texto: 'of failed payments can be recovered with smart retries (card data)',
          fonte: 'Baremetrics and Freemius',
        },
        {
          de: 45,
          ate: 0,
          tipo: 'milBrl',
          texto: 'leak every month from a SaaS with BRL 500k MRR without anyone deciding to cancel',
          fonte: 'CRAI estimate on the 9% average',
        },
      ],
    },
    capitulos: {
      eyebrow: 'How it works',
      titulo: 'Two agents, one dashboard',
      lead: 'Each agent owns one kind of loss, end to end. No case is escalated to your team.',
      itens: [
        {
          numero: '01',
          rotulo: 'Recovery · involuntary churn',
          titulo: 'A charge failed. The agent acts on the right day.',
          texto:
            'A webhook reports the failure the moment it happens. The agent weighs the odds and the cost of recovering it, estimates when that payer will have funds and schedules the new Pix Automático attempt in that window, within Central Bank rules.',
          passos: ['Webhook', 'Diagnosis', 'Liquidity', 'Pix Automático', 'Multichannel'],
        },
        {
          numero: '02',
          rotulo: 'Retention · voluntary churn',
          titulo: 'A customer cooled down. The agent notices first.',
          texto:
            'A usage drop, a visit to the cancellation page or a downgrade becomes a risk score, weighted by the customer’s value. The agent picks an offer proportional to what is at stake and talks through the right channel, never making it harder to leave.',
          passos: ['Signal', 'Risk score', 'Offer', 'Conversation'],
        },
        {
          numero: '03',
          rotulo: 'Dashboard · proven result',
          titulo: 'You see what came back, account by account.',
          texto:
            'The dashboard shows how much was recovered and retained, with a record of every account worked. Everything is measured against a control group from your own base: the difference between the two is what CRAI charges on.',
          passos: ['Treated', 'Control', 'Incremental gain'],
        },
      ],
      visual: {
        aria: 'Animated illustration of the step',
        risco: 'Risk score',
        riscoAlto: 'high',
        oferta: 'Offer proportional to customer value',
        sinais: ['Usage drop', 'Cancellation page visit', 'Plan downgrade'],
        falha: 'Charge failed',
        recuperado: 'Payment recovered',
        tratado: 'Treated',
        controle: 'Control',
        ganho: 'Incremental gain',
      },
    },
    contraste: {
      eyebrow: 'Liquidity inference',
      titulo: 'Trying again is not the same as trying at the right time',
      lead: 'A fixed schedule retries at set intervals. CRAI estimates when that payer will have funds and concentrates the attempt there.',
      fixa: {
        rotulo: 'Fixed schedule',
        titulo: 'Same interval for everyone',
        texto: 'Each attempt lands on a day the account still has no funds. It fails again, for the same reason.',
      },
      crai: {
        rotulo: 'CRAI',
        titulo: 'One attempt in the right window',
        texto: 'The model estimates the likely funding date for that payer. The charge goes there.',
      },
      janela: 'Estimated liquidity window',
      dia: 'Day',
      nota: 'Illustration. Among the 19 recovery and retention solutions CRAI mapped, none offers liquidity inference.',
    },
    preco: {
      eyebrow: 'Pricing',
      titulo: 'BRL 0 to start. You pay after you get paid.',
      lead: 'No monthly fee, no setup, no per-subscriber charge. CRAI only earns when it produces a gain, and in proportion to it.',
      planos: [
        {
          nome: 'Standard',
          prefixo: '',
          taxa: 25,
          unidade: 'of incremental gain',
          resumo: 'Recovery of failed charges.',
          itens: ['Involuntary churn', 'Liquidity inference', 'Pix Automático', 'Multichannel messaging', 'Results dashboard'],
          selo: '',
        },
        {
          nome: 'Premium',
          prefixo: '+',
          taxa: 20,
          unidade: 'of preserved revenue',
          resumo: 'Everything in Standard, plus retention.',
          itens: ['All of Standard, with its 25%', 'Voluntary churn', 'Risk score and offers', '6-month window per retention', 'SDK integration'],
          selo: 'Most complete',
        },
      ],
      exemplo: {
        titulo: 'Example: SaaS with BRL 50k MRR',
        linhas: [
          { rotulo: 'Standard', valor: 250 },
          { rotulo: 'Premium', valor: 700 },
        ],
        porMes: '/mo',
        nota: 'Reference company in CRAI’s financial model: 500 subscribers, BRL 100 average ticket.',
      },
      garantia: 'Recovered payment refunded within 90 days? The fee comes back.',
      acao: { rotulo: 'See plans and simulator', para: '/planos' },
    },
    parceiros: {
      eyebrow: 'Validation',
      titulo: 'Decisions validated with people who run the market',
      lead: 'Three professionals follow the project and validate product and operating decisions.',
      pessoas: [
        { nome: 'Waldir Augusto Gunther', papel: 'Founder and head', empresa: 'Casa do Cliente', area: 'Customer relationship', foto: '/parceiros/waldir.jpg' },
        { nome: 'Leo Gmeiner', papel: 'Founder and CEO', empresa: 'School Guardian', area: 'SaaS platform management', foto: '/parceiros/leo.jpg' },
        { nome: 'Wallace Barbosa', papel: 'Head of payments', empresa: 'iFood', area: 'Payments', foto: '/parceiros/wallace.jpg' },
      ],
    },
    roadmap: {
      eyebrow: 'Roadmap',
      titulo: 'Where CRAI is right now',
      agora: 'Now',
      etapas: [
        { quando: 'Mar 2026', titulo: 'Research', texto: 'Study of churn in Brazilian SaaS and definition of the idea.', estado: 'feito' },
        { quando: 'Sep 2026', titulo: 'MVP', texto: 'Agents, models and dashboard under construction.', estado: 'agora' },
        { quando: 'Oct–Nov 2026', titulo: 'Customer pilots', texto: 'First customers measuring incremental gain.', estado: 'depois' },
        { quando: 'Early 2027', titulo: 'Commercial launch', texto: 'Operation with the Standard and Premium plans.', estado: 'depois' },
        { quando: 'Late 2027–2028', titulo: 'More integrations', texto: 'Broader integrations. Credit card is on the roadmap.', estado: 'depois' },
        { quando: '2031', titulo: 'Reference in Brazil', texto: 'Wider reach built on the existing base.', estado: 'depois' },
      ],
    },
    faq: {
      titulo: 'Frequently asked questions',
      itens: [
        {
          pergunta: 'How much does it cost to start?',
          resposta:
            'Nothing. There is no monthly fee, setup fee or per-subscriber charge. CRAI only charges a share of the gain it proves: 25% on recovery and, on Premium, another 20% on revenue preserved by retention.',
        },
        {
          pergunta: 'How do you prove the incremental gain?',
          resposta:
            'Part of the subscribers stays in a control group, outside CRAI’s action. We compare both groups, and the difference is the incremental gain. The calculation for each period is on the dashboard.',
        },
        {
          pergunta: 'Do I need to change my payment gateway?',
          resposta: 'No. CRAI is not a payment gateway. Billing stays on your current setup and CRAI works on top of it.',
        },
        {
          pergunta: 'Does my team need to follow each case?',
          resposta: 'No. The agents decide and act without escalating to human support. Your team follows the result on the dashboard.',
        },
        {
          pergunta: 'How do you handle my subscribers’ data?',
          resposta: 'Under the LGPD (Brazil’s data protection law), with minimal collection: only the data strictly needed for the agent’s decision enters the system.',
        },
        {
          pergunta: 'When can I use it?',
          resposta:
            'CRAI is building the MVP. Customer pilots are planned for October and November 2026 and the commercial launch for early 2027. This site is a beta version.',
        },
      ],
    },
    cta: {
      eyebrow: 'Free diagnosis',
      titulo: 'How much of your revenue is leaking?',
      texto: 'Enter your MRR and see how much is at risk from failed charges and how much of it can come back. No sign-up, no commitment.',
      acaoPrimaria: { rotulo: 'Run the diagnosis', para: '/planos#simulador' },
      acaoSecundaria: { rotulo: 'Talk to the team', para: '/contato' },
    },
  },

  produto: {
    indice: {
      aria: 'Sections on this page',
      itens: [
        { id: 'recuperacao', rotulo: 'Recovery' },
        { id: 'liquidez', rotulo: 'Liquidity' },
        { id: 'retencao', rotulo: 'Retention' },
        { id: 'medicao', rotulo: 'Measurement' },
        { id: 'painel', rotulo: 'Dashboard' },
        { id: 'dados', rotulo: 'Data' },
      ],
    },
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
          texto: 'Minimal data processing under the LGPD (Brazil’s data protection law), with a stated purpose: recover charges and reduce cancellations. [How we protect data](/dados)',
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
    faixa: 'CRAI serves every Brazilian SaaS company, of any size.',
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
          pergunta: 'Do you make canceling harder to keep the customer?',
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
      resumo: 'Recovery of failed charges combined with retention of those signaling they will leave.',
      valor: '25% + 20%',
      base: '',
      detalhe: '25% of the incremental gain + 20% of preserved revenue',
      inclui: 'Everything in Standard, plus:',
      itens: [
        'Cancellation risk signals',
        'Retention action with no friction on cancellation',
        '6-month attribution window on preserved revenue',
        'SDK integration',
      ],
      cta: 'Start with Premium',
      selo: 'Most complete',
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
      fica: 'You keep',
    },
    preservada: 'plus {valor} of preserved revenue',
    taxaDetalheStandard: '25% of the incremental gain',
    taxaDetalhePremium: '{rec} from recovery + {ret} from retention',
    premissas: 'Estimate based on CRAI’s model assumptions (10% failure, 20% incremental gain and, on Premium, preserved revenue of 4.5% of MRR). The real result is measured against a control group.',
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
    resumo: {
      titulo: 'Back in your account',
      deRisco: 'out of {risco} in failed charges',
      recuperado: '{p} recovered',
      barraAria: 'Revenue at risk in the period: {base} would come back on its own, {ganho} of incremental gain and {aberto} not recovered.',
      base: 'Would come back anyway',
      baseDetalhe: 'What the control group recovers with no action',
      ganho: 'Incremental gain',
      ganhoDetalhe: 'What CRAI brought on top',
      aberto: 'Not recovered',
      abertoDetalhe: 'In a new attempt or not recovered',
    },
    extrato: {
      titulo: 'Period statement',
      ganho: 'Incremental gain',
      taxaRecuperacao: 'Recovery fee · 25%',
      preservada: 'Preserved revenue',
      taxaRetencao: 'Retention fee · 20%',
      total: 'CRAI’s fee',
      fica: 'You keep',
      nota: 'The fee applies only to what was measured above the control group.',
    },
    falhas: {
      titulo: 'Why it failed',
      descricao: 'Failure reason across the {n} recent charges.',
      cobrancas: '{n} charges',
    },
    grafico: {
      titulo: 'Cumulative recovery: with CRAI × control group',
      descricao: 'Revenue that came back, added up over the period. The distance between the two lines is the incremental gain.',
      controle: 'Would come back anyway (control group)',
      tratado: 'With CRAI',
      ganho: 'Incremental gain',
      explorarAria: 'Interactive chart: hover or use the arrow keys to read each point.',
    },
    meses: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    semana: 'Wk {n}',
    tabela: {
      titulo: 'Recent charges',
      colunas: ['Subscriber', 'Amount', 'Failure reason', 'Estimated window', 'Status', 'Attempt'],
      colunasPainel: ['Subscriber', 'Amount', 'Estimated balance window', 'Attempt', 'Status'],
      filtroAria: 'Filter charges by status',
      todas: 'All',
      janelaAria: 'Estimated window: day {dia}, from {de}:00 to {ate}:00',
      reguaHoras: ['0h', '12h', '24h'],
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
      titulo: 'Subscribers at risk of canceling',
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
    etapas: ['Company', 'Owner', 'Operation'],
    empresa: {
      titulo: 'Company details',
      razaoSocial: 'Legal name',
      nomeFantasia: 'Trade name',
      cnpj: 'CNPJ (company tax ID)',
      site: 'Website',
      segmento: 'Segment',
      naoInformado: 'Select (optional)',
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
      termos: 'I have read and accept the [Terms of Use](/termos) and acknowledge the [Privacy Policy](/privacidade)',
      comunicacao: 'Send me product news by email',
      comunicacaoDica: 'Optional',
    },
    voltar: 'Back',
    continuar: 'Continue',
    finalizar: 'Go to payment',
    enviando: 'Creating account…',
    concluindo: 'Finishing your sign-up…',
    carregando: 'Loading…',
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
      data: 'Choose a date from today onward.',
      termos: 'To create the account, accept the Terms of Use.',
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
    aviso: 'By signing in, you agree to the [Terms of Use](/termos). See how we handle your data in the [Privacy Policy](/privacidade).',
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
    carregando: 'Checking the link…',
    erro: 'We could not save the new password. Try again or request a new link on the sign-in page.',
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
    diaRotulo: 'Day {n} of each month',
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
    texto: 'The first settlement happens on day {dia} of next month. Meanwhile, CRAI starts monitoring charges that fail.',
    marca: 'Confirmation mark',
    links: [
      { rotulo: 'Open the dashboard', para: '/painel', variante: 'primary' as const },
      { rotulo: 'See the plans', para: '/planos', variante: 'ghost' as const },
      { rotulo: 'Back to home', para: '/', variante: 'link' as const },
    ],
  },

  empresaPagina: {
    declaracao: {
      eyebrow: 'Strategic statement',
      missao: {
        rotulo: 'Mission',
        texto:
          'Give Brazilian subscription software companies back the recurring revenue they lose to failed payments and cancellations, with AI agents that act on their own and prove every result.',
      },
      visao: {
        rotulo: 'Vision',
        texto: 'Be the reference in revenue retention and recovery for subscription software companies in Brazil by 2031.',
      },
      valoresTitulo: 'Values',
      valores: [
        { nome: 'Autonomy', texto: 'The agent runs the cycle end to end, without needing someone on your team for each case.' },
        { nome: 'Transparency', texto: 'If CRAI acts on your base by itself, it accounts for every action and every result.' },
        { nome: 'Rigor', texto: 'Results measured against a control group, with stated assumptions and conservative estimates.' },
        { nome: 'Security', texto: 'LGPD compliance: only the data strictly needed for the decision enters the system.' },
        { nome: 'Efficiency', texto: 'Every recovered real (R$) should cost only a small fraction of its value.' },
      ],
    },
    titulo: 'A software company for the revenue that leaves without notice',
    lead: 'CRAI is a Brazilian B2B software company. The product recovers part of the revenue SaaS companies lose to churn and shows the result in a dashboard.',
    proposito: {
      titulo: 'Purpose',
      texto:
        'Help SaaS companies lose less revenue to problems that have a fix: a charge that failed on the wrong day, a subscriber nobody heard before they canceled. Revenue can be recovered; trust can’t. That’s why we treat every one of your subscribers as if they were our own.',
    },
    operacao: {
      titulo: 'How the company operates today',
      itens: [
        { titulo: 'For whom', texto: 'Every Brazilian SaaS company, from those just starting out to those operating at scale.' },
        { titulo: 'How it bills and recovers', texto: 'Through Pix Automático. Cards are on the roadmap.' },
        { titulo: 'How it earns', texto: 'Success fee only, measured against a control group. No monthly or setup fee.' },
        { titulo: 'How it handles data', texto: 'Minimal collection and a stated purpose, under the LGPD (Brazil’s data protection law). [See how we protect data](/dados).' },
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
    lead: 'Talk to the CRAI team. The message goes out from your own email, already filled in.',
    email: EMAIL_CONTATO,
    exemplos: { nome: 'Ana Ribeiro', email: 'ana@yourcompany.com', empresa: 'Your SaaS name', mensagem: 'Tell us what you need to know.' },
    erros: {
      nome: 'Enter your name.',
      email: 'Enter a valid email.',
      mensagem: 'Write your message.',
    },
    assuntoEmail: '[CRAI website] {assunto}',
    campos: {
      nome: 'Name',
      email: 'Email',
      empresa: 'Company',
      assunto: 'Subject',
      mensagem: 'Message',
    },
    assuntos: ['I want to understand Premium', 'Question about measurement', 'Integration and data', 'Something else'],
    enviar: 'Send message',
    privacidade:
      'When you send, your email app opens with the message ready; nothing you type is stored on this website. We only use this data to reply, as described in the [Privacy Policy](/privacidade).',
    sucesso: {
      titulo: 'One step left: send the email',
      texto: 'We opened your email app with the message ready for {email}. If it did not open, write to that address directly.',
      abrir: 'Open the email again',
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
    titulo: 'This page churned.',
    texto: 'The page you are looking for does not exist or has moved. Your revenue does not have to go with it.',
    inicio: { rotulo: 'Back to home', para: '/' },
    simulacao: { rotulo: 'Run a simulation', para: '/planos#simulador' },
  },

  erroInesperado: {
    titulo: 'Something went wrong here.',
    texto: 'An unexpected error interrupted the page. Reload it or go back to the home page; if it keeps happening, get in touch.',
    inicio: 'Back to home',
    tituloAba: 'Unexpected error | CRAI',
  },

  centralPrivacidade: {
    titulo: 'Privacy and security',
    lead: 'How CRAI protects your SaaS’s data and your subscribers’ data, in plain language. The full documents are at the end of the page.',
    selo: 'LGPD',
    atualizado: `Documents at version ${VERSAO_DOCS} · effective from ${VIGENCIA_DOCS.en}`,
    atalhos: 'Read in full: [Terms of Use](/termos) · [Privacy Policy](/privacidade)',
    tabelaAria: 'Subprocessors table (scroll sideways)',
    indiceAria: 'On this page',
    indice: [
      { rotulo: 'Commitments', para: '#compromissos' },
      { rotulo: 'For subscribers', para: '#assinantes' },
      { rotulo: 'How the agent decides', para: '#agente' },
      { rotulo: 'Security', para: '#seguranca' },
      { rotulo: 'Subprocessors', para: '#suboperadores' },
      { rotulo: 'Retention', para: '#retencao' },
      { rotulo: 'Data protection officer', para: '#encarregado' },
      { rotulo: 'Documents', para: '#documentos' },
    ],
    compromissos: {
      eyebrow: 'Commitments',
      titulo: 'What CRAI guarantees about your data',
      itens: [
        {
          id: 'modelos',
          titulo: 'Your data doesn’t train our models',
          texto: 'CRAI’s models are trained on synthetic data. No client data, or statistics derived from it, goes into a shared model.',
        },
        {
          id: 'isolamento',
          titulo: 'Each company isolated',
          texto: 'Each company’s data is kept separate in the database itself. No client can see another client’s data.',
        },
        {
          id: 'pix',
          titulo: 'Pix key encrypted and kept away from AI',
          texto: 'Payment data is stored encrypted, and the Pix key is never sent to artificial intelligence models.',
        },
        {
          id: 'regras',
          titulo: 'AI writes, rules bill',
          texto: 'Charge amount and date follow fixed rules and the subscriber’s Pix Automático authorization. The language model only writes the text.',
        },
        {
          id: 'cookies',
          titulo: 'No cookies, no tracking',
          texto: 'The website uses no cookies and no advertising or audience analytics tools. Only the storage needed for sign-in, language and theme.',
        },
        {
          id: 'cancelamento',
          titulo: 'Canceling is always free',
          texto: 'The retention offer appears only once per cycle, and the subscriber’s decision takes effect immediately, under Decree 11,034/2022.',
        },
      ],
    },
    assinantes: {
      titulo: 'Got a message from CRAI?',
      itens: [
        {
          pergunta: 'Why did I get a message from CRAI?',
          resposta:
            'The company you subscribe to uses CRAI to let you know about a Pix Automático payment that did not go through. The message is sent on behalf of that company, which appears as creditor and sender.',
        },
        {
          pergunta: 'Was it written by a person?',
          resposta:
            'No. The contact is automated, and every message says so. CRAI does not negotiate debts or offer conditions other than those authorized by the company.',
        },
        {
          pergunta: 'How do I stop receiving messages?',
          resposta: 'Just say you don’t want to receive them anymore. Contact through that channel ends right away.',
        },
        {
          pergunta: 'I want to cancel my subscription. Can CRAI stop me?',
          resposta:
            'No. CRAI never blocks, delays or conditions a cancellation. If there is an offer for you to stay, it appears only once, and your decision takes effect immediately.',
        },
        {
          pergunta: 'What data about me does CRAI receive?',
          resposta:
            'Only what is needed: the identifier the company uses for you, subscription and billing data, and your contact phone or email. On the Premium plan, also usage signals from the service. The full list is in the [Privacy Policy](/privacidade#assinantes).',
        },
        {
          pergunta: 'How do I exercise my rights over this data?',
          resposta:
            'Contact the company you subscribe to first, since it is the controller of your data. If you write to CRAI, we forward your request to them within 7 days and let you know.',
        },
        {
          pergunta: 'Can I ask for a review of an automated decision?',
          resposta:
            'Yes, under LGPD art. 20. CRAI logs every decision with an explanation of the criteria, in Portuguese, so the company can answer you.',
        },
      ],
    },
    agente: {
      eyebrow: 'Transparency',
      titulo: 'How the agent decides',
      lead: 'Actions are decided and carried out by an automated system, without human intervention. These are the criteria it considers and the limits it never crosses.',
      colunas: [
        {
          titulo: 'In payment recovery',
          itens: [
            'Decline reason',
            'Payment history',
            'Number of recent failures',
            'Average charge amount',
            'Subscription age',
            'Day and time of the charge',
          ],
        },
        {
          titulo: 'In retention (Premium plan)',
          itens: ['Type of usage event', 'Days since last access', 'Features used in the last 30 days', 'Subscription amount'],
        },
      ],
      limitesTitulo: 'Limits the agent never crosses',
      limites: [
        'At most 3 new billing attempts, within 7 days of the first failure, under Central Bank rules.',
        'Every message says it is automated, with no embarrassment and no contact with third parties.',
        'The language model does not set amounts, deadlines or payment terms.',
        'Every decision is logged with an explanation of the criteria, including when the agent decides not to act.',
      ],
    },
    seguranca: {
      eyebrow: 'Security',
      titulo: 'How data is protected',
      itens: [
        { titulo: 'Encryption in transit', texto: 'All communication with the website and the platform goes over HTTPS.' },
        { titulo: 'Encrypted payment data', texto: 'Payment data, such as the Pix key, is stored encrypted.' },
        { titulo: 'Passwords as hashes only', texto: 'No password is stored in readable form, not even for the CRAI team.' },
        {
          titulo: 'Isolation in the database',
          texto: 'Access rules are enforced by the database itself, row by row, not just by the screen. Without sign-in, nothing can be read.',
        },
        {
          titulo: 'Role-based access',
          texto: 'Owner, admin and member, each with its own permissions. Plan, status and CNPJ can only be changed by CRAI’s server.',
        },
        { titulo: 'Verified integrations', texto: 'CRAI verifies the authenticity of integrations before accepting the data they send.' },
      ],
      incidente: {
        titulo: 'If there is an incident',
        texto:
          'CRAI notifies the ANPD and the affected data subjects, under LGPD art. 48. When the incident involves subscriber data, the controlling company is notified immediately.',
      },
    },
    suboperadores: {
      eyebrow: 'Subprocessors',
      titulo: 'Who processes data with us',
      lead: 'CRAI does not sell data. These providers process data on CRAI’s behalf, receive only what is needed and are contractually bound to protect it.',
      colunas: ['Provider', 'Purpose', 'Where'],
      linhas: [
        ['Supabase', 'Database, authentication, running the platform and access emails', 'United States'],
        ['Anthropic', 'Writing the text of messages', 'United States'],
        ['Pagar.me', 'New Pix Automático billing attempts and billing of CRAI’s fee', 'Brazil'],
        ['Meta (WhatsApp Business)', 'Sending messages to subscribers', 'Outside Brazil'],
        ['Segment', 'Collecting usage events, Premium plan only', 'United States'],
      ],
      nota: 'Transfers outside Brazil follow LGPD art. 33 and ANPD Resolution CD/ANPD No. 19/2024, with data protection contractual clauses. The official, up-to-date list is in the [Privacy Policy](/privacidade#compartilhamento).',
    },
    retencao: {
      eyebrow: 'Retention',
      titulo: 'How long we keep data',
      itens: [
        { prazo: '+6 months', dado: 'Subscriber data sent by the company, counted from the end of the contract' },
        { prazo: '90 days', dado: 'Cancellation reason provided by the company' },
        { prazo: '24 months', dado: 'History of recovery and retention actions, then anonymized' },
        { prazo: '5 years', dado: 'Log of automated decisions, to answer review requests' },
      ],
      nota: 'Once these periods end, data is deleted or anonymized. The full table is in the [Privacy Policy](/privacidade#retencao).',
    },
    encarregado: {
      eyebrow: 'Data protection officer',
      titulo: 'Talk to the person responsible for data',
      texto: 'Channel for requests, questions and complaints about personal data. CRAI replies within 15 days.',
      pessoas: [
        { papel: 'Data protection officer', nome: 'João Vitor Gava Pinheiro' },
        { papel: 'Deputy', nome: 'Gabriel de Frias Ramirez' },
      ],
      email: EMAIL_CONTATO,
      escrever: 'Email the data protection officer',
      anpd: 'You may also file a complaint with Brazil’s National Data Protection Authority (ANPD).',
    },
    documentos: {
      eyebrow: 'Documents',
      titulo: 'Read them in full',
      itens: [
        {
          titulo: 'Privacy Policy',
          texto: 'What data we process, why, on which legal basis, with whom, for how long, and your rights.',
          versao: `Version ${VERSAO_DOCS} · ${VIGENCIA_DOCS.en}`,
          para: '/privacidade',
          acao: 'Read document',
        },
        {
          titulo: 'Terms of Use',
          texto: 'The rules for the platform, the agent and the relationship between CRAI and your company.',
          versao: `Version ${VERSAO_DOCS} · ${VIGENCIA_DOCS.en}`,
          para: '/termos',
          acao: 'Read document',
        },
        {
          titulo: 'Data Processing Agreement',
          texto: 'An annex to each client’s contract, with the processing instructions and CRAI’s obligations as processor.',
          versao: 'Sent with the contract',
          para: '/contato',
          acao: 'Ask the team',
        },
      ],
    },
  },
}
