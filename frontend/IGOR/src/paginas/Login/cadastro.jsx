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

     const [form, setForm] = useState({
     email:  "",
     nome_usuario: "",
     senha: "",
     senha_confirmar: "",
 })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
   const todosPreenchidos = Object.values(form).every(
    (valor) => typeof valor === "string" && valor.trim() !== ""
  );




  //Partes criadas para alteração, temporárias e não 
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);



//Código de senha que ainda não produzi, mas é necessário


     let cadastro_valido = (
          todosPreenchidos && 
          form.senha !== "" &&
          form.senha_confirmar !== "" &&
          form.senha === form.senha_confirmar)

  return (
          <div className="container-dados">
               <form onSubmit="" id='form-cadastro'>
                    <InputLogin 
                         texto={"Digite seu email"}
                         placeholder={"Exemplo: ElizabethWebber@ordo.com"}
                         nome={"email"}
                         tipo={"text"}
                         valor={form.email}
                         mudar={handleChange}
                    />
               

                    <InputLogin 
                         texto={"Digite o Nome de usuário"}
                         nome={"nome_usuario"}
                         tipo={"text"}
                         valor={form.nome_usuario}
                         placeholder={"Insira um nome de usuário"}
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

                    <InputLogin 
                         texto={"Confirme sua senha"}
                         placeholder={""}
                         nome={"senha_confirmar"}
                         tipo={"text"}
                         valor={form.senha_confirmar}
                         mudar={handleChange}
                    />
               
                    <ErroLogin texto={" "}/>

               <div className="container-botoes">
                    <button className="botao-envio" type="submit" id='' disabled={!cadastro_valido}>Entrar</button>
                    <BotaoLoginCadastro texto={"Voltar para o Login"} linkBotao={"login"} corBotao={"escuro"}/>
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