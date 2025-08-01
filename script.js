// --- script.js ---

// Referencias a elementos DOM importantes
const character = document.getElementById("character");
const toggleBtn = document.getElementById("toggle-theme");

// Objeto con referencias a las ventanas emergentes
const popups = {
    instrumentales: document.getElementById("popup-instrumentales"),
    trabajos: document.getElementById("popup-trabajos"),
    contacto: document.getElementById("popup-contacto"),
    plugins: document.getElementById("popup-plugins"),
};

// Variables para la posición del ratón y del personaje
let mouseX = 0, mouseY = 0;         // Posición actual del ratón
let currentX = 0, currentY = 0;     // Posición actual del personaje
const speed = 0.02;                 // Velocidad de movimiento del personaje
const offsetDistance = 20;          // Distancia que mantiene el personaje respecto al cursor

// Obstáculos que el personaje no puede atravesar (en este caso, el central)
const obstacles = Array.from(document.querySelectorAll(".obstacle"));

// Actualizamos la posición del ratón al moverlo
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Función que comprueba si una posición (x,y) con ancho y alto colisiona con algún obstáculo
function isColliding(x, y, width = 32, height = 32) {
    return obstacles.some(ob => {
        const rect = ob.getBoundingClientRect();
        return (
            x < rect.right &&
            x + width > rect.left &&
            y < rect.bottom &&
            y + height > rect.top
        );
    });
}

// Función que anima el movimiento suave del personaje siguiendo el cursor con colisiones
function animateCharacter() {
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;
    const distance = Math.hypot(dx, dy);

    if (distance > 1.8) { // Si el personaje está suficientemente lejos del ratón, se mueve
        const directionX = dx / distance;
        const directionY = dy / distance;

        // Calculamos la posición objetivo (a offsetDistance pixeles detrás del cursor)
        const targetX = mouseX - directionX * offsetDistance;
        const targetY = mouseY - directionY * offsetDistance;

        // Calculamos la siguiente posición interpolada (suavizada)
        let nextX = currentX + (targetX - currentX) * speed;
        let nextY = currentY + (targetY - currentY) * speed;

        const spriteWidth = 90;
        const spriteHeight = 90;

        // Comprobamos colisión horizontal y aplicamos "rebote" si es necesario
        if (!isColliding(nextX, currentY, spriteWidth, spriteHeight)) {
            currentX = nextX;
        } else {
            currentX -= directionX * 100; // Rebote sencillo en X
        }

        // Comprobamos colisión vertical y aplicamos "rebote" si es necesario
        if (!isColliding(currentX, nextY, spriteWidth, spriteHeight)) {
            currentY = nextY;
        } else {
            currentY -= directionY * 100; // Rebote sencillo en Y
        }

        // Aplicamos la transformación CSS para mover el personaje
        character.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    // Pedimos la siguiente animación
    requestAnimationFrame(animateCharacter);
}

// Iniciamos la animación del personaje
animateCharacter();

// Función para abrir una ventana emergente concreta y ocultar las demás
function openWindow(id) {
    Object.values(popups).forEach(popup => popup.classList.add("hidden"));
    if (popups[id]) {
        popups[id].classList.remove("hidden");
        popups[id].querySelector(".popup-content").scrollTop = 0; // Scroll arriba
    }
}

// Función para cerrar una ventana emergente concreta
function closeWindow(id) {
    if (popups[id]) popups[id].classList.add("hidden");
}

// Evento para cambiar el modo claro/oscuro al hacer clic en el botón
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    updateThemeIcon();
});

// Eventos para abrir ventanas cuando se clican las zonas
document.getElementById("instrumentales").addEventListener("click", () => openWindow("instrumentales"));
document.getElementById("trabajos").addEventListener("click", () => openWindow("trabajos"));
document.getElementById("contacto").addEventListener("click", () => openWindow("contacto"));
document.getElementById("plugins").addEventListener("click", () => openWindow("plugins"));

// Formulario de contacto simulado: si existe, evita recargar y muestra mensaje de éxito
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const responseDiv = document.getElementById("form-response");
        responseDiv.textContent = "Mensaje enviado (simulado). ¡Gracias!";
        this.reset();
    });
}

// Función que actualiza el icono del botón según el modo actual (sol o luna)
function updateThemeIcon() {
    const isLight = document.body.classList.contains("light-mode");
    toggleBtn.textContent = isLight ? "🌙" : "☀️";
}

// Ejecutamos la función para poner el icono correcto al cargar la página
updateThemeIcon();
