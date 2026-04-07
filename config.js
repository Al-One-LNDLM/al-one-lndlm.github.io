// config.js: recursos y configuración dinámica de la página

// Imágenes de fondo para cada modo de color
export const backgrounds = {
  dark: 'assets/fondomed.png',
  light: 'assets/fondomed.png'
};

// URL del canal de YouTube (úsala para el botón destacado en móvil)
export const youtubeChannelUrl = 'https://www.youtube.com/@alonelndlm1312';

// URL del perfil de TikTok (úsala para el botón destacado en móvil)
export const tiktokProfileUrl = 'https://www.tiktok.com/@al.one.wav';

// URL del perfil de Instagram (úsala para el botón destacado en móvil)
export const instagramProfileUrl = 'https://www.instagram.com/al.one.wav/';

// =============================
//  CONTENIDO EDITABLE (v1.0)
// =============================
// 1) Trabajos (álbumes + canciones)
// 2) Música (desplegables: Instrumentales, Experimentos, Covers)
//
// Para añadir nuevos bloques, copia/pega un objeto y cambia thumb, title, url, etc.

export const trabajosAlbums = [
  {
    album: {
      title: 'TDB (Tierra De Barros) - Marker T & Al.One',
      url: 'https://youtu.be/qGOawjmFM8A?si=CpSVPV51H_c76tt9',
      thumb: 'assets/TDB0.webp',
      divider: true,
      description: '"Tierra de Barros" (TDB) es un álbum debut muy personal que explora la identidad de Marker-T desde su relación con la tierra que lo vio crecer: Extremadura. Un proyecto que entiende el territorio no solo como un lugar físico, sino como memoria, carácter y forma de estar en el mundo. El álbum mezcla los códigos del hip-hop con elementos culturales propios de la tierra extremeña, incorporando samples y referencias a figuras representativas de su música tradicional. El resultado es un diálogo entre lo contemporáneo y lo heredado, entre el ritmo urbano y el peso de la raíz. TDB construye una identidad de hip-hop extremeño honesta y cuidada, donde la experiencia personal se convierte en discurso colectivo. Un álbum que habla desde la tierra, sin folclore impostado, y que reivindica el origen como parte esencial del sonido.'
    },
    songs: [

    ]
  },
  {
    album: {
      title: 'El Niño y Su Fe - Guiber & Al.One',
      url: 'https://www.youtube.com/watch?v=9gNmEuoKf7c&list=RD9gNmEuoKf7c&start_radio=1',
      thumb: 'assets/mini1.jpg',
      description: '"El Niño y Su Fe" es una obra híbrida que nace entre la música y la imagen. Un "albumetraje": un proyecto que utiliza el lenguaje del álbum musical para construir una narración audiovisual continua, donde cada canción es una escena. El proyecto explora la memoria, la pérdida y la fe entendida no como religión, sino como aquello en lo que uno se apoya cuando todo lo demás empieza a fallar. A través de una mirada íntima y fragmentada, la obra dialoga con la infancia, la familia y el paso del tiempo, construyendo un relato emocional que avanza más por sensaciones que por respuestas. No es solo un trabajo musical ni únicamente una pieza audiovisual. Es un intento de dar forma a lo que permanece, incluso cuando la memoria se deshilacha.'
    },
    songs: [
      { title: '1. Gama Ocre', url: 'https://youtu.be/gjnF2xA8EgU?si=-Lz4cv3UeemV82s7', thumb: 'assets/MINI 2.jpg' },
      { title: '2. Chicos Malos Buenos Tipos', url: 'https://youtu.be/olTjbh7295U?si=6XDtN3jbhnOMuLol', thumb: 'assets/MINI 3.jpg' },
      { title: '3. Los Penúltimos Versos Que Te Escribo', url: 'https://youtu.be/w4X0c4Csqck?si=phNUqeIYaCTdfJEB', thumb: 'assets/MINI 4.jpg' },
      { title: '4. El Niño y Su Fe', url: 'https://youtu.be/iBjQlLn3eGI?si=11dlDPzwzun_HKG5', thumb: 'assets/MINI 5.jpg' },
      { title: '5. Mi Negra Tomasa', url: 'https://youtu.be/E5ZnLgfJucQ?si=sVSPpSJ5IDL6jNVH', thumb: 'assets/MINI 6.jpg' },
      { title: '6. Continental 67´', url: 'https://youtu.be/N-r1HKcgNl8?si=Sl-_nix8Xwfa8e34', thumb: 'assets/MINI 7.jpg' },
      { title: '7. Xyla', url: 'https://youtu.be/9To2SQiQXKE?si=Nqrg5c2J_sX0-M4l', thumb: 'assets/MINI 8.jpg' }
    ]
  },
  {
    album: {
      title: 'TDB (Tierra De Barros) - Marker T & Al.One',
      url: 'https://youtu.be/qGOawjmFM8A?si=CpSVPV51H_c76tt9',
      thumb: 'assets/TDB0.webp',
      divider: true,
      description: '"Tierra de Barros" (TDB) es un álbum debut muy personal que explora la identidad de Marker-T desde su relación con la tierra que lo vio crecer: Extremadura. Un proyecto que entiende el territorio no solo como un lugar físico, sino como memoria, carácter y forma de estar en el mundo. El álbum mezcla los códigos del hip-hop con elementos culturales propios de la tierra extremeña, incorporando samples y referencias a figuras representativas de su música tradicional. El resultado es un diálogo entre lo contemporáneo y lo heredado, entre el ritmo urbano y el peso de la raíz. TDB construye una identidad de hip-hop extremeño honesta y cuidada, donde la experiencia personal se convierte en discurso colectivo. Un álbum que habla desde la tierra, sin folclore impostado, y que reivindica el origen como parte esencial del sonido.'
    },
    songs: [
      { title: '1. El Miajón', url: 'https://youtu.be/r7v66L14CIY?si=i29TWJnDchiaF02K', thumb: 'assets/TDB5.jpg' },
      { title: '2. LXXL', url: 'https://youtu.be/qrz6GHOQeWo?si=G3NDKIrxeIGsKGWG', thumb: 'assets/TDB1.jpg' },
      { title: '3. MID00´S', url: 'https://youtu.be/VoGZL0BbisA?si=O8v8NPwVlMLQr_QL', thumb: 'assets/TDB2.webp' },
      { title: '4. DETROIT 89´', url: 'https://youtu.be/TCTaVd1pkNU?si=FIcTLrw6MaOrvbLk', thumb: 'assets/TDB3.webp' },
      { title: '5. WUTW', url: 'https://youtu.be/1bG2_86Cqzk?si=KlASDkXCWNGy3NUz', thumb: 'assets/TDB4.webp' }
    ]
  }
];

