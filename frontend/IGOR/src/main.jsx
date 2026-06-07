import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fontes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './paginas/Login/Login'
import Homepage from './paginas/homepage/Homepage'
import App from './app'
import Campanhas from './paginas/campanha/campanhas.jsx'
import TelaCampanhaAgente from './paginas/campanha/TelaCampanhaAgente'
import Cadastro from './paginas/Login/cadastro'
import Ficha from './paginas/ficha/ficha.jsx'


const Private = ({Item})  => {
  const signed = false;
  if (signed === true) {
    return <Item/>
  } else {
    return <Login/>
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path='/campanhas' element={<Campanhas usuario={"MiloAntraz"}/>}/>
      <Route path= "/login" element={<Login/>} />
      <Route path='/cadastro' element={<Cadastro/>}/>
      <Route exact path= "/" element={<Private Item={Homepage} />} />
      <Route path='*' element={<Homepage/>}/>
      <Route path='/app' element={<App />}/>
      <Route path='/teste' element={<TelaCampanhaAgente />}/>
      <Route path='/ficha' element={<Ficha/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

/*


*/