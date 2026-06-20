import clsx from 'clsx';
import { useState } from 'react';
import estilosCombate from './Combate.module.css'

 const dado_pericia = {}; //Variável a ser substituida pela final
 const pericias = []; //Variavel a ser substituida pela final
 const Status = []; //Vriavel a ser substituida pela final

function ContainerAtributos({atributos}) {
     function Atributo({dados}) {
          return (
               <>
               <strong> {dados.nome} </strong>
               <div className="">
                    <strong>{dados.valor}</strong>
               </div>
               </>
          )
     }

    // atributos.map() Desligada pois ainda não a implementei. Ela deve retornar um Atributo para cada elemento do prop (que é uma lista de elementos)
}


function Pericia() {
     
     function ValorPericia({valor, nome}) {
          return (
               <div className="">
                         <p>{nome}</p>
                         <p className="">{valor}</p>
                    </div>
               )
          }
          
          
          return (
               <div className="">
                    <strong>{dado_pericia.nome}</strong>
                    <strong>{dado_pericia.atributo.nome}</strong>
                    <div className="">
                         <ValorPericia nome={"Treino"} valor={(dado_pericia.treino * 5)} />
                         <ValorPericia nome={"Bônus"} valor={(dado_pericia.bonus)} />
                         <ValorPericia nome={"Outro"} valor={(dado_pericia.outro)} />
                    </div>
                    <ValorPericia nome={"Total"} valor={dado_pericia.total}/>
               </div>
     )
}

function ContainerPericias() {
     //pericias.map() uma Pericia para cada elemento

}

function BotaoCancelarCombate() {
     return (
          <button> X </button>
     )
}

function BotoesOperacionais() {
     return (
          <div className="">
               <BotaoCancelarCombate/>
          </div>
     )
}

function ContainerInicativa() {

     function ElementoInicativa({personagem}) {
          return (
               <div className="">
                    <strong>{personagem.iniciativa}</strong>
                    <strong>{personagem.nome}</strong>
               </div>
          )
     }

     return (
          <div className="">
               <strong>Ordem de Iniciativa</strong>
               <div className="">
                    {/* elementoinicativa.map */}
               </div>
          </div>
     )
}

function BotoesMudarIniciativa() {
     
     function PularVez() {

     }

    // function TrocarOrdemIniciativa() {}

     function HandleAvancar() {

     }


     return (
          <div className="">
               <button onClick={() => {PularVez}}>
                  {/* <img src="" alt="" /> */}
               </button>
               <button>

               </button>
               <button onClick={() => {HandleAvancar}}>
                    {/* <img src="" alt="" /> */}
               </button>
          </div>
     )
}

function ContainerL() {
     
     return (
          <div className={clsx(estilosCombate['container-menor'],estilosCombate['esquerdo'])}>
          <BotoesOperacionais/>
          <ContainerInicativa/>
          <BotoesMudarIniciativa/>
          </div>

     )
}

function ContadorTurno({turno}) {
     return (
          <div className="">
               <h2>Turno <strong>{turno}</strong></h2>
          </div>
     )
}

function PericiasPersona({periciasLista}) {

     function DadoPericia({texto,dado}) {
          return (
               <div className="">
               <p>{texto}</p>
               <strong>{dado}</strong>
               </div>
          )
     }

     function Pericia( {p} ) {
          return(
               <div className="">
                    <strong>{p.nome}</strong>
                    <strong>{p.atributo}</strong>
                    <div className="">
                         <DadoPericia texto={'Treino'} dado={(p.treino * 5)}/>
                         <DadoPericia texto={'Bônus'} dado={p.bonus}/>
                         <DadoPericia texto={'Outros'} dado={p.outro} />
                    </div>
                    <DadoPericia texto={'total'} dado={(p.treino + p.bonus + p.outro)} />
               </div>
          )
     }

     return (
          <div className="">
               {/* PericiasLista.map retorna Pericia */}
          </div>
     )
}

function DadosPersona({personagem}) {

     function DadoPersona( {texto, dado} ) {
          return (
               <>
               <strong>{texto}</strong>
               <strong>{dado}</strong>
               </>
          )
     }
/**
 Dados importantes:
 HP, PE (Atual apenas), SAN
 Defesa
 Afinidade
 Deslocamento
 */
     return (
          <div className="">

          </div>
     )
}

function InfoPersonagemAtual({personagem}) {

     return (
          <>
          <DadosPersona/>
          <PericiasPersona/>
          </>
     )
}

function ContainerMeio() {
          
     return (
          <div className={clsx(estilosCombate['container-menor'],estilosCombate['meio'])}>
               <ContadorTurno/>
               <InfoPersonagemAtual/>
          </div>
     )
}

function ContainerEfeitos() {

}

function ContainerDados() {

}

function ContainerEfeitosDados() {
     const [isDado, setIsDado] = useState(false);

     if (isDado) {
          return <ContainerEfeitos/>
     }else {
          return <ContainerDados/>
     }
}

function BotoesAcao() {


     function RolarPericia() {

     }

     function FazerAcao() {

     }


     return (
          <div className="">
               <button>
                    {/* <img src="" alt="" /> */}
               </button>
               <button>
                    {/* <img src="" alt="" /> */}
               </button>
          </div>
     )
}

function ContainerR() {
     return (
          <div className={clsx(estilosCombate['container-menor'],estilosCombate['direito'])}>
               <ContainerEfeitosDados/>
               <BotoesAcao/>
          </div>
     )
}

function Combate() {
     return (
          <div className={estilosCombate['container-principal']}>
               <ContainerL/>
               <ContainerMeio/>
               <ContainerR/>
          </div>
     )

}

export {
     Combate,
}