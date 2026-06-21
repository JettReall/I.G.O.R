import clsx from "clsx";
import estilosEtapas from "./etapas.module.css";
import { useState, useEffect } from "react"; // adicionado useEffect
import { BotaoAvancarEtapa, CaixaTexto, InputComBotao } from "../../componentes/criador-ficha/componentes";
import Modal from "../../componentes/Modal";
import { handleSelectUnico } from "../../assets/utils/SelecaoUnica";
import { HeaderBase } from "../../componentes/header/headers";
import { etapa1_dados } from "./VariaveisSistema";
import { pericias_dados } from "./VariaveisSistema";

const origensExemplo = [
  { id: 1, nome: "Acadêmico", pericias: [ pericias_dados[5], pericias_dados[6] ] },
  { id: 2, nome: "Soldado", pericias: [ {nome:"Vontade", id: 7}, {nome:"Diplomacia", id: 6}] },
  { id: 3, nome: "Policial", pericias: [ {nome:"Vontade", id: 7}, {nome:"Diplomacia", id: 6}] },
  { id: 4, nome: "Ocultista", pericias: [ {nome:"Vontade", id: 7}, {nome:"Diplomacia", id: 6}] },
  { id: 5, nome: "Policial2", pericias: [ {nome:"Vontade", id: 7}, {nome:"Diplomacia", id: 6}] },
  { id: 6, nome: "Ocultista2", pericias: [ {nome:"Vontade", id: 7}, {nome:"Diplomacia", id: 6}] },
];

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
      {origens.map((origem) => (
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
          <p>{origem.pericias[0]?.nome}</p>
          <p>{origem.pericias[1]?.nome}</p>
        </div>
      ))}
    </div>
  );
}

function TelaOrigens({ isAberto, setModalAberto, onConfirmar }) {
  const [origemSelecionada, setOrigemSelecionada] = useState(null);

  const handleSelecionar = (origem) => {
    const novaSelecao = handleSelectUnico(origemSelecionada?.id, origem.id);
    const novaOrigem = novaSelecao ? origensExemplo.find(o => o.id === novaSelecao) : null;
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
          origens={origensExemplo}
          origemSelecionada={origemSelecionada}
          onSelecionar={handleSelecionar}
        />
        <button disabled={desativar} onClick={handleConfirmar} className={estilosEtapas['botao-conf-origem']}>Escolher</button>
      </div>
    </Modal>
  );
}

function Etapa1() {
  // Estados temporários (renomeados com sufixo Temp)
  const [fichaTemp, setFichaTemp] = useState({
    nome: "",
    jogador: "",
  });
  const [origemSelecionadaTemp, setOrigemSelecionadaTemp] = useState(null);
  const [abrirOrigem, setAbrirOrigem] = useState(false);

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

      // Se houver origem com id > 0, localiza nos exemplos e seta
      if (etapa1_dados.origem.id > 0) {
        const origemEncontrada = origensExemplo.find(o => o.id === etapa1_dados.origem.id);
        if (origemEncontrada) {
          setOrigemSelecionadaTemp(origemEncontrada);
        }
      }
    }
  }, []); // executa apenas na montagem

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFichaTemp(prev => ({
      ...prev,
      [name]: name === "nex" ? Number(value) : value
    }));
  };


  const isDesabilitado = fichaTemp.nome === "" || 
                         fichaTemp.jogador === "" ||  
                         !origemSelecionadaTemp;

  const handleConfirmarOrigem = (origem) => {
    setOrigemSelecionadaTemp(origem);
  };

  const SalvarEtapa1 = () => {
    // Preenche a variável global com os dados atuais
    etapa1_dados.nome = fichaTemp.nome;
    etapa1_dados.jogador = fichaTemp.jogador;

    if (origemSelecionadaTemp) {
      etapa1_dados.origem.id = origemSelecionadaTemp.id;
      etapa1_dados.origem.nome = origemSelecionadaTemp.nome;
      etapa1_dados.origem.pericias = origemSelecionadaTemp.pericias.map((nomePericia, index) => ({
        id: index,
        nome: nomePericia,
        atributo: { nome: "", valor: "" },
        descricao: ""
      }));
    } else {
      etapa1_dados.origem = { id: 0, nome: "", pericias: [] };
    }

    console.log("Dados da Etapa 1 salvos em etapa1_dados:", etapa1_dados);
  };

  return (
    <>
      <HeaderBase pagina_atual={'claro'} isFixo={true} titulo={"Etapa 1: Dados iniciais"} />
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
        />
      </div>
    </>
  );
}

export default Etapa1;