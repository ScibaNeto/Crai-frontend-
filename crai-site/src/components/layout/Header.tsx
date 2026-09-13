import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../../data/conteudo'
import { cx } from '../../lib/cx'
import { EASE_EXPO } from '../../lib/intro'
import { IconClose, IconMenu } from '../icons/Icons'
import { Button } from '../ui/Button'
import { Wordmark } from '../ui/Wordmark'

/** Header fixo com vidro (10.11). A borda inferior só aparece depois de 40px de rolagem. */
export function Header() {
  const [rolou, setRolou] = useState(() => window.scrollY > 40)
  const [aberto, setAberto] = useState(false)
  const [desenho, setDesenho] = useState(0)
  const { pathname } = useLocation()
  const [rotaAnterior, setRotaAnterior] = useState(pathname)

  // Fecha o menu mobile ao trocar de rota (ajuste de estado durante o render, sem effect).
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname)
    setAberto(false)
  }

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  const redesenhar = () => setDesenho((n) => n + 1)

  return (
    <header
      className={cx(
        'glass fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        rolou || aberto ? 'border-line' : 'border-transparent',
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

        <nav aria-label={site.navAria} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.para}>
                <NavLink
                  to={item.para}
                  className={({ isActive }) =>
                    cx('nav-link t-apoio rounded-[2px] transition-colors duration-150', isActive ? 'text-paper' : 'text-silver hover:text-paper')
                  }
                >
                  {item.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/cadastro" size="sm" className="hidden sm:inline-flex">
            {site.criarConta}
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] text-paper hover:bg-paper/5 lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? site.fecharMenu : site.abrirMenu}
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? <IconClose size={22} /> : <IconMenu size={22} />}
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
            transition={{ duration: 0.28, ease: EASE_EXPO }}
          >
            <ul className="container-site flex flex-col pt-2 pb-6">
              {site.nav.map((item) => (
                <li key={item.para} className="border-b border-line">
                  <NavLink
                    to={item.para}
                    className={({ isActive }) => cx('block py-3.5 text-[17px]', isActive ? 'text-paper' : 'text-silver')}
                  >
                    {item.rotulo}
                  </NavLink>
                </li>
              ))}
              <li className="pt-5 sm:hidden">
                <Button to="/cadastro" className="w-full">
                  {site.criarConta}
                </Button>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
