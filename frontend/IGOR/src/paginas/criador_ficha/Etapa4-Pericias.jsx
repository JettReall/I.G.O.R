import { BotaoAvancarEtapa } from "../../componentes/criador-ficha/componentes";
import { useState } from "react";
import estilos from "../../componentes/ficha/componentes.module.css";
import estilosEtapas from "./etapas.module.css"
import clsx from "clsx";


// Lista de perícias de exemplo (futuramente virá de uma fonte externa)
const listaPericiasDisponiveis = [
  { id: 1, nome: "Atletismo", atributo: "Força", treino: "Treinado" },
  { id: 2, nome: "Acrobacia", atributo: "Agilidade", treino: "Treinado" },
  { id: 3, nome: "Percepção", atributo: "Intelecto", treino: "Treinado" },
  { id: 4, nome: "Furtividade", atributo: "Agilidade", treino: "Treinado" },
  { id: 5, nome: "Investigação", atributo: "Intelecto", treino: "Treinado" },
  { id: 6, nome: "Diplomacia", atributo: "Presença", treino: "Treinado" },
  { id: 7, nome: "Vontade", atributo: "Presença", treino: "Treinado" },
];

const PericiasElegiveis = 5; // Número fixo de perícias que podem ser escolhidas

function CaixaTexto({ valor }) {
  if (valor !== 0) {
    return (
      <p className={clsx(estilosEtapas['texto-etapa4'])}>
        Escolha <strong>{valor}</strong> perícias
      </p>
    );
  }
  return <p className={clsx(estilosEtapas['texto-etapa4'])} >Perícias selecionadas.</p>;
}

function PericiaSeletor({ dados, isChecked, onChange }) {
  const handleClick = () => {
    onChange(dados.id);
  };

  return (
    <div className={estilosEtapas['pericia-etapas']}>
      <div className={estilosEtapas['pericia-etapas-info']}>
          <strong className={estilosEtapas?.['pericia-etapas-nome'] || ''}>{dados.nome}</strong>
          <div className={clsx(estilosEtapas['linha'],estilosEtapas['pericia-info-extra'])}>
          <p className={estilosEtapas?.['pericia-etapas-atributo'] || ''}>{dados.atributo}</p>
          <p className={estilosEtapas?.['pericia-etapas-treino'] || ''}>{dados.treino}</p>
          </div>
      </div>
      <input type="checkbox" checked={isChecked} onChange={handleClick} className={estilosEtapas['pericia-checkbox']}/>
    </div>
  );
}

function ContainerPericiasSelecionaveis({ pericias, selecionados, onToggle }) {
  return (
    <div className={clsx(estilosEtapas['container-menor'],estilosEtapas['pericias-etapa4'])}>
      {pericias.map((pericia) => (
        <PericiaSeletor
          key={pericia.id}
          dados={pericia}
          isChecked={selecionados.includes(pericia.id)}
          onChange={onToggle}
        />
      ))}
    </div>
  );
}


function Etapa4() {
  // Estado para armazenar os IDs das perícias escolhidas
  const [selecionados, setSelecionados] = useState([]);
  // Estado para controlar quantas perícias ainda podem ser escolhidas
  const [restantes, setRestantes] = useState(PericiasElegiveis);

  const handleTogglePericia = (id) => {
    const isSelecionado = selecionados.includes(id);

    if (!isSelecionado) {
      // Tentando marcar uma nova perícia
      if (restantes === 0) {
        alert(`Você só pode escolher ${PericiasElegiveis} perícias.`);
        return;
      }
      setSelecionados([...selecionados, id]);
      setRestantes(restantes - 1);
    } else {
      // Desmarcando uma perícia
      setSelecionados(selecionados.filter((item) => item !== id));
      setRestantes(restantes + 1);
    }
  };

  // Botão Avançar só é habilitado quando não há mais perícias restantes para escolher
  const isBotaoDesabilitado = restantes !== 0;

  return (
    <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa4'])}>
      <CaixaTexto valor={restantes} />
      <ContainerPericiasSelecionaveis
        pericias={listaPericiasDisponiveis}
        selecionados={selecionados}
        onToggle={handleTogglePericia}
      />
      <div className={estilosEtapas['botao-avancar-etapa4']}>
          <BotaoAvancarEtapa isDisabled={isBotaoDesabilitado} />
      </div>
    </div>
  );
}

export default Etapa4;