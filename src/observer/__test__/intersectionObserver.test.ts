import { observeElements } from '@src/observer/intersectionObserver';

describe('observe', () => {
  let mockObserve: ReturnType<typeof vi.fn>;
  let mockUnobserve: ReturnType<typeof vi.fn>;
  let mockDisconnect: ReturnType<typeof vi.fn>;
  let IntersectionObserverMock: ReturnType<typeof vi.fn> & {
    _callback?: IntersectionObserverCallback;
  };

  beforeEach(() => {
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();
    mockDisconnect = vi.fn();

    IntersectionObserverMock = vi
      .fn()
      .mockImplementation((callback: IntersectionObserverCallback) => {
        IntersectionObserverMock._callback = callback;
        return {
          observe: mockObserve,
          unobserve: mockUnobserve,
          disconnect: mockDisconnect,
        };
      });

    global.IntersectionObserver =
      IntersectionObserverMock as unknown as typeof IntersectionObserver;
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

    observeElements(el, cb);

    const entry = { target: el, isIntersecting: true } as unknown as IntersectionObserverEntry;

    IntersectionObserverMock._callback?.([entry], {} as IntersectionObserver);

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
