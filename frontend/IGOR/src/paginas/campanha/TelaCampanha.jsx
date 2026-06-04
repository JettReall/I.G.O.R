import './campanhas.css'

function BotaoCampanha({aba_botao, nome_botao}) {
     return (
          <div className="container-botao-campanha" id={aba_botao}>
               <div className="conatainer-botoes">
                    <button className="botao-altera-campanha" id="editar" >
                         <img src="frontend\IGOR\src\assets\imagens\icones\lapis.png" alt="" width={20} height={20}/>
                    </button>
                    <button className="botao-altera-campanha" id="apagar">
                         <img src="frontend\IGOR\src\assets\imagens\icones\lixo.png" alt="lixo" width={20} height={20}/>
                    </button>
               </div>
               <img src="" alt="" className="botao-campanha" />
               <strong className="nome-campanha">{nome_botao}</strong>  
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
               <BotaoCampanha aba_botao={"adicionar"} nome_botao={"Adicionar uma campanha"} />
               <BotaoCampanha nome_botao={"Placeholder"}/>
               <BotaoCampanha nome_botao={"Placeholder"}/>
               <BotaoCampanha nome_botao={"Placeholder"}/>
               <BotaoCampanha nome_botao={"Placeholder"}/>

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

function TelaCampanha({usuario}) {
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

export default TelaCampanha
