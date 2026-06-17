import clsx from "clsx";
import { SeletorDePericias } from "../../assets/utils/ContainerPericias";
import { BotaoAvancarNEX, BotaoVoltarNEX, CaixaTexto } from "../../componentes/criador-ficha/componentes";
import { HeaderBase } from "../../componentes/header/headers";
import Modal from '../../componentes/Modal';
import estilosNEX from './NEX/nex.module.css';
import EscolherAumentoAtributo from "./NEX/AumentoAtributo";
import { EscolherPoderClasse } from "./NEX/PoderClasse";
import Versatilidade from "./NEX/Versatilidade";
import { useState } from "react";
import { handleSelectUnico } from "../../assets/utils/SelecaoUnica";
import { useParams } from 'react-router-dom';
import { useEtapa } from '../../componentes/EtapaContext';
import { NEXProvider, useNEX } from '../../componentes/NEXContext';

import iconeSangue from '../../assets/imagens/elementos/icone-elementos/icone-sangue.png';
import iconeMorte from '../../assets/imagens/elementos/icone-elementos/icone-morte.png';
import iconeEnergia from '../../assets/imagens/elementos/icone-elementos/icone-energia.png';
import iconeConhecimento from '../../assets/imagens/elementos/icone-elementos/icone-conhecimento.png';

const Ficha = {
  Trilha: {
    nome: "",
    HabilidadeTrilha: ["", "", "", ""],
  },
  afinidadeSelecionada: "",
};

const listaPericiasDisponiveis = [
  { id: 1, nome: "Atletismo", atributo: "Força", treino: 2 },
  { id: 2, nome: "Acrobacia", atributo: "Agilidade", treino: 1 },
  { id: 3, nome: "Percepção", atributo: "Intelecto", treino: 3 },
  { id: 4, nome: "Furtividade", atributo: "Agilidade", treino: 0 },
  { id: 5, nome: "Investigação", atributo: "Intelecto", treino: 2 },
  { id: 6, nome: "Diplomacia", atributo: "Presença", treino: 1 },
  { id: 7, nome: "Vontade", atributo: "Presença", treino: 3 },
];

// Funções corrigidas com Modal funcional
function AprimorarHabTrilha({ Habilidade, nivel, nex }) {
  if (!Habilidade) Habilidade = "Teste";
  const [aberto, setAberto] = useState(true);

  const handleFechar = () => setAberto(false);

  return (
    <>
      <Modal open={aberto}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <strong>NEX {nex}</strong>
          <CaixaTexto tela={'pop-up'} texto={`Habilidade ${Habilidade} foi aprimorada para o nível ${nivel}`} />
          <BotaoAvancarNEX>OK</BotaoAvancarNEX>
        </div>
      </Modal>
    </>
  );
}

function LiberarHabTrilha({ Trilha, hab, nex }) {
  const [aberto, setAberto] = useState(true);

  const handleFechar = () => setAberto(false);

  return (
    <>
      <Modal open={aberto}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <strong>NEX {nex}</strong>     
          <CaixaTexto tela={'pop-up'} texto={`Habilidade ${Trilha.HabilidadeTrilha[hab]} liberada.`} />
          <BotaoAvancarNEX />
        </div>
      </Modal>
    </>
  );
}

function GrauDeTreinamento({ NEX, Treino }) {

    const btn_L = <BotaoVoltarNEX/>
    const btn_R = <BotaoAvancarNEX/>


  return (
    <>
      <SeletorDePericias limiteTreino={2} periciasElegiveis={5} listaPericias={listaPericiasDisponiveis} 
      botoes={{esquerdo: btn_L, direito: btn_R}}/>
    </>
  );
}

function Nex50() {
  return (
    <>
      <HeaderBase titulo={"NEX 50%: Versatilidade"} pagina_atual={"claro"} isFixo={true} />
      <Versatilidade />
      <BotaoAvancarNEX isDisabled={false} />
    </>
  );
}

function Nex5() {
  return (
    <>
      <CaixaTexto texto="NEX 5%: Início da jornada" tela="pop-up" />
    </>
  );
}

