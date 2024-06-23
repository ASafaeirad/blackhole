import { Actions } from '@blackhole/actions';
import { Button, Dialog } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import {
  useActionItemDispatch,
  useActionItemListState,
} from '@blackhole/task/data-layer';

import { TaskName } from './Task/TaskName';

export const TaskDeleteConfirmDialog = () => {
  const { isDeleting, activeActionItem } = useActionItemListState();
  const { discardDeleting, deleteActionItem } = useActionItemDispatch();

  useSubscribeAction(Actions.CloseModal, () => {
    discardDeleting();
  });

  useSubscribeAction(Actions.ConfirmDelete, () => {
    void deleteActionItem();
  });

  if (!activeActionItem) return null;

  return (
    <Dialog open={isDeleting}>
      <Dialog.Content position="fixed" className="min-w-100">
        <Dialog.Title>Delete</Dialog.Title>
        <TaskName nodes={activeActionItem.nodes} />
        <div className="fr gap-4">
          <Button onPress={() => deleteActionItem()}>Confirm</Button>
          <Button onPress={() => discardDeleting()}>Close</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
