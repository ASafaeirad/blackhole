import { cn } from '@blackhole/cn';

export type TagProps = React.HTMLAttributes<HTMLSpanElement>;

export const Tag = (props: TagProps) => {
  return (
    <span
      {...props}
      className={cn(
        'px-3 py-1 mt-1 rounded text-small bg-current-subtle',
        props.className,
      )}
    />
  );
};
