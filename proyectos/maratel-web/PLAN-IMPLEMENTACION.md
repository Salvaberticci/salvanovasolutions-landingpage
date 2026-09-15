# Plan de Implementación — Landing Page Maratel

**Empresa:** Comunicaciones Maratel C.A.
**Producto:** Internet 100% Fibra Óptica (FTTH) hasta el hogar y empresas
**Fecha:** Agosto 2026
**Stack:** HTML5 + CSS3 (Tailwind CSS vía CDN) + JavaScript vanilla
**Estado:** ✅ Implementación completa

---

## 1. Objetivo del proyecto

Crear una landing page de alto impacto, moderna, futurista y 100% responsive para captar clientes residenciales y empresariales. El objetivo principal es la **generación de leads**: que el visitante deje su teléfono/dirección para que un asesor valide cobertura por WhatsApp en menos de 5 minutos.

## 2. Stack tecnológico

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura de la página |
| Tailwind CSS (CDN) | Estilos utilitarios, responsive |
| CSS personalizado | Animaciones, efectos futuristas, glassmorphism |
| JavaScript vanilla | Menú móvil, scroll reveal, formulario, año dinámico |
| Google Fonts | Inter + Space Grotesk |

Sin frameworks pesados, sin build tools. Servido desde XAMPP en `maratel-web/`.

```
maratel-web/
├── index.html              ← Página principal
├── css/
│   └── styles.css          ← Estilos custom (glassmorphism, gradientes, reveal)
├── js/
│   └── main.js             ← Interactividad (menú, scroll, form→WhatsApp)
├── PLAN-IMPLEMENTACION.md  ← Este archivo
└── assets/                 ← (futuro: logo, fotos, favicon)
```

## 3. Paleta de colores (negro + azul)

| Color | Hex | Uso |
|---|---|---|
| Negro profundo | `#05080F` | Fondo principal |
| Azul carbón | `#0B1120` / `#0D1526` | Tarjetas, secciones secundarias |
| Azul eléctrico | `#2563EB` | Acciones principales, CTA, acentos |
| Cian eléctrico | `#22D3EE` | Hovers, gradientes, toques futuristas |
| Azul claro | `#3B82F6` / `#60A5FA` | Hovers, gradientes de texto |
| Gris texto | `#94A3B8` / `#D1D5DB` | Texto secundario |

**Reglas de uso:**
- Fondo siempre oscuro (negro) con acentos azules/cianos.
- Gradientes de texto azul en H1 y precios destacados.
- Glows azules en tarjetas al hacer hover.
- Botones CTA con gradiente `cyan → azul` + efecto shine.
- Bordes sutiles en tarjetas (`#1E293B`).

## 4. Estructura de la página (7 secciones)

| # | Sección | Ancla | Contenido |
|---|---|---|---|
| 1 | Navbar fija | — | Logo maratel + ícono, enlaces (Inicio, Ventajas, Planes, Cobertura, Aliados), CTA "Contratar Ahora" (gradiente), "Reportar Pago" (borde). Menú hamburguesa en móvil. |
| 2 | Hero | `#inicio` | Badge "Nueva red 100% Fibra Óptica hasta el hogar", H1 "Navega a la velocidad que mereces" (gradiente azul), subtítulo, CTAs "Ver Planes Disponibles" + "Validar Cobertura". Orbes de luz azul animados + grid futurista. |
| 3 | Ventajas | `#ventajas` | "¿Por qué elegir Maratel?" + 4 tarjetas con iconos SVG: Velocidad Simétrica, Router WiFi 6, Estabilidad Total, Soporte 24/7. |
| 4 | Planes | `#planes` | 3 tarjetas: Básico Hogar (600 Mbps / REF 20), Familiar Pro (1000 Mbps / REF 25, destacado con borde azul), Pyme (1000 Mbps / REF 35). |
| 5 | Cobertura | `#cobertura` | Formulario: "¿Listo para volar en internet?" → input + botón "Consultar" → redirige a WhatsApp. |
| 6 | Aliados | `#aliados` | "Conectando hogares y empresas..." + estadísticas (500+, 99.9%, 24/7, 1 Gbps) con números en gradiente. |
| 7 | Footer | — | Logo, descripción, columnas (Empresa, Soporte, Legal), redes sociales (FB, IG, X), © 2026. |

