import './styles.module.scss';

import { themes, ThemeVars } from '@storybook/theming';
import { DecoratorFunction, GlobalTypes, Parameters } from '@storybook/types';
import { withDesign } from 'storybook-addon-designs';

import { PARAM_COLOR_MAP_KEY, PARAM_KEY } from '@sbercloud/ft-storybook-brand-addon';

import { BADGE, Brand, DEFAULT_BRAND_COLORS_MAP, DEFAULT_BRAND_MAP } from './constants';

const brandInfo: ThemeVars = {
  base: 'light',
  brandTitle: 'Snack UI',
  brandUrl: '/',
  brandImage: './storybook/assets/CloudRuFullLogo.svg',
  brandTarget: '_self',
};

const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Welcome', 'Documentation', 'Components'],
    },
  },
  dependenciesGraph: {
    graphLinks: process.env.DEPENDENCIES_LINKS,
  },
  badgesConfig: {
    [BADGE.PRIVATE]: {
      styles: {
        backgroundColor: '#f2db72',
        borderColor: '#808080',
        color: '#333',
      },
      title: BADGE.PRIVATE,
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, ...brandInfo, base: 'dark' },
    // Override the default light theme
    light: { ...themes.normal, ...brandInfo, base: 'light' },
  },
};

const globalTypes: GlobalTypes = {
  [PARAM_KEY]: {
    name: 'Brand',
    description: 'Changing brands',
    defaultValue: Brand.Default,
  },
  [PARAM_COLOR_MAP_KEY]: {
    name: 'Brand Map with Colors',
    description: 'Map of color for brands list',
    defaultValue: DEFAULT_BRAND_COLORS_MAP,
  },
  [Brand.Default]: {
    name: 'Brand Default',
    description: '',
    defaultValue: DEFAULT_BRAND_MAP[Brand.Default],
  },
  [Brand.Cloud]: {
    name: 'Brand Cloud',
    description: '',
    defaultValue: DEFAULT_BRAND_MAP[Brand.Cloud],
  },
  [Brand.MLSpace]: {
    name: 'Brand MLSpace',
    description: '',
    defaultValue: DEFAULT_BRAND_MAP[Brand.MLSpace],
  },
};

const decorators: DecoratorFunction[] = [withDesign];

const preview = {
  decorators,
  parameters,
  globalTypes,
};

export default preview;
