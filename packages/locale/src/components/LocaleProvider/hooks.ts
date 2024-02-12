import { useCallback, useContext, useMemo } from 'react';

import { DottedTranslationKey, LocaleDictionary, LocaleLang } from '../../types';
import { LocaleContext, LocaleContextType } from './LocaleProvider';

type ValueOf<T> = T[keyof T];

type LocaleComponentName = keyof LocaleDictionary;

type GetLocaleText<T extends keyof LocaleDictionary | undefined = undefined> = (key: DottedTranslationKey<T>) => string;

/**
 * Inner hook to use translations
 * @function helper
 */
export function useLocale(): { t: GetLocaleText; lang: LocaleLang };
export function useLocale<C extends LocaleComponentName = LocaleComponentName>(
  componentName: C,
): { t: GetLocaleText<C>; lang: LocaleLang };

export function useLocale<C extends LocaleComponentName = LocaleComponentName>(componentName?: C) {
  const { localesByLang, lang } = useContext<LocaleContextType>(LocaleContext);

  const locales = useMemo(() => {
    if (!componentName) {
      return localesByLang;
    }

    return (localesByLang[componentName] || {}) as LocaleDictionary[C];
  }, [componentName, localesByLang]);

  const getLocaleText: GetLocaleText<C> = useCallback(
    key => {
      let translation = '';

      const complexKey = key.split('.');

      if (complexKey.length === 1) {
        translation = locales[key as keyof typeof locales] as unknown as string;
      } else {
        translation = complexKey.reduce<LocaleDictionary | ValueOf<LocaleDictionary> | string>(
          (acc, cur) => acc[cur as keyof typeof acc],
          locales,
        ) as string;
      }

      if (!translation?.length) {
        console.warn(`Snack-uikit: the '${key}' key is not found in the current locale '${lang}'.`);

        return key;
      }

      return translation;
    },
    [lang, locales],
  );

  return {
    t: getLocaleText,
    lang,
  };
}