## 5. Funcionalidades JavaScript

1. **Menú móvil hamburguesa** — toggle con animación CSS + fondo oscuro a pantalla completa.
2. **Scroll reveal** — IntersectionObserver con fallback de 2s para compatibilidad.
3. **Navbar dinámica** — se vuelve sólida con blur al hacer scroll.
4. **Formulario → WhatsApp** — validación + apertura de `wa.me` con mensaje prellenado.
5. **Toast de confirmación** — notificación visual al enviar formulario.
6. **Parallax de los orbes** — efecto sutil de seguimiento del mouse en el hero.
7. **Año dinámico** — `currentYear` actualizado automáticamente.
8. **Smooth scroll** — desplazamiento suave a secciones.
9. **Nav link activo** — resalta el enlace según la sección visible.

## 6. Diseño visual (negro + azul futurista)

- **Glassmorphism** en navbar (`backdrop-blur` + fondo semitransparente).
- **Grid pattern** sutil en el hero (líneas azules al 4% opacidad).
- **Orbes de luz** — dos esferas difuminadas (azul + cian) animadas con `drift` y parallax del mouse.
- **Gradient text** — "que mereces." y estadísticas con gradiente `cian → azul`.
- **Botones gradiente** — `bg-gradient-to-r from-cyan to-blue` + barrido de brillo al hover (`::after` shine).
- **Glow pulse** en la tarjeta Familiar Pro (animación `pulseGlow` azul/cian).
- **Hover effects** en tarjetas: elevación + sombra azul + borde luminoso superior degradado.
- **Tipografía** — Space Grotesk en títulos y números de planes, Inter en cuerpo.
- **Scrollbar** personalizado con gradiente cian→azul.
- **Iconos SVG inline** sin dependencias externas.

## 7. Responsive

- **Móvil (< 640px):** menú hamburguesa, tarjetas en 1 columna, textos escalados, orbes reducidos.
- **Tablet (640-1024px):** 2 columnas en ventajas.
- **Desktop (≥ 1024px):** 4 columnas ventajas, 3 columnas planes, navbar completa.
- Breakpoints de Tailwind: `sm`, `md`, `lg`.

## 8. Fases completadas

| Fase | Tarea | Estado |
|---|---|---|
| 1 | Estructura HTML (navbar, hero, ventajas, planes, cobertura, aliados, footer) | ✅ |
| 2 | Estilos Tailwind + CSS personalizado (paleta negro/azul, glows, glassmorphism) | ✅ |
| 3 | Responsive completo (mobile-first) | ✅ |
| 4 | JavaScript (menú, reveal, form→WhatsApp, parallax, toast) | ✅ |
| 5 | Iconos SVG inline (sin dependencias externas) | ✅ |
| 6 | Pruebas en navegador (0 errores, 0 requests fallidos) | ✅ |
| 7 | Despliegue local en XAMPP | ✅ |

## 9. Cómo acceder

```
http://localhost/maratel-web/
```

XAMPP debe estar ejecutándose con Apache activo.

## 10. Pendiente para producción

- [ ] Reemplazar `58XXXXXXXXXX` en `js/main.js` con el número real de WhatsApp.
- [ ] Agregar logo oficial de Maratel en `assets/img/`.
- [ ] Agregar favicon.
- [ ] Agregar imagen de fondo o ilustración en el hero (opcional).
- [ ] Conectar formulario a backend o servicio de captura de leads (Formspree, etc.).
- [ ] Agregar meta tags SEO y Open Graph.
- [ ] Agregar schema.org `LocalBusiness`.
- [ ] Optimizar para SEO (títulos, descripciones, alt texts).

## 11. Ideas futuras (v2)

- Test de velocidad embebido (Speedtest widget).
- Mapa interactivo de cobertura por zona.
- Página de soporte y FAQ.
- Backend para captura de leads + panel de administración.
- Sección de testimonios de clientes.
- Animaciones Lottie en el hero.