import { addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import cn from 'classnames';
import { withDesign } from 'storybook-addon-designs';

import { BADGE, Brand } from './constants';
import { getCustomBrandList, getCustomBrands } from './customBrands';
import classNames from './styles.module.scss';
import { useStorybookBrand } from './useStorybookBrand';

addDecorator(withDesign);
addDecorator((Story, { globals }) => {
  const brand =
    getCustomBrandList().includes(globals.brand) || Object.values(Brand).includes(globals.brand)
      ? globals.brand
      : Brand.Default;

  const brandClassName = useStorybookBrand({ brand });

  return (
    <>
      {getCustomBrands().map(config => (
        <style key={config.key}>{config.content}</style>
      ))}
      <div id='app' className={cn(brandClassName, classNames.wrapper)}>
        <Story />
      </div>
    </>
  );
});

addParameters({
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Welcome', 'Documentation', 'Components'],
    },
  },
});

addParameters({
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
});

const brandInfo = {
  brandTitle: 'Snack UI',
  brandUrl: 'https://sbercloud.ru',
  brandImage: './storybook/assets/CloudFullLogo.svg',
  brandTarget: '_blank',
};

addParameters({
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, ...brandInfo },
    // Override the default light theme
    light: { ...themes.normal, ...brandInfo },
  },
});

export const globalTypes = {
  brand: {
    name: 'Brand',
    description: 'Changing brands',
    defaultValue: Brand.Default,
  },
};
