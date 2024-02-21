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
}

export const keyMaps = {
  [Actions.MoveNextBlock]: nMap('j'),
  [Actions.MovePrevBlock]: nMap('k'),
  [Actions.GoToEditMode]: nMap('i'),
  [Actions.GoToNormalMode]: iMap('escape'),
  [Actions.CreateTask]: nMap('c'),
  [Actions.SaveTask]: iMap('enter'),
  [Actions.CloseModal]: iMap('escape'),
  [Actions.Toggle]: nMap(' '),
  [Actions.DeleteTask]: nMap('d'),
} as const;
