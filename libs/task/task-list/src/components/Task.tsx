import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { Input } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNullOrEmptyString } from '@fullstacksjs/toolbox';
import { useEffect, useState } from 'react';

import type { Task as TaskType } from '../data/Task';

interface Props {
  focus: boolean;
  task: TaskType;
  edit: boolean;
  onSubmit: (name: string) => MaybePromise<void>;
}

export const Task = ({ focus, task, edit: isEdit, onSubmit }: Props) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isEdit) setName(task.name);
  }, [isEdit, task.name]);

  useSubscribeAction(
    Actions.SaveTask,
    async () => {
      if (isNullOrEmptyString(name.trim())) return;
      await onSubmit(name);
    },
    [name],
  );

  return (
    <div
      className={cn('fr text-body gap-3 items-center', {
        'color-primary': task.status !== 'focus' && focus,
        'color-muted': task.status !== 'focus' && !focus,
        'color-cta': task.status === 'focus',
      })}
    >
      <div className="flex-shrink-0">{getCheck(task)}</div>
      {!isEdit ? (
        <div key={task.id}>{task.name}</div>
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

function getCheck(task: TaskType) {
  if (task.status === 'done') return '[x]';
  if (task.status === 'focus') return '[-]';
  return '[ ]';
}
