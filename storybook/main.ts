import path from 'path';

import { StorybookConfig } from '@storybook/react-vite';
import vitePluginReact from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { globSync } from 'glob';
import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import { getDependenciesLinks } from './utils/getDependenciesLinks';

dotenv.config();

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

// eslint-disable-next-line no-console
console.log(process.env.CUSTOM_STORYBOOK_ADDONS?.split(' '), 'proccess env addons')
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
      }
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
    ...(process.env.CUSTOM_STORYBOOK_ADDONS?.split(' ') ?? []),
  ],
  staticDirs: [
    './public',
    { from: '../storybook/assets', to: '/storybook/assets' },
    { from: '../storybook/assets', to: '/assets' },
  ],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
  },
  babel: (base: StorybookConfig['babel']) => ({
    ...base,
    plugins: [...(base.plugins || []), ...(isTestServer ? ['istanbul'] : [])],
  }),
  env: config => ({
    ...config,
    DEPENDENCIES_LINKS: DEPENDENCIES_LINKS as unknown as string,
    DEPS_URL: process.env.DEPS_URL || ('' as string),
    CUSTOM_STORYBOOK_ADDONS: (process.env.CUSTOM_STORYBOOK_ADDONS || '') as string,
  }),
  viteFinal: async viteConfig =>
    defineConfig({
      ...viteConfig,
      plugins: [
        ...(viteConfig.plugins || []),
        tsconfigPaths(),
        vitePluginReact(),
        svgr(),
        {
          name: "markdown-loader",
          transform(code, id) {
            if (id.slice(-3) === ".md") {
              return `export default ${JSON.stringify(code)};`;
            }
          }
        },
        monacoEditorPlugin({
          globalAPI: false,
          publicPath: 'monaco-editor/[name].worker.js',
          customWorkers: [
            {
              label: 'yaml',
              entry: 'monaco-yaml',
            },
          ],
        }),
      ],
      define: {
        'process.env': {
          ...viteConfig.define?.['process.env'],
          DEPENDENCIES_LINKS: DEPENDENCIES_LINKS || '',
          DEPS_URL: process.env.DEPS_URL || '',
          CUSTOM_STORYBOOK_ADDONS: process.env.CUSTOM_STORYBOOK_ADDONS || '',
          TEST_SERVER: isTestServer || 'false',
        },
      },
    }),
};

// eslint-disable-next-line import/no-default-export
export default mainConfig;
