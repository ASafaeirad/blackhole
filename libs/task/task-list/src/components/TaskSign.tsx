import type { TaskRepeatType } from '@blackhole/task/data-layer';

interface Props {
  repeat: TaskRepeatType;
}

function getSign(repeat: TaskRepeatType) {
  if (repeat === 'daily') return 'λ';
  return 'ƒ';
}

export const TaskSign = ({ repeat }: Props) => {
  return <span className="mt-2 text-small">&lt;{getSign(repeat)}&gt;</span>;
};
