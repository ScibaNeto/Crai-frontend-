import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Face com os eixos 'opsz' e 'wght' — necessária para o font-variation-settings do corpo. Ela já cobre
// a face padrão (só 'wght'), que era importada junto e deixava ~210 kB de fontes mortas no build.
import '@fontsource-variable/inter/opsz.css'
import './index.css'
import App from './App.tsx'
import { carregarConteudo, lerIdiomaSalvo } from './lib/i18n'

// Um import() que falha fica guardado pelo navegador como falho: novas tentativas não baixam o chunk de novo
// (acontece com rede instável ou logo depois de uma publicação, quando os arquivos antigos somem).
// Recarrega uma única vez por sessão, quando houver rede.
window.addEventListener('vite:preloadError', () => {
  const recarregar = () => {
    try {
      if (window.sessionStorage.getItem('crai:chunk-recarregado') === '1') return
      window.sessionStorage.setItem('crai:chunk-recarregado', '1')
    } catch {
      return
    }
    window.location.reload()
  }
  if (navigator.onLine) recarregar()
  else window.addEventListener('online', recarregar, { once: true })
})

// Quem já escolheu inglês: o texto chega antes da primeira pintura (sem piscar em português).
// Se o arquivo do inglês não chegar, o site abre em português em vez de ficar em branco.
await carregarConteudo(lerIdiomaSalvo()).catch(() => {})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
