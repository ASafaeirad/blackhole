import { Transition } from '@blackhole/design';
import { AnimatePresence } from 'framer-motion';

import type { Task, TaskStatus } from '../Task';
import { Task as TaskComponent } from './Task';

interface Props {
  tasks: Task[];
  activeIndex: number;
  onSubmit: (task: Task) => void;
  onCancel: (task: Task) => void;
  editIndex: number;
  onToggle: (index: number, status: TaskStatus) => void;
}

export const TaskList = ({
  tasks,
  onSubmit,
  activeIndex,
  editIndex,
  onCancel,
  onToggle,
}: Props) => {
  return (
    <div className="fc gap-3">
      <AnimatePresence>
        {tasks.map((task, i) => (
          <Transition key={task.id}>
            <TaskComponent
              edit={i === editIndex}
              focus={i === activeIndex}
              onCancel={() => onCancel(task)}
              task={task}
              onSubmit={name => onSubmit({ ...task, name })}
              onToggle={status => onToggle(i, status)}
            />
          </Transition>
        ))}
      </AnimatePresence>
    </div>
  );
};
