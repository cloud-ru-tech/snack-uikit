const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const glob = require('glob');
const path = require('path');
const { getPackagesStatistics } = require('./utils/getPackagesStatistics');

const PACKAGES_STATISTICS = getPackagesStatistics();

const STORIES = glob
  .sync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/**/*.{ts,tsx}`)
  .map(x => path.resolve(__dirname, `../${x}`));

const WELCOME = path.resolve(__dirname, './welcome/stories/Welcome.tsx');
const STATISTICS = path.resolve(__dirname, './welcome/stories/Statistics.tsx');
const isTestServer = Boolean(process.env.TEST_SERVER);

module.exports = {
  stories: [WELCOME, STATISTICS, ...STORIES],
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
  ],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    checkOptions: {},
  },
  babel: base => {
    return { ...base, plugins: [...(base.plugins || []), ...(isTestServer ? ['istanbul'] : [])] };
  },
  env: config => ({
    ...config,
    PACKAGES_STATISTICS,
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
    config.module.rules[0].use.push({
      loader: '@linaria/webpack-loader',
      options: {
        sourceMap: config.mode !== 'production',
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
