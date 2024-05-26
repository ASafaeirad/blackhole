import type { ActionItem, ActionItemType } from '../models/ActionItem';
import type { ActionItemSDK } from './ActionItemSDK';
import { RoutineSDK } from './RoutineSDK';
import { TaskSDK } from './TaskSDK';

const actionItemMap: Record<ActionItemType, new () => ActionItemSDK> = {
  routine: RoutineSDK,
  task: TaskSDK,
};

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ActionItemFactory {
  static for(item: ActionItem) {
    const Ctor = actionItemMap[item.type];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!Ctor) throw Error('ActionItem type is not supported');
    return new Ctor();
  }
}
