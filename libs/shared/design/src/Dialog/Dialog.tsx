import { cn } from '@blackhole/cn';
import { callAll } from '@fullstacksjs/toolbox';
import type { DialogContentProps as RDialogContentProps } from '@radix-ui/react-dialog';
import * as RxDialog from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { createContext, useContext, useState } from 'react';

import type { ButtonProps } from '../Button';
import { Button } from '../Button';

export type { DialogProps, DialogTriggerProps } from '@radix-ui/react-dialog';

const DialogContext = createContext<boolean>(false);
const SetDialogContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => true);

const content = cva(
  [
    'relative bg-cta fc px-7 py-6 rounded-md gap-5 bh outline-none',
    'after:content-empty after:h-full after:absolute after:w-[3px] after:bv after:left-0 after:top-0',
    'before:content-empty before:h-full before:absolute before:w-[3px] before:bv before:left-full before:top-0',
  ],
  {
    variants: {
      position: {
        fixed: ['fixed', 'absolute-center'],
        absolute: ['absolute', 'absolute-center'],
      },
    },
  },
);

export interface DialogContentProps extends RDialogContentProps {
  position?: 'absolute' | 'fixed';
}

const Content = (props: DialogContentProps) => (
  <RxDialog.Portal>
    <RxDialog.Content
      {...props}
      className={cn(content({ position: props.position }), props.className)}
    >
      {props.children}
      <div className="absolute h-[3px] w-full bottom-0 left-0 bh" />
    </RxDialog.Content>
  </RxDialog.Portal>
);

export const Dialog = (props: RxDialog.DialogProps) => {
  const [controlledOpen, setOpen] = useState(props.open ?? false);
  const open = props.open ?? controlledOpen;

  return (
    <DialogContext.Provider value={open}>
      <SetDialogContext.Provider value={setOpen}>
        <RxDialog.Root {...props} open={open} />
      </SetDialogContext.Provider>
    </DialogContext.Provider>
  );
};

export const Trigger = (props: ButtonProps) => {
  const setOpen = useContext(SetDialogContext);

  return <Button {...props} onPress={() => setOpen(true)} />;
};

export const Close = (props: ButtonProps) => {
  const setOpen = useContext(SetDialogContext);

  return (
    <Button {...props} onPress={callAll(props.onPress, () => setOpen(false))} />
  );
};

Dialog.Content = Content;
Dialog.Trigger = Trigger;
Dialog.Title = RxDialog.Title;
Dialog.Description = RxDialog.Description;
Dialog.Close = Close;
