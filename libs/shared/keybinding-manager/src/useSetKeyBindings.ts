import { isEmpty } from '@fullstacksjs/toolbox';
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type { Keybinding } from './Keybinding';
import { findKeybinding } from './Keybinding';

const isMeta = (e: KeyboardEvent) =>
  ['Meta', 'Control', 'Alt', 'Shift'].includes(e.key);

const addMeta = (e: KeyboardEvent) => {
  // eslint-disable-next-line fp/no-let
  let meta = '';
  if (e.metaKey) meta += 'meta+';
  if (e.ctrlKey) meta += 'ctrl+';
  if (e.altKey) meta += 'alt+';
  if (e.shiftKey) meta += 'shift';
  return `${meta}${e.key}`;
};

export const useSetKeyBindings = (
  keyBindings: Keybinding[],
  debounce: number = 1000,
) => {
  const keySequenceRef = useRef<string[]>([]);

  const removeKeys = useDebouncedCallback(() => {
    keySequenceRef.current = [];
  }, debounce);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      console.log('Key pressed', event.key, 'Sequence', keySequenceRef.current);

      if (isEmpty(keyBindings)) return;

      const keySequence = keySequenceRef.current;

      if (event.key === 'Escape') {
        keySequenceRef.current = [];
        return;
      }

      if (isMeta(event)) return;
      keySequence.push(addMeta(event));
      if (isEmpty(keySequenceRef.current)) return;

      const shortcut = findKeybinding(keyBindings, keySequence);
      if (!shortcut?.command) return;

      shortcut.command();
      removeKeys();
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [keyBindings, removeKeys]);
};
