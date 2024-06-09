import type { ActionItem, ActionItemType } from '../models/ActionItem';
import type { ActionItemSdk } from './ActionItemSdk';
import { RoutineSdk } from './RoutineSdk';
import { TaskSdk } from './TaskSDK';

const actionItemMap: Record<ActionItemType, new () => ActionItemSdk> = {
  routine: RoutineSdk,
  task: TaskSdk,
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