export const musicDropdownSections = [
  {
    id: 'instrumentales',
    title: 'Instrumentales',
    frameImage: 'assets/contenedor música inst.png',
    template: {
      type: 'audio'
    },
    items: [
      {
        title: 'Gama Ocre',
        assetPath: 'assets/beat1.wav'
      }
    ]
  },
  {
    id: 'experimentos',
    title: 'Experimentos',
    frameImage: 'assets/contenedor música exp.png',
    cardFrameImage: 'assets/contenedor exp.png',
    template: {
      type: 'cover'
    },
    items: [
//      {
//        title: 'Cover · Ode to the Mets',
//        text: 'Versión en directo con una interpretación más íntima y una mezcla atmosférica.',
//        images: [
//         ''
//        ],
//        audioPath: 'assets/beat1.wav',
//      }
    ]
  },
  {
    id: 'covers',
    title: 'Covers',
    frameImage: 'assets/contenedor música cov.png',
    cardFrameImage: 'assets/contenedor covers.png',
    template: {
      type: 'cover'
    },
    items: [
      {
        title: 'Cover · Ode to the Mets',
        text: 'Versión en directo con una interpretación más íntima y una mezcla atmosférica.',
        images: [
          'assets/MINI 7.jpg',
          'assets/MINI 8.jpg'
        ],
        audioPath: 'assets/beat1.wav',
        url: 'https://www.youtube.com/watch?v=Ty9qdc1WhfI'
      }
    ]
  }
];

