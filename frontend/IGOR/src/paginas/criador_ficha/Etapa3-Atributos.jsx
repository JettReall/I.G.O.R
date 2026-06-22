import { CaixaTexto, InputComBotao, BotaoAvancarEtapa, ExibeAtributos, BotaoVoltarEtapa } from "../../componentes/criador-ficha/componentes";
import { useState, useEffect } from "react";
import estilos from "../../componentes/ficha/componentes.module.css";
import estilosEtapas from "./etapas.module.css";
import clsx from "clsx";
import { useEtapa } from "../../componentes/EtapaContext";
import { HeaderBase } from "../../componentes/header/headers";
import { etapa3_dados } from "./VariaveisSistema";

// Mapeamento de nomes curtos (usados internamente) para nomes completos (usados na variável global)
const mapeamentoNomes = {
  for: "forca",
  agi: "agilidade",
  vig: "vigor",
  int: "intelecto",
  pre: "presenca",
};

// Nomes curtos para uso interno (botões, exibição)
const nomesInternos = ["for", "agi", "vig", "int", "pre"];

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
          texto={mapeamentoNomes[attr.nome].toUpperCase()}
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

  // Dados padrão com nomes internos (curtos)
  const dadosPadrao = nomesInternos.map((nome) => ({ nome, valor: 0 }));

  // Estados temporários
  const [atributosTemp, setAtributosTemp] = useState(dadosPadrao);
  const [pontosDistribuir, setPontosDistribuir] = useState(9);

  // Carregar dados salvos ao montar o componente (agora usando objeto)
  useEffect(() => {
    // Verifica se há dados salvos (se algum valor é diferente de zero)
    const temDados = Object.values(etapa3_dados).some(valor => valor !== 0);

    if (temDados) {
      // Mapeia os dados salvos (objeto) para o formato interno (array)
      const dadosCarregados = nomesInternos.map((nomeCurto) => {
        const nomeCompleto = mapeamentoNomes[nomeCurto];
        return { nome: nomeCurto, valor: etapa3_dados[nomeCompleto] || 0 };
      });
      setAtributosTemp(dadosCarregados);
      // Recalcula os pontos restantes
      const totalUsado = dadosCarregados.reduce((acc, item) => acc + item.valor, 0);
      setPontosDistribuir(9 - totalUsado);
    }
  }, []);

  const isBotaoAvancarDesabilitado = pontosDistribuir !== 0;

  // Função SalvarEtapa3 – salva no formato objeto com chave-valor
  const SalvarEtapa3 = () => {
    // Constrói o objeto com os nomes completos e valores atuais
    const dadosParaSalvar = {};
    atributosTemp.forEach((item) => {
      const nomeCompleto = mapeamentoNomes[item.nome];
      dadosParaSalvar[nomeCompleto] = item.valor;
    });

    // Substitui o conteúdo do objeto global (mantendo a referência)
    Object.keys(etapa3_dados).forEach(key => delete etapa3_dados[key]);
    Object.assign(etapa3_dados, dadosParaSalvar);

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