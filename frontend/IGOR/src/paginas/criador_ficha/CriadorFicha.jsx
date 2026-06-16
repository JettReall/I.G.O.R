// CriadorFicha.jsx
import { EtapaProvider, useEtapa } from '../../componentes/EtapaContext';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Etapa1 from "./Etapa1-DadosIniciais";
import Etapa2 from './Etapa2-ClasseTrilha';
import Etapa3 from './Etapa3-Atributos';
import Etapa4 from './Etapa4-Pericias';
import { Etapa5 } from './Etapa5-NEX';

function ConteudoCriador() {
  const { etapaAtual, updateEtapa } = useEtapa();
  const { step } = useParams(); // step será "etapa_1", "etapa_2" etc.

  // Sincroniza a URL com o contexto na primeira carga
  useEffect(() => {
    if (step) {
      const numero = parseInt(step.split('_')[1], 10);
      if (!isNaN(numero) && numero !== etapaAtual) {
        updateEtapa(numero);
      }
    }
  }, [step]);

  switch (etapaAtual) {
    case 1:
          return <Etapa1 />;
     case 2:
          return <Etapa2/>;
     case 3:
          return <Etapa3/>;
     case 4:
          return <Etapa4/>;
    // outros cases futuros
    default:
      return <Etapa1 />;
  }
}

function CriadorFicha() {
  return (
    <EtapaProvider>
      <ConteudoCriador />
    </EtapaProvider>
  );
}

export default CriadorFicha;