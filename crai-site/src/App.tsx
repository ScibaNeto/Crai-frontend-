import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { PageTransition } from './components/motion/PageTransition'
import { Preloader } from './components/motion/Preloader'
import { LanguageProvider, useConteudo } from './lib/i18n'
import { IntroContext } from './lib/intro'
import { deveMostrarPreloader, marcarPreloaderVisto } from './lib/preloader'
import { SessaoProvider } from './lib/SessaoProvider'
import { aplicarSeo } from './lib/seo'
import { rotaDe } from './lib/site'
import { Cadastro } from './routes/Cadastro'
import { Confirmacao } from './routes/Confirmacao'
import { Contato } from './routes/Contato'
import { Empresa } from './routes/Empresa'
import { Entrar } from './routes/Entrar'
import { ErroInesperado } from './routes/ErroInesperado'
import { Home } from './routes/Home'
import { Privacidade, Termos } from './routes/Legal'
import { NotFound } from './routes/NotFound'
import { Pagamento } from './routes/Pagamento'
import { Painel } from './routes/Painel'
import { Planos } from './routes/Planos'
import { Produto } from './routes/Produto'
import { RedefinirSenha } from './routes/RedefinirSenha'

/** Congela o outlet da página que está saindo, para a animação de saída não trocar de conteúdo no meio. */
function OutletCongelado() {
  const outlet = useOutlet()
  const [congelado] = useState(outlet)
  return congelado
}

function RootLayout() {
  const location = useLocation()
  const { site, seo } = useConteudo()
  const [preloading, setPreloading] = useState(deveMostrarPreloader)

  const concluirPreloader = useCallback(() => {
    marcarPreloaderVisto()
    setPreloading(false)
  }, [])

  // Título, descrição, canonical e robots acompanham rota e idioma (rotas e indexação em lib/site.ts).
  useEffect(() => {
    const { caminho, rota } = rotaDe(location.pathname)
    aplicarSeo({ ...seo[rota.chave], caminho, indexar: rota.indexar })
  }, [location.pathname, seo])

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
      errorElement: <ErroInesperado />,
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
        { path: 'privacidade', element: <Privacidade /> },
        { path: 'termos', element: <Termos /> },
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
