import { cMap, iMap, map, Mode, nMap } from '@blackhole/keyflow';

export enum Actions {
  FocusNextBlock = 'FocusNextBlock',
  FocusPrevBlock = 'FocusPrevBlock',
  FocusNextBlockInsert = 'FocusNextBlockInsert',
  FocusPrevBlockInsert = 'FocusPrevBlockInsert',
  FocusLastBlock = 'FocusLastBlock',
  FocusFirstBlock = 'FocusFirstBlock',
  GoToEditMode = 'GoToEditMode',
  Insert = 'Insert',
  GoToNormalMode = 'GoToNormalMode',
  CreateTask = 'CreateTask',
  SaveTask = 'SaveTask',
  DeleteTask = 'DeleteTask',
  CloseModal = 'CloseModal',
  Toggle = 'Toggle',
  Focus = 'Focus',
  MoveDown = 'MoveDown',
  MoveUp = 'MoveUp',
  MoveToFirstBlock = 'MoveToFirstBlock',
  MoveToLastBlock = 'MoveToLastBlock',
  ShowHelp = 'ShowHelp',
  ShowSelectProject = 'ShowSelectProject',
  ToggleDoneVisibility = 'ToggleDoneVisibility',
  Undo = 'Undo',
  Confirm = 'Confirm',
  Open = 'Open',
  SignIn = 'SignIn',
  Search = 'Search',
  CancelSearch = 'CancelSearch',
  ClearSearch = 'ClearSearch',
  SortBy = 'SortBy',
}

export enum ActionGroup {
  Movement = 'Movement',
  Task = 'Task',
  Modal = 'Modal',
  Global = 'Global',
}

// cspell:disable
export const keyMaps = {
  [Actions.FocusNextBlock]: map({
    group: ActionGroup.Movement,
    key: ['j', 'arrowdown'],
    description: 'Go down',
    mode: Mode.Normal | Mode.Overlay,
  }),
  [Actions.FocusPrevBlock]: map({
    group: ActionGroup.Movement,
    key: ['k', 'arrowup'],
    description: 'Go up',
    mode: Mode.Normal | Mode.Overlay,
  }),
  [Actions.FocusNextBlockInsert]: iMap({
    group: ActionGroup.Movement,
    key: ['alt+j', 'arrowdown'],
    description: 'Go down',
  }),
  [Actions.FocusPrevBlockInsert]: iMap({
    group: ActionGroup.Movement,
    key: ['alt+k', 'arrowup'],
    description: 'Go up',
  }),
  [Actions.FocusLastBlock]: map({
    group: ActionGroup.Movement,
    key: ['shift+g'],
    description: 'Go to last item',
    mode: Mode.Normal | Mode.Overlay,
  }),
  [Actions.FocusFirstBlock]: map({
    group: ActionGroup.Movement,
    key: ['g,g'],
    description: 'Go to first item',
    mode: Mode.Normal | Mode.Overlay,
  }),
  [Actions.GoToEditMode]: nMap({
    group: ActionGroup.Movement,
    key: ['a', 'shift+a'],
    description: 'Edit task (caret end)',
  }),
  [Actions.GoToNormalMode]: iMap({
    group: ActionGroup.Movement,
    key: ['capslock', 'escape'],
    description: 'Edit task (caret start)',
  }),
  [Actions.MoveUp]: nMap({
    group: ActionGroup.Movement,
    key: ['alt+k'],
    description: 'Move item up',
  }),
  [Actions.MoveDown]: nMap({
    group: ActionGroup.Movement,
    key: ['alt+j'],
    description: 'Move item down',
  }),
  [Actions.MoveToFirstBlock]: nMap({
    group: ActionGroup.Movement,
    key: ['alt+g,alt+g'],
    description: 'Go to first item',
  }),
  [Actions.MoveToLastBlock]: nMap({
    group: ActionGroup.Movement,
    key: ['alt+shift+g'],
    description: 'Go to last item',
  }),
  [Actions.Insert]: nMap({
    group: ActionGroup.Movement,
    key: ['i'],
    description: 'Insert',
  }),

  [Actions.ShowHelp]: nMap({
    group: ActionGroup.Global,
    key: ['h'],
    description: 'Show help',
  }),
  [Actions.Undo]: nMap({
    group: ActionGroup.Global,
    key: ['u'],
    description: 'Undo',
  }),
  [Actions.SignIn]: nMap({
    group: ActionGroup.Global,
    key: ['ctrl+shift+l'],
    description: 'Sign in',
  }),

  [Actions.Focus]: nMap({
    group: ActionGroup.Task,
    key: ['f'],
    description: 'Toggle focus',
  }),
  [Actions.CreateTask]: nMap({
    group: ActionGroup.Task,
    key: ['c'],
    description: 'Create task',
  }),
  [Actions.SaveTask]: iMap({
    group: ActionGroup.Task,
    key: ['enter'],
    description: 'Save task',
  }),
  [Actions.Toggle]: nMap({
    group: ActionGroup.Task,
    key: [' '],
    description: 'Toggle done',
  }),
  [Actions.DeleteTask]: nMap({
    group: ActionGroup.Task,
    key: ['d'],
    description: 'Delete item',
  }),
  [Actions.ToggleDoneVisibility]: nMap({
    group: ActionGroup.Task,
    key: ['.'],
    description: 'Toggle done visibility',
  }),
  [Actions.Open]: nMap({
    group: ActionGroup.Task,
    key: ['o'],
    description: 'Open',
  }),
  [Actions.ShowSelectProject]: nMap({
    group: ActionGroup.Task,
    key: ['p'],
    description: 'Select Project',
  }),
  [Actions.SortBy]: nMap({
    group: ActionGroup.Task,
    key: ['s'],
    description: 'Sort Tasks',
  }),

  [Actions.CloseModal]: map({
    group: ActionGroup.Modal,
    key: ['capslock', 'escape'],
    description: 'Close modal',
  }),
  [Actions.Search]: nMap({
    group: ActionGroup.Global,
    description: 'Search',
    key: ['/'],
  }),
  [Actions.CancelSearch]: cMap({
    group: ActionGroup.Global,
    description: 'Cancel search',
    key: ['capslock', 'escape'],
  }),
  [Actions.Confirm]: map({
    group: ActionGroup.Global,
    key: ['enter'],
    description: 'Confirm',
  }),
  [Actions.ClearSearch]: nMap({
    group: ActionGroup.Global,
    description: 'Clear search',
    key: ['capslock', 'escape'],
  }),
} as const;
// cspell:enable
