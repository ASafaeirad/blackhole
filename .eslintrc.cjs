const { init } = require('@fullstacksjs/eslint-config/init');
const moduleBoundaries = require('./configs/eslint/module-boundaries.cjs');

module.exports = init({
  root: true,
  modules: {
    auto: true,
    prettier: true,
    typescript: {
      resolverProject: 'tsconfig.base.json',
      parserProject: ['./libs/**/tsconfig.json', './tsconfig.base.json'],
    },
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['**/*'],
  plugins: ['@nx'],
  extends: ['plugin:unocss/recommended'],
  settings: {
    'import/internal-regex': '^@blackhole/',
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
        '@nx/enforce-module-boundaries': ['error', moduleBoundaries],
        '@typescript-eslint/no-misused-promises': 'off',
        'no-bitwise': 'off',
        'no-console': 'error',
      },
    },
  ],
});
