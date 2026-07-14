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
document.documentElement.classList.add("reveal-ready");

const poster = document.querySelector(".poster");
if (!reducedMotion) {
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  poster.addEventListener("pointermove", (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * -12;
    pointerY = (event.clientY / window.innerHeight - 0.5) * -8;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      poster.style.setProperty("--mx", `${pointerX}px`);
      poster.style.setProperty("--my", `${pointerY}px`);
      pointerFrame = 0;
    });
  });
  poster.addEventListener("pointerleave", () => {
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    poster.style.setProperty("--mx", "0px");
    poster.style.setProperty("--my", "0px");
  });
}

const atmosphereButton = document.querySelector(".sound-toggle");
atmosphereButton.addEventListener("click", () => {
  const active = atmosphereButton.getAttribute("aria-pressed") === "true";
  atmosphereButton.setAttribute("aria-pressed", String(!active));
  atmosphereButton.querySelector(".sound-toggle__label").textContent = active ? "点燃氛围" : "恢复宁静";
  document.body.classList.toggle("is-alive", !active);
});
