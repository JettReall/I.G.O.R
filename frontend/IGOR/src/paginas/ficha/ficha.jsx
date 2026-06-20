import { useState } from "react";
import clsx from "clsx";

import { HeaderBase } from "../../componentes/header/headers"
import { BotaoRetorno } from "../../componentes/botoes/Botoes"
import { StatusContainer, Atributos, Pericia, AtaqueRitual, Item, InfoPersona, BotaoAumentarNex } from "../../componentes/ficha/componentes";
import estilos from './ficha.module.css'
import Delete from '../../assets/imagens/icones/lixo.png'
import AddIcone from '../../assets/imagens/icones/add.png'

function ContainerPericias() {
     const periciaExemplo = {
          nome: "Prestidigitação",
          atributo: "FOR",
          treino: 5,
          bonus: 2,
          extra: 0,
          total: 4   
     };

     const periciaExemplo2 = {
          nome: "Nome",
          atributo: "Atributo",
          treino: "Treino",
          bonus: "Bônus",
          extra: "Extra",
          total: "Total"  
     };

     return (
          <div className={estilos['container-pericias']}>
               <Pericia dados={periciaExemplo2} isHeader={true}></Pericia>
               <Pericia dados={periciaExemplo}></Pericia>
               <Pericia dados={periciaExemplo}></Pericia>
          </div>
     )
}

function ContainerAtaques() {
     const HeaderAtaque = {
          nome: "Nome",
          categoria: "Atributo Base",
          tipo: "Tipo de Ataque",
     }

     return (
          <div className={estilos['container-ataque-ritual']}>  
               <AtaqueRitual dados_ataque_ritual={HeaderAtaque} isHeader={true}/>
          </div>
     )
}

function ContainerRituais() {
     const HeaderRitual = {
          nome: "Ritual",
          categoria: "Círculo",
          tipo: "Elemento",
     }

     return (
          <div className={estilos['container-ataque-ritual']}>
               <AtaqueRitual dados_ataque_ritual={HeaderRitual} isHeader={true}/>
          </div>
     )
}

function ContainerItems() {
     const HeaderItem = {
          nome: "Nome",
          categoria: "Cat.",
          quantia: "Qtd",
          carga: "Carga unit.",
          total: "Carga total"
     }

     const ExItem = {
          nome: "Adaga",
          categoria: 1,
          quantia: 2,
          carga: 1,
          total: 2
     }

     return (
          <div className={estilos['container-itens']}>
               <Item dados_item={HeaderItem} isHeader={true} imagem={AddIcone}/>
               <Item dados_item={ExItem} imagem={Delete} />
               <Item dados_item={ExItem} imagem={Delete} />
          </div>
     )
}

function ContainerAtaqueRitual() {
     const [isRitual, setIsRitual] = useState(true);   
     const [abaRitual, setAbaRitual] = useState(true);
     const [abaAtaque, setAbaAtaque] = useState(false);

     const TrocaTela = () => {
          setIsRitual(!isRitual);    
          setAbaRitual(!abaRitual);
          setAbaAtaque(!abaAtaque);
     }

     const BotoesAtaqueRitual = () => {
          return (
               <div className={estilos['container-botao-atk-ritual']}>
                    <button className={estilos['botao-ataque-ritual']} disabled={abaRitual} onClick={TrocaTela}>Rituais</button>
                    <button className={estilos['botao-ataque-ritual']} disabled={abaAtaque} onClick={TrocaTela}>Ataques</button>
               </div>
          )
     }

     const estiloCaixa = { 'gap': '0' }

     return (
          <div style={estiloCaixa}>
               <BotoesAtaqueRitual/>
               {isRitual ? <ContainerRituais /> : <ContainerAtaques/>}
          </div>
     )
}

function ContainerAtaquesItens() {
     return (
          <div className={estilos['container-ataques-itens']}>
               <ContainerAtaqueRitual/>
               <strong className={estilos['titulo-inventario']}>Inventário</strong>
               <ContainerItems></ContainerItems>
          </div>
     )
}

function ElementoValAtualMax({ nome, valores }) {
     // 🌟 Corrigido Heurística #4: Nomenclatura 100% em português e padronizada
     const nomenclatura = {
          nome_topo: `${nome} Atual`,
          nome_baixo: `${nome} Máximo`,
     }

     return (
          <StatusContainer nome_up={nomenclatura.nome_topo} nome_down={nomenclatura.nome_baixo} valor_up={valores.atual} valor_down={valores.maximo}/>
     )
}

function ContainerValAtualMax() {
     const status_valores = {
          atual: 0,
          maximo: 0,
          
     }

     return (
          <div className={estilos['container-triplo-status']}>
               <ElementoValAtualMax nome={"PV"} valores={status_valores} />
               <ElementoValAtualMax nome={"PE"} valores={status_valores} />
               <ElementoValAtualMax nome={"SAN"} valores={status_valores} />
          </div>
     )
}

function ContainerDadosSoltos({ dados }) {
     return (
          <div className={estilos['container-triplo-status']}>
               <StatusContainer nome_up={"NEX"} valor_up={dados.nex} nome_down={"Defesa"} valor_down={dados.defesa} />        
               <StatusContainer nome_up={"Deslocamento"} valor_up={dados.deslocamento} nome_down={"Carga Máxima"} valor_down={dados.carga}/>
               <StatusContainer nome_up={"PE / Rodada"} valor_up={dados.pe_rodada} nome_down={"Afinidade"} valor_down={dados.afinidade || "Nenhuma"} />        
          </div>          
     )
}

function BotoesFicha() {
     return (
          <div className={estilos['botoes-header-ficha']}>
               <BotaoAumentarNex caminho={null}/>
          </div>
     )
}

// COMPONENTE PRINCIPAL
// COMPONENTE PRINCIPAL
function Ficha() {
     const info_solta = {
          defesa: 0,
          deslocamento: 0,
          carga: 0,
          nex: 0,
          pe_rodada: 0,
          afinidade: "Sangue" // Exemplo de dado dinâmico para feedback visual
     }

     const dados_persona = {
          jogador: "Milo",
          origem: "Trambiqueiro",
          classe: "Especialista",
          trilha: "Negociador"
     }

     const dadosPadrao = [
          { nome: "for", valor: 0 },
          { nome: "agi", valor: 0 },
          { nome: "vig", valor: 0 },
          { nome: "int", valor: 0 },
          { nome: "pre", valor: 0 },
     ];

     return (
          <div className={estilos['wrapper-tela-cheia']}>
               <header>
                    <HeaderBase 
                         titulo={"Nome do agente"}
                         pagina_atual={"ficha"}
                         botao_L={<BotaoRetorno/>} 
                         botao_R={<BotoesFicha/>} 
                    />
               </header>
               
               <main className={estilos.corpo}>
                    {/* Lado Esquerdo: O círculo/penta de atributos customizado */}
                    <div className={estilos['coluna-atributos']}>
                         <Atributos atributos_lista={dadosPadrao}/>
                    </div>

                    {/* Lado Direito: Informações textuais, numéricas e inventário */}
                    <div className={estilos['coluna-detalhes']}> 
                         <div className={estilos['bloco-card-info']}>
                              <InfoPersona dados_persona={dados_persona} />
                         </div>
                         
                         <ContainerValAtualMax/>
                         <ContainerDadosSoltos dados={info_solta}/>
                         
                         <ContainerPericias/>
                         <ContainerAtaquesItens/>
                    </div>
               </main>
          </div>
     )
}

export default Ficha;