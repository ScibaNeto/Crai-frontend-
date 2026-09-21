// Todo o copy visível do site, em pt-BR. Componentes não carregam strings de texto próprias.
// `conteudo.en.ts` é tipado como `Conteudo`: chave faltando em inglês quebra o build.

export const conteudoPt = {
  idioma: {
    grupoAria: 'Idioma',
    opcoes: [
      { id: 'pt', rotulo: 'PT', nome: 'Português' },
      { id: 'en', rotulo: 'EN', nome: 'English' },
    ],
  },

  titulos: {
    home: 'CRAI — Recuperação de receita para SaaS',
    produto: 'Como a CRAI funciona — CRAI',
    planos: 'Planos e simulador — CRAI',
    painel: 'Painel (demo) — CRAI',
    cadastro: 'Criar conta — CRAI',
    pagamento: 'Autorização de cobrança — CRAI',
    confirmacao: 'Autorização registrada — CRAI',
    empresa: 'Sobre a CRAI — CRAI',
    contato: 'Contato — CRAI',
    naoEncontrada: 'Página não encontrada — CRAI',
  },
  metaDescricao:
    'A CRAI recupera receita que empresas de SaaS perdem por churn, por Pix Automático, e cobra só sobre o que recupera.',

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
      ],
      aviso: 'Site demonstrativo — nenhum pagamento é processado.',
      lgpd: 'Dados tratados conforme a LGPD, com coleta mínima e finalidade declarada.',
      legal: '© 2026 CRAI. Site demonstrativo, sem coleta real de dados.',
    },
  },

  home: {
    hero: {
      titulo: 'A receita que some antes de virar churn',
      subtitulo:
        'Cobranças que falham e assinantes que decidem sair drenam faturamento recorrente todo mês. A CRAI recupera parte disso por Pix Automático e cobra só sobre o que recupera.',
      acaoPrimaria: { rotulo: 'Criar conta', para: '/cadastro' },
      acaoSecundaria: { rotulo: 'Ver como funciona', para: '/produto' },
      apoio: 'Sem mensalidade. Sem taxa de implantação. Sem CRM para você manter.',
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
  },

  produto: {
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
        nos: {
          falha: ['Cobrança', 'falha'],
          motivo: ['Classificação', 'do motivo'],
          janela: ['Janela de liquidez', 'estimada'],
          tentativa: ['Nova tentativa por', 'Pix Automático'],
          confirmacao: ['Confirmação'],
          rota: ['Nova rota'],
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
      texto:
        'Uma parte dos assinantes com cobrança falha fica fora da ação da CRAI e segue só com as retentativas obrigatórias. A outra parte recebe a ação. Todo mês, a diferença de recuperação entre os dois grupos é apurada e aparece no painel.',
      legenda: 'A conta da CRAI é a área entre as duas linhas.',
      grafico: {
        titulo: 'Taxa de recuperação do grupo de controle e do grupo tratado em 12 meses',
        descricao:
          'As duas linhas começam próximas e se afastam ao longo dos meses. A área entre elas é o ganho incremental.',
        controle: 'Grupo de controle',
        tratado: 'Grupo tratado',
        ganho: 'Ganho incremental',
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
    standardIncluido: 'Tudo do Standard',
    premiumSoma: 'E soma',
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
      taxa: '25%',
      base: 'sobre o ganho incremental',
      resumo: 'Recuperação de cobranças que falharam, cobrada só sobre o que ficou acima do grupo de controle.',
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
      taxa: '+ 20%',
      base: 'sobre a receita preservada',
      resumo: 'Tudo do Standard, mais retenção de quem sinaliza que vai sair.',
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
    lead: 'Os campos já vêm preenchidos com uma empresa de demonstração. Revise se quiser e avance.',
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
      senhaDica: 'Senha de demonstração. Nada é salvo.',
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
      termos: 'Li e aceito os termos de uso e a política de privacidade',
      comunicacao: 'Quero receber novidades sobre o produto por e-mail',
      comunicacaoDica: 'Opcional',
    },
    voltar: 'Voltar',
    continuar: 'Continuar',
    finalizar: 'Ir para o pagamento',
    // Valores de demonstração que dependem do idioma (o resto vive em mockCadastro.ts).
    mock: {
      cargo: 'Head de Receita',
      cobranca: 'Pix Automático',
      mensagem:
        'Olá, time da CRAI. Temos cerca de 500 assinantes e queremos entender como funciona a apuração da receita preservada no Premium e quanto tempo leva a integração.',
    },
  },

  pagamento: {
    titulo: 'Autorização de cobrança',
    lead: 'A taxa de sucesso é cobrada por Pix Automático, só sobre resultado apurado. Os campos já vêm preenchidos.',
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
    },
    instituicoes: ['Banco de demonstração', 'Cooperativa de demonstração', 'Instituição fictícia S.A.'],
    dias: [5, 10, 15],
    diaRotulo: 'Todo dia {n}',
    resumo: {
      titulo: 'Resumo',
      plano: 'Plano Premium',
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
    titulo: 'Essa página não existe — mas a receita que você procura talvez exista.',
    link: { rotulo: 'Voltar ao início', para: '/' },
  },
}

export type Conteudo = typeof conteudoPt
