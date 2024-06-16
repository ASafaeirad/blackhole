import { Actions } from '@blackhole/actions';
import type { SelectRef } from '@blackhole/design';
import { Select } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import type { SortBy } from '@blackhole/task/data-layer';
import { allSortBy, useSetSortBy } from '@blackhole/task/data-layer';
import { useCallback, useMemo, useRef } from 'react';

interface Props {
  onClose?: () => void;
}

const sortByLabelMap: Record<SortBy, string> = {
  name: 'Name',
  status: 'Status',
};

export const SortByDialog = ({ onClose }: Props) => {
  const selectRef = useRef<SelectRef>(null);
  const setMode = useSetMode();
  const setSortBy = useSetSortBy();
  const items = useMemo(() => ['None', ...allSortBy] as const, []);

  useSubscribeAction(Actions.CloseModal, () => {
    onClose?.();
    setMode(Mode.Normal);
  });

  useSubscribeActionOnMode(Actions.FocusNextBlockInsert, Mode.Insert, () => {
    selectRef.current?.selectNext();
  });

  useSubscribeActionOnMode(Actions.FocusPrevBlockInsert, Mode.Insert, () => {
    selectRef.current?.selectPrev();
  });

  const onSelect = useCallback(
    (name: string): void => {
      const sortBy = allSortBy.includes(name) ? (name as SortBy) : null;

      setSortBy(sortBy);
      setMode(Mode.Normal);
      onClose?.();
    },
    [onClose, setMode, setSortBy],
  );

  return (
    <Select
      forceMount
      emptyState="No Field"
      items={items}
      ref={selectRef}
      onSelect={onSelect}
      getOptionLabel={v => {
        // @ts-expect-error - map lookup can be undefined
        return sortByLabelMap[v] ?? v;
      }}
      title="Sort by"
    />
  );
};
