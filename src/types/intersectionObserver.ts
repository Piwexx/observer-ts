export type IobserverOptions = IntersectionObserverInit;

export type IntersectionCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;
