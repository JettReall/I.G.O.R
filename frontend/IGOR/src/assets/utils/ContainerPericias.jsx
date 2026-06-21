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

function extrairDadosPericia(item) {
  if (item.pericia) {
    return {
      id: item.pericia.id,
      nome: item.pericia.nome,
      atributo: item.pericia.atributo,
      treino: item.treino || 0,
      descricao: item.pericia.descricao || ""
    };
  }
  return {
    id: item.id,
    nome: item.nome,
    atributo: item.atributo,
    treino: item.treino || 0,
    descricao: item.descricao || ""
  };
}

function PericiaSeletor({ dados, isChecked, onChange }) {
  const pericia = extrairDadosPericia(dados);

  const handleClick = () => {
    onChange(pericia.id);
  };

  return (
    <div className={estilosUtil['pericia-etapas']}>
      <div className={estilosUtil['pericia-etapas-info']}>
        <strong className={estilosUtil?.['pericia-etapas-nome'] || ''}>{pericia.nome}</strong>
        <div className={clsx(estilosUtil['linha'], estilosUtil['pericia-info-extra'])}>
          <p className={estilosUtil?.['pericia-etapas-atributo'] || ''}>{pericia.atributo}</p>
          <p className={estilosUtil?.['pericia-etapas-treino'] || ''}>Treino: {pericia.treino}</p>
        </div>
      </div>
      <input type="checkbox" checked={isChecked} onChange={handleClick} className={estilosUtil['pericia-checkbox']} />
    </div>
  );
}

function ContainerPericiasSelecionaveis({ pericias, selecionados, onToggle }) {
  return (
    <div className={clsx(estilosUtil['container-menor'], estilosUtil['pericias-etapa4'])}>
      {pericias.map((pericia) => {
        const id = pericia.pericia ? pericia.pericia.id : pericia.id;
        return (
          <PericiaSeletor
            key={id}
            dados={pericia}
            isChecked={selecionados.includes(id)}
            onChange={onToggle}
          />
        );
      })}
    </div>
  );
}

export function SeletorDePericias({ 
  periciasElegiveis, 
  listaPericias, 
  botoes, 
  selecionados, 
  onToggle, 
  isEtapa4,
  constExtra = 0  // renomeado
}) {
  // constExtra = número de perícias fixas já selecionadas (origem + classe)
  // restantes = periciasElegiveis - (selecionados.length - constExtra)
  const restantes = periciasElegiveis - selecionados.length + constExtra;

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