import { Actions } from '@blackhole/actions';
import { debug } from '@blackhole/debug';
import { Select } from '@blackhole/design';
import type { SortBy } from '@blackhole/task/data-layer';
import { allSortBy, useSetSortBy } from '@blackhole/task/data-layer';
import { useCallback, useMemo } from 'react';

import type { ModalProps } from './useTaskModalState';

const sortByLabelMap: Record<SortBy, string> = {
  name: 'Name',
  status: 'Status',
  dueDate: 'Due Date',
  createdAt: 'Creation Date',
};

export const SortByModal = ({ onClose }: ModalProps) => {
  const setSortBy = useSetSortBy();
  const items = useMemo(() => ['None', ...allSortBy] as const, []);

  const onSelect = useCallback(
    (name: string): void => {
      const sortBy = allSortBy.includes(name) ? (name as SortBy) : null;

      setSortBy(sortBy)?.catch(debug.error);
    },
    [setSortBy],
  );

  return (
    <Select
      emptyState="No Field"
      items={items}
      action={Actions.SortBy}
      onSelect={onSelect}
      getOptionLabel={v => {
        // @ts-expect-error - map lookup can be undefined
        return sortByLabelMap[v] ?? v;
      }}
      title="Sort by"
    />
  );
};
