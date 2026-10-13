import { defineConfig } from 'vitest/config'

// Testes do painel do cliente (`npm test`): adaptadores, camada HTTP com fetch de mentira, o login
// e as telas em demonstração. Não precisam de backend nem do Supabase. As variáveis são zeradas
// aqui para que um `.env.local` da máquina não ligue o modo real nem o login real nestes testes;
// os testes que precisam de uma delas a ligam.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/painel/**/*.test.{ts,tsx}'],
    exclude: ['src/painel/**/*.vivo.test.{ts,tsx}', 'node_modules/**'],
    env: {
      VITE_CRAI_API_URL: '',
      VITE_CRAI_MOSTRAR_DEMONSTRACAO: '',
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_PUBLISHABLE_KEY: '',
    },
  },
})
