import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { Input } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNullOrEmptyString } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import { TaskCheck } from './TaskCheck';
import { TaskSign } from './TaskSign';

interface Props {
  onSubmit: (name: string) => MaybePromise<void>;
}

export const NewTask = ({ onSubmit }: Props) => {
  const [name, setName] = useState('');

  useSubscribeAction(
    Actions.SaveTask,
    async () => {
      if (isNullOrEmptyString(name.trim())) return;
      await onSubmit(name);
    },
    [name, onSubmit],
  );

  return (
    <div className={cn('fr text-body gap-3 items-start color-primary')}>
      <TaskSign type="task" />
      <TaskCheck status="pending" />
      <Input
        onChange={e => setName(e.target.value)}
        autoFocus
        autoComplete="off"
        name="name"
        value={name}
      />
    </div>
  );
};
