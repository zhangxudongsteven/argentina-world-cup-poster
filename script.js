const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const poster = document.querySelector(".poster");
if (!reducedMotion) {
  poster.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * -12;
    const y = (event.clientY / window.innerHeight - 0.5) * -8;
    poster.style.setProperty("--mx", `${x}px`);
    poster.style.setProperty("--my", `${y}px`);
  });
  poster.addEventListener("pointerleave", () => {
    poster.style.setProperty("--mx", "0px");
    poster.style.setProperty("--my", "0px");
  });
}

const atmosphereButton = document.querySelector(".sound-toggle");
atmosphereButton.addEventListener("click", () => {
  const active = atmosphereButton.getAttribute("aria-pressed") === "true";
  atmosphereButton.setAttribute("aria-pressed", String(!active));
  atmosphereButton.querySelector(".sound-toggle__label").textContent = active ? "氛围" : "燃起";
  document.body.classList.toggle("is-alive", !active);
});
