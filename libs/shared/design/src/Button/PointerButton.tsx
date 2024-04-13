import { cn } from '@blackhole/cn';

type Props = React.HTMLAttributes<HTMLSpanElement>;

export const PointerButton = (props: Props) => {
  return (
    <span
      className={cn(
        'color-muted cursor-pointer hover:color-secondary',
        props.className,
      )}
      {...props}
    >
      [ {props.children} ]
    </span>
  );
};
