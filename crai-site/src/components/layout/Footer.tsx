import { Link } from 'react-router-dom'
import { useConteudo } from '../../lib/i18n'
import { MarcaRodape } from '../../sections/MarcaRodape'
import { Wordmark } from '../ui/Wordmark'

export function Footer() {
  const { site } = useConteudo()
  const { rodape } = site
  return (
    <footer className="border-t border-line">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link to="/" aria-label={site.inicioAria} className="inline-block rounded-[4px] text-[26px]">
            <Wordmark instant decorative />
          </Link>
          <p className="t-apoio measure mt-5 text-silver">{rodape.descricao}</p>
        </div>

        <nav aria-label={rodape.navAria} className="grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8">
          {rodape.colunas.map((coluna) => (
            <div key={coluna.titulo}>
              <h2 className="t-apoio text-paper">{coluna.titulo}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {coluna.links.map((link) => (
                  <li key={link.para + link.rotulo}>
                    <Link to={link.para} className="nav-link t-apoio text-silver transition-colors hover:text-paper">
                      {link.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
        <p className="t-apoio text-paper">{rodape.aviso}</p>
        <p className="t-apoio text-silver">{rodape.lgpd}</p>
      </div>

      <p className="t-apoio container-site pb-8 text-center text-silver">{rodape.legal}</p>

      <MarcaRodape />
    </footer>
  )
}
