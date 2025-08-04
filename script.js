document.addEventListener("DOMContentLoaded", () => {
  // --- 1. "ON-SCROLL-UP" HEADER LOGIC ---
  const headerBg = document.querySelector(".header-background");
  let lastScrollY = window.scrollY;

  if (headerBg) {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      // Toon de achtergrond alleen als je omhoog scrollt of als je al bovenaan bent maar het menu open is
      if (currentScrollY < lastScrollY && currentScrollY > 50) {
        headerBg.classList.add("is-visible");
      } else if (currentScrollY <= 50) {
        headerBg.classList.remove("is-visible");
      } else {
        headerBg.classList.remove("is-visible");
      }
      lastScrollY = currentScrollY;
    });
  }

  // --- 5. INTERACTIEVE CONTACT FORMULIER LOGIC ---
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    const submitBtn = contactForm.querySelector(".btn-submit");
    const successMessage = document.querySelector(".success-message");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Voorkom standaard formulier verzending

      // 1. Toon de laad-status op de knop
      submitBtn.classList.add("loading");

      // 2. Simuleer een netwerkverzoek (vervang dit later met echte logica)
      setTimeout(() => {
        // 3. Toon de succes-status op de knop
        submitBtn.classList.remove("loading");
        submitBtn.classList.add("success");
        submitBtn.querySelector(".btn-text").innerHTML =
          '<i class="fas fa-check"></i>';

        // 4. Verberg het formulier en toon de succesmelding
        setTimeout(() => {
          contactForm.style.opacity = "0";
          contactForm.style.visibility = "hidden";
          successMessage.classList.add("is-visible");
        }, 500); // Korte wachttijd na het tonen van het vinkje
      }, 2000); // Simuleer 2 seconden laadtijd
    });
  }

  // --- 2. IMMERSIVE NAVIGATION OVERLAY LOGIC ---
  const menuToggle = document.querySelector(".header-menu-toggle");
  const navOverlay = document.querySelector(".nav-overlay");
  const navOverlayLinks = document.querySelectorAll(".nav-overlay .nav-link");

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener("click", () => {
      navOverlay.classList.toggle("is-active");
      document.body.classList.toggle("no-scroll");

      // Zorg ervoor dat de header-achtergrond zichtbaar is als het menu open is, zelfs bovenaan de pagina
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

  // --- 3. SWIPERJS SLIDER FOR REVIEWS ---
  if (typeof Swiper !== "undefined" && document.querySelector(".swiper")) {
    const swiper = new Swiper(".swiper", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  // --- 4. ANIMATE ON SCROLL (INTERSECTION OBSERVER) ---
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
});
