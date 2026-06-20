import './Nav.css'
import Modal from '../Modal'
import Edit from '../../assets/imagens/icones/edit-traco.png'

function BotaoPerfil( {nomeperfil} ) {
     return (
          <div className="container-botao-perfil">
               <p className="nome-perfil">Olá, {nomeperfil}</p>
          </div>
     )
}

export default BotaoPerfil