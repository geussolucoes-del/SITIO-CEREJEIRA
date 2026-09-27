// Cópia das três perguntas e dos desvios do formulário instantâneo da Meta
// consultado no rascunho da campanha em 27/09/2026.
export const questions = [
  {
    text: "O valor anunciado do Sítio Cerejeira é R$ 1.500.000. Como ele se encaixa nos seus planos?",
    answers: [
      { text: "Esse valor está dentro da faixa que considero", next: 1 },
      { text: "Somente se houver desconto ou condições especiais", next: "closed" },
      { text: "Não, procuro um imóvel de valor menor", next: "closed" },
    ],
  },
  {
    text: "Em que etapa você está na busca por um imóvel desse perfil?",
    answers: [
      { text: "Quero avaliar opções para comprar nos próximos meses", next: 2 },
      { text: "Tenho interesse em comprar, mas ainda não defini um prazo", next: 2 },
      { text: "Estou apenas procurando ideias, sem intenção de compra", next: "closed" },
    ],
  },
  {
    text: "Você participa da decisão de compra de um imóvel como o Sítio Cerejeira?",
    answers: [
      { text: "Sim, eu tomo a decisão de compra", next: "approved" },
      { text: "Sim, decido junto com minha família ou meus sócios", next: "approved" },
      { text: "Represento uma pessoa interessada em comprar", next: "approved" },
      { text: "Não, estou apenas pesquisando, sem um comprador definido", next: "closed" },
    ],
  },
];

export function nextStep(questionIndex, answerIndex) {
  return questions[questionIndex]?.answers[answerIndex]?.next ?? null;
}
