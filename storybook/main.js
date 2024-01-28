const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { globSync } = require('glob');
const path = require('path');
const { getDependenciesLinks } = require('./utils/getDependenciesLinks');

const DEPENDENCIES_LINKS = getDependenciesLinks();
const STORIES = globSync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/**/*.{ts,tsx}`)
  .map(x => path.resolve(__dirname, `../${x}`))
  .sort((a, b) => a.localeCompare(b));

const WELCOME = path.resolve(__dirname, './stories/Welcome.tsx');
const GETTING_STARTED = path.resolve(__dirname, './stories/GettingStarted.tsx');
const CONTRIBUTION_GUIDE = path.resolve(__dirname, './stories/ContributionGuide.tsx');
const TOKENS = path.resolve(__dirname, './stories/Tokens.tsx');
const ICONS = path.resolve(__dirname, './stories/Icons.tsx');
const isTestServer = Boolean(process.env.TEST_SERVER);

const mainConfig = {
  stories: [WELCOME, GETTING_STARTED, CONTRIBUTION_GUIDE, ICONS, TOKENS, ...STORIES],
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
    '@cloud-ru/ft-storybook-readme-addon',
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
    '@cloud-ru/ft-storybook-brand-addon',
    'storybook-dark-mode',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@cloud-ru/ft-storybook-deps-graph-addon',
  ],
  staticDirs: [
    { from: '../storybook/assets', to: '/storybook/assets' },
    { from: '../storybook/assets', to: '/assets' },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    checkOptions: {},
  },
  features: {
    storyStoreV7: false,
  },
  docs: {
    autodocs: false,
  },
  babel: base => ({ ...base, plugins: [...(base.plugins || []), ...(isTestServer ? ['istanbul'] : [])] }),
  env: config => ({
    ...config,
    DEPENDENCIES_LINKS,
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

    const SVG_SPRITE_EXPRESSION = /\.symbol.svg$/;

    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.toString().includes('svg'));

    if (fileLoaderRule) {
      fileLoaderRule.exclude = SVG_SPRITE_EXPRESSION;
    }

    config.module.rules.push({
      test: SVG_SPRITE_EXPRESSION,
      use: 'svg-inline-loader',
    });

    return config;
  },
};

export default mainConfig;
