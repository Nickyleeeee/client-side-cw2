// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const links = navLinks.querySelectorAll("a"); // Select all navigation links
  const courseLinks = document.querySelectorAll(".course-link");
  const modal = document.getElementById("courseModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalDuration = document.getElementById("modalDuration");
  const modalCareers = document.getElementById("modalCareers");
  const closeModal = document.querySelector(".close");

  // Course details data
  const courseDetails = {
    science: {
      title: "Science and Technology",
      description:
        "This course covers a wide range of scientific principles and technological advancements, preparing students for careers in research, innovation, and industry.",
      duration: "Duration: 4 years",
      careers: "Career Paths: Research Scientist, Data Analyst, IT Consultant",
    },
    math: {
      title: "Mathematics",
      description:
        "A rigorous program designed to build analytical, problem-solving, and logical reasoning skills essential for various scientific and business applications.",
      duration: "Duration: 3-4 years",
      careers: "Career Paths: Actuary, Statistician, Financial Analyst",
    },
    business: {
      title: "Business and Management",
      description:
        "Focuses on entrepreneurship, marketing, finance, and leadership skills to prepare students for dynamic business environments.",
      duration: "Duration: 3-4 years",
      careers: "Career Paths: Entrepreneur, Marketing Manager, HR Manager",
    },
    health: {
      title: "Health and Social Care",
      description:
        "Designed for students interested in healthcare professions, focusing on patient care, medical ethics, and community health services.",
    },
    engineering: {
      title: "Engineering",
      description:
        "Offers hands-on training in mechanical, electrical, and civil engineering disciplines to equip students for the modern engineering workforce.",
    },
    education: {
      title: "Education",
      description:
        "Prepares students for teaching roles with training in educational psychology, curriculum design, and student engagement strategies.",
    },
    law: {
      title: "Law",
      description:
        "Provides an in-depth understanding of legal principles, case studies, and legal ethics to prepare students for careers in law and governance.",
    },
  };

  // Open modal when course is clicked
  courseLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const courseKey = link.getAttribute("data-course");

      if (courseDetails[courseKey]) {
        modalTitle.textContent = courseDetails[courseKey].title;
        modalDescription.textContent = courseDetails[courseKey].description;
        modalDuration.textContent = courseDetails[courseKey].duration;
        modalCareers.textContent = courseDetails[courseKey].careers;
        modal.style.display = "flex";
      }
    });
  });

  // Close modal when 'X' is clicked
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside of modal-content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

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

  document
    .getElementById("courseSearch")
    .addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();
      document.querySelectorAll(".course-list li").forEach((li) => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(searchValue) ? "block" : "none";
      });
    });
});
