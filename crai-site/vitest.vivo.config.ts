import { defineConfig } from 'vitest/config'

// Teste de integração AO VIVO do painel (`npm run test:vivo`), fora do `npm test` comum: precisa do
// backend da CRAI no ar em modo de desenvolvimento, com dados de exemplo. O endereço vem de
// VITE_CRAI_API_URL; sem ela, http://127.0.0.1:8000. O Supabase fica desligado aqui: estes testes
// usam o login de desenvolvimento do backend.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/painel/**/*.vivo.test.{ts,tsx}'],
    env: {
      VITE_CRAI_API_URL: process.env.VITE_CRAI_API_URL || 'http://127.0.0.1:8000',
      VITE_CRAI_MOSTRAR_DEMONSTRACAO: process.env.VITE_CRAI_MOSTRAR_DEMONSTRACAO || '',
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_PUBLISHABLE_KEY: '',
    },
    testTimeout: 60_000,
    hookTimeout: 60_000,
    fileParallelism: false,
  },
})
