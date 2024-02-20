import { Task } from './Task';

interface Props {
  tasks: Task[];
  activeIndex: number;
  onSubmit: (task: Task) => void;
  onCancel: VoidFunction;
  editIndex: number;
  onToggle: (index: number, status: Task['status']) => void;
}

export const TaskList = ({
  tasks,
  onSubmit,
  activeIndex,
  editIndex,
  onCancel,
  onToggle,
}: Props) => {
  return (
    <div className="fc gap-3">
      {tasks.map((task, i) => (
        <Task
          key={task.id}
          edit={i === editIndex}
          focus={i === activeIndex}
          onCancel={onCancel}
          task={task}
          onSubmit={name => onSubmit({ ...task, name })}
          onToggle={status => onToggle(i, status)}
        />
      ))}
    </div>
  );
};
