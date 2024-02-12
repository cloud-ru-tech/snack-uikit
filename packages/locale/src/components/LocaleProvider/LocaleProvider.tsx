import merge from 'lodash.merge';
import { createContext, ReactNode, useMemo } from 'react';

import { LOCALES } from '../../locales';
import { KnownLocaleLang, LocaleDictionary, LocaleLang, OverrideLocales } from '../../types';

export const DEFAULT_LANG = 'en_GB';

export type LocaleContextType = {
  lang: LocaleLang;
  locales: OverrideLocales;
  localesByLang: LocaleDictionary;
};

export const LocaleContext = createContext<LocaleContextType>({
  lang: DEFAULT_LANG,
  locales: LOCALES,
  localesByLang: LOCALES.en_GB,
});

export type LocaleProviderProps = {
  lang: LocaleLang;
  locales?: OverrideLocales;
  children: ReactNode;
};

export function LocaleProvider({ lang: langProp, locales: localesProp, children }: LocaleProviderProps) {
  const locales = useMemo(() => {
    if (localesProp) {
      return merge({}, LOCALES, localesProp);
    }

    return LOCALES;
  }, [localesProp]);

  const lang = useMemo(() => langProp.replace('-', '_') as LocaleLang, [langProp]);

  const localesByLang = useMemo(() => {
    let localesObj = locales[lang as KnownLocaleLang];

    if (!localesObj) {
      console.warn(
        `Snack-uikit: localization for lang ${lang} was not found. Make sure you are using correct lang or passed proper locales to LocaleProvider. For now default language (${DEFAULT_LANG}) will be used`,
      );

      localesObj = locales[DEFAULT_LANG] as LocaleDictionary;
    }

    return localesObj;
  }, [lang, locales]);

  return <LocaleContext.Provider value={{ lang, locales, localesByLang }}>{children}</LocaleContext.Provider>;
}
