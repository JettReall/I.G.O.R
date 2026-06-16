import React, { useState } from 'react';
// Assumindo que 'estilos' seja um CSS Module importado (ajuste conforme necessário)
 import estilosEtapas from './etapas.module.css';
import clsx from 'clsx';
import { CaixaTexto, BotaoAvancarEtapa, BotaoVoltarEtapa } from '../../componentes/criador-ficha/componentes';
import { handleSelectUnico } from '../../assets/utils/SelecaoUnica';
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

const classesInfo = ["Combatente", "Especialista", "Ocultista"]; // Read-only

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
    <div className={clsx(estilosEtapas['container-info-classe-trilha'],estilosEtapas['coluna'])}>
      <strong>Classe: {classe}</strong>
      <strong>Trilha: {trilha}</strong>
    </div>
  );
}

function BotaoAvanco({ classeSelecionada, trilhaSelecionada, flagTrilha, aoAvancar }) {
  const isDisabled = flagTrilha
    ? trilhaSelecionada === ""
    : classeSelecionada === "";

    if(!flagTrilha) {
  return (
    <button disabled={isDisabled} onClick={aoAvancar} className={estilosEtapas['avanco-etapa2']}>
      Avançar
    </button>
  );
  } else {
    return (
      <BotaoAvancarEtapa  etapaAtual={2} isDisabled={isDisabled} funcaoAntesAvancar={console.log(classeSelecionada, trilhaSelecionada)}/>
    )
  }

  //Caso flagtrilha esteja ativada, deve ser BotaoAvancarEtapa no lugar
}

function SeletorClasseTrilha({ classeSelecionada, trilhaSelecionada, flagTrilha, aoSelecionar }) {
  // Se estiver no modo trilha, exibe as trilhas da classe selecionada
  if (flagTrilha) {
    const trilhas = trilhasPorClasse[classeSelecionada] || [];
    return (
      <div className={clsx(estilosEtapas['coluna'],estilosEtapas['botoes-etapa2'])}>
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

  // Modo classe: exibe as classes disponíveis
  return (
    <div className={clsx(estilosEtapas['coluna'],estilosEtapas['botoes-etapa2'])}>
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
  const [classes, setClasses] = useState({ classeAgente: "", trilhaAgente: "" });
  const [flagTrilha, setFlagTrilha] = useState(false); // false = selecionando classe, true = selecionando trilha

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
      // Avança para a seleção de trilha
      if (classes.classeAgente !== "") {
        setFlagTrilha(true);
      }
    } else {
      // Modo trilha: aqui você pode finalizar a etapa ou chamar um callback
      if (classes.trilhaAgente !== "") {
        console.log("Etapa 2 concluída:", classes);
        // Exemplo: this.props.onComplete(classes);
      }
    }
  };

  return (
    <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa2'])}>

     <div className={estilosEtapas['caixa-texto-etapa2']}>
          <CaixaTexto texto={"Próxima etapa: Escolha a classe e a trilha."} tela={'caixa-etapa2'}/>
     </div>

     <div className={clsx(estilosEtapas['container-menor'],estilosEtapas['slot-imagem-etapa2'],estilosEtapas['coluna'])}>

          <ContainerImagem classe={classes.classeAgente} />
          <ContainerClasseTrilhaInfo classe={classes.classeAgente} trilha={classes.trilhaAgente} />
          
     </div>

      <div className={clsx(estilosEtapas['container-menor'],estilosEtapas['seletor-etapa2'],estilosEtapas['coluna'])}>

          <SeletorClasseTrilha
          classeSelecionada={classes.classeAgente}
          trilhaSelecionada={classes.trilhaAgente}
          flagTrilha={flagTrilha}
          aoSelecionar={handleSelecionar}
          />

          <div className="">

           <BotaoVoltarEtapa etapaAtual={2}/>

          <BotaoAvanco
          classeSelecionada={classes.classeAgente}
          trilhaSelecionada={classes.trilhaAgente}
          flagTrilha={flagTrilha}
          aoAvancar={handleAvancar}
          />
          </div>

        </div>
    </div>
  );
}

export default Etapa2;