import type { Task } from '../models/ActionItem';
import { ActionItemSDK } from './ActionItemSDK';

export class TaskSDK extends ActionItemSDK {
  public override toggle(item: Task) {
    return this.update(item.id, {
      status: item.status === 'done' ? 'pending' : 'done',
    });
  }
}
