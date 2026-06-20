import { useState } from "react";
import { useEtapa } from "../../componentes/EtapaContext";

export const FichaEmBranco = {
  id: 0,
  nomePersonagem: "",
  nomeJogador: "",
  vida: { atual: 0, max: 0, temporario: 0 },
  pe: { atual: 0, max: 0, temporario: 0 },
  sanidade: { atual: 0, max: 0, temporario: 0 },
  defesa: 0,
  esquiva: 0,
  proeficiencia: "",
  nex: 0,
  deslocamento: 0,
  efeito: [{ nome: "", descricao: "" }],
  anotacoes: { historia: "", aparencia: "", outro: "" },
  origem: {
    id: 0,
    nome: "",
    pericias: [{ id: 0, nome: "", atributo: { nome: "", valor: "" }, descricao: "" }]
  },
  pericias: [
    {
      id: 0,
      personagem: "",
      pericia: { id: 0, nome: "", atributo: { nome: "", valor: "" }, descricao: "" },
      treino: 0,
      bonus: 0,
      outro: 0
    }
  ],
  inventario: {
    item: [{ id: 0, nome: "", descricao: "", efeito: { nome: "", descricao: "" }, espaco: 0, categoria: "" }]
  }
};

//Deixe tudo acima deste comentário intacto por agora.

export const etapa1_dados = {
    nome: "",
    jogador: "",
    nex: 0,
    origem: {
    id: 0,
    nome: "",
    pericias: [{ id: 0, nome: "", atributo: { nome: "", valor: "" }, descricao: "" }]
    }
}

export const etapa2_dados = {
   classeAgenteEscolhida: "",
    trilhaAgenteEscolhida: "" 
}

export const etapa3_dados = [

  { nome: "for", valor: 0 },
  { nome: "agi", valor: 0 },
  { nome: "vig", valor: 0 },
  { nome: "int", valor: 0 },
  { nome: "pre", valor: 0 },
] 

export const pericias_dados = [
  { id: 1, nome: "Atletismo", atributo: "Força", treino: 0 },
  { id: 2, nome: "Acrobacia", atributo: "Agilidade", treino: 0 },
  { id: 3, nome: "Percepção", atributo: "Intelecto", treino: 0 },
  { id: 4, nome: "Furtividade", atributo: "Agilidade", treino: 0 },
  { id: 5, nome: "Investigação", atributo: "Intelecto", treino: 0 },
  { id: 6, nome: "Diplomacia", atributo: "Presença", treino: 0 },
  { id: 7, nome: "Vontade", atributo: "Presença", treino: 0 },
]; //Essa é a variavel de leitura para as pericias

const PersonagemNovo = {
    nome: "",
    jogador: "",
    origemId: 0,
    classeId: 0,
    trilhaId: 0,
    atributos: [
        { nome: "forca", valor: 0 },
        { nome: "agilidade", valor: 0 },
        { nome: "vigor", valor: 0 },
        { nome: "intelecto", valor: 0 },
        { nome: "presenca", valor: 0 },
    ],
    periciaLista: [], //Ids
}



