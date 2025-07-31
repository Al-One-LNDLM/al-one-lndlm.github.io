const character = document.getElementById("character");
const popup = document.getElementById("popup");
const toggleBtn = document.getElementById("toggle-theme");

document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    character.style.transform = `translate(${x}px, ${y}px)`;
});

function openWindow() {
    popup.classList.remove("hidden");
}

function closeWindow() {
    popup.classList.add("hidden");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});