import { iMap, map, nMap } from '@blackhole/keybinding-manager';

export enum Actions {
  MoveNextBlock = 'MoveNextBlock',
  MovePrevBlock = 'MovePrevBlock',
  MoveToLastBlock = 'MoveToLastBlock',
  MoveToFirstBlock = 'MoveToFirstBlock',
  GoToEditMode = 'GoToEditMode',
  GoToNormalMode = 'GoToNormalMode',
  CreateTask = 'CreateTask',
  SaveTask = 'SaveTask',
  DeleteTask = 'DeleteTask',
  CloseModal = 'CloseModal',
  Toggle = 'Toggle',
  Focus = 'Focus',
  MoveDown = 'MoveDown',
  MoveUp = 'MoveUp',
  ShowHelp = 'ShowHelp',
  ToggleDoneVisibility = 'ToggleDoneVisibility',
  Undo = 'Undo',
}

// cspell:disable
export const keyMaps = {
  [Actions.MoveNextBlock]: nMap('j', 'arrowdown'),
  [Actions.MovePrevBlock]: nMap('k', 'arrowup'),
  [Actions.MoveToLastBlock]: nMap('shift+g'),
  [Actions.MoveToFirstBlock]: nMap('g,g'),
  [Actions.GoToEditMode]: nMap('i'),
  [Actions.GoToNormalMode]: iMap('capslock', 'escape'),
  [Actions.CreateTask]: nMap('c'),
  [Actions.SaveTask]: iMap('enter'),
  [Actions.CloseModal]: map('capslock', 'escape'),
  [Actions.Toggle]: nMap(' '),
  [Actions.DeleteTask]: nMap('d'),
  [Actions.MoveUp]: nMap('alt+k'),
  [Actions.MoveDown]: nMap('alt+j'),
  [Actions.ShowHelp]: nMap('h'),
  [Actions.Focus]: nMap('f'),
  [Actions.ToggleDoneVisibility]: nMap('.'),
  [Actions.Undo]: nMap('u'),
} as const;
// cspell:enable