function renderWorkSongsRow(songs) {
  return `
    <div class="work-songs-row">
      ${songs
        .map(song => `
          <div class="work-song">
            <a class="thumb-link" href="${song.url}" target="_blank">
              <img class="thumb" src="${song.thumb}" alt="${song.title}">
            </a>
            <a class="title-link" href="${song.url}" target="_blank">${song.title}</a>
          </div>
        `)
        .join('')}
    </div>
  `;
}

function renderWorkAlbumBlock(albumEntry) {
  const album = albumEntry.album;
  return `
    <div class="work-album ${album.divider ? 'album-divider' : ''}">
      <a class="album-link" href="${album.url}" target="_blank">
        <img class="thumb" src="${album.thumb}" alt="${album.title}">
      </a>
      <div class="info">
        <h3><a class="album-link" href="${album.url}" target="_blank">${album.title}</a></h3>
        <p class="album-description">${album.description}</p>
      </div>
    </div>
    ${renderWorkSongsRow(albumEntry.songs)}
  `;
}

export const trabajosPopupContent = `
  <div class="trabajos-gallery">
    ${trabajosAlbums.map(renderWorkAlbumBlock).join('')}
  </div>
`;

// Definición de zonas interactivas y su contenido emergente
export const zones = [
  {
    id: 'instrumentales',
    img: 'assets/Edificio1.png',
    listLabel: 'assets/text1.png',
    mobileButton: 'assets/Boton INST.png',
    position: { top: '2vh', left: '6vw' },
    popup: {
      title: 'Música',
      content: '',
      bg: 'assets/fondo.png',
      gradient: 'linear-gradient(to bottom, #bd75c4, rgba(196, 196, 196, 1))'
    }
  },
  {
    id: 'trabajos',
    img: 'assets/Edificio4.png',
    listLabel: 'assets/text2.png',
    mobileButton: 'assets/Boton TRB.png',
    position: { top: '3.7vh', right: '4.7vw' },
    popup: {
      title: 'Trabajos',
      content: trabajosPopupContent,
      bg: 'assets/fondo.png',
      gradient: 'linear-gradient(to bottom, rgba(94, 94, 94, 1), rgba(232, 232, 232, 1))'
    }
  },
  {
    id: 'contacto',
    img: 'assets/Edificio3.png',
    listLabel: 'assets/text3.png',
    mobileButton: 'assets/Boton CTC.png',
    position: { bottom: '13vh', left: '6vw' },
    popup: {
      title: 'Contacto',
      content: `
        <div class="contact-popup">
          <p class="contact-mobile-intro">
            Si eres un artista o creativo en busca de:<br><br>
          </p>
          <ul class="contact-mobile-services">
            <li>Instrumentales personalizadas</li>
            <li>Catálogo de instrumentales</li>
            <li>Producción musical personalizada</li>
            <li>Grabación en home studio</li>
            <li>Grabación en estudio profesional</li>
            <li>Concepto creativo</li>
          </ul>
          <p class="contact-mobile-intro">
            Estaré encantado de ayudarte a dar forma a tu proyecto :)
          </p>
          <div class="social-column">
            <p class="column-title">Mis redes</p>
            <a class="contact-social-link" href="https://www.youtube.com/@alonelndlm1312" target="_blank">
              <img class="contact-social-btn" src="assets/Boton YT.png" alt="YouTube personal" />
            </a>
            <a class="contact-social-link" href="https://www.instagram.com/al.one.wav/" target="_blank">
              <img class="contact-social-btn" src="assets/Boton Insta.png" alt="Instagram" />
            </a>
            <a class="contact-social-link" href="https://www.tiktok.com/@al.one.wav" target="_blank">
              <img class="contact-social-btn" src="assets/Boton TT.png" alt="TikTok" />
            </a>
            <a class="contact-social-link" href="https://www.youtube.com/@LNDLM1312" target="_blank">
              <img class="contact-social-btn" src="assets/Boton YT LNDLM.png" alt="YouTube LNDLM" />
            </a>
          </div>
          <div class="form-column">
            <p class="column-title">O escríbeme al correo</p>
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
        `,
      bg: 'assets/fondo.png',
      gradient: 'linear-gradient(to bottom, rgba(0, 132, 255, 1), rgba(0, 0, 0, 1))'
    }
  },
  {
    id: 'plugins',
    img: 'assets/EDIFICIO2.png',
    listLabel: 'assets/text4.png',
    mobileButton: 'assets/Boton PGN.png',
    position: { bottom: '10vh', right: '4.8vw' },
    popup: {
      title: 'Plugins',
      content:
        '<p style="white-space: pre-line; font-size: 0.85em; text-align: center; opacity: 0.85; line-height: 1.6; color: white;">Estoy desarrollando algunas herramientas como parte de mi propio proceso creativo.\n\nPronto estarán disponibles en esta sección para quien quiera utilizarlas.\n\nSi te interesa, estate atent@</p>' +
        '<img src="assets/FLECHA.png" style="display: block; margin: 20px auto 0 auto; width: 10vw;">' +
        '<img src="assets/Prox.png" style="display: block; margin: 20px auto 0 auto; width: 70vw;">' +
        '<img src="assets/Prox.png" style="display: block; margin: 20px auto 0 auto; width: 70vw;">',
      bg: 'assets/fondo.png',
      gradient: 'linear-gradient(to top, rgba(0, 0, 0, 1), #7d461d)'
    }
  }
];

