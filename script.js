/*
  Small enhancements only:
  - mobile navigation
  - sticky header styling
  - active nav link highlighting
  - copy email button
  - current year in footer
*/

const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const navLinks = document.querySelectorAll(".nav__link");
const yearEl = document.querySelector("[data-year]");
const copyButton = document.querySelector("[data-copy-email]");
const copyMessage = document.querySelector("[data-copy-message]");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Toggle mobile menu.
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Add header border/shadow after scrolling.
const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Highlight active navigation item as sections enter the viewport.
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav__link[href="#${id}"]`);

        if (entry.isIntersecting && link) {
          navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// Copy email placeholder or real email once replaced.
if (copyButton && copyMessage) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.getAttribute("data-copy-email");

    if (!email || email.includes("YOUR_EMAIL")) {
      copyMessage.textContent = "Replace the email placeholder before publishing.";
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      copyMessage.textContent = "Email copied.";
    } catch (error) {
      copyMessage.textContent = "Copy failed. Select the email manually.";
    }
  });
}
