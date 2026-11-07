// ---------- Mega menu ----------
(function () {
  const toggle = document.querySelector(".navbar__dropdown-toggle");
  const menu = document.getElementById("mega-menu");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(menu.hidden);
  });
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

// ---------- Sliders ----------
document.querySelectorAll("[data-slider]").forEach((slider) => {
  const track = slider.querySelector("[data-slider-track]");
  const prev = slider.querySelector("[data-slider-prev]");
  const next = slider.querySelector("[data-slider-next]");
  const slides = Array.from(track.children);
  let index = 0;

  const metrics = () => {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = slides[0].getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.floor((slider.clientWidth + gap) / step));
    return { step, maxIndex: Math.max(0, slides.length - visible) };
  };

  const update = () => {
    const { step, maxIndex } = metrics();
    index = Math.min(Math.max(index, 0), maxIndex);
    track.style.transform = `translateX(${-index * step}px)`;
    prev.disabled = index === 0;
    next.disabled = index === maxIndex;
  };

  prev.addEventListener("click", () => { index--; update(); });
  next.addEventListener("click", () => { index++; update(); });
  window.addEventListener("resize", update);
  update();
});
