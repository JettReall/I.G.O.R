import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { HeaderBase } from "../../componentes/header/headers";
import { BotaoRetorno } from "../../componentes/botoes/Botoes";
import { 
  Atributos, 
  StatusContainer, 
  Pericia, 
  AtaqueRitual, 
  Item, 
  InfoPersona, 
  BotaoAumentarNex 
} from "../../componentes/ficha/componentes";
import estilos from './ficha.module.css';
import Modal from "../../componentes/Modal";
import { useUser } from '../../UserContext.jsx';

// Componentes auxiliares – agora recebem o objeto ficha diretamente
function ContainerPericias({ ficha }) {
  const headerPericia = {
    nome: "Perícia",
    atributo: "Atributo",
    treino: "Treino",
    bonus: "Bônus",
    extra: "Extra",
    total: "Total"
  };

  return (
    <div className={estilos['container-pericias']}>
      <Pericia dados={headerPericia} isHeader={true} />
      {ficha.pericias?.map((pericia, index) => (
        <Pericia key={index} dados={pericia} />
      ))}
    </div>
  );
}

function ContainerAtaques({ ficha }) {
  const headerAtaque = {
    nome: "Nome",
    categoria: "Atributo Base",
    tipo: "Tipo de Ataque",
  };

  return (
    <div className={estilos['container-ataque-ritual']}>
      <AtaqueRitual dados_ataque_ritual={headerAtaque} isHeader={true} />
      {ficha.ataques?.map((ataque, index) => (
        <AtaqueRitual key={index} dados_ataque_ritual={ataque} />
      ))}
    </div>
  );
}

function ContainerRituais({ ficha }) {
  const headerRitual = {
    nome: "Ritual",
    categoria: "Círculo",
    tipo: "Elemento",
  };

  return (
    <div className={estilos['container-ataque-ritual']}>
      <AtaqueRitual dados_ataque_ritual={headerRitual} isHeader={true} />
      {ficha.rituais?.map((ritual, index) => (
        <AtaqueRitual key={index} dados_ataque_ritual={ritual} />
      ))}
    </div>
  );
}

function ContainerItems({ ficha }) {
  const headerItem = {
    nome: "Nome",
    categoria: "Cat.",
    quantia: "Qtd",
    carga: "Carga unit.",
    total: "Carga total"
  };

  const itens = ficha.inventario?.itens || [];

  return (
    <div className={estilos['container-itens']}>
      <Item dados_item={headerItem} isHeader={true} />
      {itens.map((item, index) => (
        <Item key={index} dados_item={item} />
      ))}
    </div>
  );
}

function ContainerAtaqueRitual({ ficha }) {
  const [isRitual, setIsRitual] = useState(true);
  const [abaRitual, setAbaRitual] = useState(true);
  const [abaAtaque, setAbaAtaque] = useState(false);

  const TrocaTela = () => {
    setIsRitual(!isRitual);
    setAbaRitual(!abaRitual);
    setAbaAtaque(!abaAtaque);
  };

  const BotoesAtaqueRitual = () => (
    <div className={estilos['container-botao-atk-ritual']}>
      <button className={estilos['botao-ataque-ritual']} disabled={abaRitual} onClick={TrocaTela}>
        Rituais
      </button>
      <button className={estilos['botao-ataque-ritual']} disabled={abaAtaque} onClick={TrocaTela}>
        Ataques
      </button>
    </div>
  );

  const estiloCaixa = { gap: '0' };

  return (
    <div style={estiloCaixa}>
      <BotoesAtaqueRitual />
      {isRitual ? (
        <ContainerRituais ficha={ficha} />
      ) : (
        <ContainerAtaques ficha={ficha} />
      )}
    </div>
  );
}

function ContainerAtaquesItens({ ficha }) {
  return (
    <div className={estilos['container-ataques-itens']}>
      <ContainerAtaqueRitual ficha={ficha} />
      <strong className={estilos['titulo-inventario']}>Inventário</strong>
      <ContainerItems ficha={ficha} />
    </div>
  );
}

