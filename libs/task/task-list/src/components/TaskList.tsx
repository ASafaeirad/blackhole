import { cn } from '@blackhole/cn';

export interface Task {
  id: string;
  name: string;
}

interface TaskListProps {
  tasks: Task[];
  activeIndex: number;
}

export const TaskList = ({ tasks, activeIndex }: TaskListProps) => {
  return (
    <div className={'fc gap-2'}>
      {tasks.map((task, i) => (
        <div
          className={cn({
            'border-solid border-green border': i === activeIndex,
          })}
          key={task.id}
        >
          {task.name}
        </div>
      ))}
    </div>
  );
};
