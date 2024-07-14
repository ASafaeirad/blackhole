import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { Input } from '@blackhole/design';
import { useKeyFlowContext } from '@blackhole/keybinding-manager';
import {
  useActionItemDispatch,
  useActionItemListState,
} from '@blackhole/task/data-layer';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { isNull, isNullOrEmptyString } from '@fullstacksjs/toolbox';
import { useState } from 'react';
import { useFocusManager } from 'react-aria';

import { TaskCheck } from './TaskCheck';
import { TaskLoading } from './TaskLoading';
import { TaskSign } from './TaskSign';

interface Props {
  onSubmit: (name: string) => MaybePromise<void>;
}

export const NewTask = ({ onSubmit }: Props) => {
  const [name, setName] = useState('');
  const { revert } = useActionItemDispatch();
  const focusManager = useFocusManager();
  const { newActionItemState } = useActionItemListState();

  const { keyHandler } = useKeyFlowContext({
    [Actions.SaveTask]: () => {
      if (isNullOrEmptyString(name.trim())) return;
      return onSubmit(name);
    },
    [Actions.GoToNormalMode]: () => {
      revert();
      focusManager?.focusPrevious();
    },
  });

  if (isNull(newActionItemState)) return null;

  if (newActionItemState.mode === 'creating')
    return (
      <TaskLoading
        name={newActionItemState.actionItem.name}
        type={newActionItemState.actionItem.type}
      />
    );

  return (
    <div className={cn('fr text-body gap-3 items-start color-primary')}>
      <TaskSign type="task" />
      <TaskCheck status="pending" />
      <Input
        onKeyDown={keyHandler}
        onChange={e => setName(e.target.value)}
        autoFocus
        autoComplete="off"
        name="name"
        value={name}
      />
    </div>
  );
};
