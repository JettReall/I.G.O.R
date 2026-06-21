import { createContext, useContext, useState } from 'react';

const EtapaContext = createContext();

export function EtapaProvider({ children }) {
  const [etapaAtual, setEtapaAtual] = useState(1);

  // Apenas atualiza o estado, não navega
  const setEtapa = (novaEtapa) => {
    setEtapaAtual(novaEtapa);
  };

  return (
    <EtapaContext.Provider value={{ etapaAtual, setEtapa }}>
      {children}
    </EtapaContext.Provider>
  );
}

export function useEtapa() {
  return useContext(EtapaContext);
}