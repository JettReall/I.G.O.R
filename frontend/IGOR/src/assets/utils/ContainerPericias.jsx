// SeletorDePericias.jsx
import { useState } from "react";
import clsx from "clsx";
import estilosUtil from "./utils.module.css";

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

// Componente principal agora recebe selecionados e onToggle como props
export function SeletorDePericias({ periciasElegiveis, listaPericias, botoes, selecionados, onToggle }) {
  // Calcula quantas ainda podem ser escolhidas
  const restantes = periciasElegiveis - selecionados.length;

  // Função que envolve o toggle e valida o limite
  const handleTogglePericia = (id) => {
    const isSelecionado = selecionados.includes(id);
    if (!isSelecionado && restantes === 0) {
      alert(`Você só pode escolher ${periciasElegiveis} perícias.`);
      return;
    }
    onToggle(id);
  };

  return (
    <div className={estilosUtil['principal']}>
      <CaixaTexto valor={restantes} />
      <ContainerPericiasSelecionaveis
        pericias={listaPericias}
        selecionados={selecionados}
        onToggle={handleTogglePericia}
      />
      <div className={estilosUtil['container-botoes-avanco']}>
        {botoes?.esquerdo && botoes.esquerdo}
        {(restantes === 0) ? (botoes?.direito && botoes.direito) : <p>Escolha o requerido</p>}
      </div>
    </div>
  );
}