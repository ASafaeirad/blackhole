export interface LogDto {
  id: string;
  routineId: string;
  date: number;
  streak: number;
  maxStreak: number;
}

export type CreateLogDto = Omit<LogDto, 'id'>;
