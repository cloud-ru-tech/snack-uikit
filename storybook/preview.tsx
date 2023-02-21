import { addDecorator, addParameters } from '@storybook/react';
import cn from 'classnames';
import { withDesign } from 'storybook-addon-designs';
import { useDarkMode } from 'storybook-dark-mode';

import BrandThemes from '@sbercloud/figma-tokens/build/css/brand.module.css';

import { BADGE } from './constants';
import classNames from './styles.module.scss';

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

addDecorator(withDesign);
addDecorator(Story => {
  const isDark = useDarkMode();
  return (
    <div className={cn(isDark ? BrandThemes.dark : BrandThemes.light, classNames.wrapper)}>
      <Story />
    </div>
  );
});

addParameters({
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Welcome', 'Theme', 'Typography', 'Utils', 'Components', 'Not stable'],
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
