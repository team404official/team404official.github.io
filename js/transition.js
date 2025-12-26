const overlay = document.querySelector(".page-overlay");
const links = document.querySelectorAll("a");

links.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    // Allow external links
    if (href.startsWith("http") || href.startsWith("#")) return;

    e.preventDefault();

    gsap.to(overlay, {
      scaleY: 1,
      transformOrigin: "bottom",
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: () => {
        window.location.href = href;
      }
    });
  });
});

// Animate overlay out on page load
gsap.fromTo(
  overlay,
  { scaleY: 1, transformOrigin: "top" },
  {
    scaleY: 0,
    duration: 0.6,
    ease: "power4.inOut"
  }
);

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
