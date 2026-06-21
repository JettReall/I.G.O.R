import clsx from "clsx";
import estilosEtapas from "./etapas.module.css";
import { useState, useEffect } from "react";
import { BotaoAvancarEtapa, CaixaTexto } from "../../componentes/criador-ficha/componentes";
import Modal from "../../componentes/Modal";
import { handleSelectUnico } from "../../assets/utils/SelecaoUnica";
import { HeaderBase } from "../../componentes/header/headers";
import { etapa1_dados } from "./VariaveisSistema";
import { BotaoCancelarCriador } from "../../componentes/botoes/Botoes";
import Carregando from "../../assets/utils/Carregando";
import axios from 'axios';

// A lista de origens agora virá do backend, então origensExemplo será removido
// e substituído pelo estado origens.

function InputNome({ texto, nomeCampo, placeholder, valor, aoMudar }) {
  return (
    <div className={clsx(estilosEtapas['container-input-solo'], estilosEtapas['etapa1'])}>
      <strong className={clsx(estilosEtapas['titulo-input'], estilosEtapas['etapa1'])}>{texto}</strong>
      <input 
        type="text" 
        name={nomeCampo} 
        placeholder={placeholder} 
        value={valor} 
        onChange={aoMudar} 
      />
    </div>
  );
}

function BotaoOrigem({ origemSelecionada, aoAbrirModal }) {
  let nomeOrigem = "";
  let classNameParaEscolhida = "";
  
  if (!origemSelecionada || origemSelecionada === null) {
    nomeOrigem = "Escolher";
    classNameParaEscolhida = "";
  } else {
    nomeOrigem = origemSelecionada.nome;
    classNameParaEscolhida = "escolhida";
  }

  return (
    <div className={clsx(estilosEtapas['botao-origem'], estilosEtapas[classNameParaEscolhida])}>
      <strong className={clsx(estilosEtapas['titulo-input'], estilosEtapas['etapa1'])}>Origem</strong>
      <button onClick={aoAbrirModal}>{nomeOrigem}</button>
    </div>
  );
}

function ContainerOrigens({ origens, origemSelecionada, onSelecionar }) {
  return (
    <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['container-origens'])}>
      {origens?.map((origem) => (
        <div
          key={origem.id}
          onClick={() => onSelecionar(origem)}
          className={clsx(
            estilosEtapas['elemento-origem'],
            {
              [estilosEtapas['origem-selecionada']]: origemSelecionada?.id === origem.id
            }
          )}
        >
          <strong>{origem.nome}</strong>
          <p>{origem.pericias?.[0]?.nome || ''}</p>
          <p>{origem.pericias?.[1]?.nome || ''}</p>
        </div>
      ))}
    </div>
  );
}

function TelaOrigens({ isAberto, setModalAberto, onConfirmar, origens }) {
  const [origemSelecionada, setOrigemSelecionada] = useState(null);

  const handleSelecionar = (origem) => {
    const novaSelecao = handleSelectUnico(origemSelecionada?.id, origem.id);
    const novaOrigem = novaSelecao ? origens.find(o => o.id === novaSelecao) : null;
    setOrigemSelecionada(novaOrigem);
  };

  const handleConfirmar = () => {
    if (origemSelecionada) {
      onConfirmar(origemSelecionada);
      setModalAberto(false);
    }
  };
  
  const desativar = !origemSelecionada;

  return (
    <Modal open={isAberto}>
      <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['coluna'], estilosEtapas['tela-origens'])}>
        <CaixaTexto texto={"Escolha uma origem"} tela={'caixa-etapa1'}/>
        <ContainerOrigens
          origens={origens}
          origemSelecionada={origemSelecionada}
          onSelecionar={handleSelecionar}
        />
        <button disabled={desativar} onClick={handleConfirmar} className={estilosEtapas['botao-conf-origem']}>Escolher</button>
      </div>
    </Modal>
  );
}

