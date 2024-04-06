import type { Keybinding } from './Keybinding';

export enum Mode {
  Normal = 0b01,
  Insert = 0b10,
  Overlay = 0b100,
}

export const xIMap = (...key: Keybinding[]): WithMode<Keybinding[]> => ({
  key,
  mode: Mode.Normal | Mode.Overlay,
});

export const nMap = (...key: Keybinding[]): WithMode<Keybinding[]> => ({
  key,
  mode: Mode.Normal,
});

export const iMap = (...key: Keybinding[]): WithMode<Keybinding[]> => ({
  key,
  mode: Mode.Insert,
});

export const oMap = (...key: Keybinding[]): WithMode<Keybinding[]> => ({
  key,
  mode: Mode.Overlay,
});

export const map = (...key: Keybinding[]): WithMode<Keybinding[]> => ({
  key,
  mode: Mode.Insert | Mode.Normal | Mode.Overlay,
});

export interface WithMode<T extends string[] | string> {
  key: T;
  mode: Mode;
}
