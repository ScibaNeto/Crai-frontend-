import { Link } from 'react-router-dom'
import { interpolar } from '../../lib/cx'
import { useConteudo } from '../../lib/i18n'
import { MarcaRodape } from '../../sections/MarcaRodape'
import { Reveal } from '../motion/Reveal'
import { Wordmark } from '../ui/Wordmark'

export function Footer() {
  const { site } = useConteudo()
  const { rodape } = site
  return (
    <footer className="relative border-t border-line">
      <span aria-hidden="true" className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent" />
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link to="/" aria-label={site.inicioAria} className="inline-block rounded-[4px] text-[26px]">
            <Wordmark instant decorative />
          </Link>
          <p className="t-apoio measure mt-5 text-silver">{rodape.descricao}</p>
        </div>

        <nav aria-label={rodape.navAria} className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-6 md:col-start-7">
          {rodape.colunas.map((coluna, i) => (
            <Reveal key={coluna.titulo} delay={i * 0.08}>
              <h2 className="t-apoio text-paper">{coluna.titulo}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {coluna.links.map((link) => (
                  <li key={link.para + link.rotulo}>
                    <Link to={link.para} className="nav-link t-apoio text-silver transition-colors hover:text-amber">
                      {link.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </nav>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
        <p className="t-apoio text-paper">{rodape.aviso}</p>
        <Link to="/dados" className="nav-link t-apoio text-silver transition-colors hover:text-amber">
          {rodape.lgpd}
        </Link>
      </div>

      {/* Base do site: direitos autorais e os documentos legais, sempre a um clique. */}
      <div className="container-site flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
        <p className="t-apoio text-silver">{interpolar(rodape.legal, { ano: new Date().getFullYear() })}</p>
        <nav aria-label={rodape.documentosAria}>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {rodape.documentos.map((doc) => (
              <li key={doc.para}>
                <Link to={doc.para} className="nav-link t-apoio text-paper transition-colors hover:text-amber">
                  {doc.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <MarcaRodape />
    </footer>
  )
}
