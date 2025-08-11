// config.js: recursos y configuración dinámica de la página

// Imágenes de fondo para cada modo de color
export const backgrounds = {
  dark: 'assets/fondo dark.png',
  light: 'assets/fondo.png'
};

// Lista de instrumentales disponibles
// Añade más objetos { name: 'Título', src: 'assets/tu-archivo.mp3' }
export const instrumentals = [
  {name: 'Gama Ocre', src: 'assets/beat1.wav'}
];

// Definición de zonas interactivas y su contenido emergente
export const zones = [
  {
    id: 'instrumentales',
    img: 'assets/Edificio1.png',
    position: { top: '5vh', left: '5vw' },
    popup: { title: 'Instrumentales', content: '' }
  },
  {
    id: 'trabajos',
    img: 'assets/Edificio4.png',
    position: { top: '5vh', right: '5vw' },
    // Duplica el bloque <a class="video-card">…</a> para añadir más videos
    popup: {
      title: 'Trabajos',
      content: `
        <div class="trabajos-gallery">
          <a class="video-card" href="https://www.youtube.com/watch?v=9gNmEuoKf7c&list=RD9gNmEuoKf7c&start_radio=1" target="_blank">
            <div class="thumb" style="background-image:url('assets/mini1.jpg')"></div>
            <p>El Niño y Su Fe (ALbumetraje Oficial)</p>
          </a>
          <a class="video-card" href="https://www.youtube.com/watch?v=oHg5SJYRHA0" target="_blank">
            <div class="thumb" style="background-image:url('assets/mini1.jpg')"></div>
            <p>Video ejemplo 2</p>
          </a>
        </div>
      `
    }
  },
  {
    id: 'contacto',
    img: 'assets/Edificio3.png',
    position: { bottom: '10vh', left: '5vw' },
    popup: {
      title: 'Contacto',
      content: `
        <div class="contact-popup">
          <div class="social-column">
            <a href="https://twitter.com/" target="_blank">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" style="width:48px;height:48px;margin:4px;" />
            </a>
            <a href="https://instagram.com/" target="_blank">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width:48px;height:48px;margin:4px;" />
            </a>
          </div>
          <div class="form-column">
            <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
              <label>
                Nombre
                <input type="text" name="name" required />
              </label>
              <label>
                Email
                <input type="email" name="_replyto" required />
              </label>
              <label>
                Mensaje
                <textarea name="message" rows="4" required></textarea>
              </label>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      `
    }
  },
  {
    id: 'plugins',
    img: 'assets/EDIFICIO2.png',
    position: { bottom: '10vh', right: '5vw' },
    popup: {
      title: 'Plugins',
      content:
        '<p style="text-align:center; margin-top:40px;"> Esta sección está en mantenimiento </p>' +
        "<img src='assets/en-obras.png' alt='En obras' style='display:block; margin:30px auto; max-width:300px;'>"
    }
  }
];

// Imágenes adicionales con posiciones ajustables
export const floatingImages = [
  {
    id: 'img1',
    src: 'assets/text1.png',
    style: { top: '20vh', left: '10vw', width: '336px', height: '60px' }
  },
  {
    id: 'img2',
    src: 'assets/text2.png',
    style: { top: '20vh', right: '10vw', width: '336px', height: '60px' }
  },
  {
    id: 'img3',
    src: 'assets/text3.png',
    style: { bottom: '20vh', left: '10vw', width: '336px', height: '60px' }
  },
  {
    id: 'img4',
    src: 'assets/Fuente.png',
    style: { bottom: '20vh', right: '10vw', width: '60px', height: '60px' }
  }
];

