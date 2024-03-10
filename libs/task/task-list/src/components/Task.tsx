import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { Input } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNullOrEmptyString } from '@fullstacksjs/toolbox';
import { useEffect, useState } from 'react';

import type { Task as TaskType } from '../data/Task';
import { TaskCheck } from './TaskCheck';
import { TaskName } from './TaskName';
import { TaskSign } from './TaskSign';

interface Props {
  focus: boolean;
  task: TaskType;
  edit: boolean;
  onSubmit: (name: string) => MaybePromise<void>;
}

export const Task = ({
  focus: isFocused,
  task,
  edit: isEdit,
  onSubmit,
}: Props) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isEdit) setName(task.name);
  }, [isEdit, task.name]);

  useSubscribeAction(
    Actions.SaveTask,
    async () => {
      if (!isEdit) return;
      if (isNullOrEmptyString(name.trim())) return;
      await onSubmit(name);
    },
    [name, isEdit, onSubmit],
  );

  return (
    <div
      className={cn('fr text-body gap-3 items-center', {
        'color-primary': task.status !== 'focus' && isFocused,
        'color-muted': task.status !== 'focus' && !isFocused,
        'color-cta': task.status === 'focus',
      })}
    >
      <TaskSign task={task} />
      <TaskCheck task={task} />
      {!isEdit ? (
        <TaskName name={task.name} focus={isFocused} />
      ) : (
        <Input
          onChange={e => setName(e.target.value)}
          autoFocus
          autoComplete="off"
          name="name"
          value={name}
        />
      )}
    </div>
  );
};
