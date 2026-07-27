// Form handling removed - no contact form in current HTML

// Smooth scrolling for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            event.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Particles.js Background
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
console.log('Particles.js initialized');

// Scroll Fade-in Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Show More / Show Less for Portfolio
(function() {
    const PORTAFOLIO_SECTION = document.getElementById('clientes');
    if (!PORTAFOLIO_SECTION) return;

    const CARDS = PORTAFOLIO_SECTION.querySelectorAll('.testimonial-card');
    const BATCH_SIZE = 6;
    const BTN = document.getElementById('ver-mas-proyectos');
    const COUNTER = document.getElementById('proyectos-counter');
    const TOTAL = CARDS.length;
    let showing = BATCH_SIZE;
    let expanded = false;

    function updateCards() {
        CARDS.forEach((card, i) => {
            if (i < showing) {
                card.classList.remove('proyecto-oculto');
            } else {
                card.classList.add('proyecto-oculto');
            }
        });
        COUNTER.textContent = `Mostrando ${Math.min(showing, TOTAL)} de ${TOTAL} proyectos`;
    }

    function updateButton() {
        const textSpan = BTN.querySelector('.btn-text');
        const icon = BTN.querySelector('.fa-chevron-down');
        if (showing >= TOTAL) {
            textSpan.textContent = 'Mostrar menos';
            BTN.classList.add('rotated');
        } else {
            textSpan.textContent = 'Ver más proyectos';
            BTN.classList.remove('rotated');
        }
    }

    BTN.addEventListener('click', function() {
        if (showing >= TOTAL) {
            showing = BATCH_SIZE;
        } else {
            showing = Math.min(showing + BATCH_SIZE, TOTAL);
        }
        updateCards();
        updateButton();
    });

    // Initialize
    CARDS.forEach((card, i) => {
        if (i >= BATCH_SIZE) card.classList.add('proyecto-oculto');
    });
    COUNTER.textContent = `Mostrando ${Math.min(BATCH_SIZE, TOTAL)} de ${TOTAL} proyectos`;
})();


