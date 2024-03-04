import { Actions } from '@blackhole/actions';
import { Heading } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { isEmpty } from '@fullstacksjs/toolbox';
import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';

import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskGroups } from './components/TaskGroups';
import {
  doneTasksAtom,
  focusTasksAtom,
  pendingTasksAtom,
  useActiveIndex,
  useTask,
} from './data/useTask';

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
  const { activeIndex, focusNext, focusPrev, focusFirst, focusLast } =
    useActiveIndex();
  const [doneTasks] = useAtom(doneTasksAtom);
  const [pendingTaskAtom] = useAtom(pendingTasksAtom);
  const [focusTasks] = useAtom(focusTasksAtom);

  useSubscribeAction(Actions.CreateTask, createTask, [tasks]);
  useSubscribeAction(Actions.GoToEditMode, edit, [activeIndex, tasks]);
  useSubscribeAction(Actions.DeleteTask, deleteTask, [activeIndex, tasks]);
  useSubscribeAction(Actions.MoveNextBlock, focusNext, [tasks.length]);
  useSubscribeAction(Actions.MovePrevBlock, focusPrev, [tasks.length]);
  useSubscribeAction(Actions.MoveToLastBlock, focusLast, [tasks.length]);
  useSubscribeAction(Actions.MoveToFirstBlock, focusFirst, [tasks.length]);
  useSubscribeAction(Actions.MoveDown, moveDown, [tasks, activeIndex]);
  useSubscribeAction(Actions.MoveUp, moveUp, [tasks, activeIndex]);
  useSubscribeAction(Actions.Toggle, toggle, [tasks, activeIndex]);
  useSubscribeAction(Actions.Focus, focus, [tasks, activeIndex]);
  useSubscribeAction(Actions.GoToNormalMode, revert, [tasks, activeIndex]);

  return (
    <div className="fc gap-8 h-full">
      <Heading className="text-large">Tasks</Heading>
      {isEmpty(tasks) ? (
        <TaskEmptyState />
      ) : (
        <div className="fc gap-6">
          <AnimatePresence>
            <TaskGroups key={1} tasks={focusTasks} />
            <TaskGroups key={2} tasks={pendingTaskAtom} />
            <TaskGroups key={3} tasks={doneTasks} />
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
