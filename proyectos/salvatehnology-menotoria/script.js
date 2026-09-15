/**
 * Binary Rain / Matrix Effect
 */
const canvas = document.getElementById('binary-canvas');
const ctx = canvas.getContext('2d');

let width, height, columns;
const fontSize = 14;
const characters = '01'; // Just binary as requested
let drops = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);

    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Random start positions
    }
}

function draw() {
    // Semi-transparent black to create trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#FF6600'; // Orange binary rain
    ctx.font = `${fontSize}px Orbitron`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop if it reaches bottom or randomly
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

window.addEventListener('resize', initCanvas);
initCanvas();
setInterval(draw, 33); // ~30 FPS for smooth rain

/**
 * Slide Navigation System
 */
let currentSlide = 1;
const totalSlides = document.querySelectorAll('.slide').length;

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentSlideEl = document.getElementById('current-slide');
const totalSlidesEl = document.getElementById('total-slides');

// Update total slides display
totalSlidesEl.textContent = totalSlides;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');

    // Boundary checks
    if (n > totalSlides) currentSlide = totalSlides;
    if (n < 1) currentSlide = 1;
    else currentSlide = n;

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show current slide with fade-in
    slides[currentSlide - 1].classList.add('active');

    // Update counter
    currentSlideEl.textContent = currentSlide;

    // Update button states
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
}

// Navigation button handlers
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
    }
});

// Initialize first slide
showSlide(1);

/**
 * Console Easter Egg / Tech vibe log
 */
console.log('%c SALVATECH %c PRESENTACIÓN CARGADA ',
    'background: #FF6600; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'color: #888; font-style: italic;');
console.log('%c Usa las flechas ← → para navegar entre slides', 'color: #FF6600; font-size: 12px;');
