import { useEffect, useState } from 'react';
import './Login.css'
import { BotaoLoginCadastro } from '../../componentes/botoes/Botoes';
import {InputLogin, ErroLogin} from './input';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { usuario } from './Usuario';


function ContainerLogo() {
     return (
          <div className="container-logo">
               <img src=".\src\assets\imagens\elementos\LogoOrdem.png" alt="Logo Ordem" className="logo-ordem" />
               <h3 className="nome-ordem">ORDO REALITAS</h3>
          </div>
     )
}
function ContainerDados() {
     const [email, setEmail] = useState("");
     const [senha, setSenha] = useState("");
     const [erro, setErro] = useState(""); // Estado para exibir erros na tela
     const navigate = useNavigate(); //

     const handleSubmit = async (event) => {
          event.preventDefault();
          setErro(""); // Limpa erros anteriores

          try {
               // Envia um POST para o Spring Boot com os dados de login
               const response = await axios.post('api/usuarios/login', {
                    email: email,
                    senha: senha
               });
               console.log("Login efetuado com sucesso!", response.data);
               console.log(response.status, response);
               

               if (response.data === 'Senha Errada') {
                    setErro("Email ou senha incorretos");
               } else {
                    setErro(null);
                    
               }

               Object.assign(usuario, response.data); 

               navigate('/campanhas');
               console.log(usuario);
               

          } catch (error) {
               console.error("Erro no login", error);
               setErro("E-mail ou senha incorretos.");
          }
     };

     return (
          <div className="container-dados">
               <form onSubmit={handleSubmit}>
                    <div className="elemento-input">
                         <input 
                              type="email" 
                              id="email" 
                              placeholder='example@example.com' 
                              required 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                         />    
                    </div>

                    <div className="elemento-input">
                         <input 
                              type="password" 
                              id="senha" 
                              placeholder='Digite sua senha' 
                              required 
                              value={senha}
                              onChange={(e) => setSenha(e.target.value)} 
                         />
                         <a href="#esqueceu-senha">Esqueceu sua senha?</a>
                    </div>
                    
                    {/* Exibe mensagem de erro caso as credenciais sejam inválidas */}
                    {erro && <p style={{color: 'red', fontSize: '14px'}}>{erro}</p>}

                    <div className="container-botoes">
                         <button className='botao-envio' type='submit'>Entrar</button>
                    </div>
               </form>
          </div>
     );
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