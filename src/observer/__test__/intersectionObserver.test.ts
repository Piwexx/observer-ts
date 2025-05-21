import { observeElements } from '@src/observer/intersectionObserver';

describe('observe', () => {
  let mockObserve: unknown;
  let mockUnobserve: unknown;
  let mockDisconnect: unknown;

  beforeEach(() => {
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();
    mockDisconnect = vi.fn();

    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      takeRecords: () => [],
    }));
  });

  it('debería observar un solo elemento', () => {
    const el = document.createElement('div');
    observeElements(el, vi.fn());

    expect(mockObserve).toHaveBeenCalledWith(el);
  });

  it('debería observar múltiples elementos', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    observeElements([el1, el2], vi.fn());

    expect(mockObserve).toHaveBeenCalledWith(el1);
    expect(mockObserve).toHaveBeenCalledWith(el2);
  });

  it('debería ejecutar el callback al intersectar', () => {
    const el = document.createElement('div');
    const cb = vi.fn();

    let trigger!: (entries: unknown[], observer: unknown) => void;

    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      trigger = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      };
    });

    observeElements(el, cb);

    const entry = { target: el, isIntersecting: true };
    trigger([entry], {}); // Simula la intersección

    expect(cb).toHaveBeenCalledWith(entry, {});
  });

  it('debería dejar de observar al llamar al "stop"', () => {
    const el = document.createElement('div');
    const stop = observeElements(el, vi.fn());

    stop();

    expect(mockUnobserve).toHaveBeenCalledWith(el);
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
