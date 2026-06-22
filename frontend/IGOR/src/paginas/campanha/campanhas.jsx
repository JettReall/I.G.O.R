import './campanhas.css'
import Nav from '../../componentes/nav/Nav.jsx'
import BotaoCampanha from '../../componentes/campanha/BotaoCampanha.jsx'
import { HeaderBase } from '../../componentes/header/headers.jsx'
import estilos from '../../componentes/campanha/BotaoCampanha.module.css'
import clsx from 'clsx'
import { useUser } from '../../UserContext.jsx'
import { useEffect, useState, useCallback } from 'react'
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
        aoClicar={() => aoClicarCampanha(null)} /* Garante que passa nulo ao clicar em adicionar */
      />

      {campanhas?.map((campanha) => (
        <BotaoCampanha
          key={campanha.id}
          id={campanha.id}
          aba_botao={campanha.nome}
          nome_botao={campanha.nome}
          classe={classeCampanha}
          aoClicar={() => aoClicarCampanha(campanha.id)} /* Passa o ID correto da campanha */
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

  /* 1. CORRIGIDO: Colocámos a função fora do useEffect para que possa ser chamada após criar uma campanha */
  const carregarCampanhas = useCallback(async (forcarAtualizacao = false) => {
    if (!user?.id) return;

    setCarregando(true);

    // Se não forçado, tenta ler do localStorage primeiro
    if (!forcarAtualizacao) {
      const storedCampanhas = localStorage.getItem('campanhas');
      if (storedCampanhas) {
        try {
          const parsed = JSON.parse(storedCampanhas);
          setCampanhas(parsed);
          console.log('Campanhas carregadas do localStorage:', parsed);
          setCarregando(false);
          return;
        } catch (e) {
          console.error('Erro ao parsear campanhas do localStorage', e);
        }
      }
    }

    // Busca dados atualizados da API externa
    try {
      const responseCampanha = await axios.get(`api/campanha/${user.id}`);
      if (responseCampanha.status === 200) {
        localStorage.setItem('campanhas', JSON.stringify(responseCampanha.data));
        setCampanhas(responseCampanha.data);
        console.log('Campanhas atualizadas da API:', responseCampanha.data);
      }
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error);
      navigate('/');
    } finally {
      setCarregando(false);
    }
  }, [user?.id, navigate]);

  useEffect(() => {
    carregarCampanhas();
  }, [carregarCampanhas]);

  /* 2. NOVA FUNÇÃO: Executada assim que o Spring Boot criar a campanha com sucesso */
  const handleCampanhaCriada = () => {
    localStorage.removeItem('campanhas'); // Limpa cache antigo para forçar nova leitura
    carregarCampanhas(true); // Faz o GET atualizado ao Spring Boot
  };

  function TelaCarregando() {
    const stilo = {
      placeSelf: "center",
      justifySelf: 'center',
    }
    return <h1 style={stilo}>Carregando...</h1>
  }

  return (
    <div className="corpo">


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

      {/* 3. TOTALMENTE CORRIGIDO: Agora mapeia as variáveis certas do seu componente */}
      <ConfirmarCriar
        isAberto={aberto}
        set={setAberto}
        texto="Deseja criar uma nova campanha?"
        isCampanha={true}
        onCampanhaCriada={handleCampanhaCriada}
      />
    </div>
  )
}

export default Campanhas