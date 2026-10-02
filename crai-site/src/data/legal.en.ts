import type { DocumentoLegal } from './legal.pt'

// English version of the legal documents (version 1.0). Same structure and placeholders as legal.pt.ts;
// the Portuguese text prevails.

const NOTA = 'This English version is provided for convenience. In case of any conflict, the Portuguese version prevails.'
const EMAIL = '[agentia.startup@gmail.com](mailto:agentia.startup@gmail.com)'

export const privacidadeEn: DocumentoLegal = {
  titulo: 'Privacy Policy',
  vigencia: 'Version 1.0 · Effective from [DD/MM/YYYY]',
  nota: NOTA,
  sumarioAria: 'Policy sections',
  secoes: [
    {
      id: 'quem-somos',
      titulo: '1. Who we are',
      blocos: [
        '1.1. This Privacy Policy describes how **[LEGAL NAME]**, trading as CRAI, registered under CNPJ [CNPJ], headquartered in the city of São Paulo, State of São Paulo, at [FULL ADDRESS] ("CRAI"), processes personal data on the crai.com.br website and on the CRAI platform, in accordance with Law No. 13,709/2018 (Brazil’s General Data Protection Law, "LGPD") and Law No. 12,965/2014 (Brazilian Internet Civil Framework).',
        '1.2. CRAI builds a revenue recovery and customer retention platform for companies that sell subscriptions.',
      ],
    },
    {
      id: 'papel',
      titulo: '2. Our role regarding data',
      blocos: [
        '2.1. **As controller**, CRAI processes the data of website visitors and of users who create an account on the platform, who are the representatives of client companies. The rules for this data are in section 4.',
        '2.2. **As processor**, CRAI processes the data of subscribers that client companies send to the platform. In this case, the client company is the controller, defines the purposes of processing and is responsible for having a legal basis to share this data with CRAI. The rules for this data are in section 5.',
      ],
    },
    {
      id: 'encarregado',
      titulo: '3. Data protection officer',
      blocos: [
        {
          lista: [
            'Data protection officer (encarregado): **João Vitor Gava Pinheiro**',
            'Deputy: **Gabriel de Frias Ramirez**',
            `Email: ${EMAIL}`,
          ],
        },
        'This is the channel for requests, questions and complaints about personal data.',
      ],
    },
    {
      id: 'controladora',
      titulo: '4. Data processed by CRAI as controller',
      blocos: [
        { subtitulo: '4.1. Website visitors' },
        'a) **Browsing data:** IP address, date and time of access, browser, device, pages visited and referral source.',
        'b) **Contact form:** name, email, company, subject and message.',
        'c) **Simulator:** the values typed into the simulator are calculated in the browser itself and are neither sent to nor stored by CRAI.',
        { subtitulo: '4.2. Users with an account' },
        'a) **Account holder data:** full name, job title, email, phone and password. The password is stored only as a hash and never in readable form.',
        'b) **Company data:** legal name, trade name, CNPJ, website, segment, monthly recurring revenue range, number of active customers, billing email and desired start date.',
        'c) **Account data:** chosen plan, the user’s role in the account (owner, admin or member), emails of invited people, date and time of acceptance of the Terms of Use and of acknowledgment of this Policy, and communication preferences.',
        'd) **Data for billing CRAI’s fee:** account holder, holder’s CPF or CNPJ, institution, branch, account, Pix key, settlement day and limit per charge. During the beta phase, this data is neither sent nor stored.',
        'e) **Platform usage logs.**',
        { subtitulo: '4.3. Purposes and legal bases' },
        {
          tabela: {
            colunas: ['Purpose', 'Data', 'Legal basis'],
            linhas: [
              ['Display the website and keep it running securely', 'browsing data and IP', 'legitimate interest (LGPD, art. 7, IX)'],
              ['Keep the access logs required by law', 'IP, date and time', 'compliance with a legal obligation (LGPD, art. 7, II, and Internet Civil Framework, art. 15)'],
              ['Reply to contacts and send proposals', 'contact form data', 'preliminary procedures related to a contract (LGPD, art. 7, V)'],
              ['Create and maintain the account and provide the service', 'registration and account data', 'performance of a contract (LGPD, art. 7, V)'],
              ['Let the company add colleagues to the account', 'invited person’s email', 'legitimate interest (LGPD, art. 7, IX)'],
              ['Bill CRAI’s fee', 'billing data', 'performance of a contract (LGPD, art. 7, V)'],
              ['Send news about CRAI', 'email', 'consent (LGPD, art. 7, I), revocable at any time'],
            ],
          },
        },
      ],
    },
    {
      id: 'assinantes',
      titulo: '5. Data processed by CRAI as processor',
      blocos: [
        'This section is for anyone who received a message from CRAI on behalf of a company they subscribe to.',
        { subtitulo: '5.1. Who is responsible for your data' },
        'The company you subscribe to is the controller of your data. CRAI provides a service to that company and processes your data only according to its instructions and the contract between them.',
        { subtitulo: '5.2. What data we receive' },
        'a) **Subscription data:** the identifier the company uses for you, subscription amount, billing profile and, where applicable, cancellation date and reason.',
        'b) **Billing data:** transaction identifier, amount, status, financial institution code and the reason Pix Automático payments were declined. The Pix key is stored encrypted and is never sent to artificial intelligence models.',
        'c) **Usage data**, only on the Premium plan: usage events of the company’s service, days since last access and features used in the last 30 days.',
        'd) **Contact data:** phone and, when provided, email, used exclusively to send the messages.',
        'This data reaches CRAI through the company’s payment service provider or is sent by the company itself, by file, API or SDK.',
        { subtitulo: '5.3. What we use it for' },
        'To recover Pix Automático payments that were not completed and, when the company subscribes to the Premium plan, to identify subscribers at risk of canceling and present retention offers.',
        { subtitulo: '5.4. Automated decisions' },
        '5.4.1. CRAI’s actions are decided and carried out by an automated system, without human intervention. This includes the timing of new billing attempts, the timing and text of messages, and the retention offer.',
        '5.4.2. **In payment recovery**, the criteria considered include the decline reason, payment history, number of recent failures, average charge amount, subscription age, and the day and time of the charge. New attempts strictly follow the rules of the Central Bank of Brazil, and the amount and date of the charge follow the Pix Automático authorization you granted.',
        '5.4.3. **In retention**, the criteria considered include the type of usage event, days since last access, features used in the last 30 days and the subscription amount.',
        '5.4.4. Every message states that it is an automated contact. If you ask to stop receiving messages, the request is honored immediately. CRAI never blocks, delays or conditions a cancellation request.',
        '5.4.5. You may request a review of a decision made solely on the basis of automated processing and receive clear information about the criteria used, under LGPD art. 20, subject to trade and industrial secrets. CRAI logs every decision and gives the company the explanation it needs to answer you.',
        { subtitulo: '5.5. How to exercise your rights' },
        'Send your request to the company you subscribe to. If you contact CRAI directly, we will forward the request to that company within 7 (seven) days and let you know.',
      ],
    },
    {
      id: 'treinamento',
      titulo: '6. Model training',
      blocos: [
        '6.1. CRAI’s artificial intelligence models are trained on synthetic data, generated from statistical parameters of public datasets. No subscriber data from client companies is used in this training.',
        '6.2. CRAI does not use client company data, or statistics derived from it, even if aggregated or anonymized, to train shared models or for any purpose of its own, unless the controlling company gives express written authorization. Should such authorization ever exist, this Policy will be updated beforehand.',
      ],
    },
    {
      id: 'compartilhamento',
      titulo: '7. Data sharing',
      blocos: [
        '7.1. CRAI does not sell personal data. It shares only what is necessary with the service providers below, which process data on its behalf and are contractually bound to protect it:',
        {
          tabela: {
            colunas: ['Provider', 'Purpose', 'Processing location'],
            linhas: [
              [
                'Supabase',
                'database, authentication, running the platform and sending access emails (sign-up confirmation and password reset)',
                'United States',
              ],
              ['Anthropic', 'writing the text of messages', 'United States'],
              ['Pagar.me', 'new Pix Automático billing attempts and billing of CRAI’s fee', 'Brazil'],
              ['Meta (WhatsApp Business)', 'sending messages to subscribers', 'outside Brazil'],
              ['Segment', 'collecting usage events, Premium plan only', 'United States'],
              ['[WEBSITE HOSTING PROVIDER]', 'website hosting', '[LOCATION]'],
            ],
          },
        },
        '7.2. CRAI may also share data with public authorities when there is a legal obligation or a court order.',
        '7.3. Any addition or replacement of providers will be reflected in this Policy.',
      ],
    },
    {
      id: 'transferencia-internacional',
      titulo: '8. International transfer',
      blocos: [
        'Some of the providers listed in section 7 process data outside Brazil. These transfers comply with LGPD art. 33 and ANPD Resolution CD/ANPD No. 19/2024, through the data protection contractual clauses signed with each provider.',
      ],
    },
    {
      id: 'retencao',
      titulo: '9. Retention',
      blocos: [
        {
          tabela: {
            colunas: ['Data', 'Period'],
            linhas: [
              ['Website and platform access logs', '6 (six) months, under art. 15 of the Internet Civil Framework'],
              ['Account data', 'while the account is active and for 5 (five) years after closure, to comply with legal obligations and for the regular exercise of rights'],
              ['Contact form', '24 (twenty-four) months'],
              ['Consent to receive news by email', 'until revoked'],
              ['Subscriber data sent by the client company', 'for the term of the contract with the company and for 6 (six) months after it ends'],
              ['Cancellation reason provided by the client company', '90 (ninety) days'],
              ['History of recovery and retention actions', '24 (twenty-four) months, then anonymized'],
              ['Log of automated decisions', '5 (five) years, to allow answers to review requests and possible complaints'],
            ],
          },
        },
        'Once these periods end, the data is deleted or anonymized.',
      ],
    },
    {
      id: 'direitos',
      titulo: '10. Your rights',
      blocos: [
        '10.1. Under LGPD art. 18, you may request: confirmation that processing takes place; access to the data; correction of incomplete, inaccurate or outdated data; anonymization, blocking or deletion of unnecessary or excessive data or data processed in breach of the law; portability; deletion of data processed on the basis of consent; information about the entities with which the data is shared; information about the possibility of not giving consent and its consequences; and revocation of consent.',
        '10.2. For data processed by CRAI as controller, send your request to the email in section 3. CRAI may ask for information to confirm your identity and will reply within 15 (fifteen) days.',
        '10.3. For data processed by CRAI as processor, follow item 5.5.',
        '10.4. You may also file a complaint with the National Data Protection Authority (ANPD).',
      ],
    },
    {
      id: 'cookies',
      titulo: '11. Cookies and local storage',
      blocos: [
        '11.1. The website and the platform do not use cookies. They only use the browser’s local storage, strictly necessary for them to work:',
        {
          tabela: {
            colunas: ['Item', 'Where it lives', 'What it is for', 'Duration'],
            linhas: [
              ['Login session', 'local storage (localStorage)', 'keep the user signed in to the access, dashboard and payment areas', 'until the user signs out'],
              ['Chosen language', 'session storage (sessionStorage)', 'show the website in the selected language', 'until the tab is closed'],
              ['Chosen theme (light or dark)', 'session storage (sessionStorage)', 'show the website in the selected theme', 'until the tab is closed'],
              ['Opening animation control', 'session storage (sessionStorage)', 'keep the animation from repeating in the same visit', 'until the tab is closed'],
            ],
          },
        },
        '11.2. Because they are strictly necessary, these items do not require consent. CRAI does not use audience analytics or advertising tools. If it ever does, it will ask for your consent first. You can clear this data at any time in your browser settings.',
      ],
    },
    {
      id: 'seguranca',
      titulo: '12. Security',
      blocos: [
        '12.1. CRAI adopts technical and administrative measures to protect personal data, including encryption in transit, encrypted storage of payment data, passwords stored only as a hash, isolation between each client company’s data, role-based access control and verification of integration authenticity.',
        '12.2. In the event of a security incident that may pose a relevant risk or harm to data subjects, CRAI will notify the ANPD and the affected data subjects, under LGPD art. 48 and ANPD regulations. When the incident involves subscriber data, the controlling company will be notified immediately.',
      ],
    },
    {
      id: 'publico',
      titulo: '13. Audience',
      blocos: [
        'CRAI is a service for businesses and is not directed at people under 18. Contracts with client companies prohibit sending data of children and adolescents.',
      ],
    },
    {
      id: 'alteracoes',
      titulo: '14. Changes',
      blocos: [
        'CRAI may update this Policy. The effective date at the top shows the current version, and relevant changes will be communicated by email to users with an account.',
      ],
    },
    {
      id: 'contato',
      titulo: '15. Contact',
      blocos: [`${EMAIL} · [FULL ADDRESS]`],
    },
  ],
}

