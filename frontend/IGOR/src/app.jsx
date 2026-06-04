// App.jsx
import React, { useEffect, useState } from 'react';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(false);


  async function GetUsuario() {
    try {
      const resp = await fetch('./api/usuarios/5')
      if (resp.status !== 200) {
        throw new Error("Não foi possivel dar fetch")
      }
      const objeto = await resp.json();
      //console.log(objeto);
     setUsuario(objeto);
    } catch (err) {
      console.error(err);
    }
  }

//Tudo aqui serve apenas como um teste

  return (
    <>

    <button onClick={GetUsuario}>Colete um usuário</button>
    <div>
      <p>{usuario?.nome}</p>
      </div>
    </>
  )
}

export default App;