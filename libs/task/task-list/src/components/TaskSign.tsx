import type { Task } from '@blackhole/task/data-layer';

interface Props {
  task: Task;
}

function getSign(task: Task) {
  if (task.repeat === 'daily') return 'λ';
  return 'ƒ';
}

export const TaskSign = ({ task }: Props) => {
  return <span className="mt-2 text-small">&lt;{getSign(task)}&gt;</span>;
};
