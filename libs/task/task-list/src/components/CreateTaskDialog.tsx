import { Actions } from '@blackhole/actions';
import { Input } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNullOrEmptyString, randomInt } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import type { Task } from '../Task';

interface Props {
  onCancel: VoidFunction;
  onSubmit: (task: Task) => MaybePromise<void>;
}

export const CreateTaskDialog = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState('');

  useSubscribeAction(
    Actions.SaveTask,
    async () => {
      if (isNullOrEmptyString(name)) return;
      const id = randomInt().toString();

      await onSubmit({ id, name, status: 'pending' });
    },
    [name],
  );

  useSubscribeAction(Actions.CloseModal, () => {
    onCancel();
  });

  return (
    <Input
      onChange={e => setName(e.target.value)}
      autoFocus
      autoComplete="off"
      name="name"
      value={name}
    />
  );
};
