import { useState } from "react";
import { HeaderBase } from "../../../componentes/header/headers";
import { PoderClasse, listaPoderesExemplo } from "./PoderClasse";
import { BotaoAvancarNEX, CaixaTexto } from "../../../componentes/criador-ficha/componentes";
import clsx from "clsx";
import estilosNEX from './nex.module.css';
import { handleSelectUnico } from "../../../assets/utils/SelecaoUnica"; // Ajuste o path conforme necessário
import { BotaoVoltarNEX } from "../../../componentes/criador-ficha/componentes";

// Dados de exemplo para as habilidades de trilha
const trilhasExemplo = [
  {
    id: 1,
    nome: "Guerreiro",
    habilidadeTrilha: ["Golpe Poderoso", "Postura Implacável", "Ataque Reflexo", "Mestre das Armas"],
  },
  {
    id: 2,
    nome: "Feiticeiro",
    habilidadeTrilha: ["Magia Acelerada", "Metamagia", "Proteção Arcana", "Toque Vampírico"],
  },
  {
    id: 3,
    nome: "Ladino",
    habilidadeTrilha: ["Ataque Furtivo", "Esquiva Sobrenatural", "Veneno Mortal", "Sombra Evasiva"],
  },
  {
    id: 4,
    nome: "Clérigo",
    habilidadeTrilha: ["Cura Divina", "Escudo Sagrado", "Fúria Divina", "Intervenção Celestial"],
  },
  {
    id: 5,
    nome: "Bárbaro",
    habilidadeTrilha: ["Fúria Incontrolável", "Pele de Pedra", "Grito de Guerra", "Investida Devastadora"],
  },
];

function HabilidadeTrilha({ trilha, isSelected, onSelect }) {
  const handleClick = () => {
    if (isSelected) {
      onSelect(null);
    } else {
      onSelect(trilha.id);
    }
  };

  return (
    <div className={clsx(estilosNEX['poder-classe'])}>
      <div className={estilosNEX['coluna'], estilosNEX['dados-poder-classe']}>
        <strong>{trilha.habilidadeTrilha[0]}</strong>
        <p>{trilha.nome}</p>
      </div>
      <input type="checkbox" checked={isSelected} onChange={handleClick} />
    </div>
  );
}

function ContainerTrilha({ trilhas, selectedId, onSelect }) {
  return (
    <div className={estilosNEX['container-poderes']}>
      {trilhas.map((trilha) => (
        <HabilidadeTrilha
          key={trilha.id}
          trilha={trilha}
          isSelected={selectedId === trilha.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function ContainerPoderClasse({ poderes, selectedId, onSelect }) {
  return (
    <div className={estilosNEX['container-poderes']}>
      {poderes.map((poder) => (
        <PoderClasse
          key={poder.id}
          poder={poder}
          isSelected={selectedId === poder.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function ContainerDivisor({ isPoderTrilha, selectedItem, onSelectPoder, onSelectTrilha }) {
  if (isPoderTrilha) {
    return (
      <ContainerTrilha
        trilhas={trilhasExemplo}
        selectedId={selectedItem?.type === "trilha" ? selectedItem.id : null}
        onSelect={onSelectTrilha}
      />
    );
  } else {
    return (
      <ContainerPoderClasse
        poderes={listaPoderesExemplo}
        selectedId={selectedItem?.type === "poder" ? selectedItem.id : null}
        onSelect={onSelectPoder}
      />
    );
  }
}

function BotaoDivisor({ texto, aoClicar, valor, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      aoClicar(!valor);
    }
  };

  return (
    <button className={estilosNEX['botao-versatilidade']} onClick={handleClick} disabled={disabled}>
      {texto}
    </button>
  );
}

function Versatilidade({botao}) {
  const [exibirTrilha, setExibirTrilha] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectPoder = (id) => {
    // Usa handleSelectUnico com string composta "poder_id"
    const novoItemStr = handleSelectUnico(
      selectedItem ? `${selectedItem.type}_${selectedItem.id}` : null,
      id !== null ? `poder_${id}` : null
    );
    if (novoItemStr === null) {
      setSelectedItem(null);
    } else {
      const [type, idStr] = novoItemStr.split('_');
      setSelectedItem({ type, id: Number(idStr) });
    }
  };

  const handleSelectTrilha = (id) => {
    const novoItemStr = handleSelectUnico(
      selectedItem ? `${selectedItem.type}_${selectedItem.id}` : null,
      id !== null ? `trilha_${id}` : null
    );
    if (novoItemStr === null) {
      setSelectedItem(null);
    } else {
      const [type, idStr] = novoItemStr.split('_');
      setSelectedItem({ type, id: Number(idStr) });
    }
  };

  const handleTrocarAba = (novoEstado) => {
    setExibirTrilha(novoEstado);
    setSelectedItem(null);
  };

  return (
    <>
    
      <div className={clsx(estilosNEX['container-principal-nex'], estilosNEX['container-versatilidade'])}>
        
        <CaixaTexto texto={"Escolha entre um poder de sua classe ou a primeira habilidade de outra trilha"} tela={'versatilidade'} />
        <div className={estilosNEX['container-maior']}>
          <div className={clsx(estilosNEX['container-botoes-versatilidade'], estilosNEX['linha'])}>
            <BotaoDivisor
              aoClicar={handleTrocarAba}
              valor={exibirTrilha}
              texto={"Poder de Classe"}
              disabled={!exibirTrilha}
            />
            <BotaoDivisor
              aoClicar={handleTrocarAba}
              valor={exibirTrilha}
              texto={"Habilidade de Trilha"}
              disabled={exibirTrilha}
            />
          </div>
          <div className={clsx(estilosNEX['container-menor'], estilosNEX['container-menor-versatilidade'])}>
            <ContainerDivisor
              isPoderTrilha={exibirTrilha}
              selectedItem={selectedItem}
              onSelectPoder={handleSelectPoder}
              onSelectTrilha={handleSelectTrilha}
            />
          </div>
        </div>
        <div className={estilosNEX['container-botoes-avanco']}>
          <BotaoVoltarNEX />
          {(selectedItem) ? botao : "Escolha um"} 
        </div>
      </div>
    </>
  );
}

export default Versatilidade;