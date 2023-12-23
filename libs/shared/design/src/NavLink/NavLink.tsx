import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { forwardRef } from 'react';

export interface NavLinkProps extends LinkProps {}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => (
    <Link
      className="[&.active]:color-primary color-muted"
      {...props}
      ref={ref}
    />
  ),
);
