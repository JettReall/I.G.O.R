import { useEffect, useState } from 'react';
import './Login.css'
import { BotaoLoginCadastro } from '../../componentes/botoes/Botoes';
import {InputLogin, ErroLogin} from './input';


function ContainerLogo() {
     return (
          <div className="container-logo">
               <img src=".\src\assets\imagens\elementos\LogoOrdem.png" alt="Logo Ordem" className="logo-ordem" />
               <h3 className="nome-ordem">ORDO REALITAS</h3>
          </div>
     )
}
function ContainerDados() {


     const HandleSubmit = () => {
          event.preventDefault()
          console.log("enviado");
          
     }


 const [form, setForm] = useState({
     email:  "",
     senha: "",
 })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
   const todosPreenchidos = Object.values(form).every(
    (valor) => typeof valor === "string" && valor.trim() !== ""
  );

  return (
          <div className="container-dados">
               <form onSubmit={HandleSubmit}>
                    <InputLogin 
                         texto={"Digite seu email"}
                         placeholder={"Exemplo: ElizabethWebber@ordo.com"}
                         nome={"email"}
                         tipo={"text"}
                         valor={form.email}
                         mudar={handleChange}
                    />
               
               <InputLogin 
                    texto={"Digite sua senha"}
                    placeholder={""}
                    nome={"senha"}
                    tipo={"text"}
                    valor={form.senha}
                    mudar={handleChange}
               />


               <div className="container-botoes">
                    <button className="botao-envio" type="submit" disabled={!todosPreenchidos}>Entrar</button>
                    <BotaoLoginCadastro linkBotao={"cadastro"} texto={"Criar conta"} corBotao={"escuro"}></BotaoLoginCadastro>
                    <a href="">Esqueceu sua senha?</a>
               </div>
               </form>
               </div>
     )
}


function Container() {
     return (
          <div className="container-grande">
            
               <ContainerLogo/>
               <ContainerDados></ContainerDados>
          </div>
          
     )
}



function Login() {
     return (
          <Container/>
     )
}


export default Login

/*

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita recarregar a página
     //Criado totalmente com IA esse HandleSubmit
    setCarregando(true);
    setErro(null);
    console.log("🔄 Carregando... (fetch iniciado)");

    try {
      const response = await fetch("api/usuarios");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("✅ Dados recebidos:", data);
      setUsuarios(data);

    } catch (err) {
      setErro(err.message);
      console.error("❌ Erro no fetch:", err.message);
    } finally {
      setCarregando(false);
      console.log("🏁 Carregamento concluído");
    }

    LoginAuth(usuarios,email,senha);
};
*/