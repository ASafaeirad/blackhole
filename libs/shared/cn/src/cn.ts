import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge<'color'>({
  extend: {
    theme: {
      spacing: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    classGroups: {
      color: [(part: string) => /color-.+/.test(part)],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
