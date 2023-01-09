import { addDecorator, addParameters } from '@storybook/react';
import { useEffect, useLayoutEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { withDesign } from 'storybook-addon-designs';

import { ConfigProvider, Themes } from '../packages/utils/src';
import { BADGE } from './constants';

const LanguageCodeType = ConfigProvider.languages;

const COLOR_MAP = {
  [Themes.Purple]: '#aaabfd',
  [Themes.PurpleDark]: '#5558fa',
  [Themes.Green]: '#07E897',
  [Themes.GreenDark]: '#157552',
};

addDecorator(withDesign);
addDecorator((Story, { globals: { locale, theme } }) => {
  const colorizeThemeButton = () => {
    const themeIcon = window.parent.document.querySelector('button[title="Changing themes"]')?.querySelector('svg');
    if (!themeIcon) {
      setTimeout(() => colorizeThemeButton(), 200);
      return;
    }

    themeIcon.style.background = COLOR_MAP[theme];
    themeIcon.style['border-radius'] = '100%';
    themeIcon.style.color = 'rgb(0 0 0 / 10%)';
  };
  useLayoutEffect(() => {
    colorizeThemeButton();
  }, [theme]);

  useEffect(() => {
    colorizeThemeButton();
  }, []);
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  return (
    // Add global styles and theme variables
    <div id='story-root'>
      <FormProvider {...methods}>
        <ConfigProvider theme={theme || ConfigProvider.themes.Purple} languageCode={locale || LanguageCodeType.ruRU}>
          {/* @ts-ignore */}
          <Story />
        </ConfigProvider>
      </FormProvider>
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

const getStyle = (theme: Themes) => ({
  background: COLOR_MAP[theme],
  width: '1rem',
  height: '1rem',
  borderRadius: '1rem',
  boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 0px 1px inset',
});

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Changing themes',
    defaultValue: Themes.Purple,
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: Themes.Purple, right: <div style={getStyle(Themes.Purple)} />, title: 'Purple' },
        { value: Themes.PurpleDark, right: <div style={getStyle(Themes.PurpleDark)} />, title: 'PurpleDark' },
        { value: Themes.Green, right: <div style={getStyle(Themes.Green)} />, title: 'Green' },
        { value: Themes.GreenDark, right: <div style={getStyle(Themes.GreenDark)} />, title: 'GreenDark' },
      ],
    },
  },
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: LanguageCodeType.ruRU,
    toolbar: {
      icon: 'globe',
      items: [
        { value: LanguageCodeType.ruRU, right: '🇷🇺', title: 'Русский' },
        { value: LanguageCodeType.enGB, right: '🇺🇸', title: 'English' },
        { value: LanguageCodeType.cimode, right: '🗝', title: 'CI Mode' },
      ],
    },
  },
};
