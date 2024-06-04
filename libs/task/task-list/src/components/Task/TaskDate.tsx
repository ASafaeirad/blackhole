import { formatDate } from '@blackhole/date';

interface Props {
  date: number | undefined;
}

export const TaskDate = ({ date }: Props) => {
  const createAt = date ? new Date(date) : new Date();

  return (
    <span className="fr center mt-2 op-70 text-small">
      [{formatDate(createAt)}]
    </span>
  );
};
