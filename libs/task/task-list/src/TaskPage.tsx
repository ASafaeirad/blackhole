import { Actions } from '@blackhole/actions';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import {
  useActionItemDispatch,
  useActionItemListState,
  useActionItems,
  useHasHiddenItems,
  useSubscribeActionItems,
  useSubscribeView,
} from '@blackhole/task/data-layer';
import { isEmpty } from '@fullstacksjs/toolbox';
import { FocusScope } from 'react-aria';

import { FilterInput } from './components/FilterInput';
import { HiddenTaskMessage } from './components/HiddenTaskMessage';
import { DueDateModal } from './components/Modals/DueDateModal';
import { SelectProjectModal } from './components/Modals/SelectProjectModal';
import { SortByModal } from './components/Modals/SortByModal';
import {
  TaskModalState,
  useTaskModalState,
} from './components/Modals/useTaskModalState';
import { TaskDeleteConfirmDialog } from './components/TaskDeleteConfirmDialog';
import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';

export const TaskPage = () => {
  const actionItems = useActionItems();
  const { newActionItemState } = useActionItemListState();
  const { close, modalState } = useTaskModalState();
  const { toggleDoneVisibility, undo, initiateActionItem } =
    useActionItemDispatch();
  const hasHiddenItems = useHasHiddenItems();

  useSubscribeView();
  useSubscribeActionItems();

  useSubscribeAction(Actions.CreateTask, initiateActionItem, [actionItems]);
  useSubscribeAction(Actions.ToggleDoneVisibility, toggleDoneVisibility, []);
  useSubscribeAction(Actions.Undo, undo);

  const shouldRenderEmptyState = isEmpty(actionItems) && !newActionItemState;

  return (
    <div className="layout fc scrollbar gap-4 h-full">
      <FocusScope restoreFocus>
        {shouldRenderEmptyState ? <TaskEmptyState /> : <TaskList />}
        <div className="f1">
          <FilterInput className="align-end" />
        </div>
        <TaskDeleteConfirmDialog />
        <SelectProjectModal
          open={modalState === TaskModalState.SelectProject}
          onClose={close}
        />
        <SortByModal
          open={modalState === TaskModalState.SortBy}
          onClose={close}
        />
        <DueDateModal
          open={modalState === TaskModalState.DueDate}
          onClose={close}
        />
        {hasHiddenItems ? <HiddenTaskMessage /> : null}
      </FocusScope>
    </div>
  );
};
