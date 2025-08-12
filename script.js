// --- script.js ---
// Código estructurado para que sea fácil cambiar imágenes y contenido.

import { backgrounds, zones, instrumentals, floatingImages } from './config.js';

// Referencias principales al DOM
const gameArea = document.getElementById('game-area');
const character = document.getElementById('character');
const toggleBtn = document.getElementById('toggle-theme');
const zonesContainer = document.getElementById('zones-container');
const popupsContainer = document.getElementById('popups-container');

// Objeto que guardará las ventanas emergentes generadas
const popups = {};

// =============================
//  Imágenes posicionables
// =============================
floatingImages.forEach(imgData => {
  const img = document.createElement('img');
  img.src = imgData.src;
  img.id = imgData.id;
  img.className = 'floating-image';
  Object.assign(img.style, imgData.style);
  gameArea.appendChild(img);
});

// =============================
//  Creación dinámica de zonas y popups
// =============================
zones.forEach(zone => {
  // Imagen clicable
  const img = document.createElement('img');
  img.src = zone.img;
  img.className = 'interactive-zone';
  Object.assign(img.style, zone.position); // top/left/etc.
  img.dataset.popup = zone.id; // relacionar con ventana
  zonesContainer.appendChild(img);

  // Ventana asociada
  const popup = document.createElement('div');
  popup.id = `popup-${zone.id}`;
  popup.className = 'popup hidden';
  popup.innerHTML = `
    <div class="popup-header">
      ${zone.popup.title}
      <button class="close-btn" data-close="${zone.id}">×</button>
    </div>
    <div class="popup-content">${zone.popup.content || ''}</div>
  `;
  popupsContainer.appendChild(popup);
  popups[zone.id] = popup; // guardar referencia

  // Asegurar que las ventanas se oculten tras la animación de cierre
  popup.addEventListener('transitionend', () => {
    if (!popup.classList.contains('visible')) {
      popup.classList.add('hidden');
    }
  });
});

// Crear listado de instrumentales
populateInstrumentals();

// Abrir ventana al hacer click en una zona
zonesContainer.addEventListener('click', e => {
  const target = e.target.closest('.interactive-zone');
  if (target) openPopup(target.dataset.popup);
});

// Cerrar ventana al pulsar su botón
popupsContainer.addEventListener('click', e => {
  if (e.target.matches('.close-btn')) {
    closePopup(e.target.dataset.close);
  }
});

/**
 * Muestra la ventana emergente asociada al identificador indicado
 * y oculta cualquier otra que esté abierta.
 * @param {string} id Identificador de la ventana a mostrar
 */
function openPopup(id) {
  Object.entries(popups).forEach(([key, p]) => {
    if (key === id) {
      p.classList.remove('hidden');
      requestAnimationFrame(() => p.classList.add('visible'));
    } else {
      p.classList.remove('visible');
    }
  });
}

/**
 * Cierra la ventana emergente indicada si existe.
 * @param {string} id Identificador de la ventana a cerrar
 */
function closePopup(id) {
  if (popups[id]) popups[id].classList.remove('visible');
  if (id === 'instrumentales' && currentAudio) {
    currentAudio.audio.pause();
    currentAudio.audio.currentTime = 0;
    currentAudio.button.textContent = '▶';
    currentAudio = null;
  }
}

// =============================
//  Listado de instrumentales
// =============================
let currentAudio = null;

function populateInstrumentals() {
  const container = document.querySelector('#popup-instrumentales .popup-content');
  if (!container) return;
  instrumentals.forEach(inst => {
    const item = document.createElement('div');
    item.className = 'audio-item';

    const title = document.createElement('span');
    title.textContent = inst.name;

    const btn = document.createElement('button');
    btn.textContent = '▶';

    const audio = new Audio(inst.src);

    btn.addEventListener('click', () => {
      if (currentAudio && currentAudio.audio !== audio) {
        currentAudio.audio.pause();
        currentAudio.audio.currentTime = 0;
        currentAudio.button.textContent = '▶';
      }

      if (audio.paused) {
        audio.play();
        btn.textContent = '⏸';
        currentAudio = { audio, button: btn };
      } else {
        audio.pause();
        audio.currentTime = 0;
        btn.textContent = '▶';
        currentAudio = null;
      }
    });

    audio.addEventListener('ended', () => {
      btn.textContent = '▶';
      if (currentAudio && currentAudio.audio === audio) {
        currentAudio = null;
      }
    });

    item.appendChild(title);
    item.appendChild(btn);
    container.appendChild(item);
  });
}

