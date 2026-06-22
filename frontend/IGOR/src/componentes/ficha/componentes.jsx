
import { useState } from 'react';
import clsx from 'clsx';

import estilos from './componentes.module.css'
import { Link } from 'react-router-dom';

import Lapis from '../../assets/imagens/icones/lapis.png'
import LevelUP from '../../assets/imagens/icones/level-up.png'
import AddIcone from '../../assets/imagens/icones/add.png'
import Delete from '../../assets/imagens/icones/lixo.png'
import InfoIcone from '../../assets/imagens/icones/simbolo-de-informacao.png'

import iconeSangue from '../../assets/imagens/elementos/icone-elementos/icone-sangue.png';
import iconeMorte from '../../assets/imagens/elementos/icone-elementos/icone-morte.png';
import iconeEnergia from '../../assets/imagens/elementos/icone-elementos/icone-energia.png';
import iconeConhecimento from '../../assets/imagens/elementos/icone-elementos/icone-conhecimento.png';
import iconeMedo from '../../assets/imagens/elementos/icone-elementos/icone-medo.png';

     const estiloImg = {
          'width':'100%',
          'height': '100%',
          'objectFit':'contain',
          'transform':'scale(0.9)'
     }

function AtributoValor({atr,valor}) {
     return (
          <div className={clsx(estilos.atributo, estilos[atr])}>
               <strong>{valor}</strong>
          </div>
     )
}

function Afinidade({elemento}) {
     let ImagemAfinidade = "";

     if (elemento) {
     elemento = elemento.toUpperCase();   // ← método correto
     console.log(elemento);
     
     }

     switch (elemento) {
               case "SANGUE":
                    ImagemAfinidade = iconeSangue;            
                    break;
               case "MORTE":
                    ImagemAfinidade = iconeMorte;
                    break;
               case "ENERGIA":
                    ImagemAfinidade = iconeEnergia;
                    break;
               case "CONHECIMENTO":
                    ImagemAfinidade = iconeConhecimento;
                    break;
               default:
                    ImagemAfinidade = iconeMedo;
                    elemento = "INDEFINIDO";
                    break;
     }





     return <div className={estilos["afinidade"]}>
               <strong className={estilos['titulo-afinidade']}>AFINIDADE</strong>
               <div className={estilos["circulo-afinidade"]}>
                    <img src={ImagemAfinidade} alt="" style={estiloImg}/>
               </div>
               <strong className={estilos["nome-elemento"]}>{elemento}</strong>
          </div>
}


function Atributos({atributos_lista, afinidade}) {

  return (
    <div className={estilos["atributos-container"]}>
      {atributos_lista.map((atr) => (
        <AtributoValor 
          key={atr.nome} 
          atr={atr.nome} 
          valor={atr.valor} 
        />
      ))}
     <Afinidade elemento={afinidade}/> 
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

function AtaqueRitual({dados_ataque_ritual, isHeader, imagem, tootlip}) {

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
                    <img src={imagem} alt="" style={estiloImg} title={tootlip} />
               </button>
          </div>
     )

}

function Item({dados_item, isHeader, imagem}) {
          let tooltipImg = "";
          let classeHeader = "";
     if (isHeader) {
          classeHeader = "header";
          tooltipImg = "Adicionar Item"; 
     } else {
          classeHeader = "";
          tooltipImg = "Apagar Item";
     }
     return (
          <div className={clsx(estilos['elemento-container'],estilos[classeHeader])}>
               <strong className={estilos['item-nome']}>{dados_item.nome}</strong>
               <strong className={estilos['item-categoria']}>{dados_item.categoria}</strong>
               <strong className={estilos['item-quantia']}>{dados_item.quantia}</strong>
               <strong className={estilos['item-carga']}>{dados_item.carga}</strong>
               <strong className={estilos['item-total']}>{dados_item.total}</strong>
               <button className={estilos['botao-item']}>
                    <img src={imagem} alt="" style={estiloImg} title={tooltipImg} />
               </button>
          </div>
     )

}


function InfoPersona({dados_persona}) {
     return (
          <div className={estilos['container-persona']}>
               <div className={clsx(estilos['linha'], estilos['classe-trilha-nomes'])}>
               <strong className={estilos['trilha']}>{dados_persona?.trilha}</strong>
               <strong>{dados_persona.classe}</strong>
               </div>
               <strong>Origem: {dados_persona.origem}</strong>
               <div style={{display: 'flex', flexDirection: 'row', 
                    justifyContent:'space-evenly',
                    width:'90%'}}>
                    <div style={{display: 'flex',flexDirection: 'column',placeItems: 'center'}}>
                         <strong style={{width:'190px'}}>Nome do Agente:</strong>
                         <strong>{dados_persona.persona}</strong>
                    </div>
                    <div style={{display: 'flex',flexDirection: 'column',placeItems: 'center'}}>
                         <strong>Jogador:</strong>
                         <strong>{dados_persona.jogador}</strong>
                    </div>
               </div>
               <></>
          </div>
     )
}


function BotaoAumentarNex( {caminho} ) {


     return (
          <Link to={caminho}>
               <button className={estilos['aumentarNEX']}>
                    <img src={LevelUP} alt="" style={estiloImg} title='Aumentar nível do personagem'/>
               </button>
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