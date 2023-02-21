const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const glob = require('glob');
const path = require('path');

const STORIES = glob
  .sync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/**/*.{ts,tsx}`)
  .map(x => path.resolve(__dirname, `../${x}`));

const isTestServer = Boolean(process.env.TEST_SERVER);

module.exports = {
  stories: STORIES,
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            auto: true,
            localIdentName: '[local]--[hash:base64:5]',
          },
        },
      },
    },
    '@sbercloud/ft-storybook-readme-addon',
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
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@geometricpanda/storybook-addon-badges',
    {
      name: 'storybook-addon-turbo-build',
      options: {
        // Please refer below tables for available options
        optimizationLevel: 3,
        removeProgressPlugin: isTestServer,
        disableSourceMap: isTestServer,
      },
    },
    'storybook-dark-mode',
  ],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    checkOptions: {},
  },
  babel: base => ({ ...base, plugins: [...(base.plugins || []), ...(isTestServer ? ['istanbul'] : [])] }),
  env: config => ({
    ...config,
  }),
  webpackFinal: async config => {
    isTestServer && (config.watch = false);
    isTestServer &&
      (config.watchOptions = {
        ignored: /.*/,
      });
    isTestServer && (config.mode = 'production');
    isTestServer && (config.devtool = false);
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
    };

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
