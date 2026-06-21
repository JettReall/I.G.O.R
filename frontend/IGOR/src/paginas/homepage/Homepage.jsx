import estilos from './Homepage.module.css'
import { HeaderBase } from '../../componentes/header/headers';
import { BotaoLoginCadastro } from '../../componentes/botoes/Botoes';
import editIcon from '../../assets/imagens/icones/edit-traco.png'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx'; // importa o contexto

function Homepage() {
  const navegar = useNavigate();
  const { loginUser } = useUser(); // função para setar usuário no contexto

  function HandleClick() {
    // Lê o usuário do localStorage
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      try {
        const usuario = JSON.parse(storedUser);
        // Salva no contexto (o loginUser já atualiza o estado e mantém no localStorage)
        loginUser(usuario);
        navegar('/campanhas');
      } catch (e) {
        console.error('Erro ao parsear usuário do localStorage', e);
        navegar('/login');
      }
    } else {
      navegar('/login');
    }
  }

  const BotoesHome = () => {
      return (    
        <div className={estilos['botoes-topo']}>      
          {/* Alterado texto para 'Criar conta' e removido o fundo escuro */}
          <BotaoLoginCadastro 
            texto={'Criar conta'} 
            corBotao={"claro"} // ou remova se o padrão for sem fundo
            aoClicar={() => navegar('/cadastro')} 
          />
          
          {/* Adicionado o fundo escuro para o Login conforme o Figma */}
          <BotaoLoginCadastro 
            texto={'Login'} 
            corBotao={"escuro"} 
            aoClicar={HandleClick} 
          />
        </div>
      )
    }

  return (
    <div className={estilos.homepage}>  
      <HeaderBase botao_R={<BotoesHome/>} pagina_atual={'homepage'} />
      <main className='principal'>
        <TituloPagina/>
        <Carrossel/>
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