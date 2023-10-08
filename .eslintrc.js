const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  ignorePatterns: ['**/*'],
  plugins: ['@nx'],
  modules: {
    auto: false,
    test: true,
    typescript: true,
    cspell: true,
    storybook: true,
    import: true,
  },
  settings: {
    'import/internal-regex': '^@blackhole/',
  },
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
