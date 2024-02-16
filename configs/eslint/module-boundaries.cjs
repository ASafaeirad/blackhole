module.exports = {
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
      onlyDependOnLibsWithTags: ['scope:user', 'scope:task', 'scope:shared'],
    },
    {
      sourceTag: 'scope:focus',
      onlyDependOnLibsWithTags: ['scope:user', 'scope:task', 'scope:focus'],
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
};
