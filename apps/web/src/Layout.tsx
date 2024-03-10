import { config } from '@blackhole/config';
import { HelpButton } from '@blackhole/shortcut/help';
import { Outlet } from '@tanstack/react-router';

export const Layout = () => (
  <div className="fc px-32 py-12 relative h-screen">
    <div className="f1">
      <Outlet />
    </div>
    <footer className="fr py-5 justify-between items-center">
      <div className="color-muted">v{config.get('version')}</div>
      <HelpButton />
    </footer>
  </div>
);
