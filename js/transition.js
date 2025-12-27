const overlay = document.querySelector(".page-overlay");
const links = document.querySelectorAll("a");

// Page enter
window.addEventListener("load", () => {
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.3,
    ease: "power1.out"
  });
});

// Page exit
links.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#") || href.startsWith("http")) return;

    e.preventDefault();

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power1.in",
      onComplete: () => {
        window.location.href = href;
      }
    });
  });
});


gsap.from(".team-card", {
  scrollTrigger: {
    trigger: ".team-grid",
    start: "top 80%"
  },
  opacity: 0,
  y: 40,
  stagger: 0.1,
  duration: 0.6,
  ease: "power3.out"
});

gsap.registerPlugin(ScrollTrigger);

gsap.from(".member-section", {
  scrollTrigger: {
    trigger: ".member-section",
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out"
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener("DOMContentLoaded", () => {
  const teamCards = document.querySelectorAll(".team-card");

  teamCards.forEach(card => {
    card.addEventListener("click", () => {
      const targetSelector = card.dataset.target;
      const target = document.querySelector(targetSelector);

      if (!target) {
        console.error("Target not found:", targetSelector);
        return;
      }

      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: 100
        },
        duration: 1,
        ease: "power3.inOut"
      });
    });
  });
});
