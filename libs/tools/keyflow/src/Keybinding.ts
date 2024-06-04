/* eslint-disable @typescript-eslint/sort-type-constituents */

import type { Mode } from './keyMapper';

// cspell:disable
export type KeyboardEventCode =
  | 'Backspace'
  | 'Tab'
  | 'Enter'
  | 'ShiftLeft'
  | 'ShiftRight'
  | 'ControlLeft'
  | 'ControlRight'
  | 'AltLeft'
  | 'AltRight'
  | 'Pause'
  | 'CapsLock'
  | 'Escape'
  | 'Space'
  | 'PageUp'
  | 'PageDown'
  | 'End'
  | 'Home'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'ArrowRight'
  | 'ArrowDown'
  | 'PrintScreen'
  | 'Insert'
  | 'Delete'
  | 'Digit0'
  | 'Digit1'
  | 'Digit2'
  | 'Digit3'
  | 'Digit4'
  | 'Digit5'
  | 'Digit6'
  | 'Digit7'
  | 'Digit8'
  | 'Digit9'
  | 'KeyA'
  | 'KeyB'
  | 'KeyC'
  | 'KeyD'
  | 'KeyE'
  | 'KeyF'
  | 'KeyG'
  | 'KeyH'
  | 'KeyI'
  | 'KeyJ'
  | 'KeyK'
  | 'KeyL'
  | 'KeyM'
  | 'KeyN'
  | 'KeyO'
  | 'KeyP'
  | 'KeyQ'
  | 'KeyR'
  | 'KeyS'
  | 'KeyT'
  | 'KeyU'
  | 'KeyV'
  | 'KeyW'
  | 'KeyX'
  | 'KeyY'
  | 'KeyZ'
  | 'MetaLeft'
  | 'MetaRight'
  | 'ContextMenu'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'NumLock'
  | 'ScrollLock'
  | 'Semicolon'
  | 'Equal'
  | 'Comma'
  | 'Minus'
  | 'Period'
  | 'Slash'
  | 'Backquote'
  | 'BracketLeft'
  | 'BracketRight'
  | 'Backslash'
  | 'Quote'
  | 'IntlBackslash'
  | 'Numpad0'
  | 'Numpad1'
  | 'Numpad2'
  | 'Numpad3'
  | 'Numpad4'
  | 'Numpad5'
  | 'Numpad6'
  | 'Numpad7'
  | 'Numpad8'
  | 'Numpad9'
  | 'NumpadMultiply'
  | 'NumpadAdd'
  | 'NumpadSubtract'
  | 'NumpadDecimal'
  | 'NumpadDivide'
  | 'NumpadEnter'
  | 'NumpadEqual';

// cspell:disable
export type KeyboardEventKey =
  // Control keys
  | 'enter'
  | 'escape'
  | 'capslock'
  | 'backspace'
  | 'tab'
  | ' '
  | '.'
  | 'delete'
  | 'end'
  | 'home'
  | 'insert'
  | 'pageup'
  | 'pagedown'
  | 'pause'
  | 'break'

  // fns keys
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'f10'
  | 'f11'
  | 'f12'
  | 'f13'
  | 'f14'
  | 'f15'
  | 'f16'
  | 'f17'
  | 'f18'
  | 'f19'
  | 'f20'
  | 'f21'
  | 'f22'
  | 'f23'
  | 'f24'

  // navigation keys
  | 'arrowdown'
  | 'arrowleft'
  | 'arrowright'
  | 'arrowup'

  // lowercase
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

  // numbers
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'

  // symbols
  | '!'
  | '@'
  | '#'
  | '$'
  | '%'
  | '^'
  | '&'
  | '*'
  | '('
  | ')'
  | '-'
  | '_'
  | '='
  | '+'
  | '|'
  | '['
  | ']'
  | '/'

  // numeric keypad keys
  | 'numpad0'
  | 'numpad1'
  | 'numpad2'
  | 'numpad3'
  | 'numpad4'
  | 'numpad5'
  | 'numpad6'
  | 'numpad7'
  | 'numpad8'
  | 'numpad9'
  | 'numpadmultiply'
  | 'numpadadd'
  | 'numpadsubtract'
  | 'numpaddecimal'
  | 'numpaddivide'

  // various other keys
  | 'contextmenu'
  | 'help'
  | 'printscreen';
// cspell:enable

type Meta = 'alt' | 'ctrl' | 'shift' | 'super';
type SingleMeta = `${Meta}+${KeyboardEventKey}`;
type ThreeMetaCombo =
  Exclude<Meta, 'super'> extends infer O
    ? O extends Meta
      ? Exclude<Meta, O> extends infer P
        ? P extends Meta
          ? Exclude<Meta, O | P> extends infer Q
            ? Q extends Meta
              ? `${O}+${P}+${Q}`
              : never
            : never
          : never
        : never
      : never
    : never;
type TwoMeta<T = Meta> = T extends Meta
  ? `${T}+${Exclude<Meta, T>}+${KeyboardEventKey}`
  : never;
type ThreeMeta = `${ThreeMetaCombo}+${KeyboardEventKey}`;
export type Shortcut =
  | KeyboardEventKey
  | SingleMeta
  | ThreeMeta
  | TwoMeta
  | `${KeyboardEventKey},${KeyboardEventKey}`
  | `alt+${KeyboardEventKey},alt+${KeyboardEventKey}`;

export interface Keybinding {
  key: Shortcut[];
  mode: Mode;
  group: string;
  description: string;
}
