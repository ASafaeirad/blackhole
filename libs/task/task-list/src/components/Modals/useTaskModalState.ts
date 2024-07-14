import { Actions } from '@blackhole/actions';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { useCallback, useMemo, useState } from 'react';

export interface ModalProps {
  onClose?: () => void;
  open?: boolean;
}

export enum TaskModalState {
  SortBy,
  SelectProject,
  DueDate,
}

export function useTaskModalState() {
  const [modalState, setOpen] = useState<TaskModalState>();
  const setMode = useSetMode();

  const close = useCallback(() => {
    setOpen(undefined);
    setMode(Mode.Normal);
  }, [setMode]);

  const open = (state: TaskModalState) => {
    setOpen(state);
    setMode(Mode.Overlay);
  };

  useSubscribeAction(Actions.OpenDueDate, () => open(TaskModalState.DueDate));
  useSubscribeAction(Actions.SortBy, () => open(TaskModalState.SortBy));
  useSubscribeAction(Actions.ShowSelectProject, () =>
    open(TaskModalState.SelectProject),
  );

  return useMemo(() => ({ modalState, close }), [close, modalState]);
}
