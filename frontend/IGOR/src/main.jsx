import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fontes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//import Homepage from './paginas/homepage/Homepage'
import Login from './paginas/Login/Login'
import Homepage from './paginas/homepage/Homepage'
import App from './app'
import TelaCampanhaAgente from './paginas/campanha/TelaCampanhaAgente'
import Cadastro from './paginas/Login/cadastro'


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
      <Route path="/" element={<Homepage/>}></Route>
      <Route path='campanhas' element={<TelaCampanhaAgente usuario={"MiloAntraz"}/>}/>
      <Route path= "/login" element={<Login/>} />
      <Route path='/cadastro' element={<Cadastro/>}></Route>
      <Route exact path= "/" element={<Private Item={Homepage} />} />
      <Route path='*' element={<Homepage/>}/>
      <Route path='/app' element={<App />}></Route>
      <Route path='/teste' element={<TelaCampanhaAgente />}> </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

/*


*/