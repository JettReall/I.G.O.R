//EM andamento

const FichaEmBranco = {
     nome_perso: "",
     nome_jogador: "",

     nex: 0,
     pe_rodada: 0,
     defesa: 0,
     deslocamento: 0,


     vida: {
          atual: 0,
          maximo: 0,
          temporario: 0,
     },

     san: {
          atual: 0,
          maximo: 0,
          temporario: 0,
     },

     pe: {
          atual: 0,
          maximo: 0,
          temporario: 0,
     },

     classe: {
          nome: "",
          hp: {
               inicial: 0,
               adicional: 0,
          },
          pe: {
               inicial: 0,
               adicional: 0,
          },
          san: {
               inicial: 0,
               adicional: 0,
          },
          trilha: {
               nome: "",
               habilidadeTrilha: ["","","",""]
          },
     },

     origem: {
          nome: "",
          habilidade: "",
          periciasID: [0,0],
     },


     atributos: [ 
    { nome: "for", valor: 0 },
    { nome: "agi", valor: 0 },
    { nome: "vig", valor: 0 },
    { nome: "int", valor: 0 },
    { nome: "pre", valor: 0 },
],

     pericias: "",

     poderes_classe: "",
}

const PersonagemVazio = {
  id: 0,
  nomePersonagem: "",
  nomeJogador: "",
  vida: "",
  pe: "",
  sanidade: "",
  defesa: 0,
  esquiva: 0,
  proeficiencia: "",
  nex: 0,
  deslocamento: 0,
  efeito: [
    {
      nome: "",
      descricao: ""
    }
  ],
  anotacoes: {
    historia: "",
    aparencia: "",
    outro: ""
  },
  origem: {
    id: 0,
    nome: "COMBATENTE",
    pericias: [
      {
        id: 0,
        nome: "",
        atributo: {
          nome: "",
          valor: ""
        },
        descricao: ""
      }
    ]
  },
  pericias: [
    {
      id: 0,
      personagem: "",
      pericia: {
        id: 0,
        nome: "",
        atributo: {
          nome: "",
          valor: ""
        },
        descricao: ""
      },
      treino: 0,
      bonus: 0,
      outro: 0
    }
  ],
  inventario: {
    item: [
      {
        id: 0,
        nome: "",
        descricao: "",
        efeito: {
          nome: "",
          descricao: ""
        },
        espaco: 0,
        categoria: ""
      }
    ]
  }
};

