import { Actions } from '@blackhole/actions';
import { Select } from '@blackhole/design';
import { useProjects, useSetProjects } from '@blackhole/task/data-layer';
import { useCallback, useMemo } from 'react';

import type { ModalProps } from './useTaskModalState';

export const SelectProjectModal = ({ onClose }: ModalProps) => {
  const projects = useProjects();
  const { setProject, unSetProject } = useSetProjects();
  const items = useMemo(() => ['None', ...projects], [projects]);

  const onSelect = useCallback(
    (name: string): void => {
      if (name === 'None') {
        void unSetProject();
      } else {
        void setProject(name);
      }
      onClose?.();
    },
    [onClose, setProject, unSetProject],
  );

  return (
    <Select
      emptyState="No Project"
      items={items}
      action={Actions.ShowSelectProject}
      onSelect={onSelect}
      title="Select Project"
    />
  );
};