export const termosEn: DocumentoLegal = {
  titulo: 'Terms of Use',
  vigencia: 'Version 1.0 · Effective from [DD/MM/YYYY]',
  nota: NOTA,
  sumarioAria: 'Clauses of the terms',
  secoes: [
    {
      id: 'identificacao',
      titulo: 'Clause 1 — Identification and acceptance',
      blocos: [
        '1.1. These Terms of Use ("Terms") govern access to and use of the crai.com.br website and the CRAI platform, which includes the dashboard, integrations, APIs and automated revenue recovery and retention agents (together, the "Platform").',
        '1.2. The Platform is offered by **[LEGAL NAME]**, trading as CRAI, registered under CNPJ [CNPJ], headquartered in the city of São Paulo, State of São Paulo, at [FULL ADDRESS] ("CRAI").',
        '1.3. The Platform is intended exclusively for legal entities. By creating an account, the individual who signs up declares to be over 18 and to have the authority to represent and bind the company on whose behalf they act.',
        '1.4. Acceptance of these Terms and acknowledgment of the [Privacy Policy](/privacidade) take place by checking the corresponding box during sign-up. The date and time of acceptance are recorded. Anyone who does not agree with these Terms should not use the Platform.',
      ],
    },
    {
      id: 'definicoes',
      titulo: 'Clause 2 — Definitions',
      blocos: [
        'For the purposes of these Terms:',
        'a) **Client:** the company that signs up to the Platform and contracts CRAI’s services;',
        'b) **User:** the individual authorized by the Client to access the Platform, with the role of owner, admin or member;',
        'c) **Subscriber:** the Client’s end customer, an individual or a legal entity, whose charges and subscription are handled by the Platform;',
        'd) **Agent:** CRAI’s automated system that decides and carries out billing recovery and retention actions with Subscribers;',
        'e) **Client Data:** the data, including Subscribers’ personal data, that the Client sends or makes available to CRAI by webhook, file, API or SDK;',
        'f) **Contract:** the service agreement signed between CRAI and the Client, with its annexes, including the Data Processing Agreement.',
      ],
    },
    {
      id: 'contrato',
      titulo: 'Clause 3 — Relationship with the Contract',
      blocos: [
        '3.1. Signing up to the Platform does not start the provision of services. The Agent only starts acting on the Client’s Subscriber base after the Contract is formalized and the technical integration is complete.',
        '3.2. Commercial terms are set out exclusively in the Contract, including: the contracted plan, fee percentages, the method for measuring incremental gain against a control group, the retention attribution window, the refund of fees related to payments reversed within 90 (ninety) days and the procedure for disputing amounts.',
        '3.3. In case of conflict, the following prevail, in this order: the Contract, the Data Processing Agreement and these Terms.',
      ],
    },
    {
      id: 'beta',
      titulo: 'Clause 4 — Beta phase',
      blocos: [
        '4.1. While the Platform is identified as a beta version, features may run in simulation mode, be changed or suspended, and no payment is processed, including the billing of CRAI’s fee.',
        '4.2. Use of the Platform during the beta phase does not generate any charge to the Client.',
      ],
    },
    {
      id: 'cadastro',
      titulo: 'Clause 5 — Sign-up and accounts',
      blocos: [
        '5.1. The User must provide true, complete and up-to-date information.',
        `5.2. Access credentials are personal and non-transferable. The Client is responsible for acts carried out through its Users’ accounts and must immediately notify CRAI of any suspected misuse at ${EMAIL}.`,
        '5.3. The owner User is responsible for inviting Users, assigning their roles and revoking access for anyone who no longer acts on behalf of the Client.',
      ],
    },
    {
      id: 'servicos',
      titulo: 'Clause 6 — Description of services',
      blocos: [
        '6.1. CRAI offers two plans, under the conditions of the Contract:',
        'a) **Standard:** recovery of charges declined in Pix Automático;',
        'b) **Premium:** the Standard plan services, plus identification of Subscribers at risk of canceling and sending of retention offers, upon installation of an SDK in the Client’s application.',
        '6.2. The services are performed autonomously by the Agent, which decides, within the rules of this clause and Clause 8, the timing of new billing attempts, the timing and text of messages, and the retention offer.',
        '6.3. **The Agent does not refer the Subscriber to human support.** The Client declares that it knows and accepts this characteristic, which is essential to the service. The relationship between CRAI and the Client is handled by people.',
        '6.4. Charge amounts and dates are always defined by deterministic rules, in accordance with the Pix Automático authorization granted by the Subscriber and the regulations of the Central Bank of Brazil. The language model used by CRAI only writes the text of messages and does not define amounts, deadlines or payment terms.',
        '6.5. CRAI is neither a payment institution nor a gateway. Charges continue to be processed by the Client’s payment service provider.',
      ],
    },
    {
      id: 'contato-assinantes',
      titulo: 'Clause 7 — Authorization to contact Subscribers',
      blocos: [
        '7.1. Once the Contract is formalized, the Client authorizes CRAI to contact its Subscribers on the Client’s behalf, through the channels set out in the Contract, for the sole purpose of recovering charges and, on the Premium plan, presenting retention offers.',
        '7.2. Messages identify the Client as creditor and sender. CRAI does not negotiate debts or offer conditions outside the parameters authorized by the Client.',
        '7.3. In the Platform settings, the Client may choose between the messages suggested by the Agent or authorize automatic sending. If the Client has chosen to approve messages and does not respond within 30 (thirty) days, the message is sent automatically.',
      ],
    },
    {
      id: 'regras-agente',
      titulo: 'Clause 8 — Agent rules of conduct',
      blocos: [
        'In every interaction with Subscribers, the Agent follows these rules:',
        '8.1. **Pix Automático regulations.** New billing attempts strictly follow the regulations of the Central Bank of Brazil, including settlement windows, the limit of 3 (three) new attempts and the period of 7 (seven) days counted from the first failure of each charge, which is not reopened by a new failure of the same charge.',
        '8.2. **Message timing.** The recovery message is sent only after new billing attempts have failed. If the Pix Automático authorization has been revoked, the message is sent immediately and pending attempts are canceled. The sending date is set by the Agent based on its estimate of the Subscriber’s best opportunity to pay.',
        '8.3. **Disclosure of automation.** Every message states that it is an automated contact.',
        '8.4. **Collection without embarrassment.** In compliance with art. 42 of Law No. 8,078/1990 (Consumer Protection Code), the Agent does not expose the Subscriber to ridicule, does not subject them to embarrassment or threats, and does not contact third parties about the debt.',
        '8.5. **Opt-out.** Once the Subscriber says they do not want to receive messages, contact through that channel ends immediately.',
        '8.6. **Freedom to cancel.** In compliance with Decree No. 11,034/2022, the retention offer is presented only once per cycle, and the Subscriber’s decision is respected immediately. The Agent does not postpone, condition or hinder cancellation.',
        '8.7. **Decision log.** When the Agent decides not to act, the reason is recorded.',
      ],
    },
    {
      id: 'obrigacoes',
      titulo: 'Clause 9 — Client obligations',
      blocos: [
        'The Client undertakes to:',
        'a) have a legal basis to share Client Data with CRAI and inform its Subscribers, in its privacy policy, about processing carried out by a service provider and about the existence of automated decisions;',
        'b) keep a valid Pix Automático authorization for every charge submitted to a new attempt;',
        'c) send accurate data limited to what the service needs; sending sensitive personal data and data of children and adolescents is prohibited, including in free-text fields such as the cancellation reason;',
        'd) use the contact channels set out in the Contract only with Subscribers with whom it has a contractual relationship, respecting the policies of the respective providers;',
        'e) keep API keys, webhook secrets and other integration credentials confidential;',
        'f) handle data subject requests addressed to it, with the support of the tools provided by CRAI;',
        'g) define the control group with CRAI and accept that this portion of its base receives no intervention during the measurement period.',
      ],
    },
    {
      id: 'protecao-dados',
      titulo: 'Clause 10 — Data protection',
      blocos: [
        '10.1. Regarding Subscribers’ personal data, the Client acts as **controller** and CRAI as **processor**, processing this data exclusively according to the Client’s instructions set out in the Contract and in the Data Processing Agreement, under art. 39 of Law No. 13,709/2018 (LGPD).',
        '10.2. Regarding the data of Users and website visitors, CRAI acts as controller, under the [Privacy Policy](/privacidade).',
        '10.3. **No use for CRAI’s own purposes.** CRAI does not use Client Data, or statistics derived from it, even if aggregated or anonymized, to train models shared with other clients or for any purpose of its own, unless the Client gives express written authorization.',
        '10.4. The Agent’s automatic tuning based on the results of the Client’s campaigns is done in a segregated way and benefits only that Client.',
        '10.5. Client Data is isolated per company, and no Client has access to another’s data.',
      ],
    },
    {
      id: 'decisoes-automatizadas',
      titulo: 'Clause 11 — Automated decisions',
      blocos: [
        '11.1. The Agent’s decisions are made solely on the basis of automated processing. To allow the Client to answer requests made by its Subscribers under LGPD art. 20, CRAI logs every decision and automatically provides the Client, on the Platform, with an explanation in Portuguese of the criteria used.',
        '11.2. The explanation indicates the factors considered, the direction in which they influenced the decision, the model or rule applied and the time of the decision, preserving CRAI’s trade and industrial secrets.',
        '11.3. Data subject requests sent directly to CRAI are forwarded to the Client within 7 (seven) days.',
      ],
    },
    {
      id: 'remuneracao',
      titulo: 'Clause 12 — CRAI’s fee',
      blocos: [
        '12.1. CRAI’s fee is due exclusively on the measured result, at the percentages and conditions of the Contract, and is billed via Pix Automático, under an authorization granted by the Client on the Platform, with a settlement day and a limit per charge defined by the Client.',
        '12.2. Simulations, projections and indicators shown on the website or on the Platform are estimates and do not constitute a promise or guarantee of results.',
      ],
    },
    {
      id: 'propriedade-intelectual',
      titulo: 'Clause 13 — Intellectual property',
      blocos: [
        '13.1. The Platform, models, software, the CRAI brand and the website content belong to CRAI. These Terms grant the Client only a limited, non-exclusive, non-transferable and revocable license of use, for the duration of the relationship.',
        '13.2. Client Data remains the property of the Client.',
        '13.3. Suggestions sent by the Client may be incorporated into the Platform without creating any payment obligation.',
      ],
    },
    {
      id: 'uso-vedado',
      titulo: 'Clause 14 — Prohibited use',
      blocos: [
        'The Client and Users may not:',
        'a) reverse engineer, copy or resell the Platform or its models;',
        'b) access or attempt to access third-party data, accounts or areas;',
        'c) overload the infrastructure, use unauthorized bots or exploit vulnerabilities;',
        'd) use the Platform for abusive or misleading collection, or collection contrary to the Consumer Protection Code, or to contact people without a legal basis.',
      ],
    },
    {
      id: 'disponibilidade',
      titulo: 'Clause 15 — Availability',
      blocos: [
        '15.1. CRAI makes efforts to keep the Platform continuously available, and there may be interruptions for maintenance, updates or due to third-party failures, such as hosting providers, payment service providers, financial institutions and messaging providers.',
        '15.2. Scheduled maintenance will be announced in advance whenever possible.',
      ],
    },
    {
      id: 'responsabilidades',
      titulo: 'Clause 16 — Liability',
      blocos: [
        '16.1. CRAI acts according to the Client’s wish to recover its own revenue and is liable for damage it causes in the course of that activity, under the law.',
        '16.2. CRAI is not liable for lost profits, for decisions made by the Client based on the Platform’s indicators, for failures of third-party systems or for incorrect data sent by the Client.',
        '16.3. CRAI does not guarantee any specific recovery or retention result.',
      ],
    },
    {
      id: 'encerramento',
      titulo: 'Clause 17 — Suspension and termination',
      blocos: [
        '17.1. CRAI may suspend or close accounts that breach these Terms or that pose a risk to the Platform’s security, notifying the Client whenever possible.',
        `17.2. The Client may close its account at any time by email at ${EMAIL}, subject to the termination conditions of the Contract.`,
        '17.3. After closure, data follows the periods set out in the [Privacy Policy](/privacidade) and in the Data Processing Agreement.',
      ],
    },
    {
      id: 'alteracoes',
      titulo: 'Clause 18 — Changes',
      blocos: [
        '18.1. These Terms may be changed at any time. Relevant changes will be communicated to Users at least 30 (thirty) days in advance, by email and on the Platform.',
        '18.2. If it does not agree with the change, the Client may stop using the Platform under the conditions of the Contract.',
      ],
    },
    {
      id: 'disposicoes-gerais',
      titulo: 'Clause 19 — General provisions',
      blocos: [
        '19.1. These Terms are governed by the laws of the Federative Republic of Brazil.',
        '19.2. The courts of the City of São Paulo, State of São Paulo, are chosen as the exclusive venue, waiving any other, however privileged.',
        '19.3. Tolerance of a breach of any provision does not imply a waiver of the right to enforce it.',
        `19.4. Contact: ${EMAIL} · [FULL ADDRESS].`,
      ],
    },
  ],
}
