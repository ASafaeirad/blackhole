import { Actions } from '@blackhole/actions';
import type { SelectRef } from '@blackhole/design';
import { Select } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import { useProjects, useSetProjects } from '@blackhole/task/data-layer';
import { useCallback, useMemo, useRef } from 'react';

interface Props {
  onClose: () => void;
}

export const SelectProjectDialog = ({ onClose }: Props) => {
  const projects = useProjects();
  const selectRef = useRef<SelectRef>(null);
  const setMode = useSetMode();
  const { setProject, unSetProject } = useSetProjects();
  const items = useMemo(() => ['None', ...projects], [projects]);

  useSubscribeAction(Actions.CloseModal, () => {
    onClose();
    setMode(Mode.Normal);
  });

  useSubscribeActionOnMode(Actions.MoveNextBlockInsert, Mode.Insert, () => {
    selectRef.current?.selectNext();
  });

  useSubscribeActionOnMode(Actions.MovePrevBlockInsert, Mode.Insert, () => {
    selectRef.current?.selectPrev();
  });

  const onSelect = useCallback(
    (name: string): void => {
      if (name === 'None') {
        void unSetProject();
      } else {
        void setProject(name);
      }
      setMode(Mode.Normal);
      onClose();
    },
    [onClose, setMode, setProject, unSetProject],
  );

  return (
    <Select
      forceMount
      emptyState="No Project"
      items={items}
      ref={selectRef}
      onSelect={onSelect}
      title="Select Project"
    />
  );
};
