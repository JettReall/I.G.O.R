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