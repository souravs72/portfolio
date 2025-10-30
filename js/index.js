// Wait for DOM and scripts to load
document.addEventListener("DOMContentLoaded", () => {
  /* ============================ Toggle Navbar =========================== */
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector("header");

  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("fa-xmark");
    navbar.classList.toggle("active");
  });

  /* ============================ Scroll Handling =========================== */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  const handleScroll = () => {
    let top = window.scrollY;

    sections.forEach((sec) => {
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((link) => link.classList.remove("active"));
        let activeLink = document.querySelector(`header nav a[href*='${id}']`);
        if (activeLink) activeLink.classList.add("active");
      }
    });

    /* Sticky Navbar */
    header.classList.toggle("sticky", top > 100);

    /* Remove Toggle Icon and Navbar on Scroll */
    menuIcon.classList.remove("fa-xmark");
    navbar.classList.remove("active");
  };

  /* Optimize scroll event listener */
  window.addEventListener("scroll", () => {
    requestAnimationFrame(handleScroll);
  });

  /* ============================ Smooth anchor navigation =========================== */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* ============================ Scroll Reveal =========================== */
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal({
      distance: "80px",
      duration: 2000,
      delay: 200,
    });

    ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
    ScrollReveal().reveal(
      ".home-img, .services-container, .portfolio-box, .contact form",
      { origin: "bottom" }
    );
    ScrollReveal().reveal(".home-contact h1, .about-img", { origin: "left" });
    ScrollReveal().reveal(".home-contact p, .about-content", {
      origin: "right",
    });
  }

  /* ============================ Typed.js =========================== */
  if (typeof Typed !== "undefined") {
    new Typed(".multiple-text", {
      strings: ["Frontend Developer", "Backend Developer", "Problem Solver"],
      typeSpeed: 70,
      backSpeed: 70,
      backDelay: 1000,
      loop: true,
    });
  }

  /* ============================ 3D Tilt for Services =========================== */
  const serviceCards = document.querySelectorAll(
    ".services-container .services-box"
  );
  const maxTiltDeg = 10;

  serviceCards.forEach((card) => {
    let frameId = null;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1

      const dx = px - 0.5; // -0.5..0.5
      const dy = py - 0.5; // -0.5..0.5

      const rx = -dy * 2 * maxTiltDeg; // invert Y for natural tilt
      const ry = dx * 2 * maxTiltDeg;

      // Glare position (extend a bit beyond for nicer highlight)
      const gx = Math.round(px * 100);
      const gy = Math.round(py * 100 - 20);

      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        card.style.setProperty("--rx", rx + "deg");
        card.style.setProperty("--ry", ry + "deg");
        card.style.setProperty("--tz", "14px");
        card.style.setProperty("--gx", gx + "%");
        card.style.setProperty("--gy", gy + "%");
      });
    };

    const onEnter = () => {
      card.classList.add("is-tilting");
    };

    const onLeave = () => {
      if (frameId) cancelAnimationFrame(frameId);
      card.classList.remove("is-tilting");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--tz", "0px");
      card.style.setProperty("--gx", "20%");
      card.style.setProperty("--gy", "-20%");
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener(
      "touchstart",
      (e) => {
        // Support touch by mapping first touch point
        if (e.touches && e.touches[0]) {
          onEnter();
        }
      },
      { passive: true }
    );
    card.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches && e.touches[0]) {
          onMove(e.touches[0]);
        }
      },
      { passive: true }
    );
    card.addEventListener("touchend", onLeave, { passive: true });
  });

  /* ============================ About accordion UX =========================== */
  const aboutAccordion = document.querySelector(".about-accordion");
  if (aboutAccordion) {
    let lastToggleAt = 0;
    const throttleMs = 150; // prevent accidental rapid toggles

    aboutAccordion.addEventListener("click", (evt) => {
      const summary = evt.target.closest("summary");
      if (!summary) return;

      const now = performance.now();
      if (now - lastToggleAt < throttleMs) {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }
      lastToggleAt = now;

      const details = summary.parentElement;
      if (!details || details.tagName !== "DETAILS") return;

      // Close other sections to keep a clean, single-open accordion
      aboutAccordion.querySelectorAll("details[open]").forEach((openEl) => {
        if (openEl !== details) openEl.open = false;
      });
    });
  }
});
