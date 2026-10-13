import { useEffect, useState, type ReactNode } from 'react'
import { ErroApi, LOGIN_REAL, MODO_REAL, aoEncerrarSessao, iniciarSessao, sairDoPainel } from '../../data/api'
import { ErroCarregar } from '../ui/Estados'
import { t } from '../../lib/idioma'

/** O portão só existe com o login real: sem ele, o painel abre direto (demonstração ou login de desenvolvimento). */
const TEM_PORTAO = MODO_REAL && LOGIN_REAL

type Estado = 'conferindo' | 'aberto' | 'saindo' | 'sem_servico'

const SEM_CONFERIR = t('Não foi possível conferir o seu login agora.')

/**
 * Com o login real, o painel só aparece para quem tem sessão e empresa. Antes de desenhar
 * qualquer página, o portão confere a sessão que o site abriu:
 * - sem sessão: a pessoa é levada ao login do site e volta para a página pedida;
 * - sessão sem empresa: é levada ao cadastro;
 * - serviço de login fora do ar, ou login que não informou a empresa: um aviso, com "Tentar de novo".
 * Se a sessão terminar com o painel aberto (venceu, ou a pessoa saiu em outra aba), o painel
 * fecha e leva ao login. Quem clica em "Sair da conta" volta ao site.
 */
export function PortaoDeLogin({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>(TEM_PORTAO ? 'conferindo' : 'aberto')
  const [tentativa, setTentativa] = useState(0)
  const [aviso, setAviso] = useState(SEM_CONFERIR)

  useEffect(() => {
    if (!TEM_PORTAO) return
    let vivo = true
    iniciarSessao()
      .then(() => {
        if (vivo) setEstado('aberto')
      })
      .catch((erro: unknown) => {
        if (!vivo) return
        // Falha de rede, ou login que não informou a empresa: a pessoa fica aqui e pode tentar
        // de novo. Nos outros casos ela já está sendo levada ao login ou ao cadastro.
        const fica = erro instanceof ErroApi && (erro.codigo === 'rede' || erro.motivo === 'token_sem_empresa')
        setAviso(erro instanceof ErroApi && erro.motivo === 'token_sem_empresa' ? erro.message : SEM_CONFERIR)
        setEstado(fica ? 'sem_servico' : 'saindo')
      })
    return () => {
      vivo = false
    }
  }, [tentativa])

  useEffect(() => {
    if (!TEM_PORTAO) return
    let vivo = true
    let cancelar: (() => void) | undefined
    aoEncerrarSessao((porEscolha) => {
      if (!vivo) return
      setEstado('saindo')
      sairDoPainel(porEscolha)
    })
      .then((c) => {
        if (vivo) cancelar = c
        else c()
      })
      .catch(() => undefined)
    return () => {
      vivo = false
      cancelar?.()
    }
  }, [])

  // O navegador pode devolver esta página do cache do "Voltar" já congelada em "Levando
  // você…", com a saída marcada como feita. Recarregar confere o login de novo.
  useEffect(() => {
    if (!TEM_PORTAO) return
    const aoVoltar = (evento: PageTransitionEvent) => {
      if (evento.persisted) window.location.reload()
    }
    window.addEventListener('pageshow', aoVoltar)
    return () => window.removeEventListener('pageshow', aoVoltar)
  }, [])

  if (estado === 'aberto') return <>{children}</>
  return (
    <div className="fundo-painel flex min-h-screen items-center justify-center px-4">
      {estado === 'sem_servico' ? (
        <ErroCarregar
          className="w-full max-w-lg"
          mensagem={aviso}
          onTentar={() => {
            setEstado('conferindo')
            setTentativa((t) => t + 1)
          }}
        />
      ) : (
        <p role="status" aria-live="polite" className="text-normal text-silver">
          {estado === 'saindo' ? t('Saindo do painel…') : t('Conferindo o seu login…')}
        </p>
      )}
    </div>
  )
}
