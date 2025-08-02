// config.js: recursos y configuración dinámica de la página

// Imágenes de fondo para cada modo de color
export const backgrounds = {
  dark: 'assets/fondo dark.png',
  light: 'assets/fondo.png'
};

// Definición de zonas interactivas y su contenido emergente
export const zones = [
  {
    id: 'instrumentales',
    img: 'assets/casa.png',
    position: { top: '5vh', left: '5vw' },
    popup: { title: 'Instrumentales', content: '' }
  },
  {
    id: 'trabajos',
    img: 'assets/casa.png',
    position: { top: '5vh', right: '5vw' },
    popup: { title: 'Trabajos', content: '' }
  },
  {
    id: 'contacto',
    img: 'assets/casa.png',
    position: { bottom: '5vh', left: '5vw' },
    popup: { title: 'Contacto', content: '' }
  },
  {
    id: 'plugins',
    img: 'assets/casa.png',
    position: { bottom: '5vh', right: '5vw' },
    popup: {
      title: 'Plugins',
      content:
        '<p style="text-align:center; margin-top:40px;"> Esta sección está en mantenimiento </p>' +
        "<img src='assets/en-obras.png' alt='En obras' style='display:block; margin:30px auto; max-width:300px;'>"
    }
  }
];

