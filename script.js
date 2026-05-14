const navbar = document.querySelector("[data-navbar]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const form = document.querySelector("[data-form]");
const formStatus = document.querySelector("[data-form-status]");
const scrollPhotos = document.querySelectorAll("[data-scroll-photo]");

function updateNavbar() {
  navbar?.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

menuToggle?.addEventListener("click", () => {
  const isOpen = menu?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

menu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menu.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("nome") || "").trim();
  const contact = String(data.get("email") || "").trim();
  const message = String(data.get("mensagem") || "").trim();
  const whatsappMessage = [
    "Olá, quero fazer uma reserva no I Love Rio Hostel.",
    name ? `Nome: ${name}` : "",
    contact ? `Contato: ${contact}` : "",
    message ? `Mensagem: ${message}` : ""
  ].filter(Boolean).join("\n");

  formStatus.textContent = name
    ? `Obrigado, ${name}. Sua mensagem foi preparada para envio.`
    : "Obrigado. Sua mensagem foi preparada para envio.";

  window.open(`https://wa.me/5521981522308?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
  form.reset();
});

if ("IntersectionObserver" in window) {
  const photoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          photoObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.24 }
  );

  scrollPhotos.forEach((photo) => photoObserver.observe(photo));
} else {
  scrollPhotos.forEach((photo) => photo.classList.add("is-visible"));
}
