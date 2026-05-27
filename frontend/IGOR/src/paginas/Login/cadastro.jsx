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
  //Partes criadas para alteração 
  const [senha_confirmar, setSenhaConfirmar] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita recarregar a página
//Comando que pega os usuarios, em vez de postá-los
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

};
//Código de senha que ainda não produzi, mas é necessário
     const isSenhaIgual = () => {
          if (senha === senha_confirmar && senha !== null && senha_confirmar !== null ) {
               return true;
          } else return false;
     }


  return (
          <div className="container-dados">
               <form onSubmit={handleSubmit}>
               <div className="elemento-input">
                    <p>Digite o E-mail de vinculação</p>
                    <input
                    type="text"
                    name="text"
                    id="email"
                    placeholder="Digite seu email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setSenha(e.target.value)}
                    />
               </div>

               <div className="elemento-input">
                    <p>Confirme sua senha</p>
                    <input
                    type="text"
                    name="password"
                    id="senha"
                    placeholder="Digite sua senha"
                    required
                    onChange={(e) => setSenha(e.target.value)}
                    />
               </div>
               
               <p id="mensagens-erro"></p>

               <div className="container-botoes">
                    <button className="botao-envio" type="submit">
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