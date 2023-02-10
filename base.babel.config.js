module.exports = buildType => ({
  sourceType: 'unambiguous',
  presets: [
    ['@babel/preset-env', { loose: false, modules: buildType === 'cjs' ? 'cjs' : false }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        loose: false,
      },
    ],
    ['@babel/preset-typescript', { loose: false }],
  ].filter(Boolean),
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ].filter(Boolean),
});
