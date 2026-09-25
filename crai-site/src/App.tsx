import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { PageTransition } from './components/motion/PageTransition'
import { Preloader } from './components/motion/Preloader'
import type { Conteudo } from './data/conteudo.pt'
import { LanguageProvider, useConteudo } from './lib/i18n'
import { IntroContext } from './lib/intro'
import { deveMostrarPreloader, marcarPreloaderVisto } from './lib/preloader'
import { SessaoProvider } from './lib/SessaoProvider'
import { Cadastro } from './routes/Cadastro'
import { Confirmacao } from './routes/Confirmacao'
import { Contato } from './routes/Contato'
import { Empresa } from './routes/Empresa'
import { Entrar } from './routes/Entrar'
import { Home } from './routes/Home'
import { NotFound } from './routes/NotFound'
import { Pagamento } from './routes/Pagamento'
import { Painel } from './routes/Painel'
import { Planos } from './routes/Planos'
import { Produto } from './routes/Produto'
import { RedefinirSenha } from './routes/RedefinirSenha'

/** `<title>` de cada rota, pela chave em `conteudo.titulos`. Rota desconhecida cai no 404. */
const TITULO_POR_ROTA: Record<string, keyof Conteudo['titulos']> = {
  '/': 'home',
  '/produto': 'produto',
  '/planos': 'planos',
  '/painel': 'painel',
  '/cadastro': 'cadastro',
  '/pagamento': 'pagamento',
  '/confirmacao': 'confirmacao',
  '/empresa': 'empresa',
  '/contato': 'contato',
  '/entrar': 'entrar',
  '/redefinir-senha': 'redefinirSenha',
}

/** Congela o outlet da página que está saindo, para a animação de saída não trocar de conteúdo no meio. */
function OutletCongelado() {
  const outlet = useOutlet()
  const [congelado] = useState(outlet)
  return congelado
}

function RootLayout() {
  const location = useLocation()
  const { site, titulos, metaDescricao } = useConteudo()
  const [preloading, setPreloading] = useState(deveMostrarPreloader)

  const concluirPreloader = useCallback(() => {
    marcarPreloaderVisto()
    setPreloading(false)
  }, [])

  // Título e descrição acompanham rota e idioma.
  useEffect(() => {
    const chave = TITULO_POR_ROTA[location.pathname.replace(/\/+$/, '') || '/'] ?? 'naoEncontrada'
    document.title = titulos[chave]
    document.querySelector('meta[name="description"]')?.setAttribute('content', metaDescricao)
  }, [location.pathname, titulos, metaDescricao])

  return (
    <IntroContext.Provider value={!preloading}>
      <MotionConfig reducedMotion="user">
        <a href="#conteudo" className="skip-link">
          {site.pularConteudo}
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1} className="min-h-[70vh] pt-16 outline-none">
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <PageTransition key={location.pathname}>
              <OutletCongelado />
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
        <AnimatePresence>{preloading ? <Preloader onDone={concluirPreloader} /> : null}</AnimatePresence>
      </MotionConfig>
    </IntroContext.Provider>
  )
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'produto', element: <Produto /> },
        { path: 'planos', element: <Planos /> },
        { path: 'painel', element: <Painel /> },
        { path: 'cadastro', element: <Cadastro /> },
        { path: 'pagamento', element: <Pagamento /> },
        { path: 'confirmacao', element: <Confirmacao /> },
        { path: 'empresa', element: <Empresa /> },
        { path: 'contato', element: <Contato /> },
        { path: 'entrar', element: <Entrar /> },
        { path: 'redefinir-senha', element: <RedefinirSenha /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
)

export default function App() {
  return (
    <LanguageProvider>
      <SessaoProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </SessaoProvider>
    </LanguageProvider>
  )
}
