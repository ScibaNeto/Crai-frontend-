import type { Conteudo } from './conteudo.pt'

// Dados 100% fictícios (empresa NimbusFlow). Usados só no MRR inicial do simulador e no formulário
// de contato, que é de demonstração. O cadastro e o pagamento usam os dados reais do Supabase.

/** MRR inicial do simulador para quem não está logado. */
export const MRR_EXEMPLO = 50_000

const contatoBase = {
  nome: 'Ana Ribeiro',
  email: 'ana.ribeiro@nimbusflow.com.br',
  empresa: 'NimbusFlow',
}

/** Formulário de contato pré-preenchido no idioma do copy recebido. */
export function mockContato(c: Conteudo) {
  return { ...contatoBase, assunto: c.contatoPagina.assuntos[0], mensagem: c.cadastro.mock.mensagem }
}
