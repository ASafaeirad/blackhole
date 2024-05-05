import { TaskPage } from '@blackhole/task/task-list';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: TaskPage,
});
