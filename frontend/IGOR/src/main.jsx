import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fontes.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './paginas/Login/Login'
import Homepage from './paginas/homepage/Homepage'

import Campanhas from './paginas/campanha/campanhas.jsx'
import TelaCampanhaAgente from './paginas/campanha/TelaCampanhaAgente'
import Cadastro from './paginas/Login/cadastro'
import Ficha from './paginas/ficha/ficha.jsx'

import CriadorFicha from './paginas/criador_ficha/CriadorFicha.jsx'

import Etapa1 from './paginas/criador_ficha/Etapa1-DadosIniciais.jsx'
import Etapa2 from './paginas/criador_ficha/Etapa2-ClasseTrilha.jsx'
import Etapa3 from './paginas/criador_ficha/Etapa3-Atributos.jsx'
import Etapa4 from './paginas/criador_ficha/Etapa4-Pericias.jsx'
import { Etapa5 } from './paginas/criador_ficha/Etapa5-NEX.jsx'


import {EscolherPoderClasse} from './paginas/criador_ficha/NEX/PoderClasse.jsx'
import EscolherAumentoAtributo from './paginas/criador_ficha/NEX/AumentoAtributo.jsx'
import Versatilidade from './paginas/criador_ficha/NEX/Versatilidade.jsx'
import { EscolherAfinidade } from './paginas/criador_ficha/Etapa5-NEX.jsx'
import EscolhidoOutroLado from './paginas/criador_ficha/NEX/EscolhidoOutroLado.jsx'


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
      <Route path='/campanhas/teste' element={<TelaCampanhaAgente />}/>
      <Route path='campanhas/ficha' element={<Ficha/>}/>
      <>
<Route path="/criar_ficha/:step" element={<CriadorFicha />} />
<Route path="/criar_ficha/:step/:nex?" element={<CriadorFicha />} />
      </>


      <>
      
      <Route path='/poder_classe' element={<EscolherPoderClasse/>}/>
      <Route path='/aumento_atributo' element={<EscolherAumentoAtributo/>}/>
      <Route path='versatilidade' element={<Versatilidade/>}/>
      <Route path='escolhido_outro_lado' element={<EscolhidoOutroLado />} />
      <Route path='etapa_5' element={ <Etapa5/>}/>
      </>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

/*
      <>
      <Route path='etapa_1' element={<Etapa1/>}/>
      <Route path='etapa_2' element={<Etapa2/>}/>
      <Route path='etapa_3' element={<Etapa3/>}/>
      <Route path='etapa_4' element={<Etapa4/>}/>
      </>

*/