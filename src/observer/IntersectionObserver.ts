import { StopObserving } from '@src/types/helper';
import { IntersectionCallback, IobserverOptions } from '@src/types/intersectionObserver';
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
  options: IobserverOptions = {},
): StopObserving {
  const elements = (Array.isArray(target) ? target : [target]).filter(Boolean);

  if (!elements.length) {
    throw new Error('observeElements: No valid elements to observe.');
  }

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
