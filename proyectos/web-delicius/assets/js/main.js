// ============================================
// DELICIOUS - JAVASCRIPT PRINCIPAL (SPA)
// ============================================

// === INICIALIZACIÓN GLOBAL ===
document.addEventListener('DOMContentLoaded', function () {
    window.initNavbarScroll();
    if (window.initScrollAnimations) window.initScrollAnimations();
    if (window.initCounterAnimations) window.initCounterAnimations();
});

// === NAVBAR CON SCROLL & SCROLLSPY ===
window.initNavbarScroll = function () {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!header) return;

    // 1. Efecto de fondo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Lógica de Scrollspy (Resaltar link según sección visible)
    const options = {
        threshold: 0.5, // Se activa cuando el 50% de la sección es visible
        rootMargin: "-80px 0px 0px 0px" // Ajuste por la altura del header
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#/${id}` ||
                        (id === 'home' && link.getAttribute('href') === '#/')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
};

// === VALIDACIÓN DE FORMULARIO (PARA VISTA CONTACTO) ===
window.initContactForm = function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validar campos
        const empresa = document.getElementById('empresa').value.trim();
        const cargo = document.getElementById('cargo').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!empresa || !cargo || !nombre || !telefono || !email || !mensaje) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingrese un email válido.');
            return;
        }

        // Simulación de envío exitoso
        showSuccessMessage();
        form.reset();
    });
};

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ee0437;
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(238, 4, 55, 0.3);
        z-index: 10000;
        text-align: center;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
    `;
    successDiv.innerHTML = `
        <p style="margin: 0; font-size: 1.25rem;">✓ ¡Mensaje enviado!</p>
        <p style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.9;">Nos pondremos en contacto pronto</p>
    `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// === LÓGICA DE MODAL DE PRODUCTO (ESTILO INSTAGRAM) ===
window.initProductModals = function () {
    const cards = document.querySelectorAll('.producto-catalogo-card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function (e) {
            // Evitar que el clic en el botón de solicitar abra el modal
            if (e.target.classList.contains('btn-catalogo')) return;

            const name = this.querySelector('.producto-catalogo-name').innerText;
            const description = this.querySelector('.producto-description-mini') ? this.querySelector('.producto-description-mini').innerText : '';
            const presentations = this.querySelector('.producto-catalogo-presentaciones').cloneNode(true);
            const videoUrl = this.getAttribute('data-video');

            window.openProductModal(name, description, presentations, videoUrl);
        });
    });
};

window.openProductModal = function (name, description, presentations, videoUrl) {
    const modal = document.getElementById('productModal');
    const iframe = document.getElementById('modalVideoIframe');
    const localVideo = document.getElementById('modalLocalVideo');
    const videoControls = document.getElementById('videoControls');
    const videoColumn = modal ? modal.querySelector('.modal-video-column') : null;
    const nameEl = document.getElementById('modalProductName');
    const descEl = document.getElementById('modalProductDescription');
    const presEl = document.getElementById('modalProductPresentations');

    if (!modal) return;

    nameEl.innerText = name;
    descEl.innerText = description;
    presEl.innerHTML = '';
    presEl.appendChild(presentations);

    // Limpiar estados previos
    if (videoColumn) videoColumn.classList.remove('is-tiktok');
    if (iframe) { iframe.src = ''; iframe.style.display = 'none'; }
    if (localVideo) { localVideo.src = ''; localVideo.style.display = 'none'; }
    if (videoControls) videoControls.style.display = 'none';

    // Proceso de carga de Video (Local o Externo)
    if (videoUrl) {
        if (videoUrl.endsWith('.mp4')) {
            // Lógica Video Local
            if (localVideo) {
                localVideo.src = videoUrl;
                localVideo.style.display = 'block';
                localVideo.play();
                if (videoControls) {
                    videoControls.style.display = 'flex';
                    document.getElementById('togglePlay').innerText = '⏸️';
                    document.getElementById('toggleMute').innerText = '🔊';
                }
            }
        }
        else if (videoUrl.includes('instagram.com') || videoUrl.includes('tiktok.com')) {
            // Lógica Videos Externos
            if (iframe) {
                iframe.style.display = 'block';
                let embedUrl = '';

                if (videoUrl.includes('instagram.com')) {
                    embedUrl = videoUrl.split('?')[0];
                    if (!embedUrl.endsWith('/')) embedUrl += '/';
                    embedUrl += 'embed?autoplay=1';
                }
                else if (videoUrl.includes('tiktok.com')) {
                    const tiktokMatch = videoUrl.match(/\/video\/(\d+)/);
                    if (tiktokMatch && tiktokMatch[1]) {
                        embedUrl = `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}?autoplay=1`;
                        if (videoColumn) videoColumn.classList.add('is-tiktok');
                    }
                }
                iframe.src = embedUrl;
            }
        }
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
};

window.closeProductModal = function () {
    const modal = document.getElementById('productModal');
    const iframe = document.getElementById('modalVideoIframe');
    const localVideo = document.getElementById('modalLocalVideo');
    const videoControls = document.getElementById('videoControls');

    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
        modal.style.display = 'none';
        if (iframe) iframe.src = '';
        if (localVideo) {
            localVideo.pause();
            localVideo.src = '';
        }
        if (videoControls) videoControls.style.display = 'none';
    }, 300);
};

// --- Manejo de Controles de Video ---
document.addEventListener('DOMContentLoaded', function () {
    const togglePlay = document.getElementById('togglePlay');
    const toggleMute = document.getElementById('toggleMute');
    const localVideo = document.getElementById('modalLocalVideo');

    if (togglePlay && localVideo) {
        togglePlay.addEventListener('click', () => {
            if (localVideo.paused) {
                localVideo.play();
                togglePlay.innerText = '⏸️';
            } else {
                localVideo.pause();
                togglePlay.innerText = '▶️';
            }
        });
    }

    if (toggleMute && localVideo) {
        toggleMute.addEventListener('click', () => {
            localVideo.muted = !localVideo.muted;
            toggleMute.innerText = localVideo.muted ? '🔇' : '🔊';
        });
    }
});

// === LÓGICA DE FILTRADO DE CATÁLOGO ===
window.initCatalogoFilters = function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.categoria-section');

    if (!filterButtons.length || !categories.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // 1. Actualizar estado activo de los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 2. Filtrar secciones
            categories.forEach(section => {
                const category = section.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    section.classList.remove('hidden');
                    // Retraso pequeño para re-activar animaciones fade-in si es necesario
                    setTimeout(() => {
                        section.style.display = 'block';
                    }, 10);
                } else {
                    section.classList.add('hidden');
                    setTimeout(() => {
                        section.style.display = 'none';
                    }, 400); // Coincidir con la transición CSS
                }
            });
        });
    });
};

// === LÓGICA DE CARRITO DE COMPRAS ===
let cart = JSON.parse(localStorage.getItem('delicious_cart')) || [];

window.toggleCart = function () {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.toggle('active');
};

window.addToCart = function (name, image) {
    const existingIcon = cart.find(item => item.name === name);

    if (existingIcon) {
        existingIcon.quantity += 1;
    } else {
        cart.push({ name, image, quantity: 1 });
    }

    window.saveCart();
    window.updateCartUI();

    // Animación de pulso al FAB
    const fab = document.getElementById('cart-fab');
    if (fab) {
        fab.classList.add('pulse');
        setTimeout(() => fab.classList.remove('pulse'), 400);
    }

    // Notificación visual opcional (puedes añadir un toast aquí si quieres)
};

window.removeFromCart = function (name) {
    cart = cart.filter(item => item.name !== name);
    window.saveCart();
    window.updateCartUI();
};

window.updateCartQuantity = function (name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            window.removeFromCart(name);
        } else {
            window.saveCart();
            window.updateCartUI();
        }
    }
};

window.saveCart = function () {
    localStorage.setItem('delicious_cart', JSON.stringify(cart));
};

window.updateCartUI = function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalCountEl = document.getElementById('cart-total-count');

    if (!cartItemsContainer) return;

    let totalItems = 0;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-msg">
                <p>Tu carrito está vacío</p>
                <a href="#/catalogo" class="btn btn-primary" onclick="window.toggleCart()">Ir al Catálogo</a>
            </div>
        `;
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-controls">
                        <button class="btn-qty" onclick="window.updateCartQuantity('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn-qty" onclick="window.updateCartQuantity('${item.name}', 1)">+</button>
                        <button class="btn-qty" style="margin-left: auto; color: #ee0437;" onclick="window.removeFromCart('${item.name}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    if (cartCountEl) cartCountEl.innerText = totalItems;
    if (cartTotalCountEl) cartTotalCountEl.innerText = totalItems;
};

window.sendWhatsAppOrder = function () {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const phoneNumber = '584121750292';
    let message = '¡Hola! Quisiera realizar el siguiente pedido a través de la web:\n\n';

    cart.forEach(item => {
        message += `✅ *${item.quantity}x* ${item.name}\n`;
    });

    message += `\n*Total de items:* ${cart.reduce((acc, item) => acc + item.quantity, 0)}\n`;
    message += `\nPor favor, confírmenme disponibilidad para coordinar el pago y envío.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
};

// Inicializar UI del carrito al cargar
document.addEventListener('DOMContentLoaded', () => {
    window.updateCartUI();
});

// === LÓGICA DE MENÚ MÓVIL ===
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Bloquear scroll del body cuando el menú está abierto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú si se redimensiona la pantalla a desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991 && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// === PREVENIR ERRORES DE CARGA ===
window.addEventListener('error', function (e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Error al cargar imagen:', e.target.src);
    }
}, true);
