import { Actions } from '@blackhole/actions';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { useCallback, useMemo, useState } from 'react';

export function useDateModal() {
  const [open, setOpen] = useState(false);
  const setMode = useSetMode();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useSubscribeAction(Actions.OpenDueDate, () => {
    setOpen(true);
    setMode(Mode.Overlay);
  });

  return useMemo(() => ({ isOpen: open, close }), [close, open]);
}
