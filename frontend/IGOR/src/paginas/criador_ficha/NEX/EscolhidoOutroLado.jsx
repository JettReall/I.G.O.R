import { BotaoAvancarNEX, CaixaTexto } from "../../../componentes/criador-ficha/componentes";
import { useState } from "react";
import estilosNEX from './nex.module.css';
import Modal from "../../../componentes/Modal";

// Lista de rituais de exemplo (baseada no molde)
const listaRituaisExemplo = [
  { id: 1, nome: "Cicatrizes Místicas", circulo: 1, elemento: "Sangue" },
  { id: 2, nome: "Sussurros Insanos", circulo: 2, elemento: "Morte" },
  { id: 3, nome: "Campo Eletromagnético", circulo: 2, elemento: "Energia" },
  { id: 4, nome: "Pele de Pedra", circulo: 1, elemento: "Conhecimento" },
  { id: 5, nome: "Teletransporte", circulo: 3, elemento: "Energia" },
  { id: 6, nome: "Controle Mental", circulo: 2, elemento: "Sangue" },
  { id: 7, nome: "Lâmina Espectral", circulo: 2, elemento: "Morte" },
];

function Ritual({ ritual, isSelected, onToggle }) {
  const handleClick = () => {
    onToggle(ritual.id);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: isSelected ? "2px solid green" : "1px solid gray",
        cursor: "pointer",
        padding: "8px",
        margin: "4px",
        borderRadius: "4px",
      }}
    >
      <strong>{ritual.nome}</strong>
      <p>{ritual.circulo}° Círculo</p>
      <p>Elemento: {ritual.elemento}</p>
    </div>
  );
}

function ContainerRituais({ rituais, selecionados, onToggle }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {rituais.map((ritual) => (
        <Ritual
          key={ritual.id}
          ritual={ritual}
          isSelected={selecionados.includes(ritual.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

function EscolhidoOutroLado({ rituaisElegiveis = 3 }) {
  const [selecionados, setSelecionados] = useState([]);
  const [restantes, setRestantes] = useState(rituaisElegiveis);

  const handleToggle = (id) => {
    const isSelecionado = selecionados.includes(id);
    if (!isSelecionado) {
      if (restantes === 0) {
        alert(`Você só pode escolher ${rituaisElegiveis} rituais.`);
        return;
      }
      setSelecionados([...selecionados, id]);
      setRestantes(restantes - 1);
    } else {
      setSelecionados(selecionados.filter((item) => item !== id));
      setRestantes(restantes + 1);
    }
  };

  const isBotaoDesabilitado = restantes !== 0;

  return (
     <Modal open={true}>
          <div className={estilosNEX['container-escolhido-outrolado']}>
               <CaixaTexto texto={`Escolha ${rituaisElegiveis} rituais dentre estes.`} />
               <ContainerRituais
               rituais={listaRituaisExemplo}
               selecionados={selecionados}
               onToggle={handleToggle}
               />
               <BotaoAvancarNEX isDisabled={isBotaoDesabilitado} onClick={console.log(selecionados)}/>
          </div>
     </Modal>
  );
}

export default EscolhidoOutroLado;