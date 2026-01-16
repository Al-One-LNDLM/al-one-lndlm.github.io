// --- script.js ---
// Código estructurado para que sea fácil cambiar imágenes y contenido.

import {
  backgrounds,
  zones,
  instrumentals,
  floatingImages,
  mobileLatestWorks
} from './config.js';

const isMobile = window.matchMedia('(max-width: 768px)').matches;

const preloader = document.getElementById('preloader');
const progress = document.getElementById('preloader-progress');
const duration = 1500; // 2–3 segundos
const start = Date.now();
document.body.style.overflow = isMobile ? 'auto' : 'hidden';
document.documentElement.style.overflow = isMobile ? 'auto' : 'hidden';

// Elementos de la ventana de bienvenida
const welcomeModal = document.getElementById('welcome-modal');
const sliderImage = document.getElementById('slider-image');
const prevImageBtn = document.getElementById('slider-prev');
const nextImageBtn = document.getElementById('slider-next');
const exploreBtn = document.getElementById('explore-btn');
const welcomeImages = [
  'assets/Tutorial1.png',
  'assets/Tutorial2.png',
  'assets/Tutorial3.png',
  'assets/Tutorial4.png'
];
let currentSlide = 0;

function updateSlide() {
  if (sliderImage) {
    sliderImage.src = welcomeImages[currentSlide];
  }
}

function showWelcome() {
  if (welcomeModal) {
    welcomeModal.classList.remove('hidden');
  }
}

if (prevImageBtn && nextImageBtn) {
  prevImageBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + welcomeImages.length) % welcomeImages.length;
    updateSlide();
  });
  nextImageBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % welcomeImages.length;
    updateSlide();
  });
}

if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    welcomeModal.classList.add('hidden');
  });
}

updateSlide();

