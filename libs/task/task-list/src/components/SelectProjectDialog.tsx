import { Actions } from '@blackhole/actions';
import { Select } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import { clamp } from '@fullstacksjs/toolbox';
import { useAtom, useSetAtom } from 'jotai';
import { useMemo, useState } from 'react';

import {
  projectsAtom,
  setProjectsAtom,
  unSetProjectsAtom,
} from '../data/taskAtom';

interface Props {
  onClose: () => void;
}

export const SelectProjectDialog = ({ onClose }: Props) => {
  const [projects] = useAtom(projectsAtom);
  const [selected, setSelected] = useState(0);
  const setMode = useSetMode();
  const setProject = useSetAtom(setProjectsAtom);
  const unSetProject = useSetAtom(unSetProjectsAtom);
  const items = useMemo(() => ['None', ...projects], [projects]);

  useSubscribeAction(Actions.CloseModal, () => {
    onClose();
    setMode(Mode.Normal);
  });

  useSubscribeActionOnMode(Actions.MoveNextBlock, Mode.Overlay, () => {
    setSelected(s => clamp(s + 1, 0, items.length - 1));
  });

  useSubscribeActionOnMode(Actions.MovePrevBlock, Mode.Overlay, () => {
    setSelected(s => clamp(s - 1, 0, items.length - 1));
  });

  useSubscribeActionOnMode(
    Actions.SelectProject,
    Mode.Overlay,
    () => {
      if (selected === 0) {
        unSetProject();
      } else {
        const project = items[selected];
        setProject(project!);
        onClose();
        setMode(Mode.Normal);
      }
    },
    [selected, items],
  );

  return (
    <Select
      forceMount
      emptyState="No Project"
      items={items}
      selected={selected}
      title="Select Project"
    />
  );
};
