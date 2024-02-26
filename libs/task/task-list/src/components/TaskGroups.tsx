import { callAll, isEmpty } from '@fullstacksjs/toolbox';

import type { Task } from '../data/Task';
import { useTask } from '../data/useTask';
import { TaskList } from './TaskList';

interface Props {
  tasks: Task[];
}

export const TaskGroups = ({ tasks }: Props) => {
  const { editTask, close } = useTask();
  if (isEmpty(tasks)) return null;

  return <TaskList onSubmit={callAll(editTask, close)} tasks={tasks} />;
};
