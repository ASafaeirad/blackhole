/* eslint-disable react/no-array-index-key */
import { cn } from '@blackhole/cn';
import type {
  GroupNode,
  LinkNode,
  Node,
  TextNode,
} from '@blackhole/task/data-layer';

interface Props {
  nodes: Node[];
}

const Group = ({ label }: GroupNode) => {
  return (
    <span className={cn('self-start fr gap-3 flex-shrink-0 op-80')}>
      <span
        className={cn('text-small mt-1 py-1 px-3 rounded bg-current-subtle')}
      >
        {label}
      </span>
      <span>&gt;</span>
    </span>
  );
};

const Text = ({ label }: TextNode) => {
  return <span>{label}</span>;
};

const Link = ({ label, href }: LinkNode) => {
  return <a href={href}>{label}</a>;
};

const nodeMap = {
  group: Group,
  text: Text,
  link: Link,
} as const;

export const TaskName = ({ nodes }: Props) => {
  return (
    <div className="fr f1 flex-shrink-1 gap-3 items-start">
      {nodes.map((node, index) => {
        const Component = nodeMap[node.type] as React.FC<Node>;
        return <Component key={index} {...node} />;
      })}
    </div>
  );
};
