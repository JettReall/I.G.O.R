// EtapaContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EtapaContext = createContext();

export function EtapaProvider({ children }) {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const navigate = useNavigate();

  const updateEtapa = (novaEtapa) => {
    setEtapaAtual(novaEtapa);
    navigate(`/criar_ficha/etapa_${novaEtapa}`);
  };

  return (
    <EtapaContext.Provider value={{ etapaAtual, updateEtapa }}>
      {children}
    </EtapaContext.Provider>
  );
}

export function useEtapa() {
  return useContext(EtapaContext);
}