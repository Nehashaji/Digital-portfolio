// ==================== Smooth Scroll ====================
document.documentElement.style.scrollBehavior = "smooth";

// ==================== Cursor ====================
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// ==================== Code Particles ====================
const codeSymbols = ['</>', '{}', '[]', 'DATA', 'AI', 'ML', 'JS', 'PY', 'HTML', 'CSS', 'SQL'];
const particleCount = 30;
const codeParticles = [];

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('code-particle');
  particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
  Object.assign(particle.style, {
    position: 'absolute',
    left: Math.random() * window.innerWidth + 'px',
    top: Math.random() * window.innerHeight + 'px',
    fontFamily: 'monospace',
    color: 'rgba(252, 207, 60, 0.3)',
    fontSize: Math.random() * 14 + 10 + 'px',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 1
  });
  document.body.appendChild(particle);

  codeParticles.push({
    el: particle,
    dy: Math.random() * 0.5 + 0.2,
    dx: (Math.random() - 0.5) * 0.2,
  });
}

function animateParticles() {
  codeParticles.forEach(p => {
    let top = parseFloat(p.el.style.top);
    let left = parseFloat(p.el.style.left);

    top -= p.dy;
    left += p.dx;

    if (top < -30) top = window.innerHeight + 20;
    if (left < -30) left = window.innerWidth + 20;
    if (left > window.innerWidth + 10) left = -20;

    p.el.style.top = top + 'px';
    p.el.style.left = left + 'px';
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ==================== Hamburger Menu ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');

  if (navLinks.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden'; 
  }
});

document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
  });
});

// ===================== ABOUT SECTION PARTICLES =====================
const aboutCanvas = document.getElementById("about-canvas");
const aboutCtx = aboutCanvas.getContext("2d");

function resizeAboutCanvas() {
  aboutCanvas.width = aboutCanvas.parentElement.offsetWidth;
  aboutCanvas.height = aboutCanvas.parentElement.offsetHeight;
}
resizeAboutCanvas();
window.addEventListener("resize", resizeAboutCanvas);

let aboutParticles = [];
const aboutNumParticles = 70;

class AboutParticle {
  constructor() {
    this.x = Math.random() * aboutCanvas.width;
    this.y = Math.random() * aboutCanvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.speedX = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > aboutCanvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > aboutCanvas.height) this.speedY *= -1;
  }
  draw() {
    aboutCtx.fillStyle = "rgba(191,167,96,0.8)";
    aboutCtx.beginPath();
    aboutCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    aboutCtx.fill();
  }
}

function initAboutParticles() {
  aboutParticles = [];
  for (let i = 0; i < aboutNumParticles; i++) {
    aboutParticles.push(new AboutParticle());
  }
}

function animateAboutParticles() {
  aboutCtx.clearRect(0, 0, aboutCanvas.width, aboutCanvas.height);
  aboutParticles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateAboutParticles);
}

initAboutParticles();
animateAboutParticles();


/* ============================================
 Glowing Dots Background
   ============================================ */

