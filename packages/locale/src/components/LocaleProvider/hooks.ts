import { useContext, useMemo } from 'react';

import { KnownLocaleLang, LocaleDictionary, LocaleLang } from '../../types';
import { DEFAULT_LANG, LocaleContext, LocaleContextType } from './LocaleProvider';

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
    let localesObj = ctxLocales[lang as KnownLocaleLang];

    if (!localesObj) {
      console.warn(
        `Snack-uikit: localization for lang ${lang} was not found. Make sure you are using correct lang or passed proper locales to LocaleProvider. For now default language (${DEFAULT_LANG}) will be used`,
      );

      localesObj = ctxLocales[DEFAULT_LANG] as LocaleDictionary;
    }

    if (!componentName) {
      return localesObj as LocaleDictionary;
    }

    return (localesObj[componentName] || {}) as LocaleDictionary[C];
  }, [componentName, lang, ctxLocales]);

  return [locales, lang];
}
