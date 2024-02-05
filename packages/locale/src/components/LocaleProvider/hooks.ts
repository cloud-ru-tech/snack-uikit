import { useContext, useMemo } from 'react';

import { KnownLocaleLang, LocaleDictionary, LocaleLang } from '../../types';
import { LocaleContext, LocaleContextType } from './LocaleProvider';

type LocaleComponentName = keyof LocaleDictionary;

/**
 * Inner hook to use translations
 * @function helper
 */
export function useLocale(): [LocaleDictionary, LocaleLang];
export function useLocale<C extends LocaleComponentName = LocaleComponentName>(
  componentName: C,
): [LocaleDictionary[C], LocaleLang];

export function useLocale<C extends LocaleComponentName = LocaleComponentName>(componentName?: C) {
  const { locales: ctxLocales, lang } = useContext<LocaleContextType>(LocaleContext);

  const locales = useMemo(() => {
    const localesObj = ctxLocales[lang as KnownLocaleLang] || {};

    if (!componentName) {
      return localesObj as LocaleDictionary;
    }

    return (localesObj[componentName] || {}) as LocaleDictionary[C];
  }, [componentName, lang, ctxLocales]);

  return [locales, lang];
}
