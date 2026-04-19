window.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════
  // LOADER
  // ═══════════════════════════════════════
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => loader.classList.add('out'), 2100);
    }
  });

  // ═══════════════════════════════════════
  // UTILITIES
  // ═══════════════════════════════════════
  const isMobile = window.matchMedia('(max-width:768px)').matches;

  const debounce = (func, wait = 10) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.nlinks a');

  // ═══════════════════════════════════════
  // MOBILE NAV
  // ═══════════════════════════════════════
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      }
    });
  }

  // ═══════════════════════════════════════
  // OBSERVERS SAFE
  // ═══════════════════════════════════════
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('in'));
  }, { threshold: 0.08 });

  document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));

  const toolsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('in'));
  }, { threshold: 0.2 });

  document.querySelectorAll('.tc').forEach(el => toolsObserver.observe(el));

  // ═══════════════════════════════════════
  // FILTER TOOLS (FIX IMPORTANT)
  // ═══════════════════════════════════════
  window.filterTools = function(category, button) {

    document.querySelectorAll('.tf-btn')
      .forEach(btn => btn.classList.remove('on'));

    if (button) button.classList.add('on');

    const cards = document.querySelectorAll('.tc');

    cards.forEach(card => {
      const cat = card.dataset.cat || '';
      const show = (category === 'all' || cat === category);

      // ✔ plus robuste que classList.toggle uniquement
      if (show) {
        card.style.display = '';
        card.classList.remove('hidden');
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });
  };

  // ═══════════════════════════════════════
  // FILTER PROJECTS (SAFE)
  // ═══════════════════════════════════════
  window.filterProjects = function(category, button) {

    document.querySelectorAll('.pf-btn')
      .forEach(btn => btn.classList.remove('on'));

    if (button) button.classList.add('on');

    document.querySelectorAll('#projectsGrid .pjc').forEach(card => {
      const categories = (card.dataset.pcat || '').split(' ');
      const show = category === 'all' || categories.includes(category);

      card.classList.toggle('pj-hidden', !show);
    });
  };

  // ═══════════════════════════════════════
  // NAV SCROLL ACTIVE LINK FIX
  // ═══════════════════════════════════════
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'ac',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

  // ═══════════════════════════════════════
  // NAVBAR SCROLL SAFE
  // ═══════════════════════════════════════
  const handleNavbarScroll = debounce(() => {
    if (!navbar) return;

    if (window.scrollY > 60) {
      navbar.style.height = '58px';
      navbar.style.background = 'rgba(4, 8, 15, 0.95)';
    } else {
      navbar.style.height = '68px';
      navbar.style.background = 'rgba(4, 8, 15, 0.82)';
    }
  });

  window.addEventListener('scroll', handleNavbarScroll);

});

// ═══════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════
const cur = document.getElementById('cur');
const dot = document.getElementById('cdot');
const ring = document.getElementById('cring');

if (cur && dot && ring) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // effet smooth pour le ring
  const animate = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animate);
  };

  animate();

  // hover links
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('ch');
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('ch');
    });
  });
}