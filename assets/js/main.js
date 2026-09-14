// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Cross-page smooth scroll (e.g. portafolio.html?filter=sistemas-web#cta-final)
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
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hamburger menu
    const hamburger = navbar.querySelector('.navbar-hamburger');
    const navLinks = navbar.querySelector('.navbar-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }
})();

// ==================== PARTICLES.JS ====================
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 50,
            "density": {
                "enable": true,
                "value_area": 1000
            }
        },
        "color": {
            "value": "#00c6ff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.6,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 120,
            "color": "#00c6ff",
            "opacity": 0.5,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "grab"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": false
});

// ==================== SCROLL FADE-IN ====================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

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
            if (i < showing) {
                card.classList.remove('proyecto-oculto');
            }
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

    // Check URL for filter param (e.g. ?filter=sistemas-web)
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
        const icon = btn.querySelector('.fa-chevron-down');
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