function EscolherAfinidade({ isAberto, onFechar }) {
  const elementos = [
    { nome: "Sangue", imagem: iconeSangue },
    { nome: "Morte", imagem: iconeMorte },
    { nome: "Conhecimento", imagem: iconeConhecimento },
    { nome: "Energia", imagem: iconeEnergia }
  ];
  const [selecionado, setSelecionado] = useState(null);

  const handleSelect = (nome) => {
    setSelecionado(handleSelectUnico(selecionado, nome));
  };

  const handleConfirmar = () => {
    if (selecionado) {
      Ficha.afinidadeSelecionada = selecionado;
      console.log(Ficha.afinidadeSelecionada);
      onFechar();
    }
  };

  return (
    <Modal open={isAberto}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <CaixaTexto texto="Escolha sua afinidade" tela="pop-up" />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
          {elementos.map((elem) => (
            <div
              key={elem.nome}
              onClick={() => handleSelect(elem.nome)}
              style={{
                cursor: 'pointer',
                border: selecionado === elem.nome ? '2px solid green' : '1px solid gray',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center'
              }}
            >
              <img src={elem.imagem} alt={elem.nome} style={{ width: '80px', height: '80px' }} />
              <strong style={{ display: 'block', marginTop: '8px' }}>{elem.nome}</strong>
            </div>
          ))}
        </div>
        <button
          onClick={handleConfirmar}
          disabled={!selecionado}
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: !selecionado ? 'not-allowed' : 'pointer'
          }}
        >
          Confirmar
        </button>
      </div>
    </Modal>
  );
}

// Mapeamento NEX -> Componente
const LevelUp = {
  5: <Nex5 />,
  10: <LiberarHabTrilha Trilha={Ficha.Trilha} hab={0} />,
  15: <EscolherPoderClasse />,
  20: <EscolherAumentoAtributo />,
  25: <AprimorarHabTrilha nivel={2} />,
  30: <EscolherPoderClasse />,
  35: <GrauDeTreinamento NEX={35} />,
  40: <LiberarHabTrilha Trilha={Ficha.Trilha} hab={1} />,
  45: <EscolherPoderClasse />,
  50: <Nex50 />,
  55: <AprimorarHabTrilha nivel={3} />,
  60: <EscolherPoderClasse />,
  65: <LiberarHabTrilha Trilha={Ficha.Trilha} hab={2} />,
  70: <GrauDeTreinamento NEX={70} />,
  75: <EscolherPoderClasse />,
  80: <EscolherAumentoAtributo />,
  85: <AprimorarHabTrilha nivel={4} />,
  90: <EscolherPoderClasse />,
  95: <EscolherAumentoAtributo />,
  99: <LiberarHabTrilha Trilha={Ficha.Trilha} hab={3} />,
};

function ConteudoNEX() {
  const { nexAtual, voltarNex } = useNEX();
  const { etapaAtual, updateEtapa } = useEtapa();

  const handleVoltarEtapaPrincipal = () => {
    updateEtapa(etapaAtual - 1);
  };

  return (
    <div className={estilosNEX['container-nex']}>
      <HeaderBase pagina_atual={'claro'} isFixo={false} titulo={`NEX ${nexAtual}%`} />
      <div className={estilosNEX['conteudo-nex']}>
        {LevelUp[nexAtual] || <CaixaTexto texto={`NEX ${nexAtual} ainda não implementado.`} tela="pop-up" />}
      </div>
      <div className={estilosNEX['botoes-nex']}>
        <BotaoVoltarNEX/>
        <BotaoAvancarNEX/>
      </div>
    </div>
  );
}

function Etapa5() {
  const { etapaAtual, updateEtapa } = useEtapa();
  const { nex } = useParams();
  const initialNEX = nex ? parseInt(nex.split('_')[1], 10) : 5;

  const handleFinish = () => {
    updateEtapa(etapaAtual + 1);
  };

  return (
    <NEXProvider initialNEX={initialNEX} onFinish={handleFinish}>
      <ConteudoNEX />
    </NEXProvider>
  );
}

export { EscolherAfinidade, Etapa5 };