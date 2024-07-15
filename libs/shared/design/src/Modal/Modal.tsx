import type { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import { isFunction } from '@fullstacksjs/toolbox';
import { cva } from 'class-variance-authority';
import { useState } from 'react';
import { FocusScope } from 'react-aria';
import type { DialogProps } from 'react-aria-components';
import {
  Dialog,
  DialogTrigger,
  Header,
  Modal as BaseModal,
} from 'react-aria-components';

export interface ModalProps extends DialogProps {
  action: Actions;
  onClose?: () => void;
}

const content = cva(
  [
    'relative bg-elevated fc px-7 py-6 rounded-md gap-5 outline-none',
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

export const Modal = ({ onClose, action, ...props }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const setMode = useSetMode();

  const close = () => {
    setIsOpen(false);
    setMode(Mode.Normal);
    onClose?.();
  };

  // useSubscribeAction(action, () => {
  //   setIsOpen(true);
  //   setMode(Mode.Overlay);
  // });

  // useSubscribeAction(Actions.CloseModal, () => {
  //   close();
  // });

  return (
    <BaseModal isOpen={isOpen}>
      <Dialog {...props}>
        {isFunction(props.children)
          ? props.children({ close })
          : props.children}
      </Dialog>
    </BaseModal>
  );
};

export interface ModalContentProps {
  children: React.ReactNode;
  position: 'absolute' | 'fixed';
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const Content = (props: ModalContentProps) => {
  return (
    <FocusScope contain restoreFocus autoFocus>
      <div
        {...props}
        className={cn(content({ position: props.position }), props.className)}
      >
        <div className="absolute h-[3px] w-full left-0 top-0 bh" />
        {props.children}
        <div className="absolute h-[3px] w-full bottom-0 left-0 bh" />
      </div>
    </FocusScope>
  );
};

interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = (props: ModalTitleProps) => (
  <Header
    {...props}
    slot="title"
    className={cn('text-title', props.className)}
  />
);

Modal.Content = Content;
Modal.Title = Title;
Modal.Trigger = DialogTrigger;
