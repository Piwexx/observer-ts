export type IobserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

export type IntersectionCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;
