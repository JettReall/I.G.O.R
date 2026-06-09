
import { useState } from 'react';
import clsx from 'clsx';

import estilos from './componentes.module.css'


function AtributoValor({atr,valor}) {
     return (
          <div className={clsx(estilos.atributo, estilos[atr])}>
               <strong>{valor}</strong>
          </div>
     )
}

function Afinidade({elemento}) {

     if (!elemento) {
          elemento = "INDEFINIDO"
     }

     return <div className={estilos["afinidade"]}>
               <strong className={estilos['titulo-afinidade']}>AFINIDADE</strong>
               <div className={estilos["circulo-afinidade"]}>

               </div>
               <strong className={estilos["nome-elemento"]}>{elemento}</strong>
          </div>
}

function Atributos() {

     const [atributos, setAtributos] = useState([
     { nome: "for", valor: 0 },
     { nome: "agi", valor: 0 },
     { nome: "vig", valor: 0 },
     { nome: "int", valor: 0 },
     { nome: "pre", valor: 0 }
     ]);

  return (
    <div className={estilos["atributos-container"]}>
      {atributos.map((atr) => (
        <AtributoValor 
          key={atr.nome} 
          atr={atr.nome} 
          valor={atr.valor} 
        />
      ))}
     <Afinidade/> 
    </div>
  );
}

function Status({nome,valor,lado, isDadoUnico}) {
     let  classeDupla = "dupla"

     if(!lado) {
          lado = "up"
     }

     if (isDadoUnico === true) {
          classeDupla = "solo"
     }

     return (
     
     <div className={clsx(estilos['container-menor'],estilos[lado],estilos[classeDupla])}>
          <p className={estilos['nome-status']}>{nome}</p>
          <strong className={estilos['valor-status']}>{valor}</strong>
     </div>
     )
}

function StatusContainer({nome_up, valor_up, nome_down, valor_down,isDadoUnico}) {

     if (!isDadoUnico) {
          return (
               <div className={clsx(estilos["container-status"])}>
                    <Status valor={valor_up} nome={nome_up} lado={"up"} isDadoUnico={isDadoUnico}/>
                    <Status valor={valor_down} nome={nome_down} lado={"down"}/>
               </div>
          )
     }  else {
          return (
               <div className={clsx(estilos["container-status"])}>
                    <Status valor={valor_up} nome={nome_up} lado={"up"} isDadoUnico={isDadoUnico}/>
               </div>
          )
     }
}

function Pericia({ dados, isHeader}) {   // ← recebe um objeto chamado "dados"
     let classeHeader = "";
     if (isHeader) {
          classeHeader = "header";
     } else {
          classeHeader = ""
     }

  return (
    <div className={clsx(estilos['elemento-container'],estilos[classeHeader])}>
      <strong className={estilos['pericia-nome']}>{dados.nome}</strong>
      <strong className={estilos['pericia-atributo']}>{dados.atributo}</strong>
      <strong className={estilos['pericia-treino']}>{dados.treino}</strong>
      <strong className={estilos['pericia-bonus']}>{dados.bonus}</strong>
      <strong className={estilos['pericia-extra']}>{dados.extra}</strong>
      <strong className={estilos['pericia-total']}>{dados.total}</strong>
    </div>
  );
}

function AtaqueRitual({dados_ataque_ritual, isHeader}) {

          let classeHeader = "";
     if (isHeader) {
          classeHeader = "header";
     } else {
          classeHeader = ""
     }
     return (
          <div className={clsx(estilos['elemento-container'],estilos[classeHeader])}>
               <strong className={estilos['ataque-ritual-nome']}>{dados_ataque_ritual.nome}</strong>
               <strong className={estilos['ataque-ritual-categoria']}>{dados_ataque_ritual.categoria}</strong>
               <strong className={estilos['ataque-ritual-tipo']}>{dados_ataque_ritual.tipo}</strong>
               <button className={estilos['informacao-ataque-ritutal']}>
                    <img src="..\..\assets\imagens\icones\simbolo-de-informacao.png" alt="" />
               </button>
          </div>
     )

}


export {Atributos, StatusContainer, Pericia, AtaqueRitual}