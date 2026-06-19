import estilos from './Homepage.module.css'
import { HeaderBase } from '../../componentes/header/headers';
import { BotaoLoginCadastro } from '../../componentes/botoes/Botoes';

import editIcon from '../../assets/imagens/icones/edit-traco.png'

function Homepage() {
     const botoesHome = 
     <div className={estilos['botoes-topo']}>
          <BotaoLoginCadastro linkBotao={'cadastro'} corBotao={"escuro"}/>
          <BotaoLoginCadastro linkBotao={'login'}/>
     </div>




     

     return (
          <div className={estilos.homepage}>  
                    <HeaderBase botao_R={botoesHome} pagina_atual={'homepage'}></HeaderBase>
                    <main className='principal'>
                         <TituloPagina/>
                         <Carrossel></Carrossel>
                    </main>
          </div>
     )
}

function TituloPagina() {
     return (
          <div className={estilos['foco-tela']}>        
                    <h1>I.G.O.R.</h1>
                    <h3>Interface de Gerenciamento da Ordo Realitas</h3>
               <p>Conheça o IGOR, um site projetado para <br /> gerenciamento de seus agentes e campanhas.</p>
          </div>
     )
}

function Card({texto}) {
     return (
          <div className={estilos.cartao}>
          <img src={editIcon} alt="Icone de lapis" />
          <p>{texto}</p>

     </div>
     )
}

function Cartao(texto, id) {
     this.texto = texto;
}

function Carrossel() {
     
          const c = new Cartao("")
          

          const conteudo = [
               "O IGOR permite criar fichas da triade principal de classes do ordem, independentemente do quanto você entende do sistema",

               "Um organizador de fichas para suas campanhas, para os mestres que lidam com inúmeras equipes de Agentes",

               "Simulador de combate inbutido, para coordenar ataques e derrotar ameaças com mais estratégia e menos dor de cabeça.",

          ]


     const filacartoes = conteudo.map( bloco => {
          c.texto = bloco;
          return <Card key={bloco} texto={c.texto}/>;
     })

     return (
          <div className={estilos['container-cartoes']}>
               {filacartoes}
          </div>
     )
}

export default Homepage


/*



*/