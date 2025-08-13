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
    listLabel: 'assets/text1.png',
    position: { top: '3vh', left: '6vw' },
    popup: { title: 'Instrumentales', content: '' }
  },
  {
    id: 'trabajos',
    img: 'assets/Edificio4.png',
    listLabel: 'assets/text2.png',
    position: { top: '3vh', right: '6vw' },
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
    listLabel: 'assets/text3.png',
    position: { bottom: '13vh', left: '6vw' },
    popup: {
      title: 'Contacto',
      content: `
        <div class="contact-popup">
          <div class="social-column">
            <p class="column-title">Mis redes:</p>
            <a href="https://www.youtube.com/@LNDLM1312" target="_blank">
              <img src="assets/yt.png" alt="Twitter" style="width:144px;height:144px;margin:4px;" />
            </a>
            <a href="https://www.instagram.com/al.one.wav/" target="_blank">
              <img src="assets/insta.png" alt="Instagram" style="width:108px;height:108px;margin:4px;" />
            </a>
          </div>
          <div class="form-column">
            <p class="column-title">O escríbeme al correo:</p>
            <form id="contact-form" action="https://formspree.io/f/xldlzpew" method="POST">
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
    listLabel: 'assets/text1.png',
    position: { bottom: '12vh', right: '6vw' },
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
    style: { top: '39vh', left: '7vw', width: '20vw' }
  },
  {
    id: 'img2',
    src: 'assets/text2.png',
    style: { top: '39vh', right: '7vw', width: '20vw' }
  },
  {
    id: 'img3',
    src: 'assets/text3.png',
    style: { bottom: '6vh', left: '7vw', width: '20vw' }
  },
  {
    id: 'img4',
    src: 'assets/Fuente.png',
    style: { bottom: '43vh', right: '46vw', width: '6vw' }
  }
];

