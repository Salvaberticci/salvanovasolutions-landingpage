/**
 * Router SPA - Delicious
 * Sistema de routing para Single Page Application
 */

class Router {
    constructor() {
        this.routes = {
            '/catalogo': 'views/catalogo.html'
        };

        this.homeView = document.getElementById('home-view');
        this.appContent = document.getElementById('app-content');
        this.isNavigating = false;

        this.init();
    }

    async loadView(route) {
        if (this.isNavigating) return;
        this.isNavigating = true;

        try {
            // Caso 1: Navegar al Catálogo (Vista Dinámica)
            if (route === '/catalogo') {
                this.homeView.style.display = 'none';
                this.appContent.style.display = 'block';
                this.appContent.classList.add('view-transition-out');

                const response = await fetch(this.routes['/catalogo']);
                const html = await response.text();

                this.appContent.innerHTML = html;
                this.appContent.classList.remove('view-transition-out');
                this.appContent.classList.add('view-transition-in');

                window.scrollTo(0, 0);
                if (window.initScrollAnimations) window.initScrollAnimations();

                setTimeout(() => {
                    this.appContent.classList.remove('view-transition-in');
                    if (window.initProductModals) window.initProductModals();
                    if (window.initCatalogoFilters) window.initCatalogoFilters();

                    // Control de visibilidad del carrito
                    const cartFab = document.getElementById('cart-fab');
                    if (cartFab) {
                        if (route === '/catalogo') {
                            cartFab.classList.add('visible');
                        } else {
                            cartFab.classList.remove('visible');
                            // Cerrar el drawer si se navega fuera del catálogo
                            const cartDrawer = document.getElementById('cart-drawer');
                            if (cartDrawer) cartDrawer.classList.remove('active');
                        }
                    }

                    this.isNavigating = false;
                }, 500);
            }
            // Caso 2: Navegar a secciones de la Landing (Historia, Productos, etc.)
            else {
                this.appContent.style.display = 'none';
                this.homeView.style.display = 'block';

                // Determinar si es una sub-sección o el home literal
                const sectionId = route.startsWith('/') ? route.slice(1) : route;
                const element = document.getElementById(sectionId);

                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                if (window.initScrollAnimations) window.initScrollAnimations();
                if (window.initContactForm) window.initContactForm();

                this.isNavigating = false;
            }

            this.updateNavActive(route);

        } catch (error) {
            console.error('Error en el router:', error);
            this.isNavigating = false;
        }
    }

    updateNavActive(route) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${route}`) {
                link.classList.add('active');
            }
        });
    }

    init() {
        window.addEventListener('hashchange', () => {
            const route = window.location.hash.slice(1) || '/';
            this.loadView(route);
        });

        // Carga inicial
        const initialRoute = window.location.hash.slice(1) || '/';
        this.loadView(initialRoute);
    }
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Router();
    });
} else {
    new Router();
}
