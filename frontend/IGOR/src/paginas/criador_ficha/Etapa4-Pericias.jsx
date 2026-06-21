// Etapa4-Pericias.jsx
import { useState } from "react";
import { HeaderBase } from "../../componentes/header/headers";
import { SeletorDePericias } from "../../assets/utils/ContainerPericias";
import { BotaoAvancarEtapa, BotaoVoltarEtapa } from "../../componentes/criador-ficha/componentes";
import { useEtapa } from "../../componentes/EtapaContext";
import { pericias_dados } from "./VariaveisSistema"; // import da lista global
import estilosEtapas from "./etapas.module.css";
import clsx from "clsx";

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
    // Quando chamada, lê a fila das pericias escolhidas e aumenta o treino de cada uma em um
    selecionados.forEach((id) => {
      const pericia = pericias_dados.find(p => p.id === id);
      if (pericia) {
        pericia.treino = (pericia.treino || 0) + 1;
      }
      console.log(selecionados);
      console.log(pericias_dados);
      
      
    });
  }

  return (
    <>

      <SeletorDePericias
        periciasElegiveis={5}
        listaPericias={pericias_dados} // usa a lista global
        selecionados={selecionados}
        onToggle={handleTogglePericia}
        isEtapa4={true}
        botoes={{
          esquerdo: <BotaoVoltarEtapa />,
          direito: <BotaoAvancarEtapa funcaoAntesAvancar={SalvarEtapa4} />
        }}
      />
    </>
  );
}

export default Etapa4;