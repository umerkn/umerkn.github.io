(() => {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.add("light");
    } else if (saved === "dark") {
      document.documentElement.classList.remove("light");
    } else {
      // Optional: fallback to system preference
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      if (prefersLight) {
        document.documentElement.classList.add("light");
      }
    }
  } catch {}
})();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const isLight = root.classList.toggle("light");
    try {
      localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch {}
  });
});
