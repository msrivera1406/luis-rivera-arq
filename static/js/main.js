document.addEventListener('DOMContentLoaded', () => {
  initHoverAccordion();
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