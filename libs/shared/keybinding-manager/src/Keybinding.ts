/* eslint-disable @typescript-eslint/sort-type-constituents */

// cspell:disable
export type KeyboardEventKey =
  // Control keys
  | 'enter'
  | 'escape'
  | 'backspace'
  | 'tab'
  | 'space'
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
type ThreeMetaCombo = Exclude<Meta, 'super'> extends infer O
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
export type Keybinding = KeyboardEventKey | SingleMeta | ThreeMeta | TwoMeta;
