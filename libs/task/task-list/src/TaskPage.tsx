import { Heading } from '@blackhole/design';
import {
  useActionItemListState,
  useActionItems,
  useSubscribeActionItems,
} from '@blackhole/task/data-layer';
import { isEmpty } from '@fullstacksjs/toolbox';

import { FilterInput } from './components/FilterInput';
import { SelectProjectDialog } from './components/SelectProjectDialog';
import { SortByDialog } from './components/SortByDialog';
import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';
import { DateModal } from './DateModal';
import { useDateModal } from './useDateModal';
import { useSelectProjectModal } from './useSelectProjectModal';
import { useSortByModal } from './useSortByModal';
import { useSubscribeTaskActions } from './useSubscribeTaskActions';

export const TaskPage = () => {
  const actionItems = useActionItems();
  const { newActionItemState } = useActionItemListState();
  const { close: closeProject, isOpen: isProjectModalOpen } =
    useSelectProjectModal();
  const { close: closeSortBy, isOpen: isSortByModalOpen } = useSortByModal();
  const { close: closeDueDate, isOpen: isDueDateOpen } = useDateModal();

  useSubscribeTaskActions();
  useSubscribeActionItems();

  return (
    <div className="fc gap-8 h-full overflow-auto">
      <Heading className="layout text-large">Tasks</Heading>
      {isEmpty(actionItems) && !newActionItemState ? (
        <TaskEmptyState />
      ) : (
        <TaskList />
      )}
      {isProjectModalOpen ? (
        <SelectProjectDialog onClose={closeProject} />
      ) : null}
      {isSortByModalOpen ? <SortByDialog onClose={closeSortBy} /> : null}
      {isDueDateOpen ? (
        <DateModal open={isDueDateOpen} onClose={closeDueDate} />
      ) : null}
      <FilterInput />
    </div>
  );
};
