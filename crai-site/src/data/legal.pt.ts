// Política de Privacidade e Termos de Uso em pt-BR. Texto-modelo alinhado à LGPD (Lei 13.709/2018) e ao
// Marco Civil da Internet (Lei 12.965/2014). ⚠️ Os campos [ENTRE COLCHETES] precisam ser preenchidos e a versão
// final passa por revisão jurídica antes do lançamento. Nos textos, **negrito** e [rótulo](/rota) viram marcação.

/** Parágrafo (string), subtítulo, lista ou tabela. */
export type BlocoLegal =
  | string
  | { subtitulo: string }
  | { lista: string[] }
  | { tabela: { colunas: string[]; linhas: string[][] } }

export interface DocumentoLegal {
  titulo: string
  vigencia: string
  /** Aviso opcional abaixo da vigência (ex.: versão traduzida). */
  nota?: string
  sumarioAria: string
  secoes: { id: string; titulo: string; blocos: BlocoLegal[] }[]
}

export const privacidadePt: DocumentoLegal = {
  titulo: 'Política de Privacidade',
  vigencia: 'Vigência: [DD/MM/AAAA] · Versão 1.0',
  sumarioAria: 'Seções da política',
  secoes: [
    {
      id: 'quem-somos',
      titulo: '1. Quem somos',
      blocos: [
        'A CRAI ([RAZÃO SOCIAL], CNPJ [00.000.000/0000-00], com sede em [ENDEREÇO]) desenvolve uma plataforma de recuperação de receita e retenção de clientes para empresas SaaS. Esta Política explica como tratamos dados pessoais no site [DOMÍNIO] e na plataforma CRAI.',
      ],
    },
    {
      id: 'papel',
      titulo: '2. Nosso papel em relação aos dados',
      blocos: [
        {
          lista: [
            '**Como controladora:** tratamos os dados de visitantes do site e de usuários que criam conta (representantes das empresas clientes).',
            '**Como operadora:** tratamos os dados dos clientes finais que as empresas clientes enviam à plataforma (por exemplo, a base de assinantes de um SaaS). Nesse caso, a empresa cliente é a controladora, define as finalidades e é responsável por ter base legal para compartilhar esses dados conosco.',
          ],
        },
      ],
    },
    {
      id: 'dados-coletados',
      titulo: '3. Quais dados coletamos',
      blocos: [
        { subtitulo: '3.1 Visitantes do site' },
        {
          lista: [
            'Dados de navegação: endereço IP, data e hora de acesso, navegador, dispositivo, páginas visitadas e origem do acesso.',
            'Armazenamento local do navegador (ver seção 10).',
            'Dados informados no formulário de contato: nome, e-mail, empresa, assunto e mensagem.',
          ],
        },
        { subtitulo: '3.2 Usuários com conta' },
        {
          lista: [
            'Do responsável pela conta: nome, cargo, e-mail, telefone e senha (armazenada de forma criptografada).',
            'Da empresa: razão social, nome fantasia, CNPJ, site, segmento, faixa de MRR e número de assinantes.',
            'Plano escolhido, data e hora do aceite destes documentos e preferência de receber comunicações.',
            'Registros de uso da plataforma.',
          ],
        },
        { subtitulo: '3.3 Dados enviados pelas empresas clientes' },
        {
          lista: [
            'Bases de clientes em CSV/XLSX ou via integração, que podem conter: identificador do cliente, histórico de pagamentos e cobranças, plano contratado, datas de adesão e cancelamento e indicadores de uso do produto.',
            '**Simulador do site:** os valores digitados no simulador são calculados no próprio navegador e não são enviados nem armazenados pela CRAI.',
          ],
        },
        'Não solicitamos dados pessoais sensíveis (art. 5º, II, da LGPD) e pedimos que não sejam enviados.',
      ],
    },
    {
      id: 'finalidades',
      titulo: '4. Para que usamos os dados e com qual base legal',
      blocos: [
        {
          tabela: {
            colunas: ['Finalidade', 'Dados', 'Base legal (LGPD)'],
            linhas: [
              ['Exibir e manter o site funcionando com segurança', 'Navegação, IP', 'Legítimo interesse (art. 7º, IX)'],
              ['Guardar registros de acesso exigidos por lei', 'IP, data e hora', 'Obrigação legal (art. 7º, II; Marco Civil, art. 15)'],
              ['Responder contatos e enviar propostas', 'Dados do formulário', 'Procedimentos preliminares de contrato (art. 7º, V)'],
              ['Criar e manter a conta', 'Dados cadastrais', 'Execução de contrato (art. 7º, V)'],
              ['Calcular risco de churn, recuperar pagamentos e gerar indicadores', 'Base enviada pela empresa cliente', 'Conforme instruções da empresa cliente (controladora)'],
              ['Medir audiência e melhorar o site, quando houver ferramenta de analytics', 'Cookies analíticos', 'Consentimento (art. 7º, I)'],
              ['Enviar comunicações sobre a CRAI', 'E-mail', 'Consentimento, revogável a qualquer momento'],
            ],
          },
        },
      ],
    },
    {
      id: 'compartilhamento',
      titulo: '5. Com quem compartilhamos',
      blocos: [
        'Não vendemos dados pessoais. Compartilhamos apenas o necessário com:',
        {
          lista: [
            '**Provedores de infraestrutura:** hospedagem do site ([PROVEDOR DE HOSPEDAGEM]) e banco de dados e autenticação (Supabase).',
            '**Provedores de pagamento:** [PSP A DEFINIR], quando a cobrança via Pix Automático estiver ativa.',
            '**Provedores de modelos de linguagem:** apenas quando a funcionalidade de mensagens geradas por IA estiver habilitada, com o mínimo de dados necessário.',
            '**Autoridades públicas:** quando houver obrigação legal ou ordem judicial.',
          ],
        },
        'Todos os fornecedores são contratualmente obrigados a proteger os dados e a usá-los só para prestar o serviço à CRAI.',
      ],
    },
    {
      id: 'transferencia-internacional',
      titulo: '6. Transferência internacional',
      blocos: [
        'Alguns fornecedores podem armazenar dados em servidores fora do Brasil. Nesses casos, a transferência segue o art. 33 da LGPD, com cláusulas contratuais e garantias de proteção equivalentes.',
      ],
    },
    {
      id: 'retencao',
      titulo: '7. Por quanto tempo guardamos',
      blocos: [
        {
          tabela: {
            colunas: ['Dado', 'Prazo'],
            linhas: [
              ['Registros de acesso ao site', '6 meses (Marco Civil, art. 15)'],
              ['Dados de conta', 'Enquanto a conta estiver ativa + [5] anos para cumprimento de obrigações legais'],
              ['Bases enviadas por empresas clientes', 'Durante o contrato; eliminadas em até [30] dias após o término, salvo instrução diferente da controladora'],
              ['Formulários de contato', '[24] meses'],
            ],
          },
        },
      ],
    },
    {
      id: 'decisoes-automatizadas',
      titulo: '8. Decisões automatizadas',
      blocos: [
        'A plataforma usa modelos de inteligência artificial para estimar risco de cancelamento, prever a melhor data de cobrança e sugerir ações de retenção. Essas análises apoiam as decisões da empresa cliente. O titular pode solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado e informações sobre os critérios utilizados (art. 20 da LGPD), respeitados os segredos comercial e industrial.',
      ],
    },
    {
      id: 'direitos',
      titulo: '9. Seus direitos',
      blocos: [
        'Nos termos do art. 18 da LGPD, você pode solicitar: confirmação da existência de tratamento; acesso aos dados; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade; portabilidade; eliminação dos dados tratados com consentimento; informação sobre compartilhamentos; e revogação do consentimento.',
        'Se você é cliente final de uma empresa que usa a CRAI, encaminhe o pedido preferencialmente a essa empresa. Se nos contatar diretamente, repassaremos o pedido a ela.',
        'Responderemos em até 15 dias. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',
      ],
    },
    {
      id: 'cookies',
      titulo: '10. Cookies e armazenamento local',
      blocos: [
        {
          tabela: {
            colunas: ['Tipo', 'Para que serve', 'Precisa de consentimento?'],
            linhas: [
              ['Essenciais', 'Manter o login e lembrar o idioma escolhido durante a visita', 'Não'],
              ['Analíticos', 'Entender como o site é usado', 'Sim'],
            ],
          },
        },
        'Hoje o site não usa cookies analíticos nem de publicidade. Se passar a usar, pediremos consentimento antes, por um banner. Você também pode limpar esses dados nas configurações do navegador.',
      ],
    },
    {
      id: 'seguranca',
      titulo: '11. Segurança',
      blocos: [
        'Adotamos criptografia em trânsito (HTTPS) e em repouso, controle de acesso por perfil, autenticação segura e registro de acessos. Em caso de incidente de segurança com risco relevante aos titulares, comunicaremos a ANPD e os afetados, conforme o art. 48 da LGPD.',
      ],
    },
    {
      id: 'publico',
      titulo: '12. Público',
      blocos: ['A CRAI é um serviço destinado a empresas e não é direcionada a menores de 18 anos.'],
    },
    {
      id: 'encarregado',
      titulo: '13. Encarregado (DPO)',
      blocos: ['[NOME DO ENCARREGADO] · [privacidade@DOMÍNIO]'],
    },
    {
      id: 'alteracoes',
      titulo: '14. Alterações',
      blocos: [
        'Podemos atualizar esta Política. A data de vigência no topo indica a versão atual, e mudanças relevantes serão comunicadas por e-mail aos usuários com conta.',
      ],
    },
  ],
}

