declare module '@tanstack/react-router' {
  interface Register {
    router: typeof import('../apps/web/src/Routes').router;
  }
}

export {};