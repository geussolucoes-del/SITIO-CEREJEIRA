document.querySelectorAll(".film").forEach((film) => {
  const video = film.querySelector("video");
  const button = film.querySelector(".film-control");
  const title = film.querySelector("figcaption").textContent.trim();

  // Os MP4 desta reconstrução também não contêm uma faixa de áudio.
  video.defaultMuted = true;
  video.muted = true;
  video.volume = 0;
  video.playsInline = true;
  video.addEventListener("volumechange", () => {
    if (!video.muted || video.volume !== 0) {
      video.muted = true;
      video.volume = 0;
    }
  });

  const updateButton = () => {
    const playing = !video.paused && !video.ended;
    film.classList.toggle("is-playing", playing);
    button.setAttribute("aria-label", `${playing ? "Pausar" : "Reproduzir"}: ${title}`);
    button.innerHTML = `<span aria-hidden="true">${playing ? "Ⅱ" : "▶"}</span>${playing ? "Pausar" : "Assistir"}`;
  };
  const toggle = async () => {
    video.muted = true;
    video.volume = 0;
    if (video.paused) {
      document.querySelectorAll(".film video").forEach((other) => { if (other !== video) other.pause(); });
      try { await video.play(); } catch { updateButton(); }
    } else {
      video.pause();
    }
  };
  button.addEventListener("click", toggle);
  video.addEventListener("click", toggle);
  for (const eventName of ["play", "pause", "ended"]) video.addEventListener(eventName, updateButton);
  updateButton();
});

const gallery = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxLabel = lightbox.querySelector("span:last-child");
const closeButton = lightbox.querySelector(".lightbox-close");
let currentImage = 0;
let returnFocus = null;

function showImage(index) {
  currentImage = (index + gallery.length) % gallery.length;
  const source = gallery[currentImage];
  const image = source.querySelector("img");
  lightboxImage.src = image.getAttribute("src");
  lightboxImage.alt = image.alt;
  lightboxLabel.textContent = source.querySelector("span").textContent.trim();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  lightboxImage.removeAttribute("src");
  returnFocus?.focus();
}

gallery.forEach((button, index) => button.addEventListener("click", () => {
  returnFocus = button;
  showImage(index);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeButton.focus();
}));

closeButton.addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showImage(currentImage - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(currentImage + 1));
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showImage(currentImage - 1);
  if (event.key === "ArrowRight") showImage(currentImage + 1);
  if (event.key === "Tab") {
    const controls = [...lightbox.querySelectorAll("button")];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
