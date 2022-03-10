const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const glob = require('glob');
const path = require('path');

const STORIES = glob
  .sync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/*.{ts,tsx}`)
  .map(x => path.resolve(__dirname, `../${x}`));

module.exports = {
  stories: STORIES,
  addons: [
    'storybook-readme',
    'storybook-addon-designs',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.tsx?$/],
          include: STORIES,
        },
      },
    },
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@geometricpanda/storybook-addon-badges',
  ],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    checkOptions: {},
  },
  webpackFinal: async config => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
    };
    config.module.rules[0].use.push({
      loader: '@linaria/webpack-loader',
      options: {
        sourceMap: true,
      },
    });

    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        logLevel: 'INFO',
        extensions: ['.ts', '.tsx', '.json', '.svg', '.png'],
      }),
    );

    return config;
  },
};
