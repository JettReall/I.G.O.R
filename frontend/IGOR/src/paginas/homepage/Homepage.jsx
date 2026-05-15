import './Homepage.css';

import editIcon from '../../assets/imagens/icones/edit-traco.png'

function Homepage() {
     return (
          <main>     
                    <TituloPagina/>
                    
                    <Carrossel></Carrossel>
          </main>
     )
}

function TituloPagina() {
     return (
          <div className="foco-tela">

               <div className="titulo-pagina">
                    <h1>I.G.O.R.</h1>
                    <h3>Interface de Gerenciamento da Ordo Realitas</h3>
               </div>
               <p>Conheça o IGOR, um site projetado para gerenciamento de seus agentes e campanhas.</p>
          </div>
     )
}

function Card({texto}) {
     return (
          <div className='cartao'>
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
          <div className="container-cartoes">
               {filacartoes}
          </div>
     )
}

export default Homepage


/*



*/