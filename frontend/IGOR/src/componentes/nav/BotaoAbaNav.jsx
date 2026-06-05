import './BotaoAbaNav.css'
function BotaoAbaNav({texto}) {
     return (
     <button className="botao-aba-nav" id={texto}>{texto}</button>
     )
}

export default BotaoAbaNav