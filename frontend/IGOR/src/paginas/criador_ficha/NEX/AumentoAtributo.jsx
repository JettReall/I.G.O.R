import { BotaoAvancarNEX, CaixaTexto, ExibeAtributos } from "../../../componentes/criador-ficha/componentes";
import { useState, useEffect } from "react";
import { handleSelectUnico } from "../../../assets/utils/SelecaoUnica";
import estilosNEX from './nex.module.css'
import { HeaderBase } from "../../../componentes/header/headers";
import clsx from "clsx";

const nomeAtributo = [
  { nome: "Força", relativo: "for" },
  { nome: "Agilidade", relativo: "agi" },
  { nome: "Vigor", relativo: "vig" },
  { nome: "Intelecto", relativo: "int" },
  { nome: "Presença", relativo: "pre" },
];

function BotaoAtributo({ nome, isSelected, onSelect }) {
  const handleClick = () => {
    // Chama onSelect passando o nome do botão clicado
    onSelect(nome);
  };

  let classNameEscolhido = ""

  if (isSelected) {
     classNameEscolhido = "escolhido";
  } else {
     classNameEscolhido = ""
  }

  return (
    <button className={clsx(estilosNEX['botao-atributo'], estilosNEX[classNameEscolhido])}
      onClick={handleClick}
      disabled={isSelected}
    >
      {nome}
    </button>
  );
}

function ContainerBotaoAtributo({ atributos, selectedNome, onSelect }) {
  return (
    <div className={clsx(estilosNEX['container-botoes-atributo'],estilosNEX['coluna'])}>
      {atributos.map((attr) => (
        <BotaoAtributo
          key={attr.relativo}
          nome={attr.nome}
          isSelected={selectedNome === attr.nome}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function EscolherAumentoAtributo() {
  const [atributoEscolhido, setAtributoEscolhido] = useState(null);
  const desativar = atributoEscolhido === null;

  const handleSelect = (nomeClicado) => {
    // Usa a função utilitária para calcular o novo estado
    const novoSelecionado = handleSelectUnico(atributoEscolhido, nomeClicado);
    setAtributoEscolhido(novoSelecionado);
  };

  const [atributos, setAtributos] = useState([]);
  const dados = [
    { nome: "for", valor: 0 },
    { nome: "agi", valor: 0 },
    { nome: "vig", valor: 0 },
    { nome: "int", valor: 0 },
    { nome: "pre", valor: 0 },
  ];

  useEffect(() => {
    setAtributos(dados);
  }, []);

  return (
     <>
    <div className={clsx(estilosNEX['container-principal-nex'],estilosNEX['container-aumento-atributo'])}>
      <div className={estilosNEX['container-exibe-atributos']}>
          <ExibeAtributos atributos={atributos} />
      </div>
      <div className={clsx(estilosNEX['container-r-aumento-atributo'],estilosNEX['coluna'])}>
          <CaixaTexto
               texto={
               "Escolha um atributo para aumentar o valor em 1. Não é possível aumentar o valor para mais do que 5."
          }
          />
               <ContainerBotaoAtributo
               atributos={nomeAtributo}
               selectedNome={atributoEscolhido}
               onSelect={handleSelect}
               />
               <BotaoAvancarNEX isDisabled={desativar} />
      </div>
    </div>
     </>
  );
}

export default EscolherAumentoAtributo;