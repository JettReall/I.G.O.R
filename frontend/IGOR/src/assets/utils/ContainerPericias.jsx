// SeletorDePericias.jsx
import { useState } from "react";
import { BotaoAvancarEtapa } from "../../componentes/criador-ficha/componentes";
import clsx from "clsx";
import estilosUtil from "./utils.module.css"; // ← nome alterado para estilosUtil

// Componentes internos (movidos para cá, mas podem ficar dentro deste módulo)
function CaixaTexto({ valor }) {
  if (valor !== 0) {
    return (
      <p className={clsx(estilosUtil['texto-etapa4'])}>
        Escolha <strong>{valor}</strong> perícias
      </p>
    );
  }
  return <p className={clsx(estilosUtil['texto-etapa4'])}>Perícias selecionadas.</p>;
}

function PericiaSeletor({ dados, isChecked, onChange }) {
  const handleClick = () => {
    onChange(dados.id);
  };

  return (
    <div className={estilosUtil['pericia-etapas']}>
      <div className={estilosUtil['pericia-etapas-info']}>
        <strong className={estilosUtil?.['pericia-etapas-nome'] || ''}>{dados.nome}</strong>
        <div className={clsx(estilosUtil['linha'], estilosUtil['pericia-info-extra'])}>
          <p className={estilosUtil?.['pericia-etapas-atributo'] || ''}>{dados.atributo}</p>
          <p className={estilosUtil?.['pericia-etapas-treino'] || ''}>Treino: {dados.treino}</p>
        </div>
      </div>
      <input type="checkbox" checked={isChecked} onChange={handleClick} className={estilosUtil['pericia-checkbox']} />
    </div>
  );
}

function ContainerPericiasSelecionaveis({ pericias, selecionados, onToggle }) {
 
  return (
    <div className={clsx(estilosUtil['container-menor'], estilosUtil['pericias-etapa4'])}>
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

// Componente principal reutilizável
export function SeletorDePericias({ periciasElegiveis, listaPericias }) {
  const [selecionados, setSelecionados] = useState([]);
  const [restantes, setRestantes] = useState(periciasElegiveis);

  const handleTogglePericia = (id) => {
    const isSelecionado = selecionados.includes(id);
    if (!isSelecionado) {
      if (restantes === 0) {
        alert(`Você só pode escolher ${periciasElegiveis} perícias.`);
        return;
      }
      setSelecionados([...selecionados, id]);
      setRestantes(restantes - 1);
    } else {
      setSelecionados(selecionados.filter((item) => item !== id));
      setRestantes(restantes + 1);
    }
  };

  const isBotaoDesabilitado = restantes !== 0;

  return (
       <div className={estilosUtil['principal']}>
      <CaixaTexto valor={restantes} />
      <ContainerPericiasSelecionaveis
        pericias={listaPericias}
        selecionados={selecionados}
        onToggle={handleTogglePericia}
      />
      <BotaoAvancarEtapa isDisabled={isBotaoDesabilitado} />
    </div>
  );
}