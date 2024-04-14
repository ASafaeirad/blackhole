import { cn } from '@blackhole/cn';

export type LoadingProps = React.HTMLAttributes<HTMLDivElement>;

export const Loading = (props: LoadingProps) => {
  return (
    <div {...props} className={cn('color-muted', props.className)}>
      Loading...
    </div>
  );
};
