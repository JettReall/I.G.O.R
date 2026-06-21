import { useState } from 'react';
import './Login.css';
import { BotaoLoginCadastro } from '../../componentes/botoes/Botoes';
import { InputLogin, ErroLogin } from "./ComponentesMenores";
import { useNavigate } from 'react-router-dom';
import Modal from '../../componentes/Modal';
import axios from 'axios';

function ContainerLogo() {
  return (
    <div className="container-logo">
      <img src="./src/assets/imagens/elementos/LogoOrdem.png" alt="Logo Ordem" className="logo-ordem" />
      <h3 className="nome-ordem">ORDO REALITAS</h3>
    </div>
  );
}

function ContainerDados() {
  const navigate = useNavigate(); // Instanciado aqui para poder usar no botão
  
  const [form, setForm] = useState({
    email: "",
    nome_usuario: "",
    senha: "",
    senha_confirmar: "",
  });

  // States movidos para o escopo correto do componente
  const [usuarios, setUsuarios] = useState([]);
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

    try {
      // Exemplo de envio real (insira sua rota do back-end aqui depois):
      // await axios.post('http://localhost:3000/usuarios', form);
      setCarregando(false);
    } catch (err) {
      setErro("Erro ao realizar o cadastro. Tente novamente.");
      setCarregando(false);
    }
  }; // Função fechada corretamente aqui

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
          texto={"Digite um UserName"}
          nome={"nome_usuario"}
          tipo={"text"}
          valor={form.nome_usuario}
          placeholder={"ex.: ElizabethWebber"}
          mudar={handleChange}
        />

        <InputLogin 
          texto={"Crie uma senha"}
          placeholder={""}
          nome={"senha"}
          tipo={"password"} // Alterado para password para ocultar os caracteres
          valor={form.senha}
          mudar={handleChange}
        />

        <InputLogin 
          texto={"Confirmar senha"}
          placeholder={""}
          nome={"senha_confirmar"}
          tipo={"password"} // Alterado para password
          valor={form.senha_confirmar}
          mudar={handleChange}
        />
               
        <ErroLogin texto={" "}/>

        {/* Exibe mensagem de erro, se houver */}
        {erro && <ErroLogin texto={erro} />}

        <div className="container-botoes">
          <button
            className="botao-envio"
            type="submit"
            disabled={!cadastroValido || carregando}
          >
            {carregando ? "Criando..." : "Criar"}
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

// Corrigido a estrutura da função e fechamento
function Cadastro() {
  return <Container />;
}

export default Cadastro;
