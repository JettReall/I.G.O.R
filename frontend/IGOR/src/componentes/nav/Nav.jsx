import { Link } from "react-router-dom";
import BotaoAbaNav from "./BotaoAbaNav";
import BotaoPerfil from "./BotaoPerfil";

import './Nav.css'


function BotoesLaterais() {
     return (
          <div className="container-botoes-laterais">
               <BotaoAbaNav texto={"Campanhas"}/>
               <BotaoAbaNav texto={"Arquivos"}/>
               <BotaoAbaNav texto={"Tutorial"}/>
          </div>
     )
}

function Nav({usuario}) {
     return (
          <>
               <BotoesLaterais/>
               <BotaoPerfil nomeperfil={usuario}/>
          </>
     )
}

export default Nav