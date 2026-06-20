import './campanhas.css'
import Nav from '../../componentes/nav/Nav.jsx'
import BotaoCampanha from '../../componentes/campanha/BotaoCampanha.jsx'
import { HeaderBase } from '../../componentes/header/headers.jsx'
import estilos from '../../componentes/campanha/BotaoCampanha.module.css'
import clsx from 'clsx'
import { useUser } from '../../UserContext.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ConfirmarCriar } from './ConfirmarCriar.jsx'
import Modal from '../../componentes/Modal.jsx'

function ContainerCampanhas({ campanhas, aoClicarCampanha }) {
  const classeCampanha = estilos['container-botao-campanha'];
  const campanhaBotaoAdd = clsx(estilos['container-botao-campanha'], estilos['adicionar-campanha']);

  return (
    <div className="container-campanhas">
      <BotaoCampanha
        aba_botao={"adicionar"}
        nome_botao={"Adicionar uma campanha"}
        classe={campanhaBotaoAdd}
        aoClicar={aoClicarCampanha}
      />

      {campanhas?.map((campanha) => (
        <BotaoCampanha
          key={campanha.id}
          id={campanha.id}
          aba_botao={campanha.nome}
          nome_botao={campanha.nome}
          classe={classeCampanha}
          aoClicar={aoClicarCampanha}
        />
      ))}
    </div>
  )
}

function Campanhas() {
  const { user } = useUser();
  const [campanhas, setCampanhas] = useState([]);
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleClickCampanha = (id) => {
    if (id) {
      navigate(`/campanhas/${id}`);
    } else {
      setAberto(true);
    }
  };

  useEffect(() => {
  const fetchCampanhas = async () => {
    if (!user?.id) return;

    setCarregando(true);

    // 1. Verifica se já há campanhas no localStorage
    const storedCampanhas = localStorage.getItem('campanhas');
    if (storedCampanhas) {
      try {
        const parsed = JSON.parse(storedCampanhas);
        setCampanhas(parsed);
        console.log('Campanhas carregadas do localStorage:', parsed);
        setCarregando(false);
        return; // Não faz requisição
      } catch (e) {
        console.error('Erro ao parsear campanhas do localStorage', e);
        // Se erro no parse, continua para buscar da API
      }
    }

    // 2. Se não houver no localStorage ou erro no parse, busca da API
    try {
      const responseCampanha = await axios.get(`api/campanha/${user.id}`);
      if (responseCampanha.status === 200) {
        localStorage.setItem('campanhas', JSON.stringify(responseCampanha.data));
        setCampanhas(responseCampanha.data);
        console.log('Campanhas salvas da API:', responseCampanha.data);
      }
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error);
      navigate('/');
    } finally {
      setCarregando(false);
    }
  };

  fetchCampanhas();
}, [user?.id]);

  function TelaCarregando() {
    const stilo = {
      placeSelf: "center",
      justifySelf: 'center',
    }


    return <h1 style={stilo}>Carregando...</h1>
  }

  return (
    <div className="corpo">
      <header>
        <HeaderBase titulo={"Campanhas"} pagina_atual={'campanhas'} />
      </header>

      <nav className="latertal">
        <Nav usuario={user?.nome || ''} />
      </nav>

      <main>
        {carregando ? 
         <TelaCarregando/> :
          <ContainerCampanhas
          campanhas={campanhas}
          aoClicarCampanha={handleClickCampanha}
        />}
      </main>

      {/* Modal de confirmação */}
      <ConfirmarCriar
        isAberto={aberto}
        set={setAberto}
        texto={"Criar uma nova campanha?"}
        isCampanha={true}
      />
    </div>
  )
}

export default Campanhas