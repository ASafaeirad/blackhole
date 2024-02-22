import type { KeyboardEventCode, KeyboardEventKey } from './Keybinding';

const codeMap: Partial<Record<KeyboardEventKey, KeyboardEventCode>> = {
  ' ': 'Space',
  'escape': 'Escape',
  'enter': 'Enter',
};

export class Chord {
  private ctrl: boolean;
  private shift: boolean;
  private alt: boolean;
  private meta: boolean;
  private code: string;

  static fromKeyboardEvent(event: KeyboardEvent) {
    return new Chord({
      alt: event.altKey,
      ctrl: event.ctrlKey,
      code: event.code,
      meta: event.metaKey,
      shift: event.shiftKey,
    });
  }

  private static charToCode(char: KeyboardEventKey): string {
    if (codeMap[char]) return codeMap[char]!;
    if (char > 'a' && char < 'z') return `Key${char.toUpperCase()}`;
    throw Error(`Unknown key: ${char}`);
  }

  static fromString(str: string) {
    return new Chord({
      alt: str.includes('alt'),
      ctrl: str.includes('ctrl'),
      meta: str.includes('meta'),
      shift: str.includes('shift'),
      code: this.charToCode(str.split('+').pop() as KeyboardEventKey),
    });
  }

  get metaHash() {
    return (
      (this.ctrl ? 1 : 0) +
      (this.alt ? 2 : 0) +
      (this.shift ? 4 : 0) +
      (this.meta ? 8 : 0)
    );
  }

  get hash() {
    return `${this.metaHash}+${this.code}`;
  }

  constructor(options: {
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    meta: boolean;
    code: string;
  }) {
    this.ctrl = options.ctrl;
    this.shift = options.shift;
    this.alt = options.alt;
    this.meta = options.meta;
    this.code = options.code;
  }
}
