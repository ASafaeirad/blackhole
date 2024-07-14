import { Actions } from '@blackhole/actions';
import { Button, Modal } from '@blackhole/design';
import { useKeyFlowContext } from '@blackhole/keybinding-manager';
import {
  useActionItemDispatch,
  useActionItemListState,
} from '@blackhole/task/data-layer';
import { useFocusManager } from 'react-aria';

import { TaskName } from './Task/TaskName';

export const TaskDeleteConfirmDialog = () => {
  const { isDeleting, activeActionItem } = useActionItemListState();
  const { discardDeleting, deleteActionItem } = useActionItemDispatch();
  const focusManager = useFocusManager();

  const confirm = async () => {
    await deleteActionItem();
    focusManager?.focusPrevious();
  };

  const discard = () => discardDeleting();

  const { keyHandler } = useKeyFlowContext({
    [Actions.CloseModal]: discard,
  });

  if (!activeActionItem) return null;

  return (
    <Modal open={isDeleting}>
      <Modal.Content
        onKeyDown={keyHandler}
        position="fixed"
        className="min-w-100"
      >
        <Modal.Title>Delete</Modal.Title>
        <TaskName nodes={activeActionItem.nodes} />
        <div className="fr gap-4">
          <Button onPress={confirm}>Confirm</Button>
          <Button onPress={discard}>Close</Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
