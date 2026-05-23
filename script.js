/* ===== TALENT OLIVE — MAIN SCRIPT ===== */

(function () {
  'use strict';

  /* ---------- Navbar scroll behavior ---------- */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scroll-top');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky shadow
    navbar.classList.toggle('scrolled', scrollY > 20);

    // Scroll-to-top visibility
    scrollTopBtn.classList.toggle('visible', scrollY > 300);

    // Active nav link highlighting
    highlightActiveNav();
  }, { passive: true });

  /* ---------- Logo → scroll to top ---------- */
  document.getElementById('logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll-to-top button ---------- */
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Smooth nav link scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });

        // Close mobile nav if open
        closeMobileNav();
      }
    });
  });

  /* ---------- Active nav highlighting ---------- */
  function highlightActiveNav() {
    const sections = ['hero', 'how-it-works', 'about', 'careers', 'for-schools', 'resources', 'contact'];
    let current = 'hero';
    const navH = 80;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= navH + 60) current = id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinksEl = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  function closeMobileNav() {
    navLinksEl.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  /* ---------- Intersection Observer — scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Chart bar animation (step 2) ---------- */
  const chartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.chart-bar');
          const widths = ['85%', '70%', '58%'];
          bars.forEach((bar, i) => {
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.transition = 'width 0.9s cubic-bezier(0.4,0,0.2,1)';
              bar.style.width = widths[i];
            }, 200 + i * 120);
          });
          chartObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const reportCard = document.querySelector('.report-card-mock');
  if (reportCard) chartObserver.observe(reportCard);

  /* ---------- Auth modal ---------- */
  const authOverlay = document.getElementById('auth-overlay');
  const authClose = document.getElementById('auth-close');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  const switchLinks = document.querySelectorAll('.switch-link');

  // All CTA buttons open auth
  document.querySelectorAll('a[href="auth.html"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuth('login');
    });
  });

  // Login buttons in navbar specifically
  document.querySelectorAll('.btn-outline').forEach(btn => {
    if (btn.textContent.trim() === 'Login') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuth('login');
      });
    }
  });

  function openAuth(tab = 'login') {
    authOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchTab(tab);
  }

  function closeAuth() {
    authOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  authClose.addEventListener('click', closeAuth);
  authOverlay.addEventListener('click', (e) => {
    if (e.target === authOverlay) closeAuth();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authOverlay.classList.contains('active')) closeAuth();
  });

  // Tab switching
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  switchLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(link.dataset.target);
    });
  });

  function switchTab(tabName) {
    authTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabName));
    authForms.forEach(form => {
      form.classList.remove('active');
      if (form.id === `form-${tabName}`) form.classList.add('active');
    });
  }

  // Auth form submissions (demo)
  authForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Please wait...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Success!';
        btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
        setTimeout(() => {
          closeAuth();
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 1200);
      }, 1500);
    });
  });

  /* ---------- Newsletter form ---------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');
      const email = input.value;
      if (!email) return;

      btn.textContent = 'Subscribing...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Subscribed!';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.disabled = false;
        }, 2000);
      }, 1000);
    });
  }

  /* ---------- Parallax effect on hero ---------- */
  const heroTree = document.querySelector('.hero-tree svg');
  const heroChips = document.querySelectorAll('.career-chip');

  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 900) return;
    const { clientX, clientY } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (clientX - cx) / cx;
    const dy = (clientY - cy) / cy;

    if (heroTree) {
      heroTree.style.transform = `translate(${dx * 8}px, ${dy * 5}px)`;
    }
    heroChips.forEach((chip, i) => {
      const depth = 0.5 + (i % 3) * 0.3;
      chip.style.transform = `translate(${dx * 6 * depth}px, ${dy * 4 * depth}px)`;
    });
  }, { passive: true });

  /* ---------- Counter animation for school stats ---------- */
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statEls = entry.target.querySelectorAll('.stat');
          statEls.forEach(el => {
            const text = el.textContent;
            if (text.includes('%')) {
              animateValue(el, 0, 100, 1200, '%');
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  const schoolsVisual = document.querySelector('.schools-visual');
  if (schoolsVisual) statsObserver.observe(schoolsVisual);

  function animateValue(el, start, end, duration, suffix = '') {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (end - start) * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ---------- Chip hover ripple effect ---------- */
  heroChips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.transition = 'transform 0.2s, box-shadow 0.2s, border-color 0.2s';
    });
  });

  /* ---------- Feature card hover animation ---------- */
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.feature-icon svg');
      if (icon) {
        icon.style.transform = 'rotate(10deg) scale(1.1)';
        icon.style.transition = 'transform 0.3s';
      }
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.feature-icon svg');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });

  /* ---------- Step card number pulse on hover ---------- */
  document.querySelectorAll('.step-card').forEach(card => {
    const num = card.querySelector('.step-number, [class^="step-number"]');
    card.addEventListener('mouseenter', () => {
      if (num) {
        num.style.transform = 'scale(1.15)';
        num.style.transition = 'transform 0.3s';
      }
    });
    card.addEventListener('mouseleave', () => {
      if (num) num.style.transform = '';
    });
  });

  /* ---------- Page load smooth entry ---------- */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

})();
