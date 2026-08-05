// Menu mobile
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Parallax das bolinhas (roxa/amarela) do Hero ao rolar a página
const parallaxBlobs = document.querySelectorAll(".blob-parallax");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (parallaxBlobs.length && !prefersReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    const scrolled = window.scrollY;
    parallaxBlobs.forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 0;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
}

// Animação de entrada dos cards (diferenciais/atendimento) ao entrar na tela,
// principalmente para telas de celular onde não existe hover
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}
