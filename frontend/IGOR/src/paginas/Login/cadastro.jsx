import { useState } from 'react';
import './Login.css'; // Compartilha a mesma folha de estilos padronizada
import { BotaoRetorno, BotaoLoginCadastro } from '../../componentes/botoes/Botoes';
import { InputLogin, ErroLogin } from "./ComponentesMenores";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContainerLogo() {
  return (
    <div className="container-logo">
      <img src="./src/assets/imagens/elementos/LogoOrdem.png" alt="Logo Ordem" className="logo-ordem" />
      <h3 className="nome-ordem">ORDO REALITAS</h3>
      <span className="subtitulo-logo">criar conta</span>
    </div>
  );
}

function ContainerDados() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: "",
    nome_usuario: "",
    senha: "",
    senha_confirmar: "",
  });

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const todosPreenchidos = Object.values(form).every(
    (valor) => typeof valor === "string" && valor.trim() !== ""
  );

  const cadastroValido = todosPreenchidos && form.senha === form.senha_confirmar;

 const handleSubmit = async (event) => {
  event.preventDefault();
  setErro("");
  setCarregando(true);
  
  console.log("Tentando enviar o formulário...", form);

  try {
    
    await axios.post('api/usuarios', {
      email: form.email,
      nome_usuario: form.nome_usuario,
      senha: form.senha
    });
    
    alert("Usuário criado com sucesso!");
    navigate("/login"); // Se der certo, ele vai para o login aqui
  } catch (err) {
    // ESSA LINHA É CRUCIAL: Abre o objeto de erro para ver o que o Spring Boot respondeu!
    console.error("Erro retornado pela API:", err.response ? err.response.data : err.message);
    
    if (err.response && err.response.data) {
      setErro(typeof err.response.data === 'string' ? err.response.data : "Erro nos dados enviados.");
    } else {
      setErro("Não foi possível conectar ao servidor.");
    }
  } finally {
    setCarregando(false);
  }
};

  return (
    <div className="container-dados">
      <form onSubmit={handleSubmit} id="form-cadastro">
        <InputLogin
          texto="Digite seu e-mail"
          placeholder="Exemplo: ElizabethWebber@ordo.com"
          name="email"
          tipo="email"
          valor={form.email}
          mudar={handleChange}
        />

        <InputLogin 
          texto="Digite um UserName"
          placeholder="ex.: ElizabethWebber"
          name="nome_usuario"
          tipo="text"
          valor={form.nome_usuario}
          mudar={handleChange}
        />

        <InputLogin 
          texto="Crie uma senha"
          placeholder=""
          name="senha"
          tipo="password"
          valor={form.senha}
          mudar={handleChange}
        />

        <InputLogin 
          texto="Confirmar senha"
          placeholder=""
          name="senha_confirmar"
          tipo="password"
          valor={form.senha_confirmar}
          mudar={handleChange}
        />

        {erro && <ErroLogin texto={erro} />}

        <div className="container-botoes">
          {/* Botão Secundário na Esquerda */}
          <BotaoLoginCadastro
            texto="Entrar em uma conta"
            aoClicar={(e) => { e.preventDefault(); navigate("/login"); }}
            corBotao="claro"
          />

          {/* Botão Principal na Direita */}
          <BotaoLoginCadastro
            texto={carregando ? "Criando..." : "Criar"}
            corBotao="escuro"
            type="submit"
            /*disabled={!cadastroValido || carregando}*/
          />
        </div>
      </form>
    </div>
  );
}

function Container() {
  return (
    <div className="tela-fundo-login">
      {/* Botão de retorno fixado no canto superior esquerdo */}
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

function Cadastro() {
  return <Container />;
}

export default Cadastro;