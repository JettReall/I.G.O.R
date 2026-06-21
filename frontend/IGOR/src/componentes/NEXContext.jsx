import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NEXContext = createContext();

export function NEXProvider({ children, initialNEX = 5, onFinish }) {
  const [nexAtual, setNexAtual] = useState(initialNEX);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialNEX !== nexAtual) {
      setNexAtual(initialNEX);
    }
  }, [initialNEX]);

  const nexList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 99];

  const avancarNex = () => {
    const index = nexList.indexOf(nexAtual);
    if (index < nexList.length - 1) {
      const proximo = nexList[index + 1];
      setNexAtual(proximo);
 //     navigate(`/criar_ficha/etapa_5/NEX_${proximo}`);
    } else {
      if (onFinish) onFinish(); // finaliza fluxo NEX e vai para etapa 6
    }
  };

  const voltarNex = () => {
    const index = nexList.indexOf(nexAtual);
    if (index > 0) {
      const anterior = nexList[index - 1];
      setNexAtual(anterior);
   //   navigate(`/criar_ficha/etapa_5/NEX_${anterior}`);
    }
  };

  return (
    <NEXContext.Provider value={{ nexAtual, avancarNex, voltarNex }}>
      {children}
    </NEXContext.Provider>
  );
}

export function useNEX() {
  return useContext(NEXContext);
}