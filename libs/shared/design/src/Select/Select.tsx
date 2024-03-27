import { cn } from '@blackhole/cn';
import { isEmpty } from '@fullstacksjs/toolbox';

import { Dialog } from '../Dialog';

export interface SelectProps {
  open?: boolean;
  items: string[];
  onSelect?: (value: string) => void;
  selected: number;
  emptyState: React.ReactNode;
  title: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  forceMount?: true;
}

export const Select = ({
  open,
  emptyState,
  items,
  onSelect,
  selected,
  title,
  onKeyDown,
  forceMount,
}: SelectProps) => {
  return (
    <Dialog open={open}>
      <Dialog.Content
        forceMount={forceMount}
        onKeyDown={onKeyDown}
        position="fixed"
        className="w-sm"
      >
        <Dialog.Title>{title}</Dialog.Title>
        {isEmpty(items) ? (
          <span className="color-muted">{emptyState}</span>
        ) : (
          items.map((project, i) => (
            <div
              onKeyDown={e => {
                if (e.key === 'Enter') onSelect?.(project);
              }}
              key={project}
              className={cn({
                'color-primary': selected === i,
                'color-muted': selected !== i,
              })}
            >
              {project}
            </div>
          ))
        )}
      </Dialog.Content>
    </Dialog>
  );
};