// =============================
//  Gestión de fondos y temas
// =============================

/**
 * Ajusta la imagen de fondo del área de juego según el modo activo.
 */
function setBackground() {
  const isLight = document.body.classList.contains('light-mode');
  gameArea.style.backgroundImage = `url('${isLight ? backgrounds.light : backgrounds.dark}')`;
}

/**
 * Actualiza el icono del botón de cambio de tema dependiendo del modo actual.
 */
function updateThemeIcon() {
  toggleBtn.innerHTML = document.body.classList.contains('light-mode')
    ? '<img src="assets/moon.png" alt="Modo oscuro" />'
    : '<img src="assets/sun.png" alt="Modo claro" />';
}

// Evento para alternar entre temas
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  updateThemeIcon();
  setBackground();
});

// Configuración inicial de icono y fondo
updateThemeIcon();
setBackground();

// =============================
//  Animación del personaje
// =============================
let mouseX = 0, mouseY = 0;         // Posición actual del ratón
let currentX = 0, currentY = 0;     // Posición actual del personaje
const speed = 0.006;                 // Velocidad de movimiento del personaje
const offsetDistance = 0;          // Distancia respecto al cursor
const idleThreshold = 30;            // Radio para activar animación "idle"

const frameWidth = 90;              // Dimensiones de cada frame en el spritesheet
const frameHeight = 90;
const framesPerDirection = 4;       // Número de frames por dirección
const directions = {
  'down-right': 0,
  'down-left': 1,
  'up-right': 2,
  'up-left': 3,
  'idle': 4
}; // Orden en el spritesheet
let currentDirection = 'idle';
let frame = 0;                      // Frame actual (0-3)
let frameTick = 0;                  // Control para la velocidad de animación

const obstacles = Array.from(document.querySelectorAll('.obstacle'));

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/**
 * Determina si una posición colisiona con algún obstáculo.
 * @param {number} x Coordenada X a comprobar
 * @param {number} y Coordenada Y a comprobar
 * @param {number} [width=frameWidth] Ancho del objeto a comprobar
 * @param {number} [height=frameHeight] Alto del objeto a comprobar
 * @returns {boolean} Verdadero si existe colisión
 */
function isColliding(x, y, width = frameWidth, height = frameHeight) {
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

/**
 * Actualiza el frame del sprite mostrado según la dirección y el frame actual.
 */
function updateSprite() {
  const row = directions[currentDirection];
  const x = frame * frameWidth;
  const y = row * frameHeight;
  character.style.backgroundPosition = `-${x}px -${y}px`;
}

/**
 * Lógica principal de animación: mueve al personaje hacia el cursor
 * y gestiona la animación del spritesheet.
 */
function animateCharacter() {
  const dx = mouseX - currentX;
  const dy = mouseY - currentY;
  const distance = Math.hypot(dx, dy);

  let dirX = 0;
  let dirY = 0;
  let targetX = mouseX;
  let targetY = mouseY;

  if (distance !== 0) {
    dirX = dx / distance;
    dirY = dy / distance;
    targetX = mouseX - dirX * offsetDistance;
    targetY = mouseY - dirY * offsetDistance;
  }

  const targetDistance = Math.hypot(targetX - currentX, targetY - currentY);

  if (targetDistance > idleThreshold) {
    // Determinar la dirección del sprite según la posición del ratón
    const vertical = dy > 0 ? 'down' : 'up';
    const horizontal = dx > 0 ? 'right' : 'left';
    currentDirection = `${vertical}-${horizontal}`;

    let nextX = currentX + (targetX - currentX) * speed;
    let nextY = currentY + (targetY - currentY) * speed;

    if (!isColliding(nextX, currentY)) currentX = nextX;
    if (!isColliding(currentX, nextY)) currentY = nextY;
  } else {
    currentDirection = 'idle';
  }

  frameTick++;
  if (frameTick >= 30) { // cambiar este número para acelerar/ralentizar
    frame = (frame + 1) % framesPerDirection;
    frameTick = 0;
  }

  character.style.transform = `translate(${currentX}px, ${currentY}px)`;
  updateSprite();
  requestAnimationFrame(animateCharacter);
}

// Inicia la animación del personaje
animateCharacter();
