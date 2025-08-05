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
  // --- 1. HEADER LOGIC ---
  const headerBg = document.querySelector(".header-background");
  let lastScrollY = window.scrollY;
  if (headerBg) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        headerBg.classList.remove("is-visible");
      } else if (currentScrollY < lastScrollY && currentScrollY > 50) {
        headerBg.classList.add("is-visible");
      } else if (currentScrollY <= 50) {
        headerBg.classList.remove("is-visible");
      }
      lastScrollY = currentScrollY;
    });
  }

  // --- 2. NAVIGATIE OVERLAY LOGIC ---
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

  // --- 3. INTERACTIEVE PROGRAMMA SECTIE LOGIC ---
  const pillarItems = document.querySelectorAll(".pillar-item");
  if (pillarItems.length > 0) {
    pillarItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Haal de 'data-pillar' waarde op van het geklikte item
        const activePillar = item.dataset.pillar;

        // Update de active state op de selector lijst
        pillarItems.forEach((p) => p.classList.remove("active"));
        item.classList.add("active");

        // Update de achtergrondafbeelding
        document.querySelectorAll(".program-bg").forEach((bg) => {
          bg.classList.toggle("active", bg.dataset.pillar === activePillar);
        });

        // Update het content paneel
        document.querySelectorAll(".content-panel").forEach((panel) => {
          panel.classList.toggle(
            "active",
            panel.dataset.pillar === activePillar
          );
        });
      });
    });
  }

  // --- 4. SWIPERJS SLIDER FOR REVIEWS ---
  if (typeof Swiper !== "undefined" && document.querySelector(".swiper")) {
    const swiper = new Swiper(".swiper", {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }

  // --- 5. ANIMATE ON SCROLL (INTERSECTION OBSERVER) ---
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
      { threshold: 0.1 }
    );
    scrollElements.forEach((el) => observer.observe(el));
  }

  // --- 6. INTERACTIEVE CONTACT FORMULIER LOGIC ---
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
