import { isEmpty } from '@fullstacksjs/toolbox';

export const Key = ({ children }: React.PropsWithChildren) => {
  return <kbd className="p-2 bg-elevated rounded color-muted">{children}</kbd>;
};

export const Command = ({
  children,
  keybinding,
}: React.PropsWithChildren<{ keybinding: string }>) => {
  return (
    <code className="color-muted inline-flex gap-2 items-center">
      {children}
      <Key>{keybinding}</Key>
    </code>
  );
};

export const ProjectEmptyState = () => {
  return (
    <div className="fc center gap-4 h-screen">
      <Command keybinding="c">Create Project</Command>
    </div>
  );
};

export const useProjects = () => {
  return [];
};

export interface Project {
  id: string;
  name: string;
}

export const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="fc gap-2">
      {projects.map(project => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
};

export const ProjectsPage = () => {
  const projects = useProjects();

  return isEmpty(projects) ? (
    <ProjectEmptyState />
  ) : (
    <ProjectList projects={projects} />
  );
};
