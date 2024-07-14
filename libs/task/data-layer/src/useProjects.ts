import { uniq } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { useMemo } from 'react';

import { actionItemsAtom } from './atoms/actionItemAtom';
import { selectedActionItemAtom } from './atoms/actionItemListAtom';
import { separator } from './config/config';
import { ActionItemSdk } from './firebase/ActionItemSdk';

const projectsAtom = atomWithDefault<string[]>(get =>
  uniq(
    get(actionItemsAtom)
      .filter(t => new RegExp(separator).exec(t.name))
      .map(t => t.name.split(separator)[0]?.trim())
      .filter(Boolean),
  ),
);

const setProjectsAtom = atom(null, async (get, _, project: string) => {
  const actionItem = get(selectedActionItemAtom);

  if (!actionItem) return;

  const name = actionItem.name.split(separator).pop();
  const sdk = new ActionItemSdk();
  await sdk.update(actionItem.id, {
    name: `${project}${separator}${name!}`,
  });
});

const unSetProjectAtom = atom(null, async get => {
  const actionItem = get(selectedActionItemAtom);

  if (!actionItem) return;

  const name = actionItem.name.split(separator).pop();
  const sdk = new ActionItemSdk();
  await sdk.update(actionItem.id, { name: name! });
});

export const useProjects = () => {
  return useAtom(projectsAtom)[0];
};

export const useSetProjects = () => {
  const setProject = useSetAtom(setProjectsAtom);
  const unSetProject = useSetAtom(unSetProjectAtom);
  return useMemo(
    () => ({ setProject, unSetProject }),
    [setProject, unSetProject],
  );
};
