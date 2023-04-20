import { StoryFn } from '@storybook/react';
import { themes, ThemeVars } from '@storybook/theming';
import { DecoratorFunction, GlobalTypes, Parameters } from '@storybook/types';
import { useLayoutEffect } from 'react';
import { withDesign } from 'storybook-addon-designs';

import { BADGE, Brand } from './constants';
import { getCustomBrandList, getCustomBrands } from './customBrands';
import classNames from './styles.module.scss';
import { useStorybookBrand } from './useStorybookBrand';

const decorators: DecoratorFunction[] = [
  withDesign,
  (Story: StoryFn, { globals }: Parameters) => {
    const brand =
      getCustomBrandList().includes(globals.brand) || Object.values(Brand).includes(globals.brand)
        ? globals.brand
        : Brand.Default;

    const brandClassName = useStorybookBrand({ brand });

    useLayoutEffect(() => {
      document.body.classList.add(brandClassName, classNames.wrapper);
      return () => document.body.classList.remove(brandClassName);
    }, [brandClassName]);

    return (
      <>
        {getCustomBrands().map(config => (
          <style key={config.key}>{config.content}</style>
        ))}
        <Story />
      </>
    );
  },
];

const brandInfo: ThemeVars = {
  base: 'light',
  brandTitle: 'Snack UI',
  brandUrl: 'https://sbercloud.ru',
  brandImage: './storybook/assets/CloudFullLogo.svg',
  brandTarget: '_blank',
};

const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Welcome', 'Documentation', 'Components'],
    },
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
    dark: { ...themes.dark, ...brandInfo },
    // Override the default light theme
    light: { ...themes.normal, ...brandInfo },
  },
};

const globalTypes: GlobalTypes = {
  brand: {
    name: 'Brand',
    description: 'Changing brands',
    defaultValue: Brand.Default,
  },
};

const preview = {
  decorators,
  parameters,
  globalTypes,
};

// eslint-disable-next-line import/no-default-export
export default preview;
