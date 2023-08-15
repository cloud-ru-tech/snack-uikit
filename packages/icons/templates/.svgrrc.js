module.exports = {
  template: require('./iconComponentTemplate.js')({ size: 24 }),
  indexTemplate: require('./wrapperComponentTemplate.js'),
  ext: 'tsx',
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: { removeViewBox: false },
        },
      },
      'prefixIds',
    ],
  },
  replaceAttrValues: {
    '#000': 'inherit',
  },
  svgProps: {
    fill: 'currentColor',
    'data-test-id': '{testId}',
  },
  typescript: true,
};
