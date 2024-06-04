import { Heading } from '@blackhole/design';
import {
  useActionItemListState,
  useActionItems,
  useSubscribeActionItems,
} from '@blackhole/task/data-layer';
import { isEmpty } from '@fullstacksjs/toolbox';

import { FilterInput } from './components/FilterInput';
import { SelectProjectDialog } from './components/SelectProjectDialog';
import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';
import { useSelectProjectModal } from './useSelectProjectModal';
import { useSubscribeTaskActions } from './useSubscribeTaskActions';

export const TaskPage = () => {
  const actionItems = useActionItems();
  const { newActionItemState } = useActionItemListState();
  const { close, isOpen } = useSelectProjectModal();

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
      {isOpen ? <SelectProjectDialog onClose={close} /> : null}
      <FilterInput />
    </div>
  );
};
