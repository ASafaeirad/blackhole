import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { Input } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNullOrEmptyString, not } from '@fullstacksjs/toolbox';
import { useEffect, useRef, useState } from 'react';

import type { Task as TaskType } from '../data/Task';
import { TaskCheck } from './TaskCheck';
import { TaskDate } from './TaskDate';
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
  const ref = useRef<HTMLInputElement>(null);
  const [insert, setInsert] = useState(false);

  useEffect(() => {
    if (isEdit) setName(task.name);
  }, [isEdit, task.name]);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.setSelectionRange(0, 0);
    }, 0);
  }, [insert]);

  useSubscribeAction(Actions.Insert, () => setInsert(not), []);

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
      className={cn('fr text-body gap-3 items-start', {
        'color-primary': task.status !== 'focus' && isFocused,
        'color-muted': task.status !== 'focus' && !isFocused,
        'color-cta': task.status === 'focus',
      })}
    >
      <TaskSign task={task} />
      <TaskCheck task={task} />
      {!isEdit ? (
        <>
          <TaskName name={task.name} focus={isFocused} />
          <TaskDate date={task.createdAt} />
        </>
      ) : (
        <Input
          ref={ref}
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
