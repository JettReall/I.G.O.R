
import { useState } from 'react';
import clsx from 'clsx';

import estilos from './componentes.module.css'
import { Link } from 'react-router-dom';

import Lapis from '../../assets/imagens/icones/lapis.png'
import Delete from '../../assets/imagens/icones/lixo.png'



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


function Atributos({atributos_lista}) {
     const [atributos, setAtributos] = useState([
     { nome: "for", valor: 0 },
     { nome: "agi", valor: 0 },
     { nome: "vig", valor: 0 },
     { nome: "int", valor: 0 },
     { nome: "pre", valor: 0 }
     ]);



  return (
    <div className={estilos["atributos-container"]}>
      {atributos_lista.map((atr) => (
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
     let  classeDupla = "dupla";

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

function Item({dados_item, isHeader}) {

          let classeHeader = "";
     if (isHeader) {
          classeHeader = "header";
     } else {
          classeHeader = ""
     }
     return (
          <div className={clsx(estilos['elemento-container'],estilos[classeHeader])}>
               <strong className={estilos['item-nome']}>{dados_item.nome}</strong>
               <strong className={estilos['item-categoria']}>{dados_item.categoria}</strong>
               <strong className={estilos['item-quantia']}>{dados_item.quantia}</strong>
               <strong className={estilos['item-carga']}>{dados_item.carga}</strong>
               <strong className={estilos['item-total']}>{dados_item.total}</strong>
               <button className={estilos['botao-item']}>
                    <img src="..\..\assets\imagens\icones\lixo.png" alt="" />
               </button>
          </div>
     )

}


function InfoPersona({dados_persona}) {
     return (
          <div className={estilos['container-persona']}>
               <div className={clsx(estilos['linha'], estilos['classe-trilha-nomes'])}>
               <strong className={estilos['trilha']}>{dados_persona.trilha}</strong>
               <strong>{dados_persona.classe}</strong>
               </div>
               <strong>{dados_persona.origem}</strong>
               <strong>Jogador: {dados_persona.jogador}</strong>
          </div>
     )
}


function BotaoAumentarNex() {
     return (
          <Link to={null}>
               <button className={estilos['aumentarNEX']}></button>
          </Link>
     )
}




export {
     Atributos, 
     StatusContainer, 
     Pericia, 
     AtaqueRitual, 
     Item, 
     InfoPersona,
     BotaoAumentarNex,

}