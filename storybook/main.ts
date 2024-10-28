import path from 'path';

import { StorybookConfig } from '@storybook/react-webpack5';
import { globSync } from 'glob';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration as WebpackConfig, RuleSetRule } from 'webpack';

import { getDependenciesLinks } from './utils/getDependenciesLinks';

const DEPENDENCIES_LINKS = getDependenciesLinks();
const STORIES = globSync(`packages/${process.env.STORYBOOK_PACKAGE_NAME || '*'}/stories/**/*.story.{ts,tsx}`)
  .map(x => path.resolve(__dirname, `../${x}`))
  .sort((a, b) => a.localeCompare(b));

const WELCOME = path.resolve(__dirname, './stories/Welcome.story.tsx');
const GETTING_STARTED = path.resolve(__dirname, './stories/GettingStarted.story.tsx');
const CONTRIBUTION_GUIDE = path.resolve(__dirname, './stories/ContributionGuide.story.tsx');
const TOKENS = path.resolve(__dirname, './stories/Tokens.story.tsx');
const ICONS = path.resolve(__dirname, './stories/Icons.story.tsx');
const isTestServer = Boolean(process.env.TEST_SERVER);

const mainConfig: StorybookConfig = {
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
    '@storybook/addon-designs',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          include: STORIES,
        },
        loaderOptions: {
          injectStoryParameters: true,
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
    '@storybook/addon-webpack5-compiler-babel',
  ],
  staticDirs: [
    { from: '../storybook/assets', to: '/storybook/assets' },
    { from: '../storybook/assets', to: '/assets' },
  ],
  framework: '@storybook/react-webpack5',
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    checkOptions: {},
  },
  babel: (base: StorybookConfig['babel']) => ({
    ...base,
    plugins: [...(base.plugins || []), ...(isTestServer ? ['istanbul'] : [])],
  }),
  env: config => ({
    ...config,
    DEPENDENCIES_LINKS: DEPENDENCIES_LINKS as unknown as string,
  }),
  webpackFinal: async (config: WebpackConfig) => {
    isTestServer && (config.watch = false);
    isTestServer &&
      (config.watchOptions = {
        ignored: /.*/,
      });
    isTestServer && (config.mode = 'production');
    isTestServer && (config.devtool = false);

    if (config.resolve) {
      config.resolve.fallback = {
        ...(config.resolve?.fallback || {}),
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
    }

    const SVG_SPRITE_EXPRESSION = /\.symbol.svg$/;

    const fileLoaderRule = config.module?.rules?.find(rule => {
      if (typeof rule !== 'object') {
        return false;
      }

      return rule?.test?.toString().includes('svg');
    }) as RuleSetRule;

    if (fileLoaderRule) {
      fileLoaderRule.exclude = SVG_SPRITE_EXPRESSION;
    }

    config.module?.rules?.push({
      test: SVG_SPRITE_EXPRESSION,
      use: 'svg-inline-loader',
    });

    return config;
  },
};

// eslint-disable-next-line import/no-default-export
export default mainConfig;
