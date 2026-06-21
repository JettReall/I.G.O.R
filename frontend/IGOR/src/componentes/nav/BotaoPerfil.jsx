import './Nav.css'
import { useUser } from '../../UserContext' // ajuste o caminho conforme sua estrutura
import Modal from '../Modal'
import Edit from '../../assets/imagens/icones/edit-traco.png'
import { useEffect } from 'react'
import BotaoAbaNav from './BotaoAbaNav'

  function TelaPerfil( {aberto, set} ) {
          return (
               <Modal open={aberto}>
                    <div style={"display: flex"}>
                         <p>Nome de usuário:</p>
                         <input type="text" name="" id="" disabled={} />
                    </div>
                    <div style={"display: flex"}>
                         <p>Email:</p>
                         <input type="email" name="" id="" disabled={} />
                    </div>
                    <div style={"display: flex"}>
                         <p>Senha:</p>
                          <input type="password" name="" id="" disabled={} /> {/* Ter um toggle de visibilidade */}
                    </div>
               </Modal>
          )
  }

function BotaoPerfil() {
  const { user } = useUser()
  const [abetro, setAbetro] = useState(false)


  // Log opcional para depuração
  useEffect(() => {
    console.log('BotaoPerfil montado, usuário do contexto:', user)
  }, [user])

  const nomeExibido = user?.nome || 'Visitante'

  return (
     <>
    <div className="container-botao-perfil" onClick={() => {setAbetro(true)}}>
          <BotaoAbaNav texto={`Olá, ${nomeExibido}`}/>
    </div>
     
     
     </>
  )
}

export default BotaoPerfil