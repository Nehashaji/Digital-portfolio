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

// ==================== Project section ====================
const projectsData = [
  { 
    title: 'Data Exploration & Machine Learning', 
    description: 'Hands-on machine learning projects using Python, including predictive modeling, regression and classification tasks, CNN experimentation, and interactive data visualizations that demonstrate applied data-driven insights.',
    image: 'Images/data.gif', 
    link: 'projects.html#data-analytics' 
  },
  { 
    title: 'Full-Stack Web & UI/UX Design', 
    description: 'Full-stack web projects including client-based and academic builds, complemented with professional Figma UI/UX designs, wireframes, and responsive web applications, showcasing practical application of web technologies.', 
    image: 'Images/web-development.gif', 
    link: 'projects.html#web-dev' 
  },
  { 
    title: 'Interactive & Creative Media', 
    description: 'Experimental projects exploring physical computing, mobile development, game design, creative coding, and conversational systems. Demonstrates technical creativity, interactive design, and innovative problem-solving across both digital and physical environments.', 
    image: 'Images/creative-coding.gif', 
    link: 'projects.html#interactive-media' 
  }
];

const topRow = document.getElementById('top-row');

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
  topRow.appendChild(card);
});

// Initialize AOS
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
