const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector(".contact-form");
const statusMessage = document.querySelector(".form-status");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

if (contactForm instanceof HTMLFormElement && statusMessage) {
  const validators = {
    name: (value) => value.trim() ? "" : "Please enter your name.",
    email: (value) => {
      if (!value.trim()) {
        return "Please enter your email address.";
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value) ? "" : "Please enter a valid email address.";
    },
    message: (value) => value.trim() ? "" : "Please add a short message about your project."
  };

  const setFieldState = (fieldName, message) => {
    const field = contactForm.elements.namedItem(fieldName);
    const errorNode = document.getElementById(`${fieldName}-error`);

    if (!(field instanceof HTMLElement) || !errorNode) {
      return;
    }

    const fieldWrapper = field.closest(".form-field");
    errorNode.textContent = message;

    if (fieldWrapper) {
      fieldWrapper.classList.toggle("is-invalid", Boolean(message));
    }

    field.setAttribute("aria-invalid", String(Boolean(message)));
  };

  const validateField = (fieldName) => {
    const field = contactForm.elements.namedItem(fieldName);

    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
      return true;
    }

    const message = validators[fieldName](field.value);
    setFieldState(fieldName, message);
    return !message;
  };

  ["name", "email", "message"].forEach((fieldName) => {
    const field = contactForm.elements.namedItem(fieldName);

    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      field.addEventListener("blur", () => validateField(fieldName));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") {
          validateField(fieldName);
        }
      });
    }
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = ["name", "email", "message"].every((fieldName) => validateField(fieldName));

    statusMessage.classList.remove("is-success", "is-error");

    if (!isValid) {
      statusMessage.textContent = "Please fix the highlighted fields and try again.";
      statusMessage.classList.add("is-error");
      return;
    }

    contactForm.reset();
    ["name", "email", "message"].forEach((fieldName) => setFieldState(fieldName, ""));
    statusMessage.textContent = "Thanks! Your message has been captured. We will follow up with next steps soon.";
    statusMessage.classList.add("is-success");
  });
}
