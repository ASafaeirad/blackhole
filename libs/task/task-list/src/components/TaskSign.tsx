import type { Task } from '../data/Task';

interface Props {
  task: Task;
}

function getSign(task: Task) {
  if (task.repeat === 'daily') return 'λ';
  return 'ƒ';
}

export const TaskSign = ({ task }: Props) => {
  return <span className="text-small">&lt;{getSign(task)}&gt;</span>;
};
