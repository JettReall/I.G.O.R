
import clsx from 'clsx'
import estilos from './componentes.module.css'
import React from 'react';


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

function CaixaTexto({ texto }) {
  return (
    <div className={estilos?.['caixa-texto'] || ''}>
      <p>{texto}</p>
    </div>
  );
}

function BotaoAvancarEtapa( {isDisabled} ) {
//Sem funcionalidade por agora
return <button disabled={isDisabled} className={estilos['botao-avancar-etapa']}>Avançar</button>
}

function BotaoCancelarCriacao() {
     //Vazio por agora
}

export {
     InputComBotao,
     CaixaTexto,
    BotaoAvancarEtapa,
     BotaoCancelarCriacao,
}