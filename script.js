const character = document.getElementById("character");
const toggleBtn = document.getElementById("toggle-theme");

const popups = {
  instrumentales: document.getElementById("popup-instrumentales"),
  trabajos: document.getElementById("popup-trabajos"),
  contacto: document.getElementById("popup-contacto"),
  plugins: document.getElementById("popup-plugins"),
};

// Obstáculos para colisión
const obstacles = [document.getElementById("obstacle-central")];

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.02;
const offsetDistance = 20;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function isColliding(x, y, width, height, obstacleRect) {
  return !(
    x + width < obstacleRect.left ||
    x > obstacleRect.right ||
    y + height < obstacleRect.top ||
    y > obstacleRect.bottom
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

    const nextX = currentX + (targetX - currentX) * speed;
    const nextY = currentY + (targetY - currentY) * speed;

    const characterRect = {
      x: nextX,
      y: nextY,
      width: character.offsetWidth,
      height: character.offsetHeight
    };

    const willCollide = obstacles.some((obs) => {
      const obsRect = obs.getBoundingClientRect();
      return isColliding(characterRect.x, characterRect.y, characterRect.width, characterRect.height, obsRect);
    });

    if (!willCollide) {
      currentX = nextX;
      currentY = nextY;
      character.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
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

document.getElementById("instrumentales").addEventListener("click", () => openWindow("instrumentales"));
document.getElementById("trabajos").addEventListener("click", () => openWindow("trabajos"));
document.getElementById("contacto").addEventListener("click", () => openWindow("contacto"));
document.getElementById("plugins").addEventListener("click", () => openWindow("plugins"));
