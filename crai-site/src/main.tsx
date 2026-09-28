import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Face com os eixos 'opsz' e 'wght' — necessária para o font-variation-settings do corpo. Ela já cobre
// a face padrão (só 'wght'), que era importada junto e deixava ~210 kB de fontes mortas no build.
import '@fontsource-variable/inter/opsz.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
