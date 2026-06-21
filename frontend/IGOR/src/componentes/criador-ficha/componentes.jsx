
import clsx from 'clsx'
import estilos from './componentes.module.css'
import estilosFicha from '../ficha/componentes.module.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEtapa } from '../EtapaContext';
import { useNEX } from '../NEXContext';


function InputComBotao({ valor, aoMudar, aoIncrementar, aoDecrementar, classeExtra, min, max, nome, texto }) {

     if(!classeExtra) {
          classeExtra = ""
     }

  return (
<div className={clsx(estilos['input-com-botao'], classeExtra && estilos[classeExtra])}>
      <strong className={estilos['titulo-pequeno']}>{texto}</strong>
      <div className={estilos['trio-botoes']}>
        <button type="button" onClick={aoDecrementar} className={clsx(estilos['muda'],estilos[classeExtra], estilos['l'])}>-</button>
        <input 
          name={nome} 
          type="number" 
          placeholder="0" 
          min={min} 
          max={max} 
          value={valor} 
          onChange={aoMudar} 
          readOnly
        />
        <button type="button" onClick={aoIncrementar} className={clsx(estilos['muda'],estilos[classeExtra],estilos['r'])}>+</button>
      </div>
    </div>
  )
}

function CaixaTexto({ texto, tela }) {

  if (!tela) {
    tela = "vazia";
  }


  return (
    <div className={clsx(estilos['caixa-texto'], estilos[tela])}>
      
      <p>{texto}</p>
    </div>
  );
}

function BotaoAvancarEtapa({ isDisabled, funcaoAntesAvancar }) {
  const { etapaAtual, updateEtapa } = useEtapa();

  const handleClick = () => {
    if (funcaoAntesAvancar) funcaoAntesAvancar();
    updateEtapa(etapaAtual + 1);
  };

  return (
    <button disabled={isDisabled} onClick={handleClick} className={estilos['botao-avancar']}>
      Avançar
    </button>
  );
}
function BotaoVoltarEtapa({ }) {
  const { etapaAtual, updateEtapa } = useEtapa();

  const handleClick = () => {
    updateEtapa(etapaAtual - 1);
  };

  return (
    <button onClick={handleClick} className={clsx(estilos['botao-avancar'],estilos['voltar'])}>
      Voltar
    </button>
  );
}

function BotaoAvancarNEX({ isDisabled, funcaoAntesAvancar }) {
  const nexContext = useNEX();
  const etapaContext = useEtapa();

  const handleClick = () => {
    if (funcaoAntesAvancar) funcaoAntesAvancar();
    if (nexContext) {
      nexContext.avancarNex();
    } else if (etapaContext) {
      etapaContext.updateEtapa(etapaContext.etapaAtual + 1);
    }
  };

  return (
    <button disabled={isDisabled} onClick={handleClick} className={estilos['botao-avancar-nex']}>
      Avançar
    </button>
  );
}

function BotaoVoltarNEX({ isDisabled,  }) {
  const nexContext = useNEX();
  const etapaContext = useEtapa();

  const handleClick = () => {
    if (nexContext) {
      nexContext.voltarNex();
    } else if (etapaContext) {
      etapaContext.updateEtapa(etapaContext.etapaAtual - 1);
    }
  };

  return (
    <button disabled={isDisabled} onClick={handleClick} className={clsx(estilos['botao-avancar-nex'],estilos['voltar'])}>
      Voltar
    </button>
  );
}

function BotaoCancelarCriacao() {
     //Vazio por agora
}

function ExibeAtributos({ atributos }) {
  function AtributoValor({ atr, valor }) {
    return (
      <div className={clsx(estilosFicha.atributo, estilosFicha[atr])}>
        <strong>{valor}</strong>
      </div>
    );
  }

//Não mexer no classname deste
  return (
    <div className={estilosFicha["atributos-container"]}> 
      {atributos.map((atr) => (
        <AtributoValor key={atr.nome} atr={atr.nome} valor={atr.valor} />
      ))}
      {/* <Afinidade /> */}
    </div>
  );
}



export {
     InputComBotao,
     CaixaTexto,
    BotaoAvancarEtapa,
    BotaoVoltarEtapa,
     BotaoCancelarCriacao,
     BotaoAvancarNEX,
     ExibeAtributos,
     BotaoVoltarNEX
  
}