import './campanhas.css'
import Nav from '../../componentes/nav/Nav.jsx'
import BotaoCampanha from '../../componentes/campanha/BotaoCampanha.jsx'
import { HeaderBase, HeaderDeCampanha } from '../../componentes/header/headers.jsx'
import estilos from '../../componentes/campanha/BotaoCampanha.module.css'
import clsx from 'clsx'
import { usuario } from '../Login/Usuario.jsx'




function ContainerCampanhas() {
     const classeCampanha = estilos['container-botao-campanha'];
     const campanhaBotaoAdd = clsx(estilos['container-botao-campanha'],estilos['adicionar-campanha']);

     return (
          <div className="container-campanhas">
               <BotaoCampanha aba_botao={"adicionar"} nome_botao={"Adicionar uma campanha"} classe={campanhaBotaoAdd}/>
               <BotaoCampanha aba_botao={"Teste"} nome_botao={"Placeholder"} classe={classeCampanha}/>


          </div>
     )
}



function Campanhas() {
     return   (
               <div className="corpo">
                    <header>
                         <HeaderBase titulo={"Campanhas"} pagina_atual={'campanhas'}/> 
                    </header>                
               
                    <nav className="latertal">
                         <Nav usuario={usuario.nome}></Nav>
                    </nav>

                    <main>
                         <ContainerCampanhas/>
                    </main>
               </div>
              

     )
}

export default Campanhas
