import { getCurrentUser } from '@blackhole/auth';
import { firestore } from '@blackhole/firebase';
import type { FieldValue } from 'firebase/firestore';
import {
  addDoc,
  collection as getCollection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import { parseNodes } from '../models/Node';
import type { Task, TaskRepeatType, TaskStatus } from '../models/Task';

const collectionName = 'tasks';
const collection = getCollection(firestore, collectionName);

const statusWeight: Record<TaskStatus, number> = {
  focus: -10,
  pending: 10,
  done: 10000,
};

export interface TaskDto {
  repeat: TaskRepeatType;
  order: number;
  name: string;
  status: TaskStatus;
  createdAt: FieldValue;
  userId: string;
}

export type CreateTaskDto = Pick<
  TaskDto,
  'name' | 'order' | 'repeat' | 'status'
>;

const toTaskDto = (task: CreateTaskDto): TaskDto => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  return {
    name: task.name,
    order: task.order,
    repeat: task.repeat,
    status: task.status,
    userId: user.id,
    createdAt: serverTimestamp(),
  };
};

export const taskCollection = {
  add: (task: CreateTaskDto) => {
    return addDoc(collection, toTaskDto(task));
  },

  get: (id: string) => {
    return doc(collection, id);
  },

  delete: (id: string) => {
    return deleteDoc(taskCollection.get(id));
  },

  swap: (a: Task, b: Task) => {
    const aDoc = taskCollection.get(a.id);
    const bDoc = taskCollection.get(b.id);

    return Promise.all([
      updateDoc(aDoc, { order: b.order }),
      updateDoc(bDoc, { order: a.order }),
    ]);
  },

  subscribe: (callback: (task: Task[]) => void) => {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const taskQuery = query<TaskDto, TaskDto>(
      collection as any,
      where('userId', '==', user.id),
    );

    const unsubscribe = onSnapshot(taskQuery, snapshot => {
      const tasks: Task[] = [];
      snapshot.forEach(item => {
        const data = item.data();
        tasks.push({
          ...data,
          id: item.id,
          createdAt: Number(data.createdAt),
          nodes: parseNodes(data.name),
        });
      });

      tasks.sort((a, b) => {
        return (
          a.order * statusWeight[a.status] - b.order * statusWeight[b.status]
        );
      });

      callback(tasks);
    });

    return unsubscribe;
  },

  update(id: string, task: Partial<Task>) {
    return updateDoc(taskCollection.get(id), task);
  },
};
