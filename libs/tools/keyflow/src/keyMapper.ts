import type { Keybinding, Shortcut } from './Keybinding';

export enum Mode {
  Normal = 0b01,
  Insert = 0b10,
  Overlay = 0b100,
  Command = 0b1000,
}

interface MapArgs {
  group: string;
  key: Shortcut[];
  description: string;
}

export const cMap = (args: MapArgs): Keybinding => ({
  mode: Mode.Command,
  ...args,
});

export const nMap = (args: MapArgs): Keybinding => ({
  mode: Mode.Normal,
  ...args,
});

export const iMap = (args: MapArgs): Keybinding => ({
  mode: Mode.Insert,
  ...args,
});

export const oMap = (args: MapArgs): Keybinding => ({
  mode: Mode.Overlay,
  ...args,
});

export const map = (args: MapArgs & { mode?: Mode }): Keybinding => ({
  mode: Mode.Insert | Mode.Normal | Mode.Overlay,
  ...args,
});

export type KeyMap = Record<string, Keybinding>;
