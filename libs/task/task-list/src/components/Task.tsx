import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { Input } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNullOrEmptyString } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import type { Task as TaskType } from '../Task';

interface Props {
  focus: boolean;
  task: TaskType;
  edit: boolean;
  onSubmit: (name: string) => MaybePromise<void>;
}

export const Task = ({ focus, task, edit: isEdit, onSubmit }: Props) => {
  const [name, setName] = useState('');

  useSubscribeAction(
    Actions.SaveTask,
    async () => {
      if (isNullOrEmptyString(name.trim())) return;
      await onSubmit(name);
    },
    [name],
  );

  return (
    <div className="fr text-body gap-3 items-center">
      <div className="flex-shrink-0">
        {task.status === 'done' ? '[x]' : '[ ]'}
      </div>
      {!isEdit ? (
        <div
          className={cn({
            'color-primary': focus,
            'color-muted': !focus,
          })}
          key={task.id}
        >
          {task.name}
        </div>
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
