import React, { useState, useEffect } from 'react';
import axios from 'axios';
import estilosEtapas from './etapas.module.css';
import clsx from 'clsx';
import { CaixaTexto, BotaoAvancarEtapa, BotaoVoltarEtapa } from '../../componentes/criador-ficha/componentes';
import { handleSelectUnico } from '../../assets/utils/SelecaoUnica';
import { useEtapa } from '../../componentes/EtapaContext';
import { etapa2_dados } from './VariaveisSistema';

import combatenteImg from '../../assets/imagens/elementos/combatente.png';
import especialistaImg from '../../assets/imagens/elementos/especialista.png';
import ocultistaImg from '../../assets/imagens/elementos/ocultista.png';
import indefinidoImg from '../../assets/imagens/elementos/indefinido.png';
import Carregando from '../../assets/utils/Carregando';

const imagens = {
  combatente: combatenteImg,
  especialista: especialistaImg,
  ocultista: ocultistaImg,
  indefinido: indefinidoImg,
};

// Componentes auxiliares (adaptados para trabalhar com objetos)
function BotaoClasseTrilha({ texto, selecionado, aoClicar }) {
  return (
    <button
      className={estilosEtapas?.['botao-classe-trilha'] || ''}
      disabled={selecionado}
      onClick={() => aoClicar(texto)}
    >
      {texto}
    </button>
  );
}

function ContainerClasseTrilhaInfo({ classe, trilha }) {
  const nomeClasse = classe?.nome || '';
  const nomeTrilha = trilha?.nome || '';
  return (
    <div className={clsx(estilosEtapas['container-info-classe-trilha'], estilosEtapas['coluna'])}>
      <strong>Classe: {nomeClasse}</strong>
      <strong>Trilha: {nomeTrilha}</strong>
    </div>
  );
}

function BotaoAvanco({ classeSelecionada, trilhaSelecionada, flagTrilha, aoAvancar, aoFinalizar }) {
  const isDisabled = flagTrilha
    ? !trilhaSelecionada
    : !classeSelecionada;

  if (!flagTrilha) {
    return (
      <button disabled={isDisabled} onClick={aoAvancar} className={estilosEtapas['avanco-etapa2']}>
        Avançar
      </button>
    );
  } else {
    return (
      <BotaoAvancarEtapa
        isDisabled={isDisabled}
        funcaoAntesAvancar={() => {
          console.log("Etapa 2 concluída:", { classe: classeSelecionada, trilha: trilhaSelecionada });
          aoFinalizar();
        }}
      />
    );
  }
}

function BotaoVoltar({ flagTrilha, aoRetornar, aoVoltarEtapa }) {
  if (!flagTrilha) {
    return <BotaoVoltarEtapa />;
  } else {
    return (
      <button onClick={aoRetornar} className={estilosEtapas['avanco-etapa2']}>
        Voltar às classes
      </button>
    );
  }
}

function SeletorClasseTrilha({ itens, selecionado, aoSelecionar }) {
  return (
    <div className={clsx(estilosEtapas['coluna'], estilosEtapas['botoes-etapa2'])}>
      {itens.map((item) => (
        <BotaoClasseTrilha
          key={item.id}
          texto={item.nome}
          selecionado={selecionado?.id === item.id}
          aoClicar={() => aoSelecionar(item)}
        />
      ))}
    </div>
  );
}

function ContainerImagem({ classe }) {
  const nomeClasse = classe?.nome?.toLowerCase() || 'indefinido';
  const imagem = imagens[nomeClasse] || imagens.indefinido;
  return (
    <div className={estilosEtapas['container-imagem']}>
      <img src={imagem} alt={`Imagem da classe ${nomeClasse}`} />
    </div>
  );
}