// Últimos trabajos destacados para el carrusel móvil
export const mobileLatestWorks = [
  {
    title: 'ENYSF',
    link: 'https://www.youtube.com/watch?v=9gNmEuoKf7c&list=RD9gNmEuoKf7c&start_radio=1',
    image: 'assets/BotonMini3.png'
  },
  {
    title: 'Gama Ocre',
    link: 'https://youtu.be/gjnF2xA8EgU?si=-Lz4cv3UeemV82s7',
    image: 'assets/BotonMini1.png'
  },
  {
    title: 'Los Penúltimos Versos Que Te Escribo',
    link: 'https://youtu.be/w4X0c4Csqck?si=phNUqeIYaCTdfJEB',
    image: 'assets/BotonMini4.png'
  },
  {
    title: 'Xyla',
    link: 'https://youtu.be/9To2SQiQXKE?si=Nqrg5c2J_sX0-M4l',
    image: 'assets/BotonMini2.png'
  }
];

// Imágenes adicionales con posiciones ajustables
export const floatingImages = [
  {
    id: 'img1',
    src: 'assets/text1.png',
    style: { top: '33vh', left: '6vw', width: '20vw' }
  },
  {
    id: 'img2',
    src: 'assets/text2.png',
    style: { top: '35vh', right: '4vw', width: '20vw' }
  },
  {
    id: 'img3',
    src: 'assets/text3.png',
    style: { bottom: '8vh', left: '6vw', width: '20vw' }
  },
  {
    id: 'img4',
    src: 'assets/Fuente.png',
    style: { bottom: '44vh', right: '46vw', width: '6vw' }
  },
  {
    id: 'img5',
    src: 'assets/text4.png',
    style: { bottom: '8vh', right: '4vw', width: '20vw' }
  }
];
