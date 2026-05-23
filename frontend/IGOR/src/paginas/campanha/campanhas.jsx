import './campanhas.css'

function BotaoCampanha() {
     return (
          <div className="container-botao-campanha">
               <div className="conatainer-botoes">
                    <button className="botao-altera-campanha" id="editar"></button>
                    <button className="botao-altera-campanha" id="apagar"></button>
               </div>
               <img src="" alt="" className="botao-campanha" />
               <strong className="nome-campanha">Nome campanha</strong>  
          </div>
     ) 
}

function BotaoAddCampanha() {
     return(

          <div className="container-botao-campanha" id='adicionar-campanha'>
               <img src="" alt="" className="botao-campanha" />
               <strong className="nome-campanha">Adicionar uma campanha</strong>  
          </div>
     )
}

function BotaoAbaNav() {
     return <button className="botao-aba-nav"></button>
}

function ContainerCampanhas() {
     return (
          <div className="container-campanhas">
               <BotaoAddCampanha/>
               <BotaoCampanha/>
               <BotaoCampanha/>
               <BotaoCampanha/>
               <BotaoCampanha/>
          </div>
     )
}


function Campanhas() {
     return   (
               <div className="container-grid">
                    <header>
                         <h1 className="texto-header">Header</h1>    
                    </header>                
               
                    <nav className="latertal">
                         <BotaoAbaNav/>
                         <h1>NAV</h1>
                    </nav>

                    <main>
                         <ContainerCampanhas/>
                    </main>
               </div>
              

     )
}

export default Campanhas
