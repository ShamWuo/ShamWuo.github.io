// Smooth scroll for navigation
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

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

// Hero animation
window.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = 0;
        hero.style.transform = 'translateY(40px)';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s, transform 1s';
            hero.style.opacity = 1;
            hero.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Project hover effect (extra animation)
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.style.boxShadow = '0 12px 32px rgba(0,0,0,0.22)';
    });
    project.addEventListener('mouseleave', () => {
        project.style.boxShadow = '';
    });
});

// Section transition wave effect with SVG and direction
const sections = document.querySelectorAll('main section');
let lastSectionIdx = 0;
let lastScrollY = window.scrollY;
let waveSvg = document.getElementById('section-wave-svg');
let waveBg = document.getElementById('section-wave-bg');
if (!waveSvg) {
    waveBg = document.createElement('div');
    waveBg.id = 'section-wave-bg';
    waveBg.style.position = 'fixed';
    waveBg.style.top = '0';
    waveBg.style.left = '0';
    waveBg.style.width = '100vw';
    waveBg.style.height = '100vh';
    waveBg.style.zIndex = '-2';
    waveBg.style.background = '#181818';
    waveBg.style.transition = 'background 0.8s';
    document.body.appendChild(waveBg);
    waveSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    waveSvg.setAttribute('id', 'section-wave-svg');
    waveSvg.setAttribute('width', '100vw');
    waveSvg.setAttribute('height', '100vh');
    waveSvg.setAttribute('viewBox', '0 0 1440 900');
    waveSvg.style.position = 'fixed';
    waveSvg.style.top = '0';
    waveSvg.style.left = '0';
    waveSvg.style.width = '100vw';
    waveSvg.style.height = '100vh';
    waveSvg.style.zIndex = '-1';
    waveSvg.style.pointerEvents = 'none';
    waveSvg.style.opacity = '0';
    waveSvg.style.transition = 'opacity 0.8s';
    document.body.appendChild(waveSvg);
}
function animateWave(direction, color) {
    // Animate SVG wave path
    let path = document.getElementById('section-wave-path');
    if (!path) {
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('id', 'section-wave-path');
        waveSvg.appendChild(path);
    }
    if (direction === 'down') {
        // Top right to bottom left
        path.setAttribute('d', 'M1440,0 Q720,450 0,900 L0,0 Z');
    } else {
        // Bottom left to top right
        path.setAttribute('d', 'M0,900 Q720,450 1440,0 L1440,900 Z');
    }
    path.setAttribute('fill', color);
    waveSvg.style.opacity = '1';
    setTimeout(() => { waveSvg.style.opacity = '0'; }, 900);
}
function getSectionIndex(section) {
    return Array.from(sections).indexOf(section);
}
window.addEventListener('scroll', () => {
    let current = null;
    for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight/2 && rect.bottom > window.innerHeight/2) {
            current = section;
            break;
        }
    }
    if (current) {
        const idx = getSectionIndex(current);
        if (idx !== lastSectionIdx) {
            const direction = idx > lastSectionIdx ? 'down' : 'up';
            if (direction === 'down') {
                waveBg.style.background = '#e0e0e0';
                animateWave('down', '#e0e0e0');
            } else {
                waveBg.style.background = '#181818';
                animateWave('up', '#181818');
            }
            lastSectionIdx = idx;
        }
    }
    lastScrollY = window.scrollY;
});

// Interactive Floating Dots Canvas
const dotsCanvas = document.createElement('canvas');
dotsCanvas.id = 'dots-canvas';
document.body.appendChild(dotsCanvas);
const ctx = dotsCanvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
dotsCanvas.width = width;
dotsCanvas.height = height;
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dotsCanvas.width = width;
    dotsCanvas.height = height;
});
const DOTS = 60;
const dots = Array.from({length: DOTS}, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 2 + Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7
}));
function drawDots() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < DOTS; i++) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = '#f5f5f5';
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
        // Connect nearby dots
        for (let j = i + 1; j < DOTS; j++) {
            const other = dots[j];
            const dist = Math.hypot(dot.x - other.x, dot.y - other.y);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = '#f5f5f5';
                ctx.globalAlpha = 0.15;
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
