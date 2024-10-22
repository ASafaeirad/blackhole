import { cn } from '@blackhole/cn';
import type { SeparatorProps as BaseSeparatorProps } from '@radix-ui/react-separator';
import { Root } from '@radix-ui/react-separator';

export interface SeparatorProps extends BaseSeparatorProps {}

export const Separator = ({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) => (
  <Root
    className={cn(className, 'bg-cta flex-basis-full', {
      'h-[1px] min-h-[1px] w-full': orientation === 'horizontal',
      'w-[1px] max-w-[1px] h-full': orientation === 'vertical',
    })}
    orientation={orientation}
    {...props}
  />
);
