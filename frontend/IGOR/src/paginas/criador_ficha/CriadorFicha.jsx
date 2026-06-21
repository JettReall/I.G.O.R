// CriadorFicha.jsx
import { EtapaProvider, useEtapa } from '../../componentes/EtapaContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { PersonagemNovo } from './VariaveisSistema';

function ConteudoCriador({setHeader}) {
  const { etapaAtual, setEtapa } = useEtapa();
  const { step } = useParams();

  useEffect(() => {
    if (step) {
      const numero = parseInt(step, 10);
      if (!isNaN(numero) && numero !== etapaAtual) {
        setEtapa(numero);
      }
    }
  }, [step, etapaAtual, setEtapa]);

  // Atualiza o título do header quando a etapa mudar
  useEffect(() => {
    const titulos = {
      1: "Etapa 1: Dados iniciais",
      2: "Etapa 2: Classe e Trilha",
      3: "Etapa 3: Atributos",
      4: "Etapa 4: Pericias",
      5: "Finalizar"
    };
    setHeader(titulos[etapaAtual] || "");
  }, [etapaAtual, setHeader]);

  switch (etapaAtual) {
    case 1: return <Etapa1 />;
    case 2: return <Etapa2 />;
    case 3: return <Etapa3 />;
    case 4: return <Etapa4 />;
    case 5: return <Finalizar />;
    default: return null;
  }
}
function Finalizar() {

  const stilo = {
    'display': 'flex',
    'flexDirection':'column',
    'justifyItems':'center',
    'alignItems':'center',
    'gap':'20px',
  }

  return (
    <Modal open={true}>
      <div className="" style={stilo}>
        <strong>Personagem criado com Sucesso</strong>
        <Link to={"/campanhas"}>
          <button onClick={SalvarEtapas1a4} id='avancar'>Encerrar</button>
        </Link>
      </div>
    </Modal>
  )
}

function construirPersonagem() {
  // Extrai os dados relevantes
  const { nome, jogador, origem } = etapa1_dados;
  const { classeAgenteEscolhida, trilhaAgenteEscolhida } = etapa2_dados;
  const atributos = etapa3_dados; // já está no formato esperado

  // Extrai apenas os IDs (se existirem)
  const origemId = origem?.id || 0;
  const classeId = classeAgenteEscolhida?.id || 0;
  const trilhaId = trilhaAgenteEscolhida?.id || 0;

  // Mapeia as perícias para obter apenas os IDs
  const periciaIds = pericias_personagem.map(p => p.id);

  // Monta o objeto final
  return {
    nome,
    jogador,
    origemId,
    classeId,
    trilhaId,
    atributos,   // spread do array de atributos
    periciaLista: periciaIds,
  };
}

// Uso:


function SalvarEtapas1a4() {
//Essa função pega o conteúdo de todas as etapaX_dados e salva em FichaEmBranco, nos locais de mesmo nome, exceto o da Etapa4.
PersonagemNovo = construirPersonagem();
console.log(PersonagemNovo);

}


function CriadorFicha() {
  const [texto, setTexto] = useState("");
  return (
    <EtapaProvider>
            <HeaderBase pagina_atual={'claro'} isFixo={true} titulo={texto} 
      botao_L={<BotaoCancelarCriador />}/>
      <ConteudoCriador setHeader={setTexto} />
    </EtapaProvider>
  );
}

export default CriadorFicha;