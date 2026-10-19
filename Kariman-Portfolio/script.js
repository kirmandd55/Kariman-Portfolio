const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
const navbar = document.querySelector(".navbar");
const backToTop = document.getElementById("backToTop");

function handleScroll() {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }

  if (backToTop) {
    backToTop.classList.toggle("show", window.scrollY > 350);
  }
}

window.addEventListener("scroll", handleScroll);
handleScroll();

const navbarMenu = document.getElementById("navbarMenu");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (
      navbarMenu &&
      navbarMenu.classList.contains("show") &&
      typeof bootstrap !== "undefined"
    ) {
      const collapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu);
      collapse.hide();
    }
  });
});

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionBottom
    ) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Replace this with Kariman's real email address.
const recipientEmail = "kariman@example.com";

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const visitorName =
      document.getElementById("visitorName").value.trim();

    const visitorEmail =
      document.getElementById("visitorEmail").value.trim();

    const visitorSubject =
      document.getElementById("visitorSubject").value.trim();

    const visitorMessage =
      document.getElementById("visitorMessage").value.trim();

    if (
      !visitorName ||
      !visitorEmail ||
      !visitorSubject ||
      !visitorMessage
    ) {
      if (formMessage) {
        formMessage.textContent = "Please complete all fields.";
      }
      return;
    }

    const subject = encodeURIComponent(visitorSubject);

    const body = encodeURIComponent(
      "Name: " + visitorName +
      "\nEmail: " + visitorEmail +
      "\n\nMessage:\n" + visitorMessage
    );

    if (formMessage) {
      formMessage.textContent =
        "Opening your email app. Please send the message there.";
    }

    window.location.href =
      "mailto:" + recipientEmail +
      "?subject=" + subject +
      "&body=" + body;
  });
}