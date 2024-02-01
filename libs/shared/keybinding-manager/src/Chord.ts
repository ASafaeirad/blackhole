export class Chord {
  private ctrl: boolean;
  private shift: boolean;
  private alt: boolean;
  private meta: boolean;
  private key: string;

  static fromKeyboardEvent(event: KeyboardEvent) {
    return new Chord({
      alt: event.altKey,
      ctrl: event.ctrlKey,
      key: event.key.toLocaleLowerCase(),
      meta: event.metaKey,
      shift: event.shiftKey,
    });
  }

  static fromString(str: string) {
    return new Chord({
      alt: str.includes('alt'),
      ctrl: str.includes('ctrl'),
      meta: str.includes('meta'),
      shift: str.includes('shift'),
      key: str.split('+').pop()!,
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
    return `${this.metaHash}+${this.key}`;
  }

  constructor(options: {
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    meta: boolean;
    key: string;
  }) {
    this.ctrl = options.ctrl;
    this.shift = options.shift;
    this.alt = options.alt;
    this.meta = options.meta;
    this.key = options.key;
  }
}
