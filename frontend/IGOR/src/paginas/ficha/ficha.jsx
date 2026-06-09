import { useState } from "react";
import clsx from "clsx";


import { HeaderBase } from "../../componentes/header/headers"
import { BotaoRetorno } from "../../componentes/botoes/Botoes"
import { StatusContainer, Atributos, Pericia, AtaqueRitual } from "../../componentes/ficha/componentes";
import estilos from './ficha.module.css'


//className={estilos['corpo']}



function ContainerPericias() {
     

const periciaExemplo = {
  nome: "Prestidigitação",
  atributo: "FOR",
  treino: 5,
  bonus: 2,
  extra: 0,
  total: 4   // normalmente calculado: (treino ? 2 : 0) + bonus + extra
};


const periciaExemplo2 = {
  nome: "Nome",
  atributo: "Atributo",
  treino: "Treino",
  bonus: "Bônus",
  extra: "Extra",
  total: "Total"  // normalmente calculado: (treino ? 2 : 0) + bonus + extra 
};


     return (
          <div className={estilos['container-pericias']}>
               <Pericia dados={periciaExemplo2} isHeader={true}></Pericia>
               <Pericia dados={periciaExemplo}></Pericia>
               <Pericia dados={periciaExemplo}></Pericia>

          </div>
     )
     
}

function ContainerAtaques() {

     const HeaderAtaque = {
     nome: "Nome",
     categoria: "Atributo Base",
     tipo: "Tipo de Ataque",
     }

     return (
          <div className="">
               <AtaqueRitual dados_ataque_ritual={HeaderAtaque} isHeader={true}/>
          </div>
     )


}

function ContainerRituais() {

     const HeaderRitual = {
     nome: "Ritual",
     categoria: "Criculo",
     tipo: "Elemento",
     }

     return (
          <AtaqueRitual dados_ataque_ritual={HeaderRitual} isHeader={true}/>
     )

}



function ContainerAtaqueRitual() {

  const [isRitual, setIsRitual] = useState(true);   
  const [abaRitual, setAbaRitual] = useState(true);
  const [abaAtaque, setAbaAtaque] = useState(false);

  const TrocaTela = () => {
    setIsRitual(!isRitual);    // alterna entre true/false
    setAbaRitual(!abaRitual);
    setAbaAtaque(!abaAtaque);
}

     const BotoesAtaqueRitual = () => {
          return (
               <div className={estilos['container-botao-atk-ritual']}>
                    <button className={estilos['botao-ataque-ritual']} disabled={abaRitual} onClick={TrocaTela}>Rituais</button>
                    <button className={estilos['botao-ataque-ritual']} disabled={abaAtaque} onClick={TrocaTela}>Ataques</button>
               </div>
          )
     }

////---------------------------------------------------------------
     if (isRitual) {
          return (
               <div className={estilos['container-ataque-ritual']}>
                    <BotoesAtaqueRitual/>
                    <ContainerRituais />
               </div>
          )
     } else {
          return (
               <div className={estilos['container-ataque-ritual']}>
                    <BotoesAtaqueRitual/>
                    <ContainerAtaques/>
               </div>
          )
     }
}

function Ficha() {

     return (
          <>
          <header>
               <HeaderBase titulo={"Ficha"} botao_L={<BotaoRetorno/>} pagina_atual={"ficha"}/>
          </header>
          <main className={estilos.corpo}>
               <Atributos/>
               <div>
                    <StatusContainer valor_up={3210} valor_down={210} nome_down={"HP MAX"} nome_up={"DEFESA"}/>
                    <StatusContainer valor_up={245} nome_up={"Ataque"} isDadoUnico={true}/>
               </div>
               <ContainerPericias/>
               <ContainerAtaqueRitual/>
          </main>
     
          </>
     )
}

export default Ficha