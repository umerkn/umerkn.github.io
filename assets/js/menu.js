document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggleBtn || !navLinks) return;

  const menuIcon = toggleBtn.querySelector("img");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuIcon.src = isOpen ? "/assets/icons/x.svg" : "/assets/icons/menu.svg";
    menuIcon.alt = isOpen ? "Close menu" : "Open menu";
  });
});
