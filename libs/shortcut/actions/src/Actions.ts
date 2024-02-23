import { iMap, nMap } from '@blackhole/keybinding-manager';

export enum Actions {
  MoveNextBlock = 'MoveNextBlock',
  MovePrevBlock = 'MovePrevBlock',
  GoToEditMode = 'GoToEditMode',
  GoToNormalMode = 'GoToNormalMode',
  CreateTask = 'CreateTask',
  SaveTask = 'SaveTask',
  DeleteTask = 'DeleteTask',
  CloseModal = 'CloseModal',
  Toggle = 'Toggle',
  MoveDown = 'MoveDown',
  MoveUp = 'MoveUp',
  ShowHelp = 'ShowHelp',
}

export const keyMaps = {
  [Actions.MoveNextBlock]: nMap('j'),
  [Actions.MovePrevBlock]: nMap('k'),
  [Actions.GoToEditMode]: nMap('i'),
  [Actions.GoToNormalMode]: iMap('escape'),
  [Actions.CreateTask]: nMap('c'),
  [Actions.SaveTask]: iMap('enter'),
  [Actions.CloseModal]: nMap('escape'),
  [Actions.Toggle]: nMap(' '),
  [Actions.DeleteTask]: nMap('d'),
  [Actions.MoveUp]: nMap('alt+k'),
  [Actions.MoveDown]: nMap('alt+j'),
  [Actions.ShowHelp]: nMap('h'),
} as const;
