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
    origem: {
    id: 0,
    nome: "",
    pericias: [{ id: 0, nome: "", atributo: { nome: "", valor: "" }, descricao: "" }]
    }
}

export const etapa2_dados = {
   classeAgenteEscolhida: {},
    trilhaAgenteEscolhida: {}, 
}

export const etapa3_dados = {
  forca: 0,
  agilidade: 0,
  vigor: 0,
  intelecto: 0,
  presenca: 0
};

export let etapa4_dados = []; //Essa é a variavel de leitura para as pericias

export let pericias_personagem = [];

export let PersonagemNovo = {
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
    periciaLista: [], //Ids (ints)
}



