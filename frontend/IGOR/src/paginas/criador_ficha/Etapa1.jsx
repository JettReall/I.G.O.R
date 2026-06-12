import clsx from "clsx";
import estilosEtapas from "./etapas.module.css";
import { useState } from "react";
import { BotaoAvancarEtapa, CaixaTexto, InputComBotao } from "../../componentes/criador-ficha/componentes";

// Componentes movidos para fora (estáveis)
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

function BotaoOrigem() {
  let origem = "Escolher";
  return (
    <div className={clsx(estilosEtapas['botao-origem'], estilosEtapas['etapa1'])}>
      <strong className={clsx(estilosEtapas['titulo-input'], estilosEtapas['etapa1'])}>Origem</strong>
      <button>{origem}</button>
    </div>
  );
}

function Etapa1() {
  const [ficha, setFicha] = useState({
    nome: "",
    jogador: "",
    nex: 0,
  });

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

  const isDesabilitado = ficha.nome === "" || ficha.jogador === "" || ficha.nex === 0;

  return (
    <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa1'])}>


        <CaixaTexto texto={"Vamos começar. Primeiro, insira algumas informações iniciais:"}/>


      <div className={clsx(estilosEtapas['container-menor'],estilosEtapas['coluna'], estilosEtapas['inputs-etapa1'])}>
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
      <div className={clsx(estilosEtapas['container-menor'],estilosEtapas['linha'], estilosEtapas['botoes-etapa1'])}>
        <BotaoOrigem />
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
        <BotaoAvancarEtapa isDisabled={isDesabilitado} />
      </div>
    </div>
  );
}

export default Etapa1;