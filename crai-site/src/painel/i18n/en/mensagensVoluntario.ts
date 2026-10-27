/** Tradução para o inglês: as 3 mensagens do voluntário (14/10/2026). A chave é o texto em português, exatamente como está no código. */
export const mensagensVoluntario: Record<string, string> = {
  // routes/voluntario/Mensagens.tsx
  'Cuidado próximo': 'Personal care',
  'Direto ao ponto': 'Straight to the point',
  'Abriu a página de cancelamento.': 'Opened the cancellation page.',
  'Clicou para rebaixar o plano.': 'Clicked to downgrade the plan.',
  'Os dados de uso mudaram e o risco subiu.': 'The usage data changed and the risk went up.',
  'A base inteira foi avaliada de uma vez.': 'The whole customer base was assessed at once.',
  'O prazo acabou e a recomendada foi enviada.': 'The deadline passed and the recommended one was sent.',
  'A recomendada, enviada pelo modo automático.': 'The recommended one, sent by automatic mode.',
  'Escolhida pela sua empresa.': 'Chosen by your company.',
  'Sinal de risco': 'Risk signal',
  'Um evento do seu sistema subiu o risco deste cliente.': 'An event from your system raised this customer’s risk.',
  'Três mensagens sugeridas': 'Three suggested messages',
  '{oferta}, por {canal}.': '{oferta}, by {canal}.',
  'Outras três pedidas; {n} rodadas no total.': 'Three more requested; {n} rounds in total.',
  'Por {canal}.': 'By {canal}.',
  'Mensagem não enviada': 'Message not sent',
  'O cliente pediu para não receber mensagens.': 'The customer asked not to receive messages.',
  'A entrega falhou.': 'Delivery failed.',
  'Oferta recusada': 'Offer declined',
  'O texto desta mensagem foi apagado depois do prazo de guarda (90 dias depois do envio).': 'The text of this message was deleted after the retention period (90 days after sending).',
  'Modo automático: a oferta sai na hora, com a mensagem recomendada. Para escolher você mesmo, mude o modo na Configuração.': 'Automatic mode: the offer goes out right away, with the recommended message. To choose yourself, change the mode in Settings.',
  'O sistema escreveu três mensagens com a oferta escolhida para cada cliente em risco. Sem escolha no prazo, a recomendada é enviada.': 'The system wrote three messages with the chosen offer for each customer at risk. If nobody chooses by the deadline, the recommended one is sent.',
  'Nenhuma oferta espera a sua escolha agora': 'No offer is waiting for your choice right now',
  'No modo automático nada espera: cada oferta sai na hora. O que foi enviado aparece na coluna Abordagem de cada cliente.': 'In automatic mode nothing waits: each offer goes out right away. What was sent shows in each customer’s Approach column.',
  'Quando o sistema decidir uma oferta por WhatsApp ou e-mail para um cliente em risco, as três mensagens aparecem aqui. No aviso dentro do produto a oferta sai na hora, porque o cliente está no site.': 'When the system decides on an offer by WhatsApp or email for a customer at risk, the three messages show up here. In-product notices go out right away, because the customer is on the site.',
  'Ofertas esperando a escolha da mensagem': 'Offers waiting for a message to be chosen',
  'Oferta: {oferta}': 'Offer: {oferta}',
  'Esperando a sua escolha': 'Waiting for your choice',
  'Não enviada': 'Not sent',
  'Não encontramos esta oferta.': 'We couldn’t find this offer.',
  'Não deu para abrir esta oferta.': 'Couldn’t open this offer.',
  'Nada foi enviado: o cliente pediu para não receber mensagens.': 'Nothing was sent: the customer asked not to receive messages.',
  'A mensagem foi escolhida, mas a entrega falhou.': 'The message was chosen, but delivery failed.',
  'Mensagens da oferta': 'Offer messages',
  'Por que este cliente está em risco': 'Why this customer is at risk',
  'Risco de cancelar, estimado pelo modelo de IA a partir do comportamento.': 'Risk of cancelling, estimated by the AI model from behavior.',
  'Pontuação da régua de regras fixas (de 0 a 100%), não uma probabilidade.': 'Score from the fixed-rule scale (0 to 100%), not a probability.',
  'A pontuação de risco registrada quando a oferta foi decidida.': 'The risk score recorded when the offer was decided.',
  'Aumentou o risco': 'Raised the risk',
  'Reduziu o risco': 'Lowered the risk',
  'Sem fatores registrados: o risco deste cliente foi decidido pela régua de regras fixas.': 'No factors recorded: this customer’s risk was decided by the fixed-rule scale.',
  'O texto destas mensagens foi apagado depois do prazo de guarda; ficou a abordagem.': 'The text of these messages was deleted after the retention period; the approach was kept.',
  'Oferta escolhida: {oferta}. Escolha uma mensagem ou peça outras três. Sem escolha no prazo, a recomendada é enviada.': 'Chosen offer: {oferta}. Pick a message or ask for three more. If nobody chooses by the deadline, the recommended one is sent.',
  'Oferta escolhida: {oferta}. A mensagem marcada como escolhida é a que saiu.': 'Chosen offer: {oferta}. The message marked as chosen is the one that went out.',
  'Escrita pela IA': 'Written by AI',
  'A oferta continua a mesma; muda o jeito de dizer.': 'The offer stays the same; only the wording changes.',
  'Envio automático da recomendada': 'Recommended one sent automatically',
  'Se ninguém escolher até aqui.': 'If nobody chooses by then.',

  // routes/voluntario/Blocos.tsx
  'Ver as 3 mensagens': 'See the 3 messages',
  'Ver as mensagens': 'See the messages',

  // routes/configuracao/Secoes.tsx
  'O sistema sempre escreve 3 mensagens e recomenda uma. A diferença é quem decide. Vale para as cobranças e para as ofertas aos clientes em risco; no aviso dentro do produto a oferta sai na hora.': 'The system always writes 3 messages and recommends one. The difference is who decides. It applies to failed charges and to offers for customers at risk; in-product notices go out right away.',

  // data/api.ts (demonstração)
  'Esta oferta não está esperando uma escolha.': 'This offer isn’t waiting for a choice.',

  // data/mock.ts (demonstração): os mesmos modelos prontos do backend, para a oferta de 20% de desconto
  'Olá! Notamos que você tem usado menos a plataforma, e queremos que ela continue valendo a pena para você. Por isso preparamos uma condição só sua: 20% de desconto por 3 meses. Se fizer sentido, é só responder esta mensagem.':
    'Hi! We noticed you’ve been using the platform less, and we want it to keep being worth it for you. So we’ve prepared something just for you: 20% off for 3 months. If it makes sense, just reply to this message.',
  'Olá! Se algo está pesando no momento, a gente facilita. Uma opção para você: 20% de desconto por 3 meses. Para aceitar, basta responder SIM.':
    'Hi! If something is weighing on you right now, we can make it easier. An option for you: 20% off for 3 months. To accept, just reply YES.',
  'Olá. Temos uma proposta para você continuar: 20% de desconto por 3 meses. Se preferir cancelar, o caminho continua o mesmo, sem nenhuma etapa a mais.':
    'Hi. Here’s an offer for you to stay: 20% off for 3 months. If you’d rather cancel, the way to do it stays the same, with no extra steps.',
  'Olá! Você é importante para a gente, e queremos entender o que pode melhorar. Enquanto isso, deixamos reservado para você: 20% de desconto por 3 meses. Basta responder aqui para ativar.':
    'Hi! You matter to us, and we want to understand what could be better. Meanwhile, we’ve set this aside for you: 20% off for 3 months. Just reply here to activate it.',
  'Olá! Para facilitar a sua rotina, liberamos para você: 20% de desconto por 3 meses. Não precisa preencher nada: responda esta mensagem e a gente ativa.':
    'Hi! To make things easier, we’ve unlocked this for you: 20% off for 3 months. No forms to fill in: reply to this message and we’ll turn it on.',
  'Olá. Uma oferta para você ficar: 20% de desconto por 3 meses. Para aceitar, responda esta mensagem. Cancelar continua igual, sem etapas extras.':
    'Hi. An offer for you to stay: 20% off for 3 months. To accept, reply to this message. Cancelling stays the same, with no extra steps.',
  '3 chamados de suporte nos últimos 30 dias': '3 support tickets in the last 30 days',
  '18 dias sem acesso ao produto': '18 days without using the product',
  '4 funcionalidades usadas nos últimos 30 dias': '4 features used in the last 30 days',
  '740 dias como cliente': '740 days as a customer',
  '0 pagamentos que falharam nos últimos 90 dias': '0 failed payments in the last 90 days',
  '2 pagamentos que falharam nos últimos 90 dias': '2 failed payments in the last 90 days',
  '3 acessos nos últimos 7 dias': '3 logins in the last 7 days',
  'Mensalidade de R$ 1.200,00': 'Monthly fee of R$ 1,200.00',
}
