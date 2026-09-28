// Todo o copy visível do site, em pt-BR. Componentes não carregam strings de texto próprias.
// `conteudo.en.ts` é tipado como `Conteudo`: chave faltando em inglês quebra o build.

import { privacidadePt, termosPt } from './legal.pt'

export const conteudoPt = {
  idioma: {
    grupoAria: 'Idioma',
    opcoes: [
      { id: 'pt', rotulo: 'PT', nome: 'Português' },
      { id: 'en', rotulo: 'EN', nome: 'English' },
    ],
  },

  // <title> (até 60 caracteres) e meta description (120 a 160) de cada página. Chaves em src/lib/site.ts.
  seo: {
    home: {
      titulo: 'CRAI — Recuperação de receita e retenção para SaaS',
      descricao:
        'A CRAI recupera cobranças falhas por Pix Automático e ajuda a reter assinantes de SaaS brasileiros. Você só paga sobre a receita que volta.',
    },
    produto: {
      titulo: 'Como a CRAI funciona | CRAI',
      descricao:
        'Veja como a CRAI detecta cobranças falhas e riscos de cancelamento, age por Pix Automático e mede o resultado contra um grupo de controle.',
    },
    planos: {
      titulo: 'Planos e simulador | CRAI',
      descricao:
        'Compare os planos Standard e Premium e simule, com o MRR da sua empresa, quanto da receita perdida por churn a CRAI pode recuperar.',
    },
    painel: {
      titulo: 'Painel (demo) | CRAI',
      descricao:
        'Painel da CRAI com receita recuperada, cobranças em andamento e indicadores de churn da sua base de assinantes, em versão de demonstração.',
    },
    cadastro: {
      titulo: 'Criar conta | CRAI',
      descricao:
        'Crie a conta da sua empresa na CRAI em cerca de dois minutos: dados da empresa, responsável pela conta e cobrança por Pix Automático.',
    },
    pagamento: {
      titulo: 'Autorização de cobrança | CRAI',
      descricao:
        'Autorize a cobrança da CRAI por Pix Automático. Na versão beta nenhum pagamento é processado e a autorização serve apenas para demonstração.',
    },
    confirmacao: {
      titulo: 'Autorização registrada | CRAI',
      descricao:
        'Autorização de cobrança registrada. Acesse o painel da CRAI para acompanhar a receita recuperada e os indicadores de churn da sua empresa.',
    },
    empresa: {
      titulo: 'Sobre a CRAI | CRAI',
      descricao:
        'Conheça a CRAI: o propósito, a forma de operar e o time por trás da plataforma de recuperação e retenção de receita para SaaS brasileiros.',
    },
    contato: {
      titulo: 'Contato | CRAI',
      descricao:
        'Fale com o time da CRAI sobre planos, medição de resultado, integração de dados ou qualquer dúvida sobre recuperação de receita para SaaS.',
    },
    entrar: {
      titulo: 'Entrar | CRAI',
      descricao:
        'Acesse a conta da sua empresa na CRAI para acompanhar a receita recuperada, as cobranças em andamento e os indicadores de churn e retenção.',
    },
    redefinirSenha: {
      titulo: 'Nova senha | CRAI',
      descricao:
        'Defina uma nova senha para a conta da sua empresa na CRAI. O link de redefinição chega no e-mail cadastrado e vale por tempo limitado.',
    },
    privacidade: {
      titulo: 'Política de Privacidade | CRAI',
      descricao:
        'Como a CRAI coleta, usa, protege e compartilha dados pessoais de visitantes, usuários e clientes, conforme a LGPD e o Marco Civil da Internet.',
    },
    termos: {
      titulo: 'Termos de Uso | CRAI',
      descricao:
        'Regras de uso do site e da plataforma CRAI: conta, responsabilidades, dados enviados, propriedade intelectual e limitações de responsabilidade.',
    },
    naoEncontrada: {
      titulo: 'Página não encontrada | CRAI',
      descricao:
        'O endereço procurado não existe ou foi movido. Volte ao início do site da CRAI ou simule quanto da sua receita perdida por churn pode voltar.',
    },
  },

  site: {
    marca: 'CRAI',
    pularConteudo: 'Pular para o conteúdo',
    inicioAria: 'CRAI, página inicial',
    navAria: 'Navegação principal',
    nav: [
      { rotulo: 'Produto', para: '/produto' },
      { rotulo: 'Planos', para: '/planos' },
      { rotulo: 'Painel', para: '/painel' },
      { rotulo: 'Empresa', para: '/empresa' },
      { rotulo: 'Contato', para: '/contato' },
    ],
    criarConta: 'Criar conta',
    entrar: 'Entrar',
    sair: 'Sair',
    abrirMenu: 'Abrir menu',
    fecharMenu: 'Fechar menu',
    rodape: {
      descricao:
        'Software B2B que recupera parte da receita que empresas de SaaS perdem por churn e mostra o resultado em um painel.',
      navAria: 'Links do rodapé',
      colunas: [
        {
          titulo: 'Produto',
          links: [
            { rotulo: 'Como funciona', para: '/produto' },
            { rotulo: 'Planos e simulador', para: '/planos' },
            { rotulo: 'Painel (demo)', para: '/painel' },
          ],
        },
        {
          titulo: 'Empresa',
          links: [
            { rotulo: 'Sobre a CRAI', para: '/empresa' },
            { rotulo: 'Contato', para: '/contato' },
            { rotulo: 'Criar conta', para: '/cadastro' },
          ],
        },
        {
          titulo: 'Legal',
          links: [
            { rotulo: 'Política de Privacidade', para: '/privacidade' },
            { rotulo: 'Termos de Uso', para: '/termos' },
          ],
        },
      ],
      aviso: 'Versão beta — nenhum pagamento é processado.',
      lgpd: 'Dados tratados conforme a LGPD, com coleta mínima e finalidade declarada.',
      legal: '© 2026 CRAI. Versão beta.',
      marca: 'Recuperação e retenção de receita para SaaS brasileiro, cobrada só pelo que volta.',
    },
  },

  home: {
    hero: {
      selo: { tag: 'Beta', texto: 'Testes com clientes em outubro e novembro de 2026' },
      titulo: 'A receita que você já conquistou, de volta ao caixa',
      destaque: 'de volta ao caixa',
      subtitulo:
        'Agentes de IA recuperam cobranças que falharam por Pix Automático e agem antes do cancelamento. Você acompanha tudo em um painel e só paga sobre o ganho que a CRAI comprova.',
      acaoPrimaria: { rotulo: 'Fazer o diagnóstico grátis', para: '/planos#simulador' },
      acaoSecundaria: { rotulo: 'Ver como funciona', para: '/produto' },
      apoio: 'Sem mensalidade. Sem taxa de implantação. Sem CRM para você manter.',
      fatos: ['Sem mensalidade', 'Pix Automático', 'Medido contra grupo de controle'],
      rolar: 'Role',
      mockup: {
        aria: 'Ilustração do painel da CRAI com dados de exemplo de um SaaS com R$ 50 mil de MRR',
        janela: 'painel.crai',
        titulo: 'Resultado do mês',
        etiqueta: 'Dados ilustrativos',
        status: 'Agentes ativos',
        kpis: [
          { rotulo: 'Receita em risco', valor: 5000, nota: '10% de R$ 50 mil de MRR' },
          { rotulo: 'Ganho incremental', valor: 1000, nota: 'acima do grupo de controle' },
          { rotulo: 'Fica com você', valor: 750, nota: 'depois da taxa de 25%' },
        ],
        grafico: 'Recuperação acumulada no mês',
        tratado: 'Com a CRAI',
        controle: 'Grupo de controle',
        eventosTitulo: 'Atividade dos agentes',
        eventos: [
          { tipo: 'ok', texto: 'Pix Automático recuperado', valor: 'R$ 100,00' },
          { tipo: 'agenda', texto: 'Nova tentativa na janela de liquidez', valor: 'dia 05' },
          { tipo: 'risco', texto: 'Sinal de risco: queda de uso', valor: 'score 0,82' },
          { tipo: 'msg', texto: 'Oferta de retenção enviada', valor: 'WhatsApp' },
          { tipo: 'ok', texto: 'Pix Automático recuperado', valor: 'R$ 100,00' },
          { tipo: 'saida', texto: 'Cancelamento respeitado, sem atrito', valor: 'Decreto 11.034' },
        ],
      },
      grafico: {
        titulo: 'Gráfico ilustrativo do faturamento recorrente',
        descricao:
          'O faturamento cai quando cobranças falham. A linha laranja mostra a parte recuperada, que sobe mas não volta ao patamar anterior.',
        rotulos: {
          faturamento: 'Faturamento recorrente',
          falha: 'Cobranças falham',
          recuperado: 'Parte recuperada',
        },
      },
    },
    escapa: {
      titulo: 'Onde o dinheiro escapa',
      trilhoAria: 'Três formas de perder receita recorrente',
      blocos: [
        {
          id: 'falha',
          titulo: 'Cobrança falha',
          texto:
            'Cerca de 10% do faturamento recorrente tropeça em saldo, limite ou erro de débito. O assinante não quis sair; o pagamento é que não passou.',
        },
        {
          id: 'cega',
          titulo: 'Tentativa cega',
          texto:
            'A retentativa padrão acontece em horário fixo, sem olhar quando a conta do assinante tem saldo. Boa parte falha de novo pelo mesmo motivo.',
        },
        {
          id: 'cancelamento',
          titulo: 'Cancelamento',
          texto:
            'Quem decide sair leva junto meses de receita futura. O aviso costuma aparecer tarde demais para qualquer conversa.',
        },
      ],
    },
    comoFunciona: {
      titulo: 'Como a CRAI trabalha',
      ilustracaoTitulo: 'Etapas do trabalho da CRAI',
      passos: [
        {
          numero: '01',
          titulo: 'Conecta',
          texto: 'A base de assinantes e o histórico de cobrança entram por importação de arquivo ou integração.',
          estado: 'Base de assinantes e histórico de cobrança',
        },
        {
          numero: '02',
          titulo: 'Prevê',
          texto: 'Os modelos estimam risco de queda e a janela provável de liquidez de cada assinante.',
          estado: 'Risco de queda e janela de liquidez por assinante',
        },
        {
          numero: '03',
          titulo: 'Age',
          texto:
            'A cobrança é reagendada para a janela estimada e a comunicação sai pelo canal certo, no tom certo.',
          estado: 'Nova tentativa na janela estimada',
        },
        {
          numero: '04',
          titulo: 'Mede',
          texto:
            'Um grupo de controle fica de fora da ação. A diferença entre os dois grupos é o ganho incremental — e é só sobre ele que a CRAI cobra.',
          estado: 'Grupo de controle comparado ao grupo tratado',
        },
      ],
    },
    modelo: {
      titulo: 'Você paga depois de receber',
      texto:
        'A CRAI não cobra mensalidade nem implantação. No Standard, 25% sobre o ganho incremental da recuperação. No Premium, isso continua valendo e entram mais 20% sobre a receita preservada na retenção, por seis meses. Se um pagamento for estornado em até 90 dias, a taxa volta.',
      link: { rotulo: 'Ver os planos', para: '/planos' },
      extratoTitulo: 'O que entra na conta',
      extrato: [
        { rotulo: 'Mensalidade', valor: 'Não há' },
        { rotulo: 'Implantação', valor: 'Não há' },
        { rotulo: 'Standard', valor: '25% do ganho incremental' },
        { rotulo: 'Premium', valor: '+ 20% da receita preservada' },
        { rotulo: 'Estorno em até 90 dias', valor: 'Taxa devolvida' },
      ],
    },
    naoFaz: {
      titulo: 'O que a CRAI não faz',
      itens: [
        {
          titulo: 'Não somos gateway de pagamento.',
          texto: 'A cobrança continua no seu arranjo atual; a CRAI atua sobre ela.',
        },
        {
          titulo: 'Não temos CRM próprio.',
          texto: 'Você acompanha resultado no painel, sem mais um sistema para alimentar.',
        },
        {
          titulo: 'Não seguramos ninguém.',
          texto: 'O agente de retenção nunca dificulta, obstrui ou atrasa um cancelamento. Decreto 11.034/2022.',
        },
      ],
    },
    fechamento: {
      titulo: 'Comece pelo simulador',
      texto: 'Coloque seu MRR e veja quanto da sua receita em risco entra na conta.',
      acao: { rotulo: 'Abrir o simulador', para: '/planos#simulador' },
    },
    marquee: {
      aria: 'O que a CRAI cobre',
      itens: [
        'Pix Automático',
        'Inferência de liquidez',
        'Churn involuntário',
        'Churn voluntário',
        'Grupo de controle',
        'WhatsApp, e-mail e SMS',
        'LGPD',
        'Sem mensalidade',
        'Sem implantação',
        'Cancelamento sem atrito',
      ],
    },
    numeros: {
      eyebrow: 'O problema',
      titulo: 'Onde o dinheiro escapa',
      lead: 'A perda por falha de cobrança quase nunca aparece como um evento único no resultado. Parte dela ainda é contada como cancelamento voluntário. Por isso passa despercebida.',
      stats: [
        {
          de: 9,
          ate: 0,
          tipo: 'pct',
          texto: 'da receita recorrente mensal se perde, em média, só com falhas de pagamento',
          fonte: 'Baremetrics',
        },
        {
          de: 25,
          ate: 40,
          tipo: 'pct',
          texto: 'do que as empresas registram como cancelamento é, na verdade, churn involuntário',
          fonte: 'Freemius',
        },
        {
          de: 45,
          ate: 70,
          tipo: 'pct',
          texto: 'dos pagamentos que falham podem ser recuperados com retentativa inteligente (dados de cartão)',
          fonte: 'Baremetrics e Freemius',
        },
        {
          de: 45,
          ate: 0,
          tipo: 'milBrl',
          texto: 'por mês escapam de um SaaS com R$ 500 mil de MRR sem que ninguém tenha decidido cancelar',
          fonte: 'Cálculo da CRAI sobre a média de 9%',
        },
      ],
    },
    capitulos: {
      eyebrow: 'Como funciona',
      titulo: 'Dois agentes, um painel',
      lead: 'Cada agente cuida de um tipo de perda, do início ao fim. Nenhum caso é escalado para a sua equipe.',
      itens: [
        {
          numero: '01',
          rotulo: 'Recuperação · churn involuntário',
          titulo: 'A cobrança falhou. O agente age no dia certo.',
          texto:
            'Um webhook avisa a falha no instante em que ela acontece. O agente avalia a chance e o custo de recuperar, estima quando aquele pagador terá saldo e concentra a nova tentativa por Pix Automático nessa janela, dentro das regras do Banco Central.',
          passos: ['Webhook', 'Diagnóstico', 'Liquidez', 'Pix Automático', 'Multicanal'],
        },
        {
          numero: '02',
          rotulo: 'Retenção · churn voluntário',
          titulo: 'O cliente esfriou. O agente percebe antes.',
          texto:
            'Queda de uso, visita à página de cancelamento ou downgrade viram um score de risco, pesado pelo valor do cliente. O agente escolhe uma oferta proporcional ao que está em jogo e conversa pelo canal certo, sem nunca dificultar a saída.',
          passos: ['Sinal', 'Score de risco', 'Oferta', 'Conversa'],
        },
        {
          numero: '03',
          rotulo: 'Painel · resultado comprovado',
          titulo: 'Você vê o que voltou, conta por conta.',
          texto:
            'O painel mostra quanto foi recuperado e quanto foi retido, com o registro de cada conta trabalhada. Tudo medido contra um grupo de controle da sua própria base: a diferença entre os dois é o que a CRAI cobra.',
          passos: ['Tratado', 'Controle', 'Ganho incremental'],
        },
      ],
      visual: {
        aria: 'Ilustração animada da etapa',
        risco: 'Score de risco',
        riscoAlto: 'alto',
        oferta: 'Oferta proporcional ao valor do cliente',
        sinais: ['Queda de uso', 'Visita à página de cancelamento', 'Downgrade de plano'],
        falha: 'Cobrança falhou',
        recuperado: 'Pagamento recuperado',
        tratado: 'Tratado',
        controle: 'Controle',
        ganho: 'Ganho incremental',
      },
    },
    contraste: {
      eyebrow: 'Inferência de liquidez',
      titulo: 'Tentar de novo não é o mesmo que tentar na hora certa',
      lead: 'A régua fixa repete a cobrança em intervalos definidos. A CRAI estima quando aquele pagador terá saldo e concentra a tentativa nesse momento.',
      fixa: {
        rotulo: 'Régua fixa',
        titulo: 'Mesmo intervalo para todo mundo',
        texto: 'Cada tentativa cai num dia em que a conta ainda não tem saldo. Falha de novo, pelo mesmo motivo.',
      },
      crai: {
        rotulo: 'CRAI',
        titulo: 'Uma tentativa na janela certa',
        texto: 'O modelo estima a data provável de saldo daquele pagador. A cobrança vai para lá.',
      },
      janela: 'Janela de liquidez estimada',
      dia: 'Dia',
      nota: 'Ilustração. Entre as 19 soluções de recuperação e retenção mapeadas pela CRAI, nenhuma oferece inferência de liquidez.',
    },
    preco: {
      eyebrow: 'Preço',
      titulo: 'R$ 0 para começar. Você paga depois de receber.',
      lead: 'Sem mensalidade, sem implantação, sem valor por assinante. A CRAI só é remunerada quando produz ganho, e na proporção dele.',
      planos: [
        {
          nome: 'Standard',
          prefixo: '',
          taxa: 25,
          unidade: 'do ganho incremental',
          resumo: 'Recuperação de cobranças que falharam.',
          itens: ['Churn involuntário', 'Inferência de liquidez', 'Pix Automático', 'Comunicação multicanal', 'Painel de resultado'],
          selo: '',
        },
        {
          nome: 'Premium',
          prefixo: '+',
          taxa: 20,
          unidade: 'da receita preservada',
          resumo: 'Tudo do Standard, somado à retenção.',
          itens: ['Tudo do Standard, com os 25%', 'Churn voluntário', 'Score de risco e ofertas', 'Janela de 6 meses por retenção', 'Integração por SDK'],
          selo: 'Mais completo',
        },
      ],
      exemplo: {
        titulo: 'Exemplo: SaaS com R$ 50 mil de MRR',
        linhas: [
          { rotulo: 'Standard', valor: 250 },
          { rotulo: 'Premium', valor: 700 },
        ],
        porMes: '/mês',
        nota: 'Empresa de referência do modelo financeiro da CRAI: 500 assinantes, ticket médio de R$ 100.',
      },
      garantia: 'Pagamento recuperado estornado em até 90 dias? A taxa volta.',
      acao: { rotulo: 'Ver planos e simulador', para: '/planos' },
    },
    parceiros: {
      eyebrow: 'Validação',
      titulo: 'Decisões validadas com quem opera o mercado',
      lead: 'Três profissionais acompanham o projeto e validam as decisões de produto e de operação.',
      pessoas: [
        { nome: 'Waldir Augusto Gunther', papel: 'Fundador e head', empresa: 'Casa do Cliente', area: 'Relacionamento com o cliente' },
        { nome: 'Leo Gmeiner', papel: 'Fundador e CEO', empresa: 'School Guardian', area: 'Gestão de plataformas SaaS' },
        { nome: 'Wallace Barbosa', papel: 'Head de pagamentos', empresa: 'iFood', area: 'Pagamentos' },
      ],
    },
    roadmap: {
      eyebrow: 'Roadmap',
      titulo: 'Onde a CRAI está agora',
      agora: 'Agora',
      etapas: [
        { quando: 'Mar 2026', titulo: 'Pesquisa', texto: 'Estudo sobre churn em SaaS brasileiro e definição da ideia.', estado: 'feito' },
        { quando: 'Set 2026', titulo: 'MVP', texto: 'Agentes, modelos e painel em construção.', estado: 'agora' },
        { quando: 'Out–Nov 2026', titulo: 'Testes com clientes', texto: 'Primeiros clientes medindo o ganho incremental.', estado: 'depois' },
        { quando: 'Início de 2027', titulo: 'Lançamento comercial', texto: 'Operação com os planos Standard e Premium.', estado: 'depois' },
        { quando: 'Fim de 2027–2028', titulo: 'Mais integrações', texto: 'Ampliação das integrações. Cartão de crédito está no roadmap.', estado: 'depois' },
        { quando: '2031', titulo: 'Referência no Brasil', texto: 'Expansão de alcance a partir da base construída.', estado: 'depois' },
      ],
    },
    faq: {
      titulo: 'Perguntas frequentes',
      itens: [
        {
          pergunta: 'Quanto custa para começar?',
          resposta:
            'Nada. Não há mensalidade, taxa de implantação nem cobrança por assinante. A CRAI cobra só um percentual do ganho que comprova: 25% na recuperação e, no Premium, mais 20% sobre a receita preservada pela retenção.',
        },
        {
          pergunta: 'Como vocês provam o ganho incremental?',
          resposta:
            'Uma parte dos assinantes fica em um grupo de controle, fora da ação da CRAI. Comparamos o resultado dos dois grupos, e a diferença é o ganho incremental. A memória de cálculo de cada apuração fica no painel.',
        },
        {
          pergunta: 'Preciso trocar meu gateway?',
          resposta: 'Não. A CRAI não é gateway de pagamento. A cobrança continua no seu arranjo atual e a CRAI atua sobre ela.',
        },
        {
          pergunta: 'Minha equipe precisa acompanhar cada caso?',
          resposta:
            'Não. Os agentes decidem e executam sem escalar para atendimento humano. Sua equipe acompanha o resultado no painel.',
        },
        {
          pergunta: 'Como vocês tratam os dados dos meus assinantes?',
          resposta:
            'Conforme a LGPD, com coleta mínima: só entra no sistema o dado estritamente necessário para a decisão do agente.',
        },
        {
          pergunta: 'Quando posso usar?',
          resposta:
            'A CRAI está construindo o MVP. Os testes com clientes estão previstos para outubro e novembro de 2026 e o lançamento comercial para o início de 2027. Este site é uma versão beta.',
        },
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico gratuito',
      titulo: 'Quanto da sua receita está escapando?',
      texto:
        'Informe o MRR e veja quanto está em risco por falha de cobrança e quanto disso pode voltar. Sem cadastro e sem compromisso.',
      acaoPrimaria: { rotulo: 'Fazer o diagnóstico', para: '/planos#simulador' },
      acaoSecundaria: { rotulo: 'Falar com o time', para: '/contato' },
    },
  },

  produto: {
    indice: {
      aria: 'Seções desta página',
      itens: [
        { id: 'recuperacao', rotulo: 'Recuperação' },
        { id: 'liquidez', rotulo: 'Liquidez' },
        { id: 'retencao', rotulo: 'Retenção' },
        { id: 'medicao', rotulo: 'Medição' },
        { id: 'painel', rotulo: 'Painel' },
        { id: 'dados', rotulo: 'Dados' },
      ],
    },
    titulo: 'Como a CRAI funciona por dentro',
    lead: 'Recuperação de cobranças, inferência de liquidez, retenção sem fricção e uma medição que separa o que a CRAI fez do que aconteceria de qualquer jeito.',
    recuperacao: {
      titulo: 'Recuperação de cobranças que falharam',
      paragrafos: [
        'Quando uma cobrança por Pix Automático não passa, a CRAI classifica o motivo da falha, estima a próxima janela de liquidez do assinante e agenda uma nova tentativa para ela.',
        'A decisão é tomada por assinante, com base no histórico dele, e não por uma regra fixa aplicada à base inteira. Se a nova tentativa não confirma, o caso segue por outra rota.',
      ],
      fluxo: {
        titulo: 'Fluxo de recuperação de uma cobrança que falhou',
        descricao:
          'Cobrança falha, classificação do motivo, janela de liquidez estimada, nova tentativa por Pix Automático e, por fim, confirmação ou nova rota.',
        etapas: [
          {
            n: '01',
            titulo: 'Cobrança falha',
            texto: 'O Pix Automático não é liquidado e a receita entra em risco.',
          },
          {
            n: '02',
            titulo: 'Classificação do motivo',
            texto: 'Saldo, limite, autorização ou erro técnico — cada um pede outra resposta.',
          },
          {
            n: '03',
            titulo: 'Janela de liquidez estimada',
            texto: 'O histórico do assinante aponta quando a conta deve ter saldo.',
          },
          {
            n: '04',
            titulo: 'Nova tentativa por Pix Automático',
            texto: 'A cobrança volta na janela estimada, não em horário fixo.',
          },
        ],
        ciclo: {
          rotulo: 'Ciclo',
          texto: 'Nova rota: se não confirma, reprocessa até encontrar a melhor janela.',
        },
        resultado: {
          rotulo: 'Resultado',
          titulo: 'Confirmação',
          texto: 'A cobrança é liquidada e a assinatura segue ativa, sem passar por cobrança manual.',
          selo: 'Receita recuperada',
        },
      },
      morph: {
        titulo: 'Ícone de fatura que falhou se transformando em pagamento confirmado',
        antes: 'Cobrança falhou',
        depois: 'Pagamento confirmado',
      },
    },
    liquidez: {
      titulo: 'Inferência de liquidez',
      badge: 'incluído no Standard',
      texto:
        'O sistema aprende o ciclo de entrada de dinheiro de cada assinante e tenta cobrar quando a conta tem saldo, em vez de repetir a mesma tentativa no mesmo horário.',
      nota: 'Faz parte do Standard. É o que diferencia o plano de entrada de uma retentativa comum.',
      ilustracao: {
        titulo: 'Saldo estimado da conta de um assinante ao longo do mês',
        descricao:
          'O saldo é baixo no início do mês, quando acontece a tentativa em horário fixo, e sobe por volta do dia 10, que é a janela estimada pela CRAI.',
        dias: ['Dia 1', 'Dia 5', 'Dia 10', 'Dia 15', 'Dia 20', 'Dia 25', 'Dia 30'],
        fixa: 'Tentativa em horário fixo',
        janela: 'Janela estimada',
        saldo: 'Saldo estimado',
      },
    },
    retencao: {
      titulo: 'Retenção de quem quer sair',
      texto:
        'No Premium, a CRAI observa sinais de risco antes do pedido de cancelamento e sugere uma ação para cada assinante. A ação é oferta e conversa, nunca fricção.',
      sinaisTitulo: 'Sinais observados',
      sinais: [
        'Queda de uso ao longo das semanas',
        'Falhas de cobrança repetidas',
        'Mudança no padrão de acesso',
        'Visitas à página de cancelamento',
      ],
      acoesTitulo: 'Ações possíveis',
      acoes: ['Uma oferta que faça sentido para o uso atual', 'Uma pausa no lugar do cancelamento', 'Uma conversa com o seu time'],
      compromisso: {
        titulo: 'Quem quer sair, sai',
        texto:
          'O agente de retenção nunca dificulta, obstrui ou atrasa um cancelamento, conforme o Decreto 11.034/2022. O caminho de cancelamento continua o mesmo de sempre.',
      },
    },
    medicao: {
      titulo: 'Medição contra grupo de controle',
      texto: 'Você só paga pelo que a CRAI recuperou além do que a sua empresa recuperaria sozinha.',
      passos: [
        {
          titulo: 'Uma parte fica de fora',
          texto: 'Um grupo dos assinantes com cobrança falha não recebe a ação da CRAI e segue só com as retentativas obrigatórias.',
        },
        {
          titulo: 'A CRAI age no restante',
          texto: 'O outro grupo recebe reagendamento e comunicação no melhor momento para pagar.',
        },
        {
          titulo: 'A diferença é apurada todo mês',
          texto: 'O que o grupo tratado recuperou acima do controle é o ganho incremental, e aparece no painel.',
        },
      ],
      legenda: 'A CRAI só cobra do que passa da linha.',
      exemplo: {
        titulo: 'Um mês do cliente de referência',
        emRisco: '{valor} em cobranças que falharam',
        controle: 'Grupo de controle',
        tratado: 'Grupo tratado pela CRAI',
        recuperado: '{pct} recuperado, {valor}',
        ganhoChave: '+ {valor} de ganho incremental',
        legendaLinha: 'O que o grupo de controle recuperou sozinho',
        legendaBase: 'Base da taxa da CRAI',
        contaGanho: 'Ganho incremental',
        contaTaxa: 'Taxa da CRAI ({pct})',
        contaFica: 'Fica com você',
        nota: 'Exemplo ilustrativo com o cliente de referência do modelo: MRR de R$ 50 mil e 10% das cobranças falhando. O resultado real é apurado contra o grupo de controle da sua base.',
      },
    },
    painel: {
      titulo: 'O painel',
      texto:
        'Receita em risco, receita recuperada, ganho incremental e a taxa do período, com o detalhe de cada cobrança. Você acompanha o resultado sem alimentar mais um sistema.',
      link: { rotulo: 'Abrir a demonstração do painel', para: '/painel' },
      prints: {
        indicador: 'Ganho incremental',
        indicadorDetalhe: 'Últimos 30 dias, acima do grupo de controle',
        grafico: 'Controle × tratado',
        tabela: 'Cobranças recentes',
      },
    },
    dados: {
      titulo: 'Dados e limites',
      itens: [
        {
          id: 'entrada',
          titulo: 'Como os dados entram',
          texto: 'Importação por CSV ou planilha, ou integração com o sistema que você já usa.',
        },
        {
          id: 'lgpd',
          titulo: 'LGPD',
          texto: 'Tratamento mínimo de dados, com finalidade declarada: recuperar cobranças e reduzir cancelamentos.',
        },
        {
          id: 'cartao',
          titulo: 'Sem dado de cartão',
          texto: 'O produto opera por Pix Automático, então a CRAI não armazena dado de cartão.',
        },
        {
          id: 'gateway',
          titulo: 'Sem troca de gateway',
          texto: 'A cobrança continua no seu arranjo atual. A CRAI atua sobre ela, não no lugar dela.',
        },
      ],
    },
  },

  planosPagina: {
    titulo: 'Taxa de sucesso e mais nada',
    lead: 'Sem mensalidade e sem taxa de implantação. Você paga uma parte do que a CRAI recupera, medida contra grupo de controle.',
    selecionado: 'Selecionado',
    selecionarAria: 'Selecionar plano {plano}',
    nota: 'As duas taxas do Premium são somadas: 25% sobre o ganho incremental da recuperação e 20% sobre a receita preservada. Estorno em até 90 dias devolve a taxa correspondente.',
    faixa: 'A CRAI atende SaaS com MRR entre R$ 25 mil e R$ 500 mil.',
    faq: {
      titulo: 'Perguntas frequentes',
      itens: [
        {
          pergunta: 'Como vocês provam o ganho incremental?',
          resposta:
            'Uma parte dos assinantes com cobrança falha fica em um grupo de controle, fora da ação da CRAI. A apuração é mensal: comparamos a recuperação dos dois grupos, e a diferença é o ganho incremental. O relatório de cada apuração fica no painel.',
        },
        {
          pergunta: 'E se o cliente pedir estorno?',
          resposta:
            'Se um pagamento recuperado for estornado em até 90 dias, a taxa cobrada sobre ele é devolvida. Essa regra está no contrato como cláusula de clawback.',
        },
        {
          pergunta: 'Vocês aceitam cartão?',
          resposta: 'Hoje a operação é por Pix Automático. Cartão está no roadmap, mas ainda não faz parte do produto.',
        },
        {
          pergunta: 'Preciso trocar meu gateway?',
          resposta: 'Não. A CRAI não é gateway de pagamento. A cobrança continua no seu arranjo atual e a CRAI atua sobre ela.',
        },
        {
          pergunta: 'Vocês dificultam o cancelamento para segurar o cliente?',
          resposta:
            'Não. O agente de retenção nunca dificulta, obstrui ou atrasa um cancelamento, conforme o Decreto 11.034/2022. Além de ser a regra, segurar alguém à força só adia a saída e desgasta a relação com o cliente.',
        },
      ],
    },
  },

  // Texto dos planos. `src/data/planos.ts` monta os objetos PlanoInfo a partir daqui.
  planos: {
    standard: {
      nome: 'Standard',
      titulo: 'Recupere o que falhou',
      resumo: 'Recuperação de cobranças que falharam, cobrada só sobre o que ficou acima do grupo de controle.',
      valor: '25%',
      base: 'sobre o ganho incremental',
      detalhe: '',
      inclui: 'O que está incluído:',
      itens: [
        'Recuperação de cobranças que falharam',
        'Inferência de liquidez e reagendamento',
        'Comunicação multicanal com o assinante',
        'Medição com grupo de controle',
        'Painel de resultado',
      ],
      cta: 'Começar com Standard',
    },
    premium: {
      nome: 'Premium',
      titulo: 'Recupere e retenha',
      resumo: 'Recuperação de cobranças somada à retenção de quem sinaliza que vai sair.',
      valor: '45%',
      base: '',
      detalhe: '25% sobre o ganho incremental + 20% sobre a receita preservada',
      inclui: 'Tudo do Standard, e ainda:',
      itens: [
        'Sinais de risco de cancelamento',
        'Ação de retenção sem fricção no cancelamento',
        'Janela de apuração de 6 meses sobre a receita preservada',
        'Integração por SDK',
      ],
      cta: 'Começar com Premium',
    },
  },

  simuladorCopy: {
    titulo: 'Simulador de retorno',
    lead: 'Coloque seu MRR e veja quanto da sua receita em risco entra na conta.',
    mrrRotulo: 'MRR mensal, em reais',
    sliderRotulo: 'Ajustar MRR',
    planoRotulo: 'Plano',
    planos: [
      { value: 'standard', label: 'Standard' },
      { value: 'premium', label: 'Premium' },
    ],
    saidas: {
      risco: 'Receita em risco / mês',
      ganho: 'Ganho incremental estimado',
      taxa: 'Taxa da CRAI',
      fica: 'Fica com você',
    },
    preservada: 'mais {valor} de receita preservada',
    taxaDetalheStandard: '25% do ganho incremental',
    taxaDetalhePremium: '{rec} da recuperação + {ret} da retenção',
    premissas:
      'Estimativa baseada em premissas do modelo da CRAI (falha de 10%, ganho incremental de 20%). O resultado real é apurado contra grupo de controle.',
    foraDaFaixa: 'Fora da faixa que a CRAI atende hoje.',
    acao: { rotulo: 'Criar conta', para: '/cadastro' },
  },

  painel: {
    titulo: 'Painel',
    badge: 'beta',
    lead: 'Prévia navegável do painel do cliente, com dados fictícios de uma empresa de demonstração.',
    leadConta:
      'Painel da sua empresa, em beta. Os números abaixo ainda são de demonstração até a integração com a sua cobrança.',
    retencaoPremium: {
      titulo: 'A retenção faz parte do Premium',
      texto:
        'Seu plano atual é o Standard, focado em recuperar cobranças que falharam. A leitura de assinantes com risco de cancelamento entra no Premium.',
      acao: 'Ver os planos',
    },
    navAria: 'Seções do painel',
    abas: [
      { id: 'recuperacao', rotulo: 'Recuperação' },
      { id: 'retencao', rotulo: 'Retenção' },
    ],
    periodoAria: 'Período dos dados',
    periodos: { '30d': 'Últimos 30 dias', '90d': '90 dias', '12m': '12 meses' },
    carregando: 'Carregando dados do período',
    indicadores: {
      risco: 'Receita em risco',
      riscoDetalhe: 'Cobranças que falharam',
      recuperada: 'Receita recuperada',
      recuperadaDetalhe: 'Grupo tratado',
      ganho: 'Ganho incremental',
      ganhoDetalhe: 'Acima do grupo de controle',
      taxa: 'Taxa da CRAI no período',
      taxaDetalhe: 'Recuperação {rec} · Retenção {ret}',
      taxaDetalheStandard: '25% sobre o ganho incremental',
    },
    grafico: {
      titulo: 'Taxa de recuperação: controle × tratado',
      descricao: 'Percentual da receita em risco recuperada por cada grupo no período selecionado.',
      controle: 'Grupo de controle',
      tratado: 'Grupo tratado',
      ganho: 'Ganho incremental',
    },
    // Eixo do tempo: meses abreviados e semana numerada. Datas curtas saem de format.ts.
    meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    semana: 'Sem {n}',
    tabela: {
      titulo: 'Cobranças recentes',
      colunas: ['Assinante', 'Valor', 'Motivo da falha', 'Janela estimada', 'Status', 'Tentativa'],
      tentativa: '{n}ª',
      janela: 'Dia {dia} · {de}h–{ate}h',
      semJanela: '—',
    },
    motivos: {
      saldo: 'Saldo insuficiente',
      limite: 'Limite excedido',
      revogada: 'Autorização revogada',
      instituicao: 'Erro na instituição',
    },
    status: {
      recuperada: 'Recuperada',
      reagendada: 'Reagendada',
      tentativa: 'Em tentativa',
      controle: 'Grupo de controle',
      naoRecuperada: 'Não recuperada',
    },
    retencao: {
      titulo: 'Assinantes com risco de cancelamento',
      colunas: ['Assinante', 'Sinal de risco', 'Risco', 'Ação sugerida'],
      nota: 'Nenhuma ação sugerida bloqueia, dificulta ou atrasa um cancelamento (Decreto 11.034/2022).',
      riscos: { alto: 'Alto', medio: 'Médio' },
      planosAssinante: { clinica: 'Plano Clínica', rede: 'Plano Rede', essencial: 'Plano Essencial' },
      // Texto de cada linha do mock (mockPainel.ts), pela id da linha.
      casos: {
        'rc-1': { sinal: 'Uso caiu 48% nas últimas 4 semanas', acao: 'Contato do time de sucesso do cliente' },
        'rc-2': { sinal: 'Duas cobranças falharam em sequência', acao: 'Oferecer pausa de um mês' },
        'rc-3': { sinal: 'Pediu exportação completa dos dados', acao: 'Perguntar o motivo, sem oferta' },
        'rc-4': { sinal: 'Nenhum acesso do administrador há 21 dias', acao: 'Enviar resumo de uso do mês' },
        'rc-5': { sinal: 'Usuários ativos caíram de 12 para 5', acao: 'Sugerir plano menor' },
        'rc-6': { sinal: 'Chamado de suporte sem resposta há 6 dias', acao: 'Priorizar o chamado em aberto' },
        'rc-7': { sinal: 'Visitou a página de cancelamento', acao: 'Oferecer conversa com o time, se quiser' },
        'rc-8': { sinal: 'Recurso de agenda sem uso há 30 dias', acao: 'Oferecer treinamento para a equipe' },
      },
    },
  },

  cadastro: {
    titulo: 'Criar conta',
    lead: 'Preencha os dados da empresa e de quem vai administrar a conta. Leva cerca de dois minutos.',
    stepperAria: 'Etapas do cadastro',
    etapaDe: 'Etapa {n} de {total}',
    etapas: ['Empresa', 'Responsável', 'Operação'],
    empresa: {
      titulo: 'Dados da empresa',
      razaoSocial: 'Razão social',
      nomeFantasia: 'Nome fantasia',
      cnpj: 'CNPJ',
      site: 'Site',
      segmento: 'Segmento',
      segmentos: [
        'SaaS de gestão para clínicas',
        'SaaS de gestão financeira',
        'SaaS educacional',
        'SaaS para varejo',
        'Outro segmento',
      ],
      mrrFaixa: 'MRR médio',
      faixas: [
        'Até R$ 25 mil',
        'R$ 25 mil a R$ 75 mil',
        'R$ 75 mil a R$ 200 mil',
        'R$ 200 mil a R$ 500 mil',
        'Acima de R$ 500 mil',
      ],
      assinantes: 'Número de assinantes',
    },
    responsavel: {
      titulo: 'Responsável pela conta',
      nome: 'Nome completo',
      cargo: 'Cargo',
      email: 'E-mail',
      telefone: 'Telefone',
      senha: 'Senha',
      senhaDica: 'Mínimo de 8 caracteres.',
    },
    operacao: {
      titulo: 'Operação',
      plano: 'Plano',
      planoDica: {
        standard: '25% sobre o ganho incremental da recuperação.',
        premium: 'Tudo do Standard, mais 20% sobre a receita preservada na retenção.',
      },
      cobranca: 'Forma de cobrança',
      cobrancaDica: 'Cartão em breve',
      inicio: 'Início desejado',
      termos: 'Li e aceito os [Termos de Uso](/termos) e a [Política de Privacidade](/privacidade)',
      comunicacao: 'Quero receber novidades sobre o produto por e-mail',
      comunicacaoDica: 'Opcional',
    },
    voltar: 'Voltar',
    continuar: 'Continuar',
    finalizar: 'Ir para o pagamento',
    enviando: 'Criando conta…',
    concluindo: 'Concluindo seu cadastro…',
    temConta: 'Já tem conta?',
    entrar: 'Entrar',
    jaTemConta: {
      titulo: 'Sua conta já está criada',
      texto: 'Você está conectado como {email}.',
      painel: 'Ir para o painel',
      sair: 'Sair',
    },
    validacao: {
      obrigatorio: 'Campo obrigatório.',
      cnpj: 'CNPJ inválido. Confira os números.',
      email: 'Informe um e-mail válido.',
      senha: 'A senha precisa ter pelo menos 8 caracteres.',
      telefone: 'Telefone incompleto. Inclua o DDD.',
      termos: 'Para criar a conta, aceite os termos de uso e a política de privacidade.',
    },
    erros: {
      config: 'O cadastro está indisponível no momento. Tente novamente mais tarde.',
      email_existente: 'Já existe uma conta com este e-mail.',
      cnpj_existente: 'Este CNPJ já está cadastrado na CRAI. Peça um convite a quem administra a conta da empresa.',
      cnpj_invalido: 'CNPJ inválido. Confira os números.',
      senha_fraca: 'Senha fraca. Use pelo menos 8 caracteres, misturando letras e números.',
      email_invalido: 'Este e-mail não foi aceito. Confira o endereço.',
      limite: 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.',
      rede: 'Não foi possível conectar ao servidor. Verifique sua internet e tente de novo.',
      desconhecido: 'Não foi possível concluir o cadastro. Tente novamente.',
    },
    confirmarEmail: {
      titulo: 'Confirme seu e-mail',
      texto: 'Enviamos um link de confirmação para {email}. Abra o link neste mesmo navegador para concluir o cadastro e seguir para o pagamento.',
      voltar: 'Voltar ao início',
    },
    // Valores de demonstração que dependem do idioma (o resto vive em mockCadastro.ts).
    mock: {
      cobranca: 'Pix Automático',
      mensagem:
        'Olá, time da CRAI. Temos cerca de 500 assinantes e queremos entender como funciona a apuração da receita preservada no Premium e quanto tempo leva a integração.',
    },
  },

  entrar: {
    titulo: 'Entrar',
    lead: 'Acesse a conta da sua empresa na CRAI.',
    email: 'E-mail',
    senha: 'Senha',
    entrar: 'Entrar',
    entrando: 'Entrando…',
    esqueci: 'Esqueci minha senha',
    semConta: 'Ainda não tem conta?',
    criarConta: 'Criar conta',
    aviso: 'Ao entrar, você concorda com os [Termos de Uso](/termos) e a [Política de Privacidade](/privacidade).',
    validacao: {
      email: 'Informe um e-mail válido.',
      senha: 'Informe a senha.',
    },
    erros: {
      config: 'O login está indisponível no momento. Tente novamente mais tarde.',
      credenciais: 'E-mail ou senha incorretos.',
      nao_confirmado: 'Confirme seu e-mail antes de entrar. O link está na sua caixa de entrada.',
      senha_fraca: 'Senha fraca.',
      mesma_senha: 'A nova senha precisa ser diferente da atual.',
      limite: 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.',
      rede: 'Não foi possível conectar ao servidor. Verifique sua internet e tente de novo.',
      desconhecido: 'Não foi possível entrar. Tente novamente.',
    },
    recuperar: {
      titulo: 'Recuperar senha',
      texto: 'Informe o e-mail da conta. Enviaremos um link para você criar uma nova senha.',
      enviar: 'Enviar link',
      enviando: 'Enviando…',
      enviado: 'Se existir uma conta com {email}, você vai receber um link para criar uma nova senha.',
      voltar: 'Voltar para o login',
    },
  },
  redefinirSenha: {
    titulo: 'Nova senha',
    lead: 'Escolha uma nova senha para a sua conta.',
    senha: 'Nova senha',
    dica: 'Mínimo de 8 caracteres.',
    salvar: 'Salvar nova senha',
    salvando: 'Salvando…',
    curta: 'A senha precisa ter pelo menos 8 caracteres.',
    sucesso: 'Senha alterada. Você já está conectado.',
    irPainel: 'Ir para o painel',
    linkInvalido: 'Este link expirou ou já foi usado. Peça um novo na tela de login.',
    irEntrar: 'Ir para o login',
  },
  pagamento: {
    titulo: 'Autorização de cobrança',
    lead: 'A taxa de sucesso é cobrada por Pix Automático, só sobre resultado apurado. Os dados da empresa vêm do seu cadastro.',
    carregando: 'Carregando os dados da empresa…',
    formTitulo: 'Autorização de cobrança por Pix Automático',
    campos: {
      titular: 'Titular da conta',
      documento: 'CPF ou CNPJ do titular',
      instituicao: 'Instituição',
      agencia: 'Agência',
      conta: 'Conta',
      chavePix: 'Chave Pix da empresa',
      dia: 'Dia de apuração mensal',
      limite: 'Limite máximo por cobrança',
      limiteDica: 'O Pix Automático exige um teto autorizado por cobrança. Você pode alterar depois.',
      autorizo: 'Autorizo a CRAI a cobrar a taxa de sucesso apurada',
      autorizoErro: 'Marque a autorização para continuar.',
    },
    instituicoes: ['Banco de demonstração', 'Cooperativa de demonstração', 'Instituição fictícia S.A.'],
    dias: [5, 10, 15],
    diaRotulo: 'Todo dia {n}',
    resumo: {
      titulo: 'Resumo',
      plano: 'Plano {nome}',
      linhas: ['25% sobre o ganho incremental da recuperação', '20% sobre a receita preservada na retenção (6 meses)'],
      selos: ['Sem mensalidade', 'Sem taxa de implantação'],
      estimativa: 'Estimativa da 1ª apuração',
      estimativaNota: 'Estimativa. A cobrança só acontece sobre resultado apurado.',
      totalHoje: 'Total hoje',
    },
    autorizar: 'Autorizar cobrança',
    registrando: 'Registrando autorização',
    registrada: 'Autorização registrada',
    demo: 'Ambiente de demonstração. Nenhum dado é enviado e nenhuma cobrança é feita.',
  },

  confirmacao: {
    titulo: 'Autorização registrada',
    texto:
      'A primeira apuração acontece no dia 5 do mês que vem. Enquanto isso, a CRAI já começa a monitorar as cobranças que falharem.',
    marca: 'Marca de confirmação',
    links: [
      { rotulo: 'Abrir o painel', para: '/painel', variante: 'primary' as const },
      { rotulo: 'Ver os planos', para: '/planos', variante: 'ghost' as const },
      { rotulo: 'Voltar ao início', para: '/', variante: 'link' as const },
    ],
  },

  empresaPagina: {
    declaracao: {
      eyebrow: 'Declaração estratégica',
      missao: {
        rotulo: 'Missão',
        texto:
          'Devolver às empresas brasileiras de software por assinatura a receita recorrente que elas perdem por falha de pagamento e por cancelamento, com agentes de IA que agem de forma autônoma e comprovam cada resultado.',
      },
      visao: {
        rotulo: 'Visão',
        texto: 'Ser a referência em retenção e recuperação de receita para empresas de software por assinatura no Brasil até 2031.',
      },
      valoresTitulo: 'Valores',
      valores: [
        { nome: 'Autonomia', texto: 'O agente conduz o ciclo do início ao fim, sem depender de alguém da sua equipe para cada caso.' },
        { nome: 'Transparência', texto: 'Se a CRAI age sozinha sobre a sua base, presta contas de cada ação e de cada resultado.' },
        { nome: 'Rigor', texto: 'Resultado medido contra grupo de controle, com premissas declaradas e estimativas conservadoras.' },
        { nome: 'Segurança', texto: 'Adesão à LGPD: só entra no sistema o dado estritamente necessário para a decisão.' },
        { nome: 'Eficiência', texto: 'Cada real recuperado deve custar uma fração mínima do que representa.' },
      ],
    },
    titulo: 'Uma empresa de software para a receita que some sem aviso',
    lead: 'A CRAI é uma empresa brasileira de software B2B. O produto recupera parte da receita que empresas de SaaS perdem por churn e mostra o resultado em um painel.',
    proposito: {
      titulo: 'Propósito',
      texto:
        'Fazer empresas de SaaS perderem menos receita por motivos que têm solução: uma cobrança que falhou no dia errado, um assinante que ninguém ouviu antes de cancelar. E fazer isso sem criar atrito para quem decidiu sair.',
    },
    operacao: {
      titulo: 'Como a empresa opera hoje',
      itens: [
        { titulo: 'Para quem', texto: 'SaaS brasileiros com MRR entre R$ 25 mil e R$ 500 mil.' },
        { titulo: 'Como cobra e recupera', texto: 'Por Pix Automático. Cartão está no roadmap.' },
        { titulo: 'Como ganha', texto: 'Só taxa de sucesso, medida contra grupo de controle. Sem mensalidade e sem implantação.' },
        { titulo: 'Como trata dados', texto: 'Coleta mínima e finalidade declarada, conforme a LGPD.' },
      ],
    },
    time: {
      titulo: 'Time',
      pessoas: [
        { nome: 'José Scibarauskas Neto', cargo: 'Product Owner e Dev Frontend/Backend', foto: '/time/jose.jpg' },
        { nome: 'João Vitor Gava', cargo: 'Tech Lead', foto: '/time/joao.jpg' },
        { nome: 'Gabriel de Frias Ramirez', cargo: 'Planejamento Estratégico e Gestão Financeira', foto: '/time/gabriel.jpg' },
      ],
    },
    origem: {
      titulo: 'De onde a CRAI veio',
      texto:
        'A CRAI começou como uma pesquisa sobre churn em SaaS brasileiro: por que empresas com um produto bom perdiam receita todo mês, e quanto disso vinha da cobrança, não da insatisfação. As hipóteses foram validadas em conversas com profissionais de mercado antes de virarem produto.',
    },
  },

  contatoPagina: {
    titulo: 'Contato',
    lead: 'Fale com o time da CRAI. O formulário já vem preenchido com dados de demonstração.',
    campos: {
      nome: 'Nome',
      email: 'E-mail',
      empresa: 'Empresa',
      assunto: 'Assunto',
      mensagem: 'Mensagem',
    },
    assuntos: ['Quero entender o Premium', 'Dúvida sobre a medição', 'Integração e dados', 'Outro assunto'],
    enviar: 'Enviar mensagem',
    privacidade: 'Usamos esses dados só para responder à sua mensagem, conforme a [Política de Privacidade](/privacidade).',
    sucesso: {
      titulo: 'Mensagem registrada',
      texto: 'Este é um site demonstrativo, então nada foi enviado. Em um ambiente real, o time responderia no e-mail informado.',
      editar: 'Editar mensagem',
    },
    lateral: {
      titulo: 'Antes de escrever',
      texto: 'Se a dúvida é sobre valores, o simulador mostra a conta com o seu MRR. Se é sobre o produto, a página Produto explica cada etapa.',
      links: [
        { rotulo: 'Abrir o simulador', para: '/planos#simulador' },
        { rotulo: 'Ver como funciona', para: '/produto' },
      ],
    },
  },

  naoEncontrada: {
    codigo: '404',
    titulo: 'Essa página deu churn.',
    texto: 'O endereço que você procurou não existe ou foi movido. Mas a sua receita não precisa ir embora junto.',
    inicio: { rotulo: 'Voltar para o início', para: '/' },
    simulacao: { rotulo: 'Fazer uma simulação', para: '/planos#simulador' },
  },

  erroInesperado: {
    titulo: 'Algo deu errado por aqui.',
    texto: 'Um erro inesperado interrompeu a página. Recarregue ou volte ao início; se continuar, fale com a gente.',
    inicio: 'Voltar para o início',
    tituloAba: 'Erro inesperado | CRAI',
  },

  privacidade: privacidadePt,
  termos: termosPt,
}

export type Conteudo = typeof conteudoPt
