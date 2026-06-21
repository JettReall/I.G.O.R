// Etapa4-Pericias.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { SeletorDePericias } from "../../assets/utils/ContainerPericias";
import { BotaoAvancarEtapa, BotaoVoltarEtapa } from "../../componentes/criador-ficha/componentes";
import { useEtapa } from "../../componentes/EtapaContext";
import { etapa1_dados, etapa3_dados, etapa4_dados } from "./VariaveisSistema";
import Modal from "../../componentes/Modal";

function Etapa4() {
  const { updateEtapa, etapaAtual } = useEtapa();
  const qtdElegiveis = 5 + etapa3_dados[3].valor + 1;
  const [selecionados, setSelecionados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchPericias = async () => {
      setCarregando(true);
      try {
        const response = await axios.get('/api/personagens/pericias');
        if (response.status === 200) {
          const data = response.data;
          etapa4_dados.length = 0;
          if (Array.isArray(data)) {
            data.forEach(item => {
              etapa4_dados.push({
                pericia: {
                  id: item.id,
                  nome: item.nome,
                  atributo: item.atributo,
                  descricao: item.descricao || ""
                },
                treino: 0,
                bonus: 0,
                outro: 0
              });
            });
          }
        } else {
          console.error('Erro ao carregar perícias: status', response.status);
        }
      } catch (error) {
        console.error('Erro ao buscar perícias:', error);
      } finally {
        setCarregando(false);
        processarSelecoesIniciais();
      }
    };

    fetchPericias();
  }, []);

  const processarSelecoesIniciais = () => {
    const idsOrigem = etapa1_dados.origem?.pericias?.map(p => p.id) || [];
    setSelecionados(prev => {
      const novos = [...prev];
      idsOrigem.forEach(id => {
        if (!novos.includes(id)) novos.push(id);
      });
      return novos;
    });
  };

  const handleTogglePericia = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Função SalvarEtapa4 revisada com logs e verificação
  function SalvarEtapa4() {
  console.log('🟢 SalvarEtapa4 chamado.');
  console.log('📋 selecionados:', selecionados);
  console.log('📦 etapa4_dados antes:', etapa4_dados);

  if (etapa4_dados.length === 0) {
    console.warn('⚠️ etapa4_dados está vazio.');
    return;
  }

  // Cria um novo array com os treinos incrementados
  const novosDados = etapa4_dados.map(item => {
    if (selecionados.includes(item.pericia.id)) {
      return {
        ...item,
        treino: item.treino + 1
      };
    }
    return item;
  });

  // Reatribui o array global (permitido porque é 'let')
  etapa4_dados.length = 0;
  etapa4_dados.push(...novosDados);

  console.log('📦 etapa4_dados depois:', etapa4_dados);
  console.log('✅ etapa4_dados atualizado (completo):', JSON.parse(JSON.stringify(etapa4_dados)));
}

  // Componente modal para escolha de perícias do Combatente (ainda não integrado)
  function TreinaCombatente() {
    const [aberto, setAberto] = useState(true);
    const [escolha1, setEscolha1] = useState(null);
    const [escolha2, setEscolha2] = useState(null);

    const handleConfirmar = () => {
      if (escolha1 && escolha2) {
        const ids = [escolha1, escolha2];
        setSelecionados(prev => {
          const novos = [...prev];
          ids.forEach(id => {
            if (!novos.includes(id)) novos.push(id);
          });
          return novos;
        });
        setAberto(false);
      }
    };

    const handleRadioChange = (group, value) => {
      if (group === 1) setEscolha1(value);
      else setEscolha2(value);
    };

    const isDisabled = !escolha1 || !escolha2;

    return (
      <Modal open={aberto}>
        <h1>Escolha entre:</h1>
        <div>
          <label>
            <input
              type="radio"
              name="grupo1"
              value="16"
              onChange={(e) => handleRadioChange(1, parseInt(e.target.value))}
            /> Luta
          </label>
          <label>
            <input
              type="radio"
              name="grupo1"
              value="21"
              onChange={(e) => handleRadioChange(1, parseInt(e.target.value))}
            /> Pontaria
          </label>
        </div>
        <h2>--------------</h2>
        <div>
          <label>
            <input
              type="radio"
              name="grupo2"
              value="23"
              onChange={(e) => handleRadioChange(2, parseInt(e.target.value))}
            /> Reflexos
          </label>
          <label>
            <input
              type="radio"
              name="grupo2"
              value="10"
              onChange={(e) => handleRadioChange(2, parseInt(e.target.value))}
            /> Fortitude
          </label>
        </div>
        <button onClick={handleConfirmar} disabled={isDisabled}>Confirmar</button>
      </Modal>
    );
  }

  // Função placeholder para TreinaPericiaClasse (será implementada futuramente)
  // eslint-disable-next-line no-unused-vars
  function TreinaPericiaClasse() {
    // Lógica futura para adicionar perícias da classe
  }

  if (carregando) {
    return <div>Carregando perícias...</div>;
  }

  return (
    <>
      <SeletorDePericias
        periciasElegiveis={qtdElegiveis}
        listaPericias={etapa4_dados} // passa diretamente a lista com estrutura aninhada
        selecionados={selecionados}
        onToggle={handleTogglePericia}
        isEtapa4={true}
        botoes={{
          esquerdo: <BotaoVoltarEtapa />,
          direito: <BotaoAvancarEtapa funcaoAntesAvancar={SalvarEtapa4} />
        }}
      />
      {/* <TreinaCombatente /> */}
    </>
  );
}

export default Etapa4;