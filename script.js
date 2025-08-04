document.addEventListener("DOMContentLoaded", () => {
  // --- 1. "ON-SCROLL-UP" HEADER LOGIC ---
  const headerBg = document.querySelector(".header-background");
  let lastScrollY = window.scrollY;

  if (headerBg) {
    window.addEventListener("scroll", () => {
      if (lastScrollY < window.scrollY && window.scrollY > 150) {
        // Scrolled down
        headerBg.classList.remove("is-visible");
      } else if (window.scrollY > 50) {
        // Scrolled up
        headerBg.classList.add("is-visible");
      } else {
        // At top of page
        headerBg.classList.remove("is-visible");
      }
      lastScrollY = window.scrollY;
    });
  }

  // --- 2. IMMERSIVE NAVIGATION OVERLAY LOGIC ---
  const menuToggle = document.querySelector(".header-menu-toggle");
  const navOverlay = document.querySelector(".nav-overlay");
  const navOverlayLinks = document.querySelectorAll(".nav-overlay .nav-link");
  const hoverImageContainer = document.querySelector(".nav-hover-image");

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener("click", () => {
      navOverlay.classList.toggle("is-active");
      document.body.classList.toggle("no-scroll");
    });

    navOverlayLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navOverlay.classList.remove("is-active");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  // --- 3. INTERACTIVE HOVER IMAGE LOGIC ---
  if (hoverImageContainer && navOverlayLinks) {
    navOverlayLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        const imageUrl = link.getAttribute("data-img");
        if (imageUrl) {
          hoverImageContainer.style.backgroundImage = `url(${imageUrl})`;
          hoverImageContainer.style.opacity = "1";
          hoverImageContainer.style.transform = "scale(1) rotate(-3deg)";
        }
      });

      link.addEventListener("mouseleave", () => {
        hoverImageContainer.style.opacity = "0";
        hoverImageContainer.style.transform = "scale(0.8) rotate(0deg)";
      });
    });

    window.addEventListener("mousemove", (e) => {
      if (window.innerWidth > 768) {
        hoverImageContainer.style.left = `${e.clientX + 20}px`;
        hoverImageContainer.style.top = `${e.clientY - 200}px`;
      }
    });
  }

  // --- 4. SWIPERJS SLIDER FOR REVIEWS ---
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
});
