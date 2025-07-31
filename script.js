const character = document.getElementById("character");
const toggleBtn = document.getElementById("toggle-theme");

const popups = {
    instrumentales: document.getElementById("popup-instrumentales"),
    trabajos: document.getElementById("popup-trabajos"),
    contacto: document.getElementById("popup-contacto"),
    plugins: document.getElementById("popup-plugins"),
};

document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    character.style.transform = `translate(${x}px, ${y}px)`;
});

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
