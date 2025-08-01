// Referencias a elementos HTML
const character = document.getElementById("character");
const toggleBtn = document.getElementById("toggle-theme");

// Popups por id para abrir/cerrar
const popups = {
    instrumentales: document.getElementById("popup-instrumentales"),
    trabajos: document.getElementById("popup-trabajos"),
    contacto: document.getElementById("popup-contacto"),
    plugins: document.getElementById("popup-plugins"),
};

// Variables para posición del ratón y personaje
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.02;         // Velocidad de movimiento suave
const offsetDistance = 20;  // Distancia entre ratón y personaje

// Variables para animación de sprites
const totalFrames = 4;       // Número de frames en el spritesheet
const frameWidth = 32;       // Ancho de cada frame
let frameIndex = 0;          // Frame actual
const frameChangeInterval = 200; // ms entre cambios de frame

// Variable para dirección horizontal (1 = derecha, -1 = izquierda)
let lastDirectionX = 1;

// Obstáculos detectados para colisiones
const obstacles = Array.from(document.querySelectorAll(".obstacle"));

// Actualizar posición del ratón en cada movimiento
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Función que comprueba si la posición dada colisiona con algún obstáculo
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

// Función que actualiza el frame del personaje para simular animación
function updateFrame() {
    frameIndex = (frameIndex + 1) % totalFrames;
    // Cambiar la posición del fondo para mostrar el frame correcto del spritesheet
    character.style.backgroundPosition = `-${frameIndex * frameWidth}px 0`;
}

// Función principal que anima el personaje y gestiona colisiones y flip
function animateCharacter() {
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;
    const distance = Math.hypot(dx, dy);

    if (distance > 1) {
        const directionX = dx / distance;
        const directionY = dy / distance;

        // Actualizamos la dirección horizontal para flip
        if (directionX > 0.1) {
            lastDirectionX = 1; // mirar a la derecha
        } else if (directionX < -0.1) {
            lastDirectionX = -1; // mirar a la izquierda
        }

        // Calculamos la posición objetivo con offset para que el personaje no esté exactamente bajo el ratón
        const targetX = mouseX - directionX * offsetDistance;
        const targetY = mouseY - directionY * offsetDistance;

        // Movimiento suave hacia la posición objetivo
        let nextX = currentX + (targetX - currentX) * speed;
        let nextY = currentY + (targetY - currentY) * speed;

        const spriteWidth = frameWidth;
        const spriteHeight = 32;

        // Comprobar colisión eje X y ajustar posición
        if (!isColliding(nextX, currentY, spriteWidth, spriteHeight)) {
            currentX = nextX;
        } else {
            currentX -= directionX * 10; // rebote simple
        }

        // Comprobar colisión eje Y y ajustar posición
        if (!isColliding(currentX, nextY, spriteWidth, spriteHeight)) {
            currentY = nextY;
        } else {
            currentY -= directionY * 10; // rebote simple
        }

        // Aplicar la transformación con posición y flip horizontal (scaleX)
        character.style.transform = `translate(${currentX}px, ${currentY}px) scaleX(${lastDirectionX})`;
    }

    // Pedimos siguiente frame de animación del navegador
    requestAnimationFrame(animateCharacter);
}

// Iniciamos la animación del personaje
animateCharacter();

// Cambiamos frames automáticamente cada cierto intervalo para animación
setInterval(updateFrame, frameChangeInterval);

/* --- Resto de tu código original con anotaciones --- */

// Funciones para abrir y cerrar ventanas popup
function openWindow(id) {
    Object.values(popups).forEach(popup => popup.classList.add("hidden"));
    if (popups[id]) {
        popups[id].classList.remove("hidden");
        popups[id].querySelector(".popup-content").scrollTop = 0;
    }
}

function closeWindow(id) {
    if (popups[id]) popups[id].classList.add("hidden");
}

// Cambiar modo claro/oscuro
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    updateThemeIcon();
});

// Eventos click para abrir ventanas popup
document.getElementById("instrumentales").addEventListener("click", () => openWindow("instrumentales"));
document.getElementById("trabajos").addEventListener("click", () => openWindow("trabajos"));
document.getElementById("contacto").addEventListener("click", () => openWindow("contacto"));
document.getElementById("plugins").addEventListener("click", () => openWindow("plugins"));

// Formulario contacto (simulado) - si existe en contenido popup
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const responseDiv = document.getElementById("form-response");
        responseDiv.textContent = "Mensaje enviado (simulado). ¡Gracias!";
        this.reset();
    });
}

// Actualiza el icono del botón modo claro/oscuro (sol o luna)
function updateThemeIcon() {
    const isLight = document.body.classList.contains("light-mode");
    toggleBtn.textContent = isLight ? "🌙" : "☀️";
}

// Llamada inicial para establecer icono al cargar la página
updateThemeIcon();
