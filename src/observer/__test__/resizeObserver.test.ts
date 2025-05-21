import { resizeElements } from '@src/observer/resizeObserver';

describe('resizeElements', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let ResizeObserverMock: ReturnType<typeof vi.fn> & {
    _callback?: ResizeObserverCallback;
  };

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();

    ResizeObserverMock = vi.fn().mockImplementation((callback: ResizeObserverCallback) => {
      ResizeObserverMock._callback = callback;
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
      };
    });

    global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('observa un elemento y ejecuta el callback en resize', () => {
    const el = document.createElement('div');
    const cb = vi.fn();

    resizeElements(el, cb, { box: 'border-box' });

    const entry = { target: el, contentRect: {} } as ResizeObserverEntry;
    ResizeObserverMock._callback?.([entry], {} as ResizeObserver);

    expect(cb).toHaveBeenCalledWith(entry, expect.any(Object));
    expect(observeMock).toHaveBeenCalledWith(el, { box: 'border-box' });
  });

  it('observa múltiples elementos', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const cb = vi.fn();

    resizeElements([el1, el2], cb, {});

    expect(observeMock).toHaveBeenCalledWith(el1, {});
    expect(observeMock).toHaveBeenCalledWith(el2, {});
  });

  it('retorna una función que desconecta el observer', () => {
    const el = document.createElement('div');
    const cb = vi.fn();

    const stop = resizeElements(el, cb, {});
    stop();

    expect(disconnectMock).toHaveBeenCalled();
  });
});
