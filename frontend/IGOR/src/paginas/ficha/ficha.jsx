import { useState } from "react";
import clsx from "clsx";


import { HeaderBase } from "../../componentes/header/headers"
import { BotaoRetorno } from "../../componentes/botoes/Botoes"
import { StatusContainer, Atributos, Pericia, AtaqueRitual, Item, InfoPersona, BotaoAumentarNex, BotaoEditarFicha } from "../../componentes/ficha/componentes";
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

function ContainerItems() {

     const HeaderItem = {
     nome: "Nome",
     categoria: "Cat.",
     quantia: "Qtd",
     carga: "Carga unit.",
     total: "Carga total"
     }

     const ExItem = {
     nome: "Adaga",
     categoria: 1,
     quantia: 2,
     carga: 1,
     total: 2
     }

     

     return (
          <div className={estilos['container-itens']}>
          <Item dados_item={HeaderItem} isHeader={true}/>
          <Item dados_item={ExItem}/>
          </div>
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

function ContainerAtaquesItens() {
     return (
               <div className={estilos['container-ataques-itens']}>
                    <ContainerAtaqueRitual/>
                    <strong className={estilos['titulo-inventario']}>Inventário</strong>
                    <ContainerItems></ContainerItems>
               </div>
     )
}

function ElementoValAtualMax( {nome, valores}) {
     const nomenclatura = {
          nome_topo: nome + " Atual",
          nome_baixo: nome + " Máximo",
     }

     return (
          <StatusContainer nome_up={nomenclatura.nome_topo} nome_down={nomenclatura.nome_baixo} valor_up={valores.atual} valor_down={valores.maximo}/>
     )

}

function ContainerValAtualMax() {
     
     const status_valores = {
          atual: 0,
          maximo: 0,
     }

     return (
          <div className={estilos['container-triplo-status']}>
               <ElementoValAtualMax nome={"HP"} valores={status_valores} />
               <ElementoValAtualMax nome={"PE"} valores={status_valores} />
               <ElementoValAtualMax nome={"SAN"} valores={status_valores} />

          </div>
     )
}

function ContainerDadosSoltos( {dados} ) {



     return (
          <div className={estilos['container-triplo-status']}>
               <StatusContainer isDadoUnico={true} nome_up={"Defesa"} valor_up={dados.defesa}/>
               <StatusContainer nome_up={"DESL."} valor_up={dados.deslocamento} nome_down={"Carga máx."} valor_down={dados.carga}/>
               <StatusContainer nome_up={"NEX"} valor_up={dados.nex} nome_down={"PE / Rodada"} valor_down={dados.pe_rodada} />        
          </div>          
     )
}

function BotoesFicha( ) {
     return (

          <div className={estilos['botoes-header-ficha']}>
               <BotaoAumentarNex/>
               <BotaoEditarFicha/>
          </div>
     )
}


function Ficha() {

     const info_solta = {
          defesa: 0,
          deslocamento: 0,
          carga: 0,
          nex: 0,
          pe_rodada: 0,
     }

     const dados_persona = {
          jogador: "Milo",
          origem: "Trambiqueiro",
          classe: "Especialista",
          trilha: "Negociador"
     }


     return (
          <>
          <header>
               <HeaderBase titulo={"Ficha"}
                pagina_atual={"ficha"}
                botao_L={<BotaoRetorno/>} 
                botao_R={<BotoesFicha/>} />
          </header>
          <main className={estilos.corpo}>
               <Atributos/>
               <div className={estilos['container-status-info-persona']}> 
                    <InfoPersona dados_persona={dados_persona} />
                    <ContainerValAtualMax/>
                    <ContainerDadosSoltos dados={info_solta}/>
               </div>
               <ContainerPericias/>
               <ContainerAtaquesItens/>


          </main>
     
          </>
     )
}

export default Ficha