import { Transition } from '@blackhole/design';
import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';

import type { Task } from '../data/Task';
import {
  editedTaskAtom,
  focusedTaskAtom,
  isCreatingAtom,
} from '../data/taskAtom';
import { useTaskDispatch, useTasks } from '../data/useTask';
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
  const [activeTask] = useAtom(focusedTaskAtom);
  const [editedTask] = useAtom(editedTaskAtom);
  const [isCreating] = useAtom(isCreatingAtom);

  return (
    <div className="fc gap-6">
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
        {isCreating ? (
          <TaskComponent edit focus task={newTask} onSubmit={createTask} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};
