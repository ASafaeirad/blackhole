import { Command } from '@blackhole/design';

export const HiddenTaskMessage = () => (
  <span className="fr my-3 op-70 gap-3 items-center">
    <span className="pt-1 color-muted italic flex-shrink-0">
      Some tasks are hidden
    </span>

    <Command className="flex-shrink-0" keybinding={['.']}>
      toggle visibility
    </Command>
  </span>
);
