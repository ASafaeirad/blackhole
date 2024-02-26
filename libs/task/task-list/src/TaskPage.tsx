import { Actions } from '@blackhole/actions';
import { Heading } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { callAll, isEmpty } from '@fullstacksjs/toolbox';
import { useAtom, useSetAtom } from 'jotai';

import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';
import { editIndexAtom, useActiveIndex, useTask } from './data/useTask';

const TaskGroups = ({ activeIndex }: { activeIndex: number }) => {
  const { tasks, editTask, close } = useTask();
  const [editIndex] = useAtom(editIndexAtom);

  return (
    <div className="flex-1">
      <TaskList
        onSubmit={callAll(editTask, close)}
        editIndex={editIndex}
        activeIndex={activeIndex}
        tasks={tasks}
      />
    </div>
  );
};

export const TaskPage = () => {
  const {
    tasks,
    createTask,
    deleteTask,
    revert,
    moveDown,
    moveUp,
    focus,
    toggle,
    edit,
  } = useTask();
  const { activeIndex, focusNext, focusPrev } = useActiveIndex();

  useSubscribeAction(Actions.CreateTask, createTask, [tasks]);
  useSubscribeAction(Actions.GoToEditMode, edit, [activeIndex, tasks]);
  useSubscribeAction(Actions.DeleteTask, deleteTask, [activeIndex, tasks]);
  useSubscribeAction(Actions.MoveNextBlock, focusNext, [tasks.length]);
  useSubscribeAction(Actions.MovePrevBlock, focusPrev, [tasks.length]);
  useSubscribeAction(Actions.MoveDown, moveDown, [tasks, activeIndex]);
  useSubscribeAction(Actions.MoveUp, moveUp, [tasks, activeIndex]);
  useSubscribeAction(Actions.Toggle, toggle, [tasks, activeIndex]);
  useSubscribeAction(Actions.Focus, focus, [tasks, activeIndex]);
  useSubscribeAction(Actions.GoToNormalMode, revert, [tasks, activeIndex]);

  return (
    <div className="fc gap-4 h-full">
      <Heading>Tasks</Heading>
      {isEmpty(tasks) ? (
        <TaskEmptyState />
      ) : (
        <TaskGroups activeIndex={activeIndex} />
      )}
    </div>
  );
};
