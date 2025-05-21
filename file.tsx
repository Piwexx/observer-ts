//Uso Intersection

const elementos = document.querySelectorAll('.card');
const contenedor = document.querySelector('.scroll-container');

const stop = observe(
  Array.from(elementos),
  (entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  },
  {
    root: contenedor,
    rootMargin: '0px 0px -50px 0px',
    threshold: 1.0,
  },
);

//Resize Observer
const elementos = document.querySelectorAll('.card');

const stop = observe(
  Array.from(elementos),
  (entry) => {
    const { width, height } = entry.contentRect;
    console.log(`Elemento: ${entry.target.textContent} - Nuevo tamaño: ${width}px x ${height}px`);
  },
  {},
);
