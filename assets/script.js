dotsCanvas.style.position = 'fixed';
dotsCanvas.style.top = '0';
dotsCanvas.style.left = '0';
dotsCanvas.style.width = '100vw';
dotsCanvas.style.height = '100vh';
dotsCanvas.style.zIndex = '0';
dotsCanvas.style.pointerEvents = 'none';
dotsCanvas.style.opacity = '0.25';
document.body.appendChild(dotsCanvas);
dotsCanvas.width = width;
dotsCanvas.height = height;


// Responsive nav toggle
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
}

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        target.focus({ preventScroll: true });
      }
      if (navList.classList.contains('open')) navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const bgGlass = document.getElementById('bg-glass');
let darkMode = true;
if (themeToggle && bgGlass) {
  themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('light', !darkMode);
    bgGlass.style.background = darkMode
      ? 'linear-gradient(120deg, #23243a 0%, #18181f 100%)'
      : 'linear-gradient(120deg, #f5f5fa 0%, #e3e6f3 100%)';
    document.body.style.color = darkMode ? '#f5f5f5' : '#23243a';
  });
}

// Typing effect in hero
const typed = document.getElementById('typed');
const typingPhrases = [
  'Web Innovator.',
  'UI/UX Enthusiast.',
  'Open Source Fan.',
  'Generative Artist.',
  'React & Node.js Dev.',
  'Lifelong Learner.'
];
let typingIdx = 0, charIdx = 0, typingDir = 1;
function typeLoop() {
  if (!typed) return;
  const phrase = typingPhrases[typingIdx];
  if (typingDir === 1) {
    charIdx++;
    if (charIdx > phrase.length) {
      typingDir = -1;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    charIdx--;
    if (charIdx < 0) {
      typingDir = 1;
      typingIdx = (typingIdx + 1) % typingPhrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
  }
  typed.textContent = phrase.slice(0, charIdx);
  setTimeout(typeLoop, typingDir === 1 ? 80 : 40);
}
typeLoop();

// Morphing SVG blob
const blobBtn = document.getElementById('blob-morph');
const blobPath = document.getElementById('blob');
const blobShapes = [
  'M44.8,-67.7C57.1,-59.2,65.9,-45.1,70.3,-30.7C74.7,-16.3,74.7,-1.6,71.2,12.2C67.7,26,60.7,38.8,50.7,48.6C40.7,58.4,27.7,65.2,13.7,69.2C-0.3,73.2,-15.3,74.3,-28.2,69.1C-41.1,63.9,-51.9,52.4,-60.2,39.7C-68.5,27,-74.3,13.1,-74.2,-1.1C-74.1,-15.3,-68.1,-30.7,-58.2,-41.7C-48.3,-52.7,-34.6,-59.2,-20.2,-65.2C-5.8,-71.2,9.3,-76.7,24.2,-75.5C39.1,-74.3,54,-66.2,44.8,-67.7Z',
  'M54.2,-66.7C67.2,-56.2,72.7,-33.2,70.2,-13.7C67.7,5.8,57.2,21.7,45.2,34.7C33.2,47.7,19.6,57.8,3.7,59.2C-12.2,60.6,-24.4,53.2,-36.2,44.2C-48,35.2,-59.4,24.6,-65.2,10.7C-71,-3.2,-71.2,-20.4,-62.7,-32.2C-54.2,-44,-37,-50.4,-20.2,-58.2C-3.4,-66,12.9,-75.2,28.2,-74.2C43.5,-73.2,58.8,-62.2,54.2,-66.7Z',
  'M38.2,-60.7C51.2,-54.2,62.2,-43.2,67.2,-29.7C72.2,-16.2,71.2,-0.2,66.2,14.7C61.2,29.6,52.2,43.4,39.2,51.2C26.2,59,9.1,60.8,-6.7,62.2C-22.5,63.6,-45,64.6,-54.2,54.2C-63.4,43.8,-59.2,21.9,-59.2,0.1C-59.2,-21.7,-63.4,-43.4,-54.2,-53.8C-45,-64.2,-22.5,-63.4,-6.7,-62C9.1,-60.6,26.2,-67.2,38.2,-60.7Z',
  'M47.2,-67.7C60.2,-59.2,67.9,-45.1,72.3,-30.7C76.7,-16.3,77.7,-1.6,74.2,12.2C70.7,26,62.7,38.8,52.7,48.6C42.7,58.4,30.7,65.2,16.7,69.2C2.7,73.2,-13.3,74.3,-26.2,69.1C-39.1,63.9,-48.9,52.4,-57.2,39.7C-65.5,27,-72.3,13.1,-72.2,-1.1C-72.1,-15.3,-66.1,-30.7,-56.2,-41.7C-46.3,-52.7,-32.6,-59.2,-18.2,-65.2C-3.8,-71.2,11.3,-76.7,26.2,-75.5C41.1,-74.3,56,-66.2,47.2,-67.7Z'
];
let blobIdx = 0;
if (blobBtn && blobPath) {
  blobBtn.addEventListener('click', () => {
    blobIdx = (blobIdx + 1) % blobShapes.length;
    blobPath.setAttribute('d', blobShapes[blobIdx]);
  });
}

// Inspire Me random quote
const quoteBtn = document.getElementById('random-quote');
const quoteBox = document.getElementById('quote-box');
const quotes = [
  '“Simplicity is the soul of efficiency.” – Austin Freeman',
  '“Code is like humor. When you have to explain it, it’s bad.” – Cory House',
  '“Creativity is intelligence having fun.” – Albert Einstein',
  '“First, solve the problem. Then, write the code.” – John Johnson',
  '“Design is not just what it looks like and feels like. Design is how it works.” – Steve Jobs',
  '“The best way to predict the future is to invent it.” – Alan Kay',
  '“Stay hungry, stay foolish.” – Steve Jobs',
  '“Make it work, make it right, make it fast.” – Kent Beck'
];
if (quoteBtn && quoteBox) {
  quoteBtn.addEventListener('click', () => {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.textContent = q;
    quoteBox.classList.remove('hidden');
    setTimeout(() => quoteBox.classList.add('hidden'), 6000);
  });
}

// Project 3D tilt and filter
const projects = document.querySelectorAll('.project.tilt');
projects.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = (x - cx) / cx, dy = (y - cy) / cy;
    card.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg) scale(1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
document.querySelectorAll('.project-3d-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = btn.closest('.project');
    card.classList.toggle('is-3d');
  });
});
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projects.forEach(card => {
      if (filter === 'all' || card.dataset.type === filter || (filter === 'random' && Math.random() > 0.5)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Contact form random fill and fun fact
const contactRandom = document.getElementById('contact-random');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const funFactBox = document.getElementById('contact-fun-fact');
const funFacts = [
  'Did you know? The first website ever is still online!',
  'Fun fact: JavaScript was created in just 10 days.',
  'CSS stands for Cascading Style Sheets.',
  'The first computer bug was an actual moth.',
  'The "@" symbol was chosen for email because it was rarely used.'
];
if (contactRandom && nameInput && emailInput && messageInput && funFactBox) {
  contactRandom.addEventListener('click', () => {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Linus Torvalds', 'Margaret Hamilton'];
    const emails = ['ada@code.com', 'grace@navy.mil', 'alan@bletchley.uk', 'linus@linux.org', 'margaret@apollo.nasa'];
    const messages = [
      'Hello! I love your work.',
      'Can we collaborate on a project?',
      'What inspires your creativity?',
      'How did you build this site?',
      'Let’s connect and chat tech!'
    ];
    nameInput.value = names[Math.floor(Math.random() * names.length)];
    emailInput.value = emails[Math.floor(Math.random() * emails.length)];
    messageInput.value = messages[Math.floor(Math.random() * messages.length)];
    funFactBox.textContent = funFacts[Math.floor(Math.random() * funFacts.length)];
    funFactBox.classList.remove('hidden');
    setTimeout(() => funFactBox.classList.add('hidden'), 6000);
  });
}

// Contact form handler
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = 'Thank you for reaching out! I will get back to you soon.';
    form.reset();
  });
}

