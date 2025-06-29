document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  const saved = localStorage.getItem("theme");
  const light =
    saved === "light" ||
    (!saved && window.matchMedia("(prefers-color-scheme: light)").matches);

  if (light) {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }

  toggleBtn.addEventListener("click", () => {
    const isLight = root.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  root.classList.add("ready");
});