function animateLoader() {
  const elapsed = Date.now() - start;
  const pct = Math.min(elapsed / duration, 1);
  progress.style.width = pct * 100 + '%';
  if (pct < 1) {
    requestAnimationFrame(animateLoader);
  } else {
    preloader.style.display = 'none';
    // Mantén la página estática sin barras de desplazamiento
    document.body.style.overflow = isMobile ? 'auto' : 'hidden';
    document.documentElement.style.overflow = isMobile ? 'auto' : 'hidden';
    if (!isMobile) {
      showWelcome();
    }
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
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileGame = document.getElementById('mobile-game');
const mobileCharacter = document.getElementById('mobile-character');
const mobileZonesContainer = document.getElementById('mobile-zones-container');
const menuIcon = document.getElementById('menu-icon');
const mobileIntroArrow = document.getElementById('mobile-intro-arrow');
const mobileSectionsBlock = document.getElementById('mobile-menu');
const mobileHeroCarousel = document.querySelector('.mobile-hero-carousel');
const mobileHeroTrack = document.querySelector('.mobile-carousel-track');
const movementToggleOn = 'assets/ON BUTTON.png';
const movementToggleOff = 'assets/OFF BUTTON.png';
let mobileMovementEnabled = false;
let mobileMovementResetTarget = null;

// Ajuste de unidades vh en móviles
function updateVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
updateVh();
window.addEventListener('resize', updateVh);

// Objeto que guardará las ventanas emergentes generadas
const popups = {};

// Estado inicial para permitir volver atrás desde las ventanas emergentes
history.replaceState({ popupId: null }, '');

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
      <button class="close-btn" data-close="${zone.id}">X</button>
    </div>
    <div class="popup-content">${zone.popup.content || ''}</div>
    <div class="popup-footer">
      ${zones
        .filter(z => z.id !== zone.id)
        .map(z => `<a href="#" data-open="${z.id}">${z.popup.title}</a>`)
        .join(' | ')}
    </div>
  `;
  if (zone.popup.bg || zone.popup.gradient) {
    const layers = [];
    if (zone.popup.gradient) layers.push(zone.popup.gradient);
    if (zone.popup.bg) layers.push(`url('${zone.popup.bg}')`);
    popup.style.background = layers.join(', ');
  }
  popupsContainer.appendChild(popup);
  popups[zone.id] = popup; // guardar referencia

  // Asegurar que las ventanas se oculten tras la animación de cierre
  popup.addEventListener('transitionend', () => {
    if (!popup.classList.contains('visible')) {
      popup.classList.add('hidden');
      popup.classList.remove('closing');
    }
  });
});

// Menú móvil generado dinámicamente (lista de secciones)
const mobileSectionLabels = {
  instrumentales: 'Música',
  trabajos: 'Trabajos',
  contacto: 'Contacto',
  plugins: 'Próximamente'
};

zones.forEach(zone => {
  const item = document.createElement('div');
  item.className = `mobile-item item-${zone.id}`;
  item.dataset.popup = zone.id;

  const buttonImg = document.createElement('img');
  buttonImg.src = zone.mobileButton || zone.listLabel;
  buttonImg.alt = zone.popup?.title ? `Botón ${zone.popup.title}` : zone.id;

  item.appendChild(buttonImg);
  const labelText = mobileSectionLabels[zone.id];
  if (labelText) {
    const label = document.createElement('span');
    label.className = `mobile-item-label mobile-item-label--${zone.id}`;
    label.textContent = labelText;
    item.appendChild(label);
  }
  mobileMenu.appendChild(item);
});

// Menú superpuesto para el encabezado móvil
zones.forEach((zone, idx) => {
  const item = document.createElement('a');
  item.className = 'menu-link';
  item.dataset.popup = zone.id;

  const labelImg = document.createElement('img');
  labelImg.src = zone.listLabel;
  labelImg.alt = zone.id;

  item.appendChild(labelImg);
  mobileMenuOverlay.appendChild(item);

  if (idx < zones.length - 1) {
    mobileMenuOverlay.appendChild(document.createElement('hr'));
  }
});

const movementToggleRow = document.createElement('div');
movementToggleRow.className = 'menu-movement-toggle';

const movementToggleLabel = document.createElement('span');
movementToggleLabel.textContent = 'Movimiento de Chust';

const movementToggleButton = document.createElement('button');
movementToggleButton.type = 'button';
movementToggleButton.id = 'mobile-movement-toggle';
movementToggleButton.setAttribute('aria-pressed', 'false');

const movementToggleIcon = document.createElement('img');
movementToggleIcon.alt = 'Movimiento apagado';

movementToggleButton.appendChild(movementToggleIcon);
movementToggleRow.appendChild(movementToggleLabel);
movementToggleRow.appendChild(movementToggleButton);
mobileMenuOverlay.appendChild(document.createElement('hr'));
mobileMenuOverlay.appendChild(movementToggleRow);

function updateMovementToggleUI() {
  movementToggleIcon.src = mobileMovementEnabled ? movementToggleOn : movementToggleOff;
  movementToggleIcon.alt = mobileMovementEnabled ? 'Movimiento encendido' : 'Movimiento apagado';
  movementToggleButton.setAttribute('aria-pressed', mobileMovementEnabled ? 'true' : 'false');
}

function setMobileMovementEnabled(enabled) {
  mobileMovementEnabled = enabled;
  updateMovementToggleUI();
  if (!enabled && typeof mobileMovementResetTarget === 'function') {
    mobileMovementResetTarget();
  }
}

updateMovementToggleUI();

movementToggleButton.addEventListener('click', () => {
  setMobileMovementEnabled(!mobileMovementEnabled);
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
    history.back();
    return;
  }

  const link = e.target.closest('.popup-footer a');
  if (link && link.dataset.open) {
    e.preventDefault();
    openPopup(link.dataset.open);
  }
});

// Manejo del menú móvil
let menuOpen = false;

if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenuOverlay.classList.toggle('open', menuOpen);
    menuIcon.src = menuOpen
      ? 'assets/IconoCerrarMenu.png'
      : 'assets/IconoAbrirMenu.png';
  });
}

if (mobileIntroArrow && mobileSectionsBlock) {
  mobileIntroArrow.addEventListener('click', () => {
    const targetTop = mobileSectionsBlock.getBoundingClientRect().top + window.pageYOffset - 70;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
}

// =============================
//  Carrusel móvil hero (drag + inercia + snap + loop)
// =============================
function initMobileHeroCarousel() {
  if (!mobileHeroCarousel || !mobileHeroTrack || !mobileLatestWorks?.length) return;

  const slides = [];
  const realCount = mobileLatestWorks.length;
  const dataWithClones = [
    mobileLatestWorks[realCount - 1],
    ...mobileLatestWorks,
    mobileLatestWorks[0]
  ];

  mobileHeroTrack.innerHTML = '';
  dataWithClones.forEach(item => {
    const slide = document.createElement('a');
    slide.className = 'mobile-carousel-slide';
    slide.href = item.link;
    slide.target = '_blank';
    slide.rel = 'noopener';
    slide.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
    slides.push(slide);
    mobileHeroTrack.appendChild(slide);
  });

  let slideWidth = window.innerWidth;
  let currentIndex = 1;
  let currentTranslate = -slideWidth * currentIndex;
  let startTranslate = currentTranslate;
  let startX = null;
  let startY = null;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let isDragging = false;
  let dragActivated = false;
  let animationId = null;
  let activePointerId = null;
  let isPointerCaptured = false;
  let introPlayed = false;
  let introTimerId = null;
  let introAnimationId = null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setTranslate(value) {
    currentTranslate = value;
    mobileHeroTrack.style.transform = `translate3d(${value}px, 0, 0)`;
  }

  function clampIndex(index) {
    return Math.max(0, Math.min(index, realCount + 1));
  }

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function cancelIntroAnimation() {
    if (introPlayed) return;
    introPlayed = true;
    if (introTimerId) {
      clearTimeout(introTimerId);
      introTimerId = null;
    }
    if (introAnimationId) {
      cancelAnimationFrame(introAnimationId);
      introAnimationId = null;
    }
  }

  function animateTo(target, callback) {
    stopAnimation();
    const start = currentTranslate;
    const delta = target - start;
    const duration = 300;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setTranslate(start + delta * eased);
      if (progress < 1) {
        animationId = requestAnimationFrame(step);
      } else {
        animationId = null;
        if (callback) callback();
      }
    }

    animationId = requestAnimationFrame(step);
  }

  // Snap: al soltar, buscar el slide más cercano.
  function snapToNearest() {
    const index = clampIndex(Math.round(-currentTranslate / slideWidth));
    currentIndex = index;
    const target = -index * slideWidth;
    animateTo(target, () => {
      // Loop: reposicionar cuando se usan clones
      if (currentIndex === 0) {
        currentIndex = realCount;
        setTranslate(-currentIndex * slideWidth);
      } else if (currentIndex === realCount + 1) {
        currentIndex = 1;
        setTranslate(-currentIndex * slideWidth);
      }
    });
  }

  // Inercia: continuar el desplazamiento con desaceleración.
  function startInertia() {
    stopAnimation();
    const friction = 0.0025;
    const minVelocity = 0.02;
    let lastTimestamp = null;

    function step(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      currentTranslate += velocity * dt;
      setTranslate(currentTranslate);

      const direction = Math.sign(velocity);
      const speed = Math.abs(velocity);
      const decel = friction * dt;
      velocity = direction * Math.max(speed - decel, 0);

      if (Math.abs(velocity) > minVelocity) {
        animationId = requestAnimationFrame(step);
      } else {
        animationId = null;
        snapToNearest();
      }
    }

    animationId = requestAnimationFrame(step);
  }

  // Drag: capturar el arrastre horizontal 1:1.
  function onPointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    // Si el usuario interactúa, cancela la animación de entrada y no la repitas.
    cancelIntroAnimation();
    stopAnimation();
    startX = event.clientX;
    startY = event.clientY;
    lastX = startX;
    lastTime = performance.now();
    startTranslate = currentTranslate;
    velocity = 0;
    isDragging = false;
    dragActivated = false;
    activePointerId = event.pointerId;
    isPointerCaptured = false;
  }

  function onPointerMove(event) {
    if (startX === null || activePointerId !== event.pointerId) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (!isDragging) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        isDragging = true;
        dragActivated = true;
      } else if (Math.abs(dy) > 6 && Math.abs(dy) > Math.abs(dx)) {
        return;
      }
    }

    if (isDragging) {
      if (!isPointerCaptured) {
        mobileHeroTrack.setPointerCapture(event.pointerId);
        isPointerCaptured = true;
      }
      event.preventDefault();
      setTranslate(startTranslate + dx);
      const now = performance.now();
      const delta = event.clientX - lastX;
      const deltaTime = now - lastTime || 16;
      velocity = delta / deltaTime;
      lastX = event.clientX;
      lastTime = now;
    }
  }

  function onPointerUp(event) {
    if (startX === null || activePointerId !== event.pointerId) return;
    if (isPointerCaptured) {
      mobileHeroTrack.releasePointerCapture(event.pointerId);
    }
    startX = null;
    startY = null;
    activePointerId = null;
    isPointerCaptured = false;

    if (dragActivated) {
      startInertia();
    } else {
      snapToNearest();
    }
  }

  function onClick(event) {
    if (dragActivated) {
      event.preventDefault();
      dragActivated = false;
    }
  }

  function updateSizes() {
    slideWidth = window.innerWidth;
    setTranslate(-currentIndex * slideWidth);
  }

  // Animación de entrada sutil para indicar que se puede deslizar (solo una vez).
  function runIntroAnimation() {
    if (introPlayed || prefersReducedMotion.matches) return;
    introPlayed = true;
    const start = currentTranslate;
    const hintOffset = -slideWidth * 0.12;
    const target = start + hintOffset;
    const duration = 420;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setTranslate(start + (target - start) * eased);
      if (progress < 1) {
        introAnimationId = requestAnimationFrame(step);
      } else {
        introAnimationId = null;
        // Suelta y aplica el snap al índice actual sin romper el loop/clones.
        animateTo(-currentIndex * slideWidth);
      }
    }

    introAnimationId = requestAnimationFrame(step);
  }

  function scheduleIntroAnimation() {
    if (introPlayed || prefersReducedMotion.matches) return;
    introTimerId = window.setTimeout(runIntroAnimation, 1500);
  }

  mobileHeroTrack.addEventListener('pointerdown', onPointerDown);
  mobileHeroTrack.addEventListener('pointermove', onPointerMove);
  mobileHeroTrack.addEventListener('pointerup', onPointerUp);
  mobileHeroTrack.addEventListener('pointercancel', onPointerUp);
  mobileHeroTrack.addEventListener('click', onClick);
  window.addEventListener('resize', updateSizes);
  window.addEventListener('orientationchange', updateSizes);
  if (document.readyState === 'complete') {
    scheduleIntroAnimation();
  } else {
    window.addEventListener('load', scheduleIntroAnimation, { once: true });
  }

  setTranslate(currentTranslate);
}

initMobileHeroCarousel();

mobileMenuOverlay.addEventListener('click', e => {
  const target = e.target.closest('.menu-link');
  if (target) {
    openPopup(target.dataset.popup);
    mobileMenuOverlay.classList.remove('open');
    if (menuIcon) menuIcon.src = 'assets/IconoAbrirMenu.png';
    menuOpen = false;
  }
});

mobileMenu.addEventListener('click', e => {
  const target = e.target.closest('.mobile-item');
  if (target) openPopup(target.dataset.popup);
});

/**
 * Muestra la ventana emergente asociada al identificador indicado
 * y oculta cualquier otra que esté abierta.
 * @param {string} id Identificador de la ventana a mostrar
 * @param {boolean} [push=true] Si se debe añadir la acción al historial
 */
function openPopup(id, push = true) {
  Object.entries(popups).forEach(([key, p]) => {
    if (key === id) {
      p.classList.remove('hidden');
      p.classList.remove('closing');
      requestAnimationFrame(() => p.classList.add('visible'));
    } else {
      p.classList.remove('visible');
    }
  });
  if (push) {
    history.pushState({ popupId: id }, '');
  }
  if (isMobile) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Cierra la ventana emergente indicada si existe.
 * @param {string} id Identificador de la ventana a cerrar
 */
function closePopup(id) {
  if (popups[id]) {
    popups[id].classList.add('closing');
    popups[id].classList.remove('visible');
  }
  if (id === 'instrumentales' && currentAudio) {
    currentAudio.audio.pause();
    currentAudio.audio.currentTime = 0;
    currentAudio.button.textContent = '▶';
    currentAudio = null;
  }
  if (isMobile) {
    const anyVisible = Object.values(popups).some(p => p.classList.contains('visible'));
    if (!anyVisible) {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }
}

// Navegación con el botón de retroceso
window.addEventListener('popstate', e => {
  const state = e.state;
  if (state && state.popupId) {
    openPopup(state.popupId, false);
  } else {
    Object.keys(popups).forEach(id => closePopup(id));
  }
});

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
  if (!mobileCharacter) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let currentDirection = 'idle';
  let frame = 0;
  let frameTick = 0;

  function updatePointer(e) {
    if (!mobileMovementEnabled) return;
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  document.addEventListener('pointerdown', updatePointer);
  document.addEventListener('pointermove', updatePointer);

  function updateSprite() {
    const row = directions[currentDirection];
    const x = frame * frameWidth;
    const y = row * frameHeight;
    mobileCharacter.style.backgroundPosition = `-${x}px -${y}px`;
  }

  function animate() {
    if (!mobileMovementEnabled) {
      mouseX = currentX + frameWidth / 2;
      mouseY = currentY + frameHeight / 2;
    }

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

      currentX = nextCenterX - frameWidth / 2;
      currentY = nextCenterY - frameHeight / 2;

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

    mobileCharacter.style.transform = `translate(${currentX}px, ${currentY}px)`;
    updateSprite();
    requestAnimationFrame(animate);
  }

  mobileMovementResetTarget = () => {
    mouseX = currentX + frameWidth / 2;
    mouseY = currentY + frameHeight / 2;
    currentDirection = 'idle';
  };

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