// Live year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Floating Dots (Stars) Canvas (prevent duplicate)
let dotsCanvas = document.getElementById('dots-canvas');
if (!dotsCanvas) {
  dotsCanvas = document.createElement('canvas');
  dotsCanvas.id = 'dots-canvas';
  dotsCanvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dotsCanvas);
}
dotsCanvas.style.position = 'fixed';
dotsCanvas.style.top = '0';
dotsCanvas.style.left = '0';
dotsCanvas.style.width = '100vw';
dotsCanvas.style.height = '100vh';
dotsCanvas.style.zIndex = '-1';
dotsCanvas.style.pointerEvents = 'none';
dotsCanvas.style.opacity = '0.18';

let width = window.innerWidth;
let height = window.innerHeight;
function setCanvasSize() {
  width = window.innerWidth;
  height = window.innerHeight;
  dotsCanvas.width = width;
  dotsCanvas.height = height;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

const ctx = dotsCanvas.getContext('2d');
const DOTS = 70;
const dots = Array.from({length: DOTS}, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: 1.5 + Math.random() * 1.8,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5
}));
function drawDots() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < DOTS; i++) {
    const dot = dots[i];
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fillStyle = '#7f9cf5';
    ctx.globalAlpha = 0.7;
    ctx.shadowColor = '#7f9cf5';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    // Connect nearby dots
    for (let j = i + 1; j < DOTS; j++) {
      const other = dots[j];
      const dist = Math.hypot(dot.x - other.x, dot.y - other.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = '#7f9cf5';
        ctx.globalAlpha = 0.10;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}
function updateDots() {
  for (const dot of dots) {
    dot.x += dot.dx;
    dot.y += dot.dy;
    if (dot.x < 0 || dot.x > width) dot.dx *= -1;
    if (dot.y < 0 || dot.y > height) dot.dy *= -1;
  }
}
function animateDots() {
  updateDots();
  drawDots();
  requestAnimationFrame(animateDots);
}
animateDots();

// Scroll-to-top button (robust)
const scrollTopBtn = document.getElementById('scroll-top');
function handleScrollTopBtn() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 300) scrollTopBtn.style.display = 'block';
  else scrollTopBtn.style.display = 'none';
}
window.addEventListener('scroll', handleScrollTopBtn);
window.addEventListener('DOMContentLoaded', handleScrollTopBtn);
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollTopBtn.blur();
  });
}

