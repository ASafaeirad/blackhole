const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    auto: false,
    test: true,
    typescript: true,
    cspell: true,
    storybook: true,
    import: true,
  },
  ignorePatterns: ['**/*'],
  plugins: ['@nx', 'solid'],
  settings: {
    'import/internal-regex': '^@blackhole/',
  },
  extends: ['plugin:solid/typescript'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              { sourceTag: '*', onlyDependOnLibsWithTags: ['*'] },
            ],
          },
        ],
      },
    },
  ],
});
