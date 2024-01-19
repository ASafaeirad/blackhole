import { debug } from '@blackhole/debug';
import { isEmpty } from '@fullstacksjs/toolbox';

import type { Platform } from './getPlatform';
import { getPlatform } from './getPlatform';
import { arraysAreEqual } from './utils';

export type KeySequence = string[];
export type PlatformSpecificKeySequence = Partial<
  Record<Platform, KeySequence>
>;

export interface Keybinding {
  keys: KeySequence | PlatformSpecificKeySequence;
  label: string;
  command?: () => void;
}

export const getPlatformKeys = (Keybinding: Keybinding) => {
  const platform = getPlatform();

  const keys = Array.isArray(Keybinding.keys)
    ? Keybinding.keys
    : Keybinding.keys[platform];

  if (!keys) {
    debug.trace(
      'Keybinding',
      `No keys found for platform "${platform}" in "${Keybinding.label}"`,
    );

    return;
  }

  return keys;
};

export const findKeybindingIndex = (
  shortcuts: Keybinding[],
  keys: string[],
) => {
  if (isEmpty(keys)) return undefined;

  const index = shortcuts.findIndex(shortcut => {
    const shortcutKeys = getPlatformKeys(shortcut);
    if (!shortcutKeys) return false;
    return arraysAreEqual(shortcutKeys, keys);
  });

  if (index === -1) return undefined;
  return index;
};

export const findKeybinding = (keyBindings: Keybinding[], keys: string[]) => {
  const shortcutIndex = findKeybindingIndex(keyBindings, keys);
  return shortcutIndex != null ? keyBindings[shortcutIndex] : null;
};
