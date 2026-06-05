import BotaoAbaNav from "../nav/BotaoAbaNav"
import estilos from './BotaoCampanha.module.css'
import clsx from 'clsx';

function BotaoCampanha({classe,aba_botao, nome_botao}) {
     const classeBotao = estilos['botao-altera-campanha'];

     return (
          <div className={classe} id={aba_botao}>
               <div className={estilos['container-botoes']}>
                    <button className={clsx(estilos['botao-altera-campanha'], estilos.editar)}/>
                    <button className={clsx(estilos['botao-altera-campanha'], estilos.apagar)}/>
               </div>

               <strong className={estilos['nome-campanha']}>{nome_botao}</strong>  
          </div>
     ) 
}

export default BotaoCampanha