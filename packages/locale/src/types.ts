import { LOCALES } from './locales';
import { Join, PartialDeep, PathsToStringProps } from './typeUtils';

export type KnownLocaleLang = keyof typeof LOCALES;

export type LocaleLang = KnownLocaleLang | string;

export type LocaleDictionary = typeof LOCALES.en_GB;

// TODO: temporary changed type to fix typings mismatch for "locale" prop in LocaleProvider
// export type OverrideLocales = PartialDeep<Record<KnownLocaleLang, LocaleDictionary>> | Record<string, LocaleDictionary>;
export type OverrideLocales = PartialDeep<Record<LocaleLang, LocaleDictionary>>;

export type DottedTranslationKey<C extends keyof LocaleDictionary | undefined = undefined> = C extends string
  ? Join<PathsToStringProps<LocaleDictionary[C]>, '.'>
  : Join<PathsToStringProps<LocaleDictionary>, '.'>;
