/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
  readonly VITE_SITE_URL?: string
  /** Endereço do backend da CRAI, usado pelo painel (/app). Sem ele, o painel mostra só dados de demonstração. */
  readonly VITE_CRAI_API_URL?: string
  /** "1" religa as etiquetas "Demonstração" dos blocos fictícios do painel. */
  readonly VITE_CRAI_MOSTRAR_DEMONSTRACAO?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
