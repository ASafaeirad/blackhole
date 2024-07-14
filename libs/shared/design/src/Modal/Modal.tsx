import { cn } from '@blackhole/cn';
import { cva } from 'class-variance-authority';
import { FocusScope } from 'react-aria';
import type { DialogProps } from 'react-aria-components';
import {
  Dialog,
  DialogTrigger,
  Header,
  Modal as BaseModal,
} from 'react-aria-components';

export interface ModalProps extends DialogProps {
  open?: boolean;
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

export const Modal = ({ open, ...props }: ModalProps) => {
  return (
    <BaseModal isOpen={open}>
      <Dialog {...props} />
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
