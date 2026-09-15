// ===========================
// MARATEL - Main JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // --- Year ---
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Navbar Scroll ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Active Nav Link ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const updateActiveLink = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('text-white');
          link.classList.add('text-m-gray-light');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.remove('text-m-gray-light');
            link.classList.add('text-white');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // --- Mobile Menu ---
  const menuBtn = document.getElementById('menuBtn');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileReportBtn = document.querySelector('.open-report-modal-mobile-menu');
  const hamburger = menuBtn.querySelector('.hamburger');

  const toggleMenu = () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  menuBtn.addEventListener('click', toggleMenu);
  closeMenu.addEventListener('click', toggleMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) toggleMenu();
    });
  });

  if (mobileReportBtn) {
    mobileReportBtn.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) toggleMenu();
      setTimeout(() => {
        const reportModal = document.getElementById('reportModal');
        if (reportModal) {
          reportModal.classList.add('open');
          reportModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      }, 350);
    });
  }

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Form → WhatsApp ---
  const form = document.getElementById('coberturaForm');
  const input = document.getElementById('coberturaInput');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input.value.trim();
      if (!value) {
        input.focus();
        return;
      }

      // Replace with your actual WhatsApp number
      const whatsappNumber = '58XXXXXXXXXX';
      const message = encodeURIComponent(`Hola Maratel, quiero validar mi cobertura. Mi dirección/teléfono: ${value}`);
      const url = `https://wa.me/${whatsappNumber}?text=${message}`;

      // Open WhatsApp
      window.open(url, '_blank');

      // Show toast
      showToast('Redirigiendo a WhatsApp...');

      // Reset
      input.value = '';
    });
  }

  // --- Toast ---
  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      ${msg}
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // --- Parallax Glow on Hero ---
  const heroGlow = document.querySelector('.hero-grid');
  if (heroGlow) {
    const orbs = heroGlow.querySelectorAll('.orb');
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 20;
        orb.style.transform = `translate(${(x - 0.5) * factor}px, ${(y - 0.5) * factor}px)`;
      });
    });
  }

  // --- Ambient Settings ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  // --- Particle Network Background ---
  function initParticles() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf = null;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(80, Math.max(25, Math.floor((w * h) / 20000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.8 + 0.8
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = window.innerWidth;
      const h = window.innerHeight;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.45)';
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(34, 211, 238, ' + (0.25 * (1 - dist / 140)).toFixed(3) + ')';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        draw();
      }
    });
  }

  // --- Cursor Spotlight ---
  function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || isTouch) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.3;
    let x = tx;
    let y = ty;

    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      glow.style.opacity = '1';
    }, { passive: true });

    (function anim() {
      x += (tx - x) * 0.09;
      y += (ty - y) * 0.09;
      glow.style.background = 'radial-gradient(650px circle at ' + x + 'px ' + y + 'px, rgba(37, 99, 235, 0.08), transparent 65%)';
      requestAnimationFrame(anim);
    })();
  }

  // --- 3D Tilt on Plan Cards ---
  function initTilt() {
    if (isTouch) return;
    document.querySelectorAll('.plan-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transition = 'transform 0.12s ease-out';
        card.style.transform = 'perspective(900px) rotateY(' + (px * 6).toFixed(2) + 'deg) rotateX(' + (-py * 6).toFixed(2) + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = '';
      });
    });
  }

  initParticles();
  initCursorGlow();
  initTilt();

  // --- Report Payment Modal ---
  const reportModal = document.getElementById('reportModal');
  const openReportBtns = [
    document.getElementById('openReportModalDesktop'),
    document.getElementById('openReportModalMobile')
  ];
  const reportCloseBtn = document.getElementById('reportModalClose');

  if (reportModal && reportCloseBtn) {
    const openReportModal = () => {
      reportModal.classList.add('open');
      reportModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeReportModal = () => {
      reportModal.classList.remove('open');
      reportModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    openReportBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', openReportModal);
    });

    reportCloseBtn.addEventListener('click', closeReportModal);

    reportModal.addEventListener('click', (e) => {
      if (e.target === reportModal) closeReportModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && reportModal.classList.contains('open')) closeReportModal();
    });
  }

});