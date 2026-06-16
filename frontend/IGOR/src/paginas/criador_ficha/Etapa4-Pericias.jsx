import { HeaderBase } from "../../componentes/header/headers";
import { SeletorDePericias } from "../../assets/utils/ContainerPericias"; // importa o componente reutilizável

// Lista de perícias de exemplo (pode ficar aqui ou ser movida para um arquivo de dados)
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
  return (
    <>

      <SeletorDePericias
        periciasElegiveis={5}
        listaPericias={listaPericiasDisponiveis}
      />
    </>
  );
}

export default Etapa4;