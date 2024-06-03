import { getCurrentUser } from '@blackhole/auth/data-layer';
import { firestore } from '@blackhole/firebase';
import { isToday } from 'date-fns';
import type { CollectionReference, FieldValue } from 'firebase/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import type {
  ActionItem,
  ActionItemStatus,
  RepeatType,
  Routine,
  Task,
} from '../models/ActionItem';
import { parseNodes } from '../models/Node';

const statusWeight: Record<ActionItemStatus, number> = {
  focus: -10,
  pending: 10,
  done: 10000,
};

export interface TaskDto {
  type: 'task';
  repeat: RepeatType;
  order: number;
  name: string;
  status: ActionItemStatus;
  createdAt: number;
  lastCompletedDate?: FieldValue;
  userId: string;
}

export interface RoutineDto {
  type: 'routine';
  repeat: RepeatType;
  order: number;
  name: string;
  status: ActionItemStatus;
  createdAt: number;
  userId: string;
  streak?: number;
  lastCompletedDate?: FieldValue;
  maxStreak?: number;
}

export type ActionItemDto = RoutineDto | TaskDto;

export type CreateActionItemDto = Pick<
  ActionItemDto,
  'name' | 'order' | 'repeat' | 'status' | 'type'
>;

const toRoutineDto = (
  routine: CreateActionItemDto,
  userId: string,
): RoutineDto => {
  return {
    ...routine,
    type: 'routine',
    userId,
    createdAt: Number(serverTimestamp()) * 1000,
    streak: 0,
    maxStreak: 0,
  };
};

const toTaskDto = (task: CreateActionItemDto, userId: string): TaskDto => {
  return {
    ...task,
    type: 'task',
    userId,
    createdAt: Number(serverTimestamp()) * 1000,
  };
};

const toActionItemDto = (actionItem: CreateActionItemDto): ActionItemDto => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  return actionItem.type === 'task'
    ? toTaskDto(actionItem, user.id)
    : toRoutineDto(actionItem, user.id);
};

export class ActionItemSDK {
  private _collection: CollectionReference<ActionItemDto>;

  constructor() {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    this._collection = collection(
      firestore,
      'users',
      user.id,
      'tasks',
    ) as CollectionReference<ActionItemDto>;
  }

  get collection() {
    return this._collection;
  }

  changeOrder(item: ActionItem, order: number) {
    const itemRef = this.doc(item.id);
    return updateDoc(itemRef, { order });
  }

  swap(a: ActionItem, b: ActionItem, onConflict: (aId: number) => number) {
    const aDoc = this.doc(a.id);
    const bDoc = this.doc(b.id);

    const nextAOrder = a.order === b.order ? onConflict(a.order) : b.order;
    const nextBOrder = a.order;

    return Promise.all([
      updateDoc(aDoc, { order: nextAOrder }),
      updateDoc(bDoc, { order: nextBOrder }),
    ]);
  }

  add(item: CreateActionItemDto) {
    return addDoc(this.collection, toActionItemDto(item));
  }

  doc(id: string) {
    return doc(this.collection, id);
  }

  async get(id: string) {
    const item = await getDoc(this.doc(id));
    return item.data();
  }

  toggle(_item: ActionItem): Promise<void> {
    throw Error('Not Implemented');
  }

  delete(id: string) {
    return deleteDoc(this.doc(id));
  }

  update(id: string, item: Partial<ActionItem>) {
    return updateDoc(this.doc(id), item);
  }

  subscribe(callback: (item: ActionItem[]) => void) {
    const collectionRef = this.collection;
    return onSnapshot(collectionRef, snapshot => {
      const items: ActionItem[] = [];
      snapshot.forEach(item => {
        const data = item.data();
        items.push(toActionItem(item.id, data));
      });

      items.sort(
        (a, b) =>
          a.order * statusWeight[a.status] - b.order * statusWeight[b.status],
      );

      callback(items);
    });
  }
}

function toActionItem(id: string, data: ActionItemDto) {
  if (data.type === 'routine') return toRoutine(id, data);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (data.type === 'task') return toTask(id, data);
  throw new Error('Invalid type');
}

function toTask(id: string, data: TaskDto): Task {
  const lastCompletedDate = Number(data.lastCompletedDate);
  const createdAt = Number(data.createdAt);

  return {
    type: 'task',
    id,
    name: data.name,
    order: data.order,
    repeat: data.repeat,
    status: data.status,
    lastCompletedDate,
    createdAt,
    nodes: parseNodes(data.name),
  };
}

function toRoutine(id: string, data: RoutineDto): Routine {
  const lastCompletedDate = Number(data.lastCompletedDate);
  const createdAt = Number(data.createdAt);

  return {
    type: 'routine',
    id,
    name: data.name,
    order: data.order,
    repeat: data.repeat,
    status: isToday(lastCompletedDate) ? 'done' : 'pending',
    lastCompletedDate,
    createdAt,
    maxStreak: data.maxStreak ?? 0,
    streak: data.streak ?? 0,
    nodes: parseNodes(data.name),
  };
}
