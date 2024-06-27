import type { DateValue } from 'react-aria';

import type { DialogProps } from '../Dialog';
import { Dialog } from '../Dialog';
import type { CalendarProps } from './Calendar';
import { Calendar } from './Calendar';

interface Props<T extends DateValue> extends DialogProps, CalendarProps<T> {
  title: React.ReactNode;
}

export const CalendarDialog = <T extends DateValue>({
  open,
  title,
  ...props
}: Props<T>) => {
  return (
    <Dialog open={open}>
      <Dialog.Content position="fixed">
        <Dialog.Title>{title}</Dialog.Title>
        <Calendar autoFocus {...props} />
      </Dialog.Content>
    </Dialog>
  );
};
