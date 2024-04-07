import { isLastIndex } from '@fullstacksjs/toolbox';

import { separator } from './config';

export interface TextNode {
  type: 'text';
  label: string;
}

export interface GroupNode {
  type: 'group';
  label: string;
}

export interface LinkNode {
  type: 'link';
  label: string;
  href: string;
}

export type Node = GroupNode | LinkNode | TextNode;

const parseUrlsInText = (text: string): Node[] => {
  const regex = /(\[[^\]]+\]\([^)]+\))/g;
  if (!regex.test(text)) return [{ type: 'text', label: text }];
  const parts = text.split(regex).filter(part => part.trim() !== '');

  return parts.map<Node>(part => {
    const matches = /\[([^\]]+)\]\(([^)]+)\)/.exec(part);

    if (matches) return { type: 'link', label: matches[1]!, href: matches[2]! };
    else return { type: 'text', label: part };
  });
};

export const parseNodes = (text: string): Node[] => {
  const groups = text.split(separator).filter(Boolean);
  return groups.flatMap<Node>((group, index) => {
    const isTitle = isLastIndex(groups, index);

    if (isTitle) return parseUrlsInText(group);
    return { type: 'group', label: group.trim() };
  });
};
