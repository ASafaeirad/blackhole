import { Actions } from '@blackhole/actions';
import { CalendarDialog } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import {
  useActionItemDispatch,
  useActionItemListState,
} from '@blackhole/task/data-layer';
import { bind } from '@fullstacksjs/toolbox';
import type { ZonedDateTime } from '@internationalized/date';
import { fromDate, getLocalTimeZone } from '@internationalized/date';

interface Props {
  open?: boolean;
  onClose?: () => void;
}

export const DateModal = ({ open, onClose }: Props) => {
  const setMode = useSetMode();
  const { setDueDate } = useActionItemDispatch();
  const { activeActionItem } = useActionItemListState();

  const close = () => {
    onClose?.();
    setMode(Mode.Normal);
  };

  useSubscribeAction(Actions.CloseModal, close);

  const handleChange = (date: ZonedDateTime): void => {
    void setDueDate(date.toDate());
    close();
  };

  return (
    <CalendarDialog
      title="Due Date"
      open={open}
      value={bind(activeActionItem?.dueDate, v =>
        fromDate(v, getLocalTimeZone()),
      )}
      defaultFocusedValue={fromDate(
        activeActionItem?.dueDate ?? new Date(),
        getLocalTimeZone(),
      )}
      onChange={handleChange}
    />
  );
};
