import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import solid from 'eslint-plugin-solid/dist/configs/typescript.js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsRules from './configs/eslint/typescript.js';

const ignores = [
  '**/node_modules/',
  '**/coverage/',
  '**/dist/',
  '**/storybook-static/',
  'pnpm-lock.yaml',
];

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  js.configs.recommended,
  {
    ignores,
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.node },
    },
    plugins: { prettier },
    rules: {
      ...prettier.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: { parser: tsParser },
    plugins: solid.plugins,
    rules: {
      ...tsRules,
      ...solid.rules,
    },
  },
];

export default config;
