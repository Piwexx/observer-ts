import { IntersectionCallback, ObserverOptions, StopObserving } from '@types/intersectionObserver';

/**
 * Observa uno o varios elementos con IntersectionObserver.
 *
 * @param target - Elemento o arreglo de elementos a observar.
 * @param callback - Función que se ejecuta al cruzar el umbral de visibilidad.
 * @param options - Opciones del IntersectionObserver.
 * @returns Función para detener la observación.
 */
export function observeElements(
  target: Element | Element[],
  callback: IntersectionCallback,
  options: ObserverOptions = {},
): StopObserving {
  const elements = (Array.isArray(target) ? target : [target]).filter(Boolean);

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      callback(entry, observerInstance);
    });
  }, options);

  elements.forEach((el) => observer.observe(el));

  return () => {
    elements.forEach((el) => observer.unobserve(el));
    observer.disconnect(); // opcional: limpia completamente
  };
}
