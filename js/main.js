const cards = document.querySelectorAll(".glitch-card");
const modal = document.getElementById("profileModal");
const modalBox = document.querySelector(".modal-content");

const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalBio = document.getElementById("modalBio");
const modalSkills = document.getElementById("modalSkills");

const modalGithub = document.getElementById("modalGithub");
const modalLinkedin = document.getElementById("modalLinkedin");
const modalEmail = document.getElementById("modalEmail");
const modalLive = document.getElementById("modalLive");

const videoWrapper = document.getElementById("videoWrapper");
const projectVideo = document.getElementById("projectVideo");
const projectIframe = document.getElementById("projectIframe");
const demoLabel = document.getElementById("demoLabel");

const closeBtn = document.querySelector(".close-btn");

const formLoadTime = Date.now();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

if (cards.length && modal) {
    cards.forEach(card => {
        card.addEventListener("click", () => {


            // RESET EVERYTHING
            modalBox.className = "modal-content";
            modalSkills.innerHTML = "";
            modalLinkedin.style.display = "none";
            modalEmail.style.display = "none";
            modalLive.style.display = "none";
            demoLabel.style.display = "none";
            videoWrapper.style.display = "none";

            projectVideo.pause();
            projectVideo.src = "";
            projectIframe.src = "";

            // ================= TEAM =================
            if (card.dataset.name) {
                modalName.textContent = card.dataset.name;
                modalRole.textContent = card.dataset.role;
                modalBio.textContent = card.dataset.bio;

                card.dataset.skills?.split(",").forEach(s => {
                    const span = document.createElement("span");
                    span.textContent = s.trim();
                    modalSkills.appendChild(span);
                });

                modalGithub.href = card.dataset.github || "#";
                modalLinkedin.href = card.dataset.linkedin || "#";
                modalEmail.href = `mailto:${card.dataset.email || ""}`;

                modalLinkedin.style.display = "inline-block";
                modalEmail.style.display = "inline-block";
            }

            // RESET
            modalBox.className = "modal-content";

            /* TEAM */
            if (card.dataset.type === "fullstack") modalBox.classList.add("modal-fullstack");
            if (card.dataset.type === "backend")   modalBox.classList.add("modal-backend");
            if (card.dataset.type === "uiux")      modalBox.classList.add("modal-uiux");

            /* PROJECT */
            if (card.dataset.type === "web")   modalBox.classList.add("modal-web");
            if (card.dataset.type === "cyber") modalBox.classList.add("modal-cyber");
            if (card.dataset.type === "ai")    modalBox.classList.add("modal-ai");



            // ================= PROJECT =================
            if (card.classList.contains("project")) {
                modalName.textContent = card.dataset.title;
                modalRole.textContent = card.querySelector(".role")?.textContent || "";
                modalBio.textContent = card.dataset.desc;

                card.dataset.tech?.split(",").forEach(t => {
                    const span = document.createElement("span");
                    span.textContent = t.trim();
                    modalSkills.appendChild(span);
                });

                modalGithub.href = card.dataset.github || "#";
                modalLive.href = card.dataset.live || "#";
                modalLive.style.display = "inline-block";

                if (card.dataset.video) {
                    demoLabel.style.display = "block";
                    videoWrapper.style.display = "block";

                    if (card.dataset.video.includes("youtube")) {
                        projectIframe.src = card.dataset.video;
                        projectIframe.style.display = "block";
                        projectVideo.style.display = "none";
                    } else {
                        projectVideo.src = card.dataset.video;
                        projectVideo.style.display = "block";
                        projectIframe.style.display = "none";
                    }
                }
            }

            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
            
            // PAUSE BACKGROUNDS
            window.pauseMatrix?.();
            window.pauseParticles?.();

        });
    });
}

if (closeBtn && modal) {
    closeBtn.onclick = closeModal;
    modal.onclick = e => e.target === modal && closeModal();
}


function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    projectVideo.pause();
    projectVideo.src = "";
    projectIframe.src = "";

    // RESUME BACKGROUNDS
    window.resumeMatrix?.();
    window.resumeParticles?.();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const text = toast.querySelector(".toast-message");

  text.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* ================= PROJECT FILTERS ================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".glitch-card.project");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        // Active state
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === "all" || card.dataset.type === filter) {
                card.style.opacity = "1";
                card.style.pointerEvents = "auto";
            } else {
                card.style.opacity = "0";
                card.style.pointerEvents = "none";
            }
        });

    });
});

/* ================= EMAILJS CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm && typeof emailjs !== "undefined") {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 🛑 Honeypot check
    const honeypot = document.getElementById("company");
    if (honeypot && honeypot.value.trim() !== "") {
      console.warn("SPAM BLOCKED (honeypot)");
      return; // silently block
    }

    if (Date.now() - formLoadTime < 3000) {
    console.warn("SPAM BLOCKED (too fast)");
    return;
    }

    emailjs.sendForm(
      "service_v95m5ia",
      "template_pks17ir",
      this
    ).then(
      () => {
        showToast("MESSAGE TRANSMITTED");
        contactForm.reset();
      },
      () => {
        showToast("TRANSMISSION FAILED");
      }
    );
  });
}


/* ================= PARTICLE BACKGROUND ================= */

