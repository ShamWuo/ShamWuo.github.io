// Generate random SVG lines for the background, with center point inside the SVG area
// Only generate and show SVG lines after DOMContentLoaded to prevent flash
window.addEventListener('DOMContentLoaded', () => {
  const bgLinesSVG = document.getElementById('bg-lines');
  if (bgLinesSVG) {
    const numLines = 12;
    let linesHTML = '';
    for (let i = 0; i < numLines; i++) {
      // Center point inside 0-100% for both x and y
      const cx = (Math.random() * 100).toFixed(1);
      const cy = (Math.random() * 100).toFixed(1);
      // Random angle and length
      const angle = Math.random() * Math.PI * 2;
      const len = 60 + Math.random() * 80;
      // Endpoints calculated from center
      const x1 = (parseFloat(cx) + Math.cos(angle) * len/2).toFixed(1) + '%';
      const y1 = (parseFloat(cy) + Math.sin(angle) * len/2).toFixed(1) + '%';
      const x2 = (parseFloat(cx) - Math.cos(angle) * len/2).toFixed(1) + '%';
      const y2 = (parseFloat(cy) - Math.sin(angle) * len/2).toFixed(1) + '%';
      const width = (Math.random() * 0.8 + 1).toFixed(2);
      linesHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e5e5e5" stroke-width="${width}"/>`;
    }
    bgLinesSVG.innerHTML = linesHTML;
    // Add transition class for flying effect
    bgLinesSVG.classList.add('bg-lines-fly');
    // Hide and move lines off-screen initially to prevent flash
    bgLinesSVG.style.opacity = '0';
    bgLinesSVG.style.transform = 'scale(0.8) translateY(60px)';
    // Animate SVG lines so all move in relation to the center, and scrolling impacts their movement
    const svgLines = document.querySelectorAll('#bg-lines line');
    let lastScrollY = window.scrollY || window.pageYOffset;
    let scrollVelocity = 0;
    let scrollMomentum = 0;
    window.addEventListener('scroll', () => {
      const newY = window.scrollY || window.pageYOffset;
      scrollVelocity = newY - lastScrollY;
      lastScrollY = newY;
    });
    svgLines.forEach((line, i) => {
      const origX1 = parseFloat(line.getAttribute('x1'));
      const origY1 = parseFloat(line.getAttribute('y1'));
      const origX2 = parseFloat(line.getAttribute('x2'));
      const origY2 = parseFloat(line.getAttribute('y2'));
      function animateLine() {
        const t = Date.now()/1200 + i*0.7;
        // Scroll impact: accumulate momentum, decay over time
        scrollMomentum += (scrollVelocity * 0.18 - scrollMomentum) * 0.08;
        // Calculate offset from center for each endpoint
        const dx1 = origX1 - 50;
        const dy1 = origY1 - 50;
        const dx2 = origX2 - 50;
        const dy2 = origY2 - 50;
        // Animate endpoints radially from center, add scrollMomentum to phase
        const mag = 2 + 1.2*Math.sin(t*0.7 + i);
        const phase = t + i*0.5 + scrollMomentum * 0.12;
        const x1 = 50 + dx1 + Math.sin(phase) * dx1 * mag / 100;
        const y1 = 50 + dy1 + Math.cos(phase) * dy1 * mag / 100;
        const x2 = 50 + dx2 + Math.sin(phase+1) * dx2 * mag / 100;
        const y2 = 50 + dy2 + Math.cos(phase+1) * dy2 * mag / 100;
        line.setAttribute('x1', x1 + '%');
        line.setAttribute('y1', y1 + '%');
        line.setAttribute('x2', x2 + '%');
        line.setAttribute('y2', y2 + '%');
        requestAnimationFrame(animateLine);
      }
      animateLine();
    });
  }
});
// Animate SVG lines so all move in relation to the center, and scrolling impacts their movement
const svgLines = document.querySelectorAll('#bg-lines line');
let lastScrollY = window.scrollY || window.pageYOffset;
let scrollVelocity = 0;
let scrollMomentum = 0;
window.addEventListener('scroll', () => {
  const newY = window.scrollY || window.pageYOffset;
  scrollVelocity = newY - lastScrollY;
  lastScrollY = newY;
});
svgLines.forEach((line, i) => {
  const origX1 = parseFloat(line.getAttribute('x1'));
  const origY1 = parseFloat(line.getAttribute('y1'));
  const origX2 = parseFloat(line.getAttribute('x2'));
  const origY2 = parseFloat(line.getAttribute('y2'));
  function animateLine() {
    const t = Date.now()/1200 + i*0.7;
    // Scroll impact: accumulate momentum, decay over time
    scrollMomentum += (scrollVelocity * 0.18 - scrollMomentum) * 0.08;
    // Calculate offset from center for each endpoint
    const dx1 = origX1 - 50;
    const dy1 = origY1 - 50;
    const dx2 = origX2 - 50;
    const dy2 = origY2 - 50;
    // Animate endpoints radially from center, add scrollMomentum to phase
    const mag = 2 + 1.2*Math.sin(t*0.7 + i);
    const phase = t + i*0.5 + scrollMomentum * 0.12;
    const x1 = 50 + dx1 + Math.sin(phase) * dx1 * mag / 100;
    const y1 = 50 + dy1 + Math.cos(phase) * dy1 * mag / 100;
    const x2 = 50 + dx2 + Math.sin(phase+1) * dx2 * mag / 100;
    const y2 = 50 + dy2 + Math.cos(phase+1) * dy2 * mag / 100;
    line.setAttribute('x1', x1 + '%');
    line.setAttribute('y1', y1 + '%');
    line.setAttribute('x2', x2 + '%');
    line.setAttribute('y2', y2 + '%');
    requestAnimationFrame(animateLine);
  }
  animateLine();
});

