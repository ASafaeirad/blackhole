import { KeybindingManager } from './KeybindingManager';

describe('KeybindingManager', () => {
  it('should register keybindings', () => {
    const handle = vi.fn();
    const manager = new KeybindingManager({
      GoToNormalMode: 'ctrl+shift+alt+a',
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      key: 'a',
    });
    document.dispatchEvent(event);
    const event2 = new KeyboardEvent('keydown', { key: 'a' });
    document.dispatchEvent(event2);

    expect(handle).toHaveBeenCalledOnce();
  });

  it('should register keybindings case-insensitive', () => {
    const handle = vi.fn();
    const manager = new KeybindingManager({
      GoToNormalMode: 'escape',
    });
    manager.subscribe('GoToNormalMode', handle);
    manager.register(document);

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(handle).toHaveBeenCalledOnce();
  });
});
