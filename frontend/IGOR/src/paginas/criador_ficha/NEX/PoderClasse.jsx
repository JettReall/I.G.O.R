import { BotaoAvancarNEX, CaixaTexto } from '../../../componentes/criador-ficha/componentes';
import { HeaderBase } from '../../../componentes/header/headers';
import { useState } from 'react';
import estilosNEX from './nex.module.css'
import clsx from 'clsx';

// Lista de poderes de exemplo (simulando dados que viriam de API ou prop)
const listaPoderesExemplo = [
  { id: 1, nome: "Golpe Pesado", isAtivo: true },
  { id: 2, nome: "Esquiva Ágil", isAtivo: false },
  { id: 3, nome: "Foco Total", isAtivo: true },
  { id: 4, nome: "Vontade de Ferro", isAtivo: false },
];

const poderes_elegiveis = 1; // Número de poderes que podem ser escolhidos (fixo para teste)

function PoderClasse({ poder, isSelected, onSelect }) {
  const handleClick = () => {
    if (isSelected) {
      // Desmarcar o poder atualmente selecionado
      onSelect(null);
    } else {
      // Tentar marcar um novo poder
      onSelect(poder.id);
    }
  };

  return (
    <div className={clsx(estilosNEX['poder-classe'])}>
     <div className={estilosNEX['coluna'],estilosNEX['dados-poder-classe']}>
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
  // Estado: ID do poder selecionado (null = nenhum)
  const [selectedId, setSelectedId] = useState(null);

  // O poder escolhido completo (calculado a partir do ID)
  const poderEscolhido = listaPoderesExemplo.find(p => p.id === selectedId) || null;

  // Variável que salva o poder escolhido (exemplo com ID)
  // Você pode usar selectedId ou poderEscolhido conforme necessidade.
  // Caso queira salvar o objeto completo, basta usar poderEscolhido.
  // Exemplo: const poderSelecionadoObj = poderEscolhido;

  const handleSelect = (id) => {
    if (id !== null && selectedId !== null) {
      // Já existe um poder selecionado e o usuário tentou escolher outro
      alert("Você não pode escolher mais poderes de classe.");
      return;
    }
    setSelectedId(id);
  };

  // Botão Avançar só fica habilitado se houver um poder selecionado
  const desabilitar = selectedId === null;

  // O NEX pode ser recebido via props futuramente. Por enquanto, usamos valor fixo.
  const nex = 20; // Exemplo: substituir por props.nex quando disponível


     let texto = "";
     if (poderes_elegiveis !== 0) {
          texto = `Escolha um poder de classe`;
     } else {
          texto = "Poder escolhido. Clique em avançar para confirmar";
     }

  return (
     <>
      <HeaderBase
        pagina_atual={'claro'}
        titulo={`NEX ${nex}: Escolha um poder de classe`}
     //    isFixo={true}
        />
    <div className={clsx(estilosNEX['container-principal-nex'],estilosNEX['container-tela-poderes'])}>
          <CaixaTexto texto={texto} tela={'caixa-etapa5'}/>
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

export default EscolherPoderClasse;