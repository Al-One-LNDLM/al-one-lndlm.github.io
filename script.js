// --- script.js ---
// Código estructurado para que sea fácil cambiar imágenes y contenido.

import { backgrounds, zones, instrumentals, floatingImages } from './config.js';

const preloader = document.getElementById('preloader');
const progress = document.getElementById('preloader-progress');
const duration = 2500; // 2–3 segundos
const start = Date.now();
document.body.style.overflow = 'hidden';

function animateLoader() {
  const elapsed = Date.now() - start;
  const pct = Math.min(elapsed / duration, 1);
  progress.style.width = pct * 100 + '%';
  if (pct < 1) {
    requestAnimationFrame(animateLoader);
  } else {
    preloader.style.display = 'none';
    // Mantén la página estática sin barras de desplazamiento
    document.body.style.overflow = 'hidden';
  }
}
animateLoader();

// Referencias principales al DOM
const gameArea = document.getElementById('game-area');
const character = document.getElementById('character');
const toggleBtn = document.getElementById('toggle-theme');
const zonesContainer = document.getElementById('zones-container');
const popupsContainer = document.getElementById('popups-container');
const mobileMenu = document.getElementById('mobile-menu');
const mobileGame = document.getElementById('mobile-game');
const mobileGameArea = document.getElementById('mobile-game-area');
const mobileCharacter = document.getElementById('mobile-character');
const mobileZonesContainer = document.getElementById('mobile-zones-container');

// Ajuste de unidades vh en móviles
function updateVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
updateVh();
window.addEventListener('resize', updateVh);

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

  if (mobileZonesContainer) {
    const mobileImg = document.createElement('img');
    mobileImg.src = zone.img;
    mobileImg.className = 'interactive-zone';
    Object.assign(mobileImg.style, zone.position);
    mobileImg.dataset.popup = zone.id;
    mobileZonesContainer.appendChild(mobileImg);
  }

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

// Menú móvil generado dinámicamente
zones.forEach(zone => {
  const item = document.createElement('div');
  item.className = `mobile-item item-${zone.id}`;
  item.dataset.popup = zone.id;
  const leftImg = document.createElement('img');
  leftImg.src = zone.img;
  leftImg.alt = zone.id;

  const rightImg = document.createElement('img');
  rightImg.src = zone.listLabel;
  rightImg.alt = `${zone.id}-label`;

  item.appendChild(leftImg);
  item.appendChild(rightImg);
  mobileMenu.appendChild(item);
});

// Crear listado de instrumentales
populateInstrumentals();

// Abrir ventana al hacer click en una zona
zonesContainer.addEventListener('click', e => {
  const target = e.target.closest('.interactive-zone');
  if (target) openPopup(target.dataset.popup);
});

if (mobileZonesContainer) {
  mobileZonesContainer.addEventListener('click', e => {
    const target = e.target.closest('.interactive-zone');
    if (target) openPopup(target.dataset.popup);
  });
}

// Cerrar ventana al pulsar su botón
popupsContainer.addEventListener('click', e => {
  if (e.target.matches('.close-btn')) {
    closePopup(e.target.dataset.close);
  }
});

