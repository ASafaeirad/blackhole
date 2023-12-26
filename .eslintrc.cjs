const { init } = require('@fullstacksjs/eslint-config/init');
const moduleBoundaries = require('./configs/eslint/module-boundaries.cjs');

module.exports = init({
  root: true,
  modules: {
    auto: false,
    prettier: true,
    test: true,
    storybook: true,
    import: true,
    typescript: {
      resolverProject: 'tsconfig.base.json',
      parserProject: ['tsconfig.base.json', './libs/**/tsconfig.*.json'],
    },
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
      },
    },
  ],
});
