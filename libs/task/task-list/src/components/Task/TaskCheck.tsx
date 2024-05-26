import type { ActionItemStatus } from '@blackhole/task/data-layer';

interface Props {
  status: ActionItemStatus;
}

const statusMap = {
  done: '[x]',
  focus: '[-]',
  pending: '[ ]',
};

export const TaskCheck = ({ status }: Props) => {
  return <div className="flex-shrink-0">{statusMap[status]}</div>;
};
