import { useState } from "react";
import clsx from "clsx";


import { HeaderBase } from "../../componentes/header/headers"
import { BotaoRetorno } from "../../componentes/botoes/Botoes"
import { Atributos } from "../../componentes/ficha/componentes";
import estilos from './ficha.module.css'


//className={estilos['corpo']}

function Ficha() {
     return (
          <>
          <header>
               <HeaderBase titulo={"Ficha"} botao_L={<BotaoRetorno/>} pagina_atual={"ficha"}/>
          </header>
          <main className={estilos.corpo}>
               <Atributos/>
          </main>
     
          </>
     )
}

export default Ficha