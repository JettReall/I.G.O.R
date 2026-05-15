import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fontes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//import Homepage from './paginas/homepage/Homepage'
import Login from './paginas/Login/Login'
import Homepage from './paginas/homepage/Homepage'
import App from './app'
import LoginTeste from './paginas/Login/LoginTeste'

const Private = ({Item})  => {
  const signed = true;
  if (signed > 0) {
    return <Item/>
  } else {
    return <Login/>
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<LoginTeste/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

/*
        <Route path= "/login" element={<Login/>} />
        <Route exact path= "/" element={<Private Item={Homepage} />} />
        <Route path='*' element={<Homepage/>}/>
        <Route path='/app' element={<App/>}></Route>


*/