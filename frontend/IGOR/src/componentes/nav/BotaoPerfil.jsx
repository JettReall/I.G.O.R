import './Nav.css'

function BotaoPerfil( {foto, nomeperfil} ) {
     return (
          <div className="container-botao-perfil">
               <img src={foto} alt="" className="foto-perfil" />
               <p className="nome-perfil">Olá, {nomeperfil}</p>
          </div>
     )
}

export default BotaoPerfil