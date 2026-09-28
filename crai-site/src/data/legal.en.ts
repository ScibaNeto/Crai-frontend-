import type { DocumentoLegal } from './legal.pt'

// English version of the legal documents. Same structure and placeholders as legal.pt.ts; the Portuguese text prevails.

const NOTA = 'This English version is provided for convenience. In case of any conflict, the Portuguese version prevails.'

export const privacidadeEn: DocumentoLegal = {
  titulo: 'Privacy Policy',
  vigencia: 'Effective: [DD/MM/YYYY] · Version 1.0',
  nota: NOTA,
  sumarioAria: 'Policy sections',
  secoes: [
    {
      id: 'quem-somos',
      titulo: '1. Who we are',
      blocos: [
        'CRAI ([LEGAL NAME], CNPJ [00.000.000/0000-00], headquartered at [ADDRESS]) builds a revenue recovery and customer retention platform for SaaS companies. This Policy explains how we handle personal data on the [DOMAIN] website and on the CRAI platform.',
      ],
    },
    {
      id: 'papel',
      titulo: '2. Our role regarding data',
      blocos: [
        {
          lista: [
            '**As controller:** we handle the data of website visitors and of users who create an account (representatives of client companies).',
            '**As processor:** we handle the data of end customers that client companies send to the platform (for example, a SaaS subscriber base). In that case the client company is the controller, defines the purposes and is responsible for having a legal basis to share that data with us.',
          ],
        },
      ],
    },
    {
      id: 'dados-coletados',
      titulo: '3. What data we collect',
      blocos: [
        { subtitulo: '3.1 Website visitors' },
        {
          lista: [
            'Browsing data: IP address, date and time of access, browser, device, pages visited and referral source.',
            'Browser local storage (see section 10).',
            'Data entered in the contact form: name, email, company, subject and message.',
          ],
        },
        { subtitulo: '3.2 Account users' },
        {
          lista: [
            'About the account owner: name, job title, email, phone and password (stored only as a hash, never in readable form).',
            'About the company: legal name, trade name, CNPJ, website, segment, MRR range and number of subscribers.',
            'Chosen plan, date and time these documents were accepted, and whether you want to receive communications.',
            'Platform usage logs.',
          ],
        },
        { subtitulo: '3.3 Data sent by client companies' },
        {
          lista: [
            'Customer bases in CSV/XLSX or through an integration, which may include: customer identifier, payment and billing history, subscribed plan, sign-up and cancellation dates and product usage indicators.',
            '**Website simulator:** the values typed into the simulator are calculated in your own browser and are not sent to or stored by CRAI.',
          ],
        },
        'We do not ask for sensitive personal data (art. 5, II, of the LGPD) and ask that it not be sent.',
      ],
    },
    {
      id: 'finalidades',
      titulo: '4. How we use data and on what legal basis',
      blocos: [
        {
          tabela: {
            colunas: ['Purpose', 'Data', 'Legal basis (LGPD)'],
            linhas: [
              ['Serve the website and keep it running securely', 'Browsing data, IP', 'Legitimate interest (art. 7, IX)'],
              ['Keep access logs required by law', 'IP, date and time', 'Legal obligation (art. 7, II; Marco Civil, art. 15)'],
              ['Reply to contacts and send proposals', 'Form data', 'Pre-contractual steps (art. 7, V)'],
              ['Create and maintain the account', 'Registration data', 'Performance of a contract (art. 7, V)'],
              ['Estimate churn risk, recover payments and produce indicators', 'Base sent by the client company', 'Per the client company’s instructions (controller)'],
              ['Measure audience and improve the website, if an analytics tool is used', 'Analytics cookies', 'Consent (art. 7, I)'],
              ['Send communications about CRAI', 'Email', 'Consent, which can be withdrawn at any time'],
            ],
          },
        },
      ],
    },
    {
      id: 'compartilhamento',
      titulo: '5. Who we share data with',
      blocos: [
        'We do not sell personal data. We only share what is necessary with:',
        {
          lista: [
            '**Infrastructure providers:** website hosting ([HOSTING PROVIDER]) and database and authentication (Supabase).',
            '**Payment providers:** [PSP TO BE DEFINED], once Pix Automático billing is active.',
            '**Language model providers:** only when AI-generated messages are enabled, with the minimum data required.',
            '**Public authorities:** when required by law or court order.',
          ],
        },
        'All suppliers are contractually bound to protect the data and use it only to provide the service to CRAI.',
      ],
    },
    {
      id: 'transferencia-internacional',
      titulo: '6. International transfer',
      blocos: [
        'Some suppliers may store data on servers outside Brazil. In those cases the transfer follows art. 33 of the LGPD, with contractual clauses and equivalent protection safeguards.',
      ],
    },
    {
      id: 'retencao',
      titulo: '7. How long we keep data',
      blocos: [
        {
          tabela: {
            colunas: ['Data', 'Retention'],
            linhas: [
              ['Website access logs', '6 months (Marco Civil, art. 15)'],
              ['Account data', 'While the account is active + [5] years to meet legal obligations'],
              ['Bases sent by client companies', 'For the contract term; deleted within [30] days after it ends, unless the controller instructs otherwise'],
              ['Contact forms', '[24] months'],
            ],
          },
        },
      ],
    },
    {
      id: 'decisoes-automatizadas',
      titulo: '8. Automated decisions',
      blocos: [
        'The platform uses artificial intelligence models to estimate cancellation risk, predict the best billing date and suggest retention actions. These analyses support the client company’s decisions. Data subjects may request a review of decisions made solely on the basis of automated processing and information about the criteria used (art. 20 of the LGPD), subject to commercial and industrial secrecy.',
      ],
    },
    {
      id: 'direitos',
      titulo: '9. Your rights',
      blocos: [
        'Under art. 18 of the LGPD, you may request: confirmation that processing takes place; access to the data; correction of incomplete or outdated data; anonymization, blocking or deletion of unnecessary data or data processed unlawfully; portability; deletion of data processed based on consent; information about sharing; and withdrawal of consent.',
        'If you are an end customer of a company that uses CRAI, please send your request to that company first. If you contact us directly, we will forward the request to it.',
        'We will reply within 15 days. You may also file a complaint with Brazil’s data protection authority (ANPD).',
      ],
    },
    {
      id: 'cookies',
      titulo: '10. Cookies and local storage',
      blocos: [
        {
          tabela: {
            colunas: ['Type', 'What it is for', 'Requires consent?'],
            linhas: [
              ['Essential', 'Keep you signed in and remember your language during the visit', 'No'],
              ['Analytics', 'Understand how the website is used', 'Yes'],
            ],
          },
        },
        'The website does not currently use analytics or advertising cookies. If it starts to, we will ask for consent first through a banner. You can also clear this data in your browser settings.',
      ],
    },
    {
      id: 'seguranca',
      titulo: '11. Security',
      blocos: [
        'We use encryption in transit (HTTPS) and at rest, role-based access control, secure authentication and access logging. In the event of a security incident that poses a relevant risk to data subjects, we will notify the ANPD and those affected, as required by art. 48 of the LGPD.',
      ],
    },
    {
      id: 'publico',
      titulo: '12. Audience',
      blocos: ['CRAI is a service for businesses and is not directed at people under 18.'],
    },
    {
      id: 'encarregado',
      titulo: '13. Data Protection Officer (DPO)',
      blocos: ['[DPO NAME] · [privacidade@DOMAIN]'],
    },
    {
      id: 'alteracoes',
      titulo: '14. Changes',
      blocos: [
        'We may update this Policy. The effective date at the top shows the current version, and relevant changes will be emailed to users with an account.',
      ],
    },
  ],
}

