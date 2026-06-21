// CriadorFicha.jsx
import { EtapaProvider, useEtapa } from '../../componentes/EtapaContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { HeaderBase } from '../../componentes/header/headers';
import { BotaoCancelarCriador } from '../../componentes/botoes/Botoes';


import Etapa1 from "./Etapa1-DadosIniciais";
import Etapa2 from './Etapa2-ClasseTrilha';
import Etapa3 from './Etapa3-Atributos';
import Etapa4 from './Etapa4-Pericias';
import { Etapa5 } from './Etapa5-NEX';
import Modal from '../../componentes/Modal';
import clsx from 'clsx';
import estilosEtapas from "./etapas.module.css";

function ConteudoCriador() {
    const { etapaAtual, setEtapa } = useEtapa();
  const { step } = useParams();

  useEffect(() => {
    if (step) {
      const numero = parseInt(step, 10);
      if (!isNaN(numero) && numero !== etapaAtual) {
        // Atualiza o estado para refletir a URL, sem navegar
        setEtapa(numero);
      }
    }
  }, [step, etapaAtual, setEtapa]);

  switch (etapaAtual) {
    case 1: return <Etapa1 />;
    case 2: return <Etapa2 />;
    case 3: return <Etapa3 />;
    case 4: return <Etapa4 />;
    case 5: return <Finalizar />;
  }
}

function Finalizar() {
  return (
    <Modal open={true}>
      <div className="">
        <strong>Personagem criado com Sucesso</strong>
        <Link to={"/campanhas"}>
          <button onClick={SalvarEtapas1a4}>Encerrar</button>
        </Link>
      </div>
    </Modal>
  )
}

function SalvarEtapas1a4() {
//Essa função pega o conteúdo de todas as etapaX_dados e salva em FichaEmBranco, nos locais de mesmo nome, exceto o da Etapa4.
console.log("Salvei, confia");

//A etapa 4 (e somente ela) pegará o array de pericias do usuário e aumentará Ficha.pericia[i].treino em 1, sendo i um ID da lista de pericias escolhidas. Isso aconetecerá para todas.
}


function CriadorFicha() {
  return (
    <EtapaProvider>
            <HeaderBase pagina_atual={'claro'} isFixo={true} titulo={"Etapa 1: Dados iniciais"} 
      botao_L={<BotaoCancelarCriador />}/>
      <ConteudoCriador />
    </EtapaProvider>
  );
}

export default CriadorFicha;