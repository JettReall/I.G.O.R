import clsx from 'clsx';
import estilos from './Botoes.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const BotaoRetorno = ({texto}) => {
     const voltar = useNavigate();
     return (
          <button className={estilos["botao-retorno"]} title='Voltar' onClick={() => {voltar(-1)}}>{texto}</button>
     )
}

const BotaoLoginCadastro = ( {texto, corBotao, aoClicar} ) => {
     if(!corBotao) { //Black
          corBotao = "claro"
     }
     
     const classe = clsx(estilos['login-cadastro'],estilos[corBotao]);

     return (
          <button className={classe} onClick={aoClicar}>
               {texto} 
          </button>
     )
}



export {
     BotaoRetorno,
     BotaoLoginCadastro,
}