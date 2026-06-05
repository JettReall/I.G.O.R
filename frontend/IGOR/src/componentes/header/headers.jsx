import estilos from './header.module.css'
import BotaoAbaNav from '../nav/BotaoAbaNav'
import clsx from 'clsx'

const HeaderBase = ({titulo}) => {
     return(
          <div className={estilos['header-base']}>
               <h1 className="texto-header">{titulo}</h1>  
          </div>
     )
}

const HeaderDeCampanha = ({titulo}) => {
     return (
          <div className={clsx(estilos['header-de-campanha'], estilos['header-base'])}>
               <HeaderBase titulo={titulo}/>
               <div className={estilos['seletor-fichas']}>
                    <BotaoAbaNav texto={"Agentes"}/>
                    <BotaoAbaNav texto={"Criaturas"}/>  
               </div>  
          </div>
     )
}


export { HeaderBase, HeaderDeCampanha };
