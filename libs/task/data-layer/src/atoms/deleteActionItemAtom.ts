import { Mode, setModeAtom } from '@blackhole/keybinding-manager';
import { atom } from 'jotai';

import { ActionItemSdk } from '../firebase/ActionItemSdk';
import {
  focusedActionItemAtom,
  saveActionItemIndex,
} from './actionItemListAtom';
import { fixIndexAtom } from './fixIndexAtom';

export const confirmDeleteActionItemIdAtom = atom<string | null>(null);

export const isDeletingAtom = atom(get => {
  return !!get(confirmDeleteActionItemIdAtom);
});

export const discardDeletingAtom = atom(null, (_, set) => {
  set(confirmDeleteActionItemIdAtom, null);
});

export const deleteActionItemAtom = atom(null, async (get, set) => {
  const sdk = new ActionItemSdk();
  const activeActionItem = get(focusedActionItemAtom);
  if (!activeActionItem) return;
  const confirmDeleteActionItemId = get(confirmDeleteActionItemIdAtom);

  if (confirmDeleteActionItemId !== activeActionItem.id) {
    set(confirmDeleteActionItemIdAtom, activeActionItem.id);
    set(setModeAtom, Mode.Overlay);
    return;
  }

  set(saveActionItemIndex);
  set(confirmDeleteActionItemIdAtom, null);
  set(setModeAtom, Mode.Normal);

  await sdk.delete(activeActionItem.id);
  set(fixIndexAtom);
});
