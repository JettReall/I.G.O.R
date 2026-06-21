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

function ContainerDados({ abrirModal, carregando, email, setEmail, senha, setSenha, erro, handleSubmit }) {
  const navigate = useNavigate();

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
          <button type="button" className="link-esqueceu" onClick={abrirModal}>
            Esqueceu a senha?
          </button>
        </div>

        {erro && <p id="mensagens-erro">{erro}</p>}

        <div className="container-botoes">
          <BotaoLoginCadastro 
            texto="Criar conta" 
            corBotao="claro" 
            aoClicar={(e) => { e.preventDefault(); navigate('/cadastro'); }} 
          />

          <BotaoLoginCadastro 
            texto={carregando ? 'Logando...' : 'Entrar'} 
            corBotao="escuro"
            type="submit" 
            disabled={!(email && senha) || carregando}
          />
        </div>
      </form>
    </div>
  );
}

function Container() {
  const navigate = useNavigate();
  const { loginUser } = useUser();

  // Estados do Login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Estados para o Overlay do Esqueceu a Senha
  const [modalAberto, setModalAberto] = useState(false);
  const [etapaEsqueceu, setEtapaEsqueceu] = useState(1); // 1 = Email, 2 = Código + Nova Senha
  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  const [codigoVerificacao, setCodigoVerificacao] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [msgModal, setMsgModal] = useState({ tipo: '', texto: '' });

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
      setErro('E-mail ou senha incorretos.');
    } finally {
      setCarregando(false);
    }
  };

  // Funções do Modal de Recuperação
  const enviarEmailRecuperacao = async (e) => {
    e.preventDefault();
    setMsgModal({ tipo: '', texto: '' });
    try {
      await axios.post('api/usuarios/esqueceu-senha', { email: emailRecuperacao });
      setEtapaEsqueceu(2); 
    } catch (err) {
      setMsgModal({ tipo: 'erro', texto: 'E-mail não encontrado ou erro no servidor.' });
    }
  };

  const redefinirSenhaFinal = async (e) => {
    e.preventDefault();
    setMsgModal({ tipo: '', texto: '' });
    try {
      await axios.post('api/usuarios/redefinir-senha', {
        email: emailRecuperacao,
        token: codigoVerificacao,
        novaSenha: novaSenha
      });
      setMsgModal({ tipo: 'sucesso', texto: 'Senha alterada com sucesso! Pode fechar e logar.' });
      setTimeout(() => {
        setModalAberto(false);
        setEtapaEsqueceu(1);
        setMsgModal({ tipo: '', texto: '' });
      }, 3000);
    } catch (err) {
      setMsgModal({ tipo: 'erro', texto: 'Código inválido ou expirado (limite de 1h).' });
    }
  };

  return (
    <div className="tela-fundo-login">
      <div className="posicionar-botao-voltar">
        <BotaoRetorno texto="‹" />
      </div>
      
      <div className="container-grande">
        <ContainerLogo />
        <ContainerDados 
          abrirModal={() => setModalAberto(true)}
          carregando={carregando}
          email={email}
          setEmail={setEmail}
          senha={senha}
          setSenha={setSenha}
          erro={erro}
          handleSubmit={handleSubmit}
        />
      </div>

      {/* Janela Overlay (Modal) - Isolado na raiz da tela */}
      {modalAberto && (
        <div className="overlay-esqueceu">
          <div className="modal-esqueceu">
            <button className="botao-fechar-modal" onClick={() => { setModalAberto(false); setEtapaEsqueceu(1); }}>&times;</button>
            
            {etapaEsqueceu === 1 ? (
              <form onSubmit={enviarEmailRecuperacao}>
                <h3>Recuperar Senha</h3>
                <p>Insira seu e-mail cadastrado para receber o código de verificação.</p>
                <div className="elemento-input">
                  <input 
                    type="email" 
                    placeholder="Ex: elizabeth@ordo.com" 
                    required 
                    value={emailRecuperacao} 
                    onChange={(e) => setEmailRecuperacao(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: '15px' }}>
                  <BotaoLoginCadastro 
                    texto="Enviar Código" 
                    corBotao="escuro" 
                    type="submit" 
                    style={{ width: '100%' }}
                  />
                </div>
              </form>
            ) : (
              <form onSubmit={redefinirSenhaFinal}>
                <h3>Redefinir Senha</h3>
                <p>Enviamos um código para o seu e-mail. Ele irá expirar em 1 hora.</p>
                
                <div className="elemento-input" style={{ marginBottom: '10px' }}>
                  <label>Código de Verificação</label>
                  <input 
                    type="text" 
                    placeholder="Digite o código" 
                    required 
                    value={codigoVerificacao} 
                    onChange={(e) => setCodigoVerificacao(e.target.value)} 
                  />
                </div>

                <div className="elemento-input">
                  <label>Nova Senha</label>
                  <input 
                    type="password" 
                    placeholder="Digite a nova senha" 
                    required 
                    value={novaSenha} 
                    onChange={(e) => setNovaSenha(e.target.value)} 
                  />
                </div>

                <div style={{ marginTop: '15px' }}>
                  <BotaoLoginCadastro 
                    texto="Alterar Senha" 
                    corBotao="escuro" 
                    type="submit" 
                    style={{ width: '100%' }}
                  />
                </div>
              </form>
            )}

            {msgModal.texto && (
              <p style={{ color: msgModal.tipo === 'erro' ? '#dc2626' : '#16a34a', fontSize: '14px', marginTop: '10px', textAlign: 'center', fontFamily: 'Texto-Ordem' }}>
                {msgModal.texto}
              </p>
            )}
          </div>
        </div>
      )}
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