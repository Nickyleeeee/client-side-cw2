// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const links = navLinks.querySelectorAll("a"); // Select all navigation links

  // Close menu when 'hamburger icon'  is pressed
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });

  // Close menu when a link is clicked
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");
    });
  });

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
