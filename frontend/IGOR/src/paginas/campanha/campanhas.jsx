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

function BotaoAbaNav({texto}) {
     return (
     <button className="botao-aba-nav" id={texto}>{texto}</button>
     )
}

function BotaoPerfil( {foto, nomeperfil} ) {
     return (
          <div className="container-botao-perfil">
               <img src={foto} alt="" className="foto-perfil" />
               <p className="nome-perfil">Olá, {nomeperfil}</p>
          </div>
     )
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


function BotoesLaterais() {
     return (
          <div className="container-botoes-laterais">
               <BotaoAbaNav texto={"Campanhas"}/>
               <BotaoAbaNav texto={"Arquivos"}/>
               <BotaoAbaNav texto={"Tutorial"}/>
          </div>
     )
}

function Campanhas({usuario}) {
     if (usuario == undefined) {
          usuario = "Usuário"
     }
     return   (
               <div className="container-grid">
                    <header>
                         <h1 className="texto-header">CAMPANHAS</h1>    
                    </header>                
               
                    <nav className="latertal">
                         <BotoesLaterais/>
                         <BotaoPerfil nomeperfil={usuario}/>
                    </nav>

                    <main>
                         <ContainerCampanhas/>
                    </main>
               </div>
              

     )
}

export default Campanhas
