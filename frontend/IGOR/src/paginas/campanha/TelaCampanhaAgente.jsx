import './campanhas.css'
import Nav from '../../componentes/nav/Nav.jsx'
import BotaoCampanha from '../../componentes/campanha/BotaoCampanha.jsx'
import { HeaderDeCampanha } from '../../componentes/header/headers.jsx'
import estilos from '../../componentes/campanha/BotaoCampanha.module.css'
import clsx from 'clsx'
import { BotaoRetorno } from '../../componentes/botoes/Botoes.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../UserContext.jsx'
import { useEffect, useState } from 'react'
import { ConfirmarCriar } from './ConfirmarCriar.jsx'

function ContainerCampanhas({ personagens, aoClicarFicha }) {
  const classeFicha = clsx(estilos['container-botao-campanha'], estilos.ficha)
  const campanhaBotaoAdd = clsx(estilos['container-botao-campanha'], estilos['adicionar-ficha'])

  return (
    <div className="container-campanhas">
      <BotaoCampanha
        aba_botao={"adicionar"}
        nome_botao={"Criar uma ficha de Agente"}
        classe={campanhaBotaoAdd}
        aoClicar={aoClicarFicha}
      />

      {personagens?.map((personagem) => (
        <BotaoCampanha
          key={personagem.id}
          id={personagem.id}
          aba_botao={personagem.nome}
          nome_botao={personagem.nome}
          classe={classeFicha}
          aoClicar={aoClicarFicha}
        />
      ))}
    </div>
  )
}

function TelaCampanhaAgente() {
  const { user } = useUser()
  const navigate = useNavigate()
  const { id } = useParams()
  const [campanha, setCampanha] = useState(null)
  const [loading, setLoading] = useState(true)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const fetchCampanha = () => {
      const stored = localStorage.getItem('campanhas')
      if (stored) {
        try {
          const campanhas = JSON.parse(stored)
          const encontrada = campanhas.find((c) => c.id === parseInt(id))
          setCampanha(encontrada)
        } catch (e) {
          console.error('Erro ao parsear campanhas', e)
        }
      }
      setLoading(false)
    }

    if (id) {
      fetchCampanha()
    } else {
      setLoading(false)
    }
  }, [id])

  const handleClickFicha = (fichaId) => {
    if (fichaId) {
      // Navega para a ficha específica dentro da campanha
      navigate(`/campanhas/${id}/ficha/${fichaId}`)
    } else {
      // Botão "Criar" – abre o modal de confirmação
      setAberto(true)
    }
  }

  if (loading) {
    return <div>Carregando campanha...</div>
  }

  if (!campanha) {
    return <div>Campanha não encontrada</div>
  }

  const personagens = campanha.personagens || []

  return (
    <div className="corpo">
      <header>
        <HeaderDeCampanha
          titulo={campanha.nome}
          botao_L={<BotaoRetorno aoClicar={() => navigate('/campanhas')} />}
          pagina_atual={'campanha'}
        />
      </header>

      <nav className="lateral">
        <Nav usuario={user?.nome || ''} />
      </nav>

      <main>
        <ContainerCampanhas
          personagens={personagens}
          aoClicarFicha={handleClickFicha}
        />
      </main>

      {/* Modal de confirmação para criar nova ficha */}
      <ConfirmarCriar
        isAberto={aberto}
        set={setAberto}
        texto={"Criar uma nova ficha para esta campanha?"}
        caminho={`/campanhas/${id}/criar-ficha`}
      />
    </div>
  )
}

export default TelaCampanhaAgente