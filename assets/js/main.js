// main.js - highlight active nav link
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop(); // e.g., about.html

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("text-purple-600", "font-semibold"); // highlight style
    } else {
      link.classList.remove("text-purple-600", "font-semibold");
    }
  });
});