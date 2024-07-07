import { List, Transition } from '@blackhole/design';
import {
  useActionItemDispatch,
  useActionItemListState,
  useActionItems,
  useHasHiddenItems,
} from '@blackhole/task/data-layer';
import { AnimatePresence } from 'framer-motion';

import { HiddenTaskMessage } from './HiddenTaskMessage';
import { Task as TaskComponent } from './Task';
import { NewTask } from './Task/NewTask';
import { TaskLoading } from './Task/TaskLoading';
import { TaskDeleteConfirmDialog } from './TaskDeleteConfirmDialog';

export const TaskList = () => {
  const { createActionItem, editActionItem } = useActionItemDispatch();
  const { activeActionItem, editedActionItem, newActionItemState, isDeleting } =
    useActionItemListState();
  const actionItems = useActionItems();
  const hasHiddenItems = useHasHiddenItems();

  return (
    <List className="layout">
      <AnimatePresence>
        {actionItems.map(item => (
          <Transition key={item.id}>
            <TaskComponent
              edit={item.id === editedActionItem?.id}
              focused={item.id === activeActionItem?.id}
              actionItem={item}
              onSubmit={name => editActionItem({ ...item, name })}
            />
          </Transition>
        ))}
      </AnimatePresence>
      {newActionItemState?.mode === 'draft' ? (
        <NewTask onSubmit={createActionItem} />
      ) : newActionItemState?.mode === 'creating' ? (
        <TaskLoading
          name={newActionItemState.actionItem.name}
          type={newActionItemState.actionItem.type}
        />
      ) : null}
      {isDeleting ? <TaskDeleteConfirmDialog /> : null}
      {hasHiddenItems ? <HiddenTaskMessage /> : null}
    </List>
  );
};
