import { Actions } from '@blackhole/actions';
import { Input } from '@blackhole/design';
import { useKeyFlowContext } from '@blackhole/keybinding-manager';
import type { ActionItem } from '@blackhole/task/data-layer';
import {
  useActionItemDispatch,
  useActionItemListState,
} from '@blackhole/task/data-layer';
import { not } from '@fullstacksjs/toolbox';
import { useEffect, useRef, useState } from 'react';
import { useFocusManager } from 'react-aria';

import { TaskCheck } from './TaskCheck';
import { TaskDate } from './TaskDate';
import { TaskName } from './TaskName';
import { TaskSign } from './TaskSign';
import { TaskStreak } from './TaskStreak';

interface Props {
  actionItem: ActionItem;
  itemRef: HTMLElement | undefined;
}

export const Task = ({ actionItem, itemRef }: Props) => {
  const [name, setName] = useState('');
  const [insert, setInsert] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { editedActionItem } = useActionItemListState();

  const isEdit = actionItem.id === editedActionItem?.id;

  useEffect(() => {
    if (isEdit) {
      setName(actionItem.name);
    } else {
      itemRef?.focus();
    }
  }, [isEdit, actionItem.name, itemRef]);

  useEffect(() => {
    setTimeout(() => ref.current?.setSelectionRange(0, 0), 0);
  }, [insert]);

  const focusManager = useFocusManager();

  const {
    revert,
    goToEditMode,
    openLinks,
    showDeleteActionItemDialog,
    toggle,
    focus,
    editActionItem,
  } = useActionItemDispatch();

  const getToInsertMode = () => {
    goToEditMode(actionItem.id);
    setInsert(not);
  };

  const { register } = useKeyFlowContext({
    [Actions.SaveTask]: () => editActionItem({ ...actionItem, name }),
    [Actions.DeleteTask]: () => showDeleteActionItemDialog(actionItem.id),
    [Actions.GoToEditMode]: () => goToEditMode(actionItem.id),
    [Actions.Open]: () => openLinks(actionItem),
    [Actions.GoToNormalMode]: () => revert(),
    [Actions.Insert]: () => getToInsertMode(),
    [Actions.Toggle]: async () => {
      await toggle(actionItem);
      focusManager?.focusNext({ wrap: true });
    },
    [Actions.Focus]: () => focus(actionItem),
  });

  useEffect(() => {
    if (!itemRef) return;
    return register(itemRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemRef]);

  return (
    <>
      <TaskSign type={actionItem.type} />
      <TaskCheck status={actionItem.status} />
      {!isEdit ? (
        <>
          <TaskName nodes={actionItem.nodes} />
          {actionItem.type === 'routine' ? (
            <TaskStreak streak={actionItem.streak} />
          ) : null}
          {actionItem.dueDate ? <TaskDate date={actionItem.dueDate} /> : null}
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
    </>
  );
};
