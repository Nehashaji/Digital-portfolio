// ==================== Code Particles ====================
const codeSymbols = ['</>', '{}', '[]', '()', 'AI', 'ML', 'JS', 'PY', 'HTML', 'CSS'];
const particleCount = 30;
const codeParticles = [];

// Create particles
for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.classList.add('code-particle');
  particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
  Object.assign(particle.style, {
    position: 'absolute',
    left: Math.random() * window.innerWidth + 'px',
    top: Math.random() * window.innerHeight + 'px',
    fontFamily: 'monospace',
    color: 'rgba(252,211,77,0.3)',
    fontSize: Math.random() * 14 + 10 + 'px',
    pointerEvents: 'none',
    userSelect: 'none'
  });
  document.body.appendChild(particle);

  codeParticles.push({
    el: particle,
    dy: Math.random() * 0.5 + 0.2,
    dx: (Math.random() - 0.5) * 0.2,
  });
}

// Animate code particles
function animateParticles() {
  codeParticles.forEach(p => {
    let top = parseFloat(p.el.style.top);
    let left = parseFloat(p.el.style.left);

    top -= p.dy;
    left += p.dx;

    // Reset to bottom if out of view
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


// Neural Particle Background for About Section
const canvas = document.getElementById("about-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = document.querySelector(".about-section").offsetHeight;

let particles = [];
const numParticles = 70;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
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
    ctx.fillStyle = "rgba(212,175,55,0.8)";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "gold";
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = "rgba(212,175,55,0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector(".about-section").offsetHeight;
  initParticles();
});

// ==================== Skills section ====================
const skillsData = [
  // Programming Languages
  { name: 'HTML', category: 'Programming Languages', proficiency: 95, icon: '🌐' },
  { name: 'CSS', category: 'Programming Languages', proficiency: 90, icon: '🎨' },
  { name: 'JavaScript', category: 'Programming Languages', proficiency: 85, icon: '⚡' },
  { name: 'Python', category: 'Programming Languages', proficiency: 75, icon: '🐍' },
  { name: 'C#', category: 'Programming Languages', proficiency: 65, icon: '🖥️' },
  { name: 'Kotlin', category: 'Programming Languages', proficiency: 70, icon: '📱' },
  { name: 'SQL', category: 'Programming Languages', proficiency: 50, icon: '🗄️' },

  // Frameworks & Tools
  { name: 'Node.js', category: 'Frameworks & Tools', proficiency: 70, icon: '💻' },
  { name: 'Unity', category: 'Frameworks & Tools', proficiency: 80, icon: '🎮' },
  { name: 'Tkinter', category: 'Frameworks & Tools', proficiency: 70, icon: '🖥️' },
  { name: 'Android Studio', category: 'Frameworks & Tools', proficiency: 70, icon: '📱' },
  { name: 'p5.js', category: 'Frameworks & Tools', proficiency: 90, icon: '🎨' },
  { name: 'Git & Version Control', category: 'Frameworks & Tools', proficiency: 80, icon: '🔧' },
  { name: 'Data Visualization', category: 'Frameworks & Tools', proficiency: 75, icon: '📊' },

  // Design Skills
  { name: 'Figma', category: 'Design Skills', proficiency: 75, icon: '🖌️' },
  { name: 'UI/UX', category: 'Design Skills', proficiency: 70, icon: '🎨' },
  { name: 'Storytelling & Interactive Media', category: 'Design Skills', proficiency: 70, icon: '📖' },

  // Soft Skills
  { name: 'Problem Solving', category: 'Soft Skills', proficiency: 75, icon: '💡' },
  { name: 'Collaboration', category: 'Soft Skills', proficiency: 90, icon: '🤝' },
  { name: 'Creative Thinking', category: 'Soft Skills', proficiency: 70, icon: '🧠' },
  { name: 'Communication & Presentation', category: 'Soft Skills', proficiency: 80, icon: '🗣️' },
];

const container = document.getElementById('skills-container');
const categories = [...new Set(skillsData.map(s => s.category))];

categories.forEach(category => {
  const catDiv = document.createElement('div');
  catDiv.classList.add('category');

  const title = document.createElement('h3');
  title.textContent = category;
  catDiv.appendChild(title);

  const grid = document.createElement('div');
  grid.classList.add('skills-grid');

  skillsData.filter(s => s.category === category).forEach((skill, index) => {
    const card = document.createElement('div');
    card.classList.add('skill-card');
    card.setAttribute('data-aos', 'fade-up'); // AOS animation
    card.setAttribute('data-aos-delay', `${index * 100}`);
    card.innerHTML = `
      <div class="skill-icon">${skill.icon}</div>
      <div class="skill-name">${skill.name}</div>
      <div class="progress-circle">
        <svg>
          <circle class="progress-bg" cx="40" cy="40" r="32"></circle>
          <circle class="progress-bar" cx="40" cy="40" r="32"></circle>
        </svg>
        <div class="progress-text">${skill.proficiency}%</div>
      </div>
    `;
    grid.appendChild(card);
  });

  catDiv.appendChild(grid);
  container.appendChild(catDiv);
});

// Animate skills circular progress
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.progress-bar');
      const text = entry.target.querySelector('.progress-text');
      if (!bar) return;
      const radius = bar.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const percent = parseFloat(text.textContent);

      bar.style.strokeDasharray = circumference;
      bar.style.strokeDashoffset = circumference;

      setTimeout(() => {
        bar.style.transition = 'stroke-dashoffset 1.5s ease';
        bar.style.strokeDashoffset = circumference * (1 - percent / 100);
      }, 100);

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));

// ==================== Project section ====================
const projectsData = [
  { title: 'Web/App Figma Design', description: 'Figma app & web designs, wireframes, responsive mockups.', image: 'Images/figma.gif', link: 'projects.html#figma' },
  { title: 'Web Development', description: 'Frontend websites, backend projects, fullstack demos.', image: 'Images/web-development.gif', link: 'projects.html#webdev' },
  { title: 'Creative Coding & Interactive Media', description: 'p5.js projects, Twine interactive stories, Python exercises, chatbots.', image: 'Images/creative-coding.gif', link: 'projects.html#creative' },
  { title: 'Game Development', description: 'Unity 2D games with interactive gameplay.', image: 'Images/game.gif', link: 'projects.html#games' },
  { title: 'Data & Analytics', description: 'Python Tkinter data-driven apps, Flourish visualizations.', image: 'Images/data.gif', link: 'projects.html#data' },
  { title: 'Mobile Apps', description: 'Android Studio smartphone apps.', image: 'Images/mobile.gif', link: 'projects.html#mobile' }
];

const topRow = document.getElementById('top-row');
const bottomRow = document.getElementById('bottom-row');

projectsData.forEach((project, index) => {
  const card = document.createElement('div');
  card.classList.add('project-card');
  card.setAttribute('data-aos', 'fade-up'); // AOS animation
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

// Initialize AOS
AOS.init({
  once: true,
  duration: 1000,
  easing: 'ease-out-cubic',
});
