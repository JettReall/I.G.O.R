import { useState } from "react";
import Modal from "../../componentes/Modal";
import axios from 'axios';
import { useUser } from '../../UserContext.jsx'; // ajuste o caminho conforme sua estrutura
import estilosCampanha from './campanhaModulos.module.css'
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function CriarCampanha({ aberto, set }) {
     const navigate = useNavigate();
  const { user } = useUser();
  const [campanha, setCampanha] = useState({
    nome: "",
    anotacao: "",
    usuario: user?.id || "", // preenche com o id do usuário logado
  });

  // Função que atualiza nome e anotacao
  function handleChange(e) {
    const { name, value } = e.target;
    setCampanha((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function TelaErro() {
     return (
          <Modal open={true}>
               <h3>Erro na criação</h3>
               <button onClick={navigate('/campanhas')}>Fechar</button>
          </Modal>
     )
  }

  // Função para criar a campanha (POST)
  async function handleConfirmar() {
     try {
          const response = await axios.post(`api/campanha/${campanha.usuario}`, campanha);
          console.log(response.status);
          
          if (response.status === 201 || response.status === 200) {
                    console.log('Campanha criada:', campanha);
                    localStorage.removeItem('campanhas');
          }
     } catch (error) {
          
     } finally {
          set(false); 
          window.location.reload();
     }
    
  }

  return (
    <Modal open={aberto}>
          <div className={clsx(estilosCampanha['container-criar-campanha'],estilosCampanha['coluna'])}>

          <div className={estilosCampanha['coluna']}>

          <strong>Insira o Nome da campanha</strong>
          <input
          type="text"
          name="nome"
          value={campanha.nome}
          onChange={handleChange}
          placeholder="Nome da campanha"
          />
          </div>

          <div className={estilosCampanha['coluna']}>
          <strong>Insira uma descrição da campanha</strong>
          <textarea           name="anotacao"
          value={campanha.anotacao}
          onChange={handleChange}
          placeholder="Descrição da campanha"
          className={estilosCampanha['input-desc']}
          
          />



          </div>

          <div className={clsx(estilosCampanha['linha'],estilosCampanha['container-bootes'])} >
          <button onClick={() => {set(false)}} id="cancelar">Cancelar</button>

          <button
          onClick={handleConfirmar}
          disabled={!(campanha.nome && campanha.anotacao)}
          id="avancar"
          >
          Criar Campanha
          </button>
          </div>
     </div>
    </Modal>
  );
}