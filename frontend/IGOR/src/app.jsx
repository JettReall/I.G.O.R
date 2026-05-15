// App.jsx
import React, { useEffect, useState } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('');

  //Esse código retorna TODO o banco de dados em uma string
  useEffect(() => {
    // Crie um endpoint de teste simples no seu backend, como "/api/teste"
    fetch('/api/usuarios')
      .then(res => res.text())
      .then(data => setMensagem(data))
      .catch(err => console.error('Erro na conexão:', err));
  }, []);

  return (
    <div>
      <h1>Conexão com o Back-end</h1>
      <p>Mensagem do servidor: {mensagem || 'Carregando...'}</p>
    </div>
  );
}

export default App;