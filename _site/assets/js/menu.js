document.addEventListener("DOMContentLoaded", () => {
  let e = document.querySelector(".mobile-menu-toggle"),
    s = document.querySelector(".nav-links");
  if (!e || !s) return;
  let t = e.querySelector("img");
  e.addEventListener("click", () => {
    s.classList.toggle("open");
    let e = s.classList.contains("open");
    (t.src = e ? "/assets/icons/x.svg" : "/assets/icons/menu.svg"),
      (t.alt = e ? "Close menu" : "Open menu");
  });
});
