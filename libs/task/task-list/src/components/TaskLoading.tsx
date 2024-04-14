import { cn } from '@blackhole/cn';
import type { TaskRepeatType } from '@blackhole/task/data-layer';

import { TaskCheck } from './TaskCheck';
import { TaskDate } from './TaskDate';
import { TaskName } from './TaskName';
import { TaskSign } from './TaskSign';

interface Props {
  name: string;
  repeat: TaskRepeatType;
}

export const TaskLoading = ({ name, repeat }: Props) => {
  return (
    <div className={cn('fr text-body gap-3 items-start color-cta')}>
      <TaskSign repeat={repeat} />
      <TaskCheck status="pending" />
      <TaskName nodes={[{ type: 'text', label: name }]} />
      <TaskDate date={Date.now()} />
    </div>
  );
};
