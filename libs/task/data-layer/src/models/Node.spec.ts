import { describe, it } from 'vitest';

import type { Node } from './Node';
import { parseNodes } from './Node';

describe('parseNodes', () => {
  const cases = [
    {
      name: '',
      result: [],
    },
    {
      name: 'Hello, world!',
      result: [{ type: 'text', label: 'Hello, world!' }],
    },
    {
      name: '[Google](https://google.com)',
      result: [{ type: 'link', label: 'Google', href: 'https://google.com' }],
    },
    {
      name: 'Visit [Google](https://google.com), follow @google and check out #search!',
      result: [
        { type: 'text', label: 'Visit' },
        { type: 'link', label: 'Google', href: 'https://google.com' },
        { type: 'text', label: ', follow' },
        { type: 'repeat', label: '@google' },
        { type: 'text', label: 'and check out' },
        { type: 'tag', label: '#search' },
        { type: 'text', label: '!' },
      ],
    },
    {
      name: 'Amazing @product #launch #2024',
      result: [
        { type: 'text', label: 'Amazing' },
        { type: 'repeat', label: '@product' },
        { type: 'tag', label: '#launch' },
        { type: 'tag', label: '#2024' },
      ],
    },
    {
      name: 'Links: [Google](https://google.com) and [Bing](https://bing.com) #tag [Yahoo](https://yahoo.com)',
      result: [
        { type: 'text', label: 'Links:' },
        { type: 'link', label: 'Google', href: 'https://google.com' },
        { type: 'text', label: 'and' },
        { type: 'link', label: 'Bing', href: 'https://bing.com' },
        { type: 'tag', label: '#tag' },
        { type: 'link', label: 'Yahoo', href: 'https://yahoo.com' },
      ],
    },
  ] as { name: string; result: Node[] }[];

  it.each(cases)('should parse $name', ({ name, result }) => {
    expect(parseNodes(name)).toEqual(result);
  });
});
