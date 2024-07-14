import { cn } from '@blackhole/cn';
import { List } from '@blackhole/design';
import {
  useActionItemDispatch,
  useActionItems,
} from '@blackhole/task/data-layer';

import { Task } from './Task';
import { NewTask } from './Task/NewTask';

export const TaskList = () => {
  const { createActionItem } = useActionItemDispatch();
  const actionItems = useActionItems();
  const { moveUp, moveToFirst, moveToLast, moveDown, selectedActionItem } =
    useActionItemDispatch();

  return (
    <List
      autoFocus
      items={actionItems}
      getKey={item => item.id}
      renderItem={({ item, ref }) => <Task itemRef={ref} actionItem={item} />}
      onMoveUp={moveUp}
      onMoveDown={moveDown}
      onMoveToFirst={moveToFirst}
      onMoveToLast={moveToLast}
      onFocus={(_, item) => selectedActionItem(item.id)}
      itemClassName={item => {
        return cn({ 'color-cta': item.status === 'focus' });
      }}
    >
      <NewTask onSubmit={createActionItem} />
    </List>
  );
};
