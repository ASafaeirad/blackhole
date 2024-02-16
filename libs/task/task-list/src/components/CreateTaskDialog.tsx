import { Actions } from '@blackhole/actions';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNullOrEmptyString, randomInt } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import type { Task } from './TaskList';

interface CreateTaskDialogProps {
  open: boolean;
  onCancel: VoidFunction;
  onSubmit: (task: Task) => MaybePromise<void>;
}

export const CreateTaskDialog = ({
  onCancel,
  onSubmit,
}: CreateTaskDialogProps) => {
  const [name, setName] = useState('');

  useSubscribeAction(
    Actions.SaveTask,
    async () => {
      if (isNullOrEmptyString(name)) return;
      const id = randomInt().toString();

      await onSubmit({ id, name });
    },
    [name],
  );

  useSubscribeAction(Actions.CloseModal, () => {
    onCancel();
  });

  return (
    <input
      name="name"
      autoFocus
      onChange={e => setName(e.target.value)}
      value={name}
    />
  );
};
