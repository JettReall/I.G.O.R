import clsx from 'clsx';
import estilos from './Botoes.module.css';
import { Link } from 'react-router-dom';

const BotaoRetorno = ({texto, aoClicar}) => {
     return (
          <button className={estilos["botao-retorno"]} title='Voltar' onClick={aoClicar}>{texto}</button>
     )
}

const BotaoLoginCadastro = ( {linkBotao, texto, corBotao} ) => {
     if(!corBotao) { //Black
          corBotao = "claro"
     }
     
     const classe = clsx(estilos['login-cadastro'],estilos[corBotao]);

     if (!texto) {

          if (linkBotao === 'cadastro') {
               texto = "Cadastrar"
          } else if (linkBotao === 'login') {
               texto = "Entrar"
          }
     }


     linkBotao = "/"+linkBotao;

     return (
          <Link to={linkBotao}>
               <button className={classe}> {texto} </button>
          </Link>
     )
}



export {
     BotaoRetorno,
     BotaoLoginCadastro,
}