export type ObserverOptions = ResizeObserverOptions;

export type ResizeCallback = (entry: ResizeObserverEntry, observer: ResizeObserver) => void;

export type StopObserving = () => void;
