// Wacht tot de volledige pagina (inclusief afbeeldingen en video) is geladen
window.addEventListener("load", () => {
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("is-hidden");
      document.body.classList.add("loading-complete");
    }, 500);
    setTimeout(() => {
      preloader.style.display = "none";
    }, 1500);
  }
});

// De rest van het script wordt uitgevoerd nadat de basis HTML is geladen
document.addEventListener("DOMContentLoaded", () => {
  // --- HERO SECTIE "REVEAL" LOGICA ---
  const heroSection = document.querySelector("#hero");
  if (heroSection) {
    const videoReveal = heroSection.querySelector(".hero-video-reveal");
    const heroTitle = heroSection.querySelector(".hero-title");

    // 1. Gespreide Tekstanimatie voor de titel
    const titleText = "Blijf Staan. Hoe de Wereld ook Verandert.";
    titleText.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char;
      span.style.transitionDelay = `${index * 20}ms`;
      heroTitle.appendChild(span);
    });

    // 2. Muisinteractie voor het 'clip-path' onthullingseffect
    heroSection.addEventListener("mousemove", (e) => {
      if (window.innerWidth > 1024) {
        // Alleen op grotere schermen
        // Gebruik CSS custom properties voor betere performance
        heroSection.style.setProperty("--mouse-x", e.clientX + "px");
        heroSection.style.setProperty("--mouse-y", e.clientY + "px");
      }
    });
  }

  // --- HEADER LOGICA ---
  const headerBg = document.querySelector(".header-background");
  let lastScrollY = window.scrollY;
  if (headerBg) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        headerBg.classList.remove("is-visible");
      } else if (currentScrollY < lastScrollY) {
        headerBg.classList.add("is-visible");
      } else if (currentScrollY <= 50) {
        headerBg.classList.remove("is-visible");
      }
      lastScrollY = currentScrollY;
    });
  }

  // --- NAVIGATIE OVERLAY LOGICA ---
  const menuToggle = document.querySelector(".header-menu-toggle");
  const navOverlay = document.querySelector(".nav-overlay");
  const navOverlayLinks = document.querySelectorAll(".nav-overlay .nav-link");
  if (menuToggle && navOverlay) {
    menuToggle.addEventListener("click", () => {
      navOverlay.classList.toggle("is-active");
      document.body.classList.toggle("no-scroll");
      if (navOverlay.classList.contains("is-active")) {
        headerBg.classList.add("is-visible");
      } else if (window.scrollY <= 50) {
        headerBg.classList.remove("is-visible");
      }
    });
    navOverlayLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navOverlay.classList.remove("is-active");
        document.body.classList.remove("no-scroll");
        if (window.scrollY <= 50) {
          headerBg.classList.remove("is-visible");
        }
      });
    });
  }

  // --- INTERACTIEVE PROGRAMMA SECTIE LOGICA ---
  const pillarItems = document.querySelectorAll(".pillar-item");
  if (pillarItems.length > 0) {
    pillarItems.forEach((item) => {
      item.addEventListener("click", () => {
        const activePillar = item.dataset.pillar;
        pillarItems.forEach((p) => p.classList.remove("active"));
        item.classList.add("active");
        document
          .querySelectorAll(".program-bg")
          .forEach((bg) =>
            bg.classList.toggle("active", bg.dataset.pillar === activePillar)
          );
        document
          .querySelectorAll(".content-panel")
          .forEach((panel) =>
            panel.classList.toggle(
              "active",
              panel.dataset.pillar === activePillar
            )
          );
      });
    });
  }

  // --- SWIPERJS SLIDER FOR REVIEWS ---
  if (typeof Swiper !== "undefined" && document.querySelector(".swiper")) {
    const swiper = new Swiper(".swiper", {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }

  // --- ANIMATE ON SCROLL (INTERSECTION OBSERVER) ---
  const scrollElements = document.querySelectorAll(".animate-on-scroll");
  if (scrollElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || 0);
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    scrollElements.forEach((el) => observer.observe(el));
  }

  // --- INTERACTIEVE CONTACT FORMULIER LOGIC ---
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    const submitBtn = contactForm.querySelector(".btn-submit");
    const successMessage = document.querySelector(".success-message");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitBtn.classList.add("loading");
      setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.classList.add("success");
        submitBtn.querySelector(".btn-text").innerHTML =
          '<i class="fas fa-check"></i>';
        setTimeout(() => {
          contactForm.style.opacity = "0";
          successMessage.classList.add("is-visible");
        }, 500);
      }, 2000);
    });
  }
});
