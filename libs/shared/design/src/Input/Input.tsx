import { cn } from '@blackhole/cn';
import { forwardRef } from 'react';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        'bg-transparent color-primary border-none outline-none w-full',
        props.className,
      )}
    />
  );
});
