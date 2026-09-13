import { ComoFunciona } from '../sections/ComoFunciona'
import { Fechamento } from '../sections/Fechamento'
import { HeroHome } from '../sections/HeroHome'
import { ModeloComercial } from '../sections/ModeloComercial'
import { NaoFazemos } from '../sections/NaoFazemos'
import { OndeEscapa } from '../sections/OndeEscapa'

export function Home() {
  return (
    <>
      <HeroHome />
      <OndeEscapa />
      <ComoFunciona />
      <ModeloComercial />
      <NaoFazemos />
      <Fechamento />
    </>
  )
}
