import clsx from "clsx";
import estilosEtapas from "./etapas.module.css";
import { useState } from "react";
import { BotaoAvancarEtapa, CaixaTexto, InputComBotao } from "../../componentes/criador-ficha/componentes";
import Modal from "../../componentes/Modal";
import { handleSelectUnico } from "../../assets/utils/SelecaoUnica";

const origensExemplo = [
  { id: 1, nome: "Acadêmico", pericias: ["Conhecimento", "Investigação"] },
  { id: 2, nome: "Soldado", pericias: ["Atletismo", "Vontade"] },
  { id: 3, nome: "Policial", pericias: ["Investigação", "Percepção"] },
  { id: 4, nome: "Ocultista", pericias: ["Ocultismo", "Vontade"] },
  { id: 5, nome: "Policial2", pericias: ["Investigação", "Percepção"] },
  { id: 6, nome: "Ocultista2", pericias: ["Ocultismo", "Vontade"] },
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
          <p>{origem.pericias[0]}</p>
          <p>{origem.pericias[1]}</p>
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

function Etapa1()  {
  const [ficha, setFicha] = useState({
    nome: "",
    jogador: "",
    nex: 0,
  });
  const [origemSelecionada, setOrigemSelecionada] = useState(null);
  const [abrirOrigem, setAbrirOrigem] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nex") {
      const num = Number(value);
      const isValid = !isNaN(num) && num >= 0 && num <= 100 && (num % 5 === 0 || num === 99);
      if (!isValid) return;
    }
    setFicha(prev => ({
      ...prev,
      [name]: name === "nex" ? Number(value) : value
    }));
  };

  const incrementarNex = () => {
    const atual = ficha.nex;
    let novo = atual + 5;
    if (novo >= 100) novo = 99;
    if (novo % 5 === 0 || novo === 99) {
      setFicha(prev => ({ ...prev, nex: novo }));
    }
  };

  const decrementarNex = () => {
    const atual = ficha.nex;
    let novo = 0;
    if (atual === 99) {
      novo = atual - 4;
    } else {
      novo = atual - 5;
    }
    if (novo < 0) novo = 0;
    if (novo % 5 === 0 || novo === 99) {
      setFicha(prev => ({ ...prev, nex: novo }));
    }
  };

  const isDesabilitado = ficha.nome === "" || ficha.jogador === "" || ficha.nex === 0 || !origemSelecionada;

  const handleConfirmarOrigem = (origem) => {
    setOrigemSelecionada(origem);  
  };

  const SalvarEtapa1 = () => {
    console.log("Dados iniciais salvos.");
    console.log(origemSelecionada, ficha);

  }

  return (
    <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa1'])}>
      <CaixaTexto texto={`Vamos começar. Primeiro, insira algumas informações iniciais:`} tela={'caixa-etapa1'}/>

      <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['coluna'], estilosEtapas['inputs-etapa1'])}>
        <InputNome 
          texto="Nome do personagem" 
          nomeCampo="nome" 
          placeholder="Personagem" 
          valor={ficha.nome}
          aoMudar={handleChange}
        />
        <InputNome 
          texto="Nome do Jogador" 
          nomeCampo="jogador" 
          placeholder="Jogador" 
          valor={ficha.jogador}
          aoMudar={handleChange}
        />
      </div>

      <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['linha'], estilosEtapas['botoes-etapa1'])}>
        <BotaoOrigem 
          origemSelecionada={origemSelecionada}
          aoAbrirModal={() => setAbrirOrigem(true)}
        />

        <InputComBotao
          valor={ficha.nex} 
          aoMudar={handleChange} 
          aoIncrementar={incrementarNex}
          aoDecrementar={decrementarNex}
          nome={"nex"}
          texto={"NEX:"}
          classeExtra={"nex"}
          min={0}
          max={100}
        />
            <BotaoAvancarEtapa isDisabled={isDesabilitado} funcaoAntesAvancar={SalvarEtapa1} />
      </div>

      <TelaOrigens
        isAberto={abrirOrigem}
        setModalAberto={setAbrirOrigem}
        onConfirmar={handleConfirmarOrigem}
      />
    </div>
  );
}

export default Etapa1;