// ==================== Smooth Scroll ====================
document.documentElement.style.scrollBehavior = "smooth";

// ==================== Code Particles ====================
const codeSymbols = ['</>', '{}', '[]', '()', 'AI', 'ML', 'JS', 'PY', 'HTML', 'CSS'];
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

    if (top < -20) top = window.innerHeight + 20;
    if (left < -20) left = window.innerWidth + 20;
    if (left > window.innerWidth + 20) left = -20;

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

// ==================== Skills section ====================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.skills-tabs .tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if(filter === 'all' || card.dataset.category === filter) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.pointerEvents = 'auto';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0)';
          card.style.pointerEvents = 'none';
        }
      });
    });
  });

  const progressBars = document.querySelectorAll('.progress-bar');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const bar = entry.target.querySelector('div');
        const percentSpan = entry.target.querySelector('.percent');
        const percentage = entry.target.dataset.percentage;
        bar.style.width = percentage + '%';
        let count = 0;
        const interval = setInterval(() => {
          if(count >= percentage) clearInterval(interval);
          percentSpan.textContent = count + '%';
          count++;
        }, 15);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => observer.observe(bar));
});

// Add CSS for smooth hiding/showing of skill cards
const style = document.createElement('style');
style.innerHTML = `
.skill-card {
  transition: transform 0.4s ease, opacity 0.4s ease;
  display: block; /* keep in layout */
}
`;
document.head.appendChild(style);

// ==================== Project section ====================
const projectsData = [
  { title: 'Data & Analytics', description: 'Python Tkinter data-driven apps, Flourish visualizations.', image: 'Images/data.gif', link: 'projects.html#data-analytics' },
  { title: 'Web Development', description: 'Frontend websites, backend projects, Client Projects.', image: 'Images/web-development.gif', link: 'projects.html#web-dev' },
  { title: 'Mobile Apps', description: 'Android Studio smartphone apps Kotlin.', image: 'Images/mobile.gif', link: 'projects.html#mobile-apps' },
  { title: 'Game Development', description: 'Unity 2D games with interactive gameplay.', image: 'Images/game.gif', link: 'projects.html#game-dev' },
  { title: 'Creative Coding & Interactive Media', description: 'p5.js projects, Twine interactive stories, chatbots.', image: 'Images/creative-coding.gif', link: 'projects.html#creative-coding' },
  { title: 'Web/App Figma Design', description: 'Figma App and mobile designs, wireframes.', image: 'Images/figma.gif', link: 'projects.html#figma-design' }
];

const topRow = document.getElementById('top-row');
const bottomRow = document.getElementById('bottom-row');

projectsData.forEach((project, index) => {
  const card = document.createElement('div');
  card.classList.add('project-card');
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-delay', `${index * 150}`);
  card.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="${project.title}">
    </div>
    <div class="project-content">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.link}" class="btn">View More</a>
    </div>
  `;
  if (index < 3) topRow.appendChild(card);
  else bottomRow.appendChild(card);
});

AOS.init({
  once: true,
  duration: 1000,
  easing: 'ease-out-cubic',
});

// ==================== Certificates Section Particles ====================
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particlesArray;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 215, 0, 0.7)";
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = 60;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 1;
    const speedY = (Math.random() - 0.5) * 1;
    particlesArray.push(new Particle(x, y, size, speedX, speedY));
  }
}
initParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
