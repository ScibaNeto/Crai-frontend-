import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { cx } from '../../lib/cx'
import { nomeExibicao } from '../../lib/empresa'
import { useConteudo, useLang, useSetLang } from '../../lib/i18n'
import { EASE_EXPO } from '../../lib/intro'
import { isLang, LANG_HTML } from '../../lib/lang'
import { useSessao } from '../../lib/useSessao'
import { alternarTema, useTema } from '../../lib/tema'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { IconArrowUpRight, IconClose, IconMenu, IconMoon, IconSun } from '../icons/Icons'
import { ScrollProgress } from '../motion/ScrollProgress'
import { Button } from '../ui/Button'
import { Wordmark } from '../ui/Wordmark'

/** PT / EN: o ativo marcado por peso, com uma barra que desliza entre os dois por layoutId. */
function LanguageSwitch({ id, className }: { id: string; className?: string }) {
  const lang = useLang()
  const setLang = useSetLang()
  const { idioma } = useConteudo()

  return (
    <div role="group" aria-label={idioma.grupoAria} className={cx('flex items-center', className)}>
      {idioma.opcoes.map((opcao) => {
        const codigo = opcao.id
        if (!isLang(codigo)) return null
        const ativo = codigo === lang
        return (
          <button
            key={codigo}
            type="button"
            lang={LANG_HTML[codigo]}
            aria-pressed={ativo}
            aria-label={`${opcao.rotulo}: ${opcao.nome}`}
            onClick={() => setLang(codigo)}
            className={cx(
              'relative h-9 rounded-[4px] px-2.5 font-mono text-[13px] tracking-[0.06em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber',
              ativo ? 'font-[680] text-paper' : 'font-[440] text-silver hover:text-paper',
            )}
          >
            {opcao.rotulo}
            {ativo ? (
              <motion.span
                layoutId={`idioma-barra-${id}`}
                aria-hidden="true"
                className="absolute inset-x-2.5 bottom-1 h-px bg-orange"
                transition={{ type: 'spring', stiffness: 520, damping: 40 }}
              />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

/** Claro / escuro: o ícone mostra o tema para o qual o clique leva. */
function ThemeSwitch({ className }: { className?: string }) {
  const { site } = useConteudo()
  const tema = useTema()
  const reduced = useReducedMotion()
  const claro = tema === 'claro'
  const rotulo = claro ? site.temaEscuro : site.temaClaro

  return (
    <button
      type="button"
      aria-label={rotulo}
      title={rotulo}
      onClick={alternarTema}
      className={cx(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-silver transition-colors duration-150 hover:bg-paper/5 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber',
        className,
      )}
    >
      <motion.span
        key={tema}
        className="inline-flex"
        initial={reduced ? false : { rotate: -60, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.32, ease: EASE_EXPO }}
      >
        {claro ? <IconMoon size={18} /> : <IconSun size={18} />}
      </motion.span>
    </button>
  )
}

/** Navegação em pílula de vidro (IrisFlow): o vidro desliza até o link sob o cursor e volta ao ativo. */
function NavPill() {
  const { site } = useConteudo()
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const ativo = site.nav.find((item) => pathname === item.para || pathname.startsWith(`${item.para}/`))?.para ?? null
  const [sobre, setSobre] = useState<string | null>(null)
  const alvo = sobre ?? ativo

  return (
    <nav aria-label={site.navAria} className="hidden lg:block">
      <ul className="nav-pill" onMouseLeave={() => setSobre(null)}>
        {site.nav.map((item) => (
          <li key={item.para} className="relative">
            {alvo === item.para ? (
              <motion.span
                layoutId="nav-pill-glass"
                aria-hidden="true"
                className="nav-pill__glass"
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36, mass: 0.7 }}
              />
            ) : null}
            <NavLink
              to={item.para}
              onMouseEnter={() => setSobre(item.para)}
              onFocus={() => setSobre(item.para)}
              onBlur={() => setSobre(null)}
              className="nav-pill__link focus-visible:outline-offset-1"
            >
              {item.rotulo}
            </NavLink>
            {ativo === item.para ? <span aria-hidden="true" className="nav-pill__dot" /> : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Header fixo; ganha vidro mais denso depois de 24px de rolagem. Filete de progresso no topo. */
export function Header() {
  const { site } = useConteudo()
  const { sessao, empresa, sair } = useSessao()
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const [rolou, setRolou] = useState(() => window.scrollY > 24)
  const [aberto, setAberto] = useState(false)
  const botaoMenu = useRef<HTMLButtonElement>(null)
  const [desenho, setDesenho] = useState(0)
  const { pathname } = useLocation()
  const [rotaAnterior, setRotaAnterior] = useState(pathname)

  // Fecha o menu mobile ao trocar de rota (ajuste de estado durante o render, sem effect).
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname)
    setAberto(false)
  }

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setAberto(false)
      // O foco estava num link do menu, que some: devolve ao botão que abriu o menu.
      botaoMenu.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  const redesenhar = () => setDesenho((n) => n + 1)

  async function onSair() {
    await sair()
    navigate('/')
  }

  return (
    <>
      <ScrollProgress />
      <header
        className={cx(
          'header-shell fixed inset-x-0 top-0 z-50 border-b',
          rolou || aberto ? 'is-scrolled border-line' : 'border-transparent bg-transparent',
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6">
          <Link
            to="/"
            aria-label={site.inicioAria}
            onMouseEnter={redesenhar}
            onFocus={redesenhar}
            className="rounded-[4px] text-[23px] focus-visible:outline-offset-4"
          >
            <Wordmark drawKey={desenho} instant={desenho === 0} decorative />
          </Link>

          <NavPill />

          <div className="flex items-center gap-2 lg:gap-3">
            <LanguageSwitch id="desktop" className="hidden lg:flex" />
            {/* No celular a barra já está cheia: o seletor de tema vai para dentro do menu. */}
            <ThemeSwitch className="max-lg:hidden" />
            {sessao ? (
              <>
                {empresa ? (
                  <span className="t-apoio hidden max-w-[16ch] truncate text-silver xl:inline" title={nomeExibicao(empresa)}>
                    {nomeExibicao(empresa)}
                  </span>
                ) : null}
                <Button variant="ghost" size="sm" className="hidden rounded-full sm:inline-flex" onClick={onSair}>
                  {site.sair}
                </Button>
              </>
            ) : (
              <>
                <Button to="/entrar" variant="ghost" size="sm" className="hidden rounded-full border-transparent sm:inline-flex">
                  {site.entrar}
                </Button>
                <Button to="/cadastro" size="sm" className="hidden rounded-full sm:inline-flex">
                  {site.criarConta}
                </Button>
              </>
            )}
            <button
              ref={botaoMenu}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper hover:bg-paper/5 lg:hidden"
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              aria-label={aberto ? site.fecharMenu : site.abrirMenu}
              onClick={() => setAberto((v) => !v)}
            >
              {aberto ? <IconClose size={20} /> : <IconMenu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {aberto ? (
            <motion.nav
              id="menu-mobile"
              aria-label={site.navAria}
              className="overflow-hidden lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE_EXPO }}
            >
              {/* Rola por dentro em telas baixas (celular deitado): antes os últimos itens ficavam fora de alcance. */}
              <ul className="container-site flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto overscroll-contain pt-2 pb-6">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.para}
                    className="border-b border-line"
                    initial={reduced ? false : { opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.46, delay: 0.05 + i * 0.05, ease: EASE_EXPO }}
                  >
                    <NavLink
                      to={item.para}
                      // Tocar na página atual não muda a rota; fecha o menu mesmo assim.
                      onClick={() => setAberto(false)}
                      className={({ isActive }) =>
                        cx('flex items-center justify-between py-4 text-[22px] font-[600] tracking-[-0.02em]', isActive ? 'text-paper' : 'text-silver')
                      }
                    >
                      {item.rotulo}
                      <IconArrowUpRight size={18} className="text-orange" />
                    </NavLink>
                  </motion.li>
                ))}
                <li className="flex items-center justify-between gap-4 pt-5">
                  <span className="flex items-center gap-3">
                    <LanguageSwitch id="mobile" className="-ml-2.5" />
                    <ThemeSwitch />
                  </span>
                  {sessao ? (
                    <Button variant="ghost" className="sm:hidden" onClick={onSair}>
                      {site.sair}
                    </Button>
                  ) : (
                    <span className="flex gap-2 sm:hidden">
                      <Button to="/entrar" variant="ghost">
                        {site.entrar}
                      </Button>
                      <Button to="/cadastro">{site.criarConta}</Button>
                    </span>
                  )}
                </li>
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  )
}
