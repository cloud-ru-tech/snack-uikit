import './styles.module.scss';

import { GlobalTypes, Parameters } from '@storybook/csf';
import { Preview } from '@storybook/react';
import { themes, ThemeVars } from '@storybook/theming';

import { PARAM_COLOR_MAP_KEY, PARAM_KEY, withBrand } from '@cloud-ru/ft-storybook-brand-addon';
import { Sprite, SpriteSVG } from '@snack-uikit/icons';
import { LocaleProvider } from '@snack-uikit/locale';

import { themes as additionalThemes } from '../themes.config';
import { BADGE, Brand, DEFAULT_BRAND_COLORS_MAP, DEFAULT_BRAND_MAP } from './constants';

const brandInfo: Partial<ThemeVars> = {
  base: 'light',
  brandTitle: 'Snack UI',
  brandUrl: '/',
  brandTarget: '_self',
};

const parameters: Parameters = {
  actions: { handlers: [], disable: true },
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
    dark: { ...themes.dark, ...brandInfo, brandImage: './storybook/assets/CloudRuFullLogoDark.svg', base: 'dark' },
    // Override the default light theme
    light: { ...themes.normal, ...brandInfo, brandImage: './storybook/assets/CloudRuFullLogo.svg', base: 'light' },
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
    defaultValue: {
      ...DEFAULT_BRAND_COLORS_MAP,
      ...additionalThemes.reduce((res: Record<string, string>, theme) => {
        res[theme.key] = theme.color;
        return res;
      }, {}),
    },
  },
  [Brand.Default]: {
    name: 'Brand Default',
    description: '',
    defaultValue: DEFAULT_BRAND_MAP[Brand.Default],
  },
  ...additionalThemes.reduce((res: GlobalTypes, { key, name, defaultValue }) => {
    res[key] = {
      name,
      description: '',
      defaultValue,
    };
    return res;
  }, {}),
};

const decorators: Preview['decorators'] = [
  Story => (
    <>
      <Sprite content={SpriteSVG as unknown as string} />

      <LocaleProvider lang='en_GB'>{Story()}</LocaleProvider>
    </>
  ),
  withBrand,
];

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
};

export default preview;
