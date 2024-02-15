import type { DialogContentProps } from '@radix-ui/react-dialog';
import * as RxDialog from '@radix-ui/react-dialog';

export type { DialogProps, DialogTriggerProps } from '@radix-ui/react-dialog';
const Content = (props: DialogContentProps) => (
  <RxDialog.Portal>
    <RxDialog.Content {...props}></RxDialog.Content>
  </RxDialog.Portal>
);

export const Dialog = (props: RxDialog.DialogProps) => (
  <RxDialog.Root {...props} />
);

Dialog.Content = Content;
Dialog.Trigger = RxDialog.Trigger;
Dialog.Title = RxDialog.Title;
Dialog.Description = RxDialog.Description;
Dialog.Close = RxDialog.Close;
