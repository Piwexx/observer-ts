export type MobserverOptions = MutationObserverInit;

export type MutationCallback = (entry: MutationRecord, observer: MutationObserver) => void;
