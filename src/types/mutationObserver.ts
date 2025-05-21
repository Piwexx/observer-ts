export type ObserverOptions = MutationObserverInit;

export type MutationCallback = (entry: MutationRecord, observer: MutationObserver) => void;

export type StopObserving = () => void;
