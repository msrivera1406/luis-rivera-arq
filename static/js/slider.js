document.addEventListener('DOMContentLoaded', () => {
  initPropertiesSlider();
});

function initPropertiesSlider() {
  const sliderEl = document.querySelector('.properties-slider');
  if (!sliderEl) return;

  new Swiper(sliderEl, {
    slidesPerView: 1.1,
    spaceBetween: 20,
    grabCursor: true,
    speed: 500,
    
    // Controles de flechas personalizadas
    navigation: {
      prevEl: '.slider-btn--prev',
      nextEl: '.slider-btn--next',
    },

    // Paginación por puntos para pantallas móviles
    pagination: {
      el: '.properties-pagination',
      clickable: true,
    },

    // Breakpoints adaptativos
    breakpoints: {
      640: {
        slidesPerView: 1.8,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 2.5, // 2 tarjetas completas + asomo sutil de la 3ra
        spaceBetween: 32,
      },
      1280: {
        slidesPerView: 3,   // 3 columnas completas en pantallas amplias
        spaceBetween: 32,
      }
    }
  });
}