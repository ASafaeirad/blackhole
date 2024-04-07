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
  where,
} from 'firebase/firestore';

import { parseNodes } from './Node';
import type { Task, TaskRepeatType, TaskStatus } from './Task';

const collectionName = 'tasks';
const collection = getCollection(firestore, collectionName);

export interface TaskDto {
  repeat: TaskRepeatType;
  name: string;
  status: TaskStatus;
  createdAt: FieldValue;
  userId: string;
}

export type CreateTaskDto = Pick<TaskDto, 'name' | 'repeat' | 'status'>;

const toTaskDto = (task: CreateTaskDto): TaskDto => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  return {
    name: task.name,
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
      callback(tasks);
    });

    return unsubscribe;
  },
};
