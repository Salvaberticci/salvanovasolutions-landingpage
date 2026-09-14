// ============================================================
// SALVANOVALUTIONS — main.js v2.0
// ============================================================

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Cross-page smooth scroll
(function() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
})();

// ==================== NAVBAR ====================
(function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function handleScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hamburger menu
    const hamburger = document.getElementById('hamburger-btn') || navbar.querySelector('.navbar-hamburger');
    const navLinks = navbar.querySelector('.navbar-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // Active link highlight
    const currentPath = window.location.pathname.replace(/\/$/, '');
    navbar.querySelectorAll('.navbar-links a').forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '');
        if (linkPath === currentPath) link.classList.add('active');
    });
})();

// ==================== PARTICLES.JS (Corporate, Subtle) ====================
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 35,
                "density": { "enable": true, "value_area": 1200 }
            },
            "color": { "value": "#3b82f6" },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.25,
                "random": true,
                "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.05, "sync": false }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": { "enable": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#3b82f6",
                "opacity": 0.12,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 0.8,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": false },
                "onclick": { "enable": false },
                "resize": true
            }
        },
        "retina_detect": false
    });
}

// ==================== SCROLL FADE-IN ====================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ==================== ANIMATED COUNTERS ====================
(function() {
    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function animateCounter(el) {
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.round(easedProgress * target);
            el.textContent = prefix + current + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = prefix + target + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
})();

// ==================== FAQ ACCORDION ====================
(function() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(other => {
                other.classList.remove('active');
                const otherAnswer = other.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.maxHeight = '0';
            });

            // Open clicked if it was closed
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
})();

// ==================== PORTFOLIO FILTERS ====================
(function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');
    if (!filterBtns.length || !cards.length) return;

    const BATCH_SIZE = 8;
    const btn = document.getElementById('ver-mas-proyectos');
    const counter = document.getElementById('proyectos-counter');
    let currentFilter = 'all';
    let showing = BATCH_SIZE;

    function getVisibleCards() {
        return Array.from(cards).filter(card => {
            if (currentFilter === 'all') return true;
            return card.dataset.category === currentFilter;
        });
    }

    function updateCards() {
        const visible = getVisibleCards();
        cards.forEach(card => card.classList.add('proyecto-oculto'));
        visible.forEach((card, i) => {
            if (i < showing) card.classList.remove('proyecto-oculto');
        });
        if (counter) {
            counter.textContent = `Mostrando ${Math.min(showing, visible.length)} de ${visible.length} proyectos`;
        }
        if (btn) {
            const textSpan = btn.querySelector('.btn-text');
            if (showing >= visible.length) {
                if (textSpan) textSpan.textContent = 'Mostrar menos';
                btn.classList.add('rotated');
            } else {
                if (textSpan) textSpan.textContent = 'Ver más proyectos';
                btn.classList.remove('rotated');
            }
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            showing = BATCH_SIZE;
            updateCards();
        });
    });

    if (btn) {
        btn.addEventListener('click', function() {
            const visible = getVisibleCards();
            if (showing >= visible.length) {
                showing = BATCH_SIZE;
            } else {
                showing = Math.min(showing + BATCH_SIZE, visible.length);
            }
            updateCards();
        });
    }

    // URL filter param support
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam) {
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterParam}"]`);
        if (targetBtn) {
            filterBtns.forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
            currentFilter = filterParam;
        }
    }

    updateCards();
})();

// ==================== SHOW MORE (INDEX.HTML FEATURED) ====================
(function() {
    const section = document.getElementById('featured-projects');
    if (!section) return;

    const cards = section.querySelectorAll('.portfolio-card');
    const BATCH_SIZE = 6;
    const btn = document.getElementById('ver-mas-featured');
    const counter = document.getElementById('featured-counter');
    const TOTAL = cards.length;
    let showing = BATCH_SIZE;

    if (!btn || TOTAL <= BATCH_SIZE) {
        if (btn) btn.style.display = 'none';
        if (counter) counter.style.display = 'none';
        return;
    }

    function updateCards() {
        cards.forEach((card, i) => {
            if (i < showing) {
                card.classList.remove('proyecto-oculto');
            } else {
                card.classList.add('proyecto-oculto');
            }
        });
        if (counter) counter.textContent = `Mostrando ${Math.min(showing, TOTAL)} de ${TOTAL} proyectos`;
    }

    function updateButton() {
        const textSpan = btn.querySelector('.btn-text');
        if (showing >= TOTAL) {
            if (textSpan) textSpan.textContent = 'Mostrar menos';
            btn.classList.add('rotated');
        } else {
            if (textSpan) textSpan.textContent = 'Ver más proyectos';
            btn.classList.remove('rotated');
        }
    }

    btn.addEventListener('click', function() {
        if (showing >= TOTAL) {
            showing = BATCH_SIZE;
        } else {
            showing = Math.min(showing + BATCH_SIZE, TOTAL);
        }
        updateCards();
        updateButton();
    });

    cards.forEach((card, i) => {
        if (i >= BATCH_SIZE) card.classList.add('proyecto-oculto');
    });
    if (counter) counter.textContent = `Mostrando ${Math.min(BATCH_SIZE, TOTAL)} de ${TOTAL} proyectos`;
})();