export const termosEn: DocumentoLegal = {
  titulo: 'Terms of Use',
  vigencia: 'Effective: [DD/MM/YYYY] · Version 1.0',
  nota: NOTA,
  sumarioAria: 'Terms sections',
  secoes: [
    {
      id: 'aceitacao',
      titulo: '1. Acceptance',
      blocos: [
        'By accessing the [DOMAIN] website or creating an account on the CRAI platform, you agree to these Terms and to the [Privacy Policy](/privacidade). If you act on behalf of a company, you declare that you are authorized to accept them on its behalf.',
      ],
    },
    {
      id: 'definicoes',
      titulo: '2. Definitions',
      blocos: [
        {
          lista: [
            '**CRAI:** [LEGAL NAME], CNPJ [00.000.000/0000-00].',
            '**Platform:** the website, the dashboard, the simulations, the APIs and the recovery and retention agents.',
            '**Client:** a company that subscribes to or tests the Platform.',
            '**User:** a person authorized by the Client to use the Platform.',
            '**End customers:** the Client’s subscribers, whose data may be sent to the Platform.',
          ],
        },
      ],
    },
    {
      id: 'servico',
      titulo: '3. The service',
      blocos: [
        'The Platform identifies failed payments and cancellation risk, suggests and carries out recovery actions (including billing through Pix Automático, when contracted) and shows indicators in a dashboard. Features marked as **beta** may change, be suspended or be unstable.',
      ],
    },
    {
      id: 'conta',
      titulo: '4. Account',
      blocos: [
        {
          lista: [
            'Users must provide accurate information and keep it up to date.',
            'Credentials are personal and non-transferable; the Client is responsible for what is done with its Users’ accounts.',
            'Suspected misuse must be reported immediately to [contato@DOMAIN].',
          ],
        },
      ],
    },
    {
      id: 'uso-permitido',
      titulo: '5. Acceptable use',
      blocos: [
        'You may not:',
        {
          lista: [
            'Send data without a legal basis, or sensitive personal data of end customers;',
            'Try to access areas, accounts or data belonging to others;',
            'Reverse engineer, copy or resell the Platform or its models;',
            'Overload the infrastructure, use unauthorized bots or exploit vulnerabilities;',
            'Use the Platform for abusive or misleading collection, or collection that breaches Brazil’s Consumer Protection Code.',
          ],
        },
      ],
    },
    {
      id: 'dados-do-cliente',
      titulo: '6. Data sent by the Client',
      blocos: [
        {
          lista: [
            'The Client is the controller of its end customers’ data and warrants that it has a legal basis to share it with CRAI.',
            'CRAI acts as processor, handling that data only to provide the service, as set out in the [Privacy Policy](/privacidade) and the contract.',
            'The Client keeps ownership of its data. CRAI may use **aggregated and anonymized** data to improve its models, without identifying the Client or its end customers.',
          ],
        },
      ],
    },
    {
      id: 'cancelamento-livre',
      titulo: '7. Free cancellation',
      blocos: [
        'CRAI’s retention agents **never hinder, obstruct or delay** a cancellation requested by an end customer. Retention offers are presented as an option, and the cancellation request is always honored, in line with Decreto nº 11.034/2022 (Brazil’s customer service rules).',
      ],
    },
    {
      id: 'remuneracao',
      titulo: '8. Fees',
      blocos: [
        {
          lista: [
            'Commercial terms (plans, percentages and billing method) are set out in the proposal or contract signed with the Client.',
            'Success fees are calculated on the **incremental gain**, measured against a control group, and not on the gross amount recovered.',
            'Simulations on the website and free beta access are not charged.',
          ],
        },
      ],
    },
    {
      id: 'simulacoes',
      titulo: '9. Simulations and results',
      blocos: [
        'Simulations, projections and indicators are **estimates** based on the data provided and on statistical models. They are not a promise or guarantee of financial results.',
      ],
    },
    {
      id: 'propriedade-intelectual',
      titulo: '10. Intellectual property',
      blocos: [
        'The CRAI brand, software, models, design and website content belong to CRAI. These Terms do not transfer any rights over them; they only grant a limited, non-exclusive and revocable license to use them for the duration of the relationship.',
      ],
    },
    {
      id: 'disponibilidade',
      titulo: '11. Availability',
      blocos: [
        'CRAI aims to keep the Platform continuously available, but there may be interruptions for maintenance, updates or third-party failures (hosting, payment providers, financial institutions).',
      ],
    },
    {
      id: 'responsabilidade',
      titulo: '12. Limitation of liability',
      blocos: [
        'To the extent permitted by law, CRAI is not liable for lost profits, indirect losses, decisions made by the Client based on the indicators, failures of third-party systems or incorrect data sent by the Client. CRAI’s total liability is limited to the amount paid by the Client in the [12] months before the event.',
      ],
    },
    {
      id: 'encerramento',
      titulo: '13. Suspension and termination',
      blocos: [
        'CRAI may suspend or close accounts that breach these Terms. The Client may close its account at any time by emailing [contato@DOMAIN]. After closure, data follows the retention periods in the [Privacy Policy](/privacidade).',
      ],
    },
    {
      id: 'alteracoes',
      titulo: '14. Changes',
      blocos: [
        'These Terms may be updated. Relevant changes will be communicated to users with an account at least [15] days in advance. Continued use after they take effect means you agree to them.',
      ],
    },
    {
      id: 'foro',
      titulo: '15. Governing law and jurisdiction',
      blocos: [
        'These Terms are governed by Brazilian law. The courts of [CITY/STATE] are chosen to settle any disputes.',
      ],
    },
    {
      id: 'contato',
      titulo: '16. Contact',
      blocos: ['[contato@DOMAIN] · [ADDRESS]'],
    },
  ],
}
