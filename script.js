const character = document.getElementById("character");
const toggleBtn = document.getElementById("toggle-theme");

const popups = {
    instrumentales: document.getElementById("popup-instrumentales"),
    trabajos: document.getElementById("popup-trabajos"),
    contacto: document.getElementById("popup-contacto"),
    plugins: document.getElementById("popup-plugins"),
};

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.02;
const offsetDistance = 20;

// Obstáculo central (selector con clase .obstacle)
const obstacles = Array.from(document.querySelectorAll(".obstacle"));

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

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

        const spriteWidth = 32;
        const spriteHeight = 32;

        // Comprobar colisión X
        if (!isColliding(nextX, currentY, spriteWidth, spriteHeight)) {
            currentX = nextX;
        } else {
            currentX -= directionX * 10; // "rebote" sencillo
        }

        // Comprobar colisión Y
        if (!isColliding(currentX, nextY, spriteWidth, spriteHeight)) {
            currentY = nextY;
        } else {
            currentY -= directionY * 10; // "rebote" sencillo
        }

        character.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    requestAnimationFrame(animateCharacter);
}

animateCharacter();

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

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

// Eventos click en zonas
document.getElementById("instrumentales").addEventListener("click", () => openWindow("instrumentales"));
document.getElementById("trabajos").addEventListener("click", () => openWindow("trabajos"));
document.getElementById("contacto").addEventListener("click", () => openWindow("contacto"));
document.getElementById("plugins").addEventListener("click", () => openWindow("plugins"));

// No necesitas listener para botones cerrar porque usan inline onclick ya definido

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
