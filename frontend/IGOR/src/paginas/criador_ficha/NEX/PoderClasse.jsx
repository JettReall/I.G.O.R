import { BotaoAvancarNEX, CaixaTexto } from '../../../componentes/criador-ficha/componentes';
import { HeaderBase } from '../../../componentes/header/headers';
import { useState } from 'react';
import estilosNEX from './nex.module.css'
import clsx from 'clsx';
import { handleSelectUnico } from '../../../assets/utils/SelecaoUnica'; // Ajuste o path conforme necessário

// Lista de poderes de exemplo (simulando dados que viriam de API ou prop)
const listaPoderesExemplo = [
  { id: 1, nome: "Golpe Pesado", isAtivo: true },
  { id: 2, nome: "Esquiva Ágil", isAtivo: false },
  { id: 3, nome: "Foco Total", isAtivo: true },
  { id: 4, nome: "Vontade de Ferro", isAtivo: false },
];

 // Número de poderes que podem ser escolhidos (fixo para teste)

function PoderClasse({ poder, isSelected, onSelect }) {
  const handleClick = () => {
    if (isSelected) {
      onSelect(null);
    } else {
      onSelect(poder.id);
    }
  };

  return (
    <div className={clsx(estilosNEX['poder-classe'])}>
      <div className={estilosNEX['coluna'], estilosNEX['dados-poder-classe']}>
        <strong>{poder.nome}</strong>
        <p>{poder.isAtivo ? "Ativo" : "Passivo"}</p>
      </div>
      <input type="checkbox" checked={isSelected} onChange={handleClick} />
    </div>
  );
}

function ContainerPoderClasse({ poderes, selectedId, onSelect }) {
  return (
    <div className={estilosNEX['container-poderes']}>
      {poderes.map((poder) => (
        <PoderClasse
          key={poder.id}
          poder={poder}
          isSelected={selectedId === poder.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function EscolherPoderClasse() {
  const [selectedId, setSelectedId] = useState(null);
  const poderEscolhido = listaPoderesExemplo.find(p => p.id === selectedId) || null;

  // Lógica adaptada para usar handleSelectUnico
  const handleSelect = (id) => {
    const novoId = handleSelectUnico(selectedId, id);
    setSelectedId(novoId);
  };

  const desabilitar = selectedId === null;
  const nex = 20;

  let texto = "";
  if (selectedId === null) {
    texto = `Escolha um poder de classe`;
  } else {
    texto = `Poder escolhido. Clique em avançar para confirmar`;
  }

  return (
    <>
      <HeaderBase
        pagina_atual={'claro'}
        titulo={`NEX ${nex}: Escolha um poder de classe`}
      />
      <div className={clsx(estilosNEX['container-principal-nex'], estilosNEX['container-tela-poderes'])}>
        <CaixaTexto texto={texto} tela={'caixa-etapa5'} />
        <div>
          <ContainerPoderClasse
            poderes={listaPoderesExemplo}
            selectedId={selectedId}
            onSelect={handleSelect}
          />

        </div>
        <BotaoAvancarNEX isDisabled={desabilitar} />
      </div>
    </>
  );
}

export {
  EscolherPoderClasse,
  PoderClasse,
  listaPoderesExemplo
};