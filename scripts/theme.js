document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  if (!toggleBtn) return;

  const setIcon = (isLight) => {
    toggleBtn.textContent = isLight ? "☀️" : "🌙";
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    root.classList.add("light");
    setIcon(true);
  } else {
    setIcon(false);
  }

  toggleBtn.addEventListener("click", () => {
    const isLight = root.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    setIcon(isLight);
  });
});
