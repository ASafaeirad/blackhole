import { Actions } from '@blackhole/actions';
import {
  Mode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import {
  useActionItemDispatch,
  useActionItems,
  useActiveIndex,
} from '@blackhole/task/data-layer';

export function useSubscribeTaskActions() {
  const actionItems = useActionItems();
  const {
    deleteActionItem,
    revert,
    moveDown,
    moveUp,
    focus,
    toggle,
    goToEditMode,
    toggleDoneVisibility,
    undo,
    initiateActionItem,
    openLinks,
  } = useActionItemDispatch();
  const { focusNext, focusPrev, focusFirst, focusLast, activeId } =
    useActiveIndex();

  useSubscribeAction(Actions.Open, openLinks, [actionItems, activeId]);
  useSubscribeAction(Actions.CreateTask, initiateActionItem, [actionItems]);
  useSubscribeAction(Actions.Insert, goToEditMode, [actionItems, activeId]);
  useSubscribeAction(Actions.GoToEditMode, goToEditMode, [
    activeId,
    actionItems,
  ]);
  useSubscribeAction(Actions.DeleteTask, deleteActionItem, [
    activeId,
    actionItems,
  ]);
  useSubscribeAction(Actions.MoveDown, moveDown, [actionItems, activeId]);
  useSubscribeAction(Actions.MoveUp, moveUp, [actionItems, activeId]);
  useSubscribeAction(Actions.Toggle, toggle, [actionItems, activeId]);
  useSubscribeAction(Actions.Focus, focus, [actionItems, activeId]);
  useSubscribeAction(Actions.GoToNormalMode, revert, [actionItems, activeId]);
  useSubscribeAction(Actions.ToggleDoneVisibility, toggleDoneVisibility, []);
  useSubscribeAction(Actions.Undo, undo, []);

  useSubscribeActionOnMode(Actions.MoveNextBlock, Mode.Normal, focusNext, [
    actionItems.length,
  ]);
  useSubscribeActionOnMode(Actions.MovePrevBlock, Mode.Normal, focusPrev, [
    actionItems.length,
  ]);
  useSubscribeActionOnMode(Actions.MoveToLastBlock, Mode.Normal, focusLast, [
    actionItems.length,
  ]);
  useSubscribeActionOnMode(Actions.MoveToFirstBlock, Mode.Normal, focusFirst, [
    actionItems.length,
  ]);
}