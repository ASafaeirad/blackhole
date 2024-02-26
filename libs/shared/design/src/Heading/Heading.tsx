import { cn } from '@blackhole/cn';
import type { HeadingProps } from 'react-aria-components';
import { Heading as BaseHeading } from 'react-aria-components';

export const Heading = (props: HeadingProps) => {
  return (
    <BaseHeading {...props} className={cn('text-title', props.className)} />
  );
};

export type { HeadingProps };
