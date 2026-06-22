// CriadorFicha.jsx
import { EtapaProvider, useEtapa } from '../../componentes/EtapaContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HeaderBase } from '../../componentes/header/headers';
import { BotaoCancelarCriador } from '../../componentes/botoes/Botoes';
import axios from 'axios';
import { useUser } from '../../UserContext';

import Etapa1 from "./Etapa1-DadosIniciais";
import Etapa2 from './Etapa2-ClasseTrilha';
import Etapa3 from './Etapa3-Atributos';
import Etapa4 from './Etapa4-Pericias';

import Modal from '../../componentes/Modal';
import clsx from 'clsx';
import estilosEtapas from "./etapas.module.css";
import {
  PersonagemNovo,
  etapa1_dados,
  etapa2_dados,
  etapa3_dados,
  etapa4_dados,
  pericias_personagem
} from './VariaveisSistema';
import Carregando from '../../assets/utils/Carregando';

// ------------------------------------------------------------
// Componente que renderiza a etapa atual
function ConteudoCriador({ setHeader }) {
  const { etapaAtual, setEtapa } = useEtapa();
  const { step } = useParams();

  useEffect(() => {
    if (step) {
      const numero = parseInt(step, 10);
      if (!isNaN(numero) && numero !== etapaAtual) {
        setEtapa(numero);
      }
    }
  }, [step, etapaAtual, setEtapa]);

  useEffect(() => {
    const titulos = {
      1: "Etapa 1: Dados iniciais",
      2: "Etapa 2: Classe e Trilha",
      3: "Etapa 3: Atributos",
      4: "Etapa 4: Pericias",
      5: "Finalizar"
    };
    setHeader(titulos[etapaAtual] || "");
  }, [etapaAtual, setHeader]);

  switch (etapaAtual) {
    case 1: return <Etapa1 />;
    case 2: return <Etapa2 />;
    case 3: return <Etapa3 />;
    case 4: return <Etapa4 />;
    case 5: return <Finalizar />;
    default: return null;
  }
}

// ------------------------------------------------------------
// Função que constrói o objeto PersonagemNovo a partir das etapas
function construirPersonagem() {
  const { nome, jogador, origem } = etapa1_dados;
  const { classeAgenteEscolhida, trilhaAgenteEscolhida } = etapa2_dados;
  const atributos = etapa3_dados;

  const origemId = origem?.id || 0;
  const classeId = classeAgenteEscolhida?.id || 0;
  const trilhaId = trilhaAgenteEscolhida?.id || 0;

  const periciaIds = pericias_personagem;

  return {
    nome,
    jogador,
    origemId,
    classeId,
    trilhaId,
    atributos,
    periciaLista: periciaIds,
  };
}

// ------------------------------------------------------------
// Componente Finalizar (etapa 5)
function Finalizar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { id: campanhaId } = useParams(); // captura o ID da campanha da URL
  const [flagSalvar, setFlagSalvar] = useState(false);
  const [erro, setErro] = useState(null);

  const stilo = {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    gap: '20px',
  };

  // Função para limpar todas as variáveis globais das etapas
  function limparVariaveis() {
    // Etapa 1
    etapa1_dados.nome = "";
    etapa1_dados.jogador = "";
    etapa1_dados.origem = { id: 0, nome: "", pericias: [] };

    // Etapa 2
    etapa2_dados.classeAgenteEscolhida = {};
    etapa2_dados.trilhaAgenteEscolhida = {};

    // Etapa 3 (objeto)
    Object.keys(etapa3_dados).forEach(key => {
      etapa3_dados[key] = 0;
    });

    // Etapa 4 (array)
    etapa4_dados.length = 0;

    // Perícias do personagem
    pericias_personagem.length = 0;

    console.log('✅ Variáveis globais limpas.');
  }

  async function salvarEtapas1a4() {
    if (!user?.id) {
      setErro('Usuário não está logado. Faça login novamente.');
      return;
    }

    if (!campanhaId) {
      setErro('ID da campanha não encontrado. Tente novamente.');
      return;
    }

    setFlagSalvar(true);
    setErro(null);

    try {
      // 1. Cria o personagem
      const personagem = construirPersonagem();
      console.log('Personagem a ser salvo:', personagem);

      // 2. POST para criar o personagem
      const responsePersonagem = await axios.post(`/api/personagens/${user.id}`, personagem);
      console.log('Resposta do personagem:', responsePersonagem.data);

      if (responsePersonagem.status === 201 || responsePersonagem.status === 200) {
        const fichaId = responsePersonagem.data?.id; // supondo que o backend retorne o ID da ficha criada

        // 3. POST para adicionar a ficha à campanha
        const payloadFicha = {
          campanhaId: parseInt(campanhaId, 10),
          fichaDTO: {
            id: fichaId || 0,
            tipo: "PERSONAGEM" // fixo
          }
        };

        console.log('Enviando ficha para campanha:', payloadFicha);

        const responseFicha = await axios.post('/api/campanha/ficha/add', payloadFicha);
        console.log('Resposta da campanha:', responseFicha.data);

        if (responseFicha.status === 200 || responseFicha.status === 201) {
          console.log('Personagem salvo e vinculado à campanha com sucesso!');

          // Limpa todas as variáveis globais
          limparVariaveis();

          // Remove cache de campanhas para forçar recarga
          localStorage.removeItem('campanhas');

          // Redireciona para a lista de campanhas
          navigate('/campanhas');
        } else {
          throw new Error(`Erro ao vincular ficha à campanha: ${responseFicha.status}`);
        }
      } else {
        throw new Error(`Erro ao salvar personagem: ${responsePersonagem.status}`);
      }
    } catch (error) {
      console.error('Erro no salvamento:', error);
      setErro(error.response?.data?.message || error.message || 'Erro ao salvar personagem.');
      setFlagSalvar(false);
    } finally {
      // Se não houve erro, o flag já foi resetado pelo navigate (que recarrega a página)
      // Mas se houve erro, garantimos que o loading seja removido
      if (erro) setFlagSalvar(false);
    }
  }

  if (flagSalvar) {
    return <Carregando aberto={flagSalvar} />;
  }

  return (
    <Modal open={true}>
      <div style={stilo}>
        <strong>Personagem criado com Sucesso</strong>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button onClick={salvarEtapas1a4} id="avancar">
          Encerrar
        </button>
      </div>
    </Modal>
  );
}

// ------------------------------------------------------------
// Componente principal do criador
function CriadorFicha() {
  const { user } = useUser(); // mantido para referência
  const [texto, setTexto] = useState("");

  return (
    <EtapaProvider>
      <HeaderBase
        pagina_atual={'claro'}
        isFixo={true}
        titulo={texto}
        botao_L={<BotaoCancelarCriador />}
      />
      <ConteudoCriador setHeader={setTexto} />
    </EtapaProvider>
  );
}

export default CriadorFicha;