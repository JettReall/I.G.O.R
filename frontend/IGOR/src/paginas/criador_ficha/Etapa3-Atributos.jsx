import { CaixaTexto, InputComBotao, BotaoAvancarEtapa, ExibeAtributos } from "../../componentes/criador-ficha/componentes";
import { useState, useEffect } from "react";
import estilos from "../../componentes/ficha/componentes.module.css";
import estilosEtapas from "./etapas.module.css";
import clsx from "clsx";
import { useEtapa } from "../../componentes/EtapaContext"; // importa o contexto

function ContainerInputs({ atributos, setAtributos, pontosDistribuir, setPontosDistribuir }) {
  const handleIncrementar = (nomeAttr) => {
    const attr = atributos.find((a) => a.nome === nomeAttr);
    if (attr.valor >= 3) {
      alert("Cada atributo pode ter no máximo 3 pontos.");
      return;
    }
    if (pontosDistribuir <= 0) {
      alert("Você não tem mais pontos para distribuir!");
      return;
    }
    setAtributos((prev) =>
      prev.map((a) =>
        a.nome === nomeAttr ? { ...a, valor: a.valor + 1 } : a
      )
    );
    setPontosDistribuir((prev) => prev - 1);
  };

  const handleDecrementar = (nomeAttr) => {
    const attr = atributos.find((a) => a.nome === nomeAttr);
    if (attr.valor <= 0) {
      alert("O valor não pode ser menor que 0.");
      return;
    }
    setAtributos((prev) =>
      prev.map((a) =>
        a.nome === nomeAttr ? { ...a, valor: a.valor - 1 } : a
      )
    );
    setPontosDistribuir((prev) => prev + 1);
  };

  return (
    <div className={clsx(estilosEtapas['inputs-etapa3'], estilosEtapas['linha'])}>
      {atributos.map((attr) => (
        <InputComBotao
          key={attr.nome}
          texto={attr.nome.toUpperCase()}
          valor={attr.valor}
          aoIncrementar={() => handleIncrementar(attr.nome)}
          aoDecrementar={() => handleDecrementar(attr.nome)}
          min={0}
          max={3}
          nome={attr.nome}
        />
      ))}
    </div>
  );
}

function Etapa3() {
  const { updateEtapa, etapaAtual } = useEtapa(); // contexto

  const [atributos, setAtributos] = useState([]);
  const dados = [   
    { nome: "for", valor: 0 },
    { nome: "agi", valor: 0 },
    { nome: "vig", valor: 0 },
    { nome: "int", valor: 0 },
    { nome: "pre", valor: 0 },
  ];

  useEffect(() => {
    setAtributos(dados);
  }, []);

  const [pontosDistribuir, setPontosDistribuir] = useState(9);
  const isBotaoAvancarDesabilitado = pontosDistribuir !== 0;

  const handleVoltar = () => {
    updateEtapa(etapaAtual - 1); // volta para etapa 2
  };

  // Não há console.log neste arquivo; se houverem, serão mantidos para debug.

  return (
    <>
      <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa3'])}>
        <div className={estilos['slot-atributo']}>
          <ExibeAtributos atributos={atributos} />
        </div>

        <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['coluna'], estilosEtapas['slot-inputs-etapa3'])}>
          <CaixaTexto
            texto="Distribua os pontos entre os 5 atributos. Só é possível ter no máximo 3 por atributo."
            tela={'caixa-etapa3'}
          />
          <CaixaTexto
            texto={`Você possui ${pontosDistribuir} pontos disponíveis`}
            tela={'caixa-etapa3'}
          />
          <ContainerInputs
            atributos={atributos}
            setAtributos={setAtributos}
            pontosDistribuir={pontosDistribuir}
            setPontosDistribuir={setPontosDistribuir}
          />

          {/* Botão Voltar (local, usando contexto) */}
          <button onClick={handleVoltar} className={estilosEtapas['botao-voltar-etapa']}>
            Voltar
          </button>

          {/* Botão Avançar (componente que já usa contexto) */}
          <BotaoAvancarEtapa isDisabled={isBotaoAvancarDesabilitado} />
        </div>
      </div>
    </>
  );
}

export default Etapa3;