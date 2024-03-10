import { Command } from '@blackhole/design';

export const HiddenTaskMessage = () => (
  <span className="my-3 op-70">
    <span className="color-muted italic">Some tasks are hidden </span>
    <Command keybinding="."> toggle visibility </Command>
  </span>
);
