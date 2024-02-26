import { Transition } from '@blackhole/design';
import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';

import type { Task } from '../data/Task';
import { activeTaskAtom, editTaskAtom } from '../data/useTask';
import { Task as TaskComponent } from './Task';

interface Props {
  tasks: Task[];
  onSubmit: (task: Task) => void;
}

export const TaskList = ({ tasks, onSubmit }: Props) => {
  const [activeTask] = useAtom(activeTaskAtom);
  const [editedTask] = useAtom(editTaskAtom);

  return tasks.map(task => (
    <Transition key={task.id}>
      <TaskComponent
        edit={task.id === editedTask?.id}
        focus={task.id === activeTask?.id}
        task={task}
        onSubmit={name => onSubmit({ ...task, name })}
      />
    </Transition>
  ));
};
