import type { Keybinding } from './Keybinding';

export enum Mode {
  Normal = 0b01,
  Insert = 0b10,
}

export const nMap = (key: Keybinding): WithMode<Keybinding> => ({
  key,
  mode: Mode.Normal,
});

export const iMap = (key: Keybinding): WithMode<Keybinding> => ({
  key,
  mode: Mode.Insert,
});

export const map = (key: Keybinding): WithMode<Keybinding> => ({
  key,
  mode: Mode.Insert | Mode.Normal,
});

export interface WithMode<T extends string> {
  key: T;
  mode: Mode;
}
