import { cn } from '@blackhole/cn';
import type {
  LinkProps as BasLinkProps,
  RegisteredRouter,
  RoutePaths,
} from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export type LinkProps = BasLinkProps<
  RegisteredRouter,
  RoutePaths<RegisteredRouter['routeTree']>,
  '',
  RoutePaths<RegisteredRouter['routeTree']>
>;

export interface NavLinkProps extends LinkProps {
  className?: string;
}

export const NavLink = ({ className, ...props }: NavLinkProps) => (
  <Link
    className={cn(
      'decoration-none color-muted [&.active]:color-primary',
      className,
    )}
    {...props}
  />
);
