import { addDecorator, addParameters } from '@storybook/react';
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
      <div className={cn(brandClassName, classNames.wrapper)}>
        <Story />
      </div>
    </>
  );
});

addParameters({
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Theme Config', 'Components'],
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

export const globalTypes = {
  brand: {
    name: 'Brand',
    description: 'Changing brands',
    defaultValue: Brand.Default,
  },
};
