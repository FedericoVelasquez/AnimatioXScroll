import { images } from './images.js'

    const main = document.querySelector('main')
    const MAX_FRAMES = 147
    let currentFrame = 0

    // init with the first image
    const img = document.createElement('img')
    // append img to main
    img.className = 'scroll-image'
    main.appendChild(img)
    
    //verificacion
    function updateImage(frame = 0) {
    const src = images?.[frame]?.p;
    if (src) {
        img.src = src;
    } else {
        console.error('No se pudo obtener la imagen para frame:', frame);
      }
    }

    updateImage(currentFrame)
    // Altura máxima del scroll
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    let lastFrameUpdate = 0

    window.addEventListener('resize', () => {
        maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    });

    window.addEventListener('scroll', () => {
        if (Date.now() - lastFrameUpdate < 1) return true
      // Actualizamos el contador
        lastFrameUpdate = Date.now()
      // Posición actual del scroll
        const scrollPosition = window.scrollY
      // Calcular el porcentaje del scroll
        const scrollFraction = scrollPosition / maxScroll;
      // ¿Qué frame le toca?
        const frame = Math.floor(scrollFraction * MAX_FRAMES)
      // nos evitemos algo de trabajo cuando
      // al hacer scroll, el frame que le toca es el mismo
      // que ya tenía
        if (currentFrame !== frame) {
        // creamos el id del nombre del archivo
            updateImage(frame)
            currentFrame = frame
        }

    // HEADER: Desaparecer gradualmente
      const header = document.querySelector('header');
      const headerDisappearDistance = window.innerHeight * 0.5; // Desaparece en 50% de la pantalla
      const headerOpacity = Math.max(0, 1 - (scrollPosition / headerDisappearDistance));
      header.style.opacity = headerOpacity;

    // FOOTER: Aparecer solo al final
      const footer = document.querySelector('footer');
      const scrollPercentage = (scrollPosition / maxScroll) * 100;
            
    // Debug - para verificar si funciona
      console.log('Scroll %:', scrollPercentage.toFixed(1), 'Footer opacity:', footer.style.opacity);
            
    // Aparece cuando está a 80% del scroll máximo (reducido para testing)
      if (scrollPercentage >= 80) {
          const fadeInProgress = Math.min(1, (scrollPercentage - 80) / 20); // De 80% a 100%
          footer.style.opacity = fadeInProgress;
      } else {
          footer.style.opacity = 0;
        }
  });