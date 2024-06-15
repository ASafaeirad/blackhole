import type { Timestamp } from 'firebase/firestore';

export interface LogDto {
  id: string;
  routineId: string;
  date: Timestamp;
  streak: number;
  maxStreak: number;
}

export type CreateLogDto = Omit<LogDto, 'id'>;
