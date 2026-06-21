function InputLogin({ texto, nome, name, tipo, valor, placeholder, mudar }) {
     return (
          <div className="elemento-input">
               <strong>{texto}</strong>
               <input
                    name={name || nome}
                    type={tipo}
                    placeholder={placeholder}
                    value={valor}
                    required
                    onChange={mudar}
               />
          </div>
     );
}

const ErroLogin = ({ texto }) => {
     return (
          <p className="erro-login-cadastro">
               {texto}
          </p>
     );
};

export { InputLogin, ErroLogin };