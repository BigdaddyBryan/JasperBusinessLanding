// Helper: safe select
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// PRELOADER
window.addEventListener("load", () => {
  const preloader = $("#preloader");
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add("is-hidden");
    document.body.classList.add("loading-complete");
  }, 400);
  setTimeout(() => {
    preloader.style.display = "none";
  }, 1400);
});

// DOM READY
document.addEventListener("DOMContentLoaded", () => {
  // --- HERO SECTIE "REVEAL" LOGICA ---
  const heroSection = document.querySelector("#hero");
  if (heroSection) {
    const videoReveal = heroSection.querySelector(".hero-video-reveal");
    const heroTitle = heroSection.querySelector(".hero-title");

    // 1) Geen letter-split meer als data-no-split aanwezig is (houdt je markup intact)
    if (heroTitle && !heroTitle.hasAttribute("data-no-split")) {
      const titleText = "Blijf Staan. Hoe de Wereld ook Verandert.";
      titleText.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = char;
        span.style.transitionDelay = `${index * 20}ms`;
        heroTitle.appendChild(span);
      });
    }

    // 2) Muisinteractie voor clip-path (blijft gewoon werken)
    heroSection.addEventListener("mousemove", (e) => {
      if (window.innerWidth > 1024) {
        heroSection.style.setProperty("--mouse-x", e.clientX + "px");
        heroSection.style.setProperty("--mouse-y", e.clientY + "px");
      }
    });

    // 3) Rotating woord in de headline
    const rotateEl = document.getElementById("hero-rotate");
    if (rotateEl) {
      const woorden = ["verandert", "uitdaagt", "stormt", "schuift"];
      let i = 0;
      const wissel = () => {
        // fade out
        rotateEl.classList.remove("is-in");
        rotateEl.classList.add("is-out");
        setTimeout(() => {
          i = (i + 1) % woorden.length;
          rotateEl.textContent = woorden[i];
          // fade in
          rotateEl.classList.remove("is-out");
          rotateEl.classList.add("is-in");
        }, 220);
      };
      // start met een subtiele fade-in
      rotateEl.classList.add("is-in");
      const interval = setInterval(wissel, 2200);

      // als gebruiker 'prefers-reduced-motion' heeft: niet animeren
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) clearInterval(interval);
    }
  }

  // HEADER BG show/hide on scroll
  const headerBg = $(".header-background");
  let lastY = window.scrollY;
  if (headerBg) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y > lastY && y > 50) headerBg.classList.remove("is-visible");
      else if (y < lastY) headerBg.classList.add("is-visible");
      else if (y <= 50) headerBg.classList.remove("is-visible");
      lastY = y;
    });
  }

  // NAV OVERLAY
  const toggle = document.getElementById("nav-toggle");
  const overlay = document.getElementById("nav-overlay");
  const main = document.querySelector("main");
  let lastFocus = null;

  const focusSelectors =
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
  function trap(e) {
    if (e.key !== "Tab") return;
    const nodes = [...overlay.querySelectorAll(focusSelectors)].filter(
      (el) => !el.hasAttribute("disabled")
    );
    if (!nodes.length) return;
    const first = nodes[0],
      last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  function openNav() {
    lastFocus = document.activeElement;
    toggle.setAttribute("aria-expanded", "true");
    overlay.hidden = false;
    document.body.classList.add("nav-open");
    main?.setAttribute("inert", "");
    overlay.addEventListener("keydown", trap);
    (
      overlay.querySelector("[data-autofocus]") ||
      overlay.querySelector(focusSelectors)
    )?.focus();
  }
  function closeNav() {
    toggle.setAttribute("aria-expanded", "false");
    overlay.hidden = true;
    document.body.classList.remove("nav-open");
    main?.removeAttribute("inert");
    overlay.removeEventListener("keydown", trap);
    lastFocus?.focus();
  }
  toggle?.addEventListener("click", () =>
    overlay.hidden ? openNav() : closeNav()
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeNav();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeNav();
  });
  overlay
    .querySelectorAll("[data-navlink]")
    .forEach((a) => a.addEventListener("click", closeNav));

  // PROGRAMMA tabs
  const pillarItems = $$(".pillar-item");
  if (pillarItems.length) {
    pillarItems.forEach((item) => {
      item.addEventListener("click", () => {
        const pillar = item.dataset.pillar;
        pillarItems.forEach((p) => p.classList.remove("active"));
        item.classList.add("active");
        $$(".program-bg").forEach((bg) =>
          bg.classList.toggle("active", bg.dataset.pillar === pillar)
        );
        $$(".content-panel").forEach((panel) =>
          panel.classList.toggle("active", panel.dataset.pillar === pillar)
        );
      });
    });
  }

  // Swiper (reviews)
  if (typeof Swiper !== "undefined" && $(".swiper")) {
    new Swiper(".swiper", {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }

  // Animate on scroll
  const scrollEls = $$(".animate-on-scroll");
  if (scrollEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = parseInt(entry.target.dataset.delay || 0, 10);
          setTimeout(
            () => entry.target.classList.add("is-visible"),
            delay * 100
          );
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    scrollEls.forEach((el) => io.observe(el));
  }

  // CONTACT FORM
  const contactForm = document.getElementById("contact");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      contactForm.reset();
      document.getElementById("contact-success").hidden = false;
    });
  }

  // EBOOK FORM
  const ebookForm = document.getElementById("ebook-form");
  if (ebookForm) {
    ebookForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(ebookForm);
      const res = await fetch(ebookForm.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      ebookForm.reset();
      document.getElementById("ebook-success").hidden = false;
    });
  }

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
