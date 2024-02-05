import merge from 'lodash.merge';
import { createContext, ReactNode, useMemo } from 'react';

import { LOCALES } from '../../locales';
import { LocaleLang, OverrideLocales } from '../../types';

export type LocaleContextType = {
  lang: LocaleLang;
  locales: OverrideLocales;
};

export const LocaleContext = createContext<LocaleContextType>({
  lang: 'en_US',
  locales: LOCALES,
});

export type LocaleProviderProps = {
  lang: LocaleLang;
  locales?: OverrideLocales;
  children: ReactNode;
};

export function LocaleProvider({ lang = 'en_US', locales: localesProp, children }: LocaleProviderProps) {
  const locales = useMemo(() => {
    if (localesProp) {
      return merge({}, LOCALES, localesProp);
    }

    return LOCALES;
  }, [localesProp]);

  return <LocaleContext.Provider value={{ lang, locales }}>{children}</LocaleContext.Provider>;
}
