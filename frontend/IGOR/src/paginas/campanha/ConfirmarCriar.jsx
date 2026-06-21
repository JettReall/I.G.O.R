import { useState } from "react";
import Modal from "../../componentes/Modal";
import { useNavigate } from "react-router-dom";
import CriarCampanha from "./CriarCampanha";
import estilosCampanha from './campanhaModulos.module.css'

import './campanhas.css'

export function ConfirmarCriar({ isAberto, set, texto, caminho, isCampanha }) {
  const navigate = useNavigate();
  const [modo, setModo] = useState('confirmar'); // 'confirmar' ou 'criar'

  const handleConfirmar = () => {
    if (isCampanha) {
      // Em vez de navegar, muda para o modo de criar campanha
      setModo('criar');
    } else {
      navigate(caminho);
      set(false);
    }
  };

  const handleCancelar = () => {
    set(false);
    // Resetar modo ao fechar
    setModo('confirmar');
  };

  // Se o modal foi fechado, resetar modo
  if (!isAberto && modo === 'criar') {
    setModo('confirmar');
  }
    const stilo = {
    'display': 'flex',
    'flexDirection':'column',
    'justifyItems':'center',
    'alignItems':'center',
    'gap':'20px',
  }

  const justificar = {
    'justifyContent':'space-around',
    'width':'100%',
    'display': 'flex',
    'flexDirection':'row',
  }

  return (
    <Modal open={isAberto}>
      {modo === 'confirmar' ? (
        <div style={stilo}>
          <strong>{texto}</strong>
          <div style={justificar}>
          <button onClick={handleCancelar} id="cancelar">Cancelar</button>
          <button onClick={handleConfirmar} id="avancar">Confirmar</button>
          </div>
        </div>
      ) : (
        // Modo de criação de campanha – reutiliza o mesmo aberto e set
        <CriarCampanha aberto={isAberto} set={set} />
      )}
    </Modal>
  );
}