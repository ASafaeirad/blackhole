/* eslint-disable react/no-array-index-key */
import { cn } from '@blackhole/cn';
import { isLastIndex } from '@fullstacksjs/toolbox';
import { Fragment } from 'react';

interface Props {
  name: string;
  focus: boolean;
}

export const TaskName = ({ name, focus }: Props) => {
  const items = name.split('//').filter(Boolean);

  return (
    <div className="fr f1 flex-shrink-1 gap-3 items-center">
      {items.map((item, index) =>
        !isLastIndex(items, index) ? (
          <Fragment key={index}>
            <span
              className={cn('text-small py-1 px-3 rounded bg-current-subtle', {
                'op-70': !focus,
                'op-90': focus,
              })}
            >
              {item}
            </span>
            <span className={cn({ 'op-70': !focus, 'op-90': focus })}>
              &gt;
            </span>
          </Fragment>
        ) : (
          <span key={index}>{item}</span>
        ),
      )}
    </div>
  );
};
