import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { Input } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNullOrEmptyString } from '@fullstacksjs/toolbox';
import { useState } from 'react';

export interface Task {
  id: string;
  name: string;
  status: 'done' | 'pending';
}

interface Props {
  focus: boolean;
  task: Task;
  edit: boolean;
  onCancel: VoidFunction;
  onSubmit: (name: string) => MaybePromise<void>;
  onToggle: (status: Task['status']) => void;
}

export const Task = ({
  focus,
  task,
  edit: isEdit,
  onSubmit,
  onCancel,
  onToggle,
}: Props) => {
  const [name, setName] = useState('');

  useSubscribeAction(
    Actions.SaveTask,
    async () => {
      if (isNullOrEmptyString(name)) return;
      await onSubmit(name);
    },
    [name],
  );

  useSubscribeAction(
    Actions.Toggle,
    () => {
      if (focus) onToggle(task.status === 'done' ? 'pending' : 'done');
    },
    [task.status, focus],
  );

  useSubscribeAction(Actions.CloseModal, () => {
    onCancel();
  });

  return (
    <div className="fr text-body gap-3 items-center">
      <div>{task.status === 'done' ? '[x]' : '[ ]'}</div>
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
