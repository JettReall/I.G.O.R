import { CaixaTexto, InputComBotao, BotaoAvancarEtapa, ExibeAtributos, BotaoVoltarEtapa } from "../../componentes/criador-ficha/componentes";
import { useState, useEffect } from "react";
import estilos from "../../componentes/ficha/componentes.module.css";
import estilosEtapas from "./etapas.module.css";
import clsx from "clsx";
import { useEtapa } from "../../componentes/EtapaContext";
import { HeaderBase } from "../../componentes/header/headers";
import { etapa3_dados } from "./VariaveisSistema";

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
  const { updateEtapa, etapaAtual } = useEtapa();

  // Dados padrão (valores iniciais)
  const dadosPadrao = [
    { nome: "for", valor: 0 },
    { nome: "agi", valor: 0 },
    { nome: "vig", valor: 0 },
    { nome: "int", valor: 0 },
    { nome: "pre", valor: 0 },
  ];

  // Estados temporários com sufixo Temp
  const [atributosTemp, setAtributosTemp] = useState(dadosPadrao);
  const [pontosDistribuir, setPontosDistribuir] = useState(9);

  // Carregar dados salvos ao montar o componente
  useEffect(() => {
    // Verifica se há dados salvos (se algum valor é diferente de zero)
    const temDados = etapa3_dados.some(item => item.valor !== 0);

    if (temDados) {
      setAtributosTemp(etapa3_dados);
      // Recalcula os pontos restantes com base nos valores carregados
      const totalUsado = etapa3_dados.reduce((acc, item) => acc + item.valor, 0);
      setPontosDistribuir(9 - totalUsado);
    }
  }, []);

  const isBotaoAvancarDesabilitado = pontosDistribuir !== 0;

  // Função SalvarEtapa3 – copia os dados atuais para a variável global
  const SalvarEtapa3 = () => {
    // Atualiza o array global com os valores atuais
    etapa3_dados.length = 0; // limpa o array
    atributosTemp.forEach(item => etapa3_dados.push({ ...item })); // copia os objetos

    console.log("Dados da Etapa 3 salvos em etapa3_dados:", etapa3_dados);
  };

  return (
    <>
      <HeaderBase pagina_atual={"claro"} titulo={"Etapa 3: Atributos"} />
      <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa3'])}>
        <div className={estilos['slot-atributo']}>
          <ExibeAtributos atributos={atributosTemp} />
        </div>

        <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['coluna'], estilosEtapas['slot-inputs-etapa3'])}>
          <CaixaTexto
            texto={pontosDistribuir ? `Você possui ${pontosDistribuir} pontos disponíveis.` : 'Todos os pontos distribuídos'}
            tela={'caixa-etapa3'}
          />
          <ContainerInputs
            atributos={atributosTemp}
            setAtributos={setAtributosTemp}
            pontosDistribuir={pontosDistribuir}
            setPontosDistribuir={setPontosDistribuir}
          />

          <div className={estilosEtapas['container-botoes-avanco']}>
            <BotaoVoltarEtapa />
            <BotaoAvancarEtapa
              isDisabled={isBotaoAvancarDesabilitado}
              funcaoAntesAvancar={SalvarEtapa3}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Etapa3;