import { Actions } from '@blackhole/actions';
import { CalendarDialog } from '@blackhole/design';
import {
  useActionItemDispatch,
  useActionItemListState,
} from '@blackhole/task/data-layer';
import { bind } from '@fullstacksjs/toolbox';
import type { ZonedDateTime } from '@internationalized/date';
import { fromDate, getLocalTimeZone } from '@internationalized/date';

import type { ModalProps } from './useTaskModalState';

export const DueDateModal = ({ onClose, open }: ModalProps) => {
  const { setDueDate } = useActionItemDispatch();
  const { activeActionItem } = useActionItemListState();

  const handleChange = async (date: ZonedDateTime) => {
    await setDueDate(date.toDate());
    onClose?.();
  };

  return (
    <CalendarDialog
      title="Due Date"
      value={bind(activeActionItem?.dueDate, v =>
        fromDate(v, getLocalTimeZone()),
      )}
      defaultFocusedValue={fromDate(
        activeActionItem?.dueDate ?? new Date(),
        getLocalTimeZone(),
      )}
      action={Actions.OpenDueDate}
      onChange={handleChange}
    />
  );
};
