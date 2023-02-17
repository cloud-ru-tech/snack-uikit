import { useThemeConfig } from '@snack-ui/utils';
import { addDecorator, addParameters } from '@storybook/react';
import cn from 'classnames';
import { useCallback, useEffect } from 'react';
import { withDesign } from 'storybook-addon-designs';

import BrandThemes from '@sbercloud/figma-tokens/build/css/brand.module.css';

import { BADGE } from './constants';
import classNames from './styles.module.scss';

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

const themeMap = {
  [Theme.Light]: BrandThemes.light,
  [Theme.Dark]: BrandThemes.dark,
};

const COLOR_MAP = {
  [Theme.Light]: '#a9d3eb',
  [Theme.Dark]: '#184e67',
};

const getStyle = (theme: Theme) => ({
  background: COLOR_MAP[theme],
  width: '1rem',
  height: '1rem',
  borderRadius: '1rem',
  boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 0px 1px inset',
});

addDecorator(withDesign);
addDecorator((Story, { globals: { theme } }) => {
  const colorizeThemeButton = useCallback(() => {
    const themeIcon = window.parent.document.querySelector('button[title="Changing themes"]')?.querySelector('svg');
    if (!themeIcon) {
      setTimeout(() => colorizeThemeButton(), 200);
      return;
    }
    themeIcon.style.background = COLOR_MAP[theme];
    themeIcon.style['border-radius'] = '100%';
    themeIcon.style.color = 'rgb(0 0 0 / 10%)';
  }, [theme]);

  useEffect(() => {
    colorizeThemeButton();
  }, [colorizeThemeButton, theme]);

  const { themeClassName, changeTheme } = useThemeConfig({ themeMap, defaultTheme: theme });

  useEffect(() => {
    theme && changeTheme(theme);
  }, [theme, changeTheme]);

  return (
    <div className={cn(themeClassName, classNames.wrapper)}>
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

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Changing themes',
    defaultValue: Theme.Light,
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: Theme.Light, right: <div style={getStyle(Theme.Light)} />, title: 'Light' },
        { value: Theme.Dark, right: <div style={getStyle(Theme.Dark)} />, title: 'Dark' },
      ],
    },
  },
};
