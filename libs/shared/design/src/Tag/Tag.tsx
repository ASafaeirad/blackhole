import { cn } from '@blackhole/cn';

export type TagProps = React.HTMLAttributes<HTMLSpanElement>;

export const Tag = (props: TagProps) => {
  return (
    <span
      {...props}
      className={cn(
        'px-3 inline-flex grow-0 center rounded text-small bg-current-subtle',
        props.className,
      )}
    />
  );
};
