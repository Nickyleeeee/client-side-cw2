document.querySelector(".heroButton").addEventListener("click", function () {
  window.location.href = "apply.html";
});


// JQuery for additional effects
$(document).ready(function () {
  // Smooth Scroll Effect
  $("nav ul li a").on("click", function (event) {
    var hash = this.hash;

    // Check if it's an internal link
    if (hash.startsWith("#") && $(hash).length) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 50,
        },
        800
      );
    }
  });

  // Fade-in animation on scroll
  $(window).on("scroll", function () {
    $("section").each(function () {
      if (
        $(this).offset().top <
        $(window).scrollTop() + $(window).height() - 100
      ) {
        $(this).addClass("visible");
      }
    });
  });

  const $menuToggle = $("#menu-toggle");
  const $navLinks = $("#nav-links");

  // Toggle menu on button click
  $menuToggle.on("click", function () {
    $navLinks.toggleClass("active");
    $(this).toggleClass("open");
  });

  // Close menu when clicking outside
  $(document).on("click", function (event) {
    if (
      !$menuToggle.is(event.target) &&
      !$navLinks.is(event.target) &&
      $navLinks.has(event.target).length === 0
    ) {
      $navLinks.removeClass("active");
      $menuToggle.removeClass("open");
    }
  });

  // Close menu when a navigation link is clicked
  $("#nav-links a").on("click", function () {
    $navLinks.removeClass("active");
    $menuToggle.removeClass("open");
  });

  // FAQ Slide Toggle Effect
  $(".faq-question").on("click", function () {
    // Close all other answers
    $(".faq-answer").not($(this).next()).slideUp();

    // Toggle the clicked answer
    $(this).next(".faq-answer").slideToggle();
  });

  

  // Lightbox Effect for Images
  $("img").click(function () {
    $(".lightbox")
      .html('<img src="' + $(this).attr("src") + '">')
      .addClass("active");
  });

  $(".lightbox").click(function () {
    $(this).removeClass("active");
  });

  // Button Hover Effect
  $(".heroButton").hover(
    function () {
      $(this).css({
        transform: "scale(1.1)",
        transition: "0.3s ease-in-out",
      });
    },
    function () {
      $(this).css({
        transform: "scale(1)",
      });
    }
  );
});
