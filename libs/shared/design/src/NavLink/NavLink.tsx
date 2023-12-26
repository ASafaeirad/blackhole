import { cn } from '@blackhole/cn';
import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { forwardRef } from 'react';

export interface NavLinkProps extends LinkProps {}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, ...props }, ref) => (
    <Link
      className={cn(
        'decoration-none color-muted [&.active]:color-primary',
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
);