function Etapa1() {
  // Estados temporários
  const [fichaTemp, setFichaTemp] = useState({
    nome: "",
    jogador: "",
  });
  const [origemSelecionadaTemp, setOrigemSelecionadaTemp] = useState(null);
  const [abrirOrigem, setAbrirOrigem] = useState(false);
  
  // Estado para armazenar a lista de origens vinda do backend
  const [origens, setOrigens] = useState([]);
  const [carregandoOrigens, setCarregandoOrigens] = useState(true);

  // Carregar origens do backend ao montar o componente
  useEffect(() => {
    const fetchOrigens = async () => {
      setCarregandoOrigens(true);
      try {
        const response = await axios.get('/api/personagens/origens');
        console.log(response);
        
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setOrigens(Array.isArray(data.origens) ? data.origens : []);
        } else {
          setOrigens([]);
        }
      } catch (error) {
        console.error('Erro ao buscar origens:', error);
        setOrigens([]);
      } finally {
        setCarregandoOrigens(false);
      }
    };
    fetchOrigens();
  }, []);

  // Carregar dados salvos ao montar o componente
  useEffect(() => {
    // Verifica se há dados salvos (nome, jogador ou origem)
    const temDados = etapa1_dados.nome !== "" || 
                      etapa1_dados.jogador !== "" || 
                      etapa1_dados.origem.id !== 0;

    if (temDados) {
      setFichaTemp({
        nome: etapa1_dados.nome,
        jogador: etapa1_dados.jogador,
      });

      // Se houver origem com id > 0, localiza na lista carregada
      if (etapa1_dados.origem.id > 0 && origens.length > 0) {
        const origemEncontrada = origens.find(o => o.id === etapa1_dados.origem.id);
        if (origemEncontrada) {
          setOrigemSelecionadaTemp(origemEncontrada);
        }
      }
    }
  }, [origens]); // depende da lista carregada para encontrar a origem salva

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFichaTemp(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isDesabilitado = fichaTemp.nome === "" || 
                         fichaTemp.jogador === "" ||  
                         !origemSelecionadaTemp ||
                         carregandoOrigens;

  const handleConfirmarOrigem = (origem) => {
    setOrigemSelecionadaTemp(origem);
  };

  // Função SalvarEtapa1 – adaptada para a estrutura de etapa1_dados
  const SalvarEtapa1 = () => {
    // Salva nome e jogador
    etapa1_dados.nome = fichaTemp.nome;
    etapa1_dados.jogador = fichaTemp.jogador;

    // Salva a origem selecionada (se houver)
    if (origemSelecionadaTemp) {
      etapa1_dados.origem.id = origemSelecionadaTemp.id;
      etapa1_dados.origem.nome = origemSelecionadaTemp.nome;
      // Mapeia as perícias da origem para o formato esperado
      etapa1_dados.origem.pericias = origemSelecionadaTemp.pericias.map(p => ({
        id: p.id,
        nome: p.nome,
        atributo: { 
          nome: p.atributo || "",  // ex: "Presenca", "Intelecto"
          valor: ""                // sem valor definido, pode ser preenchido depois
        },
        descricao: p.descricao || ""
      }));
    } else {
      // Se não houver origem, reseta o campo
      etapa1_dados.origem = { id: 0, nome: "", pericias: [] };
    }

    console.log("Dados da Etapa 1 salvos em etapa1_dados:", etapa1_dados);
  };

  if (carregandoOrigens) {
    return <Carregando aberto={true} />;
  }

  return (
    <>
      <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa1'])}>
        <CaixaTexto texto={`Vamos começar. Primeiro, insira algumas informações iniciais:`} tela={'caixa-etapa1'} />

        <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['coluna'], estilosEtapas['inputs-etapa1'])}>
          <InputNome 
            texto="Nome do personagem" 
            nomeCampo="nome" 
            placeholder="Personagem" 
            valor={fichaTemp.nome}
            aoMudar={handleChange}
          />
          <InputNome 
            texto="Nome do Jogador" 
            nomeCampo="jogador" 
            placeholder="Jogador" 
            valor={fichaTemp.jogador}
            aoMudar={handleChange}
          />
        </div>

        <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['linha'], estilosEtapas['botoes-etapa1'])}>
          <BotaoOrigem 
            origemSelecionada={origemSelecionadaTemp}
            aoAbrirModal={() => setAbrirOrigem(true)}
          />

          <BotaoAvancarEtapa isDisabled={isDesabilitado} funcaoAntesAvancar={SalvarEtapa1} />
        </div>

        <TelaOrigens
          isAberto={abrirOrigem}
          setModalAberto={setAbrirOrigem}
          onConfirmar={handleConfirmarOrigem}
          origens={origens}
        />
      </div>
    </>
  );
}

export default Etapa1;