// Etapa4-Pericias.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { SeletorDePericias } from "../../assets/utils/ContainerPericias";
import { BotaoAvancarEtapa, BotaoVoltarEtapa } from "../../componentes/criador-ficha/componentes";
import { useEtapa } from "../../componentes/EtapaContext";
import { etapa1_dados, etapa2_dados, etapa3_dados, etapa4_dados, pericias_personagem } from "./VariaveisSistema";
import Modal from "../../componentes/Modal";
import Carregando from "../../assets/utils/Carregando";


function Etapa4() {
  const { updateEtapa, etapaAtual } = useEtapa();
  
  // CORREÇÃO: usa etapa2_dados para pegar a classe e sua propriedade
  const classe = etapa2_dados.classeAgenteEscolhida;
  const qtdElegiveis = (classe?.numero_Pericias_Iniciais || 0) + (etapa3_dados[3]?.valor || 0);
  
  const [selecionados, setSelecionados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtrada, setFiltrada] = useState([]); // lista filtrada (se necessário)

  // Função para filtrar a lista de perícias (ex.: remover as já selecionadas)
  function FiltrarLista(lista) {
    // Por enquanto, retorna a lista inteira (pode ser adaptada no futuro)
    // Exemplo: filtrar as que já têm treino >= limite, etc.
    return lista;
  }

  // Função para adicionar perícias da classe
  function TreinaPericiaClasse() {
    const classeId = etapa2_dados.classeAgenteEscolhida?.id;
    const novosIds = [];

    switch (classeId) {
      case 1: // Combatente
        // Abre modal para escolher entre Luta(16) e Pontaria(21) e entre Reflexos(23) e Fortitude(10)
        // A implementação do modal será feita separadamente; aqui apenas adicionamos os IDs escolhidos.
        // Exemplo (mock): adiciona 16 e 23
        novosIds.push(16, 23);
        break;
      case 3: // Ocultista
        // Adiciona os IDs 26 e 18
        novosIds.push(26, 18);
        break;
      case 2: // Especialista
        // Nada a adicionar
        break;
      default:
        break;
    }

    if (novosIds.length > 0) {
      setSelecionados(prev => {
        const novos = [...prev];
        novosIds.forEach(id => {
          if (!novos.includes(id)) novos.push(id);
        });
        return novos;
      });
    }
  }

  // Processa seleções iniciais: origem + classe
  const processarSelecoesIniciais = () => {
    // 1. Adiciona perícias da origem
    const idsOrigem = etapa1_dados.origem?.pericias?.map(p => p.id) || [];
    setSelecionados(prev => {
      const novos = [...prev];
      idsOrigem.forEach(id => {
        if (!novos.includes(id)) novos.push(id);
      });
      return novos;
    });

    // 2. Adiciona perícias da classe
    TreinaPericiaClasse();
  };

  // Carregar lista de perícias do backend
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
          // Aplica filtro inicial (se necessário)
          const filtrada = FiltrarLista(etapa4_dados);
          setFiltrada(filtrada);
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

  // Alterna seleção de uma perícia
  const handleTogglePericia = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Salva etapa 4: incrementa treino das perícias selecionadas
  function SalvarEtapa4() {
    pericias_personagem.length = 0;
pericias_personagem.push(...selecionados);
    console.log(pericias_personagem);
  }

  // Componente modal para escolha de perícias do Combatente
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

  // Retorna o número de perícias fixas (origem + classe) para subtrair do total
  function RetornaConstAddPericia() {
    // número de perícias fixas = perícias da origem (geralmente 2) + adições da classe (varia)
    const idsOrigem = etapa1_dados.origem?.pericias?.length || 0;
    const classeId = etapa2_dados.classeAgenteEscolhida?.id;
    let adicionaisClasse = 0;
    switch (classeId) {
      case 1: // Combatente
      case 3: // Ocultista
        adicionaisClasse = 2; // duas perícias adicionais
        break;
      case 2: // Especialista
        adicionaisClasse = 0;
        break;
      default:
        break;
    }
    return idsOrigem + adicionaisClasse;
  }

  if (carregando) {
    return <Carregando aberto={carregando} />;
  }

  return (
    <>
      <SeletorDePericias
        periciasElegiveis={qtdElegiveis}
        listaPericias={etapa4_dados}
        selecionados={selecionados}
        constExtra={RetornaConstAddPericia()} // passa o número de fixas
        onToggle={handleTogglePericia}
        isEtapa4={true}
        botoes={{
          esquerdo: <BotaoVoltarEtapa />,
          direito: <BotaoAvancarEtapa funcaoAntesAvancar={SalvarEtapa4} />
        }}
      />
      {/* Modal do Combatente pode ser usado futuramente com um estado para abri-lo */}
    </>
  );
}

export default Etapa4;