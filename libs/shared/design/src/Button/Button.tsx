import { cn } from '@blackhole/cn';
import { forwardRef } from 'react';
import type { ButtonProps as RButtonProps } from 'react-aria-components';
import { Button as BaseButton } from 'react-aria-components';

export interface ButtonProps extends Omit<RButtonProps, 'children'> {
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <BaseButton
        {...props}
        ref={ref}
        className={cn(
          'outline-none bg-transparent color-muted focus-within:color-primary',
          props.className,
        )}
      >
        [{props.children}]
      </BaseButton>
    );
  },
);
