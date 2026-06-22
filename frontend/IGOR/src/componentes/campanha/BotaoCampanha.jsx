import estilos from './BotaoCampanha.module.css'
import clsx from 'clsx';

function BotaoCampanha({ classe, aba_botao, nome_botao, id, aoClicar }) {
  const handleClick = (e) => {
    // Evita abrir a campanha se o usuário clicar nos botões de ação (editar/deletar)
    if (e.target.tagName === 'BUTTON') return;
    
    if (aoClicar) {
      aoClicar(id); 
    }
  };

  const isAdicionar = aba_botao === "adicionar";

  return (
    <div 
      className={clsx(classe, estilos['card-base'], isAdicionar && estilos['card-adicionar'])} 
      id={aba_botao} 
      onClick={handleClick}
    >
      {isAdicionar ? (
        /* Renderização para o botão de Adicionar Campanha (Apenas o '+' centralizado) */
        <span className={estilos['icone-mais']}>+</span>
      ) : (
        /* Renderização para um Card de Campanha Ativa */
        <>
          {/* Menu de ações flutuante no topo */}
          <div className={estilos['container-botoes']}>
            <button 
              className={clsx(estilos['botao-altera-campanha'], estilos.apagar)} 
              title="Apagar" 
              onClick={(e) => { e.stopPropagation(); console.log('Apagar id:', id); }}
            />
            <button 
              className={clsx(estilos['botao-altera-campanha'], estilos.editar)} 
              title="Editar" 
              onClick={(e) => { e.stopPropagation(); console.log('Editar id:', id); }}
            />
            <button 
              className={clsx(estilos['botao-altera-campanha'], estilos.opcoes)} 
              title="Mais Opções" 
              onClick={(e) => { e.stopPropagation(); }}
            />
          </div>
          
          {/* Textos inferiores */}
          <div className={estilos['info-campanha']}>
            <strong className={estilos['nome-campanha']}>{nome_botao}</strong>
            <span className={estilos['subtitulo-exemplo']}></span>
          </div>
        </>
      )}
    </div>
  );
}

export default BotaoCampanha;