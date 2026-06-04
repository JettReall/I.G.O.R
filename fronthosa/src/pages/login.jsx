import { useState } from 'react';
import axios from 'axios';
import './Login.css';


function ContainerLogo() {
     return (
          <div className="container-logo">
               <h3 className="nome-ordem">ORDO REALITAS</h3>
          </div>
     );
}

function ContainerDados() {
     const [email, setEmail] = useState("");
     const [senha, setSenha] = useState("");
     const [erro, setErro] = useState(""); // Estado para exibir erros na tela

     const handleSubmit = async (event) => {
          event.preventDefault();
          setErro(""); // Limpa erros anteriores

          try {
               // Envia um POST para o Spring Boot com os dados de login
               const response = await axios.post('http://localhost:8080/usuarios/login', {
                    email: email,
                    senha: senha
               });
               console.log("Login efetuado com sucesso!", response.data);

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
               <ContainerLogo />
               <ContainerDados />
          </div>
     );
}

export default function Login() {
     return <Container />;
}