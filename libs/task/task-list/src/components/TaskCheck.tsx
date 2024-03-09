import type { Task } from '../data/Task';

interface Props {
  task: Task;
}

export const TaskCheck = ({ task }: Props) => {
  return <div className="flex-shrink-0">{getCheck(task)}</div>;
};

function getCheck(task: Task) {
  if (task.status === 'done') return '[x]';
  if (task.status === 'focus') return '[-]';
  return '[ ]';
}
