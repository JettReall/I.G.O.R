import estilos from './header.module.css'
import BotaoAbaNav from '../nav/BotaoAbaNav'
import { BotaoRetorno } from '../botoes/Botoes'
import clsx from 'clsx'

const HeaderBase = ({titulo, pagina_atual,botao_L, botao_R}) => {
     const classe_atual = clsx(estilos['header-base'], estilos[pagina_atual]);
     return(
          <div className={classe_atual}>
               {botao_L}
               <h1 className="texto-header">{titulo}</h1>  
               {botao_R}
          </div>
     )
}

//     position: absolute;
   //  left: 2.5%;

estilos['header-base']

const HeaderDeCampanha = ({titulo, botao_L, botao_R}) => {

     return (
          <div className={clsx(estilos['header-de-campanha'], estilos['header-base'])}>
               <HeaderBase titulo={titulo} botao_L={botao_L} botao_R={botao_R}/>
               <div className={estilos['seletor-fichas']}>
                    <BotaoAbaNav texto={"Agentes"}/>
                    <BotaoAbaNav texto={"Criaturas"}/>  
               </div>  
          </div>
     )
}



export { HeaderBase, HeaderDeCampanha };
