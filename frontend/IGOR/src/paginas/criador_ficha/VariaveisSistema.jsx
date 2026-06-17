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

