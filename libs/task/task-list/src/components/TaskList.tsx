import { Transition } from '@blackhole/design';
import type { Task } from '@blackhole/task/data-layer';
import {
  useAllTasks,
  useTaskDispatch,
  useTaskListState,
  useTasks,
} from '@blackhole/task/data-layer';
import { AnimatePresence } from 'framer-motion';

import { HiddenTaskMessage } from './HiddenTaskMessage';
import { Task as TaskComponent } from './Task';
import { TaskLoading } from './Task/TaskLoading';

const newTask: Task = {
  id: 'new',
  name: '',
  status: 'pending',
  repeat: 'once',
  createdAt: Date.now(),
  order: 0,
  nodes: [],
  streak: 0,
};

export const TaskList = () => {
  const { createTask, editTask } = useTaskDispatch();
  const { activeTask, editedTask, newTaskState } = useTaskListState();
  const tasks = useTasks();
  const allTasks = useAllTasks();
  const hasHiddenTask = allTasks.length !== tasks.length;

  return (
    <div className="layout fc scrollbar flex-1 gap-6 overflow-x-auto">
      <AnimatePresence>
        {tasks.map(task => (
          <Transition key={task.id}>
            <TaskComponent
              edit={task.id === editedTask?.id}
              focus={task.id === activeTask?.id}
              task={task}
              onSubmit={name => editTask({ ...task, name })}
            />
          </Transition>
        ))}
      </AnimatePresence>
      {newTaskState?.mode === 'draft' ? (
        <TaskComponent edit focus task={newTask} onSubmit={createTask} />
      ) : newTaskState?.mode === 'creating' ? (
        <TaskLoading
          name={newTaskState.task.name}
          repeat={newTaskState.task.repeat}
        />
      ) : null}
      {hasHiddenTask ? <HiddenTaskMessage /> : null}
    </div>
  );
};
