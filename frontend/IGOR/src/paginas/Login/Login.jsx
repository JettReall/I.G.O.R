// Login.jsx – adaptado para usar UserContext
import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext'; // Ajuste o caminho conforme sua estrutura

function ContainerLogo() {
  return (
    <div className="container-logo">
      <img src=".\src\assets\imagens\elementos\LogoOrdem.png" alt="Logo Ordem" className="logo-ordem" />
      <h3 className="nome-ordem">ORDO REALITAS</h3>
    </div>
  );
}

function ContainerDados() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useUser(); // Obtém a função do contexto

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');

    try {
      // 1. Faz login para obter a resposta (espera-se que response.data contenha o id)
      const response = await axios.post('api/usuarios/login', {
        email,
        senha,
      });

      console.log('Login efetuado com sucesso!', response.data);
      console.log(response.status, response);

      // Se a resposta for 'Senha Errada', exibe erro e interrompe
      if (response.data === 'Senha Errada') {
        setErro('Email ou senha incorretos');
        return;
      }

      // 2. Busca os dados completos do usuário usando o id retornado
      const responseGet = await axios.get(`api/usuarios/${response.data.id}`);

      // 3. Salva os dados no contexto (que já persiste no localStorage)
      loginUser(responseGet.data);

      console.log('Usuário logado:', responseGet.data);

      // 4. Redireciona para a página de campanhas
      navigate('/campanhas');
    } catch (error) {
      console.error('Erro no login', error);
      setErro('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="container-dados">
      <form onSubmit={handleSubmit}>
        <div className="elemento-input">
          <input
            type="email"
            id="email"
            placeholder="example@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="elemento-input">
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <a href="#esqueceu-senha">Esqueceu sua senha?</a>
        </div>

        {erro && <p style={{ color: 'red', fontSize: '14px' }}>{erro}</p>}

        <div className="container-botoes">
          <button className="botao-envio" type="submit">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

function Container() {
  return (
    <div className="container-grande">
      <ContainerLogo />
      <ContainerDados />
    </div>
  );
}

function Login() {
  return <Container />;
}

export default Login;