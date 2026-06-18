// Etapa4-Pericias.jsx
import { useState } from "react";
import { HeaderBase } from "../../componentes/header/headers";
import { SeletorDePericias } from "../../assets/utils/ContainerPericias";
import { BotaoAvancarEtapa, BotaoVoltarEtapa } from "../../componentes/criador-ficha/componentes";
import { useEtapa } from "../../componentes/EtapaContext";
import { etapa4_dados } from "./VariaveisSistema";
import estilosEtapas from "./etapas.module.css";
import clsx from "clsx";

const listaPericiasDisponiveis = [
  { id: 1, nome: "Atletismo", atributo: "Força", treino: 0 },
  { id: 2, nome: "Acrobacia", atributo: "Agilidade", treino: 0 },
  { id: 3, nome: "Percepção", atributo: "Intelecto", treino: 0 },
  { id: 4, nome: "Furtividade", atributo: "Agilidade", treino: 0 },
  { id: 5, nome: "Investigação", atributo: "Intelecto", treino: 0 },
  { id: 6, nome: "Diplomacia", atributo: "Presença", treino: 0 },
  { id: 7, nome: "Vontade", atributo: "Presença", treino: 0 },
];

function Etapa4() {
  const { updateEtapa, etapaAtual } = useEtapa();

  const [selecionados, setSelecionados] = useState([]);

  // Função para alternar a seleção de uma perícia
  const handleTogglePericia = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  function SalvarEtapa4() {
    // Atualiza a variável global com os IDs selecionados
    // Limpa o array e insere os novos objetos { id }
    etapa4_dados.length = 0;
    selecionados.forEach((id) => etapa4_dados.push({ id }));
    console.log(etapa4_dados);
    
    // Caso queira preservar a referência, também funciona
    // etapa4_dados.splice(0, etapa4_dados.length, ...selecionados.map(id => ({ id })));
  }

  return (
    <>
      <HeaderBase pagina_atual={'claro'} titulo={"Etapa 4: Escolha de Perícias"} isFixo={true} />
      <SeletorDePericias
        periciasElegiveis={5}
        listaPericias={listaPericiasDisponiveis}
        selecionados={selecionados}          // passa o estado
        onToggle={handleTogglePericia}       // passa a função de toggle
        botoes={{
          esquerdo: <BotaoVoltarEtapa />,
          direito: <BotaoAvancarEtapa funcaoAntesAvancar={SalvarEtapa4} />
        }}
      />
    </>
  );
}

export default Etapa4;