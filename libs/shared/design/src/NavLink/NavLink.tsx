import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { forwardRef } from 'react';

export interface NavLinkProps extends LinkProps {}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => (
    <Link
      className="decoration-none color-muted [&.active]:color-primary"
      {...props}
      ref={ref}
    />
  ),
);
