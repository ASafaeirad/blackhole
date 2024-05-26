import { Actions } from '@blackhole/actions';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { useCallback, useMemo, useState } from 'react';

export function useSelectProjectModal() {
  const [open, setOpen] = useState(false);
  const setMode = useSetMode();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useSubscribeAction(Actions.ShowSelectProject, () => {
    setOpen(true);
    setMode(Mode.Insert);
  });

  return useMemo(() => ({ isOpen: open, close }), [close, open]);
}
