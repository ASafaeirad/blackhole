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
    moveToFirst,
    moveToLast,
  } = useActionItemDispatch();
  const { focusNext, focusPrev, focusFirst, focusLast, activeId } =
    useActiveIndex();

  const activeItemDeps = [actionItems, activeId];
  const itemLengthDeps = [actionItems.length];

  useSubscribeAction(Actions.Open, openLinks, activeItemDeps);
  useSubscribeAction(Actions.CreateTask, initiateActionItem, activeItemDeps);
  useSubscribeAction(Actions.Insert, goToEditMode, activeItemDeps);
  useSubscribeAction(Actions.GoToEditMode, goToEditMode, activeItemDeps);
  useSubscribeAction(Actions.DeleteTask, deleteActionItem, activeItemDeps);
  useSubscribeAction(Actions.MoveDown, moveDown, activeItemDeps);
  useSubscribeAction(Actions.MoveUp, moveUp, activeItemDeps);
  useSubscribeAction(Actions.MoveToFirstBlock, moveToFirst, activeItemDeps);
  useSubscribeAction(Actions.MoveToLastBlock, moveToLast, activeItemDeps);
  useSubscribeAction(Actions.Toggle, toggle, activeItemDeps);
  useSubscribeAction(Actions.Focus, focus, activeItemDeps);
  useSubscribeAction(Actions.GoToNormalMode, revert, activeItemDeps);
  useSubscribeAction(Actions.ToggleDoneVisibility, toggleDoneVisibility, []);
  useSubscribeAction(Actions.Undo, undo);

  useSubscribeActionOnMode(
    Actions.FocusNextBlock,
    Mode.Normal,
    focusNext,
    itemLengthDeps,
  );
  useSubscribeActionOnMode(
    Actions.FocusPrevBlock,
    Mode.Normal,
    focusPrev,
    itemLengthDeps,
  );
  useSubscribeActionOnMode(
    Actions.FocusLastBlock,
    Mode.Normal,
    focusLast,
    itemLengthDeps,
  );
  useSubscribeActionOnMode(
    Actions.FocusFirstBlock,
    Mode.Normal,
    focusFirst,
    itemLengthDeps,
  );
}
