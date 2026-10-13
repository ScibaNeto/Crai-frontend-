import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Dentro do site da CRAI o painel mora em `/app`; sozinho, na raiz.
const noSite = /^\/app(\/|$)/.test(window.location.pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App base={noSite ? '/app' : '/'} />
  </StrictMode>,
)
