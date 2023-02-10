import LightThemeMlSpace from '@sbercloud/figma-tokens/build/scss/themes/styles-brand.module.scss';
import DarkThemeMlSpace from '@sbercloud/figma-tokens/build/scss/themes/styles-brandDark.module.scss';

import { addDecorator, addParameters } from '@storybook/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { withDesign } from 'storybook-addon-designs';

import { BADGE } from './constants';

const Themes = [LightThemeMlSpace, DarkThemeMlSpace];

addDecorator(withDesign);
addDecorator(Story => {
  const colorizeThemeButton = () => {
    const themeIcon = window.parent.document.querySelector('button[title="Changing themes"]')?.querySelector('svg');
    if (!themeIcon) {
      setTimeout(() => colorizeThemeButton(), 200);
      return;
    }

    themeIcon.style['border-radius'] = '100%';
    themeIcon.style.color = 'rgb(0 0 0 / 10%)';
  };
  useLayoutEffect(() => {
    colorizeThemeButton();
  }, []);

  useEffect(() => {
    colorizeThemeButton();
  }, []);

  const [theme, setTheme] = useState(0);

  return (
    // Add global styles and theme variables
    <div id='story-root' className={Themes[theme].theme}>
      <button
        onClick={() => {
          setTheme(x => (x + 1) % Themes.length);
        }}
        style={{ display: 'block', marginBottom: '40px' }}
      >
        SWITCH
      </button>

      {/* @ts-ignore */}
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

export const globalTypes = {};
