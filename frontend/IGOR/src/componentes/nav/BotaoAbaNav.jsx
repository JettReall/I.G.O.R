import './BotaoAbaNav.css'
import { Link } from 'react-router-dom'

function BotaoAbaNav({texto, caminho}) {
     return (
          <Link to={caminho} >
               <button className="botao-aba-nav" id={texto}>{texto}</button>
          </Link>
     )
}

export default BotaoAbaNav