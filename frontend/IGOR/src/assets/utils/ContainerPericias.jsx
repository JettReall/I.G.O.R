// SeletorDePericias.jsx
import { useState, useEffect } from "react";
import clsx from "clsx";
import estilosUtil from "./utils.module.css";
import { etapa1_dados } from "../../paginas/criador_ficha/VariaveisSistema";

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

function ContainerPericiasSelecionaveis({ pericias, selecionados, onToggle, limite }) {
  // Filtra as perícias cujo treino seja menor que o limite (não renderiza se treino >= limite)

  function ValidaPericiaElegivel({p}) {
    if ((p.id === etapa1_dados.origem.pericias[0].id) ||
        (p.id === etapa1_dados.origem.pericias[1].id) ||
        (p.treino >= lim) ) {
          return false
    } else return true;
  }

  return (
    <div className={clsx(estilosUtil['container-menor'], estilosUtil['pericias-etapa4'])}>
      {pericias.map((pericia) => ( //Só exiba pericia seletor se ValidarPericiaElegivel(pericia, lim) retornar true
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
export function SeletorDePericias({ periciasElegiveis, listaPericias, botoes, selecionados, onToggle, isEtapa4 }) {
  // Calcula quantas ainda podem ser escolhidas
  const restantes = periciasElegiveis - selecionados.length;

  // Estado para a lista líquida (exclui perícias da origem quando for Etapa4)
  

  // Função que envolve o toggle e valida o limite
  const handleTogglePericia = (id) => {
    const isSelecionado = selecionados.includes(id);
    if (!isSelecionado && restantes === 0) {
      alert(`Você só pode escolher ${periciasElegiveis} perícias.`);
      return;
    }
    onToggle(id);
  };

  function Cap() {
    return isEtapa4 ? 1 : 3;
  }

  return (
    <div className={estilosUtil['principal']}>
      <CaixaTexto valor={restantes} />
      <ContainerPericiasSelecionaveis
        pericias={listaPericias} // usa a lista líquida
        selecionados={selecionados}
        onToggle={handleTogglePericia}
        limite={Cap()} // passa o valor numérico
      />
      <div className={estilosUtil['container-botoes-avanco']}>
        {botoes?.esquerdo && botoes.esquerdo}
        {(restantes === 0) ? (botoes?.direito && botoes.direito) : <p>Escolha o requerido</p>}
      </div>
    </div>
  );
}