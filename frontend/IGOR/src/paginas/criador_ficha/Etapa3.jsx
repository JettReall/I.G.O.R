import { CaixaTexto, InputComBotao, BotaoAvancarEtapa } from "../../componentes/criador-ficha/componentes";
import { useState } from "react";
import estilos from "../../componentes/ficha/componentes.module.css";
import estilosEtapas from "./etapas.module.css"
import clsx from "clsx";


// Componente local para exibir os atributos (copia o layout do Atributos original)
function ExibeAtributos({ atributos }) {
  function AtributoValor({ atr, valor }) {
    return (
      <div className={clsx(estilos.atributo, estilos[atr])}>
        <strong>{valor}</strong>
      </div>
    );
  }

//Não mexer no classname deste
  return (
    <div className={estilos["atributos-container"]}> 
      {atributos.map((atr) => (
        <AtributoValor key={atr.nome} atr={atr.nome} valor={atr.valor} />
      ))}
      {/* <Afinidade /> */}
    </div>
  );
}

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
    <div className={clsx(estilosEtapas['inputs-etapa3'],estilosEtapas['linha'])}>
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
  const [atributos, setAtributos] = useState([
    { nome: "for", valor: 0 },
    { nome: "agi", valor: 0 },
    { nome: "vig", valor: 0 },
    { nome: "int", valor: 0 },
    { nome: "pre", valor: 0 },
  ]);
  const [pontosDistribuir, setPontosDistribuir] = useState(9);

  // Botão avançar só fica habilitado quando não houver pontos restantes
  const isBotaoAvancarDesabilitado = pontosDistribuir !== 0;

  return (
    <div className={clsx(estilosEtapas['container-principal'],estilosEtapas['principal-etapa3'])}>

          <div className={estilos['slot-atributo']}>
               <ExibeAtributos atributos={atributos} />
          </div>

          <div className={clsx(estilosEtapas['container-menor'],estilosEtapas['coluna'],estilosEtapas['slot-inputs-etapa3'])}>

               <CaixaTexto
                    texto={
                    "Distribua os pontos entre os 5 atributos. Só é possível ter no máximo 3 por atributo."
                    }
               />

               <CaixaTexto
                    texto={`Você possui ${pontosDistribuir} pontos disponíveis`}
               />

               <ContainerInputs
                    atributos={atributos}
                    setAtributos={setAtributos}
                    pontosDistribuir={pontosDistribuir}
                    setPontosDistribuir={setPontosDistribuir}
               />

               {/* Botão de avanço condicional */}

               <BotaoAvancarEtapa isDisabled={isBotaoAvancarDesabilitado} />
          </div>
    </div>
  );
}

export default Etapa3;