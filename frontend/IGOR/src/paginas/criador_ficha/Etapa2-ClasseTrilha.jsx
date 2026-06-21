import React, { useState, useEffect } from 'react'; // adicionado useEffect
import estilosEtapas from './etapas.module.css';
import clsx from 'clsx';
import { CaixaTexto, BotaoAvancarEtapa, BotaoVoltarEtapa } from '../../componentes/criador-ficha/componentes';
import { handleSelectUnico } from '../../assets/utils/SelecaoUnica';
import { useEtapa } from '../../componentes/EtapaContext';
import { etapa2_dados } from './VariaveisSistema';

import combatenteImg from '../../assets/imagens/elementos/combatente.png';
import especialistaImg from '../../assets/imagens/elementos/especialista.png';
import ocultistaImg from '../../assets/imagens/elementos/ocultista.png';
import indefinidoImg from '../../assets/imagens/elementos/indefinido.png';
import { HeaderBase } from '../../componentes/header/headers';

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
          aoFinalizar(); // chama a função de finalização (que salva)
        }}
      />
    );
  }
}

function BotaoVoltar({ flagTrilha, aoRetornar, aoVoltarEtapa }) {
  if (!flagTrilha) {
    return (
      <BotaoVoltarEtapa />
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
  const { updateEtapa, etapaAtual } = useEtapa();

  // Estados temporários (renomeados com sufixo Temp)
  const [classesTemp, setClassesTemp] = useState({ classeAgente: "", trilhaAgente: "" });
  const [flagTrilha, setFlagTrilha] = useState(false);

  // Carregar dados salvos ao montar o componente
  useEffect(() => {
    const temDados = etapa2_dados.classeAgenteEscolhida !== "" || 
                      etapa2_dados.trilhaAgenteEscolhida !== "";

    if (temDados) {
      setClassesTemp({
        classeAgente: etapa2_dados.classeAgenteEscolhida,
        trilhaAgente: etapa2_dados.trilhaAgenteEscolhida,
      });
    }
  }, []);

  const handleSelecionar = (valor) => {
    if (!flagTrilha) {
      const novaClasse = handleSelectUnico(classesTemp.classeAgente, valor);
      setClassesTemp((prev) => ({ ...prev, classeAgente: novaClasse, trilhaAgente: "" }));
    } else {
      const novaTrilha = handleSelectUnico(classesTemp.trilhaAgente, valor);
      setClassesTemp((prev) => ({ ...prev, trilhaAgente: novaTrilha }));
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
    updateEtapa(etapaAtual - 1);
  };

  // Função SalvarEtapa2 – salva os dados na variável global
  const SalvarEtapa2 = () => {
    etapa2_dados.classeAgenteEscolhida = classesTemp.classeAgente;
    etapa2_dados.trilhaAgenteEscolhida = classesTemp.trilhaAgente;
    console.log("Dados da Etapa 2 salvos em etapa2_dados:", etapa2_dados);
  };

  return (
    <>

      <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa2'])}>
        <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['slot-imagem-etapa2'], estilosEtapas['coluna'])}>
          <ContainerImagem classe={classesTemp.classeAgente} />
          <ContainerClasseTrilhaInfo classe={classesTemp.classeAgente} trilha={classesTemp.trilhaAgente} />
        </div>

        <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['seletor-etapa2'], estilosEtapas['coluna'])}>
          <SeletorClasseTrilha
            classeSelecionada={classesTemp.classeAgente}
            trilhaSelecionada={classesTemp.trilhaAgente}
            flagTrilha={flagTrilha}
            aoSelecionar={handleSelecionar}
          />

          <div className={estilosEtapas['container-botoes-avanco']}>
            <BotaoVoltar
              flagTrilha={flagTrilha}
              aoRetornar={handleRetornar}
              aoVoltarEtapa={handleVoltarEtapa}
            />
            <BotaoAvanco
              classeSelecionada={classesTemp.classeAgente}
              trilhaSelecionada={classesTemp.trilhaAgente}
              flagTrilha={flagTrilha}
              aoAvancar={handleAvancar}
              aoFinalizar={SalvarEtapa2}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Etapa2;