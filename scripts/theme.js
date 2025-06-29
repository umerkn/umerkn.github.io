document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const iconImg = toggleBtn.querySelector("img");

  if (!toggleBtn || !iconImg) return;

  const setIcon = (isLight) => {
    iconImg.src = isLight ? "assets/icons/moon.svg" : "assets/icons/sun.svg";
    iconImg.alt = isLight ? "Switch to dark theme" : "Switch to light theme";
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
