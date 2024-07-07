import { cn } from '@blackhole/cn';

export type ListProps = React.ComponentProps<'div'>;

export const List = (props: ListItemProps) => (
  <div
    {...props}
    role="listbox"
    className={cn('fc scrollbar flex-1 gap-6 overflow-x-auto', props.className)}
  />
);

export type ListItemProps = React.ComponentProps<'div'> & {
  selected?: boolean;
};

const ListItem = ({ className, selected, ...props }: ListItemProps) => (
  <div
    {...props}
    role="option"
    className={cn(
      'fr text-body gap-3 items-start',
      { 'color-primary': selected, 'color-muted': !selected },
      className,
    )}
    aria-selected={selected}
  />
);

List.Item = ListItem;
