
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

function StatusContainer({vidaAtual, vidaMaxima}) {

}

export {Atributos}