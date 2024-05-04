/* eslint-disable react/no-array-index-key */
import { cn } from '@blackhole/cn';
import { Tag } from '@blackhole/design';
import type {
  GroupNode,
  LinkNode,
  Node,
  RepeatNode,
  TextNode,
} from '@blackhole/task/data-layer';

interface Props {
  nodes: Node[];
}

const Group = ({ label }: GroupNode) => {
  return (
    <span className={cn('self-start fr gap-3 flex-shrink-0 op-80')}>
      <Tag>{label}</Tag>
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

const Repeat = ({ label }: RepeatNode) => {
  return <Tag className="color-cta">{label}</Tag>;
};

const nodeMap = {
  group: Group,
  text: Text,
  link: Link,
  repeat: Repeat,
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
