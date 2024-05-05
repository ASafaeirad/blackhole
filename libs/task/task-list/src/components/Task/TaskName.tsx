/* eslint-disable react/no-array-index-key */
import { cn } from '@blackhole/cn';
import { Tag } from '@blackhole/design';
import type {
  GroupNode,
  LinkNode,
  Node,
  RepeatNode,
  TagNode as TagNodeType,
  TextNode,
} from '@blackhole/task/data-layer';
import { Fragment } from 'react';

interface Props {
  nodes: Node[];
}

const Group = ({ label }: GroupNode) => {
  return (
    <span className={cn('self-start inline-flex gap-3 flex-shrink-0 op-80')}>
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
  return <Tag className="color-cta inline-flex">{label}</Tag>;
};

const TagNode = ({ label }: TagNodeType) => {
  return <Tag className="inline-flex">{label}</Tag>;
};

const nodeMap = {
  group: Group,
  text: Text,
  link: Link,
  repeat: Repeat,
  tag: TagNode,
} satisfies Record<Node['type'], React.FC<any>>;

export const TaskName = ({ nodes }: Props) => {
  return (
    <div className="f1 flex-shrink-1">
      {nodes.map((node, index) => {
        const Component = nodeMap[node.type] as React.FC<Node>;
        return (
          <Fragment key={index}>
            <Component key={index} {...node} />{' '}
          </Fragment>
        );
      })}
    </div>
  );
};
