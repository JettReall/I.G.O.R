// Etapa4-Pericias.jsx
import { HeaderBase } from "../../componentes/header/headers";
import { SeletorDePericias } from "../../assets/utils/ContainerPericias";
import { BotaoAvancarEtapa, BotaoVoltarEtapa } from "../../componentes/criador-ficha/componentes";
import { useEtapa } from "../../componentes/EtapaContext";
import estilosEtapas from "./etapas.module.css";
import clsx from "clsx";

const listaPericiasDisponiveis = [
  { id: 1, nome: "Atletismo", atributo: "Força", treino: 2 },
  { id: 2, nome: "Acrobacia", atributo: "Agilidade", treino: 1 },
  { id: 3, nome: "Percepção", atributo: "Intelecto", treino: 3 },
  { id: 4, nome: "Furtividade", atributo: "Agilidade", treino: 0 },
  { id: 5, nome: "Investigação", atributo: "Intelecto", treino: 2 },
  { id: 6, nome: "Diplomacia", atributo: "Presença", treino: 1 },
  { id: 7, nome: "Vontade", atributo: "Presença", treino: 3 },
];

function Etapa4() {
  const { updateEtapa, etapaAtual } = useEtapa();

  const handleVoltar = () => {
    updateEtapa(etapaAtual - 1);
  };

  const botaoVoltar = <BotaoVoltarEtapa />

  const botaoAvancar = <BotaoAvancarEtapa />;

  return (
    <>
      <HeaderBase pagina_atual={'claro'} titulo={"Etapa 4: Escolha de Perícias"} isFixo={true} />
      <SeletorDePericias
        periciasElegiveis={5}
        listaPericias={listaPericiasDisponiveis}
        botoes={{ esquerdo: botaoVoltar, direito: botaoAvancar }}
      />
    </>
  );
}

export default Etapa4;