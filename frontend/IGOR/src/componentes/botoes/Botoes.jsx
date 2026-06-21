import clsx from 'clsx';
import estilos from './Botoes.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const BotaoRetorno = ({texto, caminho}) => {

     if (!caminho) {
          caminho = -1;
     }

     const voltar = useNavigate();
     return (
          <button className={estilos["botao-retorno"]} title='Voltar' onClick={() => {voltar(caminho)}}>{texto}</button>
     )
}

function BotaoCancelarCriador({ texto = "Cancelar" }) {
  const { id } = useParams(); // o parâmetro da rota é "id" (ex: /campanhas/:id/criar_ficha/:step)
  const navigate = useNavigate();

  const voltarParaCampanha = () => {
    if (id) {
      navigate(`/campanhas/${id}`);
    } else {
      // fallback: se não houver id, vai para a lista de campanhas
      navigate('/campanhas');
    }
  };

  return (
     <button onClick={voltarParaCampanha}>
          X
     </button>
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
     BotaoCancelarCriador,
}

