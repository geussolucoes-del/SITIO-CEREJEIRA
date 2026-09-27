import { questions, nextStep } from "./qualification-rules.mjs";

const whatsapp = "5533987380223"; // Confirmado pelo usuário.
const metaOrigin = new URLSearchParams(location.search).get("origem") === "formulario_meta";
const metaMessage = "Olá! Preenchi o formulário sobre o Sítio Cerejeira pelo anúncio e conheci mais detalhes no site. Gostaria de conversar sobre o imóvel.";
const waUrl = (message) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-privacy-contact]").forEach((link) => {
  link.href = waUrl("Olá, Janaína. Gostaria de fazer um pedido sobre meus dados pessoais relacionados ao Sítio Cerejeira.");
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "+55 33 98738-0223 (WhatsApp)";
});

const commercialLinks = [...document.querySelectorAll("[data-contact]")];
const dialog = document.querySelector("#qualificacao");
if (metaOrigin) {
  document.documentElement.dataset.contactFlow = "meta";
  commercialLinks.forEach((link) => {
    link.href = waUrl(metaMessage);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
} else if (dialog) {
  document.documentElement.dataset.contactFlow = "organic";
  const content = dialog.querySelector("#qualification-content");
  const close = dialog.querySelector(".qualification-close");
  let step = 0;
  let outcome = null;
  const selected = [];

  function render() {
    content.replaceChildren();
    if (outcome) {
      const heading = document.createElement("h3");
      const description = document.createElement("p");
      heading.textContent = outcome === "approved" ? "Vamos conversar" : "Obrigado pelo interesse";
      description.textContent = outcome === "approved"
        ? "Suas respostas indicam que vale conversar sobre o imóvel. Você pode enviar a mensagem abaixo pelo WhatsApp."
        : "Pelas respostas, o Sítio Cerejeira talvez não seja a opção mais adequada para o que você procura agora. Agradecemos por conhecer a propriedade.";
      content.append(heading, description);
      if (outcome === "approved") {
        const message = `Olá! Vi o Sítio Cerejeira pelo site e gostaria de conversar sobre o imóvel anunciado por R$ 1.500.000. Sobre o valor: ${selected[0]}. Etapa da busca: ${selected[1]}. Participação na decisão: ${selected[2]}.`;
        const link = document.createElement("a");
        link.className = "button button-dark qualification-submit";
        link.href = waUrl(message);
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Conversar no WhatsApp ↗";
        content.append(link);
      } else {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "qualification-done";
        button.textContent = "Continuar vendo o imóvel";
        button.addEventListener("click", () => dialog.close());
        content.append(button);
      }
      return;
    }

    const progress = document.createElement("p");
    progress.className = "qualification-progress";
    progress.textContent = `Pergunta ${step + 1} de ${questions.length}`;
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = questions[step].text;
    fieldset.append(legend);
    const next = document.createElement("button");
    next.type = "button";
    next.className = "button button-dark qualification-next";
    next.textContent = step === questions.length - 1 ? "Concluir" : "Continuar";
    next.disabled = selected[step] === undefined;

    questions[step].answers.forEach((answer, index) => {
      const label = document.createElement("label");
      label.className = "qualification-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${step}`;
      input.value = String(index);
      input.checked = selected[step] === answer.text;
      input.addEventListener("change", () => { selected[step] = answer.text; next.disabled = false; });
      const span = document.createElement("span");
      span.textContent = answer.text;
      label.append(input, span);
      fieldset.append(label);
    });
    next.addEventListener("click", () => {
      const answerIndex = questions[step].answers.findIndex((answer) => answer.text === selected[step]);
      const destination = nextStep(step, answerIndex);
      if (typeof destination === "number") step = destination;
      else outcome = destination;
      render();
    });
    content.append(progress, fieldset, next);
  }

  close.addEventListener("click", () => dialog.close());
  commercialLinks.forEach((link) => {
    link.href = "#qualificacao";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      render();
      dialog.showModal();
    });
  });
}
