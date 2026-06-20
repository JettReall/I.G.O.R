import { useState } from 'react';
import './Login.css';
import { BotaoLoginCadastro } from '../../componentes/botoes/Botoes';
import { InputLogin, ErroLogin } from './ComponentesMenores';
import { useNavigate } from 'react-router-dom';
import Modal from '../../componentes/Modal';
import axios from 'axios';

function ContainerLogo() {
  return (
    <div className="container-logo">
      <img src=".\src\assets\imagens\elementos\LogoOrdem.png" alt="Logo Ordem" className="logo-ordem" />
      <h3 className="nome-ordem">ORDO REALITAS</h3>
    </div>
  );
}

function ContainerDados() {
  const [form, setForm] = useState({
    email: "",
    nome_usuario: "",
    senha: "",
    senha_confirmar: "",
  });

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

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


    // Monta o objeto a ser enviado
    const envio = {
      nome: form.nome_usuario,
      email: form.email,
      senha: form.senha,
    };

    try {
      const response = await axios.post('api/usuarios', envio);

      // Se o cadastro for bem-sucedido (201 Created ou 200 OK)
      if (response.status === 201 || response.status === 200) {
          console.log(response.data);
          
        navigate('/login'); 
      } else {
        // Caso retorne outro status (não esperado)
        setErro("Erro inesperado ao cadastrar. Tente novamente.");
      }
    } catch (error) {
          if (error.response) {
          const status = error.response.status;
          if (status === 409) {
               setErro("Já existe um usuário com este email ou nome de usuário.");
          } else if (status === 400) {
               setErro("Dados inválidos. Verifique os campos.");
          } else {
               setErro(`Erro no servidor (${status}). Tente novamente mais tarde.`);
          }
          } else if (error.request) {
          // A requisição foi feita mas não houve resposta
          setErro("Servidor indisponível. Verifique sua conexão.");
          } else {
          // Algo aconteceu na configuração da requisição
          setErro("Erro ao enviar os dados. Tente novamente.");
          }
          console.error("Erro no cadastro:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container-dados">
      <form onSubmit={handleSubmit} id="form-cadastro">
        <InputLogin
          texto="Digite seu email"
          placeholder="Exemplo: ElizabethWebber@ordo.com"
          nome="email"
          tipo="email"
          valor={form.email}
          mudar={handleChange}
        />

        <InputLogin
          texto="Digite o Nome de usuário"
          nome="nome_usuario"
          tipo="text"
          valor={form.nome_usuario}
          placeholder="Insira um nome de usuário"
          mudar={handleChange}
        />

        <InputLogin
          texto="Digite sua senha"
          placeholder="Mínimo 6 caracteres"
          nome="senha"
          tipo="text" // alterado para password
          valor={form.senha}
          mudar={handleChange}
        />

        <InputLogin
          texto="Confirme sua senha"
          placeholder="Digite novamente"
          nome="senha_confirmar"
          tipo="text" // alterado para password
          valor={form.senha_confirmar}
          mudar={handleChange}
        />

        {/* Exibe mensagem de erro, se houver */}
        {erro && <ErroLogin texto={erro} />}

        <div className="container-botoes">
          <button
            className="botao-envio"
            type="submit"
            disabled={!cadastroValido || carregando}
          >
            {carregando ? "Criando" : "Criar"}
          </button>
          <BotaoLoginCadastro
            texto="Entrar em uma conta"
            aoClicar={() => navigate("/login")}
            corBotao="escuro"
          />
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

function Cadastro() {
  return <Container />;
}

export default Cadastro;