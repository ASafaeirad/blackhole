/* eslint-disable react/no-array-index-key */
import { cn } from '@blackhole/cn';
import { isLastIndex } from '@fullstacksjs/toolbox';

interface Props {
  name: string;
  focus: boolean;
}

export const TaskName = ({ name, focus }: Props) => {
  const items = name.split('//').filter(Boolean);

  return (
    <div className="fr f1 flex-shrink-1 gap-3 items-start">
      {items.map((item, index) =>
        !isLastIndex(items, index) ? (
          <span
            className={cn('self-start fr gap-3 flex-shrink-0', {
              'op-70': !focus,
              'op-90': focus,
            })}
            key={index}
          >
            <span
              className={cn(
                'text-small mt-1 py-1 px-3 rounded bg-current-subtle',
              )}
            >
              {item}
            </span>
            <span>&gt;</span>
          </span>
        ) : (
          <span key={index}>{item}</span>
        ),
      )}
    </div>
  );
};
