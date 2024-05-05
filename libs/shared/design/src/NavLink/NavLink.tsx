import { cn } from '@blackhole/cn';
import type {
  LinkProps,
  RegisteredRouter,
  RoutePaths,
} from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { forwardRef } from 'react';

type WTFLinkProps = LinkProps<
  RegisteredRouter,
  RoutePaths<RegisteredRouter['routeTree']>,
  '',
  RoutePaths<RegisteredRouter['routeTree']>
>;

export interface NavLinkProps extends WTFLinkProps {
  className?: string;
}

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
