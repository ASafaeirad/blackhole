import { forwardRef } from 'react';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <button {...props} ref={ref}></button>
));
