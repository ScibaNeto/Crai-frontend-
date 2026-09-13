import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
// Face com eixo 'opsz' (a padrão só traz 'wght') — necessária para o font-variation-settings do corpo.
import '@fontsource-variable/inter/opsz.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
