// main.jsx – adaptado para usar UserContext
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './fontes.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Modal from './componentes/Modal.jsx';
import Login from './paginas/Login/Login';
import Homepage from './paginas/homepage/Homepage';
import Campanhas from './paginas/campanha/campanhas.jsx';
import TelaCampanhaAgente from './paginas/campanha/TelaCampanhaAgente';
import Cadastro from './paginas/Login/cadastro';
import Ficha from './paginas/ficha/ficha.jsx';
import ConfiguracoesModal from './paginas/Login/ConfiguracoesModal.jsx';

import CriadorFicha from './paginas/criador_ficha/CriadorFicha.jsx';
import Etapa1 from './paginas/criador_ficha/Etapa1-DadosIniciais.jsx';
import Etapa2 from './paginas/criador_ficha/Etapa2-ClasseTrilha.jsx';
import Etapa3 from './paginas/criador_ficha/Etapa3-Atributos.jsx';
import Etapa4 from './paginas/criador_ficha/Etapa4-Pericias.jsx';
import { Etapa5 } from './paginas/criador_ficha/Etapa5-NEX.jsx';

import { EscolherPoderClasse } from './paginas/criador_ficha/NEX/PoderClasse.jsx';
import EscolherAumentoAtributo from './paginas/criador_ficha/NEX/AumentoAtributo.jsx';
import Versatilidade from './paginas/criador_ficha/NEX/Versatilidade.jsx';
import { EscolherAfinidade } from './paginas/criador_ficha/Etapa5-NEX.jsx';
import EscolhidoOutroLado from './paginas/criador_ficha/NEX/EscolhidoOutroLado.jsx';
import { CaixaTexto } from './componentes/criador-ficha/componentes.jsx';

// Importa o UserProvider e o hook useUser
import { UserProvider, useUser } from './UserContext.jsx';
import { Combate } from './paginas/Combate/Combate.jsx';

// Componente de rota privada – usa o contexto para verificar autenticação
const Private = ({ Item }) => {
  const { user, loading } = useUser();
  if (loading) return <div>Carregando...</div>; // ou um spinner
  return user ? <Item /> : <Navigate to="/login" replace />;
};

// Página 404
function NaoEncontrado() {
  const retorne = useNavigate();
  return (
    <Modal open={true}>
      <CaixaTexto texto="Página não encontrada" />
      <button onClick={() => retorne('/')}>Voltar</button>
    </Modal>
  );
}

// Componente principal que renderiza as rotas
function AppRoutes() {
  const { user } = useUser(); // para passar adiante se necessário

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* /campanhas agora não recebe prop fixa; o próprio componente usará o contexto */}
      <Route path="/campanhas" element={<Campanhas />} />
      <Route path="/login" element={<Login />} />
      <Route path="/configuracoes" element={<ConfiguracoesModal />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="*" element={<NaoEncontrado />} />
      <>
      <Route path="/campanhas/:id" element={<TelaCampanhaAgente />} />
      <Route path="campanhas/ficha" element={<Ficha />} />

      </>

    <Route path='/combate' element={<Combate/>}/>

      {/* Rotas do criador de ficha */}
      <Route path="criar_ficha/:step" element={<CriadorFicha />} />
      {/* <Route path="/criar_ficha/:step/:nex?" element={<CriadorFicha />} /> */}

      {/* Rotas de NEX */}
      <Route path="/poder_classe" element={<EscolherPoderClasse />} />
      <Route path="/aumento_atributo" element={<EscolherAumentoAtributo />} />
      <Route path="versatilidade" element={<Versatilidade />} />
      <Route path="escolhido_outro_lado" element={<EscolhidoOutroLado />} />
      <Route path="etapa_5" element={<Etapa5 />} />
    </Routes>
  );
}

// Renderização principal – envolve com UserProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);