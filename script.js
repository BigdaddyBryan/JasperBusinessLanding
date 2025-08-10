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
  const menuToggle = $(".header-menu-toggle");
  const navOverlay = $("#site-nav");
  const navLinks = $$(".nav-overlay .nav-link");

  function setNav(open) {
    if (!navOverlay || !menuToggle) return;
    navOverlay.classList.toggle("is-active", open);
    document.body.classList.toggle("no-scroll", open);
    navOverlay.setAttribute("aria-hidden", String(!open));
    menuToggle.setAttribute("aria-expanded", String(open));
    if (open) headerBg && headerBg.classList.add("is-visible");
    else if (window.scrollY <= 50)
      headerBg && headerBg.classList.remove("is-visible");
  }

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener("click", () =>
      setNav(!navOverlay.classList.contains("is-active"))
    );
    navLinks.forEach((a) => a.addEventListener("click", () => setNav(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNav(false);
    });
  }

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

  // CONTACT FORM (Formspree via Fetch, Netlify fallback through native POST)
  const form = $("#contact-form");
  if (form) {
    const submitBtn = form.querySelector(".btn-submit");
    const successEl = $(".success-message");
    const errorEl = $(".error-message");

    async function sendForm(e) {
      e.preventDefault();
      if (!submitBtn) return;
      submitBtn.classList.add("loading");
      errorEl && errorEl.classList.remove("is-visible");

      // Prepare payload
      const data = new FormData(form);
      const endpoint = form.getAttribute("action"); // Formspree endpoint

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          submitBtn.classList.remove("loading");
          submitBtn.classList.add("success");
          submitBtn.querySelector(".btn-text").innerHTML =
            '<i class="fas fa-check" aria-hidden="true"></i>';
          setTimeout(() => {
            form.style.opacity = "0";
            successEl && successEl.classList.add("is-visible");
          }, 400);
          form.reset();
        } else {
          throw new Error("Formspree error");
        }
      } catch (err) {
        // Fallback: try native POST (useful if hosted on Netlify)
        try {
          const res2 = await fetch(form.action, {
            method: form.method || "POST",
            body: data,
          });
          if (!res2.ok) throw new Error("Fallback POST failed");
          submitBtn.classList.remove("loading");
          submitBtn.classList.add("success");
          submitBtn.querySelector(".btn-text").innerHTML =
            '<i class="fas fa-check" aria-hidden="true"></i>';
          setTimeout(() => {
            form.style.opacity = "0";
            successEl && successEl.classList.add("is-visible");
          }, 400);
          form.reset();
        } catch (fallbackErr) {
          submitBtn.classList.remove("loading");
          errorEl && errorEl.classList.add("is-visible");
        }
      }
    }

    form.addEventListener("submit", sendForm);
  }

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