function ContainerValAtualMax({ ficha }) {
  // Usa diretamente ficha.vida, ficha.pe, ficha.sanidade
  const vida = ficha.vida || { atual: 0, max: 0 };
  const pe = ficha.pe || { atual: 0, max: 0 };
  const sanidade = ficha.sanidade || { atual: 0, max: 0 };

  return (
    <div className={estilos['container-triplo-status']}>
      <StatusContainer
        nome_up="HP Atual"
        nome_down="HP Máximo"
        valor_up={vida.atual}
        valor_down={vida.max}
      />
      <StatusContainer
        nome_up="PE Atual"
        nome_down="PE Máximo"
        valor_up={pe.atual}
        valor_down={pe.max}
      />
      <StatusContainer
        nome_up="SAN Atual"
        nome_down="SAN Máximo"
        valor_up={sanidade.atual}
        valor_down={sanidade.max}
      />
    </div>
  );
}

function ContainerDadosSoltos({ ficha }) {
  return (
    <div className={estilos['container-triplo-status']}>
      <StatusContainer isDadoUnico={true} nome_up="Defesa" valor_up={ficha.defesa || 0} />
      <StatusContainer
        nome_up="DESL."
        valor_up={ficha.deslocamento || 0}
        nome_down="Carga máx."
        valor_down={ficha.carga || 0}
      />
      <StatusContainer
        nome_up="NEX"
        valor_up={ficha.nex || 0}
        nome_down="PE / Rodada"
        valor_down={ficha.pe_rodada || 0}
      />
    </div>
  );
}

function BotoesFicha({ fichaId }) {
  const caminhoNex = `/criar_ficha/nex/${fichaId}`;
  return (
    <div className={estilos['botoes-header-ficha']}>
      <BotaoAumentarNex caminho={caminhoNex} />
    </div>
  );
}

function Ficha() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { id: campanhaId, fichaId } = useParams();
  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const carregarFicha = () => {
      if (!campanhaId || !fichaId) {
        setErro(true);
        setLoading(false);
        return;
      }

      const storedCampanhas = localStorage.getItem('campanhas');
      if (!storedCampanhas) {
        setErro(true);
        setLoading(false);
        return;
      }

      try {
        const campanhas = JSON.parse(storedCampanhas);
        const campanha = campanhas.find(c => c.id === parseInt(campanhaId));
        if (!campanha) {
          setErro(true);
          setLoading(false);
          return;
        }

        const personagens = campanha.personagens || [];
        const personagem = personagens.find(p => p.id === parseInt(fichaId));
        if (!personagem) {
          setErro(true);
          setLoading(false);
          return;
        }

        setFicha(personagem);
        setLoading(false);
      } catch (e) {
        console.error('Erro ao carregar ficha:', e);
        setErro(true);
        setLoading(false);
      }
    };

    carregarFicha();
  }, [campanhaId, fichaId]);

  if (loading) {
    return <div className={estilos.carregando}>Carregando ficha...</div>;
  }

  if (erro || !ficha) {
    return (
      <Modal open={true}>
        <strong>Ficha não encontrada</strong>
        <button onClick={() => navigate('/campanhas')}>Voltar</button>
      </Modal>
    );
  }

  // Monta o objeto dados_persona para o componente InfoPersona
  const dadosPersona = {
    jogador: ficha.jogador || "",
    origem: ficha.origem?.nome || "",
    classe: ficha.classe || "",
    trilha: ficha.trilha || "",
  };

  const atributos = Array.isArray(ficha.atributos) ? ficha.atributos : [
  { nome: "for", valor: 0 },
  { nome: "agi", valor: 0 },
  { nome: "vig", valor: 0 },
  { nome: "int", valor: 0 },
  { nome: "pre", valor: 0 }
];

  return (
    <>
      <header>
        <HeaderBase
          titulo={ficha.nomePersonagem || "Agente"}
          pagina_atual={"ficha"}
          botao_L={<BotaoRetorno aoClicar={() => navigate(-1)} />}
          botao_R={<BotoesFicha fichaId={ficha.id} />}
        />
      </header>
      <main className={estilos.corpo}>
        {/* Atributos recebe a lista diretamente */}
        <Atributos atributos_lista={atributos} afinidade={ficha.afinidade}/>

        <div className={estilos['container-status-info-persona']}>
          <InfoPersona dados_persona={dadosPersona} />
          <ContainerValAtualMax ficha={ficha} />
          <ContainerDadosSoltos ficha={ficha} />
        </div>

        <ContainerPericias ficha={ficha} />
        <ContainerAtaquesItens ficha={ficha} />
      </main>
    </>
  );
}

export default Ficha;