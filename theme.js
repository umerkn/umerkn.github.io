const toggle = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");

function setTheme(mode) {
  if (mode === "light") {
    document.body.classList.add("light");
    icon.src = "assets/icons/moon.png";
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    icon.src = "assets/icons/sun.png";
    localStorage.setItem("theme", "dark");
  }
}

const saved = localStorage.getItem("theme");
const systemPrefersLight = window.matchMedia(
  "(prefers-color-scheme: light)"
).matches;

if (saved) {
  setTheme(saved);
} else if (systemPrefersLight) {
  setTheme("light");
} else {
  setTheme("dark");
}

toggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});
