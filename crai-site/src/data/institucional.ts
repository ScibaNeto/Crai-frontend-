// Dados institucionais repetidos em vários lugares do site. Fonte única: mude aqui e o rodapé, o aviso de
// privacidade, as páginas /termos, /privacidade, /dados e /contato acompanham.

/**
 * Canal de contato e do encarregado (LGPD).
 * ⚠️ Trocar pelo e-mail do domínio (ex.: contato@crai.ia.br) quando ele existir: basta mudar esta linha.
 */
export const EMAIL_CONTATO = 'agentia.startup@gmail.com'

/**
 * Versão e início de vigência dos Termos de Uso e da Política de Privacidade.
 * Mudou um documento? Suba a versão e a data aqui: o aviso de privacidade volta a aparecer para quem já
 * tinha fechado (ele guarda a versão que a pessoa viu).
 */
export const DOCUMENTOS_LEGAIS = {
  versao: '1.0',
  /** 5 de janeiro de 2027. Em inglês vai por extenso: 05/01 seria lido como 1º de maio nos EUA. */
  vigencia: { pt: '05/01/2027', en: 'January 5, 2027' },
} as const
