interface Props {
  streak: number;
}

export const TaskStreak = ({ streak }: Props) => {
  return (
    <span className="op-80 flex-shrink-0 gap-3">{'+'.repeat(streak)}</span>
  );
};
