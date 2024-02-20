import type { Keybinding } from './Keybinding';

export enum Mode {
  Normal = 0b01,
  Insert = 0b10,
}

export const nMap = (key: string): WithMode<Keybinding> => ({
  key: key as Keybinding,
  mode: Mode.Normal,
});

export const iMap = (key: string): WithMode<Keybinding> => ({
  key: key as Keybinding,
  mode: Mode.Insert,
});

export const map = (key: string): WithMode<Keybinding> => ({
  key: key as Keybinding,
  mode: Mode.Insert | Mode.Normal,
});

export interface WithMode<T extends string> {
  key: T;
  mode: Mode;
}
