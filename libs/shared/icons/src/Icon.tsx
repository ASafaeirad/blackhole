import { cn } from '@blackhole/cn';

export type IconName = keyof typeof icons;
export type IconProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: IconName;
};

export const icons = {
  box: 'i-solar:box-bold-duotone',
  home: 'i-solar:home-angle-bold-duotone',
  user: 'i-solar:user-rounded-bold-duotone',
} as const;

export const Icon = (props: IconProps) => (
  <div {...props} className={cn(props.className, icons[props.icon])} />
);
