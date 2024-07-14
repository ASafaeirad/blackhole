import type { DateValue } from 'react-aria';

import type { ModalProps } from '../Modal';
import { Modal } from '../Modal';
import type { CalendarProps } from './Calendar';
import { Calendar } from './Calendar';

interface Props<T extends DateValue>
  extends Omit<ModalProps, 'children'>,
    CalendarProps<T> {
  onClose?: () => void;
  title: React.ReactNode;
}

export const CalendarDialog = <T extends DateValue>({
  open,
  title,
  onClose,
  ...props
}: Props<T>) => {
  return (
    <Modal open={open}>
      <Modal.Content position="fixed">
        <Modal.Title>{title}</Modal.Title>
        <Calendar onClose={onClose} autoFocus {...props} />
      </Modal.Content>
    </Modal>
  );
};
