import { useState } from 'react';
import './login.css'

function LoginTeste() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro no login');
      }

      // Supondo que o backend retorne { token: '...', usuario: { id, nome } }
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      // Redirecionar para página principal
      window.location.href = '/dashboard';
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuário:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" disabled={carregando}>
        {carregando ? 'Entrando...' : 'Entrar'}
      </button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
  );
}

export default LoginTeste;

//arq gerado por IA, pedi pra ela fazer e retornou isso aí