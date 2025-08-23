(() => {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height, particles, RAF;
  const MAX_PARTICLES = 50;        // desktop
  const MAX_PARTICLES_MOBILE = 30; // mobile
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const GOLD_GRAD = (x, y, r) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(255,223,100,0.95)");
    g.addColorStop(0.5, "rgba(212,175,55,0.65)");
    g.addColorStop(1, "rgba(212,175,55,0.05)");
    return g;
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    init();
  }

  function init() {
    const count = width < 768 ? MAX_PARTICLES_MOBILE : MAX_PARTICLES;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 3 + 1.5
    }));
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = GOLD_GRAD(p.x, p.y, p.r * 3);
    ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      drawParticle(p);
    }

    RAF = requestAnimationFrame(draw);
  }

  function start() {
    if (REDUCED) return;
    stop();
    resize();
    draw();
  }
  function stop() {
    if (RAF) cancelAnimationFrame(RAF);
  }

  window.addEventListener("resize", () => {
    stop();
    setTimeout(start, 150);
  });

  start();
})();
