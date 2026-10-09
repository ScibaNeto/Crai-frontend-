import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider, useLocation, useNavigationType, useOutlet } from 'react-router-dom'
import { AvisoPrivacidade } from './components/layout/AvisoPrivacidade'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { PageTransition } from './components/motion/PageTransition'
import { Preloader } from './components/motion/Preloader'
import { LanguageProvider, useConteudo, useLang } from './lib/i18n'
import { IntroContext } from './lib/intro'
import { deveMostrarPreloader, marcarPreloaderVisto } from './lib/preloader'
import { SessaoProvider } from './lib/SessaoProvider'
import { aplicarSeo } from './lib/seo'
import { rotaDe } from './lib/site'
import { ErroInesperado } from './routes/ErroInesperado'
import { Home } from './routes/Home'

/** Posição de rolagem de cada entrada do histórico (location.key), para o Voltar/Avançar devolver o lugar. */
const posicoesRolagem = new Map<string, number>()

interface DestinoRolagem {
  hash: string
  y: number
}

function rolarPara({ hash, y }: DestinoRolagem) {
  const alvo = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (alvo) alvo.scrollIntoView()
  else window.scrollTo(0, y)
}

/** A primeira página montada não rouba o foco: o primeiro Tab continua sendo o "Pular para o conteúdo". */
let jaMontouPagina = false

/**
 * Congela o outlet da página que está saindo, para a animação de saída não trocar de conteúdo no meio.
 * Ao montar (depois que a página anterior saiu), rola para o destino: topo, âncora da URL (#secao) ou,
 * no Voltar/Avançar, a posição em que o usuário estava.
 */

function OutletCongelado({ destino }: { destino: DestinoRolagem }) {
  const outlet = useOutlet()
  const [congelado] = useState(outlet)
  const [destinoInicial] = useState(destino)
  const [focarInicial] = useState(jaMontouPagina)
  useLayoutEffect(() => {
    rolarPara(destinoInicial)
    jaMontouPagina = true
    // Troca de página: o foco sai do link clicado (que ficou para trás) e vai para o conteúdo novo.
    if (focarInicial) document.getElementById('conteudo')?.focus({ preventScroll: true })
    // A fonte pode chegar depois da montagem e mudar a altura do texto acima da âncora: rola de novo.
    if (!destinoInicial.hash || !document.fonts) return
    let vivo = true
    const y = window.scrollY
    void document.fonts.ready.then(() => {
      if (vivo && Math.abs(window.scrollY - y) < 2) rolarPara(destinoInicial)
    })
    return () => {
      vivo = false
    }
  }, [destinoInicial, focarInicial])
  return congelado
}

function RootLayout() {
  const location = useLocation()
  const tipoNavegacao = useNavigationType()
  const { site, seo } = useConteudo()
  const lang = useLang()
  const [preloading, setPreloading] = useState(deveMostrarPreloader)

  const concluirPreloader = useCallback(() => {
    marcarPreloaderVisto()
    setPreloading(false)
  }, [])

  // A rolagem é controlada aqui: com a restauração automática, o navegador rolava a página que ainda
  // estava saindo e, no fim da animação, tudo voltava ao topo (a posição do Voltar se perdia).
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  // Guarda a posição da entrada que está saindo (roda antes de a página nova rolar).
  useLayoutEffect(() => {
    const chave = location.key
    return () => {
      posicoesRolagem.set(chave, window.scrollY)
    }
  }, [location.key])

  // Mesma página, só o #hash mudou (índice de capítulos, sumário, CTA, Voltar/Avançar): o OutletCongelado
  // não remonta, então a rolagem é feita aqui.
  const anterior = useRef(location)
  useLayoutEffect(() => {
    const antes = anterior.current
    anterior.current = location
    if (antes === location || antes.pathname !== location.pathname) return
    if (location.hash || antes.hash) rolarPara({ hash: location.hash, y: 0 })
  }, [location])

  const salvo = tipoNavegacao === 'POP' ? posicoesRolagem.get(location.key) : undefined
  const destino: DestinoRolagem = salvo !== undefined ? { hash: '', y: salvo } : { hash: location.hash, y: 0 }

  // Título, descrição, canonical e robots acompanham rota e idioma (rotas e indexação em lib/site.ts).
  useEffect(() => {
    const { caminho, rota } = rotaDe(location.pathname)
    aplicarSeo({ ...seo[rota.chave], caminho, indexar: rota.indexar, lang })
  }, [location.pathname, seo, lang])

  return (
    <IntroContext.Provider value={!preloading}>
      <MotionConfig reducedMotion="user">
        <a href="#conteudo" className="skip-link">
          {site.pularConteudo}
        </a>
        <Header />
        <AvisoPrivacidade />
        <main id="conteudo" tabIndex={-1} className="min-h-[70vh] pt-16 outline-none">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <OutletCongelado destino={destino} />
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
      // Primeira carga numa rota lazy: nada na tela até o chunk chegar (igual a hoje, enquanto o JS baixa).
      hydrateFallbackElement: <></>,
      children: [
        { index: true, element: <Home /> },
        { path: 'produto', lazy: () => import('./routes/Produto').then((m) => ({ Component: m.Produto })) },
        { path: 'planos', lazy: () => import('./routes/Planos').then((m) => ({ Component: m.Planos })) },
        { path: 'painel', lazy: () => import('./routes/Painel').then((m) => ({ Component: m.Painel })) },
        { path: 'cadastro', lazy: () => import('./routes/Cadastro').then((m) => ({ Component: m.Cadastro })) },
        { path: 'pagamento', lazy: () => import('./routes/Pagamento').then((m) => ({ Component: m.Pagamento })) },
        { path: 'confirmacao', lazy: () => import('./routes/Confirmacao').then((m) => ({ Component: m.Confirmacao })) },
        { path: 'empresa', lazy: () => import('./routes/Empresa').then((m) => ({ Component: m.Empresa })) },
        { path: 'contato', lazy: () => import('./routes/Contato').then((m) => ({ Component: m.Contato })) },
        { path: 'entrar', lazy: () => import('./routes/Entrar').then((m) => ({ Component: m.Entrar })) },
        { path: 'redefinir-senha', lazy: () => import('./routes/RedefinirSenha').then((m) => ({ Component: m.RedefinirSenha })) },
        { path: 'privacidade', lazy: () => import('./routes/Legal').then((m) => ({ Component: m.Privacidade })) },
        { path: 'termos', lazy: () => import('./routes/Legal').then((m) => ({ Component: m.Termos })) },
        { path: 'dados', lazy: () => import('./routes/CentralPrivacidade').then((m) => ({ Component: m.CentralPrivacidade })) },
        // Endereço antigo da central.
        { path: 'lgpd', element: <Navigate to="/dados" replace /> },
        { path: '*', lazy: () => import('./routes/NotFound').then((m) => ({ Component: m.NotFound })) },
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
