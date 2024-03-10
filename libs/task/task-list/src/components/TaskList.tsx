import { Transition } from '@blackhole/design';
import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';

import type { Task } from '../data/Task';
import {
  editedTaskAtom,
  focusedTaskAtom,
  isCreatingAtom,
} from '../data/taskAtom';
import { useAllTasks, useTaskDispatch, useTasks } from '../data/useTask';
import { HiddenTaskMessage } from './HiddenTaskMessage';
import { Task as TaskComponent } from './Task';

const newTask: Task = {
  id: 'new',
  name: '',
  status: 'pending',
  repeat: 'once',
};

export const TaskList = () => {
  const { createTask, editTask } = useTaskDispatch();
  const tasks = useTasks();
  const allTasks = useAllTasks();
  const [activeTask] = useAtom(focusedTaskAtom);
  const [editedTask] = useAtom(editedTaskAtom);
  const [isCreating] = useAtom(isCreatingAtom);
  const hasHiddenTask = allTasks.length !== tasks.length;

  return (
    <div className="fc scrollbar flex-1 gap-6 overflow-x-auto">
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
      {isCreating ? (
        <TaskComponent edit focus task={newTask} onSubmit={createTask} />
      ) : null}
      {hasHiddenTask ? <HiddenTaskMessage /> : null}
    </div>
  );
};
