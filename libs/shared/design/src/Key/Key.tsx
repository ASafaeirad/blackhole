export interface KeyProps {
  children: React.ReactNode;
}

export const Key = ({ children }: KeyProps) => {
  return (
    <kbd className="p-2 bg-elevated rounded case-lower color-muted">
      {children}
    </kbd>
  );
};
