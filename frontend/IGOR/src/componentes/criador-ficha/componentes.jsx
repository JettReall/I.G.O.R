
import clsx from 'clsx'
import estilos from './componentes.module.css'
import estilosFicha from '../ficha/componentes.module.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';


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

function BotaoAvancarEtapa({ isDisabled, etapaAtual, funcaoAntesAvancar }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // 1. Executa a função específica da etapa (se existir)
    if (funcaoAntesAvancar) {
      funcaoAntesAvancar();
    }

    // 2. Avança para a próxima etapa
    const proximaEtapa = etapaAtual + 1;
    navigate(`/etapa_${proximaEtapa}`);
  };

  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={estilos['botao-avancar']}
    >
      Avançar
    </button>
  );
}

function BotaoVoltarEtapa({ etapaAtual }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // 2. Avança para a próxima etapa
    const proximaEtapa = etapaAtual - 1;
    navigate(`/etapa_${proximaEtapa}`);
  };

  return (
    <button
      onClick={handleClick}
      className={estilos['botao-avancar']}
    >
      Voltar
    </button>
  );
}

function BotaoAvancarNEX( {isDisabled} ) {
//Sem funcionalidade por agora
return <button disabled={isDisabled} className={estilos['botao-avancar']}>Avançar</button>
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
  
}