// Section reveal on scroll (polished: add animation delay)
const reveals = document.querySelectorAll('.reveal');
function revealSections() {
  const trigger = window.innerHeight * 0.85;
  let delay = 0;
  reveals.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) {
      sec.classList.add('visible');
      sec.style.transitionDelay = delay + 'ms';
      delay += 120;
    } else {
      sec.classList.remove('visible');
      sec.style.transitionDelay = '0ms';
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Focus visible for accessibility
window.addEventListener('keydown', e => {
  if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});
window.addEventListener('mousedown', () => {
  document.body.classList.remove('user-is-tabbing');
});

// Add aria-live to form message for better feedback
if (formMessage) {
  formMessage.setAttribute('aria-live', 'polite');
}

// Add focus to first error in contact form (if any)
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = 'Thank you for reaching out! I will get back to you soon.';
    form.reset();

    // Add focus to first error if present
    const firstError = form.querySelector('.input-error:not(:empty)');
    if (firstError) {
      const input = form.querySelector(`#${firstError.id.replace('-error','')}`);
      if (input) input.focus();
    }
  });
}

// Easter egg
const easterEgg = document.getElementById('easter-egg');
let eggSeq = '', eggCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
window.addEventListener('keydown', e => {
  eggSeq += e.key;
  if (eggSeq.length > eggCode.length) eggSeq = eggSeq.slice(-eggCode.length);
  if (eggSeq.toLowerCase() === eggCode) {
    easterEgg.textContent = '🎉 Konami Code! You found the secret! 🎉';
    easterEgg.classList.remove('hidden');
    setTimeout(() => easterEgg.classList.add('hidden'), 7000);
    eggSeq = '';
  }
});
