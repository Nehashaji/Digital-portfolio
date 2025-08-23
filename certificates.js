//  AOS init
AOS.init({
  duration: 900,
  once: true,
  easing: 'ease-out-cubic',
});

//  Category Filters
const tabs = document.querySelectorAll('.cert-tabs .tab');
const cards = document.querySelectorAll('.cert-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // active state
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.getAttribute('data-filter');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const show = filter === 'all' || category === filter;
      card.style.display = show ? 'block' : 'none';
    });

    // refresh AOS when DOM visibility changes
    setTimeout(() => AOS.refreshHard(), 50);
  });
});


//  Particle Background
// Particle system scoped to the section 
const canvas = document.getElementById('cert-particles');
const ctx = canvas.getContext('2d');
const section = document.querySelector('.certificates-section');

let particles = [];
let particleCount = 100; 
let animationId;

function sizeCanvas() {
  // match canvas to section size
  canvas.width = section.clientWidth;
  canvas.height = section.clientHeight;
}

class Particle {
  constructor() {
    this.reset(true);
  }
  reset(initial = false) {
    
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : canvas.height + Math.random() * 20;
    this.size = Math.random() * 2 + 0.8;
    this.speedY = Math.random() * 0.6 + 0.2; 
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.alpha  = Math.random() * 0.6 + 0.3;
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -10 || this.x < -20 || this.x > canvas.width + 20) {
      this.reset(false);
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,215,0,${this.alpha})`;
    ctx.shadowColor = 'rgba(255,215,0,0.7)';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  animationId = requestAnimationFrame(animate);
}

function startParticles() {
  cancelAnimationFrame(animationId);
  sizeCanvas();
  initParticles();
  animate();
}

// Resize / observe section size changes
window.addEventListener('resize', startParticles);

// If section height changes due to fonts/images, observe it
const ro = new ResizeObserver(startParticles);
ro.observe(section);

// Start
startParticles();
