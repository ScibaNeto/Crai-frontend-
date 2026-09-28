// Endereço e rotas do site. Lido pelo app (título, canonical, robots de cada página) e pelo
// vite.config.ts (robots.txt e sitemap.xml gerados no build). Sem dependências de navegador nem de Vite.

/** Domínio de produção usado quando `VITE_SITE_URL` não está definida. ⚠️ Confirmar o domínio final. */
export const SITE_URL_PADRAO = 'https://www.crai.com.br'

/** URL base sem barra no fim. */
export function normalizarSiteUrl(url: string | undefined): string {
  return (url || SITE_URL_PADRAO).replace(/\/+$/, '')
}

/** Chave da página em `conteudo.seo`. */
export type ChaveSeo =
  | 'home'
  | 'produto'
  | 'planos'
  | 'painel'
  | 'cadastro'
  | 'pagamento'
  | 'confirmacao'
  | 'empresa'
  | 'contato'
  | 'entrar'
  | 'redefinirSenha'
  | 'privacidade'
  | 'termos'
  | 'naoEncontrada'

interface Rota {
  chave: ChaveSeo
  /** Rotas indexáveis entram no sitemap; as demais recebem `noindex` e ficam bloqueadas no robots.txt. */
  indexar: boolean
  frequencia?: 'weekly' | 'monthly' | 'yearly'
  prioridade?: number
}

export const ROTAS: Record<string, Rota> = {
  '/': { chave: 'home', indexar: true, frequencia: 'weekly', prioridade: 1 },
  '/produto': { chave: 'produto', indexar: true, frequencia: 'monthly', prioridade: 0.8 },
  '/planos': { chave: 'planos', indexar: true, frequencia: 'monthly', prioridade: 0.8 },
  '/empresa': { chave: 'empresa', indexar: true, frequencia: 'monthly', prioridade: 0.6 },
  '/contato': { chave: 'contato', indexar: true, frequencia: 'monthly', prioridade: 0.5 },
  '/cadastro': { chave: 'cadastro', indexar: true, frequencia: 'monthly', prioridade: 0.6 },
  // ⚠️ Fora do Google até os textos legais deixarem de ter placeholders ([RAZÃO SOCIAL], CNPJ, [DOMÍNIO]...).
  // Depois de preencher legal.pt.ts e legal.en.ts, voltar para indexar: true.
  '/privacidade': { chave: 'privacidade', indexar: false, frequencia: 'yearly', prioridade: 0.3 },
  '/termos': { chave: 'termos', indexar: false, frequencia: 'yearly', prioridade: 0.3 },
  '/painel': { chave: 'painel', indexar: false },
  '/pagamento': { chave: 'pagamento', indexar: false },
  '/confirmacao': { chave: 'confirmacao', indexar: false },
  '/entrar': { chave: 'entrar', indexar: false },
  '/redefinir-senha': { chave: 'redefinirSenha', indexar: false },
}

const ROTA_NAO_ENCONTRADA: Rota = { chave: 'naoEncontrada', indexar: false }

/** Rota pelo pathname, tolerando barra no fim. Caminho desconhecido é o 404. */
export function rotaDe(pathname: string): { caminho: string; rota: Rota } {
  const caminho = pathname.replace(/\/+$/, '') || '/'
  return { caminho, rota: ROTAS[caminho] ?? ROTA_NAO_ENCONTRADA }
}
