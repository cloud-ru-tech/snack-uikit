module.exports = {
  evaluate: true,
  displayName: true,
  rules: [
    {
      action: require('@linaria/shaker').default,
    },
    {
      test: /\/node_modules\//,
      action: 'ignore',
    },
  ],
};
