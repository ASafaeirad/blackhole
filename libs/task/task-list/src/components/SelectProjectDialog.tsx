import { Actions } from '@blackhole/actions';
import { Select } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import { useProjects, useSetProjects } from '@blackhole/task/data-layer';
import { clamp } from '@fullstacksjs/toolbox';
import { useMemo, useState } from 'react';

interface Props {
  onClose: () => void;
}

export const SelectProjectDialog = ({ onClose }: Props) => {
  const projects = useProjects();
  const [selected, setSelected] = useState(0);
  const setMode = useSetMode();
  const { setProject, unSetProject } = useSetProjects();
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
    async () => {
      if (selected === 0) {
        await unSetProject();
      } else {
        await setProject(items[selected]!);
      }
      setMode(Mode.Normal);
      onClose();
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
