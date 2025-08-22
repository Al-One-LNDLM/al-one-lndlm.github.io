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
    popup: {
      title: 'Trabajos',
      content: `
        <div class="trabajos-gallery">
          <!-- Álbum 1 -->
          <div class="work-album">
            <a class="album-link" href="https://www.youtube.com/watch?v=9gNmEuoKf7c&list=RD9gNmEuoKf7c&start_radio=1" target="_blank">
              <img class="thumb" src="assets/mini1.jpg" alt="Álbum 1">
            </a>
            <div class="info">
              <h3><a class="album-link" href="https://www.youtube.com/watch?v=9gNmEuoKf7c&list=RD9gNmEuoKf7c&start_radio=1" target="_blank">El Niño y Su Fe - Guiber & Al.One</a></h3>
              <p>El álbum de "El Niño y Su Fe" nace de la necesidad de expresar el sentimiento de una tierra olvidada: Extremadura. 
              Es el producto de un grupo de chavales que, durante varios años, se dedicaron a hacer música por amor al arte y nada más. 
              Con el paso de los años, el proyecto evolucionó a un álbum completo con su propia identidad visual y un mediometraje original dedicado.</p>
            </div>
          </div>

          <!-- Canciones del Álbum 1 -->
          <div class="work-song">
            <a class="thumb-link" href="https://youtu.be/gjnF2xA8EgU?si=-Lz4cv3UeemV82s7" target="_blank">
              <img class="thumb" src="assets/MINI 2.jpg" alt="Canción 1">
            </a>
            <a class="title-link" href="https://youtu.be/gjnF2xA8EgU?si=-Lz4cv3UeemV82s7" target="_blank">Gama Ocre</a>
          </div>
          <div class="work-song">
            <a class="thumb-link" href="https://youtu.be/olTjbh7295U?si=6XDtN3jbhnOMuLol" target="_blank">
              <img class="thumb" src="assets/MINI 3.jpg" alt="Canción 2">
            </a>
            <a class="title-link" href="https://youtu.be/olTjbh7295U?si=6XDtN3jbhnOMuLol" target="_blank">Chicos Malos Buenos Tipos</a>
          </div>
          <div class="work-song">
            <a class="thumb-link" href="https://youtu.be/w4X0c4Csqck?si=phNUqeIYaCTdfJEB" target="_blank">
              <img class="thumb" src="assets/MINI 4.jpg" alt="Canción 2">
            </a>
            <a class="title-link" href="https://youtu.be/w4X0c4Csqck?si=phNUqeIYaCTdfJEB" target="_blank">Los Penúltimos Versos Que Te Escribo</a>
          </div>
          <div class="work-song">
            <a class="thumb-link" href="https://youtu.be/iBjQlLn3eGI?si=11dlDPzwzun_HKG5" target="_blank">
              <img class="thumb" src="assets/MINI 5.jpg" alt="Canción 2">
            </a>
            <a class="title-link" href="https://youtu.be/iBjQlLn3eGI?si=11dlDPzwzun_HKG5" target="_blank">El Niño y Su Fe</a>
          </div>
          <div class="work-song">
            <a class="thumb-link" href="https://youtu.be/E5ZnLgfJucQ?si=sVSPpSJ5IDL6jNVH" target="_blank">
              <img class="thumb" src="assets/MINI 6.jpg" alt="Canción 2">
            </a>
            <a class="title-link" href="https://youtu.be/E5ZnLgfJucQ?si=sVSPpSJ5IDL6jNVH" target="_blank">Mi Negra Tomasa</a>
          </div>
          <div class="work-song">
            <a class="thumb-link" href="https://youtu.be/N-r1HKcgNl8?si=Sl-_nix8Xwfa8e34" target="_blank">
              <img class="thumb" src="assets/MINI 7.jpg" alt="Canción 2">
            </a>
            <a class="title-link" href="https://youtu.be/N-r1HKcgNl8?si=Sl-_nix8Xwfa8e34" target="_blank">Continental 67´</a>
          </div>
          <div class="work-song">
            <a class="thumb-link" href="https://youtu.be/9To2SQiQXKE?si=Nqrg5c2J_sX0-M4l" target="_blank">
              <img class="thumb" src="assets/MINI 8.jpg" alt="Canción 2">
            </a>
            <a class="title-link" href="https://youtu.be/9To2SQiQXKE?si=Nqrg5c2J_sX0-M4l" target="_blank">Xyla</a>
          </div>

          <!-- Álbum 2 -->
          <div class="work-album">
            <a class="album-link" href="https://example.com/album2" target="_blank">
              <img class="thumb" src="assets/mini1.jpg" alt="Álbum 2">
            </a>
            <div class="info">
              <h3><a class="album-link" href="https://example.com/album2" target="_blank">Álbum 2</a></h3>
              <p>Otra descripción del álbum.</p>
            </div>
          </div>

          <!-- Canciones del Álbum 2 -->
          <div class="work-song">
            <a class="thumb-link" href="https://www.youtube.com/watch?v=oHg5SJYRHA0" target="_blank">
              <img class="thumb" src="assets/mini1.jpg" alt="Canción A">
            </a>
            <a class="title-link" href="https://www.youtube.com/watch?v=oHg5SJYRHA0" target="_blank">Canción A</a>
          </div>
          <div class="work-song">
            <a class="thumb-link" href="https://www.youtube.com/watch?v=oHg5SJYRHA0" target="_blank">
              <img class="thumb" src="assets/mini1.jpg" alt="Canción B">
            </a>
            <a class="title-link" href="https://www.youtube.com/watch?v=oHg5SJYRHA0" target="_blank">Canción B</a>
          </div>
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
    style: { bottom: '43vh', right: '48vw', width: '6vw' }
  }
];

