// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const links = navLinks.querySelectorAll("a"); // Select all navigation links

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

  const form = document.getElementById("applicationForm");

  //initializing success modal
  const modal = document.getElementById("success-modal");
  const closeModal = document.querySelector(".close-modal");


  // Load saved data from LocalStorage
  loadFormData();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous error messages
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("dobError").textContent = "";
    document.getElementById("addressError").textContent = "";
    document.getElementById("courseError").textContent = "";
    document.getElementById("statementError").textContent = "";
    document.getElementById("documentsError").textContent = "";

    // Validate Full Name
    const fullName = document.getElementById("fullName").value.trim();
    if (fullName === "") {
      document.getElementById("nameError").textContent =
        "Please enter your full name.";
      valid = false;
    }

    // Validate Email Address
    const email = document.getElementById("email").value.trim();
    if (email === "") {
      document.getElementById("emailError").textContent =
        "Please enter your email address.";
      valid = false;
    } else if (!validateEmail(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      valid = false;
    }

    // Validate Phone Number
    const phone = document.getElementById("phone").value.trim();
    if (phone === "") {
      document.getElementById("phoneError").textContent =
        "Please enter your phone number.";
      valid = false;
    } else if (!validatePhone(phone)) {
      document.getElementById("phoneError").textContent =
        "Please enter a valid phone number (e.g., +1234567890).";
      valid = false;
    }

    // Validate Date of Birth
    const dob = document.getElementById("dob").value.trim();
    if (dob === "") {
      document.getElementById("dobError").textContent =
        "Please enter your date of birth.";
      valid = false;
    } else if (!validateDOB(dob)) {
      document.getElementById("dobError").textContent =
        "You must be at least 16 years old to apply.";
      valid = false;
    }

    // Validate Address
    const address = document.getElementById("address").value.trim();
    if (address === "") {
      document.getElementById("addressError").textContent =
        "Please enter your address.";
      valid = false;
    }

    // Validate Course Selection
    const courseSelect = document.getElementById("courseSelect").value;
    if (courseSelect === "") {
      document.getElementById("courseError").textContent =
        "Please select a course.";
      valid = false;
    }

    // Validate Motivation Statement
    const statement = document.getElementById("statement").value.trim();
    if (statement === "") {
      document.getElementById("statementError").textContent =
        "Please enter a motivation statement.";
      valid = false;
    } else if (statement.length < 50) {
      document.getElementById("statementError").textContent =
        "Your motivation statement must be at least 50 characters long.";
      valid = false;
    }

    // Validate File Upload
    const documents = document.getElementById("documents").files;
    if (documents.length === 0) {
      document.getElementById("documentsError").textContent =
        "Please upload your supporting documents.";
      valid = false;
    } else if (!validateFile(documents[0])) {
      document.getElementById("documentsError").textContent =
        "Only PDF, DOC, or DOCX files are allowed. Max file size: 5MB.";
      valid = false;
    }

    // If the form is valid, submit
    if (valid) {
      // Show the modal
      modal.style.display = "flex";
      localStorage.removeItem("applicationFormData"); // Clear saved data after submission
      form.reset();
    }
  });

  // Close modal when "X" is clicked
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Save form data to LocalStorage
  function saveFormData() {
    const formData = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      dob: document.getElementById("dob").value,
      address: document.getElementById("address").value,
      courseSelect: document.getElementById("courseSelect").value,
      statement: document.getElementById("statement").value,
    };
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
  }

  // Load form data from LocalStorage
  function loadFormData() {
    const savedData = localStorage.getItem("applicationFormData");
    if (savedData) {
      const formData = JSON.parse(savedData);
      document.getElementById("fullName").value = formData.fullName || "";
      document.getElementById("email").value = formData.email || "";
      document.getElementById("phone").value = formData.phone || "";
      document.getElementById("dob").value = formData.dob || "";
      document.getElementById("address").value = formData.address || "";
      document.getElementById("courseSelect").value =
        formData.courseSelect || "";
      document.getElementById("statement").value = formData.statement || "";
    }
  }

  // Helper function for email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Helper function for phone number validation
  function validatePhone(phone) {
    const re = /^\+?\d{7,15}$/; // Allows optional "+" and numbers between 7-15 digits
    return re.test(phone);
  }

  // Helper function for date of birth validation (Minimum 16 years old)
  function validateDOB(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 16;
    }
    return age >= 16;
  }

  // Helper function for file validation
  function validateFile(file) {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }
});
