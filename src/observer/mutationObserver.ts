import { MutationCallback, ObserverOptions, StopObserving } from '@types/mutationObserver';

/**
 * Observa uno o varios elementos con MutationObserver.
 *
 * @param target - Elemento o arreglo de elementos a observar.
 * @param callback - Función que se ejecuta al mutar el elemento.
 * @param options - Opciones del MutationObserver.
 * @returns Función para detener la observación.
 */
export function mutationElements(
  target: Element | Element[] | null | undefined,
  callback: MutationCallback,
  options: ObserverOptions = {},
): StopObserving {
  const elements = (Array.isArray(target) ? target : [target]).filter(Boolean);

  if (!elements.length) {
    throw new Error('mutationElements: No valid elements to observe.');
  }

  const observer = new MutationObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      callback(entry, observerInstance);
    });
  });

  elements.forEach((el) => observer.observe(el, options));

  return () => {
    observer.disconnect(); // opcional: limpia completamente
  };
}
