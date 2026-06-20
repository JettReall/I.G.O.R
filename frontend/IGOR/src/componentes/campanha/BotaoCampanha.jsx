import BotaoAbaNav from "../nav/BotaoAbaNav"
import estilos from './BotaoCampanha.module.css'
import clsx from 'clsx';

function BotaoCampanha({ classe, aba_botao, nome_botao, id, aoClicar }) {
  const handleClick = () => {
    if (aoClicar) {
      aoClicar(id);
    }
  };

  return (
    <div className={classe} id={aba_botao} onClick={handleClick}>
      {aba_botao !== "adicionar" && (
        <div className={estilos['container-botoes']}>
          <button className={clsx(estilos['botao-altera-campanha'], estilos.editar)} title="Editar ficha" />
          <button className={clsx(estilos['botao-altera-campanha'], estilos.apagar)} title="Apagar ficha" />
        </div>
      )}
      <strong className={estilos['nome-campanha']}>{nome_botao}</strong>
    </div>
  );
}

export default BotaoCampanha;