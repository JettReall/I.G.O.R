// Login.jsx – adaptado para usar UserContext
import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext'; // Ajuste o caminho conforme sua estrutura
import Modal from '../../componentes/Modal';
import { BotaoRetorno } from '../../componentes/botoes/Botoes';

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
  const { loginUser } = useUser();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (event) => {
    setCarregando(true);
    event.preventDefault();
    setErro('');

    try {
      const response = await axios.post('api/usuarios/login', {
        email,
        senha,
      });

      console.log('Login efetuado com sucesso!', response.data);
      console.log(response.status, response);

      if (response.data === 'Senha Errada') {
        setErro('Email ou senha incorretos');
        return;
      }

      const responseGet = await axios.get(`api/usuarios/${response.data.id}`);

      loginUser(responseGet.data);
      console.log('Usuário logado:', responseGet.data);

      navigate('/campanhas');
    } catch (error) {
      console.error('Erro no login', error);
      setErro('E-mail ou senha incorretos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container-dados">
      <form onSubmit={handleSubmit} id='form-login'>
        <div className="elemento-input">
          <strong>Digite seu Email</strong>
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
          <strong>Digite sua senha</strong>
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
          <button 
          className="botao-envio" 
          type="submit"
          disabled={!(email && senha) || carregando}
          >
            {carregando ? 'Logando' : 'Entrar' }
          </button>
          <button className="botao-envio" id='cadastro' onClick={() => {navigate('/cadastro')}}>Criar Conta</button>
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
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  // Verifica se há um usuário logado (com id)
  const isLoggedIn = user && user.id;

  if (isLoggedIn) {
    // Exibe o modal informando que já há um usuário logado
    return (
      <Modal open={true}>
        <h3>Já há um usuário logado.</h3>
        <div>
          <button onClick={() => navigate(-1)}>Voltar</button>
          <button
            onClick={() => {
              logoutUser(); // Limpa contexto e localStorage
              navigate('/'); // Redireciona para a homepage
            }}
          >
            Fazer Logout
          </button>
        </div>
      </Modal>
    );
  }

  // Se não houver usuário, renderiza a tela de login normal
  return <Container />;
}

export default Login;