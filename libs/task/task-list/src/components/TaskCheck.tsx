import type { TaskStatus } from '@blackhole/task/data-layer';

interface Props {
  status: TaskStatus;
}

export const TaskCheck = ({ status }: Props) => {
  return <div className="flex-shrink-0">{getCheck(status)}</div>;
};

function getCheck(status: TaskStatus) {
  if (status === 'done') return '[x]';
  if (status === 'focus') return '[-]';
  return '[ ]';
}
