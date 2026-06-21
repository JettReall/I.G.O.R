import { useState } from "react";
import Modal from "../../componentes/Modal";
import { useNavigate } from "react-router-dom";
import CriarCampanha from "./CriarCampanha";
import estilosCampanha from './campanhaModulos.module.css';

import './campanhas.css';

/* 1. ADICIONADO: onCampanhaCriada nas propriedades recebidas */
export function ConfirmarCriar({ isAberto, set, texto, caminho, isCampanha, onCampanhaCriada }) {
  const navigate = useNavigate();
  const [modo, setModo] = useState('confirmar'); // 'confirmar' ou 'criar'

  const handleConfirmar = () => {
    if (isCampanha) {
      setModo('criar');
    } else {
      navigate(caminho);
      set(false);
    }
  };

  const handleCancelar = () => {
    set(false);
    setModo('confirmar');
  };

  if (!isAberto && modo === 'criar') {
    setModo('confirmar');
  }

  return (
    <Modal open={isAberto}>
      {modo === 'confirmar' ? (
        <div className={estilosCampanha['coluna']}>
          <strong>{texto}</strong>
          <div className={estilosCampanha['linha']}>
            <button onClick={handleCancelar} id="cancelar">Cancelar</button>
            <button onClick={handleConfirmar} id="avancar">Confirmar</button>
          </div>
        </div>
      ) : (
        /* 2. CORRIGIDO: Agora usa isAberto, set e repassa o onCampanhaCriada */
        <CriarCampanha 
          aberto={isAberto} 
          set={set} 
          onCampanhaCriada={onCampanhaCriada} 
        />
      )}
    </Modal>
  );
}