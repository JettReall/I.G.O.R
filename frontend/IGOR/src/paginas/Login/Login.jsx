import { useEffect, useState } from 'react';
import './Login.css'
import axios from "axios"

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
const [usuarios, setUsuarios] = useState([]); // array vazio inicial

     useEffect(() => {
     fetch('/api/usuarios')
          .then(res => res.json())          // converte para objeto/array
          .then(data => {
               setUsuarios(data);              // data deve ser um array
          })
          .catch(err => console.error('Erro:', err));
     }, []);

//Parte que puxa do back, o mais próximo que cheguei
     const HandleSubmit = async (event) => {
          event.preventDefault();

          console.log(email,senha);
          useEffect();
 
     }

///Falta pouco, mas ainda nao resolvi

     return (
          <div className="container-dados">
               <form onSubmit={HandleSubmit}>
                    <div className="elemento-input">
                         <input type="text" name="text" id="email" placeholder='Digite seu email' required onChange={(e) => setEmail(e.target.value)}/>    
                    </div>

                    <div className="elemento-input">
                         <input type="password" name="password" id="senha" placeholder='Digite sua senha' required onChange={ (e) => setSenha(e.target.value)} />
                         <a href="">Esqueceu sua senha?</a>
                    </div>
                    <div className="container-botoes">
                         <button className='botao-envio' type='submit'>Entrar</button>
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