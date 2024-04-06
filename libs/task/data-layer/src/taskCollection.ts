import { firestore } from '@blackhole/firebase';
import type { FieldValue } from 'firebase/firestore';
import {
  addDoc,
  collection as getCollection,
  serverTimestamp,
} from 'firebase/firestore';

import type { Task, TaskRepeatType, TaskStatus } from './Task';

const collection = getCollection(firestore, 'tasks');

interface TaskDto {
  id: string;
  repeat: TaskRepeatType;
  name: string;
  status: TaskStatus;
  createdAt: FieldValue;
}

const toTaskDto = (task: Task): TaskDto => ({
  name: task.name,
  id: task.id,
  repeat: task.repeat,
  status: task.status,
  createdAt: serverTimestamp(),
});

export const taskCollection = {
  addTask: (task: Task) => {
    return addDoc(collection, toTaskDto(task));
  },
};
