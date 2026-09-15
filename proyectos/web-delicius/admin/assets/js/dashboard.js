// === DASHBOARD LOGIC - DELICIOUS ===

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sistema de Alerta Modal para Demo ---
    if (!document.getElementById('modalOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'modalOverlay';
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div id="modalAlert" class="modal-alert">
                <div class="modal-alert-icon"><i class="fas fa-info-circle"></i></div>
                <h3 id="modalTitle">Título de Demo</h3>
                <p id="modalMessage">Este es un mensaje de simulación operativa.</p>
                <div style="display: flex; justify-content: center; gap: 1rem;">
                    <button id="modalBtn" class="btn btn-primary btn-modal">Cerrar Notificación</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        document.getElementById('modalBtn').addEventListener('click', () => overlay.classList.remove('active'));
    }

    function showDemoAlert(title, message, type = 'success') {
        const overlay = document.getElementById('modalOverlay');
        const modal = document.getElementById('modalAlert');
        const icon = modal.querySelector('.modal-alert-icon i');

        modal.className = `modal-alert ${type}`;
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalMessage').innerText = message;
        icon.className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}`;

        overlay.classList.add('active');
    }

    // --- 2. Inicializar Gráfico de Producción vs Demanda ---
    const ctx = document.getElementById('prodChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                datasets: [{
                    label: 'Producción',
                    data: [1200, 1900, 1500, 2500, 2200, 3000],
                    borderColor: '#E30613',
                    backgroundColor: 'rgba(227, 6, 19, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Demanda',
                    data: [1500, 1700, 1800, 2100, 2400, 2800],
                    borderColor: '#1A1A1A',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { family: 'Inter', size: 10 } }
                    }
                },
                scales: {
                    y: { beginAtZero: true, display: false },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // --- 3. Animación de Contadores KPI ---
    const counters = document.querySelectorAll('.kpi-value');
    counters.forEach(counter => {
        const originalText = counter.innerText;
        // Extraer solo el número (ignorando $, %, SKU, etc. para la lógica del contador)
        const numericValue = parseFloat(originalText.replace(/[^0-9.]/g, ''));

        if (isNaN(numericValue) || originalText.includes('$') || originalText.includes('%')) return;

        let count = 0;
        const target = numericValue;
        const speed = 100;
        const suffix = originalText.replace(/[0-9.]/g, '').trim(); // Capturar SKU, etc.

        const updateCount = () => {
            const inc = target / speed;
            if (count < target) {
                count += inc;
                counter.innerText = Math.ceil(count) + (suffix ? ' ' + suffix : '');
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + (suffix ? ' ' + suffix : '');
            }
        };
        updateCount();
    });

    // --- 4. Sistema de Navegación entre Vistas (SPA) ---
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const views = document.querySelectorAll('.admin-view');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const viewId = this.getAttribute('data-view');
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            views.forEach(v => {
                v.classList.remove('active');
                if (v.id === `view-${viewId}`) v.classList.add('active');
            });
        });
    });

    // --- 5. INTERACTIVIDAD DE DEMO (Simulaciones) ---

    // Filtros de Pedidos
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.closest('.notif-header')) return; // Evitar conflictos con cabeceras

            this.parentElement.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterText = this.innerText;
            if (filterText.includes('Excel') || filterText.includes('Exportar')) {
                showDemoAlert('Exportación Exitosa', 'El reporte se ha generado y descargado en formato .xlsx correctamente.');
            } else if (filterText.includes('PDF')) {
                showDemoAlert('Generando Informe', 'El documento BI está siendo procesado para su exportación a PDF.');
            } else if (filterText.includes('Actualizar')) {
                showDemoAlert('Sincronización', 'Datos operativos actualizados en tiempo real.');
            }

        });
    });

    // --- Lógica de Filtrado Multi-Criterio para Centro de Mando ---
    const cityFilter = document.getElementById('filterCity');
    const statusFilter = document.getElementById('filterStatus');
    const amountFilter = document.getElementById('filterMinAmount');
    const resetBtn = document.getElementById('resetOrderFilters');

    function applyFilters() {
        const cityVal = cityFilter ? cityFilter.value.toLowerCase() : 'all';
        const statusVal = statusFilter ? statusFilter.value.toLowerCase() : 'all';
        const minAmount = amountFilter ? (parseFloat(amountFilter.value) || 0) : 0;

        const table = document.querySelector('.main-panel .admin-table');
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            if (row.cells.length < 5) return;

            const cityText = row.cells[2].innerText.toLowerCase();
            const amountRaw = row.cells[3].innerText;
            const amountNum = parseFloat(amountRaw.replace(/[^0-9.]/g, '')) || 0;
            const statusText = row.cells[4].innerText.toLowerCase();

            const matchCity = cityVal === 'all' || cityText.includes(cityVal);
            const matchStatus = statusVal === 'all' || statusText.includes(statusVal);
            const matchAmount = amountNum >= minAmount;

            row.style.display = (matchCity && matchStatus && matchAmount) ? '' : 'none';
        });
    }

    if (cityFilter) cityFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (amountFilter) amountFilter.addEventListener('input', applyFilters);

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (cityFilter) cityFilter.value = 'all';
            if (statusFilter) statusFilter.value = 'all';
            if (amountFilter) amountFilter.value = '';
            applyFilters();
            showDemoAlert('Filtros Limpiados', 'Se ha restablecido la vista completa de pedidos.', 'info');
        });
    }

    // --- 11. Motor de Búsqueda Global (Universal Search) ---
    const globalSearchInput = document.getElementById('globalSearch');
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const activeView = document.querySelector('.admin-view.active');
            if (!activeView) return;

            const rows = activeView.querySelectorAll('.admin-table tbody tr');
            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // Botones de Acción (Iconos en tablas)
    document.querySelectorAll('.btn-icon').forEach(btn => {
        btn.addEventListener('click', function () {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-eye')) {
                showDemoAlert('Detalle de Pedido', 'Abriendo visor técnico del pedido seleccionado para revisión de planta.');
            } else if (icon.classList.contains('fa-edit')) {
                showDemoAlert('Edición de Registro', 'Cargando formulario de ajuste y parámetros técnicos del sistema.');
            } else if (icon.classList.contains('fa-address-book')) {
                showDemoAlert('Ficha de Cliente', 'Accediendo al historial de compras y estado de cuenta del aliado comercial.');
            } else if (icon.classList.contains('fa-file-pdf')) {
                showDemoAlert('Certificado de Calidad', 'Generando documento de aprobación técnica del lote seleccionado.');
            }
        });
    });

    // Botones Principales (Añadir / Optimizar / Registrar)
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.classList.contains('btn-modal')) return; // Ignorar el del modal

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const text = this.innerText.toLowerCase();
            const icon = this.querySelector('i');

            if (text.includes('añadir') || text.includes('nuevo') || text.includes('registrar')) {
                if (icon && icon.classList.contains('fa-vial')) {
                    showDemoAlert('Análisis de Laboratorio', 'Iniciando registro de parámetros físico-químicos para el nuevo lote.');
                } else if (icon && icon.classList.contains('fa-user-plus')) {
                    showDemoAlert('Gestión de Personal', 'Abriendo ficha de ingreso para el nuevo colaborador de planta.');
                } else {
                    showDemoAlert('Nuevo Registro', 'Iniciando asistente de creación. Por favor, complete los campos técnicos requeridos.');
                }
            } else if (text.includes('optimizar') || text.includes('falla')) {
                if (text.includes('falla')) {
                    showDemoAlert('Reporte Técnico', 'Alerta de mantenimiento enviada al equipo de ingeniería de planta.');
                } else {
                    showDemoAlert('Optimizador Industrial', 'Cálculo de eficiencia iniciado. Asignando recursos y rutas...');
                }
            } else if (text.includes('guardar')) {
                showDemoAlert('Cambios Guardados', 'Los parámetros operativos han sido actualizados en la configuración central.');
            } else if (text.includes('pdf')) {
                showDemoAlert('Módulo de BI', 'El informe ejecutivo está siendo exportado con los últimos cierres operativos.');
            }
        });
    });

    // Perfil de Usuario
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', () => {
            showDemoAlert('Perfil Administrativo', 'Acceso a configuración de privilegios y seguridad del sistema.');
        });
    }

    // Badge SalvaNova
    const badge = document.querySelector('.author-badge');
    if (badge) {
        badge.addEventListener('click', () => {
            showDemoAlert('Soporte Técnico', 'Conectando con el centro de soluciones SalvaNova para asistencia industrial.');
        });
    }

    // --- 6. Simulación de Mapa Interactivo ---
    const mapContainer = document.getElementById('venezuela-map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <svg viewBox="0 0 200 150" style="width: 100%; height: 100%;">
                <path d="M50,30 Q80,10 120,20 T150,50 T130,100 T80,130 T30,100 T40,60 Z" fill="#f0f0f0" stroke="#ddd" stroke-width="1"/>
                <circle cx="80" cy="50" r="5" fill="#E30613" opacity="0.6"><animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" /></circle>
                <circle cx="120" cy="40" r="8" fill="#E30613" opacity="0.4"><animate attributeName="r" values="5;10;5" dur="3s" repeatCount="indefinite" /></circle>
                <circle cx="100" cy="80" r="4" fill="#E30613" opacity="0.8"><animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" /></circle>
            </svg>
            <p style="font-size: 0.75rem; color: #666; margin-top: 10px;">Densidad de Pedidos: <strong>Región Central Alta</strong></p>
        `;
    }

    // --- 7. Sistema de Notificaciones Dinámicas (Demo Flow) ---
    const notifList = document.querySelector('.notif-list');
    const demoAlerts = [
        { text: "Lote #503 de Chocolate entrando a fase de empaque.", time: "Ahora mismo", critical: false },
        { text: "Transporte Logístico #TR-22 reporta llegada a Valencia.", time: "Hace 1 min", critical: false },
        { text: "ALERTA: Sensor de temperatura en Silo 3 fuera de rango.", time: "Hace 2 min", critical: true },
        { text: "Control de Calidad: Lote L-A2026-05 aprobado satisfactoriamente.", time: "Hace 3 min", critical: false },
        { text: "Mantenimiento: Cambio de válvulas en Caldera Principal completado.", time: "Hace 5 min", critical: false },
        { text: "Nuevo pedido mayorista detectado: Tiendas Caracas (1,200 und).", time: "Hace 6 min", critical: false },
        { text: "ALERTA: Baja presión detectada en línea de vapor sector B.", time: "Hace 8 min", critical: true },
        { text: "Logística: Unidad #TR-45 iniciando ruta de despacho Occidente.", time: "Hace 10 min", critical: false },
        { text: "Personal: Cambio de turno a 'Tarde' operando al 100% de capacidad.", time: "Hace 12 min", critical: false },
        { text: "Reporte BI: Meta de producción semanal alcanzada (102%).", time: "Hace 15 min", critical: false }
    ];

    let notifCount = 0;
    const maxNotifs = 10;

    function addNotification(alert) {
        if (!notifList) return;

        const item = document.createElement('div');
        item.className = `notif-item ${alert.critical ? 'critical' : ''}`;
        item.style.animation = 'slideInRight 0.5s ease forwards';

        const iconClass = alert.critical ? 'fa-exclamation-triangle' : 'fa-info-circle';

        item.innerHTML = `
            <div class="notif-icon"><i class="fas ${iconClass}"></i></div>
            <div class="notif-content">
                <p>${alert.text}</p>
                <span class="notif-time">${alert.time}</span>
            </div>
        `;

        notifList.prepend(item);

        // Limitar visualmente a 6 items para mantener el diseño
        if (notifList.children.length > 6) {
            notifList.lastElementChild.remove();
        }
    }

    if (notifList) {
        const interval = setInterval(() => {
            if (notifCount < maxNotifs) {
                addNotification(demoAlerts[notifCount % demoAlerts.length]);
                notifCount++;
                console.log(`Demo Notification ${notifCount}/${maxNotifs} added.`);
            } else {
                clearInterval(interval);
                console.log("Demo Notification sequence completed.");
            }
        }, 20000); // Cada 20 segundos
    }

    // --- 8. Gestión de Roles Dinámicos (Demo Permissions) ---
    const roleSelector = document.getElementById('roleSelector');
    const userNameEl = document.querySelector('.user-name');
    const userRoleEl = document.querySelector('.user-role');
    const userAvatarEl = document.querySelector('.user-avatar');

    const roleConfig = {
        admin: { name: "Admin Delicious", role: "Super User", views: ['general', 'orders', 'inventory', 'logistics', 'clients', 'hr', 'maintenance', 'quality', 'reports', 'settings', 'users'] },
        planta: { name: "Ing. Carlos Ruiz", role: "Jefe de Planta", views: ['general', 'inventory', 'maintenance', 'quality'] },
        logistica: { name: "Marcos Valles", role: "Coord. Logística", views: ['general', 'orders', 'logistics'] },
        ventas: { name: "Sofía Méndez", role: "Gerente Ventas", views: ['general', 'orders', 'clients', 'reports'] },
        calidad: { name: "Dra. Ana Bravo", role: "Analista Calidad", views: ['general', 'quality', 'reports'] },
        rrhh: { name: "Laura Estévez", role: "Jefe RRHH", views: ['general', 'hr'] }
    };

    function updateUIForRole(roleKey) {
        const config = roleConfig[roleKey];
        if (!config) return;

        // 1. Actualizar Identidad
        userNameEl.innerText = config.name;
        userRoleEl.innerText = config.role;
        userAvatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(config.name)}&background=${roleKey === 'admin' ? 'E30613' : '1a1a1a'}&color=fff`;

        // 2. Filtrar Navegación
        navItems.forEach(item => {
            const view = item.getAttribute('data-view');
            if (config.views.includes(view)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // 3. Forzar vista General si el rol actual no tiene acceso a la vista activa
        const currentActiveView = document.querySelector('.nav-item.active').getAttribute('data-view');
        if (!config.views.includes(currentActiveView)) {
            const generalTab = document.querySelector('.nav-item[data-view="general"]');
            if (generalTab) generalTab.click();
        }

        showDemoAlert('Perfil Cambiado', `Ahora operando como: ${config.role}. Módulos restringidos aplicados.`);
    }

    if (roleSelector) {
        roleSelector.addEventListener('change', (e) => {
            updateUIForRole(e.target.value);
        });
    }

    // --- 9. Inicialización de Sesión (Cargar Rol Guardado) ---
    const savedRole = localStorage.getItem('user_role');
    if (savedRole && roleConfig[savedRole]) {
        if (roleSelector) roleSelector.value = savedRole;
        updateUIForRole(savedRole);
    } else {
        // Por defecto Admin si no hay nada (fuerza la UI inicial)
        updateUIForRole('admin');
    }

    // --- 10. Lógica de Cerrar Sesión ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            showDemoAlert('Cerrando Sesión', 'Limpiando credenciales y desconectando del servidor operativo...', 'info');

            setTimeout(() => {
                localStorage.removeItem('admin_logged');
                localStorage.removeItem('user_role');
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // Seguridad Básica: Redirigir si no hay sesión
    if (localStorage.getItem('admin_logged') !== 'true') {
        window.location.href = 'index.html';
    }

    console.log("Delicious Demo Mode: Multi-Module, Real-time & Role-Based Access active.");
});
