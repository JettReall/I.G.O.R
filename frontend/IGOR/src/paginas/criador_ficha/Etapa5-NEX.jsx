import clsx from "clsx";
import { SeletorDePericias } from "../../assets/utils/ContainerPericias";
import { CaixaTexto } from "../../componentes/criador-ficha/componentes";
import { HeaderBase } from "../../componentes/header/headers";
import Modal from '../../componentes/Modal'
import estilosNEX from './NEX/nex.module.css';
import EscolherAumentoAtributo from "./NEX/AumentoAtributo";
import { EscolherPoderClasse } from "./NEX/PoderClasse";
import Versatilidade from "./NEX/Versatilidade";
import { useState } from "react";
import { handleSelectUnico } from "../../assets/utils/SelecaoUnica";

import iconeSangue from '../../assets/imagens/elementos/icone-elementos/icone-sangue.png';
import iconeMorte from '../../assets/imagens/elementos/icone-elementos/icone-morte.png';
import iconeEnergia from '../../assets/imagens/elementos/icone-elementos/icone-energia.png';
import iconeConhecimento from '../../assets/imagens/elementos/icone-elementos/icone-conhecimento.png';
//Ajuste essas importações para receber essas imagens. O caminho delas é este.


const Ficha = {
     Trilha: {
          nome: "",
          HabilidadeTrilha: ["","","",""],
     },
     afinidadeSelecionada: "",
}



const listaPericiasDisponiveis = [
  { id: 1, nome: "Atletismo", atributo: "Força", treino: 2 },
  { id: 2, nome: "Acrobacia", atributo: "Agilidade", treino: 1 },
  { id: 3, nome: "Percepção", atributo: "Intelecto", treino: 3 },
  { id: 4, nome: "Furtividade", atributo: "Agilidade", treino: 0 },
  { id: 5, nome: "Investigação", atributo: "Intelecto", treino: 2 },
  { id: 6, nome: "Diplomacia", atributo: "Presença", treino: 1 },
  { id: 7, nome: "Vontade", atributo: "Presença", treino: 3 },
];

/*
const LevelUp = {
     5: "",
     10: <LiberarHabTrilha Trilha={Trilha} hab={0} />,
     15: <EscolherPoderClasse />,
     20: <EscolherAumentoAtributo />,
     25: <AprimorarHabTrilha nivel={2}/>,
     30: <EscolherPoderClasse />,
     35: <GrauDeTreinamento NEX={35} />,
     40: <LiberarHabTrilha Trilha={Trilha} hab={1} />,
     45: <EscolherPoderClasse />,
     50: "",
     55: <AprimorarHabTrilha nivel={3}/>,
     60: <EscolherPoderClasse />,
     65: <LiberarHabTrilha Trilha={Trilha} hab={2} />,
     70: <GrauDeTreinamento NEX={35} />,
     75: <EscolherPoderClasse />,
     80: <EscolherAumentoAtributo />,
     85: <AprimorarHabTrilha nivel={4}/>,
     90: <EscolherPoderClasse />,
     95: <EscolherAumentoAtributo />,
     99: <LiberarHabTrilha Trilha={Trilha} hab={3} />,
     
}
*/
function AprimorarHabTrilha({Habilidade, nivel}) {

     if (!Habilidade) {
          Habilidade = "Teste";
     }

     return (
          <Modal >
               <CaixaTexto tela={'pop-up'} texto={`Habiidade ${Habilidade} foi aprimorada para o nível ${nivel}`}/>
          </Modal>
     )
}

function LiberarHabTrilha({Trilha, hab}) {
     return (
          <Modal >
               <CaixaTexto tela={'pop-up'} texto={`Habiidade ${Trilha.HabilidadeTrilha[hab]} liberada.`}/>
          </Modal>
     )
}

function GrauDeTreinamento( {NEX, Treino} ) {
     

     return (
          <>
          <HeaderBase pagina_atual={'claro'} isFixo={true} titulo={`NEX ${NEX}: Grau de Treinamento`}/>
          <SeletorDePericias limiteTreino={2} periciasElegiveis={5}  listaPericias={listaPericiasDisponiveis} />
          </>
     )
}


function Nex50() {
     return (
          <>
          <HeaderBase titulo={"NEX 50%: Versatilidade"} pagina_atual={"claro"} isFixo={true} />
          <Versatilidade />

          </>
     )
}

function EscolherAfinidade({ isAberto,onFechar }) {

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
      // Salva na variável global
      Ficha.afinidadeSelecionada = selecionado;
      console.log(Ficha.afinidadeSelecionada);
      
      // Fecha o modal
      isAberto = false;
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

function LevelUpNEX({classe}) {
     switch ((classe.nome)) {
          case "combatente":
              
          default:
     }
}

//     <EscolherAfinidade
//       isAberto={modalAberto}
//       onFechar={() => setModalAberto(false)}
//     />

function Etapa5() {
  const [modalAberto, setModalAberto] = useState(true);

  return null;
}

export {EscolherAfinidade,
     Etapa5,
}
