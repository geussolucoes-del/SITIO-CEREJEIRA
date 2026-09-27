// WhatsApp confirmado pelo usuário em 27/09/2026.
const CONTACT = Object.freeze({
  whatsapp: "5533987380223",
  message: "Olá! Vi o Sítio Cerejeira pelo site e gostaria de receber mais informações sobre a propriedade anunciada por R$ 1.500.000.",
});

const contactUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.message)}`;
document.querySelectorAll("[data-contact]").forEach((link) => {
  link.href = contactUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const privacyUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Olá, Janaína. Gostaria de fazer um pedido sobre meus dados pessoais relacionados ao Sítio Cerejeira.")}`;
document.querySelectorAll("[data-privacy-contact]").forEach((link) => {
  link.href = privacyUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "+55 33 98738-0223 (WhatsApp)";
});