// Abrir ventana al seleccionar un elemento del menú móvil
mobileMenu.addEventListener('click', e => {
  const target = e.target.closest('.mobile-item');
  if (target) openPopup(target.dataset.popup);
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
  const bg = `url('${isLight ? backgrounds.light : backgrounds.dark}')`;
  gameArea.style.backgroundImage = bg;
  if (mobileGameArea) mobileGameArea.style.backgroundImage = bg;
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
const idleThreshold = 80;            // Radio para activar animación "idle"

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
  let centerX = currentX + frameWidth / 2;
  let centerY = currentY + frameHeight / 2;
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
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

  const targetDistance = Math.hypot(targetX - centerX, targetY - centerY);

  if (targetDistance > idleThreshold) {
    // Determinar la dirección del sprite según la posición del ratón
    const vertical = dy > 0 ? 'down' : 'up';
    const horizontal = dx > 0 ? 'right' : 'left';
    currentDirection = `${vertical}-${horizontal}`;

    const targetX = mouseX - dirX;
    const targetY = mouseY - dirY * offsetDistance;
    const nextCenterX = centerX + (targetX - centerX) * speed;
    const nextCenterY = centerY + (targetY - centerY) * speed;

    const nextX = nextCenterX - frameWidth / 2;
    const nextY = nextCenterY - frameHeight / 2;

    if (!isColliding(nextX, currentY)) currentX = nextX;
    if (!isColliding(currentX, nextY)) currentY = nextY;

    centerX = currentX + frameWidth / 2;
    centerY = currentY + frameHeight / 2;
  } else {
    currentDirection = 'idle';
  }

  frameTick++;
  if (frameTick >= 30) { // cambiar este número para acelerar/ralentizar
    frame = (frame + 1) % framesPerDirection;
    frameTick = 0;
  }

  character.style.transform = `translate(${centerX - frameWidth / 2}px, ${centerY - frameHeight / 2}px)`;
  updateSprite();
  requestAnimationFrame(animateCharacter);
}

// Inicia la animación del personaje
animateCharacter();

// =============================
//  Juego móvil
// =============================
function initMobileGame() {
  if (!mobileGameArea || !mobileCharacter) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let currentDirection = 'idle';
  let frame = 0;
  let frameTick = 0;

  const obstacles = Array.from(mobileGameArea.querySelectorAll('.obstacle'));

  function updatePointer(e) {
    const rect = mobileGameArea.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }

  mobileGameArea.addEventListener('pointerdown', updatePointer);
  mobileGameArea.addEventListener('pointermove', updatePointer);

  function isColliding(x, y, width = frameWidth, height = frameHeight) {
    const areaRect = mobileGameArea.getBoundingClientRect();
    return obstacles.some(ob => {
      const rect = ob.getBoundingClientRect();
      const left = rect.left - areaRect.left;
      const top = rect.top - areaRect.top;
      return (
        x < left + rect.width &&
        x + width > left &&
        y < top + rect.height &&
        y + height > top
      );
    });
  }

  function updateSprite() {
    const row = directions[currentDirection];
    const x = frame * frameWidth;
    const y = row * frameHeight;
    mobileCharacter.style.backgroundPosition = `-${x}px -${y}px`;
  }

  function animate() {
    let centerX = currentX + frameWidth / 2;
    let centerY = currentY + frameHeight / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
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

    const targetDistance = Math.hypot(targetX - centerX, targetY - centerY);

    if (targetDistance > idleThreshold) {
      const vertical = dy > 0 ? 'down' : 'up';
      const horizontal = dx > 0 ? 'right' : 'left';
      currentDirection = `${vertical}-${horizontal}`;

      const nextCenterX = centerX + (targetX - centerX) * speed;
      const nextCenterY = centerY + (targetY - centerY) * speed;

      const nextX = nextCenterX - frameWidth / 2;
      const nextY = nextCenterY - frameHeight / 2;

      if (!isColliding(nextX, currentY)) currentX = nextX;
      if (!isColliding(currentX, nextY)) currentY = nextY;

      centerX = currentX + frameWidth / 2;
      centerY = currentY + frameHeight / 2;
    } else {
      currentDirection = 'idle';
    }

    frameTick++;
    if (frameTick >= 30) {
      frame = (frame + 1) % framesPerDirection;
      frameTick = 0;
    }

    mobileCharacter.style.transform = `translate(${centerX - frameWidth / 2}px, ${centerY - frameHeight / 2}px)`;
    updateSprite();
    requestAnimationFrame(animate);
  }

  animate();
}

let mobileGameInitialized = false;
const mq = window.matchMedia('(max-width: 768px)');

function handleMediaQuery(e) {
  if (!mobileGame) return;
  if (e.matches) {
    mobileGame.style.display = 'block';
    if (gameArea) gameArea.style.display = 'none';
    if (!mobileGameInitialized) {
      initMobileGame();
      mobileGameInitialized = true;
    }
  } else {
    mobileGame.style.display = 'none';
    if (gameArea) gameArea.style.display = 'block';
  }
}

handleMediaQuery(mq);
mq.addEventListener('change', handleMediaQuery);

// =============================
//  Envío del formulario de contacto
// =============================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        alert('Mensaje enviado');
        form.reset();
      } else {
        alert('Hubo un error al enviar el mensaje');
      }
    } catch (err) {
      alert('Hubo un error al enviar el mensaje');
    }
  });
}