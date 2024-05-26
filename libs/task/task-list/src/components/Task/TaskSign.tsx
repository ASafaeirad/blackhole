import type { ActionItemType } from '@blackhole/task/data-layer';

interface Props {
  type: ActionItemType;
}

const signMap = {
  task: 'ƒ',
  routine: 'λ',
};

export const TaskSign = ({ type }: Props) => {
  return <span className="mt-2 text-small">&lt;{signMap[type]}&gt;</span>;
};
