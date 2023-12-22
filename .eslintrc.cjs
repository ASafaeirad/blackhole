require('@rushstack/eslint-patch/modern-module-resolution');
const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    auto: false,
    prettier: false,
    test: true,
    storybook: true,
    import: true,
    typescript: {
      resolverProject: 'tsconfig.base.json',
      parserProject: ['tsconfig.base.json', './libs/**/tsconfig.*.json'],
    },
  },
  ignorePatterns: ['**/*'],
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  plugins: ['@nx'],
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
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            banTransitiveDependencies: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: 'type:util',
                onlyDependOnLibsWithTags: ['type:util', 'type:config'],
              },
              {
                sourceTag: 'type:ui',
                onlyDependOnLibsWithTags: ['type:ui', 'type:util'],
              },
              {
                sourceTag: 'type:config',
                onlyDependOnLibsWithTags: ['type:util'],
              },
              {
                sourceTag: 'type:data',
                onlyDependOnLibsWithTags: ['type:util', 'type:config'],
              },
              {
                sourceTag: 'type:app',
                onlyDependOnLibsWithTags: [
                  'type:util',
                  'type:data',
                  'type:config',
                  'type:feature',
                  'type:ui',
                ],
              },
              {
                sourceTag: 'type:e2e',
                onlyDependOnLibsWithTags: ['type:util', 'type:config'],
              },
              {
                sourceTag: 'type:feature',
                onlyDependOnLibsWithTags: [
                  'type:util',
                  'type:ui',
                  'type:config',
                  'type:data',
                ],
              },
              {
                sourceTag: 'scope:task',
                onlyDependOnLibsWithTags: ['scope:user', 'scope:task'],
              },
              {
                sourceTag: 'scope:focus',
                onlyDependOnLibsWithTags: [
                  'scope:user',
                  'scope:task',
                  'scope:focus',
                ],
              },
              {
                sourceTag: 'scope:notification',
                onlyDependOnLibsWithTags: [
                  'scope:user',
                  'scope:task',
                  'scope:focus',
                  'scope:analytic',
                  'scope:notification',
                ],
              },
              {
                sourceTag: 'scope:analytic',
                onlyDependOnLibsWithTags: [
                  'scope:user',
                  'scope:task',
                  'scope:focus',
                  'scope:analytic',
                ],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['**/.storybook/*'],
      rules: {
        '@nx/enforce-module-boundaries': 'off',
      },
    },
  ],
});
