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

// ---------- Tabs ----------
document.querySelectorAll("[data-tabs]").forEach((tabs) => {
  const buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));

  const select = (active) => {
    buttons.forEach((btn) => {
      const on = btn === active;
      btn.setAttribute("aria-selected", String(on));
      btn.tabIndex = on ? 0 : -1;
      document.getElementById(btn.getAttribute("aria-controls")).hidden = !on;
    });
  };

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => select(btn));
    btn.addEventListener("keydown", (e) => {
      const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      const target = buttons[(i + dir + buttons.length) % buttons.length];
      target.focus();
      select(target);
    });
  });
});
