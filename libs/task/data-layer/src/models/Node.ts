import { isLastIndex } from '@fullstacksjs/toolbox';
import type { Lexer, Rule } from 'moo';
import Moo from 'moo';

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

export interface TagNode {
  type: 'tag';
  label: string;
}

export type Node = GroupNode | LinkNode | RepeatNode | TagNode | TextNode;

const tokenFactory = {
  link: token => {
    const matches = /\[([^\]]+)\]\(([^)]+)\)/.exec(token.value);
    const label = matches?.[1];
    const href = matches?.[2];
    return { type: 'link', label: label!, href: href! } as LinkNode;
  },
  repeat: token => {
    return { type: 'repeat', label: token.value } as RepeatNode;
  },
  group: token => {
    return { type: 'group', label: token.value } as GroupNode;
  },
  tag: token => {
    return { type: 'tag', label: token.value } as TagNode;
  },
  text: token => {
    return { type: 'text', label: token.value.trim() } as TextNode;
  },
} satisfies Record<Node['type'], (token: Moo.Token) => Node>;

function parseTokens(lexer: Lexer, nodes: Node[] = []): Node[] {
  const token = lexer.next();

  const type = token?.type;
  if (!type) return nodes;

  if (type === 'WS') return parseTokens(lexer, nodes);
  // @ts-expect-error - it's a runtime check
  const factory = tokenFactory[type];
  if (!factory) throw new Error(`Token type "${type}" not supported`);

  return parseTokens(lexer, nodes.concat(factory(token)));
}

const lexer = Moo.compile({
  WS: /[ \t]+/,
  link: /\[[^\]]+\]\([^)]+\)/,
  repeat: /@\w+/,
  tag: /#\w+/,
  text: { match: /[^@[#\]+]+/, lineBreaks: true },
} satisfies Record<Exclude<Node['type'] | 'WS', 'group'>, RegExp | Rule>);

function parseGroup(input: string): Node[] {
  lexer.reset(input);

  try {
    return parseTokens(lexer);
  } catch (e) {
    return [{ type: 'text', label: input }];
  }
}

export const parseNodes = (text: string): Node[] => {
  const groups = text.split(separator).filter(Boolean);
  return groups.flatMap<Node>((group, index) => {
    const isTitle = isLastIndex(groups, index);

    if (!isTitle) return { type: 'group', label: group.trim() };

    return parseGroup(group);
  });
};
