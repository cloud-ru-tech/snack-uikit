import { LOCALES } from './locales';
import { PartialDeep } from './typeUtils';

export type KnownLocaleLang = keyof typeof LOCALES;

type CustomLang = `${string}_${string}`;

export type LocaleLang = KnownLocaleLang | CustomLang;

export type LocaleDictionary = typeof LOCALES.en_US;

export type OverrideLocales =
  | PartialDeep<Record<KnownLocaleLang, LocaleDictionary>>
  | Record<CustomLang, LocaleDictionary>;
