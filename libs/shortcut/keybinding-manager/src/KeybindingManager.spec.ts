import { KeybindingManager } from './KeybindingManager';
import { Mode } from './keyMapper';

describe('KeybindingManager', () => {
  it('should register keybindings', () => {
    const handle = vi.fn();
    const manager = new KeybindingManager({
      GoToNormalMode: { key: 'ctrl+shift+alt+a', mode: Mode.Normal },
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
    const manager = new KeybindingManager({
      GoToNormalMode: { key: 'escape', mode: Mode.Normal },
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
    const manager = new KeybindingManager({
      GoToNormalMode: { key: 'i', mode: Mode.Normal },
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
    const manager = new KeybindingManager({
      GoToNormalMode: { key: 'i', mode: Mode.Insert },
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
    const manager = new KeybindingManager({
      GoToNormalMode: { key: 'a', mode: Mode.Normal | Mode.Insert },
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
});
