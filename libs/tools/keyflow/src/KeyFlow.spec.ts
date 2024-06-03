import { KeyFlow } from './KeyFlow';
import { Mode } from './keyMapper';

describe('KeybindingManager', () => {
  it('should register keybindings', () => {
    const handle = vi.fn();
    const manager = new KeyFlow({
      GoToNormalMode: {
        group: '',
        key: ['ctrl+shift+alt+a'],
        mode: Mode.Normal,
      },
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      key: 'a',
      code: 'KeyA',
    });
    document.dispatchEvent(event);
    const event2 = new KeyboardEvent('keydown', { key: 'a', code: 'KeyA' });
    document.dispatchEvent(event2);

    expect(handle).toHaveBeenCalledOnce();
  });

  it('should register keybindings case-insensitive', () => {
    const handle = vi.fn();
    const manager = new KeyFlow({
      GoToNormalMode: { group: '', key: ['escape'], mode: Mode.Normal },
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
    });
    document.dispatchEvent(event);

    expect(handle).toHaveBeenCalledOnce();
  });

  it('should register keybindings in normal mode', () => {
    const handle = vi.fn();
    const manager = new KeyFlow({
      GoToNormalMode: { group: '', key: ['i'], mode: Mode.Normal },
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    const event = new KeyboardEvent('keydown', { key: 'i', code: 'KeyI' });
    document.dispatchEvent(event);
    manager.mode = Mode.Insert;
    document.dispatchEvent(event);

    expect(handle).toHaveBeenCalledOnce();
  });

  it('should register keybindings in insert mode', () => {
    const handle = vi.fn();
    const manager = new KeyFlow({
      GoToNormalMode: { group: '', key: ['i'], mode: Mode.Insert },
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    const event = new KeyboardEvent('keydown', { key: 'i', code: 'KeyI' });
    document.dispatchEvent(event);
    manager.mode = Mode.Insert;
    document.dispatchEvent(event);

    expect(handle).toHaveBeenCalledOnce();
  });

  it('should register keybindings in composed mode', () => {
    const handle = vi.fn();
    const manager = new KeyFlow({
      GoToNormalMode: {
        group: '',
        key: ['a'],
        mode: Mode.Normal | Mode.Insert,
      },
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    manager.mode = Mode.Normal;
    const event = new KeyboardEvent('keydown', { key: 'a', code: 'KeyA' });
    document.dispatchEvent(event);
    manager.mode = Mode.Insert;
    document.dispatchEvent(event);

    manager.mode = Mode.Overlay;
    document.dispatchEvent(event);

    expect(handle).toHaveBeenCalledTimes(2);
  });

  it('should not register keybindings in wrong mode', () => {
    const handle = vi.fn();
    const manager = new KeyFlow({
      GoToNormalMode: {
        group: '',
        description: '',
        key: ['i'],
        mode: Mode.Normal,
      },
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    manager.mode = Mode.Insert;
    const event = new KeyboardEvent('keydown', { key: 'i', code: 'KeyI' });
    document.dispatchEvent(event);

    expect(handle).not.toHaveBeenCalled();
  });

  it('should subscribe multiple times with a same key', () => {
    const handle1 = vi.fn();
    const handle2 = vi.fn();
    const manager = new KeyFlow({
      Action1: { group: '', key: ['i'], mode: Mode.Overlay },
      Action2: { group: '', key: ['i'], mode: Mode.Normal },
    });
    manager.subscribe('Action1', handle1);
    manager.subscribe('Action2', handle2);
    manager.register(document);

    manager.mode = Mode.Normal;
    const event = new KeyboardEvent('keydown', { key: 'i', code: 'KeyI' });
    document.dispatchEvent(event);

    manager.mode = Mode.Overlay;
    document.dispatchEvent(event);

    manager.mode = Mode.Insert;
    document.dispatchEvent(event);

    expect(handle1).toHaveBeenCalledOnce();
    expect(handle2).toHaveBeenCalledOnce();
  });

  it('should unsubscribe', () => {
    const handle = vi.fn();
    const manager = new KeyFlow({
      GoToNormalMode: { group: '', key: ['i'], mode: Mode.Normal },
    });
    const unsubscribe = manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    const event = new KeyboardEvent('keydown', { key: 'i', code: 'KeyI' });
    document.dispatchEvent(event);
    unsubscribe();
    document.dispatchEvent(event);

    expect(handle).toHaveBeenCalledOnce();
  });

  it('should be able to bind multiple keys to the same action', () => {
    const handle = vi.fn();
    const manager = new KeyFlow({
      GoToNormalMode: { group: '', key: ['i', 'escape'], mode: Mode.Normal },
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    const event = new KeyboardEvent('keydown', { key: 'i', code: 'KeyI' });
    document.dispatchEvent(event);
    const event2 = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
    });
    document.dispatchEvent(event2);

    expect(handle).toHaveBeenCalledTimes(2);
  });

  it('should be accept key sequence', () => {
    const handle = vi.fn();
    const manager = new KeyFlow({
      GoToNormalMode: { group: '', key: ['g,g'], mode: Mode.Normal },
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    const event = new KeyboardEvent('keydown', { key: 'g', code: 'KeyG' });
    document.dispatchEvent(event);

    expect(handle).toHaveBeenCalledTimes(0);

    document.dispatchEvent(event);

    expect(handle).toHaveBeenCalledTimes(1);
  });
});
