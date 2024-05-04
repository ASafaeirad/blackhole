import { isLastIndex } from '@fullstacksjs/toolbox';

import { separator } from '../config/config';

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

export interface RepeatNode {
  type: 'repeat';
  label: string;
}

export type Node = GroupNode | LinkNode | RepeatNode | TextNode;

const parseUrlsInText = (text: string): Node[] => {
  const regex = /(\[[^\]]+\]\([^)]+\)|@everyday)/g;
  if (!regex.test(text)) return [{ type: 'text', label: text }];
  const parts = text.split(regex).filter(part => part.trim() !== '');

  return parts.map<Node>(part => {
    const matches = /(\[([^\]]+)\]\(([^)]+)\)|(@everyday))/g.exec(part);

    if (!matches) return { type: 'text', label: part };
    if (matches.find(m => m === '@everyday'))
      return { type: 'repeat', label: 'everyday' };
    return { type: 'link', label: matches[1]!, href: matches[2]! };
  });
};

export const parseNodes = (text: string): Node[] => {
  const groups = text.split(separator).filter(Boolean);
  return groups.flatMap<Node>((group, index) => {
    const isTitle = isLastIndex(groups, index);

    if (!isTitle) return { type: 'group', label: group.trim() };

    return parseUrlsInText(group);
  });
};
