// === ADMIN LOGIC - DELICIOUS ===

document.addEventListener('DOMContentLoaded', () => {
    // 1. Crear contenedor de Alerta Modal si no existe
    if (!document.getElementById('modalOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'modalOverlay';
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div id="modalAlert" class="modal-alert">
                <div class="modal-alert-icon">
                    <i class="fas fa-info-circle"></i>
                </div>
                <h3 id="modalTitle">Título</h3>
                <p id="modalMessage">Mensaje de prueba</p>
                <div style="display: flex; justify-content: center; gap: 1rem;">
                    <button id="modalBtn" class="btn btn-primary btn-modal">Entendido</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Cerrar modal al hacer clic en el botón
        document.getElementById('modalBtn').addEventListener('click', () => {
            overlay.classList.remove('active');
        });
    }

    const loginForm = document.getElementById('adminLoginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userInput = document.getElementById('username').value.toLowerCase();
            const passInput = document.getElementById('password').value;

            // Mapa de credenciales para la Demo
            const validUsers = {
                'admin': 'admin',
                'planta': 'planta',
                'logistica': 'logistica',
                'ventas': 'ventas',
                'calidad': 'calidad',
                'rrhh': 'rrhh'
            };

            // Validación (Password genérica o 1234 para demo)
            if (validUsers[userInput] && (passInput === `${userInput}2026` || passInput === '1234' || passInput === 'delicious2026')) {
                const role = validUsers[userInput];

                showModalAlert(
                    '¡Acceso Autorizado!',
                    `Credenciales verificadas para: ${userInput.toUpperCase()}. Entrando al Cerebro Operativo...`,
                    'success',
                    true
                );

                localStorage.setItem('admin_logged', 'true');
                localStorage.setItem('user_role', role); // Guardar el rol para el dashboard
            } else {
                showModalAlert(
                    'Fallo de Seguridad',
                    'El identificador o la clave son incorrectos. Por favor, verifica tus datos de acceso.',
                    'error'
                );
            }
        });
    }
});

/**
 * Sistema de Alertas Modales Premium (Floating Windows)
 */
function showModalAlert(title, message, type = 'success', redirect = false) {
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('modalAlert');
    const titleEl = document.getElementById('modalTitle');
    const msgEl = document.getElementById('modalMessage');
    const btnEl = document.getElementById('modalBtn');
    const iconEl = modal.querySelector('.modal-alert-icon i');

    // Configurar contenido
    modal.className = `modal-alert ${type}`;
    titleEl.innerText = title;
    msgEl.innerText = message;

    // Configurar icono
    iconEl.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-shield-alt';

    // Configurar botón
    btnEl.innerText = redirect ? 'Iniciando Sesión...' : 'Reintentar';
    if (redirect) btnEl.style.display = 'none';
    else btnEl.style.display = 'inline-flex';

    overlay.classList.add('active');

    // Manejar redirección automática si es éxito
    if (redirect) {
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1800);
    }
}

// Función para verificar sesión
window.checkAdminSession = function () {
    if (localStorage.getItem('admin_logged') !== 'true') {
        window.location.href = 'index.html';
    }
};
