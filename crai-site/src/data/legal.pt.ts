// Política de Privacidade e Termos de Uso em pt-BR, versão 1.0 (minuta final para revisão jurídica),
// alinhados à LGPD (Lei 13.709/2018) e ao Marco Civil da Internet (Lei 12.965/2014).
// ⚠️ Os campos [ENTRE COLCHETES] são dados de constituição da empresa e precisam ser preenchidos antes da
// publicação. Nos textos, **negrito** e [rótulo](/rota ou mailto:) viram marcação (components/ui/TextoRico.tsx).

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

const EMAIL = '[agentia.startup@gmail.com](mailto:agentia.startup@gmail.com)'

export const privacidadePt: DocumentoLegal = {
  titulo: 'Política de Privacidade',
  vigencia: 'Versão 1.0 · Vigência a partir de [DD/MM/AAAA]',
  sumarioAria: 'Seções da política',
  secoes: [
    {
      id: 'quem-somos',
      titulo: '1. Quem somos',
      blocos: [
        '1.1. Esta Política de Privacidade descreve como **[RAZÃO SOCIAL]**, nome fantasia CRAI, inscrita no CNPJ sob o nº [CNPJ], com sede na cidade de São Paulo, Estado de São Paulo, em [ENDEREÇO COMPLETO] ("CRAI"), trata dados pessoais no site crai.com.br e na plataforma CRAI, em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais, "LGPD") e com a Lei nº 12.965/2014 (Marco Civil da Internet).',
        '1.2. A CRAI desenvolve uma plataforma de recuperação de receita e de retenção de clientes para empresas que vendem assinaturas.',
      ],
    },
    {
      id: 'papel',
      titulo: '2. Nosso papel em relação aos dados',
      blocos: [
        '2.1. **Como controladora**, a CRAI trata os dados de visitantes do site e de usuários que criam conta na plataforma, que são os representantes das empresas clientes. As regras para esses dados estão na seção 4.',
        '2.2. **Como operadora**, a CRAI trata os dados dos assinantes que as empresas clientes enviam à plataforma. Nesse caso, a empresa cliente é a controladora, define as finalidades do tratamento e é responsável por ter base legal para compartilhar esses dados com a CRAI. As regras para esses dados estão na seção 5.',
      ],
    },
    {
      id: 'encarregado',
      titulo: '3. Encarregado pelo tratamento de dados pessoais',
      blocos: [
        {
          lista: [
            'Encarregado: **João Vitor Gava Pinheiro**',
            'Substituto: **Gabriel de Frias Ramirez**',
            `E-mail: ${EMAIL}`,
          ],
        },
        'Esse é o canal para pedidos, dúvidas e reclamações relativos a dados pessoais.',
      ],
    },
    {
      id: 'controladora',
      titulo: '4. Dados tratados pela CRAI como controladora',
      blocos: [
        { subtitulo: '4.1. Visitantes do site' },
        'a) **Dados de navegação:** endereço IP, data e hora de acesso, navegador, dispositivo, páginas visitadas e origem do acesso.',
        'b) **Formulário de contato:** nome, e-mail, empresa, assunto e mensagem.',
        'c) **Simulador:** os valores digitados no simulador são calculados no próprio navegador e não são enviados à CRAI nem armazenados por ela.',
        { subtitulo: '4.2. Usuários com conta' },
        'a) **Dados do responsável pela conta:** nome completo, cargo, e-mail, telefone e senha. A senha é armazenada apenas em forma de hash e nunca em texto legível.',
        'b) **Dados da empresa:** razão social, nome fantasia, CNPJ, site, segmento, faixa de receita recorrente mensal, número de clientes ativos, e-mail financeiro e data de início desejada.',
        'c) **Dados de conta:** plano escolhido, papel do usuário na conta (proprietário, administrador ou membro), e-mails de pessoas convidadas, data e hora da aceitação dos Termos de Uso e da ciência desta Política e preferência de receber comunicações.',
        'd) **Dados para cobrança da remuneração da CRAI:** titular da conta, CPF ou CNPJ do titular, instituição, agência, conta, chave Pix, dia de apuração e limite por cobrança. Durante a fase beta, esses dados não são enviados nem armazenados.',
        'e) **Registros de uso da plataforma.**',
        { subtitulo: '4.3. Finalidades e bases legais' },
        {
          tabela: {
            colunas: ['Finalidade', 'Dados', 'Base legal'],
            linhas: [
              ['Exibir e manter o site em funcionamento com segurança', 'navegação e IP', 'legítimo interesse (art. 7º, IX, da LGPD)'],
              [
                'Guardar os registros de acesso exigidos por lei',
                'IP, data e hora',
                'cumprimento de obrigação legal (art. 7º, II, da LGPD, e art. 15 do Marco Civil da Internet)',
              ],
              ['Responder contatos e enviar propostas', 'dados do formulário de contato', 'procedimentos preliminares relacionados a contrato (art. 7º, V, da LGPD)'],
              ['Criar e manter a conta e prestar o serviço', 'dados cadastrais e de conta', 'execução de contrato (art. 7º, V, da LGPD)'],
              ['Permitir que a empresa adicione colegas à conta', 'e-mail da pessoa convidada', 'legítimo interesse (art. 7º, IX, da LGPD)'],
              ['Cobrar a remuneração da CRAI', 'dados para cobrança', 'execução de contrato (art. 7º, V, da LGPD)'],
              ['Enviar novidades sobre a CRAI', 'e-mail', 'consentimento (art. 7º, I, da LGPD), revogável a qualquer momento'],
            ],
          },
        },
      ],
    },
    {
      id: 'assinantes',
      titulo: '5. Dados tratados pela CRAI como operadora',
      blocos: [
        'Esta seção se destina a quem recebeu uma mensagem da CRAI em nome de uma empresa da qual é assinante.',
        { subtitulo: '5.1. Quem é responsável pelos seus dados' },
        'A empresa da qual você é assinante é a controladora dos seus dados. A CRAI presta um serviço a essa empresa e trata seus dados somente conforme as instruções dela e o contrato firmado entre ambas.',
        { subtitulo: '5.2. Quais dados recebemos' },
        'a) **Dados da assinatura:** identificador que a empresa utiliza para você, valor da assinatura, perfil de cobrança e, quando for o caso, data e motivo do cancelamento.',
        'b) **Dados de cobrança:** identificador da transação, valor, situação, código da instituição financeira e motivo da recusa de pagamentos por Pix Automático. A chave Pix é armazenada de forma cifrada e nunca é enviada a modelos de inteligência artificial.',
        'c) **Dados de uso**, somente no plano Premium: eventos de uso do serviço da empresa, dias desde o último acesso e funcionalidades utilizadas nos últimos 30 dias.',
        'd) **Dados de contato:** telefone e, quando informado, e-mail, usados exclusivamente para o envio das mensagens.',
        'Esses dados chegam à CRAI pelo prestador de serviços de pagamento da empresa ou são enviados pela própria empresa, por arquivo, API ou SDK.',
        { subtitulo: '5.3. Para que usamos' },
        'Para recuperar pagamentos por Pix Automático que não foram concluídos e, quando a empresa contratar o plano Premium, para identificar assinantes com risco de cancelamento e apresentar ofertas de permanência.',
        { subtitulo: '5.4. Decisões automatizadas' },
        '5.4.1. As ações da CRAI são decididas e executadas por um sistema automatizado, sem intervenção humana. Isso inclui o momento de nova tentativa de cobrança, o momento e o texto das mensagens e a oferta de permanência.',
        '5.4.2. **Na recuperação de pagamentos**, os critérios considerados incluem o motivo da recusa, o histórico de pagamentos, a quantidade de falhas recentes, o valor médio das cobranças, o tempo de assinatura e o dia e o horário da cobrança. As novas tentativas seguem estritamente as regras do Banco Central do Brasil, e o valor e a data da cobrança seguem a autorização de Pix Automático que você concedeu.',
        '5.4.3. **Na retenção**, os critérios considerados incluem o tipo de evento de uso, os dias desde o último acesso, as funcionalidades utilizadas nos últimos 30 dias e o valor da assinatura.',
        '5.4.4. Toda mensagem informa que se trata de contato automatizado. Se você pedir para não receber mais mensagens, o pedido é atendido imediatamente. A CRAI nunca impede, atrasa ou condiciona um pedido de cancelamento.',
        '5.4.5. Você pode solicitar a revisão de uma decisão tomada unicamente com base em tratamento automatizado e receber informações claras sobre os critérios utilizados, nos termos do art. 20 da LGPD, respeitados os segredos comercial e industrial. A CRAI registra cada decisão e disponibiliza à empresa a explicação necessária para responder a você.',
        { subtitulo: '5.5. Como exercer seus direitos' },
        'Dirija seu pedido à empresa da qual você é assinante. Se você entrar em contato diretamente com a CRAI, encaminharemos o pedido a essa empresa em até 7 (sete) dias e informaremos você sobre o encaminhamento.',
      ],
    },
    {
      id: 'treinamento',
      titulo: '6. Treinamento de modelos',
      blocos: [
        '6.1. Os modelos de inteligência artificial da CRAI são treinados com dados sintéticos, gerados a partir de parâmetros estatísticos de bases públicas. Nenhum dado de assinante das empresas clientes é utilizado nesse treinamento.',
        '6.2. A CRAI não utiliza dados das empresas clientes, nem estatísticas deles derivadas, ainda que agregadas ou anonimizadas, para treinar modelos compartilhados ou para qualquer finalidade própria, salvo autorização expressa e por escrito da empresa controladora. Se essa autorização vier a existir, esta Política será atualizada previamente.',
      ],
    },
    {
      id: 'compartilhamento',
      titulo: '7. Compartilhamento de dados',
      blocos: [
        '7.1. A CRAI não vende dados pessoais. Compartilha apenas o necessário com os prestadores de serviço abaixo, que tratam os dados em seu nome e estão obrigados contratualmente a protegê-los:',
        {
          tabela: {
            colunas: ['Prestador', 'Finalidade', 'Local do tratamento'],
            linhas: [
              [
                'Supabase',
                'banco de dados, autenticação, execução da plataforma e envio dos e-mails de acesso (confirmação de cadastro e redefinição de senha)',
                'Estados Unidos',
              ],
              ['Anthropic', 'redação do texto das mensagens', 'Estados Unidos'],
              ['Pagar.me', 'novas tentativas de cobrança por Pix Automático e cobrança da remuneração da CRAI', 'Brasil'],
              ['Meta (WhatsApp Business)', 'envio das mensagens aos assinantes', 'fora do Brasil'],
              ['Segment', 'coleta de eventos de uso, somente no plano Premium', 'Estados Unidos'],
              ['[PROVEDOR DE HOSPEDAGEM DO SITE]', 'hospedagem do site', '[LOCAL]'],
            ],
          },
        },
        '7.2. A CRAI também pode compartilhar dados com autoridades públicas, quando houver obrigação legal ou ordem judicial.',
        '7.3. A inclusão ou substituição de prestadores será refletida nesta Política.',
      ],
    },
    {
      id: 'transferencia-internacional',
      titulo: '8. Transferência internacional',
      blocos: [
        'Parte dos prestadores listados na seção 7 trata dados fora do Brasil. Essas transferências observam o art. 33 da LGPD e a Resolução CD/ANPD nº 19/2024, por meio das cláusulas contratuais de proteção de dados firmadas com cada prestador.',
      ],
    },
    {
      id: 'retencao',
      titulo: '9. Retenção',
      blocos: [
        {
          tabela: {
            colunas: ['Dado', 'Prazo'],
            linhas: [
              ['Registros de acesso ao site e à plataforma', '6 (seis) meses, nos termos do art. 15 do Marco Civil da Internet'],
              [
                'Dados de conta',
                'enquanto a conta estiver ativa e por 5 (cinco) anos após o encerramento, para cumprimento de obrigações legais e exercício regular de direitos',
              ],
              ['Formulário de contato', '24 (vinte e quatro) meses'],
              ['Consentimento para novidades por e-mail', 'até a revogação'],
              ['Dados de assinantes enviados pela empresa cliente', 'durante a vigência do contrato com a empresa e por 6 (seis) meses após o término'],
              ['Motivo de cancelamento informado pela empresa cliente', '90 (noventa) dias'],
              ['Histórico das ações de recuperação e de retenção', '24 (vinte e quatro) meses, com posterior anonimização'],
              ['Registro das decisões automatizadas', '5 (cinco) anos, para permitir resposta a pedidos de revisão e a eventuais reclamações'],
            ],
          },
        },
        'Encerrados esses prazos, os dados são eliminados ou anonimizados.',
      ],
    },
    {
      id: 'direitos',
      titulo: '10. Seus direitos',
      blocos: [
        '10.1. Nos termos do art. 18 da LGPD, você pode solicitar: confirmação da existência de tratamento; acesso aos dados; correção de dados incompletos, inexatos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei; portabilidade; eliminação dos dados tratados com base em consentimento; informação sobre as entidades com as quais os dados são compartilhados; informação sobre a possibilidade de não fornecer consentimento e suas consequências; e revogação do consentimento.',
        '10.2. Para dados tratados pela CRAI como controladora, envie o pedido ao e-mail da seção 3. A CRAI poderá solicitar informações para confirmar sua identidade e responderá em até 15 (quinze) dias.',
        '10.3. Para dados tratados pela CRAI como operadora, siga o item 5.5.',
        '10.4. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',
      ],
    },
    {
      id: 'cookies',
      titulo: '11. Cookies e armazenamento local',
      blocos: [
        '11.1. O site e a plataforma não utilizam cookies. Utilizam apenas armazenamento local do navegador, estritamente necessário ao funcionamento:',
        {
          tabela: {
            colunas: ['Item', 'Onde fica', 'Para que serve', 'Duração'],
            linhas: [
              ['Sessão de login', 'armazenamento local (localStorage)', 'manter o usuário conectado nas áreas de acesso, painel e pagamento', 'até o usuário sair da conta'],
              ['Idioma escolhido', 'armazenamento de sessão (sessionStorage)', 'exibir o site no idioma selecionado', 'até o fechamento da aba'],
              ['Tema escolhido (claro ou escuro)', 'armazenamento de sessão (sessionStorage)', 'exibir o site no tema selecionado', 'até o fechamento da aba'],
              [
                'Controle da animação de abertura',
                'armazenamento de sessão (sessionStorage)',
                'evitar que a animação se repita na mesma visita',
                'até o fechamento da aba',
              ],
            ],
          },
        },
        '11.2. Por serem estritamente necessários, esses itens não dependem de consentimento. A CRAI não utiliza ferramentas de análise de audiência nem de publicidade. Caso passe a utilizá-las, pedirá seu consentimento previamente. Você pode apagar esses dados a qualquer momento nas configurações do navegador.',
      ],
    },
    {
      id: 'seguranca',
      titulo: '12. Segurança',
      blocos: [
        '12.1. A CRAI adota medidas técnicas e administrativas para proteger os dados pessoais, entre elas criptografia em trânsito, armazenamento cifrado de dados de pagamento, senhas armazenadas apenas em forma de hash, isolamento entre os dados de cada empresa cliente, controle de acesso por perfil e verificação de autenticidade das integrações.',
        '12.2. Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares, a CRAI comunicará a ANPD e os titulares afetados, nos termos do art. 48 da LGPD e da regulamentação da ANPD. Quando o incidente envolver dados de assinantes, a empresa controladora será comunicada imediatamente.',
      ],
    },
    {
      id: 'publico',
      titulo: '13. Público',
      blocos: [
        'A CRAI é um serviço destinado a empresas e não é direcionado a menores de 18 anos. Os contratos com as empresas clientes vedam o envio de dados de crianças e adolescentes.',
      ],
    },
    {
      id: 'alteracoes',
      titulo: '14. Alterações',
      blocos: [
        'A CRAI pode atualizar esta Política. A data de vigência no topo indica a versão atual, e alterações relevantes serão comunicadas por e-mail aos usuários com conta.',
      ],
    },
    {
      id: 'contato',
      titulo: '15. Contato',
      blocos: [`${EMAIL} · [ENDEREÇO COMPLETO]`],
    },
  ],
}

