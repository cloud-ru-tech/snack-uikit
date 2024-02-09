import { LOCALES } from './locales';
import { PartialDeep } from './typeUtils';

export type KnownLocaleLang = keyof typeof LOCALES;

export type LocaleLang = KnownLocaleLang | string;

export type LocaleDictionary = typeof LOCALES.en_GB;

export type OverrideLocales = PartialDeep<Record<KnownLocaleLang, LocaleDictionary>> & Record<string, LocaleDictionary>;
