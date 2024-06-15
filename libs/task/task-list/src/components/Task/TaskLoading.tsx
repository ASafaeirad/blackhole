import { cn } from '@blackhole/cn';
import type { ActionItemType } from '@blackhole/task/data-layer';

import { TaskCheck } from './TaskCheck';
import { TaskDate } from './TaskDate';
import { TaskName } from './TaskName';
import { TaskSign } from './TaskSign';

interface Props {
  name: string;
  type: ActionItemType;
}

export const TaskLoading = ({ name, type }: Props) => {
  return (
    <div className={cn('fr text-body gap-3 items-start color-cta')}>
      <TaskSign type={type} />
      <TaskCheck status="pending" />
      <TaskName nodes={[{ type: 'text', label: name }]} />
      <TaskDate date={new Date()} />
    </div>
  );
};
