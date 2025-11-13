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

// GSAP Animations
console.log('GSAP loaded:', typeof gsap);
console.log('ScrollTrigger loaded:', typeof ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

// Enhanced Dynamic Background Animations with Particles
console.log('Setting up background animations');

// Waves removed as requested

// Enhanced Particles.js Background
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 120,
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
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
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

// Carga Inicial Dramática (Hero Section)
const masterTl = gsap.timeline({ delay: 0.5 });

masterTl.from(".logo img", {
    duration: 0.4,
    scale: 0,
    rotation: -180,
    opacity: 0,
    ease: "back.out(1.7)"
})
.from("#header h1", {
    duration: 0.5,
    y: 50,
    opacity: 0,
    ease: "power3.out"
}, "-=0.2")
.from("#hero-intro .subheadline", {
    duration: 0.5,
    y: 30,
    opacity: 0,
    ease: "power3.out"
}, "-=0.3")
.from("#hero-intro .visual", {
    duration: 0.7,
    scale: 0.7,
    opacity: 0,
    rotationX: 20,
    ease: "back.out(1.7)"
}, "-=0.4")
.from(".cta-button", {
    duration: 0.5,
    y: 50,
    opacity: 0,
    ease: "elastic.out(1, 0.5)"
}, "-=0.3");

// Enhanced Parallax Effects
// Parallax for hero video
gsap.to("#hero-intro .visual", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: "#hero-intro",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// Parallax for header logo
gsap.to(".logo img", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
        trigger: "#header",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// Parallax for about-me image
gsap.to(".about-me-image img", {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
        trigger: "#sobre-mi",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    }
});

// Parallax for testimonial videos
gsap.utils.toArray(".testimonial-video video").forEach(video => {
    gsap.to(video, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
            trigger: video.closest(".testimonial-card"),
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
});

// Advanced Scroll-Triggered Progressive Content Reveals
ScrollTrigger.matchMedia({
    // Desktop animations
    "(min-width: 769px)": function() {
        gsap.utils.toArray(".section:not(#header):not(#hero-intro)").forEach(section => {
            const title = section.querySelector("h2");
            const cards = section.querySelectorAll(".testimonial-card, .service-card, .benefit-card, .faq-item");
            const otherElements = section.querySelectorAll("p, .section-subtitle, .results-text, .results-graph, .about-me-info, .about-me-image");


            if (otherElements.length > 0) {
                gsap.from(otherElements, {
                    opacity: 0,
                    y: 50,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                        toggleActions: "play none none none"
                    }
                });
            }

            if (cards.length > 0) {
                gsap.from(cards, {
                    opacity: 0,
                    y: 100,
                    scale: 0.8,
                    rotationY: 45,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.5)",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 65%",
                        toggleActions: "play none none none"
                    }
                });
            }
        });
    },
    // Mobile animations (simplified for performance)
    "(max-width: 768px)": function() {
        gsap.utils.toArray(".section:not(#header):not(#hero-intro)").forEach(section => {
            const title = section.querySelector("h2");
            const cards = section.querySelectorAll(".testimonial-card, .service-card, .benefit-card, .faq-item");
            const otherElements = section.querySelectorAll("p, .section-subtitle, .results-text, .results-graph, .about-me-info, .about-me-image");


            if (otherElements.length > 0) {
                gsap.from(otherElements, {
                    opacity: 0,
                    y: 30,
                    duration: 0.4,
                    ease: "power2.out",
                    stagger: 0.03,
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        toggleActions: "play none none none"
                    }
                });
            }

            if (cards.length > 0) {
                gsap.from(cards, {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                    duration: 0.5,
                    ease: "back.out(1.2)",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            }
        });
    }
});

// Pin effect removed to prevent section overlap


// Enhanced Fluid Animations for Interactive Elements
// Advanced hover for CTA buttons with magnetic effect
document.querySelectorAll(".cta-button").forEach(button => {
    let isHovering = false;

    button.addEventListener("mouseenter", () => {
        isHovering = true;
        gsap.to(button, {
            scale: 1.08,
            rotationY: 5,
            boxShadow: "0 0 40px rgba(0, 198, 255, 1), 0 0 80px rgba(0, 198, 255, 0.6)",
            duration: 0.2,
            ease: "elastic.out(1, 0.3)"
        });
    });

    button.addEventListener("mouseleave", () => {
        isHovering = false;
        gsap.to(button, {
            scale: 1,
            rotationY: 0,
            boxShadow: "0 4px 15px rgba(0, 198, 255, 0.4)",
            duration: 0.2,
            ease: "elastic.out(1, 0.3)"
        });
    });

    // Magnetic effect on mouse move
    button.addEventListener("mousemove", (e) => {
        if (!isHovering) return;
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / 10;
        const deltaY = (e.clientY - centerY) / 10;

        gsap.to(button, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Premium hover for cards with 3D effects and glow, plus continuous floating
document.querySelectorAll(".testimonial-card, .service-card, .benefit-card, .faq-item").forEach(card => {
    // Continuous floating animation
    gsap.to(card, {
        y: "+=5",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            scale: 1.05,
            rotationX: -5,
            rotationY: 5,
            boxShadow: "0 20px 60px rgba(0, 198, 255, 0.4), 0 0 100px rgba(0, 198, 255, 0.3)",
            duration: 0.25,
            ease: "power2.out"
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            boxShadow: "0 0 25px rgba(0, 198, 255, 0.15), 0 0 50px rgba(0, 198, 255, 0.1)",
            duration: 0.25,
            ease: "power2.out"
        });
    });
});

// Animate Chart.js on scroll
// Eliminado para que la gráfica aparezca completa automáticamente
/*
gsap.from("#resultsChart", {
    scale: 0.5,
    opacity: 0,
    duration: 0.7,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: "#resultados",
        start: "top 70%",
        toggleActions: "play none none none"
    }
});
*/
