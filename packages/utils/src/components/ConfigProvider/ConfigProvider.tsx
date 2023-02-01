import '@sbercloud/figma-tokens/build/scss/themes/styles-base.scss';
import '@sbercloud/figma-tokens/build/scss/themes/styles-green.scss';
import '@sbercloud/figma-tokens/build/scss/themes/styles-greenDark.scss';
import '@sbercloud/figma-tokens/build/scss/themes/styles-purple.scss';
import '@sbercloud/figma-tokens/build/scss/themes/styles-purpleDark.scss';

import { FC, useEffect, useLayoutEffect, useState } from 'react';

import { color, globals } from '@sbercloud/uikit-tokens-demo-theme';

import { DEFAULT, DEPRECATED_COLOR, POST_MESSAGE_KEY } from '../../constants';
import { tryParseJson } from '../../helpers/tryParseJson';
import { useCustomStore } from '../../hooks/private/useCustomStore';
import { LanguageCodeType, Themes } from '../../types';

export type ConfigProviderProps = {
  languageCode?: LanguageCodeType;
  theme?: Themes;
};

type ConfigProviderType = {
  themes: typeof Themes;
  languages: typeof LanguageCodeType;
} & FC<ConfigProviderProps>;

export const ConfigProvider: ConfigProviderType = ({ languageCode, theme, children }) => {
  const store = useCustomStore();
  const [configTheme, setConfigTheme] = useState(DEFAULT.THEME);
  const [configLanguageCode, setConfigLanguageCodeTheme] = useState(DEFAULT.LANGUAGE);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    /*-----------
    --- THEME --- 
    -----------*/

    const receiveChangeThemeMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POST_MESSAGE_KEY.changeTheme) return;

      setConfigTheme(eventData.value);
    };
    window.addEventListener('message', receiveChangeThemeMessage, false);

    body.classList.add(globals, color);

    /*--------------
    --- LANGUAGE --- 
    --------------*/

    const receiveChangeLanguageMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POST_MESSAGE_KEY.changeLanguage) return;
      setConfigLanguageCodeTheme(eventData.value);
    };
    window.addEventListener('message', receiveChangeLanguageMessage, false);

    return () => {
      window.removeEventListener('message', receiveChangeThemeMessage, false);
      window.removeEventListener('message', receiveChangeLanguageMessage, false);
    };
  }, []);

  /*-------------
  ---- THEME ----
  -------------*/

  useLayoutEffect(() => {
    store.theme = theme || DEFAULT.THEME;
    setConfigTheme(store.theme);
  }, [store, theme]);

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('data-theme', configTheme);

    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('data-theme', configTheme);
    body.classList.add(DEPRECATED_COLOR[configTheme]);

    window.postMessage(JSON.stringify({ key: POST_MESSAGE_KEY.changeThemeDone, value: configTheme }), location.origin);
  }, [configTheme]);

  /*--------------
  --- LANGUAGE --- 
  --------------*/

  useLayoutEffect(() => {
    store.languageCode = languageCode || DEFAULT.LANGUAGE;
    setConfigLanguageCodeTheme(store.languageCode);
  }, [languageCode, store]);

  useEffect(() => {
    window.postMessage(
      JSON.stringify({ key: POST_MESSAGE_KEY.changeLanguageDone, value: configLanguageCode }),
      location.origin,
    );
  }, [configLanguageCode]);

  return <>{children}</>;
};

ConfigProvider.themes = Themes;
ConfigProvider.languages = LanguageCodeType;