// --- Flying transition for SVG lines on page switch ---
function flyOutLines() {
  const bg = document.getElementById('bg-lines');
  if (bg) {
    bg.style.transition = 'opacity 0.7s cubic-bezier(.7,0,.3,1), transform 0.7s cubic-bezier(.7,0,.3,1)';
    bg.style.opacity = '0';
    bg.style.transform += ' scale(1.2) translateY(-60px)';
  }
}
function flyInLines() {
  const bg = document.getElementById('bg-lines');
  if (bg) {
    bg.style.transition = 'none';
    bg.style.opacity = '0';
    bg.style.transform = 'scale(0.8) translateY(60px)';
    setTimeout(() => {
      bg.style.transition = 'opacity 0.9s cubic-bezier(.7,0,.3,1), transform 0.9s cubic-bezier(.7,0,.3,1)';
      bg.style.opacity = '1';
      bg.style.transform = 'scale(1) translateY(0)';
    }, 30);
  }
}
// On page load, fly in
window.addEventListener('DOMContentLoaded', flyInLines);
// Prevent scrolling above or below the page
window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (window.scrollY < 0) {
    window.scrollTo(0, 0);
  } else if (window.scrollY > maxScroll) {
    window.scrollTo(0, maxScroll);
  }
});
// Seamless transitions for nav links (SPA-like)
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    // Only apply seamless transition for internal pages (not hash, mailto, or external)
    if (
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('javascript:') &&
      !href.startsWith('http') &&
      !href.startsWith('//')
    ) {
      e.preventDefault();
      flyOutLines();
      setTimeout(() => {
        fetch(href)
          .then(res => res.text())
          .then(html => {
            // Extract the <body> content from the new page
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newBody = doc.body;
            // Replace current <body> content except for persistent elements (SVG background, nav)
            const keepIds = ['bg-lines', 'theme-toggle', 'theme-icon', 'nav'];
            Array.from(document.body.children).forEach(child => {
              if (!keepIds.some(id => child.id === id || child.tagName.toLowerCase() === id)) {
                child.remove();
              }
            });
            Array.from(newBody.children).forEach(child => {
              if (!keepIds.some(id => child.id === id || child.tagName.toLowerCase() === id)) {
                document.body.appendChild(child);
              }
            });
            // Update document title
            document.title = doc.title;
            // Re-run fade-in, section observer, etc.
            if (window.initPageFeatures) window.initPageFeatures();
            // Animate lines back in
            flyInLines();
          });
      }, 650);
    } else if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Re-init page features after seamless transition
window.initPageFeatures = function() {
  // Fade-in on scroll for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-init');
    observer.observe(section);
  });
};
window.initPageFeatures();

// Fade-in on scroll for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-init');
  observer.observe(section);
});




// Theme switcher with auto-detect
const themes = ['', 'theme-dark'];
let themeIndex = 0;
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// SVGs for sun and moon
const sunSVG = `<svg class="theme-svg sun" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" fill="currentColor"/><g stroke="currentColor"><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g></svg>`;
const moonSVG = `<svg class="theme-svg moon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 0 1 12.21 3a7 7 0 1 0 8.79 9.79z" fill="currentColor"/></svg>`;

if (themeIcon) {
  themeIcon.innerHTML = `<span class="theme-svg-wrap" style="position:relative;display:inline-block;width:28px;height:28px;vertical-align:middle;">
    <span id="theme-sun" style="position:absolute;top:0;left:0;right:0;bottom:0;opacity:1;transition:opacity 0.4s;">${sunSVG}</span>
    <span id="theme-moon" style="position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;transition:opacity 0.4s;">${moonSVG}</span>
  </span>`;
}
// Auto-detect system theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.className = 'theme-dark';
  themeIndex = 1;
  const sun = document.getElementById('theme-sun');
  const moon = document.getElementById('theme-moon');
  if (sun && moon) {
    sun.style.opacity = 0;
    moon.style.opacity = 1;
  }
}
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    themeIndex = (themeIndex+1)%themes.length;
    document.body.className = themes[themeIndex];
    const sun = document.getElementById('theme-sun');
    const moon = document.getElementById('theme-moon');
    if (themeIndex === 1) { // dark
      if (sun && moon) {
        sun.style.opacity = 0;
        moon.style.opacity = 1;
      }
    } else { // light
      if (sun && moon) {
        sun.style.opacity = 1;
        moon.style.opacity = 0;
      }
    }
  });
}



// Parallax effect for SVG lines with scroll momentum
const bgLines = document.getElementById('bg-lines');
let targetScrollY = window.scrollY || window.pageYOffset;
let currentScrollY = targetScrollY;
function animateParallax() {
  // Smoothly approach the target scroll position (momentum effect)
  currentScrollY += (targetScrollY - currentScrollY) * 0.12;
  if (bgLines) {
    bgLines.style.transform = `translateY(${currentScrollY * 0.18}px)`;
  }
  requestAnimationFrame(animateParallax);
}
animateParallax();
window.addEventListener('scroll', () => {
  targetScrollY = window.scrollY || window.pageYOffset;
});

