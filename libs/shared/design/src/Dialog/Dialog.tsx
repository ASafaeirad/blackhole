import { cn } from '@blackhole/cn';
import type { DialogContentProps } from '@radix-ui/react-dialog';
import * as RxDialog from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';

export type { DialogProps, DialogTriggerProps } from '@radix-ui/react-dialog';

const content = cva(
  ['fc', 'px-7', 'py-6', 'bg-elevated', 'border', 'rounded-md', 'gap-5'],
  {
    variants: {
      position: {
        fixed: ['fixed', 'absolute-center'],
        absolute: ['absolute', 'absolute-center'],
      },
    },
  },
);

const Content = (
  props: DialogContentProps & { position?: 'absolute' | 'fixed' },
) => (
  <RxDialog.Portal>
    <RxDialog.Content
      {...props}
      className={cn(content({ position: props.position }), props.className)}
    ></RxDialog.Content>
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
