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

      const storedCampanhas = localStorage.getItem('campanhas');
      if (storedCampanhas) {
        try {
          const parsed = JSON.parse(storedCampanhas);
          setCampanhas(parsed);
          console.log('Campanhas carregadas do localStorage:', parsed);
          return;
        } catch (e) {
          console.error('Erro ao parsear campanhas do localStorage', e);
        }
      }

      try {
        const responseCampanha = await axios.get(`api/campanha/${user.id}`);
        if (responseCampanha.status === 200) {
          localStorage.setItem('campanhas', JSON.stringify(responseCampanha.data));
          setCampanhas(responseCampanha.data);
          console.log('Campanhas salvas da API:', responseCampanha.data);
        }
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
      }
    };

    fetchCampanhas();
  }, [user?.id]);

  return (
    <div className="corpo">
      <header>
        <HeaderBase titulo={"Campanhas"} pagina_atual={'campanhas'} />
      </header>

      <nav className="latertal">
        <Nav usuario={user?.nome || ''} />
      </nav>

      <main>
        <ContainerCampanhas
          campanhas={campanhas}
          aoClicarCampanha={handleClickCampanha}
        />
      </main>

      {/* Modal de confirmação */}
      <ConfirmarCriar
        isAberto={aberto}
        set={setAberto}
        texto={"Criar uma nova campanha?"}
        caminho={'/criar-campanha'} // ajuste conforme a rota real
      />
    </div>
  )
}

export default Campanhas