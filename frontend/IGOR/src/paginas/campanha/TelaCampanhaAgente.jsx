import './campanhas.css'
import Nav from '../../componentes/nav/Nav.jsx'
import BotaoCampanha from '../../componentes/campanha/BotaoCampanha.jsx'
import { HeaderBase, HeaderDeCampanha } from '../../componentes/header/headers.jsx'
import estilos from '../../componentes/campanha/BotaoCampanha.module.css'
import clsx from 'clsx'




function ContainerCampanhas() {
     const classeFicha = clsx(estilos['container-botao-campanha'],estilos.ficha);
     const campanhaBotaoAdd = clsx(estilos['container-botao-campanha'],estilos['adicionar-ficha']);

     return (
          <div className="container-campanhas">
               <BotaoCampanha aba_botao={"adicionar"} nome_botao={"Criar uma ficha de Agente"} classe={campanhaBotaoAdd}/>
               <BotaoCampanha aba_botao={"Teste"} nome_botao={"Placeholder"} classe={classeFicha}/>


          </div>
     )
}



function TelaCampanhaAgente({usuario}) {
      if (usuario == undefined) {
          usuario = "Usuário"
     }
     return   (
               <div className="container-grid">
                    <header>
                         <HeaderDeCampanha titulo={"Campanhas"}/> 
                    </header>                
               
                    <nav className="latertal">
                         <Nav usuario={usuario}></Nav>
                    </nav>

                    <main>
                         <ContainerCampanhas/>
                    </main>
               </div>
              

     )
}

export default TelaCampanhaAgente
