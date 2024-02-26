import { Actions } from '@blackhole/actions';
import { Heading } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { callAll, isEmpty } from '@fullstacksjs/toolbox';
import { useAtom } from 'jotai';

import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';
import { editIndexAtom, useActiveIndex, useTask } from './data/useTask';

export const TaskPage = () => {
  const {
    tasks,
    createTask,
    editTask,
    deleteTask,
    revert,
    moveDown,
    moveUp,
    focus,
    toggle,
  } = useTask();
  const { activeIndex, focusNext, focusPrev } = useActiveIndex();
  const [editIndex, setEditIndex] = useAtom(editIndexAtom);
  const setMode = useSetMode();
  const activeTask = tasks[activeIndex];

  const close = () => {
    setEditIndex(-1);
    setMode(Mode.Normal);
  };

  useSubscribeAction(
    Actions.CreateTask,
    () => {
      createTask();
      setMode(Mode.Insert);
    },
    [tasks],
  );
  useSubscribeAction(Actions.DeleteTask, deleteTask, [activeIndex, tasks]);
  useSubscribeAction(Actions.MoveNextBlock, focusNext, [tasks.length]);
  useSubscribeAction(Actions.MovePrevBlock, focusPrev, [tasks.length]);
  useSubscribeAction(Actions.MoveDown, moveDown, [tasks, activeIndex]);
  useSubscribeAction(Actions.MoveUp, moveUp, [tasks, activeIndex]);
  useSubscribeAction(Actions.Toggle, toggle, [activeTask?.id]);
  useSubscribeAction(Actions.Focus, focus, [activeTask?.id]);
  useSubscribeAction(
    Actions.GoToNormalMode,
    () => {
      revert();
      close();
    },
    [activeTask?.id],
  );

  return (
    <div className="fc gap-4 h-full">
      <Heading is="h1" className="text-title">
        Tasks
      </Heading>
      {isEmpty(tasks) ? (
        <TaskEmptyState />
      ) : (
        <TaskList
          onSubmit={callAll(editTask, close)}
          editIndex={editIndex}
          activeIndex={activeIndex}
          tasks={tasks}
        />
      )}
    </div>
  );
};
