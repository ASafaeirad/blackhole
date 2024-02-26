import { Transition } from '@blackhole/design';
import { AnimatePresence } from 'framer-motion';

import type { Task } from '../data/Task';
import { Task as TaskComponent } from './Task';

interface Props {
  tasks: Task[];
  activeIndex: number;
  onSubmit: (task: Task) => void;
  editIndex: number;
}

export const TaskList = ({
  tasks,
  onSubmit,
  activeIndex,
  editIndex,
}: Props) => {
  return (
    <div className="fc gap-3">
      <AnimatePresence>
        {tasks.map((task, i) => (
          <Transition key={task.id}>
            <TaskComponent
              edit={i === editIndex}
              focus={i === activeIndex}
              task={task}
              onSubmit={name => onSubmit({ ...task, name })}
            />
          </Transition>
        ))}
      </AnimatePresence>
    </div>
  );
};
