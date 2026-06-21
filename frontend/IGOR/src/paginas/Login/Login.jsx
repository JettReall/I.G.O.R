// Login.jsx – adaptado para usar UserContext e layout corrigido
import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext'; 
import Modal from '../../componentes/Modal';
import { BotaoRetorno, BotaoLoginCadastro } from '../../componentes/botoes/Botoes';

function ContainerLogo() {
  return (
    <div className="container-logo">
      <img src="./src/assets/imagens/elementos/LogoOrdem.png" alt="Logo Ordem" className="logo-ordem" />
      <h3 className="nome-ordem">ORDO REALITAS</h3>
      <span className="subtitulo-logo">acessar conta</span>
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
    event.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const response = await axios.post('api/usuarios/login', { email, senha });

      if (response.data === 'Senha Errada') {
        setErro('Email ou senha incorretos');
        return;
      }

      const responseGet = await axios.get(`api/usuarios/${response.data.id}`);
      loginUser(responseGet.data);
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
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="elemento-input">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <a href="#esqueceu-senha" className="link-esqueceu">Esqueceu a senha?</a>
        </div>

        {erro && <p id="mensagens-erro">{erro}</p>}

        <div className="container-botoes">
          {/* Alinhado com o padrão global do Figma: Criar conta na esquerda, Entrar na direita */}
          <BotaoLoginCadastro 
            texto="Criar conta" 
            corBotao="claro" 
            aoClicar={(e) => { e.preventDefault(); navigate('/cadastro'); }} 
          />
          
          <button 
            className="botao-envio-login" 
            type="submit"
            disabled={!(email && senha) || carregando}
          >
            {carregando ? 'Logando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Container() {
  return (
    <div className="tela-fundo-login">
      {/* Botão de retorno fixado no canto superior esquerdo da tela */}
      <div className="posicionar-botao-voltar">
        <BotaoRetorno texto="‹" />
      </div>
      <div className="container-grande">
        <ContainerLogo />
        <ContainerDados />
      </div>
    </div>
  );
}

function Login() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const isLoggedIn = user && user.id;

  if (isLoggedIn) {
    return (
      <Modal open={true}>
        <h3>Já há um usuário logado.</h3>
        <div>
          <button onClick={() => navigate(-1)}>Voltar</button>
          <button
            onClick={() => {
              logoutUser();
              navigate('/');
            }}
          >
            Fazer Logout
          </button>
        </div>
      </Modal>
    );
  }

  return <Container />;
}

export default Login;