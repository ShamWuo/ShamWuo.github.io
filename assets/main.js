// Prevent scrolling above or below the page
window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (window.scrollY < 0) {
    window.scrollTo(0, 0);
  } else if (window.scrollY > maxScroll) {
    window.scrollTo(0, maxScroll);
  }
});
// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

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



// Parallax effect for SVG lines (snappier)
const bgLines = document.getElementById('bg-lines');
window.addEventListener('scroll', () => {
  const y = window.scrollY || window.pageYOffset;
  if (bgLines) {
    bgLines.style.transform = `translateY(${y * 0.18}px)`;
  }
});

