const character = document.getElementById("character");
const toggleBtn = document.getElementById("toggle-theme");

const popups = {
    instrumentales: document.getElementById("popup-instrumentales"),
    trabajos: document.getElementById("popup-trabajos"),
    contacto: document.getElementById("popup-contacto"),
    plugins: document.getElementById("popup-plugins"),
};

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
const offsetX = 20; // personaje a la derecha del cursor
const offsetY = -10; // personaje un poco más arriba

document.addEventListener("mousemove", (e) => {
    targetX = e.clientX + offsetX;
    targetY = e.clientY + offsetY;
});

function animateCharacter() {
    const speed = 0.05; // cuanto menor, más lento (ajústalo como quieras)
    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;

    character.style.transform = `translate(${currentX}px, ${currentY}px)`;
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
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const responseDiv = document.getElementById("form-response");
    responseDiv.textContent = "Mensaje enviado (simulado). ¡Gracias!";
    this.reset();
});
