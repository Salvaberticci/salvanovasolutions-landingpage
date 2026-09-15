// === ANIMACIONES DE SCROLL (Intersection Observer) ===
window.initScrollAnimations = function () {
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length === 0) return;

    const observerOptions = {
        threshold: 0.15, // Un poco más de sensibilidad
        rootMargin: '0px 0px -100px 0px' // Se activa 100px antes de entrar totalmente
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.style.animation = `fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay} forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        element.style.opacity = '0'; // Asegurar que inicie invisible
        observer.observe(element);
    });
};

// === ANIMACIÓN DE CONTADORES ===
window.initCounterAnimations = function () {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                let count = 0;
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps aprox

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target + suffix;
                    }
                };

                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
};
