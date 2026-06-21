// src/contextos/UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao montar, recupera do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error('Erro ao parsear usuário do localStorage', e);
        localStorage.removeItem('usuario');
      }
    }
    setLoading(false);
  }, []);

  // Função de login – salva no estado e no localStorage
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('usuario', JSON.stringify(userData));
  };

  // Função de logout – limpa estado e localStorage
  const logoutUser = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}