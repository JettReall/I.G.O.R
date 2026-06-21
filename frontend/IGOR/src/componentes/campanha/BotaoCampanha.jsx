import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Modal';
import estilos from './BotaoCampanha.module.css';
import clsx from 'clsx';

function BotaoCampanha({ classe, aba_botao, nome_botao, id, aoClicar }) {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Impede que o clique nos botões de ação dispare a navegação principal
  const handleClickDiv = (e) => {
    if (e.target.closest('.botao-altera-campanha')) return;
    if (aoClicar) aoClicar(id);
  };

  // Abre o modal de confirmação ao clicar em "Apagar"
  const handleAbrirModal = (e) => {
    e.stopPropagation();
    setModalAberto(true);
    setMensagem('');
  };

  // Fecha o modal sem fazer nada
  const handleCancelar = () => {
    setModalAberto(false);
  };

  // Confirma a exclusão e faz a requisição DELETE
  const handleConfirmarExclusao = async () => {
    setCarregando(true);
    try {
      const response = await axios.delete(`api/campanha/${id}`);
      if (response.status === 200) {
        // Remove a campanha do localStorage
        const stored = localStorage.getItem('campanhas');
        if (stored) {
          const campanhas = JSON.parse(stored);
          const filtradas = campanhas.filter((c) => c.id !== id);
          localStorage.setItem('campanhas', JSON.stringify(filtradas));
        }
        setMensagem('Campanha deletada com sucesso!');
        // Recarrega a página para atualizar a lista
        setTimeout(() => {
          navigate(0);
        }, 1500);
      } else {
        setMensagem('Erro ao deletar campanha. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição DELETE:', error);
      setMensagem('Erro ao conectar com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  // Botão "Editar" (apenas placeholder)
  const handleEditar = (e) => {
    e.stopPropagation();
    // Aqui você pode abrir um modal de edição ou redirecionar
    console.log('Editar campanha', id);
  };

  return (
    <>
      <div className={classe} id={aba_botao} onClick={handleClickDiv}>
        {aba_botao !== "adicionar" && (
          <div className={estilos['container-botoes']}>
            <button
              className={clsx(estilos['botao-altera-campanha'], estilos.editar)}
              title="Editar"
              onClick={handleEditar}
            />
            <button
              className={clsx(estilos['botao-altera-campanha'], estilos.apagar)}
              title="Apagar"
              onClick={handleAbrirModal}
            />
          </div>
        )}
        <strong className={estilos['nome-campanha']}>{nome_botao}</strong>
      </div>

      {/* Modal de confirmação ou feedback */}
      <Modal open={modalAberto}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          {mensagem ? (
            <>
              <p>{mensagem}</p>
            </>
          ) : (
            <>
              <strong>Confirmar exclusão</strong>
              <p>Tem certeza que deseja apagar a campanha "{nome_botao}"?</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
                <button onClick={handleCancelar} disabled={carregando} id='cancelar'> 
                  Cancelar
                </button>
                <button onClick={handleConfirmarExclusao} disabled={carregando} id='avancar'>
                  {carregando ? 'Deletando...' : 'Confirmar'}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default BotaoCampanha;