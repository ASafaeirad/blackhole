import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { useKeyFlowContext } from '@blackhole/keybinding-manager';
import { clamp, isEmpty } from '@fullstacksjs/toolbox';
import { useEffect, useState } from 'react';

import { Input } from '../Input';
import { Modal } from '../Modal';

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
  onClose?: () => void;
  getOptionLabel?: (option: T[number]) => string;
  getKey?: (option: T[number]) => string;
}

export const Select = <T extends unknown[] | readonly unknown[]>({
  open,
  emptyState,
  items,
  onSelect,
  title,
  onKeyDown,
  onClose,
  getOptionLabel = String,
  getKey = String,
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

  const submit = () => {
    onSelect?.(filtered[selected]);
    setFilter('');
  };

  const close = () => {
    onClose?.();
    setFilter('');
  };

  const { keyHandler } = useKeyFlowContext({
    [Actions.Confirm]: submit,
    [Actions.FocusNextBlockInsert]: () =>
      setSelected(clamp(selected + 1, 0, filtered.length - 1)),
    [Actions.FocusPrevBlockInsert]: () =>
      setSelected(clamp(selected - 1, 0, filtered.length - 1)),
    [Actions.CloseModal]: close,
  });

  return (
    <Modal open={open}>
      <Modal.Content
        position="fixed"
        className="w-sm"
        onKeyDown={e => {
          keyHandler(e);
          onKeyDown?.(e);
        }}
      >
        <Modal.Title>{title}</Modal.Title>
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
      </Modal.Content>
    </Modal>
  );
};