export const termosPt: DocumentoLegal = {
  titulo: 'Termos de Uso',
  vigencia: 'Versão 1.0 · Vigência a partir de [DD/MM/AAAA]',
  sumarioAria: 'Cláusulas dos termos',
  secoes: [
    {
      id: 'identificacao',
      titulo: 'Cláusula 1 — Identificação e aceitação',
      blocos: [
        '1.1. Estes Termos de Uso ("Termos") regem o acesso e o uso do site crai.com.br e da plataforma CRAI, que compreende o painel, as integrações, as APIs e os agentes automatizados de recuperação e de retenção de receita (em conjunto, a "Plataforma").',
        '1.2. A Plataforma é oferecida por **[RAZÃO SOCIAL]**, nome fantasia CRAI, inscrita no CNPJ sob o nº [CNPJ], com sede na cidade de São Paulo, Estado de São Paulo, em [ENDEREÇO COMPLETO] ("CRAI").',
        '1.3. A Plataforma é destinada exclusivamente a pessoas jurídicas. Ao criar uma conta, a pessoa física que realiza o cadastro declara ser maior de 18 anos e ter poderes para representar e obrigar a empresa em nome da qual atua.',
        '1.4. A aceitação destes Termos e a ciência da [Política de Privacidade](/privacidade) ocorrem por meio da marcação da caixa correspondente no cadastro. A data e a hora da aceitação ficam registradas. Quem não concordar com estes Termos não deve utilizar a Plataforma.',
      ],
    },
    {
      id: 'definicoes',
      titulo: 'Cláusula 2 — Definições',
      blocos: [
        'Para os fins destes Termos:',
        'a) **Cliente:** a empresa que se cadastra na Plataforma e contrata os serviços da CRAI;',
        'b) **Usuário:** a pessoa física autorizada pelo Cliente a acessar a Plataforma, com papel de proprietário, administrador ou membro;',
        'c) **Assinante:** o cliente final do Cliente, pessoa física ou jurídica, cujas cobranças e cuja assinatura são tratadas pela Plataforma;',
        'd) **Agente:** o sistema automatizado da CRAI que decide e executa as ações de recuperação de cobrança e de retenção junto aos Assinantes;',
        'e) **Dados do Cliente:** os dados, inclusive dados pessoais de Assinantes, que o Cliente envia ou disponibiliza à CRAI por webhook, arquivo, API ou SDK;',
        'f) **Contrato:** o instrumento de prestação de serviços firmado entre a CRAI e o Cliente, com seus anexos, inclusive o Acordo de Tratamento de Dados.',
      ],
    },
    {
      id: 'contrato',
      titulo: 'Cláusula 3 — Relação com o Contrato',
      blocos: [
        '3.1. O cadastro na Plataforma não dá início à prestação dos serviços. A atuação do Agente sobre a base de Assinantes do Cliente começa apenas após a formalização do Contrato e a conclusão da integração técnica.',
        '3.2. As condições comerciais constam exclusivamente do Contrato, inclusive: o plano contratado, os percentuais de remuneração, o método de apuração do ganho incremental contra grupo de controle, a janela de atribuição da retenção, a devolução da remuneração relativa a pagamentos estornados em até 90 (noventa) dias e o procedimento de contestação de valores.',
        '3.3. Em caso de conflito, prevalecem, nesta ordem: o Contrato, o Acordo de Tratamento de Dados e estes Termos.',
      ],
    },
    {
      id: 'beta',
      titulo: 'Cláusula 4 — Fase beta',
      blocos: [
        '4.1. Enquanto a Plataforma estiver identificada como versão beta, funcionalidades podem operar em modo de simulação, ser alteradas ou suspensas, e nenhum pagamento é processado, inclusive a cobrança da remuneração da CRAI.',
        '4.2. O uso da Plataforma em fase beta não gera cobrança ao Cliente.',
      ],
    },
    {
      id: 'cadastro',
      titulo: 'Cláusula 5 — Cadastro e contas',
      blocos: [
        '5.1. O Usuário deve fornecer informações verdadeiras, completas e atualizadas.',
        `5.2. As credenciais de acesso são pessoais e intransferíveis. O Cliente responde pelos atos praticados por meio das contas de seus Usuários e deve comunicar imediatamente à CRAI qualquer suspeita de uso indevido, pelo e-mail ${EMAIL}.`,
        '5.3. Cabe ao Usuário proprietário convidar Usuários, atribuir-lhes papéis e revogar o acesso de quem deixar de atuar em nome do Cliente.',
      ],
    },
    {
      id: 'servicos',
      titulo: 'Cláusula 6 — Descrição dos serviços',
      blocos: [
        '6.1. A CRAI oferece dois planos, nas condições do Contrato:',
        'a) **Standard:** recuperação de cobranças recusadas no Pix Automático;',
        'b) **Premium:** os serviços do plano Standard, acrescidos da identificação de Assinantes com risco de cancelamento e do envio de ofertas de retenção, mediante instalação de SDK na aplicação do Cliente.',
        '6.2. Os serviços são executados de forma autônoma pelo Agente, que decide, dentro das regras desta cláusula e da Cláusula 8, o momento das novas tentativas de cobrança, o momento e o texto das mensagens e a oferta de retenção.',
        '6.3. **O Agente não encaminha o Assinante a atendimento humano.** O Cliente declara conhecer e aceitar essa característica, que é essencial ao serviço. O relacionamento entre a CRAI e o Cliente é conduzido por pessoas.',
        '6.4. O valor e as datas das cobranças são sempre definidos por regras determinísticas, em conformidade com a autorização de Pix Automático concedida pelo Assinante e com a regulamentação do Banco Central do Brasil. O modelo de linguagem utilizado pela CRAI redige apenas o texto das mensagens e não define valores, prazos ou condições de pagamento.',
        '6.5. A CRAI não é instituição de pagamento nem gateway. As cobranças continuam a ser processadas pelo prestador de serviços de pagamento do Cliente.',
      ],
    },
    {
      id: 'contato-assinantes',
      titulo: 'Cláusula 7 — Autorização para contato com Assinantes',
      blocos: [
        '7.1. Com a formalização do Contrato, o Cliente autoriza a CRAI a contatar seus Assinantes em nome do Cliente, pelos canais previstos no Contrato, com a finalidade exclusiva de recuperar cobranças e, no plano Premium, apresentar ofertas de retenção.',
        '7.2. As mensagens identificam o Cliente como credor e remetente. A CRAI não negocia dívidas nem oferece condições fora dos parâmetros autorizados pelo Cliente.',
        '7.3. O Cliente pode, nas configurações da Plataforma, escolher entre as mensagens sugeridas pelo Agente ou autorizar o envio automático. Caso o Cliente tenha optado por aprovar as mensagens e não se manifeste em até 30 (trinta) dias, a mensagem é enviada automaticamente.',
      ],
    },
    {
      id: 'regras-agente',
      titulo: 'Cláusula 8 — Regras de atuação do Agente',
      blocos: [
        'O Agente observa, em toda atuação junto aos Assinantes, as seguintes regras:',
        '8.1. **Regulamentação do Pix Automático.** As novas tentativas de cobrança seguem estritamente a regulamentação do Banco Central do Brasil, inclusive quanto às janelas de liquidação, ao limite de 3 (três) novas tentativas e ao prazo de 7 (sete) dias contados da primeira falha de cada cobrança, que não é reaberto por nova falha da mesma cobrança.',
        '8.2. **Momento da mensagem.** A mensagem de recuperação é enviada somente depois que as novas tentativas de cobrança falharem. Se a autorização de Pix Automático tiver sido revogada, a mensagem é enviada imediatamente, e as tentativas pendentes são canceladas. A data de envio é definida pelo Agente com base na estimativa da melhor oportunidade de pagamento do Assinante.',
        '8.3. **Identificação da automação.** Toda mensagem informa que se trata de contato automatizado.',
        '8.4. **Cobrança sem constrangimento.** Em observância ao art. 42 da Lei nº 8.078/1990 (Código de Defesa do Consumidor), o Agente não expõe o Assinante a ridículo, não o submete a constrangimento ou ameaça e não contata terceiros a respeito da dívida.',
        '8.5. **Descadastro.** Manifestada pelo Assinante a vontade de não receber mensagens, o contato pelo canal correspondente é encerrado imediatamente.',
        '8.6. **Liberdade de cancelamento.** Em observância ao Decreto nº 11.034/2022, a oferta de retenção é apresentada uma única vez por ciclo, e a decisão do Assinante é respeitada de imediato. O Agente não adia, não condiciona e não dificulta o cancelamento.',
        '8.7. **Registro das decisões.** Quando o Agente decide não agir, o motivo é registrado.',
      ],
    },
    {
      id: 'obrigacoes',
      titulo: 'Cláusula 9 — Obrigações do Cliente',
      blocos: [
        'O Cliente se obriga a:',
        'a) possuir base legal para compartilhar os Dados do Cliente com a CRAI e informar seus Assinantes, em sua política de privacidade, sobre o tratamento realizado por prestador de serviços e sobre a existência de decisões automatizadas;',
        'b) manter autorização de Pix Automático válida para toda cobrança submetida a nova tentativa;',
        'c) enviar dados exatos e limitados ao necessário para o serviço, sendo vedado o envio de dados pessoais sensíveis e de dados de crianças e adolescentes, inclusive em campos de texto livre, como o motivo de cancelamento;',
        'd) utilizar os canais de contato previstos no Contrato apenas com Assinantes com quem mantenha relação contratual, respeitadas as políticas dos respectivos provedores;',
        'e) manter em sigilo chaves de API, segredos de webhook e demais credenciais de integração;',
        'f) atender aos pedidos dos titulares de dados dirigidos a ele, com o apoio das ferramentas disponibilizadas pela CRAI;',
        'g) definir com a CRAI o grupo de controle e aceitar que essa parcela de sua base não receba intervenção durante o período de medição.',
      ],
    },
    {
      id: 'protecao-dados',
      titulo: 'Cláusula 10 — Proteção de dados',
      blocos: [
        '10.1. Em relação aos dados pessoais de Assinantes, o Cliente atua como **controlador** e a CRAI como **operadora**, tratando esses dados exclusivamente conforme as instruções do Cliente previstas no Contrato e no Acordo de Tratamento de Dados, nos termos do art. 39 da Lei nº 13.709/2018 (LGPD).',
        '10.2. Em relação aos dados dos Usuários e dos visitantes do site, a CRAI atua como controladora, nos termos da [Política de Privacidade](/privacidade).',
        '10.3. **Vedação de uso próprio.** A CRAI não utiliza os Dados do Cliente, nem estatísticas deles derivadas, ainda que agregadas ou anonimizadas, para treinar modelos compartilhados com outros clientes ou para qualquer finalidade própria, salvo autorização expressa e por escrito do Cliente.',
        '10.4. O ajuste automático do Agente a partir dos resultados das campanhas do Cliente é realizado de forma segregada e beneficia exclusivamente o próprio Cliente.',
        '10.5. Os Dados do Cliente são isolados por empresa, e nenhum Cliente tem acesso aos dados de outro.',
      ],
    },
    {
      id: 'decisoes-automatizadas',
      titulo: 'Cláusula 11 — Decisões automatizadas',
      blocos: [
        '11.1. As decisões do Agente são tomadas unicamente com base em tratamento automatizado. Para permitir que o Cliente atenda aos pedidos formulados por seus Assinantes com fundamento no art. 20 da LGPD, a CRAI registra cada decisão e disponibiliza ao Cliente, na Plataforma e de forma automática, explicação em língua portuguesa dos critérios utilizados.',
        '11.2. A explicação indica os fatores considerados, o sentido em que influenciaram a decisão, o modelo ou a regra aplicada e o momento da decisão, preservados os segredos comercial e industrial da CRAI.',
        '11.3. Pedidos de titulares dirigidos diretamente à CRAI são encaminhados ao Cliente em até 7 (sete) dias.',
      ],
    },
    {
      id: 'remuneracao',
      titulo: 'Cláusula 12 — Remuneração da CRAI',
      blocos: [
        '12.1. A remuneração da CRAI é devida exclusivamente sobre o resultado apurado, nos percentuais e condições do Contrato, e é cobrada por Pix Automático, mediante autorização concedida pelo Cliente na Plataforma, com dia de apuração e limite por cobrança por ele definidos.',
        '12.2. Simulações, projeções e indicadores apresentados no site ou na Plataforma são estimativas e não constituem promessa ou garantia de resultado.',
      ],
    },
    {
      id: 'propriedade-intelectual',
      titulo: 'Cláusula 13 — Propriedade intelectual',
      blocos: [
        '13.1. A Plataforma, os modelos, o software, a marca CRAI e os conteúdos do site pertencem à CRAI. Estes Termos conferem ao Cliente apenas licença de uso limitada, não exclusiva, intransferível e revogável, durante a vigência da relação.',
        '13.2. Os Dados do Cliente permanecem de titularidade do Cliente.',
        '13.3. Sugestões enviadas pelo Cliente podem ser incorporadas à Plataforma sem que isso gere obrigação de pagamento.',
      ],
    },
    {
      id: 'uso-vedado',
      titulo: 'Cláusula 14 — Uso vedado',
      blocos: [
        'É vedado ao Cliente e aos Usuários:',
        'a) realizar engenharia reversa, copiar ou revender a Plataforma ou seus modelos;',
        'b) acessar ou tentar acessar dados, contas ou áreas de terceiros;',
        'c) sobrecarregar a infraestrutura, utilizar robôs não autorizados ou explorar vulnerabilidades;',
        'd) utilizar a Plataforma para cobranças abusivas, enganosas ou contrárias ao Código de Defesa do Consumidor, ou para contatar pessoas sem base legal.',
      ],
    },
    {
      id: 'disponibilidade',
      titulo: 'Cláusula 15 — Disponibilidade',
      blocos: [
        '15.1. A CRAI envida esforços para manter a Plataforma disponível de forma contínua, podendo haver interrupções para manutenção, atualização ou em razão de falhas de terceiros, como provedores de hospedagem, prestadores de serviços de pagamento, instituições financeiras e provedores de mensageria.',
        '15.2. Manutenções programadas serão comunicadas com antecedência sempre que possível.',
      ],
    },
    {
      id: 'responsabilidades',
      titulo: 'Cláusula 16 — Responsabilidades',
      blocos: [
        '16.1. A CRAI atua conforme a vontade do Cliente de recuperar a própria receita e responde pelos danos que causar no exercício dessa atuação, nos termos da lei.',
        '16.2. A CRAI não responde por lucros cessantes, por decisões tomadas pelo Cliente com base nos indicadores da Plataforma, por falhas de sistemas de terceiros nem por dados incorretos enviados pelo Cliente.',
        '16.3. A CRAI não garante resultado específico de recuperação ou de retenção.',
      ],
    },
    {
      id: 'encerramento',
      titulo: 'Cláusula 17 — Suspensão e encerramento',
      blocos: [
        '17.1. A CRAI pode suspender ou encerrar contas que violem estes Termos ou que representem risco à segurança da Plataforma, comunicando o Cliente sempre que possível.',
        `17.2. O Cliente pode encerrar sua conta a qualquer momento, pelo e-mail ${EMAIL}, observadas as condições de rescisão do Contrato.`,
        '17.3. Após o encerramento, os dados seguem os prazos da [Política de Privacidade](/privacidade) e do Acordo de Tratamento de Dados.',
      ],
    },
    {
      id: 'alteracoes',
      titulo: 'Cláusula 18 — Alterações',
      blocos: [
        '18.1. Estes Termos podem ser alterados a qualquer tempo. Alterações relevantes serão comunicadas aos Usuários com antecedência mínima de 30 (trinta) dias, por e-mail e na Plataforma.',
        '18.2. Não concordando com a alteração, o Cliente pode encerrar o uso da Plataforma nas condições do Contrato.',
      ],
    },
    {
      id: 'disposicoes-gerais',
      titulo: 'Cláusula 19 — Disposições gerais',
      blocos: [
        '19.1. Estes Termos são regidos pelas leis da República Federativa do Brasil.',
        '19.2. Fica eleito o foro da Comarca de São Paulo, Estado de São Paulo, com renúncia a qualquer outro, por mais privilegiado que seja.',
        '19.3. A tolerância quanto ao descumprimento de qualquer disposição não implica renúncia ao direito de exigi-la.',
        `19.4. Contato: ${EMAIL} · [ENDEREÇO COMPLETO].`,
      ],
    },
  ],
}
