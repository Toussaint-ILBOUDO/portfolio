<script>
// ════════════════════════════════════════════════════════════════════════════════
// PAGE LOADER
// ════════════════════════════════════════════════════════════════════════════════
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('out'), 2100);
});

// ════════════════════════════════════════════════════════════════════════════════
// UTILITIES
// ════════════════════════════════════════════════════════════════════════════════
const isMobile = window.matchMedia('(max-width:768px)').matches;

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Cache DOM elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.nlinks a');

// ════════════════════════════════════════════════════════════════════════════════
// CUSTOM CURSOR (Desktop only)
// ════════════════════════════════════════════════════════════════════════════════
if (!isMobile) {
  const cursorDot = document.getElementById('cdot');
  const cursorRing = document.getElementById('cring');
  
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Interactive elements that trigger cursor change
  const interactiveElements = 'a, button, .skc, .pjc, .srvc, .testc, .astat, .pcard, .tc, .ccard';
  document.querySelectorAll(interactiveElements).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });

  // Animation loop for smooth cursor following
  (function animateCursor() {
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    requestAnimationFrame(animateCursor);
  })();
}

// ════════════════════════════════════════════════════════════════════════════════
// MOBILE NAVIGATION
// ════════════════════════════════════════════════════════════════════════════════
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
    closeMobileNav();
  }
});

// ════════════════════════════════════════════════════════════════════════════════
// INTERSECTION OBSERVERS
// ════════════════════════════════════════════════════════════════════════════════

// Scroll reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.skc').forEach(el => skillObserver.observe(el));

// Tools cards animation
const toolsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.tc').forEach(el => toolsObserver.observe(el));

// Active nav link on scroll
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('ac', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

document.querySelectorAll('section[id]').forEach(section => navObserver.observe(section));

// ════════════════════════════════════════════════════════════════════════════════
// 3D TILT EFFECT (Desktop only)
// ════════════════════════════════════════════════════════════════════════════════
if (!isMobile) {
  function applytiltEffect(selector, intensity) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        card.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(10px)`;
        card.style.transition = 'transform .05s ease, border-color .3s, box-shadow .3s';
        
        // Update gradient position for skill cards
        if (card.classList.contains('skc')) {
          card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
          card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.transition = 'transform .55s cubic-bezier(.4,0,.2,1), border-color .3s';
      });
    });
  }

  // Apply tilt to various card types
  applytiltEffect('.skc', 9);
  applytiltEffect('.pjc', 6);
  applytiltEffect('.srvc', 6);
  applytiltEffect('.testc', 5);
  applytiltEffect('.tc', 8);

  // Tools cards mouse tracking
  document.querySelectorAll('.tc').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  });

  // Hero card special tilt
  const heroCard = document.getElementById('pcard');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      heroCard.style.transform = `perspective(1100px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateZ(12px)`;
      heroCard.style.transition = 'transform .05s ease';
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'none';
      heroCard.style.transition = 'transform .6s cubic-bezier(.4,0,.2,1), box-shadow .5s';
    });
  }
}

// ════════════════════════════════════════════════════════════════════════════════
// NAVBAR SCROLL BEHAVIOR
// ════════════════════════════════════════════════════════════════════════════════
const handleNavbarScroll = debounce(() => {
  if (window.scrollY > 60) {
    navbar.style.height = '58px';
    navbar.style.background = 'rgba(4, 8, 15, 0.95)';
  } else {
    navbar.style.height = '68px';
    navbar.style.background = 'rgba(4, 8, 15, 0.82)';
  }
}, 10);

window.addEventListener('scroll', handleNavbarScroll);

// ════════════════════════════════════════════════════════════════════════════════
// FILTER FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════════
function filterTools(category, button) {
  document.querySelectorAll('.tf-btn').forEach(btn => btn.classList.remove('on'));
  button.classList.add('on');
  document.querySelectorAll('.tc').forEach(card => {
    const shouldShow = category === 'all' || card.dataset.cat === category;
    card.classList.toggle('hidden', !shouldShow);
  });
}

function filterProjects(category, button) {
  document.querySelectorAll('.pf-btn').forEach(btn => btn.classList.remove('on'));
  button.classList.add('on');
  document.querySelectorAll('#projectsGrid .pjc').forEach(card => {
    const categories = (card.dataset.pcat || '').split(' ');
    const shouldShow = category === 'all' || categories.includes(category);
    card.classList.toggle('pj-hidden', !shouldShow);
  });
}
</script>