const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particleCount = window.innerWidth < 768 ? 30 : 60;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,229,255,0.6)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ================= SCROLL GLITCH FLASH ================= */

const glitchSections = document.querySelectorAll(".glitch-section");

if ("IntersectionObserver" in window && glitchSections.length) {
  const glitchObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains("glitched")) {
          entry.target.classList.add("glitch-active", "glitched");

          setTimeout(() => {
            entry.target.classList.remove("glitch-active");
          }, 300);
        }
      });
    },
    { threshold: 0.4 }
  );

  glitchSections.forEach(section => glitchObserver.observe(section));
}

/* ================= HIGHLIGHT PROJECT ON REDIRECT ================= */

window.addEventListener("load", () => {
  const hash = window.location.hash;

  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  // Slight delay to ensure layout is ready
  setTimeout(() => {
    target.scrollIntoView({
    behavior: "smooth",
    block: "center"
    });
    target.classList.add("project-highlight");

    // Optional: remove class after animation
    setTimeout(() => {
      target.classList.remove("project-highlight");
    }, 1500);
  }, 300);
});


/* ================= AUTO-OPEN PROJECT MODAL ON REDIRECT ================= */

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target || !target.classList.contains("project")) return;

  // Scroll to project
  setTimeout(() => {
    target.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 200);

  // Highlight effect
  setTimeout(() => {
    target.classList.add("project-highlight");
  }, 500);

  // Auto-open modal
  setTimeout(() => {
    target.click(); // reuse existing modal logic
  }, 1200);

  // Cleanup highlight
  setTimeout(() => {
    target.classList.remove("project-highlight");
  }, 2000);
});

/* ================= MATRIX RAIN TOGGLE ================= */

/* ================= MATRIX RAIN (PAUSABLE) ================= */

document.addEventListener("DOMContentLoaded", () => {

  const matrixCanvas = document.getElementById("matrixCanvas");
  const matrixToggle = document.getElementById("matrixToggle");
  if (!matrixCanvas || !matrixToggle) return;

  const ctx = matrixCanvas.getContext("2d");

  let matrixActive = false;
  let matrixPaused = false;
  let matrixAnimationId;

  function resizeMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
  }
  resizeMatrix();
  window.addEventListener("resize", resizeMatrix);

  const chars = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 14;

  let columns = Math.floor(window.innerWidth / fontSize);
  let drops = new Array(columns).fill(0);

  function drawMatrix() {
    if (!matrixActive || matrixPaused) return;

    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    ctx.fillStyle = Math.random() > 0.5 ? "#ff003c" : "#00e5ff";
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, y * fontSize);

      if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });

    matrixAnimationId = requestAnimationFrame(drawMatrix);
  }

  // 🔓 GLOBAL CONTROLS (THIS IS THE FIX)
  window.pauseMatrix = () => {
    matrixPaused = true;
    cancelAnimationFrame(matrixAnimationId);
  };

  window.resumeMatrix = () => {
    if (matrixActive) {
      matrixPaused = false;
      drawMatrix();
    }
  };

  matrixToggle.addEventListener("click", () => {
    matrixActive = !matrixActive;

    if (matrixActive) {
      localStorage.setItem("matrixMode", "on");

      matrixCanvas.style.display = "block";
      drops = new Array(Math.floor(window.innerWidth / fontSize)).fill(0);
      matrixPaused = false;
      drawMatrix();
      matrixToggle.textContent = "EXIT MATRIX";
    } else {
      localStorage.setItem("matrixMode", "off");

      cancelAnimationFrame(matrixAnimationId);
      ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      matrixCanvas.style.display = "none";
      matrixToggle.textContent = "MATRIX MODE";
    }
  });

  // 🔁 RESTORE MATRIX MODE FROM STORAGE
  const savedMode = localStorage.getItem("matrixMode");

  if (savedMode === "on") {
    matrixActive = true;
    matrixCanvas.style.display = "block";
    drops = new Array(Math.floor(window.innerWidth / fontSize)).fill(0);
    matrixPaused = false;
    drawMatrix();
    matrixToggle.textContent = "EXIT MATRIX";
  }

});

/* ================= PARTICLES (PAUSABLE & SAFE) ================= */

(function () {
  const particleCanvas = document.getElementById("particles");
  if (!particleCanvas) return;

  const pctx = particleCanvas.getContext("2d");
  let particlesPaused = false;
  let particleFrameId;

  function resize() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const count = window.innerWidth < 768 ? 30 : 60;
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * particleCanvas.width,
    y: Math.random() * particleCanvas.height,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  }));

  function animate() {
    if (particlesPaused) return;

    pctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > particleCanvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > particleCanvas.height) p.dy *= -1;

      pctx.beginPath();
      pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pctx.fillStyle = "rgba(0,229,255,0.6)";
      pctx.fill();
    });

    particleFrameId = requestAnimationFrame(animate);
  }

  // 🔓 GLOBAL CONTROLS
  window.pauseParticles = () => {
    particlesPaused = true;
    cancelAnimationFrame(particleFrameId);
  };

  window.resumeParticles = () => {
    if (particlesPaused) {
      particlesPaused = false;
      animate();
    }
  };

  animate();
})();
