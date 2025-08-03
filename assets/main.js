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
const themes = ['','theme-dark','theme-paper'];
const themeIcons = ['🌗','🌑','📄'];
let themeIndex = 0;
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
// Auto-detect system theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.className = 'theme-dark';
  themeIndex = 1;
  if (themeIcon) themeIcon.textContent = themeIcons[1];
}
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    themeIndex = (themeIndex+1)%themes.length;
    document.body.className = themes[themeIndex];
    themeIcon.textContent = themeIcons[themeIndex];
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