(function () {
  const canvas = document.getElementById('cc-dots-canvas');
  if (!canvas) return;

  const section = canvas.closest('.cc-section');
  if (!section) return;

  const ctx = canvas.getContext('2d');
  canvas.style.opacity = '0.5';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 700px)').matches;

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const DOT_COUNT = isSmallScreen ? 28 : 55;

  let width = 0, height = 0;
  let dots = [];
  let running = false;
  let rafId = null;
  let startTime = null;

  function resize() {
    width = section.offsetWidth;
    height = section.offsetHeight;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    buildDots();
  }

  function buildDots() {
    dots = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.9,
      // slow constant drift in a random direction
      vx: (Math.random() - 0.5) * 6,  // px per second
      vy: (Math.random() - 0.5) * 6,
      baseAlpha: Math.random() * 0.4 + 0.4,
      twinklePeriod: Math.random() * 4 + 4, // seconds
      twinklePhase: Math.random() * Math.PI * 2
    }));
  }

  function drawDot(x, y, r, alpha) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(228, 193, 112, ${alpha})`;
    ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
    ctx.shadowBlur = 9;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function drawStaticFrame() {
    ctx.clearRect(0, 0, width, height);
    dots.forEach(d => drawDot(d.x, d.y, d.r, d.baseAlpha));
  }

  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;

    ctx.clearRect(0, 0, width, height);

    dots.forEach(d => {
      // drift, frame-rate independent — 1/60s reference step
      d.x += d.vx / 60;
      d.y += d.vy / 60;

      // wrap around the edges with a little padding
      if (d.x < -10) d.x = width + 10;
      if (d.x > width + 10) d.x = -10;
      if (d.y < -10) d.y = height + 10;
      if (d.y > height + 10) d.y = -10;

      const twinkle = 0.5 + 0.5 * Math.sin(elapsed * (2 * Math.PI / d.twinklePeriod) + d.twinklePhase);
      const alpha = d.baseAlpha * (0.5 + 0.5 * twinkle);

      drawDot(d.x, d.y, d.r, alpha);
    });

    if (running) rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running || dots.length === 0) return;
    running = true;
    startTime = null;
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  resize();

  if (reduceMotion) {
    drawStaticFrame();
  } else {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => (entry.isIntersecting ? start() : stop())),
      { threshold: 0.05 }
    );
    observer.observe(section);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (reduceMotion) drawStaticFrame();
    }, 200);
  });
})();

/* ============================================
   PROJECT DETAILS MODAL
   =================== */

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('pdModalOverlay');
  const closeBtn = document.getElementById('pdModalClose');
  const modalTitle = document.getElementById('pdModalTitle');
  const modalSubtitle = document.getElementById('pdModalSubtitle');
  const modalTags = document.getElementById('pdModalTags');
  const modalBody = document.getElementById('pdModalBody');

  if (!overlay) return;

  let lastFocusedEl = null;

  function openModal(projectKey) {
    const template = document.getElementById('tpl-' + projectKey);
    if (!template) return;

    const fragment = template.content.cloneNode(true);

    // the first element carries the title/subtitle/tags as data attributes
    const meta = fragment.querySelector('.pd-tags-src');
    if (meta) {
      modalTitle.textContent = meta.dataset.title || '';
      modalSubtitle.textContent = meta.dataset.subtitle || '';
      modalTags.innerHTML = (meta.dataset.tags || '')
        .split(',')
        .map(tag => `<span>${tag.trim()}</span>`)
        .join('');
      meta.remove();
    }

    modalBody.innerHTML = '';
    modalBody.appendChild(fragment);

    lastFocusedEl = document.activeElement;
    overlay.classList.add('active');
    document.body.classList.add('pd-modal-open');
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.classList.remove('pd-modal-open');
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  // open on any "View Details" button
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.project));
  });

  // close via the X button
  closeBtn.addEventListener('click', closeModal);

  // close by clicking the dark overlay (but not the modal itself)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
});

/* ============================================
   CERTIFICATES SECTION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('cert-particles-canvas');

  if (!canvas) {
    console.warn(
      '[certificates particles] No element with id="cert-particles-canvas" found.'
    );
    return;
  }

  const section = canvas.closest('.certificates-section');
  if (!section) {
    console.warn('[certificates particles] Canvas found, but not inside .certificates-section.');
    return;
  }

  const ctx = canvas.getContext('2d');

  // near-full — brightness is now controlled per-dot below,
  // not stacked on top of a dim canvas-level opacity
  canvas.style.opacity = '0.9';

  const isSmallScreen = window.matchMedia('(max-width: 700px)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const DOT_COUNT = isSmallScreen ? 30 : 60;

  let width = 0, height = 0;
  let dots = [];
  let running = false;
  let rafId = null;
  let startTime = null;

  function resize() {
    width = section.offsetWidth;
    height = section.offsetHeight;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    buildDots();
  }

  function buildDots() {
    dots = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 1.1,
      vx: (Math.random() - 0.5) * 10,   
      vy: (Math.random() - 0.5) * 10,
      baseAlpha: Math.random() * 0.35 + 0.55,
      twinklePeriod: Math.random() * 3 + 3,     
      twinklePhase: Math.random() * Math.PI * 2
    }));
  }

  function drawDot(x, y, r, alpha) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230, 195, 110, ${alpha})`;
    ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
    ctx.shadowBlur = 9;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;

    ctx.clearRect(0, 0, width, height);

    dots.forEach(d => {
      d.x += d.vx / 60;
      d.y += d.vy / 60;

      if (d.x < -10) d.x = width + 10;
      if (d.x > width + 10) d.x = -10;
      if (d.y < -10) d.y = height + 10;
      if (d.y > height + 10) d.y = -10;

      const twinkle = 0.6 + 0.4 * Math.sin(elapsed * (2 * Math.PI / d.twinklePeriod) + d.twinklePhase);
      drawDot(d.x, d.y, d.r, d.baseAlpha * twinkle);
    });

    if (running) rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running || dots.length === 0) return;
    running = true;
    startTime = null;
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  resize();

  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => (entry.isIntersecting ? start() : stop())),
    { threshold: 0.05 }
  );
  observer.observe(section);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
});