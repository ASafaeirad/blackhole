import { cn } from '@blackhole/cn';
import type { ButtonProps as RButtonProps } from 'react-aria-components';
import { Button as BaseButton } from 'react-aria-components';

export interface ButtonProps extends Omit<RButtonProps, 'children'> {
  children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  return (
    <BaseButton
      {...props}
      className={cn(
        'outline-none bg-transparent color-muted focus-within:color-primary',
        props.className,
      )}
    >
      [ {props.children} ]
    </BaseButton>
  );
};
