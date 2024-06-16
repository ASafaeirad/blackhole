import { cn } from '@blackhole/cn';
import { clamp, isEmpty } from '@fullstacksjs/toolbox';
import { useCallback, useEffect, useImperativeHandle, useState } from 'react';

import { Dialog } from '../Dialog';
import { Input } from '../Input';

export interface SelectRef {
  selectNext: () => void;
  selectPrev: () => void;
}

export interface SelectProps<T extends unknown[] | readonly unknown[]> {
  open?: boolean;
  items: T;
  onSelect?: (value: T[number]) => void;
  emptyState: React.ReactNode;
  title: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  getOptionLabel?: (option: T[number]) => string;
  getKey?: (option: T[number]) => string;
  forceMount?: true;
  ref: React.RefObject<SelectRef>;
}

export const Select = <T extends unknown[] | readonly unknown[]>({
  open,
  emptyState,
  items,
  onSelect,
  title,
  onKeyDown,
  forceMount,
  getOptionLabel = String,
  getKey = String,
  ref,
}: SelectProps<T>) => {
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(0);
  const filtered = items.filter(i =>
    getOptionLabel(i).toLowerCase().includes(filter.toLowerCase()),
  );

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    setSelected(clamp(selected, 0, filtered.length - 1));
  }, [filtered, selected]);

  useImperativeHandle(ref, () => ({
    selectNext: () => {
      if (selected === filtered.length - 1) return;
      setSelected(clamp(selected + 1, 0, filtered.length - 1));
    },
    selectPrev: () => {
      if (selected === 0) return;
      setSelected(clamp(selected - 1, 0, filtered.length - 1));
    },
  }));

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.key !== 'Enter') return;
      if (filtered.length === 0) onSelect?.(filter);
      else onSelect?.(filtered[selected]);
    },
    [filter, filtered, onKeyDown, onSelect, selected],
  );

  return (
    <Dialog open={open}>
      <Dialog.Content
        forceMount={forceMount}
        onKeyDown={handleKeyDown}
        position="fixed"
        className="w-sm"
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Input placeholder="Search..." autoFocus onChange={handleFilter} />
        {isEmpty(items) ? (
          <span className="color-muted">{emptyState}</span>
        ) : (
          filtered.map((project, i) => (
            <div
              role="option"
              aria-selected={selected === i}
              key={getKey(project)}
              className={cn({
                'color-primary': selected === i,
                'color-muted': selected !== i,
              })}
            >
              {getOptionLabel(project)}
            </div>
          ))
        )}
      </Dialog.Content>
    </Dialog>
  );
};