function Etapa2() {
  const { updateEtapa, etapaAtual } = useEtapa();

  // Estados separados
  const [classesList, setClassesList] = useState([]);      // todas as classes disponíveis
  const [trilhasList, setTrilhasList] = useState([]);      // trilhas da classe selecionada
  const [classeSelecionada, setClasseSelecionada] = useState(null);
  const [trilhaSelecionada, setTrilhaSelecionada] = useState(null);
  const [flagTrilha, setFlagTrilha] = useState(false);     // true = escolhendo trilha
  const [carregando, setCarregando] = useState(true);
  const [carregandoTrilhas, setCarregandoTrilhas] = useState(false);

  // 1. Carregar classes do backend
  useEffect(() => {
    const fetchClasses = async () => {
      setCarregando(true);
      try {
        const response = await axios.get('/api/personagens/classe');
        if (response.status === 200) {
          const data = response.data;
          setClassesList(Array.isArray(data) ? data : []);
        } else {
          setClassesList([]);
        }
      } catch (error) {
        console.error('Erro ao buscar classes:', error);
        setClassesList([]);
      } finally {
        setCarregando(false);
      }
    };
    fetchClasses();
  }, []);

  // 2. Carregar dados salvos (se houver) – etapa2_dados guarda objetos
  useEffect(() => {
    const carregarDadosSalvos = async () => {
      const classeSalva = etapa2_dados.classeAgenteEscolhida;
      const trilhaSalva = etapa2_dados.trilhaAgenteEscolhida;

      if (classeSalva?.id) {
        setClasseSelecionada(classeSalva);
        setCarregandoTrilhas(true);
        try {
          const response = await axios.get(`/api/personagens/trilha/${classeSalva.id}`);
          if (response.status === 200) {
            const data = response.data;
            setTrilhasList(Array.isArray(data) ? data : []);
            setFlagTrilha(true);
          }
        } catch (error) {
          console.error('Erro ao buscar trilhas da classe salva:', error);
          setTrilhasList([]);
        } finally {
          setCarregandoTrilhas(false);
        }
        if (trilhaSalva?.id) {
          setTrilhaSelecionada(trilhaSalva);
        }
      }
    };

    if (classesList.length > 0) {
      carregarDadosSalvos();
    }
  }, [classesList]);

  // Função para selecionar uma classe
  const handleSelecionarClasse = async (classe) => {
    setClasseSelecionada(classe);
    setCarregandoTrilhas(true);
    try {
      const response = await axios.get(`/api/personagens/trilha/${classe.id}`);
      if (response.status === 200) {
        const data = response.data;
        setTrilhasList(Array.isArray(data) ? data : []);
        setFlagTrilha(true);
      }
    } catch (error) {
      console.error('Erro ao buscar trilhas:', error);
      setTrilhasList([]);
    } finally {
      setCarregandoTrilhas(false);
    }
  };

  // Função para selecionar uma trilha
  const handleSelecionarTrilha = (trilha) => {
    setTrilhaSelecionada(trilha);
  };

  // Voltar para a escolha de classes
  const handleRetornar = () => {
    setFlagTrilha(false);
    setTrilhaSelecionada(null);
  };

  // Salvar etapa2_dados (objetos completos)
  const SalvarEtapa2 = () => {
    etapa2_dados.classeAgenteEscolhida = classeSelecionada;
    etapa2_dados.trilhaAgenteEscolhida = trilhaSelecionada;
    console.log('Dados da Etapa 2 salvos em etapa2_dados:', etapa2_dados);
  };

  // Verifica se o botão avançar deve estar desabilitado
  const isDesabilitado = flagTrilha
    ? !trilhaSelecionada
    : !classeSelecionada || carregandoTrilhas;

  if (carregando) {
    return <Carregando aberto={carregando}></Carregando>;
  }

  return (
    <div className={clsx(estilosEtapas['container-principal'], estilosEtapas['principal-etapa2'])}>
      <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['slot-imagem-etapa2'], estilosEtapas['coluna'])}>
        <ContainerImagem classe={classeSelecionada} />
        <ContainerClasseTrilhaInfo classe={classeSelecionada} trilha={trilhaSelecionada} />
      </div>

      <div className={clsx(estilosEtapas['container-menor'], estilosEtapas['seletor-etapa2'], estilosEtapas['coluna'])}>
        {!flagTrilha ? (
          <SeletorClasseTrilha
            itens={classesList}
            selecionado={classeSelecionada}
            aoSelecionar={handleSelecionarClasse}
          />
        ) : (
          <SeletorClasseTrilha
            itens={trilhasList}
            selecionado={trilhaSelecionada}
            aoSelecionar={handleSelecionarTrilha}
          />
        )}

        <div className={estilosEtapas['container-botoes-avanco']}>
          {/* Botão Voltar */}
          {flagTrilha ? (
            <button onClick={handleRetornar} className={estilosEtapas['avanco-etapa2']}>
              Voltar às classes
            </button>
          ) : (
            <BotaoVoltarEtapa />
          )}

          {/* Botão Avançar / Confirmar */}
          {!flagTrilha ? (
            <button
              disabled={isDesabilitado}
              onClick={() => {
                if (classeSelecionada) {
                  handleSelecionarClasse(classeSelecionada);
                }
              }}
              className={estilosEtapas['avanco-etapa2']}
            >
              {carregandoTrilhas ? 'Carregando...' : 'Avançar'}
            </button>
          ) : (
            <BotaoAvancarEtapa
              isDisabled={isDesabilitado}
              funcaoAntesAvancar={SalvarEtapa2}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Etapa2;