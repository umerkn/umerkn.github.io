(() => {
  try {
    let e = localStorage.getItem("theme");
    if ("light" === e) document.documentElement.classList.add("light");
    else if ("dark" === e) document.documentElement.classList.remove("light");
    else {
      let t = window.matchMedia("(prefers-color-scheme: light)").matches;
      t && document.documentElement.classList.add("light");
    }
  } catch {}
})(),
  document.addEventListener("DOMContentLoaded", () => {
    let e = document.documentElement,
      t = document.getElementById("theme-toggle");
    t &&
      t.addEventListener("click", () => {
        let t = e.classList.toggle("light");
        try {
          localStorage.setItem("theme", t ? "light" : "dark");
        } catch {}
      });
  });
