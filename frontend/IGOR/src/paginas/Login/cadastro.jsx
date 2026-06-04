import { useEffect, useState } from 'react';
import './Login.css'



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
  const [nome, setNome] = useState("");
  
  //variáveis para funcionamento do form
const [senha_confirmar, setSenhaConfirmar] = useState("");
 const [isDisabled, setIsDisabled] = useState(true);
  //Partes criadas para alteração, temporárias e não 
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);



//Código de senha que ainda não produzi, mas é necessário
     useEffect(() => {
     const senhasIguais = senha !== "" && senha_confirmar !== "" && senha === senha_confirmar;
     setIsDisabled(!senhasIguais);
     }, [senha, senha_confirmar]);


  return (
          <div className="container-dados">
               <form onSubmit="" id='form-cadastro'>
               <div className="elemento-input">
                    <p>Digite o E-mail de vinculação</p>
                    <input
                    type="text"
                    name="text"
                    id="email"
                    placeholder="Digite seu email"
                    required
                    /*onChange={(e) => setEmail(e.target.value)}*/
                    />
               </div>

               <div className="elemento-input">
                    <p>Digite o Nome de usuário</p>
                    <input
                    type="text"
                    name="text"
                    id="email"
                    placeholder="Nome de usuário"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    />
               </div>

               <div className="elemento-input">
                    <p>Digite sua senha</p>
                    <input
                    type="text"
                    name="password"
                    id="senha"
                    placeholder="Digite sua senha"
                    required
                    onChange={(e) => {setSenha(e.target.value)}}
                    />
               </div>

               <div className="elemento-input">
                    <p>Confirme sua senha</p>
                    <input
                    type="text"
                    name="password"
                    id="senha"
                    placeholder="Digite sua senha"
                     onChange={(e) => {setSenhaConfirmar(e.target.value)}}
                    required
                    />
               </div>
               
               <p id="mensagens-erro"></p>

               <div className="container-botoes">
                    <button className="botao-envio" type="submit" id='' disabled={isDisabled}>
                    Entrar
                    </button>
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



function Cadastro() {
     return (
          <Container/>
     )
}


export default Cadastro