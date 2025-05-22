import { mutationElements } from '@src/observer/MutationObserver';

let mockObserve: ReturnType<typeof vi.fn>;
let mockDisconnect: ReturnType<typeof vi.fn>;
let mockTakeRecords: ReturnType<typeof vi.fn>;
let MutationObserverMock: ReturnType<typeof vi.fn> & {
  _callback?: MutationCallback;
};

beforeEach(() => {
  mockObserve = vi.fn();
  mockDisconnect = vi.fn();
  mockTakeRecords = vi.fn();

  MutationObserverMock = vi.fn().mockImplementation((callback: MutationCallback) => {
    MutationObserverMock._callback = callback;
    return {
      observe: mockObserve,
      takeRecords: mockTakeRecords,
      disconnect: mockDisconnect,
    };
  });

  global.MutationObserver = MutationObserverMock as unknown as typeof MutationObserver;
});

describe('mutationElements', () => {
  it('debe crear un observer y observar elementos', () => {
    const div = document.createElement('div');
    const cb = vi.fn();

    const stop = mutationElements(div, cb, { childList: true });

    expect(mockObserve).toHaveBeenCalledWith(div, { childList: true });

    stop();
    expect(mockDisconnect).toHaveBeenCalledTimes(1); // solo 1 observer creado
  });

  it('debe observar múltiples elementos', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('section');
    const cb = vi.fn();

    const stop = mutationElements([el1, el2], cb, { attributes: true });

    expect(mockObserve).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledWith(el1, { attributes: true });
    expect(mockObserve).toHaveBeenCalledWith(el2, { attributes: true });

    stop();
    expect(mockDisconnect).toHaveBeenCalledTimes(1); // solo 1 observer creado
  });

  it('debe llamar al callback cuando se dispara manualmente', () => {
    const el = document.createElement('div');
    const cb = vi.fn();

    const stop = mutationElements(el, cb, { childList: true });

    const mutation = {
      type: 'childList',
      target: el,
    } as unknown as MutationRecord;

    // Simula un trigger desde el mock
    MutationObserverMock._callback?.([mutation], {} as MutationObserver);

    expect(cb).toHaveBeenCalledWith(mutation, expect.any(Object));

    stop();
    expect(mockDisconnect).toHaveBeenCalledTimes(1); // solo 1 observer creado
  });
});
