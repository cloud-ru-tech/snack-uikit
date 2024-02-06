import merge from 'lodash.merge';
import { createContext, ReactNode, useMemo } from 'react';

import { LOCALES } from '../../locales';
import { LocaleLang, OverrideLocales } from '../../types';

export const DEFAULT_LANG = 'en_GB';

export type LocaleContextType = {
  lang: LocaleLang;
  locales: OverrideLocales;
};

export const LocaleContext = createContext<LocaleContextType>({
  lang: DEFAULT_LANG,
  locales: LOCALES,
});

export type LocaleProviderProps = {
  lang: LocaleLang;
  locales?: OverrideLocales;
  children: ReactNode;
};

export function LocaleProvider({ lang: langProp = DEFAULT_LANG, locales: localesProp, children }: LocaleProviderProps) {
  const locales = useMemo(() => {
    if (localesProp) {
      return merge({}, LOCALES, localesProp);
    }

    return LOCALES;
  }, [localesProp]);

  const lang = useMemo(() => langProp.replace('-', '_') as LocaleLang, [langProp]);

  return <LocaleContext.Provider value={{ lang, locales }}>{children}</LocaleContext.Provider>;
}
