import { getCurrentUser } from '@blackhole/auth/data-layer';

import type { RoutineDto } from './RoutineDto';
import { toRoutine, toRoutineDto } from './RoutineDto';
import type { TaskDto } from './TaskDto';
import { toTask, toTaskDto } from './TaskDto';

export const toActionItemDto = (
  actionItem: CreateActionItemDto,
): ActionItemDto => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  return actionItem.type === 'task'
    ? toTaskDto(actionItem, user.id)
    : toRoutineDto(actionItem, user.id);
};

export type ActionItemDto = RoutineDto | TaskDto;

export type CreateActionItemDto = Pick<
  ActionItemDto,
  'name' | 'order' | 'repeat' | 'status' | 'type'
>;

export function toActionItem(id: string, data: ActionItemDto) {
  if (data.type === 'routine') return toRoutine(id, data);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (data.type === 'task') return toTask(id, data);
  throw new Error('Invalid type');
}
