document.addEventListener('DOMContentLoaded', () => {
  initHoverAccordion();
  initComparisonSliders();
});

function initHoverAccordion() {
  const accordionItems = document.querySelectorAll('[data-accordion]');
  if (!accordionItems.length) return;

  let hoverTimeout = null;

  function setActiveItem(targetItem) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const isTarget = item === targetItem;
      header.setAttribute('aria-expanded', isTarget ? 'true' : 'false');
    });
  }

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    // Hover con intención (evita disparos accidentales al cruzar el ratón)
    item.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        setActiveItem(item);
      }, 140); // 140ms de confirmación antes de iniciar la apertura
    });

    item.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
    });

    // Clic inmediato para móvil o tablets
    header.addEventListener('click', (e) => {
      e.preventDefault();
      clearTimeout(hoverTimeout);
      setActiveItem(item);
    });
  });
}

function initComparisonSliders() {
  const sliders = document.querySelectorAll('[data-comparison]');

  sliders.forEach(slider => {
    const range = slider.querySelector('.comparison-range');

    const updatePosition = (value) => {
      slider.style.setProperty('--pos', `${value}%`);
    };

    // Actualiza al arrastrar o tocar
    range.addEventListener('input', (e) => {
      updatePosition(e.target.value);
    });

    // Soporte para mover deslizando directamente con el cursor
    range.addEventListener('change', (e) => {
      updatePosition(e.target.value);
    });
  });
}