export const termosPt: DocumentoLegal = {
  titulo: 'Termos de Uso',
  vigencia: 'Vigência: [DD/MM/AAAA] · Versão 1.0',
  sumarioAria: 'Seções dos termos',
  secoes: [
    {
      id: 'aceitacao',
      titulo: '1. Aceitação',
      blocos: [
        'Ao acessar o site [DOMÍNIO] ou criar uma conta na plataforma CRAI, você concorda com estes Termos e com a [Política de Privacidade](/privacidade). Se estiver agindo em nome de uma empresa, declara ter poderes para aceitá-los em nome dela.',
      ],
    },
    {
      id: 'definicoes',
      titulo: '2. Definições',
      blocos: [
        {
          lista: [
            '**CRAI:** [RAZÃO SOCIAL], CNPJ [00.000.000/0000-00].',
            '**Plataforma:** o site, o painel, as simulações, as APIs e os agentes de recuperação e retenção.',
            '**Cliente:** empresa que contrata ou testa a Plataforma.',
            '**Usuário:** pessoa autorizada pelo Cliente a usar a Plataforma.',
            '**Clientes finais:** os assinantes do Cliente, cujos dados podem ser enviados à Plataforma.',
          ],
        },
      ],
    },
    {
      id: 'servico',
      titulo: '3. O serviço',
      blocos: [
        'A Plataforma identifica pagamentos falhos e riscos de cancelamento, sugere e executa ações de recuperação (incluindo cobrança via Pix Automático, quando contratada) e apresenta indicadores em um painel. Funcionalidades identificadas como **beta** podem mudar, ser suspensas ou apresentar instabilidades.',
      ],
    },
    {
      id: 'conta',
      titulo: '4. Conta',
      blocos: [
        {
          lista: [
            'O Usuário deve informar dados verdadeiros e mantê-los atualizados.',
            'Credenciais são pessoais e intransferíveis; o Cliente é responsável pelo que for feito com as contas de seus Usuários.',
            'Suspeita de uso indevido deve ser comunicada imediatamente a [contato@DOMÍNIO].',
          ],
        },
      ],
    },
    {
      id: 'uso-permitido',
      titulo: '5. Uso permitido',
      blocos: [
        'É proibido:',
        {
          lista: [
            'Enviar dados sem base legal ou dados pessoais sensíveis de clientes finais;',
            'Tentar acessar áreas, contas ou dados de terceiros;',
            'Fazer engenharia reversa, copiar ou revender a Plataforma ou seus modelos;',
            'Sobrecarregar a infraestrutura, usar robôs não autorizados ou explorar vulnerabilidades;',
            'Usar a Plataforma para cobranças abusivas, enganosas ou em desacordo com o Código de Defesa do Consumidor.',
          ],
        },
      ],
    },
    {
      id: 'dados-do-cliente',
      titulo: '6. Dados enviados pelo Cliente',
      blocos: [
        {
          lista: [
            'O Cliente é o controlador dos dados de seus clientes finais e garante ter base legal para compartilhá-los com a CRAI.',
            'A CRAI atua como operadora, tratando esses dados apenas para prestar o serviço, conforme a [Política de Privacidade](/privacidade) e o contrato.',
            'O Cliente mantém a titularidade dos seus dados. A CRAI pode usar dados **agregados e anonimizados** para melhorar seus modelos, sem identificar o Cliente ou os clientes finais.',
          ],
        },
      ],
    },
    {
      id: 'cancelamento-livre',
      titulo: '7. Cancelamento livre',
      blocos: [
        'Os agentes de retenção da CRAI **nunca dificultam, obstruem ou atrasam** o cancelamento solicitado por um cliente final. Ofertas de retenção são apresentadas como opção, e o pedido de cancelamento é sempre respeitado, em linha com o Decreto nº 11.034/2022.',
      ],
    },
    {
      id: 'remuneracao',
      titulo: '8. Remuneração',
      blocos: [
        {
          lista: [
            'As condições comerciais (planos, percentuais e forma de cobrança) constam na proposta ou contrato assinado com o Cliente.',
            'A remuneração por êxito é calculada sobre o **ganho incremental**, medido contra um grupo de controle, e não sobre o valor bruto recuperado.',
            'Simulações no site e acesso beta gratuito não geram cobrança.',
          ],
        },
      ],
    },
    {
      id: 'simulacoes',
      titulo: '9. Simulações e resultados',
      blocos: [
        'Simulações, projeções e indicadores são **estimativas** baseadas nos dados fornecidos e em modelos estatísticos. Não constituem promessa ou garantia de resultado financeiro.',
      ],
    },
    {
      id: 'propriedade-intelectual',
      titulo: '10. Propriedade intelectual',
      blocos: [
        'A marca CRAI, o software, os modelos, o design e os conteúdos do site pertencem à CRAI. Estes Termos não transferem nenhum direito sobre eles, apenas concedem uma licença de uso limitada, não exclusiva e revogável durante a vigência da relação.',
      ],
    },
    {
      id: 'disponibilidade',
      titulo: '11. Disponibilidade',
      blocos: [
        'A CRAI busca manter a Plataforma disponível de forma contínua, mas pode haver interrupções para manutenção, atualizações ou por falhas de terceiros (hospedagem, provedores de pagamento, instituições financeiras).',
      ],
    },
    {
      id: 'responsabilidade',
      titulo: '12. Limitação de responsabilidade',
      blocos: [
        'Na extensão permitida pela lei, a CRAI não responde por lucros cessantes, perdas indiretas, decisões tomadas pelo Cliente com base nos indicadores, falhas de sistemas de terceiros ou dados incorretos enviados pelo Cliente. A responsabilidade total da CRAI fica limitada ao valor pago pelo Cliente nos [12] meses anteriores ao evento.',
      ],
    },
    {
      id: 'encerramento',
      titulo: '13. Suspensão e encerramento',
      blocos: [
        'A CRAI pode suspender ou encerrar contas que violem estes Termos. O Cliente pode encerrar a conta a qualquer momento pelo e-mail [contato@DOMÍNIO]. Após o encerramento, os dados seguem os prazos da [Política de Privacidade](/privacidade).',
      ],
    },
    {
      id: 'alteracoes',
      titulo: '14. Alterações',
      blocos: [
        'Estes Termos podem ser atualizados. Mudanças relevantes serão comunicadas com antecedência mínima de [15] dias aos usuários com conta. O uso continuado após a vigência indica concordância.',
      ],
    },
    {
      id: 'foro',
      titulo: '15. Lei aplicável e foro',
      blocos: [
        'Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de [CIDADE/UF] para resolver eventuais controvérsias.',
      ],
    },
    {
      id: 'contato',
      titulo: '16. Contato',
      blocos: ['[contato@DOMÍNIO] · [ENDEREÇO]'],
    },
  ],
}
