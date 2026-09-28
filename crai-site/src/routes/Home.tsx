import { Faq } from '../sections/Faq'
import { Capitulos } from '../sections/home/Capitulos'
import { Contraste } from '../sections/home/Contraste'
import { CtaFinal } from '../sections/home/CtaFinal'
import { FaixaMarquee } from '../sections/home/FaixaMarquee'
import { HeroCrai } from '../sections/home/HeroCrai'
import { Numeros } from '../sections/home/Numeros'
import { Parceiros } from '../sections/home/Parceiros'
import { Preco } from '../sections/home/Preco'
import { Roadmap } from '../sections/home/Roadmap'
import { NaoFazemos } from '../sections/NaoFazemos'
import { useConteudo } from '../lib/i18n'

export function Home() {
  const { faq } = useConteudo().home
  return (
    <>
      <HeroCrai />
      <FaixaMarquee />
      <Numeros />
      <Capitulos />
      <Contraste />
      <Preco />
      <NaoFazemos />
      <Parceiros />
      <Roadmap />
      <Faq dados={faq} id="faq-home" />
      <CtaFinal />
    </>
  )
}
