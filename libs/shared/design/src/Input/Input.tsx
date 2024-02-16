import { cn } from '@blackhole/cn';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={cn(
        'bg-transparent color-primary border-none outline-none',
        props.className,
      )}
    />
  );
};
