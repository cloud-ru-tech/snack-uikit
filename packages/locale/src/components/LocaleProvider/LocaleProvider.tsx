import merge from 'lodash.merge';
import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';

import { LOCALES } from '../../locales';
import {
  Dictionary,
  DottedTranslationKey,
  ExtendedDictionary,
  InterpolationObject,
  LocaleDictionary,
  LocaleLang,
  Locales,
  OverrideLocales,
  TranslatedEntity,
} from '../../types';
import { interpolateTranslation } from '../../utils/interpolateTranslation';

export const DEFAULT_LANG = 'en-GB';

export type LocaleContextType<D extends Dictionary> = {
  lang: LocaleLang | string;
  locales: Locales<D>;
  localesByLang: LocaleDictionary<D>;
};

export type LocaleProviderProps<D extends Dictionary> = {
  lang: LocaleLang | string;
  fallbackLang?: LocaleLang;
  overrideLocales?: OverrideLocales<D>;
  children: ReactNode;
};

export type ContextOptions<D extends Dictionary> = {
  extendedDictionary?: ExtendedDictionary<D>;
  defaultLanguage?: LocaleLang;
};

function mergeLocaleWithExtension<D extends Dictionary>(extension?: ExtendedDictionary<D>): Locales<D> {
  return merge({}, LOCALES, extension);
}

type ValueOf<T> = T[keyof T];

type LocaleComponentName<D extends Dictionary> = keyof LocaleDictionary<D>;

type GetLocaleText<D extends Dictionary, T extends keyof LocaleDictionary<D> | undefined = undefined> = (
  key: DottedTranslationKey<D, T>,
  interpolation?: InterpolationObject,
) => string;

export function createLocaleContext<D extends Dictionary>({
  extendedDictionary,
  defaultLanguage = DEFAULT_LANG,
}: ContextOptions<D>) {
  const extendedLocales = mergeLocaleWithExtension(extendedDictionary);

  const LocaleContext = createContext<LocaleContextType<D>>({
    lang: defaultLanguage,
    locales: extendedLocales,
    localesByLang: extendedLocales[defaultLanguage],
  });

  function LocaleProvider({ lang, fallbackLang = defaultLanguage, overrideLocales, children }: LocaleProviderProps<D>) {
    const locales = useMemo(() => {
      if (overrideLocales) {
        return merge({}, extendedLocales, overrideLocales);
      }

      return extendedLocales;
    }, [overrideLocales]);

    const localesByLang = useMemo(() => {
      let localesObj = locales[lang as LocaleLang];

      if (!localesObj) {
        console.warn(
          `Snack-uikit: localization for lang ${lang} was not found. Make sure you are using correct lang or passed proper locales to LocaleProvider. For now default language (${DEFAULT_LANG}) will be used`,
        );

        localesObj = locales[fallbackLang] as LocaleDictionary<D>;
      }

      return localesObj;
    }, [fallbackLang, lang, locales]);

    return <LocaleContext.Provider value={{ lang, locales, localesByLang }}>{children}</LocaleContext.Provider>;
  }

  /**
   * Inner hook to use translations
   * @function helper
   */
  function useLocale(): { t: GetLocaleText<D>; lang: LocaleLang };
  function useLocale<C extends LocaleComponentName<D> = LocaleComponentName<D>>(
    componentName: C,
  ): { t: GetLocaleText<D, C>; lang: LocaleLang };
  function useLocale<C extends LocaleComponentName<D> = LocaleComponentName<D>>(componentName?: C) {
    const { localesByLang, lang } = useContext<LocaleContextType<D>>(LocaleContext);

    const locales = useMemo(() => {
      if (!componentName) {
        return localesByLang;
      }

      return (localesByLang[componentName] || {}) as LocaleDictionary<D>[C];
    }, [componentName, localesByLang]);

    const getLocaleText: GetLocaleText<D, C> = useCallback(
      (key, interpolation) => {
        let translation = '';

        const complexKey = key.split('.');

        if (complexKey.length === 1) {
          translation = locales[key as keyof typeof locales] as unknown as string;
        } else {
          translation = complexKey.reduce<
            LocaleDictionary<D> | ValueOf<LocaleDictionary<D>> | TranslatedEntity | string
          >((acc, cur) => {
            if (typeof acc === 'string') {
              return acc;
            }

            return acc[cur as keyof typeof acc];
          }, locales) as string;
        }

        if (!translation?.length) {
          console.warn(`Snack-uikit: the '${key}' key is not found in the current locale '${lang}'.`);

          return key;
        }

        return interpolateTranslation(translation, interpolation);
      },
      [lang, locales],
    );

    return {
      t: getLocaleText,
      lang,
    };
  }

  return {
    LocaleContext,
    LocaleProvider,
    useLocale,
  };
}

export const { LocaleProvider, useLocale } = createLocaleContext({});
