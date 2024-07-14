import { Mode, setModeAtom } from '@blackhole/keybinding-manager';
import { atom } from 'jotai';

import { ActionItemSdk } from '../firebase/ActionItemSdk';

export const confirmDeleteActionItemIdAtom = atom<string | null>(null);

export const isDeletingAtom = atom(get => {
  return !!get(confirmDeleteActionItemIdAtom);
});

export const discardDeletingAtom = atom(null, (_, set) => {
  set(confirmDeleteActionItemIdAtom, null);
  set(setModeAtom, Mode.Normal);
});

export const showDeleteActionItemDialogAtom = atom(
  null,
  (get, set, id: string) => {
    set(confirmDeleteActionItemIdAtom, id);
    set(setModeAtom, Mode.Overlay);
  },
);

export const deleteActionItemAtom = atom(null, async (get, set) => {
  const sdk = new ActionItemSdk();
  const confirmDeleteActionItemId = get(confirmDeleteActionItemIdAtom);

  if (!confirmDeleteActionItemId) return;

  set(confirmDeleteActionItemIdAtom, null);
  set(setModeAtom, Mode.Normal);

  await sdk.delete(confirmDeleteActionItemId);
});
