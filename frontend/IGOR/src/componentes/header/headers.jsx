import estilos from './header.module.css'
import BotaoAbaNav from '../nav/BotaoAbaNav'
import { BotaoRetorno } from '../botoes/Botoes'
import clsx from 'clsx'
import FundoSangue from '../../assets/imagens/fundos/fundo-sangue.png'

const HeaderBase = ({titulo, pagina_atual,botao_L, botao_R, isFixo}) => {

     let classNamefixa = ""
     if (isFixo === true) {
          classNamefixa = 'fixo'
     } else {
          classNamefixa = ''
     }

     const classe_atual = clsx(estilos['header-base'], estilos[pagina_atual], estilos[classNamefixa]);
     return(
          <div className={classe_atual}>
               {botao_L}
               <h1 className="texto-header">{titulo}</h1>  
               {botao_R}
          </div>
     )
}


const HeaderDeCampanha = ({titulo, botao_L, botao_R, isFixo, pagina_atual}) => {
     let classNamefixa = ""
     if (isFixo === true) {
          classNamefixa = 'fixo'
     } else {
          classNamefixa = ''
     }

     return (
          <div className={clsx(estilos['header-de-campanha'], estilos['header-base'],estilos[classNamefixa], estilos[pagina_atual])}>
               <HeaderBase titulo={titulo} botao_L={botao_L} botao_R={botao_R} isFixo={isFixo} pagina_atual={pagina_atual}/>
               <div className={estilos['seletor-fichas']}>
                    <BotaoAbaNav texto={"Agentes"}/>
                    <BotaoAbaNav texto={"Criaturas"}/>  
               </div>  
          </div>
     )
}



export { HeaderBase, HeaderDeCampanha };
