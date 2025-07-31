const character = document.getElementById("character");
const toggleBtn = document.getElementById("toggle-theme");

const popups = {
    instrumentales: document.getElementById("popup-instrumentales"),
    trabajos: document.getElementById("popup-trabajos"),
    contacto: document.getElementById("popup-contacto"),
    plugins: document.getElementById("popup-plugins"),
};

const obstacles = [
    document.getElementById("obstacle"),
];

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.02; // Cambia este valor para más rapidez
const offsetDistance = 20; // Distancia al cursor (en px)

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function isColliding(x, y, width, height, rect) {
    return !(
        x + width < rect.left ||
        x > rect.right ||
        y + height < rect.top ||
        y > rect.bottom
    );
}

function animateCharacter() {
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;
    const distance = Math.hypot(dx, dy);

    if (distance > 1) {
        const directionX = dx / distance;
        const directionY = dy / distance;

        const targetX = mouseX - directionX * offsetDistance;
        const targetY = mouseY - directionY * offsetDistance;

        let nextX = currentX + (targetX - currentX) * speed;
        let nextY = currentY + (targetY - currentY) * speed;

        const characterRect = {
            x: nextX,
            y: nextY,
            width: character.offsetWidth,
            height: character.offsetHeight,
        };

        // Detectar colisión con obstáculos
        const obstacle = obstacles.find((obs) => {
            const obsRect = obs.getBoundingClientRect();
            return isColliding(characterRect.x, characterRect.y, characterRect.width, characterRect.height, obsRect);
        });

        if (obstacle) {
            // Rebote: invertir parcialmente la dirección del movimiento
            const bounceFactor = 0.6;

            nextX = currentX - dx * bounceFactor * speed;
            nextY = currentY - dy * bounceFactor * speed;
        }

        currentX = nextX;
        currentY = nextY;
        character.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    requestAnimationFrame(animateCharacter);
}

animateCharacter();

function openWindow(id) {
    Object.values(popups).forEach((popup) => popup.classList.add("hidden"));
    if (popups[id]) popups[id].classList.remove("hidden");
}

function closeWindow(id) {
    if (popups[id]) popups[id].classList.add("hidden");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

// Añadir eventos click a las zonas
document.getElementById("instrumentales").addEventListener("click", () => openWindow("instrumentales"));
document.getElementById("trabajos").addEventListener("click", () => openWindow("trabajos"));
document.getElementById("contacto").addEventListener("click", () => openWindow("contacto"));
document.getElementById("plugins").addEventListener("click", () => openWindow("plugins"));

// Formulario de contacto (simple simulación)
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const responseDiv = document.getElementById("form-response");
        responseDiv.textContent = "Mensaje enviado (simulado). ¡Gracias!";
        this.reset();
    });
}
