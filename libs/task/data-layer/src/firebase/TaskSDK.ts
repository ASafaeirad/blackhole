import type { Task } from '../models';
import { ActionItemSdk } from './ActionItemSdk';

export class TaskSdk extends ActionItemSdk {
  public override toggle(item: Task) {
    return this.update(item.id, {
      status: item.status === 'done' ? 'pending' : 'done',
    });
  }
}
