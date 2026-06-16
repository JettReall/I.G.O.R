import React, { useState } from 'react';
import estilosEtapas from './etapas.module.css';
import clsx from 'clsx';
import { CaixaTexto, BotaoAvancarEtapa } from '../../componentes/criador-ficha/componentes';
import { handleSelectUnico } from '../../assets/utils/SelecaoUnica';
import { useEtapa } from '../../componentes/EtapaContext'; // importa o contexto

import combatenteImg from '../../assets/imagens/elementos/combatente.png';
import especialistaImg from '../../assets/imagens/elementos/especialista.png';
import ocultistaImg from '../../assets/imagens/elementos/ocultista.png';
import indefinidoImg from '../../assets/imagens/elementos/indefinido.png';

const imagens = {
  combatente: combatenteImg,
  especialista: especialistaImg,
  ocultista: ocultistaImg,
  indefinido: indefinidoImg,
};

const classesInfo = ["Combatente", "Especialista", "Ocultista"];

const trilhasPorClasse = {
  Combatente: ["guerreiro", "Comandante de campo", "Aniquilador", "Tropa de choque"],
  Especialista: ["Técnico", "Médico de campo", "Negociador", "Atirador de elite","Australupiteco","Camvio","Canario"],
  Ocultista: ["Graduado", "Intuitivo", "Conduite"],
};

function BotaoClasseTrilha({ texto, selecionado, aoClicar }) {
  return (
    <button
      className={estilosEtapas?.['botao-classe-trilha'] || ''}
      disabled={selecionado}
      onClick={() => aoClicar(texto)}
    >
      {texto}
    </button>
  );
}

function ContainerClasseTrilhaInfo({ classe, trilha }) {
  return (
    <div className={clsx(estilosEtapas['container-info-classe-trilha'], estilosEtapas['coluna'])}>
      <strong>Classe: {classe}</strong>
      <strong>Trilha: {trilha}</strong>
    </div>
  );
}

function BotaoAvanco({ classeSelecionada, trilhaSelecionada, flagTrilha, aoAvancar, aoFinalizar }) {
  const isDisabled = flagTrilha
    ? trilhaSelecionada === ""
    : classeSelecionada === "";

  if (!flagTrilha) {
    return (
      <button disabled={isDisabled} onClick={aoAvancar} className={estilosEtapas['avanco-etapa2']}>
        Avançar
      </button>
    );
  } else {
    return (
      <BotaoAvancarEtapa
        isDisabled={isDisabled}
        funcaoAntesAvancar={() => {
          console.log("Etapa 2 concluída:", { classe: classeSelecionada, trilha: trilhaSelecionada });
          aoFinalizar(); // opcional: chamar qualquer outra ação antes de avançar
        }}
      />
    );
  }
}

function BotaoVoltar({ flagTrilha, aoRetornar, aoVoltarEtapa }) {
  if (!flagTrilha) {
    return (
      <button onClick={aoVoltarEtapa} className={estilosEtapas['avanco-etapa2']}>
        Voltar etapa
      </button>
    );
  } else {
    return (
      <button onClick={aoRetornar} className={estilosEtapas['avanco-etapa2']}>
        Voltar às classes
      </button>
    );
  }
}

function SeletorClasseTrilha({ classeSelecionada, trilhaSelecionada, flagTrilha, aoSelecionar }) {
  if (flagTrilha) {
    const trilhas = trilhasPorClasse[classeSelecionada] || [];
    return (
      <div className={clsx(estilosEtapas['coluna'], estilosEtapas['botoes-etapa2'])}>
        {trilhas.map((trilha) => (
          <BotaoClasseTrilha
            key={trilha}
            texto={trilha}
            selecionado={trilha === trilhaSelecionada}
            aoClicar={aoSelecionar}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={clsx(estilosEtapas['coluna'], estilosEtapas['botoes-etapa2'])}>
      {classesInfo.map((classe) => (
        <BotaoClasseTrilha
          key={classe}
          texto={classe}
          selecionado={classe === classeSelecionada}
          aoClicar={aoSelecionar}
        />
      ))}
    </div>
  );
}

function ContainerImagem({ classe }) {
  const imagem = classe ? imagens[classe.toLowerCase()] : imagens.indefinido;
  return (
    <div className={estilosEtapas['container-imagem']}>
      <img src={imagem} alt={`Imagem da classe ${classe}`} />
    </div>
  );
}

function Etapa2() {
  const { updateEtapa, etapaAtual } = useEtapa(); // usa o contexto
  const [classes, setClasses] = useState({ classeAgente: "", trilhaAgente: "" });
  const [flagTrilha, setFlagTrilha] = useState(false);

  const handleSelecionar = (valor) => {
    if (!flagTrilha) {
      const novaClasse = handleSelectUnico(classes.classeAgente, valor);
      setClasses((prev) => ({ ...prev, classeAgente: novaClasse, trilhaAgente: "" }));
    } else {
      const novaTrilha = handleSelectUnico(classes.trilhaAgente, valor);
      setClasses((prev) => ({ ...prev, trilhaAgente: novaTrilha }));
    }
  };

  const handleAvancar = () => {
    if (!flagTrilha) {
      setFlagTrilha(true);
    }
  };

  const handleRetornar = () => {
    if (flagTrilha) {
      setFlagTrilha(false);
    }
  };

  const handleVoltarEtapa = () => {
    updateEtapa(etapaAtual - 1); // volta para etapa 1
  };

  const handleFinalizar = () => {
    // qualquer outra ação antes de avançar (ex.: salvar dados)
    console.log("Preparando para avançar para etapa 3");
  };

  return (
    <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa2'])}>
      <div className={estilosEtapas['caixa-texto-etapa2']}>
        <CaixaTexto texto={"Próxima etapa: Escolha a classe e a trilha."} tela={'caixa-etapa2'} />
      </div>

      <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['slot-imagem-etapa2'], estilosEtapas['coluna'])}>
        <ContainerImagem classe={classes.classeAgente} />
        <ContainerClasseTrilhaInfo classe={classes.classeAgente} trilha={classes.trilhaAgente} />
      </div>

      <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['seletor-etapa2'], estilosEtapas['coluna'])}>
        <SeletorClasseTrilha
          classeSelecionada={classes.classeAgente}
          trilhaSelecionada={classes.trilhaAgente}
          flagTrilha={flagTrilha}
          aoSelecionar={handleSelecionar}
        />

        <div className="">
          <BotaoVoltar
            flagTrilha={flagTrilha}
            aoRetornar={handleRetornar}
            aoVoltarEtapa={handleVoltarEtapa}
          />
          <BotaoAvanco
            classeSelecionada={classes.classeAgente}
            trilhaSelecionada={classes.trilhaAgente}
            flagTrilha={flagTrilha}
            aoAvancar={handleAvancar}
            aoFinalizar={handleFinalizar}
          />
        </div>
      </div>
    </div>
  );
}

export default Etapa2;