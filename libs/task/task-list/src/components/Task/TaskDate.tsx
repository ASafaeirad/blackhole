import { formatDate } from '@blackhole/date';

interface Props {
  date: Date;
}

export const TaskDate = ({ date }: Props) => {
  return (
    <span className="fr center mt-2 op-70 text-small">
      [{formatDate(date)}]
    </span>
  );
};
