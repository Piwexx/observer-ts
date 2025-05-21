import { ObserverOptions, ResizeCallback, StopObserving } from '@types/resizeObserver';
/**
 * Observa uno o varios elementos con ResizeObserver.
 *
 * @param target - Elemento o arreglo de elementos a observar.
 * @param callback - Función que se ejecuta al modificar el tamaño de un elemento.
 * @param options - Opciones del ResizeObserver.
 * @returns Función para detener la observación.
 */
export const resizeElements = (
  target: Element | Element[],
  callback: ResizeCallback,
  options: ObserverOptions,
): StopObserving => {
  const elements = (Array.isArray(target) ? target : [target]).filter(Boolean);

  const resizeObserver = new ResizeObserver((entries, resizeInstance) => {
    entries.forEach((entry) => {
      callback(entry, resizeInstance);
    });
  });

  elements.forEach((el) => resizeObserver.observe(el, options));

  return () => {
    resizeObserver.disconnect();
  };
};
