import './Nav.css'
import { useUser } from '../../UserContext' // ajuste o caminho conforme sua estrutura
import Modal from '../Modal'
import Edit from '../../assets/imagens/icones/edit-traco.png'
import { useEffect } from 'react'
import BotaoAbaNav from './BotaoAbaNav'
import { useState } from 'react'


function BotaoPerfil() {
  const { user } = useUser()
  const [abetro, setAbetro] = useState(false)

  const nomeExibido = user?.nome;

  return (
     <>
    <div className="container-botao-perfil" onClick={() => {setAbetro(true)}}>
          <BotaoAbaNav texto={`Olá, ${nomeExibido}`}/>
    </div>

     </>
  )
}

export default BotaoPerfil