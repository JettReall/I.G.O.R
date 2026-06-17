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


const Ficha = {
     Trilha: {
          nome: "",
          HabilidadeTrilha: ["","","",""],
     }
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

function EscolherAfinidade({ isAberto, onFechar, onConfirmar }) {
}

function Etapa5() {

}

