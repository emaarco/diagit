const NOTATION_RENDERERS =
  '^src/notations/(NotationRegistry|DiagramJsViewer|allNotations|diffableNotations|[^/]+/(?!descriptor\\.ts$))'

module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'views-stay-isolated',
      comment:
        'A view is one thing the user sees; views share code through notations/, git-hosts/ or platform/, never directly.',
      severity: 'error',
      from: { path: '^src/views/([^/]+)/' },
      to: { path: '^src/views/[^/]+/', pathNot: '^src/views/$1/' },
    },
    {
      name: 'only-entrypoints-know-views',
      severity: 'error',
      from: { path: '^src/(notations|git-hosts|platform|background)/' },
      to: { path: '^src/views/' },
    },
    {
      name: 'notations-stay-isolated',
      comment:
        'Each notation lives in its own folder and only meets the others through the contract in src/notations/.',
      severity: 'error',
      from: { path: '^src/notations/([^/]+)/' },
      to: { path: '^src/notations/[^/]+/', pathNot: '^src/notations/$1/' },
    },
    {
      name: 'notations-know-no-hosts',
      comment: 'A notation renders a file; which host the file comes from is none of its business.',
      severity: 'error',
      from: { path: '^src/notations/' },
      to: { path: ['^src/git-hosts/', '^src/background/'] },
    },
    {
      name: 'git-hosts-stay-light',
      comment:
        'Git hosts run in the background worker and the view router, so they may read notation descriptors but never load a renderer.',
      severity: 'error',
      from: { path: '^src/(git-hosts|background)/' },
      to: { path: NOTATION_RENDERERS },
    },
    {
      name: 'only-views-pick-notation-registries',
      comment:
        'The registries pull in every renderer they list; only a view decides which renderers its bundle carries.',
      severity: 'error',
      from: { pathNot: '^src/views/' },
      to: { path: '^src/notations/(allNotations|diffableNotations)\\.ts$' },
    },
    {
      name: 'platform-is-the-base',
      severity: 'error',
      from: { path: '^src/platform/' },
      to: { path: '^src/', pathNot: '^src/platform/' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    includeOnly: '^src/',
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: {
      extensions: ['.ts', '.tsx', '.js'],
    },
  },
}
