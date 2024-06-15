import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { Input } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import type { ActionItem } from '@blackhole/task/data-layer';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNullOrEmptyString, not } from '@fullstacksjs/toolbox';
import { useEffect, useRef, useState } from 'react';

import { TaskCheck } from './TaskCheck';
import { TaskDate } from './TaskDate';
import { TaskName } from './TaskName';
import { TaskSign } from './TaskSign';
import { TaskStreak } from './TaskStreak';

interface Props {
  focus: boolean;
  actionItem: ActionItem;
  edit?: boolean;
  onSubmit: (name: string) => MaybePromise<void>;
}

export const Task = ({
  focus: isFocused,
  actionItem,
  edit: isEdit,
  onSubmit,
}: Props) => {
  const [name, setName] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [insert, setInsert] = useState(false);

  useEffect(() => {
    if (isEdit) setName(actionItem.name);
  }, [isEdit, actionItem.name]);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.setSelectionRange(0, 0);
    }, 0);
  }, [insert]);

  useEffect(() => {
    if (!isFocused) return;
    containerRef.current?.scrollIntoView({ block: 'nearest' });
  }, [isFocused]);

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
      ref={containerRef}
      className={cn('fr text-body gap-3 items-start', {
        'color-primary': actionItem.status !== 'focus' && isFocused,
        'color-muted': actionItem.status !== 'focus' && !isFocused,
        'color-cta': actionItem.status === 'focus',
      })}
    >
      <TaskSign type={actionItem.type} />
      <TaskCheck status={actionItem.status} />
      {!isEdit ? (
        <>
          <TaskName nodes={actionItem.nodes} />
          {actionItem.type === 'routine' ? (
            <TaskStreak streak={actionItem.streak} />
          ) : null}
          <TaskDate date={actionItem.createdAt} />
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
